import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { handleRequest } from '../worker/accept-markdown.js';
import { bookingRules, bookingSlots } from '../worker/booking-slots.js';

const origin = 'https://www.vibeperform.com';
const firstSlot = '2026-03-27T08:00:00.000Z';
const mondaySlot = '2026-03-30T07:00:00.000Z';
const meetUrl = 'https://meet.google.com/abc-defg-hij';
const marker = (start, end, fields = {}) => ({
  summary: 'Buchbar', status: 'confirmed', transparency: 'transparent',
  start: { dateTime: start }, end: { dateTime: end }, ...fields,
});

function fixture(t) {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-03-26T07:00:00Z') });
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../migrations/0005_calendar_bookings.sql', import.meta.url), 'utf8'));
  t.after(() => sqlite.close());
  const limit = async () => ({ success: true });
  const env = {
    BOOKING_CALENDAR_ID: 'organizer@example.com',
    BOOKING_AVAILABILITY_CALENDAR_ID: 'availability@example.com',
    BOOKING_BUSY_CALENDAR_IDS: 'busy@example.com',
    BOOKING_GOOGLE_CLIENT_ID: 'test-client',
    BOOKING_GOOGLE_CLIENT_SECRET: 'test-secret',
    BOOKING_GOOGLE_REFRESH_TOKEN: 'test-token',
    BOOKING_READ_LIMITER: { limit },
    BOOKING_WRITE_LIMITER: { limit },
    INQUIRIES_DB: {
      prepare(sql) {
        const prepared = sqlite.prepare(sql);
        return { bind: (...args) => ({
          async all() { return { results: prepared.all(...args) }; },
          async first() { return prepared.get(...args) ?? null; },
          async run() { return { meta: prepared.run(...args) }; },
        }) };
      },
    },
  };
  const state = {
    windows: [
      marker(firstSlot, '2026-03-27T10:45:00.000Z'),
      marker(mondaySlot, '2026-03-30T07:45:00.000Z'),
    ],
    events: new Map(), writes: [], busy: [], errors: [], timeoutAfterWrite: false, rejectWrite: false, pendingMeet: false };
  t.mock.method(globalThis, 'fetch', async (url, request) => {
    const path = new URL(url);
    if (path.hostname === 'oauth2.googleapis.com') {
      assert.equal(request.body.get('grant_type'), 'refresh_token');
      return Response.json({ access_token: 'test-access', expires_in: 3600 });
    }
    assert.equal(request.headers.Authorization, 'Bearer test-access');
    if (path.pathname.endsWith('/freeBusy')) {
      const { items, timeZone } = JSON.parse(request.body);
      assert.deepEqual(items.map(item => item.id), ['availability@example.com', 'organizer@example.com', 'busy@example.com']);
      assert.equal(timeZone, 'Europe/Berlin');
      return Response.json({ calendars: {
        'availability@example.com': { busy: [] },
        'organizer@example.com': { busy: [] },
        'busy@example.com': { busy: state.busy, errors: state.errors },
      } });
    }
    if (request.method === 'GET' && path.pathname.endsWith('/events')) {
      assert.match(path.pathname, /availability%40example\.com/);
      assert.equal(path.searchParams.get('singleEvents'), 'true');
      assert.equal(path.searchParams.get('q'), 'Buchbar');
      assert.doesNotMatch(path.searchParams.get('fields'), /conference|attendee|description/);
      const start = Date.parse(path.searchParams.get('timeMin'));
      const end = Date.parse(path.searchParams.get('timeMax'));
      const items = state.windows.filter(event => Date.parse(event.end.dateTime) > start && Date.parse(event.start.dateTime) < end);
      return !path.searchParams.has('pageToken') && items.length > 1
        ? Response.json({ items: items.slice(0, 1), nextPageToken: 'next' })
        : Response.json({ items: items.slice(path.searchParams.has('pageToken') ? 1 : 0) });
    }
    if (request.method === 'POST') {
      if (state.rejectWrite) return Response.json({}, { status: 403 });
      const event = JSON.parse(request.body);
      assert.equal(path.searchParams.get('sendUpdates'), 'all');
      assert.equal(path.searchParams.get('conferenceDataVersion'), '1');
      state.writes.push(event);
      state.events.set(event.id, { id: event.id, status: 'confirmed', hangoutLink: meetUrl });
      if (state.timeoutAfterWrite) throw new Error('Response was lost');
      if (state.pendingMeet) return Response.json({
        id: event.id,
        conferenceData: { createRequest: { status: { statusCode: 'pending' } } },
      });
      return Response.json(state.events.get(event.id));
    }
    const event = state.events.get(path.pathname.split('/').at(-1));
    return Response.json(event ?? {}, { status: event ? 200 : 404 });
  });
  const slots = () => handleRequest(new Request(`${origin}/api/booking/slots`), env);
  const booking = (overrides = {}, source = origin) => handleRequest(new Request(`${origin}/api/booking/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: source },
    body: JSON.stringify({
      requestId: crypto.randomUUID(), locale: 'de', name: 'Test Person',
      email: 'test@example.com', start: firstSlot, contactNote: '', ...overrides,
    }),
  }), env);
  return { slots, booking, state, env, sqlite };
}

test('Buchbar windows keep their local source times across daylight saving and clip ongoing windows', () => {
  const rules = bookingRules({ BOOKING_LEAD_HOURS: '1' });
  const results = bookingSlots(rules, Date.parse('2026-03-27T11:40:00Z'), [
    { start: Date.parse('2026-03-27T13:05:00+01:00'), end: Date.parse('2026-03-27T17:00:00+01:00') },
    { start: Date.parse('2026-03-30T13:05:00+02:00'), end: Date.parse('2026-03-30T13:50:00+02:00') },
  ]);
  assert.deepEqual(results.map(slot => new Date(slot.start).toISOString()), [
    '2026-03-27T13:05:00.000Z', '2026-03-27T14:05:00.000Z',
    '2026-03-27T15:05:00.000Z', '2026-03-30T11:05:00.000Z',
  ]);
  assert.ok(results.every(slot => slot.end - slot.start === 45 * 60_000));
});

test('reads only free events titled Buchbar, including later pages and an explicitly shifted start', async t => {
  const { slots, state } = fixture(t);
  state.windows.push(
    marker('2026-03-28T08:00Z', '2026-03-28T11:00Z', { summary: 'Not Buchbar' }),
    marker('2026-03-28T12:00Z', '2026-03-28T16:00Z', { transparency: 'opaque' }),
    marker('2026-03-29T08:00Z', '2026-03-29T11:00Z', { status: 'cancelled' }),
    marker('2026-04-01T13:05+02:00', '2026-04-01T13:50+02:00'),
  );
  const data = await slots().then(response => response.json());
  assert.deepEqual(data.slots, [
    firstSlot, '2026-03-27T09:00:00.000Z', '2026-03-27T10:00:00.000Z',
    mondaySlot, '2026-04-01T11:05:00.000Z',
  ]);
  assert.equal(state.writes.length, 0);
  state.windows = [];
  assert.deepEqual((await slots().then(response => response.json())).slots, []);
});

test('availability excludes buffered conflicts and returns only available starts', async t => {
  const { slots, state } = fixture(t);
  state.busy = [{ start: '2026-03-27T07:00:00Z', end: '2026-03-27T07:50:00Z' }];
  const response = await slots();
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(Object.keys(data), ['timeZone', 'duration', 'slots']);
  assert.equal(data.duration, 45);
  assert.equal(data.slots[0], '2026-03-27T09:00:00.000Z');
  assert.ok(data.slots.includes(mondaySlot));
  state.errors = [{ reason: 'notFound' }];
  assert.equal((await slots()).status, 503);
});

test('concurrent submissions produce one Calendar invitation and replay the winning request', async t => {
  const { booking, state, slots, sqlite } = fixture(t);
  const overlappingStart = '2026-03-27T08:30:00.000Z';
  state.windows.push(marker(overlappingStart, '2026-03-27T09:15:00.000Z'));
  const requests = [firstSlot, overlappingStart].map(start => ({ start, requestId: crypto.randomUUID() }));
  const responses = await Promise.all(requests.map(request => booking(request)));
  const winner = responses.findIndex(response => response.ok);
  assert.notEqual(winner, -1);
  assert.equal(await responses[1 - winner].json().then(data => data.error), 'slot_taken');
  assert.equal(state.writes.length, 1);
  const [event] = state.writes;
  assert.deepEqual(event.attendees, [{ email: 'test@example.com', displayName: 'Test Person' }]);
  assert.deepEqual(event.start, { dateTime: requests[winner].start, timeZone: 'Europe/Berlin' });
  assert.equal(Date.parse(event.end.dateTime) - Date.parse(event.start.dateTime), 45 * 60_000);
  assert.equal(event.transparency, 'opaque');
  assert.equal(event.conferenceData.createRequest.conferenceSolutionKey.type, 'hangoutsMeet');

  const again = await booking(requests[winner]);
  assert.deepEqual(await again.json(), { ok: true, meetUrl });
  assert.equal(state.writes.length, 1);
  const locked = await slots().then(response => response.json());
  assert.equal(locked.slots.includes(firstSlot) || locked.slots.includes(overlappingStart), false);
  assert.doesNotMatch(JSON.stringify(sqlite.prepare('SELECT * FROM calendar_bookings').all()), /Test Person|test@example.com/);
  assert.equal((await booking({ ...requests[winner], name: 'Different Person' })).status, 409);
});

test('rechecks stale availability, validates submissions and recovers lost Google responses', async t => {
  const { booking, state } = fixture(t);
  assert.equal((await booking({}, 'https://another.example')).status, 403);
  assert.equal((await booking({ contactNote: 'robot' })).status, 422);
  assert.equal((await booking({ start: '2026-03-27T08:30:00.000Z' })).status, 409);
  state.busy = [{ start: firstSlot, end: '2026-03-27T08:30:00Z' }];
  assert.equal((await booking()).status, 409);
  assert.equal(state.writes.length, 0);
  state.busy = [];
  const windows = state.windows;
  state.windows = [];
  assert.equal((await booking()).status, 409);
  state.windows = windows;
  state.rejectWrite = true;
  assert.equal((await booking()).status, 503);
  state.rejectWrite = false;
  state.timeoutAfterWrite = true;
  assert.deepEqual(await booking().then(response => response.json()), { ok: true, meetUrl });
  assert.equal(state.writes.length, 1);
});

test('a pending Google Meet conference is retrieved without sending a second invitation', async t => {
  const { booking, state } = fixture(t);
  state.pendingMeet = true;
  assert.deepEqual(await booking().then(response => response.json()), { ok: true, meetUrl });
  assert.equal(state.writes.length, 1);
});

test('a confirmed lock yields to FreeBusy when a future booking is cancelled', async t => {
  const { booking, state, slots } = fixture(t);
  const requestId = crypto.randomUUID();
  assert.equal((await booking({ requestId })).status, 200);
  assert.ok(!(await slots().then(response => response.json())).slots.includes(firstSlot));

  const [event] = state.writes;
  t.mock.timers.tick(3 * 60_000);
  state.busy = [{ start: event.start.dateTime, end: event.end.dateTime }];
  assert.ok(!(await slots().then(response => response.json())).slots.includes(firstSlot));

  state.busy = [];
  state.events.get(event.id).status = 'cancelled';
  assert.ok((await slots().then(response => response.json())).slots.includes(firstSlot));
  assert.equal((await booking({ requestId })).status, 409);
  assert.equal(state.writes.length, 1);
});

test('a Worker without Calendar credentials serves a recoverable availability error', async t => {
  const { slots, booking, env } = fixture(t);
  delete env.BOOKING_GOOGLE_REFRESH_TOKEN;
  assert.equal((await slots()).status, 503);
  assert.equal((await booking()).status, 503);
});
