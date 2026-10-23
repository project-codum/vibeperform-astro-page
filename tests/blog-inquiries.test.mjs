import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import worker, { handleRequest } from '../worker/accept-markdown.js';
import { notifyBlogInquiry, retryBlogInquiryEmails } from '../worker/blog-inquiry-email.js';
import { validateBlogInquiry } from '../worker/blog-inquiries.js';

const url = 'https://www.vibeperform.com/api/blog-inquiries';
const payload = (changes = {}) => ({ requestId: crypto.randomUUID(), updateFrequency: 'monthly', contentOwner: 'self', updateObstacle: 'time', email: 'blog-test@example.invalid', companyWebsite: '', ...changes });
const request = (data, headers = {}) => new Request(url, { method: 'POST', headers: { Origin: new URL(url).origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
async function fixture() {
  const db = new DatabaseSync(':memory:');
  for (const migration of ['0001_website_inquiries.sql', '0002_inquiry_email_outbox.sql', '0003_blog_inquiries.sql']) db.exec(await readFile(new URL(`../migrations/${migration}`, import.meta.url), 'utf8'));
  return { db, env: {
    ASSETS: { fetch() { throw new Error('API must reach the Worker handler'); } },
    INQUIRY_RATE_LIMITER: { async limit() { return { success: true }; } },
    INQUIRIES_DB: { prepare(sql) { return { bind(...values) { return {
      async run() { return db.prepare(sql).run(...values); },
      async first() { return db.prepare(sql).get(...values); },
      async all() { return { results: db.prepare(sql).all(...values) }; },
    }; } }; } },
  } };
}

test('blog route confirms dedicated storage and includes every answer in fixed-recipient notification', async () => {
  const { db, env } = await fixture(); const sent = [];
  env.INQUIRY_EMAIL = { async send(message) { sent.push(message); return { messageId: 'blog-message' }; } };
  try {
    const data = payload({ source: 'forged-campaign', to: 'attacker@example.invalid', businessType: 'joinery' });
    const response = await handleRequest(request(data), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex');
    assert.deepEqual(await response.json(), { ok: true, reference: data.requestId });
    const row = db.prepare('SELECT * FROM blog_inquiries').get();
    assert.equal(row.source, 'php2shell');
    assert.equal(row.email, data.email);
    assert.equal(row.update_frequency, data.updateFrequency);
    assert.equal(row.content_owner, data.contentOwner);
    assert.equal(row.update_obstacle, data.updateObstacle);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM website_inquiries').get().n, 0);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, 'contact@vibeperform.com');
    assert.equal(sent[0].replyTo, data.email);
    assert.equal(sent[0].html, undefined);
    for (const value of ['Jeden Monat', 'Ich selbst', 'Zu wenig Zeit', data.email, data.requestId, 'PHP2Shell']) assert.ok(sent[0].text.includes(value));
    assert.equal(row.email_message_id, 'blog-message');
  } finally { db.close(); }
});

test('concurrent retries save one row and send once; conflicting answers cannot overwrite', async () => {
  const { db, env } = await fixture(); let sends = 0;
  env.INQUIRY_EMAIL = { async send() { sends++; await new Promise(resolve => setTimeout(resolve, 5)); return { messageId: 'one' }; } };
  try {
    const data = payload();
    const responses = await Promise.all([handleRequest(request(data), env), handleRequest(request(data), env)]);
    assert.deepEqual(responses.map(r => r.status), [200, 200]);
    assert.equal(sends, 1);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM blog_inquiries').get().n, 1);
    assert.equal((await handleRequest(request({ ...data, updateObstacle: 'technology' }), env)).status, 409);
    assert.equal((await handleRequest(request({ ...data, requestId: data.requestId.toUpperCase() }), env)).status, 200);
    assert.equal(db.prepare('SELECT update_obstacle FROM blog_inquiries').get().update_obstacle, 'time');
    assert.equal(sends, 1);
  } finally { db.close(); }
});

test('invalid enums, email injection, UUID and honeypot reject before persistence', async () => {
  const { db, env } = await fixture();
  try {
    for (const changes of [{ updateFrequency: 'none' }, { updateFrequency: 'daily' }, { contentOwner: 'yes' }, { updateObstacle: 'restart' }, { email: 'not-an-email' }, { email: 'a\r\nb@example.com' }, { email: 'a\u0000@example.com' }, { email: 'a'.repeat(255)+'@example.com' }, { requestId: '123' }, { companyWebsite: 'spam' }, { companyWebsite: undefined }]) {
      assert.equal((await handleRequest(request(payload(changes)), env)).status, 422, JSON.stringify(changes));
    }
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM blog_inquiries').get().n, 0);
    for (const updateFrequency of ['weekly', 'monthly', 'rarely', 'never']) for (const contentOwner of ['self', 'team', 'external', 'nobody']) for (const updateObstacle of ['time', 'ideas', 'technology', 'none']) assert.ok(validateBlogInquiry(payload({ updateFrequency, contentOwner, updateObstacle })));
  } finally { db.close(); }
});

test('same-origin JSON POST and rate limiter are required', async () => {
  const { db, env } = await fixture();
  try {
    assert.equal((await handleRequest(new Request(url), env)).status, 405);
    assert.equal((await handleRequest(request(payload(), { Origin: 'https://example.org' }), env)).status, 403);
    const noOrigin = request(payload()); noOrigin.headers.delete('Origin');
    assert.equal((await handleRequest(noOrigin, env)).status, 403);
    assert.equal((await handleRequest(request(payload(), { 'Sec-Fetch-Site': 'cross-site' }), env)).status, 403);
    assert.equal((await handleRequest(request(payload(), { 'Content-Type': 'text/plain' }), env)).status, 415);
    env.INQUIRY_RATE_LIMITER.limit = async () => ({ success: false });
    const limited = await handleRequest(request(payload()), env);
    assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '60');
    env.INQUIRY_RATE_LIMITER.limit = async () => { throw new Error('unavailable'); };
    assert.equal((await handleRequest(request(payload()), env)).status, 503);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM blog_inquiries').get().n, 0);
  } finally { db.close(); }
});

test('malformed and oversized JSON is rejected even with no Content-Length', async () => {
  const { db, env } = await fixture();
  try {
    const headers = { Origin: new URL(url).origin, 'Content-Type': 'application/json' };
    assert.equal((await handleRequest(new Request(url, { method: 'POST', headers, body: '{' }), env)).status, 400);
    assert.equal((await handleRequest(request(payload(), { 'Content-Length': '8193' }), env)).status, 413);
    const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode('a'.repeat(8193))); controller.close(); } });
    assert.equal((await handleRequest(new Request(url, { method: 'POST', headers, body: stream, duplex: 'half' }), env)).status, 413);
  } finally { db.close(); }
});

test('missing bindings, failed database and unconfirmed read never acknowledge receipt', async () => {
  const { db, env } = await fixture();
  try {
    for (const key of ['INQUIRIES_DB', 'INQUIRY_RATE_LIMITER']) assert.equal((await handleRequest(request(payload()), { ...env, [key]: undefined })).status, 503);
    env.INQUIRIES_DB.prepare = () => { throw new Error('private database details'); };
    const failed = await handleRequest(request(payload()), env);
    assert.equal(failed.status, 503); assert.deepEqual(await failed.json(), { error: 'temporarily_unavailable' });
    env.INQUIRIES_DB.prepare = () => ({ bind: () => ({ run: async () => ({}), first: async () => null }) });
    const unconfirmed = await handleRequest(request(payload()), env);
    assert.equal(unconfirmed.status, 503); assert.deepEqual(await unconfirmed.json(), { error: 'storage_unconfirmed' });
  } finally { db.close(); }
});

test('failed notification preserves accepted answers and cron retries with stable reference', async () => {
  const { db, env } = await fixture(); let fail = true; const sent = [];
  env.INQUIRY_EMAIL = { async send(message) { sent.push(message); if (fail) throw new Error('temporary'); return { messageId: 'retried' }; } };
  try {
    const data = payload({ updateFrequency: 'never', contentOwner: 'team', updateObstacle: 'ideas' });
    assert.equal((await handleRequest(request(data), env)).status, 200);
    assert.equal(db.prepare('SELECT email_last_error FROM blog_inquiries').get().email_last_error, 'send_unconfirmed');
    await worker.scheduled({}, env); assert.equal(sent.length, 1);
    db.exec('UPDATE blog_inquiries SET email_claimed_until = 0'); fail = false;
    await worker.scheduled({}, env);
    assert.equal(sent.length, 2); assert.equal(sent[0].subject, sent[1].subject);
    assert.equal(db.prepare('SELECT email_message_id FROM blog_inquiries').get().email_message_id, 'retried');
    for (const label of ['Nie', 'Unser Team', 'Fehlende Ideen']) assert.ok(sent[1].text.includes(label));
    await worker.scheduled({}, env); assert.equal(sent.length, 2);
  } finally { db.close(); }
});

test('unconfirmed email response retries; missing email binding leaves durable pending item', async () => {
  const { db, env } = await fixture();
  try {
    const data = payload(); await handleRequest(request(data), env);
    assert.equal(db.prepare('SELECT email_sent_at FROM blog_inquiries').get().email_sent_at, null);
    env.INQUIRY_EMAIL = { async send() { return {}; } };
    assert.equal(await notifyBlogInquiry(env, data.requestId), false);
    assert.equal(db.prepare('SELECT email_last_error FROM blog_inquiries').get().email_last_error, 'send_unconfirmed');
    db.exec('UPDATE blog_inquiries SET email_claimed_until = 0'); let sends = 0;
    env.INQUIRY_EMAIL.send = async () => { sends++; await new Promise(resolve => setTimeout(resolve, 5)); return { messageId: 'after-unconfirmed' }; };
    await Promise.all([retryBlogInquiryEmails(env), notifyBlogInquiry(env, data.requestId)]);
    assert.equal(sends, 1);
  } finally { db.close(); }
});

test('blog retry continues if legacy outbox is unavailable', async () => {
  const { db, env } = await fixture(); let sends = 0;
  try {
    await handleRequest(request(payload()), env);
    db.exec('DROP TABLE website_inquiries');
    env.INQUIRY_EMAIL = { async send() { sends++; return { messageId: 'independent' }; } };
    await worker.scheduled({}, env);
    assert.equal(sends, 1);
  } finally { db.close(); }
});


test('all content-owner and obstacle combinations persist and notify with literal answers', async () => {
  const { db, env } = await fixture(); const sent = [];
  env.INQUIRY_EMAIL = { async send(message) { sent.push(message); return { messageId: `answers-${sent.length}` }; } };
  const owners = { self: 'Ich selbst', team: 'Unser Team', external: 'Externe Betreuung', nobody: 'Niemand' };
  const obstacles = { time: 'Zu wenig Zeit', ideas: 'Fehlende Ideen', technology: 'Umständliche Technik', none: 'Nichts, läuft gut' };
  try {
    for (const [contentOwner, ownerLabel] of Object.entries(owners)) for (const [updateObstacle, obstacleLabel] of Object.entries(obstacles)) {
      const data = payload({ updateFrequency: 'never', contentOwner, updateObstacle });
      assert.equal((await handleRequest(request(data), env)).status, 200);
      const row = db.prepare('SELECT * FROM blog_inquiries WHERE request_id = ?').get(data.requestId);
      assert.equal(row.content_owner, contentOwner);
      assert.equal(row.update_obstacle, updateObstacle);
      assert.equal(row.update_frequency, 'never');
      assert.equal(row.current_presence, undefined);
      assert.equal(row.project_interest, undefined);
      const message = sent.at(-1).text;
      assert.ok(message.includes('Wie oft aktualisieren Sie Ihre Webseite mit neuen Inhalten? Nie'));
      assert.ok(message.includes(`Wer kümmert sich bei Ihnen um neue Inhalte? ${ownerLabel}`));
      assert.ok(message.includes(`Was erschwert Ihnen die Pflege Ihrer Webseite? ${obstacleLabel}`));
      assert.ok(!message.includes('Neu starten'));
      assert.ok(!message.includes('Kommt für Sie eine neue Webseite'));
      assert.ok(message.includes('keine technische Prüfung oder Beauftragung'));
    }
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM blog_inquiries').get().n, 16);
    assert.equal(sent.length, 16);
  } finally { db.close(); }
});

test('obsolete questionnaire fields and answer enums are rejected without recording interest', async () => {
  const { db, env } = await fixture();
  try {
    const { contentOwner, updateObstacle, ...common } = payload();
    const outdated = { ...common, currentPresence: 'important', projectInterest: 'new' };
    for (const data of [
      outdated,
      payload({ currentPresence: 'important' }),
      payload({ projectInterest: 'new' }),
      payload({ contentOwner: 'important' }),
      payload({ contentOwner: 'not-now' }),
      payload({ updateObstacle: 'new' }),
      payload({ updateObstacle: 'not-now' }),
    ]) assert.equal((await handleRequest(request(data), env)).status, 422);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM blog_inquiries').get().n, 0);
  } finally { db.close(); }
});
