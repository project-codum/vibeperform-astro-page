import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { handleRequest } from '../worker/accept-markdown.js';
import { notifyInquiry, retryInquiryEmails } from '../worker/website-inquiry-email.js';
import { validateInquiry } from '../worker/website-inquiries.js';

const url = 'https://www.vibeperform.com/api/website-inquiries';
const payload = (changes = {}) => ({ requestId: crypto.randomUUID(), locale: 'de', projectType: 'new', businessType: 'joinery', otherTrade: '', priority: 'enquiries', website: '', message: 'Lokaler Test: Grüße aus der Werkstatt.', email: 'form-test@example.invalid', companyWebsite: '', ...changes });
const request = (data, headers = {}) => new Request(url, { method: 'POST', headers: { Origin: new URL(url).origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
async function fixture() {
  const db = new DatabaseSync(':memory:');
  db.exec(await readFile(new URL('../migrations/0001_website_inquiries.sql', import.meta.url), 'utf8'));
  db.exec(await readFile(new URL('../migrations/0002_inquiry_email_outbox.sql', import.meta.url), 'utf8'));
  return { db, env: {
    ASSETS: { fetch() { throw new Error('API must reach the Worker handler'); } },
    INQUIRY_RATE_LIMITER: { async limit() { return { success: true }; } },
    INQUIRIES_DB: { prepare(sql) { return { bind(...values) { return {
      async run() { return db.prepare(sql).run(...values); },
      async first() { return db.prepare(sql).get(...values); },
      async all() { return {results:db.prepare(sql).all(...values)}; },
    }; } }; } },
  } };
}

test('both locales store a real enquiry, return a reference, and disable caching', async () => {
  const { db, env } = await fixture();
  try { for (const locale of ['de', 'en']) {
    const data = payload({ locale, website: 'www.example.com' });
    const response = await handleRequest(request(data), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await response.json(), { status: 'accepted', requestId: data.requestId });
    const row = db.prepare('SELECT * FROM website_inquiries WHERE request_id = ?').get(data.requestId);
    assert.equal(row.email, data.email); assert.equal(row.message, data.message);
    assert.equal(row.website, 'https://www.example.com/'); assert.equal(row.locale, locale);
  } } finally { db.close(); }
});

test('concurrent retries store one enquiry; changed payload cannot reuse its reference', async () => {
  const { db, env } = await fixture(); const data = payload();
  try {
    const responses = await Promise.all([handleRequest(request(data), env), handleRequest(request(data), env)]);
    assert.deepEqual(responses.map(r => r.status), [200, 200]);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM website_inquiries').get().count, 1);
    assert.equal((await handleRequest(request({ ...data, message: 'Different' }), env)).status, 409);
    assert.equal(db.prepare('SELECT message FROM website_inquiries').get().message, data.message);
  } finally { db.close(); }
});

test('invalid fields, spam trap, oversized body and unsafe URLs cannot be stored', async () => {
  const { db, env } = await fixture();
  try {
    for (const changes of [{ email: 'not-email' }, { email: 'a\nb@example.com' }, { locale: 'fr' }, { priority: 'unknown' }, { companyWebsite: 'spam' }, { message: 'a'.repeat(1001) }, { requestId: '123' }, { website: 'javascript:alert(1)' }, { website: 'https://user:pass@example.com' }]) {
      assert.equal((await handleRequest(request(payload(changes)), env)).status, 422, JSON.stringify(changes));
    }
    assert.equal((await handleRequest(request(payload({ message: 'a'.repeat(9000) })), env)).status, 413);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM website_inquiries').get().count, 0);
    assert.ok(validateInquiry(payload({ message: '', website: '' })));
  } finally { db.close(); }
});

test('only same-origin JSON POST is accepted and rate limiting returns retry guidance', async () => {
  const { db, env } = await fixture();
  try {
    assert.equal((await handleRequest(new Request(url), env)).status, 405);
    assert.equal((await handleRequest(request(payload(), { Origin: 'https://example.org' }), env)).status, 403);
    assert.equal((await handleRequest(request(payload(), { 'Sec-Fetch-Site': 'cross-site' }), env)).status, 403);
    assert.equal((await handleRequest(request(payload(), { 'Content-Type': 'text/plain' }), env)).status, 415);
    env.INQUIRY_RATE_LIMITER.limit = async () => ({ success: false });
    const limited = await handleRequest(request(payload()), env);
    assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '60');
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM website_inquiries').get().count, 0);
  } finally { db.close(); }
});

test('missing bindings, failed writes and unconfirmed reads never report success', async () => {
  const { db, env } = await fixture();
  try {
    assert.equal((await handleRequest(request(payload()), { ...env, INQUIRIES_DB: undefined })).status, 503);
    assert.equal((await handleRequest(request(payload()), { ...env, INQUIRY_RATE_LIMITER: undefined })).status, 503);
    env.INQUIRIES_DB.prepare = () => { throw new Error('Database unavailable'); };
    const failed = await handleRequest(request(payload()), env);
    assert.equal(failed.status, 503); assert.equal((await failed.json()).status, undefined);
    env.INQUIRIES_DB.prepare = () => ({ bind: () => ({ run: async () => ({}), first: async () => null }) });
    assert.equal((await handleRequest(request(payload()), env)).status, 503);
  } finally { db.close(); }
});

test('malformed and oversized streamed JSON is rejected', async () => {
  const { db, env } = await fixture();
  try {
    const headers = { Origin: new URL(url).origin, 'Content-Type': 'application/json' };
    assert.equal((await handleRequest(new Request(url, { method: 'POST', headers, body: '{' }), env)).status, 400);
    const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode('a'.repeat(8193))); controller.close(); } });
    assert.equal((await handleRequest(new Request(url, { method: 'POST', headers, body: stream, duplex: 'half' }), env)).status, 413);
  } finally { db.close(); }
});

test('DE/EN landing pages have matching metadata, direct form endpoint and draft indexing', async () => {
  const routes = { de: 'de/websites-fuer-handwerksbetriebe', en: 'en/websites-for-trade-businesses' };
  for (const [locale, route] of Object.entries(routes)) {
    const html = await readFile(new URL(`../dist/${route}/index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes(`<html lang="${locale}">`));
    assert.ok(html.includes(`rel="canonical" href="https://www.vibeperform.com/${route}/"`));
    assert.ok(html.includes('data-inquiry-endpoint="/api/website-inquiries"'));
    assert.ok(html.includes('name="robots" content="noindex, follow"'));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    for (const alternate of Object.values(routes)) assert.ok(html.includes(`https://www.vibeperform.com/${alternate}/`));
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  }
});

test('notification contains every answer and routes only to contact with customer reply-to', async () => {
 const {db,env}=await fixture();const sent=[];env.INQUIRY_EMAIL={async send(message){sent.push(message);return {messageId:'test-message'};}};
 try{
  const data=payload({businessType:'other',otherTrade:'Elektro',website:'https://example.com',message:'Maßarbeit & Rückfrage'});
  assert.equal((await handleRequest(request(data),env)).status,200);
  assert.equal(sent.length,1);assert.equal(sent[0].to,'contact@vibeperform.com');assert.equal(sent[0].replyTo,data.email);
  for(const value of [data.requestId,data.otherTrade,data.website,data.message,data.email])assert.ok(sent[0].text.includes(value));
  assert.equal(db.prepare('SELECT email_message_id FROM website_inquiries').get().email_message_id,'test-message');
  await Promise.all([handleRequest(request(data),env),handleRequest(request(data),env)]);assert.equal(sent.length,1);
 }finally{db.close();}
});
test('failed email preserves enquiry and scheduled retry sends pending notification',async()=>{
 const {db,env}=await fixture();let fail=true;let attempts=0;env.INQUIRY_EMAIL={async send(){attempts++;if(fail)throw new Error('temporary');return {messageId:'retried'};}};
 try{
  const data=payload();assert.equal((await handleRequest(request(data),env)).status,200);
  assert.equal(db.prepare('SELECT count(*) AS n FROM website_inquiries').get().n,1);
  assert.equal(db.prepare('SELECT email_last_error FROM website_inquiries').get().email_last_error,'send_unconfirmed');
  await retryInquiryEmails(env);assert.equal(attempts,1);
  db.exec('UPDATE website_inquiries SET email_claimed_until=0');fail=false;await retryInquiryEmails(env);
  assert.equal(attempts,2);assert.equal(db.prepare('SELECT email_message_id FROM website_inquiries').get().email_message_id,'retried');
 }finally{db.close();}
});
test('concurrent notification attempts claim one message, and missing email binding leaves it pending',async()=>{
 const {db,env}=await fixture();try{
  const data=payload();await handleRequest(request(data),env);assert.equal(db.prepare('SELECT email_sent_at FROM website_inquiries').get().email_sent_at,null);
  let count=0;env.INQUIRY_EMAIL={async send(){count++;await new Promise(r=>setTimeout(r,10));return {messageId:'single'};}};
  await Promise.all([notifyInquiry(env,data.requestId),notifyInquiry(env,data.requestId)]);assert.equal(count,1);
 }finally{db.close();}
});
