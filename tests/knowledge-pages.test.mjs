import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
const load = route => readFile(new URL(`../dist/${route}/index.html`,import.meta.url),'utf8');
for (const locale of ['de','en']) {
 test(`${locale} knowledge overview and articles retain working navigation, metadata and contents`,async()=>{
  const index = await load(`${locale}/blog`);
  assert.equal((index.match(/<h1\b/g)||[]).length,1);
  assert.match(index,/class="home-navigation"/);
  assert.match(index,/class="hp-footer"/);
  assert.doesNotMatch(index,/class="kn-topics"|WISSEN &amp; EINBLICKE|Knowledge &amp; insights/);
  assert.doesNotMatch(index,/Vom Lesen ins Gespräch|Wir klären gemeinsam, was Sie brauchen und wie wir Sie unterstützen können\.|From reading to a conversation|Together, we work out what you need and how we can help\./);
  assert.match(index,/class="kn-featured"/);
  assert.match(index,/aria-current="page" href="[^\"]*\/blog\/"/);
  const files = (await readdir(new URL(`../src/pages/${locale}/blog/`,import.meta.url))).filter(f=>f.endsWith('.md'));
  for (const file of files) {
   const route=`${locale}/blog/${file.replace(/\.md$/,'')}`;
   assert.ok(index.includes(`href="/${route}"`) || index.includes(`href="/${route}/"`),`${file} is discoverable`);
   const html=await load(route);
   assert.equal((html.match(/<h1\b/g)||[]).length,1);
   assert.match(html,/class="home-navigation"/);
   assert.match(html,/class="hp-footer"/);
   assert.match(html,/class="kn-toc"/);
   assert.match(html,/"@type":"BlogPosting"/);
   assert.match(html,/property="og:type" content="article"/);
   assert.match(html,/rel="alternate" type="text\/markdown"/);
   const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
   assert.equal(new Set(ids).size,ids.length);
   for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),`${file}: anchor ${id} exists`);
   const toc=html.match(/<aside class="kn-toc">([\s\S]*?)<\/aside>/)[1];
   assert.ok((toc.match(/href="#/g)||[]).length>0);
   for (const [,asset] of html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) await readFile(new URL(`../dist${asset}`,import.meta.url));
   const md=await readFile(new URL(`../dist/${route}/index.md`,import.meta.url),'utf8');
   assert.ok(md.length>1000);
   assert.ok(md.includes(`https://www.vibeperform.com/${route}/`));
  }
  const md=await readFile(new URL(`../dist/${locale}/blog/index.md`,import.meta.url),'utf8');
  assert.ok(md.includes(`/${locale}/blog/`));
  assert.doesNotMatch(md,/Eine Website planen|Was beschäftigt Sie gerade\?|Planning a website|What is on your mind\?/);
 });
}
