import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const load = route => readFile(new URL(`../dist${route}index.html`,import.meta.url),'utf8');
for (const [locale, route] of [['de','/de/website-erstellen-lassen/'],['en','/en/website-design/']]) {
  test(`${locale}: approved story is the regular service page; comparison URL stays out of the search index`, async () => {
    const [v1,v2,sitemap] = await Promise.all([load(route),load(`${route}v2/`),readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8')]);
    assert.doesNotMatch(v1,/class="sv-scope-grid"/);
    assert.match(v1,/<website-story/);
    assert.doesNotMatch(v1,/name="robots" content="noindex, follow"/);
    assert.doesNotMatch(v1,/class="ws-preview-banner"/);
    assert.match(v2,/name="robots" content="noindex, follow"/);
    assert.ok(v2.includes(`rel="canonical" href="https://www.vibeperform.com${route}"`));
    assert.ok(v2.includes(`href="${route}#umfang"`));
    assert.ok(v2.includes(`href="${locale === 'de' ? '/en/website-design/' : '/de/website-erstellen-lassen/'}v2/"`));
    assert.ok(!sitemap.includes(`${route}v2/`));
    assert.equal((v2.match(/<h1\b/g)||[]).length,1);
  });
  test(`${locale}: all nine chapters and illustrations are server rendered in brandbook order`, async () => {
    const html = await load(route);
    const markdown = await readFile(new URL(`../dist${route}index.md`,import.meta.url),'utf8');
    assert.match(markdown, /Typography|Typografie/);
    assert.match(markdown, /Search optimisation|Suchmaschinenoptimierung/);
    const expected = ['markenkern','sprache','logo','farben','typografie','bildwelt','layout','anwendung','seo'];
    assert.deepEqual([...html.matchAll(/id="story-([^"]+)"/g)].map(m=>m[1]),expected);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size);
    for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),`existing anchor: ${id}`);
    assert.equal((html.match(/<figure class="ws-visual /g)||[]).length,9);
    assert.match(html,/#D6BDF2/);
    assert.match(html,/Arial \/ Georgia/);
    assert.match(html,/data-device="desktop"/);
    assert.match(html,/data-device="mobile"/);
    assert.match(html,/vibeperform-logo\.png/);
    assert.match(html,/favicon\.png/);
    assert.match(html,/_astro\/interior[^" ]+\.webp/);
    assert.match(html,/aria-hidden="true"><div class="ws-stage-panels"/);
  });
}
