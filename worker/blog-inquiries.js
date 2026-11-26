import { inquiryPayloadHash, readInquiryRequest, reply } from './inquiry-request.js';
import { notifyBlogInquiry } from './blog-inquiry-email.js';

const choices = {
  updateFrequency: ['weekly', 'monthly', 'rarely', 'never'],
  contentOwner: ['self', 'team', 'external', 'nobody'],
  updateObstacle: ['time', 'ideas', 'technology', 'none'],
};
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

export async function handleBlogInquiry(request, env) {
  const parsed = await readInquiryRequest(request, env);
  if (parsed instanceof Response) return parsed;
  const data = validateBlogInquiry(parsed.input);
  if (!data) return reply(422, { error: 'invalid_fields' });
  const { requestId, ...fields } = data;
  const hash = await inquiryPayloadHash(fields);
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
