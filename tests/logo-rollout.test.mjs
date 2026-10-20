import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
const dist = new URL('../dist/', import.meta.url);
async function htmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (path.endsWith('.html')) files.push(path);
  }
  return files;
}
test('every built page uses current logo artwork, with no old Lottie replacement', async () => {
  const pages = await htmlFiles(dist.pathname);
  assert.ok(pages.length >= 60);
  let branded = 0;
  for (const file of pages) {
    const html = await readFile(file, 'utf8');
    assert.doesNotMatch(html, /(?:src|srcset|data-logo-lottie)=["'][^"']*vibeperform-logo(?:\.png|-alive\.json)/, file);
    for (const [,src] of html.matchAll(/<img[^>]+src="([^"]*vibeperform-logo[^"]*)"/g)) {
      assert.match(src, /vibeperform-logo-a-20261019-(?:hell|dunkel)\.svg$/, file);
      branded++;
    }
  }
  assert.ok(branded >= 60, 'shared headers and footers are present');
});
test('background variants have identical Logo A geometry and native colors', async () => {
  const variants = await Promise.all(['hell','dunkel','lila'].map(v => readFile(new URL(`../public/vibeperform-logo-a-20261019-${v}.svg`,import.meta.url),'utf8')));
  const geometry = svg => [...svg.matchAll(/\sd="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(geometry(variants[0]).length, 3);
  for (const svg of variants) {
    assert.match(svg, /viewBox="0 0 224 132"/);
    assert.deepEqual(geometry(svg), geometry(variants[0]));
    assert.doesNotMatch(svg, /<image|<script|<filter/);
  }
  assert.match(variants[0], /fill="#000000"/);
  assert.match(variants[1], /fill="#ffffff"/);
  assert.match(variants[2], /fill="#1c1726"/);
});
