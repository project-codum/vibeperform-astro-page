import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import test from 'node:test';
import {createJiti} from 'jiti';
const {serviceDetails,detailPaths,serviceKeys}=await createJiti(import.meta.url).import('../src/data/serviceDetails.ts');
const load=route=>readFile(new URL(`../dist${route}index.html`,import.meta.url),'utf8');
for(const locale of ['de','en']) for(const key of serviceKeys){
 const route=detailPaths[locale][key];
 test(`${route}: complete service, shared structure, correct language and working links`,async()=>{
  const html=await load(route);
  const other=locale==='de'?'en':'de';
  const canonical=`https://www.vibeperform.com${route}`;
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,new RegExp(`<html lang="${locale}"`));
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
  assert.ok(html.includes(`href="${detailPaths[other][key]}"`));
  const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  assert.deepEqual([...main.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map(m=>m[1]),['ausgangslage','umfang','ablauf','weiterdenken','fragen','kontakt']);
  assert.equal((main.match(/<details\b/g)||[]).length,5);
  assert.ok(main.includes(`sd-visual-${key}`));
  assert.doesNotMatch(main,/lorem ipsum|TODO|TBD|href="#"/i);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,'unique element IDs');
  for(const [,href] of html.matchAll(/href="([^" ]+)"/g)){
   if(!href.startsWith('/')&&!href.startsWith('#'))continue;
   const url=new URL(href,canonical);
   if(!url.pathname.endsWith('/'))continue;
   const target=url.pathname===route?html:await load(url.pathname);
   if(url.hash)assert.ok(target.includes(`id="${url.hash.slice(1)}"`),`${href} exists`);
  }
  const schemas=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const service=schemas.find(s=>s['@type']==='Service');
  assert.equal(service.url,canonical);
  assert.equal(service.name,serviceDetails[locale][key].name);
  assert.ok(!service.offers&&!service.aggregateRating,'no invented price or ratings');
  const markdown=await readFile(new URL(`../dist${route}index.md`,import.meta.url),'utf8');
  for(const [,body] of [...serviceDetails[locale][key].scope,...serviceDetails[locale][key].faq]) assert.ok(markdown.includes(body),'Markdown includes the same scope and answers');
  assert.ok(markdown.includes(serviceDetails[locale][key].boundary));
  assert.match(html,/mailto:contact@vibeperform.com/);
  assert.match(html,/calendar.app.google\/utFQgw33PwJTiDk56/);
  const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
  assert.equal(sitemap.split(`<loc>${canonical}</loc>`).length-1,1);
  const current=html.match(/<a[^>]*aria-current="page"[^>]*>/g)||[];
  assert.ok(current.some(tag=>tag.includes(`href="${route}"`)),'menu marks current page');
 });
}
test('all portfolio services have direct detail links in the overview and menu',async()=>{
 for(const locale of ['de','en']){
  const html=await load(locale==='de'?'/de/leistungen/':'/en/services/');
  const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  for(const route of Object.values(detailPaths[locale]))assert.ok(main.includes(`href="${route}"`));
 }
 const text=await readFile(new URL('../dist/llms.txt',import.meta.url),'utf8');
 for(const route of Object.values(detailPaths.de))assert.ok(text.includes(`${route}index.md`));
});
