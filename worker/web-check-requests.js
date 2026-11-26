import { parseWebsiteAddress } from '../src/lib/websiteAddress.js';
import { createInquiryEmailOutbox } from './inquiry-email-outbox.js';
import { inquiryPayloadHash, readInquiryRequest, reply } from './inquiry-request.js';
import { INQUIRY_RECIPIENT } from './website-inquiry-email.js';

const outbox = createInquiryEmailOutbox('web_check_requests', row => ({
  from: { email: 'website@notifications.vibeperform.com', name: 'VibePerform Website' },
  to: INQUIRY_RECIPIENT,
  replyTo: row.email,
  subject: `Neuer Web Check · ${row.request_id}`,
  text: [
    'Neue Anfrage für den manuellen Webseitencheck',
    `Anfragenummer: ${row.request_id}`,
    `Eingang: ${row.created_at} (UTC)`,
    `Sprache: ${row.locale.toUpperCase()}`,
    '',
    `Webseite: ${row.website}`,
    `E-Mail: ${row.email}`,
    `Telefon: ${row.phone || 'Keine Angabe'}`,
    '',
    'Webseitencheck manuell durchführen und das Ergebnis per Antwort an die anfragende Person schicken.',
  ].join('\n'),
}));

export const retryWebCheckEmails = outbox.retry;

function validateWebCheck(input) {
  if (!input || !['de', 'en'].includes(input.locale) || input.contactNote !== '') return null;
  const { requestId, locale, website, email, phone } = input;
  for (const [value, max] of [[requestId, 36], [website, 2048], [email, 254], [phone, 40]]) {
    if (typeof value !== 'string' || value.length > max || /[\u0000-\u001f\u007f]/.test(value)) return null;
  }
  const url = parseWebsiteAddress(website);
  const address = email.trim();
  const telephone = phone.trim();
  if (!url || url.href.length > 2048 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address)) return null;
  if (telephone && (!/^[+\d(). /-]+$/.test(telephone) || !/\d/.test(telephone))) return null;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) return null;
  return { requestId: requestId.toLowerCase(), locale, website: url.href, email: address, phone: telephone || null };
}

export async function handleWebCheckRequest(request, env) {
  const parsed = await readInquiryRequest(request, env);
  if (parsed instanceof Response) return parsed;
  const data = validateWebCheck(parsed.input);
  if (!data) return reply(422, { error: 'invalid_fields' });
  const { requestId, ...fields } = data;
  const hash = await inquiryPayloadHash(fields);

  try {
    const db = env.INQUIRIES_DB;
    await db.prepare(`INSERT INTO web_check_requests (request_id, payload_hash, locale, website, email, phone)
      VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(request_id) DO NOTHING`)
      .bind(requestId, hash, fields.locale, fields.website, fields.email, fields.phone).run();
    const stored = await db.prepare('SELECT payload_hash FROM web_check_requests WHERE request_id = ?').bind(requestId).first();
    if (!stored) return reply(503, { error: 'storage_unconfirmed' });
    if (stored.payload_hash !== hash) return reply(409, { error: 'request_id_conflict' });
    await outbox.notify(env, requestId);
    return reply(200, { ok: true, reference: requestId });
  } catch {
    return reply(503, { error: 'temporarily_unavailable' });
  }
}
