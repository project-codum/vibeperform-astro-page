import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const load = route => readFile(new URL(`../dist${route}index.html`,import.meta.url),'utf8');
for (const [locale, route] of [['de','/de/website-erstellen-lassen/'],['en','/en/website-design/']]) {
  test(`${locale}: creation page has one three-stage narrative and preserves preview indexing`, async () => {
    const [html,preview,sitemap] = await Promise.all([load(route),load(`${route}v2/`),readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8')]);
    assert.doesNotMatch(html, /<website-story|class="hp-process-grid"/);
    assert.deepEqual([...html.matchAll(/id="creation-step-([^"]+)"/g)].map(m=>m[1]), ['0','1','2']);
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    assert.match(preview, /name="robots" content="noindex, follow"/);
    assert.ok(preview.includes(`rel="canonical" href="https://www.vibeperform.com${route}"`));
    assert.ok(preview.includes(`href="${route}#umfang"`));
    assert.ok(!sitemap.includes(`${route}v2/`));
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size);
    for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id),`existing anchor: ${id}`);
  });
  test(`${locale}: real project, responsibilities, cost guidance and approval are available without scripts`, async () => {
    const html = await load(route);
    const markdown = await readFile(new URL(`../dist${route}index.md`,import.meta.url),'utf8');
    assert.match(html,/case-studies\/loistl\/after-desktop\.webp/);
    assert.match(html,/case-studies\/loistl\/after-mobile\.webp/);
    assert.equal((html.match(/class="wc-responsibility"/g)||[]).length,3);
    assert.match(html,/1[.,]799/);
    assert.match(html,locale==='de'?/zzgl\. gesetzlicher Umsatzsteuer/:/plus VAT at the applicable rate/);
    assert.doesNotMatch(html,/1[.,]800|brutto|including VAT/);
    for (const text of locale==='de' ? ['Sie geben frei.', 'Ihr Beitrag', 'Ohne bestehende Webseite'] : ['You approve it.', 'Your part', 'If you do not']) {
      assert.ok(html.includes(text)); assert.ok(markdown.includes(text));
    }
    assert.doesNotMatch(markdown,/Arial \/ Georgia|Neun|nine chapters/);
    assert.ok(html.indexOf('wc-project') < html.indexOf('id="ablauf"'));
  });
}
