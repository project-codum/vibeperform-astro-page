import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { installUmami } from '../src/scripts/umami-consent.js';
const approved = { purposeConsents: { analytics: true }, vendorConsents: { analytics: true } };
function fixture(data, hostname = 'www.vibeperform.com') {
 const scripts = [], events = {};
 const win = { location: { hostname }, __cmp(command, args) { if(command === 'getCMPData') return data; if(command === 'addEventListener') events[args[0]] = args[1]; } };
 const doc = { createElement() { return { dataset: {} }; }, head: { appendChild(script) { scripts.push(script); } } };
 return { win, doc, scripts, set(value) { data = value; }, fire(event = 'consent') { events[event]?.(event); } };
}
test('Umami makes no script request without complete approval or on previews', () => {
 for (const data of [undefined, {}, {purposeConsents:{analytics:true}}, {purposeConsents:{analytics:true},vendorConsents:{analytics:false}}]) {
  const f=fixture(data);installUmami(f.win,f.doc);f.fire('consentapproved');assert.equal(f.scripts.length,0);
 }
 const f=fixture(approved,'127.0.0.1');installUmami(f.win,f.doc);assert.equal(f.scripts.length,0);
});
test('approval inserts exactly one deferred tracker with the supplied ID and query exclusions',()=>{
 const f=fixture();installUmami(f.win,f.doc);f.set(approved);f.fire();f.fire();installUmami(f.win,f.doc);
 assert.equal(f.scripts.length,1);const s=f.scripts[0];assert.equal(s.src,'https://cloud.umami.is/script.js');assert.equal(s.defer,true);
 assert.equal(s.dataset.websiteId,'f4d32a51-9990-49dc-8daf-388a72a62b74');assert.equal(s.dataset.excludeSearch,'true');assert.equal(s.dataset.excludeHash,'true');
 const payload={url:'/de/',referrer:'https://example.com/?email=private@example.com#secret'};
 assert.equal(f.win.__vibeperformUmamiBeforeSend('event',payload).referrer,'https://example.com/');
});
test('withdrawal and unavailable consent block further payloads, including an in-flight script load',()=>{
 const f=fixture(approved);installUmami(f.win,f.doc);f.set(undefined);assert.equal(f.win.__vibeperformUmamiBeforeSend('event',{}),false);f.fire('consentrejected');f.set(approved);f.fire();
 assert.equal(f.scripts.length,1);assert.equal(f.win.__vibeperformUmamiBeforeSend('event',{}),false);
});
test('shared head integrates Umami on German and English article and landing pages',async()=>{
 for(const route of ['de/index.html','en/index.html','de/blog/php2shell-sicherheitsluecke-webseite/index.html','de/datenschutz/index.html','en/privacy/index.html']){
  const html=await readFile(new URL('../dist/'+route,import.meta.url),'utf8');const head=html.match(/<head>([\s\S]*?)<\/head>/)[1];assert.ok(head.includes('f4d32a51-9990-49dc-8daf-388a72a62b74'));assert.ok(head.includes('__vibeperformUmamiBeforeSend'));
 }
});
