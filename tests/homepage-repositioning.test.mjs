import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');

for (const [route,language] of [['index.html','de'],['de/index.html','de'],['en/index.html','en']]) {
  test(`${route}: complete agency homepage, direct booking, service discovery and valid link targets`,async()=>{
    const html=await readFile(path.join(dist,route),'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.match(html,language==='de'?/Online-Auftritt/:/In professional hands\./);
    assert.match(html,/class="vf-portrait-bubble"/);
    assert.doesNotMatch(html,/class="vf-audience"/);
    assert.doesNotMatch(html,/Kein KI-Theater|Von der Werkbank|Was Sie von uns nicht bekommen|No AI theatre|From the workshop floor|home-promise-workshop-ai|home-offer-document/);
    const actions=html.match(/<div class="vf-actions">([\s\S]*?)<\/div>/)?.[1];
    assert.ok(actions);
    assert.match(actions,/href="https:\/\/calendar.app.google\/utFQgw33PwJTiDk56"/);
    assert.equal((actions.match(/<a\b/g)||[]).length,2);
    assert.match(actions,/href="#projekt-hms-loistl"/);
    assert.match(actions,language==='de'?/Unsere Arbeit ansehen/:/See our work/);
    for (const id of ['home-next','leistungen','leitgedanke','kontakt']) assert(html.includes(`id="${id}"`));
    for (const [,id] of html.matchAll(/href="#([^" ]+)"/g)) assert(html.includes(`id="${id}"`),`Anchor ${id} exists`);
    for (const [,href] of html.matchAll(/href="(\/(?:de|en)\/[^"#?]*)"/g)) await access(path.join(dist,href.slice(1),'index.html'));
    assert.match(html,/mailto:contact@vibeperform.com/);
    assert.match(html,/calendar.app.google\/utFQgw33PwJTiDk56/);
    assert.doesNotMatch(html,/UNSERE LEISTUNGEN|UNSERE VISION|SO ARBEITEN WIR ZUSAMMEN|VOR DEM ERSTEN GESPRÄCH|DER NÄCHSTE SCHRITT|OUR SERVICES|OUR VISION|WORKING TOGETHER|BEFORE WE TALK|THE NEXT STEP/);
    assert.match(html,language==='de'?/Sie kennen Ihren Betrieb\./:/You know your business\./);
    assert.match(html,language==='de'?/Termin finden/:/Find a time/);
    assert.match(html,/class="hp-presence-loop(?: |\")/);
    assert.match(html,language==='de'?/Unternehmensprofil/:/Business profile/);
    assert.doesNotMatch(html,/Stockfotos von Gebäuden außerhalb der Zielgruppe|Stock photos of buildings outside the target market/);
    assert.doesNotMatch(html,/class="hp-presence-toggle"|data-presence-toggle/);
    assert.match(html,language==='de'?/Wir machen Ihre Arbeit sichtbar\./:/We make your work visible\./);
    assert.doesNotMatch(html,/data-scroll-reveal|hp-cycle/);
    assert.doesNotMatch(html,/id="zusammenarbeit"|hp-process-title-line|href="[^" ]*#zusammenarbeit"/);
    assert.match(html,language==='de'?/Wir glauben, Spitzenmarketing/:/We believe great marketing/);
    assert.match(html,language==='de'?/KI, um Arbeitsschritte zu beschleunigen/:/AI to speed up tasks/);
    assert.match(html,/has-scroll-reveals/);
    assert.doesNotMatch(html,/Ihr Betrieb leistet gute Arbeit\. Online sollte man das genauso erkennen|Your business does good work/);
    assert.doesNotMatch(html,/<video\b/i);
    const services=html.match(/<section class="hp-section hp-services"[\s\S]*?<\/section>/)?.[0];
    assert.ok(services);
    assert.equal((services.match(/<article\b/g)||[]).length,4);
    assert.doesNotMatch(services,/class="hp-number"|class="hp-number"/);
    assert.match(services,/class="website-build"/);
    assert.match(services,/class="website-care"/);
    assert.match(services,/hp-presence-loop--profile hp-presence-loop--animated/);
    assert.doesNotMatch(services,/Eine neue Website oder ein frischer Start|A new website or a fresh start/);
    assert.match(services,language==='de'?/Ihre neue Webseite/:/Your new website/);
    assert.match(services,/hp-service-primary-link/);
    assert.equal((services.match(/class="hp-service-description"/g)||[]).length,4);
    assert.match(services,language==='de'?/Damit Kunden Sie finden und verstehen\./:/Help customers find and understand your business\./);
    assert.doesNotMatch(services,/hp-seo-track|hp-seo-term|Technical SEO|Generative Engine/);
    assert.match(services,language==='de'?/Ihr Google-Unternehmensprofil/:/Your Google Business Profile/);
    const faq=html.match(/<section class="hp-section hp-faq"[\s\S]*?<\/section>/)?.[0];
    assert.equal((faq.match(/<details\b/g)||[]).length,4);
  });
}

test('homepage machine-readable content reflects websites and profiles',async()=>{
  const markdown=await readFile(path.join(dist,'de/index.md'),'utf8');
  assert.match(markdown,/Sie kennen Ihren Betrieb\. Wir machen Ihre Arbeit sichtbar\./);
  assert.match(markdown,/HMS Loistl[\s\S]*Vorher-Nachher-Vergleich/);
  assert.doesNotMatch(markdown,/Mehrfamilienhäuser|Stockfotos/);
  assert.doesNotMatch(markdown,/Keine Zeit für Pflege|Der erste Eindruck zählt|Ein klarer Weg\. Ein fester Ansprechpartner/);
  assert.match(markdown,/Ihre neue Webseite/);
  assert.match(markdown,/Ihr Google-Unternehmensprofil/);
  assert.doesNotMatch(markdown,/Proposal Assistant|Angebotsassistent|Compliance inklusive|\bundefined\b/);
  const html=await readFile(path.join(dist,'de/index.html'),'utf8');
  const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.match(data.find(x=>x['@type']==='Organization').description,/Websites und Unternehmensprofile/);
});

test('homepage contains animated content within its mobile viewport',async()=>{
  const styles=await readFile(path.join(root,'src/styles/home-page.css'),'utf8');
  assert.match(styles,/\.home-shell\{[^}]*overflow-x:clip/);
});

test('the guiding principle replaces the repeated care section in both languages',async()=>{
  for (const locale of ['de','en']) {
    const html=await readFile(path.join(dist,locale,'index.html'),'utf8');
    const section=html.match(/<section[^>]*id="leitgedanke"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section);
    assert.equal((section.match(/<article>/g)||[]).length,0);
    assert.doesNotMatch(section,/<a |<button|data-scroll-reveal|data-presence-animation/);
    assert.match(section,locale==='de'?/Unsere Vision/:/Our vision/);
    assert.match(section,locale==='de'?/präzise Texte, die Ihren Kunden Orientierung geben/:/precise copy that guides your customers/);
    assert.doesNotMatch(section,/hp-purpose-pillars|Unser Leitgedanke|Our guiding principle/);
    assert.doesNotMatch(html,/hp-evolution|#weiterentwicklung/);
    assert.match(html,locale==='de'?/href="\/de\/website-betreuung\/"/:/href="\/en\/website-support\/"/);
  }
  const markdown=await readFile(path.join(dist,'de/index.md'),'utf8');
  assert.match(markdown,/Spitzenmarketing[\s\S]*Qualitätsniveau großer Marken[\s\S]*Unsere Vision/);
  assert.doesNotMatch(markdown,/Eine Webseite, die immer aktuell bleibt/);
});

test('contact booking CTA uses the requested text and a reduced-motion-safe pulse',async()=>{
  const content=await readFile(path.join(root,'src/data/homePageContent.ts'),'utf8');
  const styles=await readFile(path.join(root,'src/styles/home-page.css'),'utf8');
  assert.match(content,/booking: 'Erstgespräch buchen'/);
  assert.match(content,/booking: 'Book an intro call'/);
  assert.match(styles,/@media\(prefers-reduced-motion:no-preference\)\{[\s\S]*?\.booking-calendar\[data-phase=closed\] \.booking-trigger\{animation:hp-contact-pulse 3s ease-in-out infinite\}/);
  assert.match(styles,/@keyframes hp-contact-pulse\{[^}]*\}/);
});

test('native homepage animation distinguishes the portrait business profile and respects reduced motion',async()=>{
  const source=await readFile(path.join(root,'src/components/HomeProblemAnimation.astro'),'utf8');
  const styles=await readFile(path.join(root,'src/styles/home-problem-animation.css'),'utf8');
  assert.match(source,/<svg class="hp-illustration hp-illustration--website" viewBox="0 0 520 360"/);
  assert.match(source,/hp-presence-card--profile/);
  assert.match(source,/viewBox="0 0 320 460"/);
  assert.match(source,/hp-rating-star--1/);
  assert.match(source,/hp-rating-star--5/);
  assert.match(styles,/\.hp-presence-loop--animated \.hp-rating-star--5\{animation:hp-presence-star-five 6s/);
  assert.match(styles,/@keyframes hp-presence-star-one/);
  assert.match(styles,/@keyframes hp-presence-star-five/);
  assert.match(styles,/@keyframes hp-presence-star-five\{0%,64%\{opacity:0[^}]*\}66%\{opacity:1[^}]*\}68%,92%\{opacity:1/s);
  assert.match(styles,/\.hp-presence-loop--animated \.hp-rating-star\{opacity:1;transform:none;animation:none\}/);
  assert.doesNotMatch(source,/data-presence-toggle|Animation pausieren|Pause animation/);
  assert.match(styles,/hyphens:manual;overflow-wrap:normal/);
  assert.match(styles,/@media\(max-width:700px\).*?grid-template-columns:1fr/s);
  assert.match(styles,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(styles,/@keyframes hp-presence-pop-one/);
  assert.match(styles,/animation:hp-presence-pop-one 6s[^;]*infinite/);
  assert.match(styles,/\.hp-presence-loop--problems \.hp-problem-issues\{animation:hp-presence-issues 8s/);
  assert.match(styles,/@keyframes hp-presence-pop-one\{0%,8%\{opacity:0/);
  assert.match(styles,/@keyframes hp-presence-pop-four\{0%,29%\{opacity:0/);
});

test('homepage collaboration links to the conversation and service heroes avoid repetitive kickers',async()=>{
  const homepage=await readFile(path.join(dist,'de/index.html'),'utf8');
  const section=homepage.match(/<section[^>]*id="home-next"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section);
  assert.match(section,/aria-labelledby="collaboration-title"/);
  assert.match(section,/href="#kontakt"/);
  assert.equal((section.match(/<article>/g)||[]).length,3);
  assert.doesNotMatch(section,/hp-presence-loop--problems/);

  for (const route of ['de/website-betreuung/index.html','en/website-support/index.html']) {
    const html=await readFile(path.join(dist,route),'utf8');
    const hero=html.match(/<section class="sv-hero sn-hero[^"]*"[\s\S]*?<\/section>/)?.[0];
    assert.ok(hero);
    assert.doesNotMatch(hero,/class="sv-kicker"/);
  }
  const redesign=await readFile(path.join(dist,'de/website-ueberarbeiten/index.html'),'utf8');
  assert.doesNotMatch(redesign.match(/<section class="sv-hero sn-hero[^"]*"[\s\S]*?<\/section>/)?.[0],/class="sv-kicker"/);
  const seo=await readFile(path.join(dist,'de/suchmaschinenoptimierung/index.html'),'utf8');
  assert.match(seo,/Ihre Kunden suchen\./);
  assert.doesNotMatch(seo,/<p class="sv-kicker">Suchmaschinenoptimierung/);
});


test('both homepages show input and published work without repeating the removed project story', async () => {
  for (const locale of ['de', 'en']) {
    const html = await readFile(path.join(dist, locale, 'index.html'), 'utf8');
    const workflow = html.match(/<section[^>]*id="home-next"[\s\S]*?<\/section>/)?.[0];
    assert.ok(workflow);
    assert.doesNotMatch(html, /class="hcs-story"|page-tree|Präziser erster Eindruck|A clearer first impression/);
    assert.match(html, /data-case-study/);
    assert.equal((workflow.match(/<article>/g) || []).length, 3);
    assert.match(workflow, /href="#kontakt"/);
    assert.match(workflow, /class="input-email"/);
    assert.match(workflow, locale === 'de' ? /vorher\.jpg/ : /before\.jpg/);
    const steps = workflow.match(/<article>[\s\S]*?<\/article>/g);
    assert.match(steps[1], /input-email/);
    assert.doesNotMatch(steps[1], /published-pair/);
    assert.match(steps[2], /published-pair[\s\S]*rasen-vorher[\s\S]*rasen-nachher/);
    for (const label of locale === 'de' ? ['Wir machen Vorschläge', 'Sie geben Input', 'Wir setzen um'] : ['We make suggestions', 'You share your input', 'We create']) assert.ok(workflow.includes(label));
    assert.match(workflow, locale === 'de' ? /Sie entscheiden, ob die neuen Inhalte online kommen/ : /You decide whether the new content goes online/);
    if (locale === 'en') assert.doesNotMatch(workflow, /Vorher|Nachher|Sie geben Input/);
    assert.ok(html.indexOf('id="home-next"') < html.indexOf('id="leitgedanke"'));
    assert.ok(html.indexOf('id="leitgedanke"') < html.indexOf('id="leistungen"'));
    const services = html.match(/<section[^>]*id="leistungen"[\s\S]*?<\/section>/)[0];
    assert.equal((services.match(/hp-service-row--reverse/g)||[]).length, 2);
    assert.doesNotMatch(services, /hp-service-card|hp-service-grid|hp-seo-banner/);
    assert.match(services, /search-visual/);
    const hero = html.match(/<div[^>]*id="home-intro"[\s\S]*?<\/section>/)?.[0];
    assert.ok(hero.indexOf('vf-actions') < hero.indexOf('vf-intro'));
  }
});
