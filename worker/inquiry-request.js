const MAX_BODY_BYTES = 8192;

export const reply = (status, data, headers = {}) => Response.json(data, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex', ...headers,
} });

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

export async function readInquiryRequest(request, env) {
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
  return { input };
}

export async function inquiryPayloadHash(fields) {
  const bytes = new TextEncoder().encode(JSON.stringify(fields));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}
