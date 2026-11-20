import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

for (const locale of ['de', 'en']) {
  test(`${locale}: camera roll story follows the gallery and uses a real contact target`, async () => {
    const html = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');
    const gallery = html.indexOf('id="designstudien"');
    const section = html.indexOf('id="projekt-sichtbar"');
    const purpose = html.indexOf('id="leitgedanke"');
    assert.ok(gallery >= 0 && gallery < section && section < purpose);
    const showcase = html.slice(section, purpose);
    assert.match(showcase, /href="#kontakt"/);
    assert.match(html, /id="kontakt"/);
    assert.match(showcase, locale === 'de' ? /Fiktives Beispiel/ : /Fictional example/);
    const images = [...showcase.matchAll(/src="(\/projektbeispiel\/[^"]+)"/g)].map(([, src]) => src);
    assert.equal(images.length, 4);
    assert.equal(new Set(images).size, 3);
    assert.equal(images[0], images[3], 'the same project photo should appear in the camera roll and example page');
    await Promise.all(images.map(src => access(new URL(`../dist${src}`, import.meta.url))));
  });
}
