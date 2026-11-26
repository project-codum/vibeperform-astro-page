import { bookingRules, bookingSlots, isFree, minute, timeZone } from './booking-slots.js';
import { CalendarError, googleCalendar } from './google-booking-calendar.js';
import { inquiryPayloadHash, readInquiryRequest, reply } from './inquiry-request.js';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const configured = env => env.BOOKING_CALENDAR_ID && env.BOOKING_GOOGLE_CLIENT_ID
  && env.BOOKING_GOOGLE_CLIENT_SECRET && env.BOOKING_GOOGLE_REFRESH_TOKEN && env.INQUIRIES_DB;

function normalize(input) {
  if (!input || !['de', 'en'].includes(input.locale) || input.contactNote !== '') return null;
  const { start, requestId, locale } = input;
  if (typeof start !== 'string' || start.length !== 24 || typeof requestId !== 'string' || !uuid.test(requestId)) return null;
  const time = Date.parse(start);
  if (!Number.isFinite(time) || new Date(time).toISOString() !== start) return null;
  const { name, email } = input;
  if (typeof name !== 'string' || typeof email !== 'string' || name.length > 120 || email.length > 254
    || !name.trim() || /[\u0000-\u001f\u007f]/.test(name) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim())) return null;
  return { requestId: requestId.toLowerCase(), start: time, locale, name: name.trim(), email: email.trim() };
}

const unavailable = () => reply(503, { error: 'temporarily_unavailable' });
const taken = () => reply(409, { error: 'slot_taken' });
const unconfirmed = () => reply(503, { error: 'booking_unconfirmed' });

async function booked(calendar, id, event) {
  if (event.conferenceData?.createRequest?.status?.statusCode === 'pending') {
    for (const delay of [250, 750]) {
      await new Promise(resolve => setTimeout(resolve, delay));
      try { event = await calendar.get(id); }
      catch { break; }
      if (event.conferenceData?.createRequest?.status?.statusCode !== 'pending') break;
    }
  }
  const meetUrl = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(event.hangoutLink)
    ? event.hangoutLink : undefined;
  return reply(200, { ok: true, meetUrl });
}

async function replay(calendar, id, lock, hash) {
  if (lock.payload_hash !== hash) return reply(409, { error: 'request_id_conflict' });
  try {
    const event = await calendar.get(id);
    return event.status === 'cancelled' ? taken() : booked(calendar, id, event);
  } catch {
    return unconfirmed();
  }
}

export async function listBookingSlots(request, env) {
  if (request.method !== 'GET') return reply(405, { error: 'method_not_allowed' }, { Allow: 'GET' });
  if (!configured(env) || !env.BOOKING_READ_LIMITER) return unavailable();
  try {
    const limit = await env.BOOKING_READ_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
    if (!limit.success) return reply(429, { error: 'rate_limited' }, { 'Retry-After': '60' });
    const rules = bookingRules(env);
    const slots = bookingSlots(rules, Date.now());
    let available = [];
    if (slots.length) {
      const first = slots[0].start;
      const last = slots.at(-1).end;
      const padding = rules.buffer * minute;
      const [busy, { results }] = await Promise.all([
        googleCalendar(env).busy(first - padding, last + padding),
        env.INQUIRIES_DB.prepare('SELECT starts_at FROM calendar_bookings WHERE starts_at BETWEEN ? AND ?').bind(first, last).all(),
      ]);
      const locked = new Set(results.map(row => row.starts_at));
      available = slots.filter(slot => !locked.has(slot.start) && isFree(slot, busy, rules.buffer));
    }
    return reply(200, {
      timeZone, duration: rules.duration,
      slots: available.map(slot => new Date(slot.start).toISOString()),
    }, { 'Cache-Control': 'private, max-age=20' });
  } catch {
    return unavailable();
  }
}

export async function createCalendarBooking(request, env) {
  const parsed = await readInquiryRequest(request, env, env.BOOKING_WRITE_LIMITER ?? null);
  if (parsed instanceof Response) return parsed;
  const input = normalize(parsed.input);
  if (!input) return reply(422, { error: 'invalid_fields' });
  if (!configured(env)) return unavailable();

  const db = env.INQUIRIES_DB;
  const calendar = googleCalendar(env);
  const { requestId } = input;
  const id = 'vp' + requestId.replaceAll('-', '');
  const findRequest = () => db.prepare('SELECT payload_hash FROM calendar_bookings WHERE request_id = ?').bind(requestId).first();
  const release = () => db.prepare('DELETE FROM calendar_bookings WHERE request_id = ?').bind(requestId).run();

  let reserved = false;
  try {
    const hash = await inquiryPayloadHash(input);
    const existing = await findRequest();
    if (existing) return replay(calendar, id, existing, hash);
    const rules = bookingRules(env);
    const slot = bookingSlots(rules, Date.now()).find(candidate => candidate.start === input.start);
    if (!slot) return taken();

    const padding = rules.buffer * minute;
    const busy = await calendar.busy(slot.start - padding, slot.end + padding);
    if (!isFree(slot, busy, rules.buffer)) {
      const concurrent = await findRequest();
      return concurrent ? replay(calendar, id, concurrent, hash) : taken();
    }

    // One writer per bookable start. Keep the lock after an ambiguous Google result.
    const claim = await db.prepare('INSERT INTO calendar_bookings VALUES (?, ?, ?) ON CONFLICT DO NOTHING')
      .bind(slot.start, requestId, hash).run();
    if (!claim.meta.changes) {
      const concurrent = await findRequest();
      return concurrent ? replay(calendar, id, concurrent, hash) : taken();
    }
    reserved = true;

    let event;
    try {
      event = await calendar.insert(id, slot, input);
    } catch (error) {
      if (error instanceof CalendarError && [400, 401, 403, 404, 429].includes(error.status)) {
        await release();
        return unavailable();
      }
      return replay(calendar, id, { payload_hash: hash }, hash);
    }
    return booked(calendar, id, event);
  } catch {
    return reserved ? unconfirmed() : unavailable();
  }
}

export async function pruneBookingLocks(env) {
  if (!env.INQUIRIES_DB) return;
  await env.INQUIRIES_DB.prepare('DELETE FROM calendar_bookings WHERE starts_at < ?').bind(Date.now()).run();
}
