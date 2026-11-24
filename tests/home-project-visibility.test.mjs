import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

for (const locale of ['de', 'en']) {
  test(`${locale}: phone-to-project story follows the guiding principle and links to the guide`, async () => {
    const html = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');
    const gallery = html.indexOf('id="designstudien"');
    const section = html.indexOf('id="projekt-sichtbar"');
    const purpose = html.indexOf('id="leitgedanke"');
    const situations = html.indexOf('id="situationen"');
    assert.ok(gallery >= 0 && gallery < purpose && purpose < situations && situations < section);
    const showcase = html.slice(section, html.indexOf('id="leistungen"'));
    if (locale === 'de') {
      assert.doesNotMatch(showcase, /class="project-visibility__(?:story|caption|close)"|href="#kontakt"/);
      assert.match(showcase, /Welche Inhalte braucht eine Handwerker-Webseite/);
    } else {
      assert.match(showcase, /href="#kontakt"/);
      assert.match(showcase, /Illustrative design example[\s\S]*trade business website/);
    }
    assert.doesNotMatch(html, /hms[- ]loistl|rasen-(?:vorher|nachher)|Loistl/i);
    assert.match(html, /id="kontakt"/);
    assert.match(showcase, locale === 'de' ? /Anfragen/ : /Enquire/);
    const images = [...showcase.matchAll(/src="(\/projektbeispiel\/[^"]+)"/g)].map(([, src]) => src);
    assert.equal(images.length, 4);
    assert.equal(new Set(images).size, 3);
    assert.equal(images[0], images[3], 'the same project photo should appear in the camera roll and example page');
    await Promise.all(images.map(src => access(new URL(`../dist${src}`, import.meta.url))));
  });
}
