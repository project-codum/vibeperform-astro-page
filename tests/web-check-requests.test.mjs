import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import worker from '../worker/accept-markdown.js';

const origin = 'https://www.vibeperform.com';
const createPayload = (changes = {}) => ({
  requestId: crypto.randomUUID(), locale: 'de', website: 'example.org/services',
  email: 'test@example.invalid', phone: '', contactNote: '', ...changes,
});
const post = (payload, env, requestOrigin = origin) => worker.fetch(new Request(`${origin}/api/web-check-requests`, {
  method: 'POST',
  headers: { Origin: requestOrigin, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
}), env);

async function fixture(t) {
  const db = new DatabaseSync(':memory:');
  t.after(() => db.close());
  db.exec(await readFile(new URL('../migrations/0004_web_check_requests.sql', import.meta.url), 'utf8'));
  const env = {
    INQUIRY_RATE_LIMITER: { async limit() { return { success: true }; } },
    INQUIRIES_DB: {
      prepare(sql) {
        const statement = db.prepare(sql);
        return { bind(...values) { return {
          async run() { return statement.run(...values); },
          async first() { return statement.get(...values); },
          async all() { return { results: statement.all(...values) }; },
        }; } };
      },
    },
  };
  return { db, env };
}

test('a valid request stores the submitted details and only emails the team', async t => {
  const { db, env } = await fixture(t);
  const sent = [];
  env.INQUIRY_EMAIL = { async send(message) { sent.push(message); return { messageId: 'local-test' }; } };
  const payload = createPayload({ phone: '+49 (0) 123 456', to: 'other@example.invalid' });
  for (const response of await Promise.all([post(payload, env), post(payload, env)])) {
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await response.json(), { ok: true, reference: payload.requestId });
  }
  const rows = db.prepare('SELECT * FROM web_check_requests').all();
  assert.equal(rows.length, 1);
  const [row] = rows;
  assert.equal(row.website, 'https://example.org/services');
  assert.equal(row.email, payload.email);
  assert.equal(row.phone, payload.phone);
  assert.equal(row.email_message_id, 'local-test');
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'contact@vibeperform.com');
  assert.equal(sent[0].replyTo, payload.email);
  for (const value of [row.website, row.email, row.phone, 'manuell']) assert.ok(sent[0].text.includes(value));
  assert.equal((await post({ ...payload, phone: '+49 444' }, env)).status, 409);
});

test('phone is optional, and failed notifications stay queued for the scheduled retry', async t => {
  const { db, env } = await fixture(t);
  env.INQUIRY_EMAIL = { async send() { throw Error('temporary'); } };
  const response = await post(createPayload({ locale: 'en' }), env);
  assert.equal(response.status, 200);
  const stored = db.prepare('SELECT * FROM web_check_requests').get();
  assert.equal(stored.phone, null);
  assert.equal(stored.email_sent_at, null);
  assert.equal(stored.email_last_error, 'send_unconfirmed');
  db.exec('UPDATE web_check_requests SET email_claimed_until = 0');
  env.INQUIRY_EMAIL.send = async message => {
    assert.match(message.text, /Telefon: Keine Angabe/);
    return { messageId: 'retried' };
  };
  await worker.scheduled({}, env);
  assert.equal(db.prepare('SELECT email_message_id FROM web_check_requests').get().email_message_id, 'retried');
});

test('bad fields and cross-origin requests do not store contact data', async t => {
  const { db, env } = await fixture(t);
  for (const changes of [
    { website: 'localhost' }, { email: 'bad\r\naddress@example.invalid' },
    { phone: 'please call' }, { contactNote: 'bot' }, { requestId: 'none' },
  ]) assert.equal((await post(createPayload(changes), env)).status, 422);
  assert.equal((await post(createPayload(), env, 'https://example.org')).status, 403);
  assert.equal(db.prepare('SELECT count(*) AS count FROM web_check_requests').get().count, 0);
});
