import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const load = route => readFile(path.join(dist, route, 'index.html'), 'utf8');
for (const [locale, route, alternate, role] of [
  ['de', 'de/ueber-uns', 'en/about-us', 'Inhaber von VibePerform'],
  ['en', 'en/about-us', 'de/ueber-uns', 'Owner of VibePerform'],
]) {
  test(`${locale}: agency identity, metadata and machine-readable version agree`, async () => {
    const html = await load(route);
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    const md = await readFile(path.join(dist, route, 'index.md'), 'utf8');
    const voicePath = `/audio/about/${locale}-mission-vision.mp3`;
    assert.ok(main.includes(voicePath));
    await access(path.join(dist, voicePath));
    const prose = main.replace(/<[^>]+>/g, '');
    const approved = locale === 'de' ? [
      'VibePerform ist die moderne Webseitenagentur.',
      'Spitzenmarketing ist keine Frage der Unternehmensgröße mehr.',
      'Wenn du mit deinem Betrieb wachsen willst! Dann will ich mit dir arbeiten! Wann passt es dir?',
    ] : ['VibePerform exists so small businesses can afford an online presence of the same quality as major brands.'];
    for (const line of approved) assert.ok(prose.includes(line) && md.includes(line));
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(main, /ag-collaboration|ag-expectations/);
    for (const source of [main, md]) {
      assert.ok(source.includes('Marlon Dietrich'));
      assert.ok(source.toLowerCase().includes(role.toLowerCase()));
      assert.doesNotMatch(source, /Isabella|certified RAG|zertifizierter RAG|CAPTRON|dcarbonize/);
    }
    assert.ok(html.includes(`rel="canonical" href="https://www.vibeperform.com/${route}/"`));
    assert.ok(html.includes(`href="/${alternate}/"`));
    assert.ok(html.includes(`type="text/markdown" href="https://www.vibeperform.com/${route}/index.md"`));
    assert.ok(md.includes(`${locale === 'en' ? 'German' : 'English'} alternate:`));
    const schemas = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const about = schemas.find(s => s['@type'] === 'AboutPage');
    assert.equal(about.mainEntity['@type'], 'Person');
    assert.equal(about.mainEntity.name, 'Marlon Dietrich');
    const portrait = main.match(/<img[^>]+alt="Marlon Dietrich"[^>]*>/)[0];
    assert.ok(portrait.includes('fetchpriority="high"'));
    assert.ok(portrait.includes('srcset='));
    const imageUrl = portrait.match(/ src="([^"]+)"/)[1];
    assert.match(imageUrl, /marlon-studio-portrait-outside-frame-v1.*\.webp$/);
    assert.ok(portrait.includes('width="1122"'));
    assert.ok(portrait.includes('height="1402"'));
    await access(path.join(dist, imageUrl));
    const meta = key => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]+)"`))?.[1];
    const socialImage = meta('og:image');
    assert.match(socialImage, /^https:\/\/www\.vibeperform\.com\/_astro\/marlon-studio-portrait-outside-frame-v1.*\.webp$/);
    await access(path.join(dist, new URL(socialImage).pathname));
    assert.equal(meta('og:image:secure_url'), socialImage);
    assert.equal(meta('twitter:image'), socialImage);
    assert.equal(about.mainEntity.image, socialImage);
    assert.equal(meta('og:image:type'), 'image/webp');
    assert.equal(meta('og:image:width'), '900');
    assert.equal(meta('og:image:height'), '1125');
    assert.equal(meta('twitter:card'), 'summary_large_image');
    assert.equal(meta('twitter:title'), html.match(/<title>([^<]+)<\/title>/)[1]);
    assert.equal(meta('twitter:description'), meta('description'));
    const socialImageAlt = locale === 'de' ? 'Marlon Dietrich, Inhaber von VibePerform' : 'Marlon Dietrich, owner of VibePerform';
    assert.equal(meta('og:image:alt'), socialImageAlt);
    assert.equal(meta('twitter:image:alt'), socialImageAlt);
    assert.equal(meta('og:locale'), locale === 'de' ? 'de_DE' : 'en_US');
    assert.equal(meta('og:locale:alternate'), locale === 'de' ? 'en_US' : 'de_DE');
    assert.ok(html.includes(`hreflang="${locale}" href="https://www.vibeperform.com/${route}/"`));
    assert.ok(html.includes(`hreflang="${locale === 'de' ? 'en' : 'de'}" href="https://www.vibeperform.com/${alternate}/"`));
    assert.doesNotMatch(main, /ag-contact-portrait/);
    assert.match(main, /<a class="hp-button" href="#kontakt">[^<]+<\/a>/);
    for (const [, href] of html.matchAll(/href="([^" ]+)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const url = new URL(href, `https://www.vibeperform.com/${route}/`);
      if (!url.pathname.endsWith('/')) continue;
      const dest = await load(url.pathname);
      if (url.hash) assert.ok(dest.includes(`id="${url.hash.slice(1)}"`), href);
    }
    assert.ok(main.includes('mailto:contact@vibeperform.com'));
    assert.ok(main.includes('https://calendar.app.google/utFQgw33PwJTiDk56'));
    const home = await load(locale);
    const purpose = page => page.match(/<div class="hp-purpose-stage"[\s\S]*?<\/section>/)[0];
    if (locale === 'de') {
      for (const id of ['agency-title', 'purpose-title', 'angebot', 'strategie', 'betreuung', 'contact-title']) {
        assert.ok(main.includes('id="' + id + '"'));
        assert.ok(main.includes('&quot;' + id + '&quot;'));
      }
      assert.match(main, /<button type="button" data-play[^>]*>Start<\/button>/);
      assert.ok(main.includes('&quot;caption&quot;'));
      const intro = main.match(/<dialog[^>]+id="internet-im-wandel"[^>]*>[\s\S]*?<\/dialog>/)[0];
      assert.match(intro, /aria-label="Das Internet verändert sich\."/);
      assert.doesNotMatch(intro, /<dialog[^>]*\sopen[\s=>]/);
      assert.match(intro, /<form method="dialog"[^>]*>[\s\S]*?Überspringen/);
      assert.ok(main.indexOf(intro) < main.indexOf('id="home-intro"'));
      assert.doesNotMatch(md, /## Das Internet verändert sich\./);
      const cards = main.match(/<ul class="ag-contact-questions"[^>]*>([\s\S]*?)<\/ul>/)[1];
      assert.deepEqual([...cards.matchAll(/<li>([^<]+)<\/li>/g)].map(match => match[1]), [
        'Was kommt zu kurz?', 'Wo tust du dich schwer?', 'Wobei kann ich helfen?',
      ]);
      const contact = main.match(/<section[^>]*id="kontakt"[\s\S]*?<\/section>/)[0];
      assert.doesNotMatch(contact, /Wenn du mit deinem Betrieb wachsen willst/);
      assert.match(purpose(home), /Wir glauben, Spitzenmarketing/);
      assert.match(purpose(main), /aria-label="Spitzenmarketing ist keine Frage der Unternehmensgröße mehr\."/);
      for (const source of [main, md]) {
        assert.match(source, /Dein Betrieb auf dem Qualitätsniveau großer, vergleichbarer Unternehmen\.\s+Das ist möglich und bezahlbar\./);
        assert.match(source, /Gemeinsam entwickeln wir eine Online-Strategie für deinen Betrieb und ideal auf deine Arbeitsweise abgestimmt\./);
        assert.match(source, /Die Umsetzung und laufende Betreuung übernehme ich\./);
        assert.match(source, /Dein Auftritt bleibt immer aktuell\. Aus deiner Arbeit, aktuellen Projekten und deiner Expertise werden Inhalte für die Webseite, das Unternehmensprofil und die sozialen Medien\./);
        assert.doesNotMatch(source, /Branchenbücher|Instagram, TikTok und YouTube/);
        assert.match(source.replace(/<[^>]+>/g, ''), /Was willst du mit\s+deinem Betrieb erreichen\?/);
        for (const question of ['Was kommt zu kurz?', 'Wo tust du dich schwer?', 'Wobei kann ich helfen?']) {
          assert.ok(source.includes(question));
        }
      }
    } else {
      assert.equal(purpose(main), purpose(home));
    }
    assert.ok(main.includes(locale === 'de' ? 'dein erster direkter Ansprechpartner' : 'your first point of contact'));
    assert.match(main, /<audio[^>]*preload="none"/);
    for (const control of ['play', 'sound', 'index', 'chapter-menu', 'chapter-count', 'meter']) assert.ok(main.includes('data-' + control));
    assert.equal([...main.matchAll(/data-choice="/g)].length, locale === 'de' ? 3 : 2);
    assert.ok(main.indexOf('data-controls-origin') < main.indexOf('data-story-controls'));
    assert.ok(main.indexOf('data-story-controls') < main.indexOf('id="vision"'));
    for (const version of [main, md]) {
      assert.doesNotMatch(version, /Gründerbrief|founder letter|ag-letterhead|ag-signature|marlon-brief|introducing-deep-research|Loistl|Laubbeseitigung|leaf removal/i);
      assert.ok(version.includes(locale === 'de' ? 'Die moderne Webseitenagentur.' : 'the modern web agency.'));
    }
    const removedCopy = locale === 'de'
      ? ['Marlon Dietrich · Inhaber von VibePerform', 'Persönlich verantwortlich. Von der ersten Idee an.', 'Mein Weg zu VibePerform', 'Mit Blick nach vorne', 'Sie sprechen direkt mit mir. Ich freue mich auf Ihr Vorhaben.', 'Lernen wir uns kennen']
      : ['Marlon Dietrich · Owner of VibePerform', 'Personally responsible. From the first idea onwards.', 'My path to VibePerform', 'Looking ahead', 'You’ll speak directly with me. I look forward to hearing about your project.', 'Let’s meet'];
    for (const phrase of removedCopy) {
      assert.ok(!main.includes(phrase), `visible page still includes removed copy: ${phrase}`);
      assert.ok(!md.includes(phrase), `machine-readable page still includes removed copy: ${phrase}`);
    }
  });
}
