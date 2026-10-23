import { notifyBlogInquiry } from './blog-inquiry-email.js';

const MAX_BODY_BYTES = 8192;
const choices = {
  updateFrequency: ['weekly', 'monthly', 'rarely', 'never'],
  contentOwner: ['self', 'team', 'external', 'nobody'],
  updateObstacle: ['time', 'ideas', 'technology', 'none'],
};
const reply = (status, data, headers = {}) => Response.json(data, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex', ...headers,
} });

export function validateBlogInquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  // Do not silently reinterpret submissions from an older questionnaire.
  if (Object.hasOwn(input, 'currentPresence') || Object.hasOwn(input, 'projectInterest')) return null;
  const data = {};
  for (const [key, options] of Object.entries(choices)) {
    if (!options.includes(input[key])) return null;
    data[key] = input[key];
  }
  for (const [key, max] of Object.entries({ email: 254, requestId: 36, companyWebsite: 250 })) {
    if (typeof input[key] !== 'string' || input[key].length > max || /[\u0000-\u001f\u007f]/.test(input[key])) return null;
    data[key] = input[key].trim();
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)) return null;
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) || data.companyWebsite) return null;
  data.requestId = data.requestId.toLowerCase();
  delete data.companyWebsite;
  // Attribution belongs to this endpoint, never to caller-supplied fields.
  data.source = 'php2shell';
  return data;
}

async function boundedJson(request) {
  if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES) throw new RangeError();
  if (!request.body) throw new SyntaxError();
  const reader = request.body.getReader();
  const chunks = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleBlogInquiry(request, env) {
  if (request.method !== 'POST') return reply(405, { error: 'method_not_allowed' }, { Allow: 'POST' });
  if (request.headers.get('Origin') !== new URL(request.url).origin || request.headers.get('Sec-Fetch-Site') === 'cross-site') return reply(403, { error: 'origin_not_allowed' });
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply(415, { error: 'json_required' });
  if (!env.INQUIRIES_DB || !env.INQUIRY_RATE_LIMITER) return reply(503, { error: 'temporarily_unavailable' });
  try {
    const limit = await env.INQUIRY_RATE_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
    if (!limit.success) return reply(429, { error: 'rate_limited' }, { 'Retry-After': '60' });
  } catch { return reply(503, { error: 'temporarily_unavailable' }); }
  let input;
  try { input = await boundedJson(request); }
  catch (error) { return reply(error instanceof RangeError ? 413 : 400, { error: 'invalid_request' }); }
  const data = validateBlogInquiry(input);
  if (!data) return reply(422, { error: 'invalid_fields' });
  const { requestId, ...fields } = data;
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(fields))))].map(byte => byte.toString(16).padStart(2, '0')).join('');
  try {
    await env.INQUIRIES_DB.prepare(`INSERT INTO blog_inquiries
      (request_id, payload_hash, source, update_frequency, content_owner, update_obstacle, email)
      VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(request_id) DO NOTHING`)
      .bind(requestId, hash, data.source, data.updateFrequency, data.contentOwner, data.updateObstacle, data.email).run();
    const stored = await env.INQUIRIES_DB.prepare('SELECT payload_hash FROM blog_inquiries WHERE request_id = ?').bind(requestId).first();
    if (!stored) return reply(503, { error: 'storage_unconfirmed' });
    if (stored.payload_hash !== hash) return reply(409, { error: 'request_id_conflict' });
    // A confirmed saved inquiry is accepted even if notification needs its durable retry.
    await notifyBlogInquiry(env, requestId);
    return reply(200, { ok: true, reference: requestId });
  } catch {
    // No email addresses, answers, or database details in logs or error responses.
    return reply(503, { error: 'temporarily_unavailable' });
  }
}
