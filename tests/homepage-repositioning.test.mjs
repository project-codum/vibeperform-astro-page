import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');

for (const [route,language] of [['index.html','de'],['de/index.html','de'],['en/index.html','en']]) {
  test(`${route}: complete agency homepage, one discovery action and valid link targets`,async()=>{
    const html=await readFile(path.join(dist,route),'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.doesNotMatch(html,/class="vf-kicker"|Für Handwerksbetriebe und kleine Unternehmen\.|For trade businesses and small companies\./);
    assert.match(html,language==='de'?/class="vf-audience">Websites &amp; Unternehmensprofile<\/p>/:/class="vf-audience">Websites &amp; business profiles<\/p>/);
    assert.doesNotMatch(html,/Kein KI-Theater|Von der Werkbank|Was Sie von uns nicht bekommen|No AI theatre|From the workshop floor|home-promise-workshop-ai|home-offer-document/);
    const actions=html.match(/<div class="vf-actions">([\s\S]*?)<\/div>/)?.[1];
    assert.ok(actions);
    assert.equal((actions.match(/<a\b/g)||[]).length,1);
    assert.match(actions,/href="#home-next"/);
    assert.match(actions,language==='de'?/Mehr erfahren/:/Learn more/);
    for (const id of ['home-next','leistungen','weiterentwicklung','zusammenarbeit','kontakt']) assert(html.includes(`id="${id}"`));
    for (const [,id] of html.matchAll(/href="#([^" ]+)"/g)) assert(html.includes(`id="${id}"`),`Anchor ${id} exists`);
    for (const [,href] of html.matchAll(/href="(\/(?:de|en)\/[^"#?]*)"/g)) await access(path.join(dist,href.slice(1),'index.html'));
    assert.match(html,/mailto:contact@vibeperform.com/);
    assert.match(html,/calendar.app.google\/utFQgw33PwJTiDk56/);
    assert.doesNotMatch(html,/UNSERE LEISTUNGEN|UNSERE VISION|SO ARBEITEN WIR ZUSAMMEN|VOR DEM ERSTEN GESPRÄCH|DER NÄCHSTE SCHRITT|OUR SERVICES|OUR VISION|WORKING TOGETHER|BEFORE WE TALK|THE NEXT STEP/);
    assert.match(html,language==='de'?/Damit aus dem ersten Eindruck/:/Turn your first impression/);
    assert.match(html,language==='de'?/Erstgespräch führen/:/Have an intro call/);
    assert.match(html,/class="hp-presence-loop(?: |\")/);
    assert.match(html,language==='de'?/Unternehmensprofil/:/Business profile/);
    assert.match(html,language==='de'?/Veraltete Website/:/Outdated website/);
    assert.doesNotMatch(html,/class="hp-presence-toggle"|data-presence-toggle/);
    assert.match(html,language==='de'?/Wir halten Ihren Online-Auftritt immer aktuell\./:/We keep your online presence up to date\./);
    assert.match(html,/data-scroll-reveal/);
    assert.match(html,/hp-process-title-line--first/);
    assert.match(html,/hp-process-title-line--second/);
    assert.match(html,/has-scroll-reveals/);
    assert.doesNotMatch(html,/Ihr Betrieb leistet gute Arbeit\. Online sollte man das genauso erkennen|Your business does good work/);
    assert.doesNotMatch(html,/<video\b/i);
    const services=html.match(/<section class="hp-section hp-services"[\s\S]*?<\/section>/)?.[0];
    assert.ok(services);
    assert.equal((services.match(/class="hp-service-card hp-service-card--\d"/g)||[]).length,4);
    assert.doesNotMatch(services,/class="hp-number"|class="hp-number"/);
    assert.match(services,/hp-presence-loop--website-static/);
    assert.match(services,/hp-presence-loop--website hp-presence-loop--animated/);
    assert.match(services,/hp-presence-loop--profile hp-presence-loop--animated/);
    assert.doesNotMatch(services,/Eine neue Website oder ein frischer Start|A new website or a fresh start/);
    assert.match(services,language==='de'?/Neue Website erstellen/:/Create a new website/);
    assert.match(services,/hp-service-primary-link/);
    assert.match(services,language==='de'?/Unternehmensprofile pflegen/:/Maintain business profiles/);
    const faq=html.match(/<section class="hp-section hp-faq"[\s\S]*?<\/section>/)?.[0];
    assert.equal((faq.match(/<details\b/g)||[]).length,4);
  });
}

test('homepage machine-readable content reflects websites and profiles',async()=>{
  const markdown=await readFile(path.join(dist,'de/index.md'),'utf8');
  assert.match(markdown,/Damit aus dem ersten Eindruck der erste Schritt wird/);
  assert.match(markdown,/- Veraltete Website[\s\S]*- Veraltetes Unternehmensprofil[\s\S]*- Uneinheitliche Angaben/);
  assert.doesNotMatch(markdown,/Keine Zeit für Pflege|Der erste Eindruck zählt/);
  assert.match(markdown,/Neue Website erstellen/);
  assert.match(markdown,/Unternehmensprofile pflegen/);
  assert.doesNotMatch(markdown,/Proposal Assistant|Angebotsassistent|Compliance inklusive/);
  const html=await readFile(path.join(dist,'de/index.html'),'utf8');
  const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.match(data.find(x=>x['@type']==='Organization').description,/Websites und Unternehmensprofile/);
});

test('homepage contains animated content within its mobile viewport',async()=>{
  const styles=await readFile(path.join(root,'src/styles/home-page.css'),'utf8');
  assert.match(styles,/\.home-shell\{[^}]*overflow-x:clip/);
});

test('scroll reveals animate in sequence and leave reduced-motion users unaffected',async()=>{
  const styles=await readFile(path.join(root,'src/styles/home-page.css'),'utf8');
  const source=await readFile(path.join(root,'src/components/HomePage.astro'),'utf8');
  assert.match(styles,/@media\(prefers-reduced-motion:no-preference\)/);
  assert.match(styles,/\.hp-evolution\.is-revealed \.hp-cycle li:nth-child\(2\)\{animation-delay:\.19s\}/);
  assert.match(styles,/\.hp-evolution\.is-revealed \.hp-cycle li:nth-child\(3\)\{animation-delay:\.38s\}/);
  assert.match(styles,/\.hp-process\.is-revealed \.hp-process-title-line--second\{animation:hp-slide-in[^}]*\.28s/);
  assert.match(styles,/animation-delay:calc\(1\.12s \+ var\(--process-stagger, 0s\)\)/);
  assert.match(styles,/\.hp-process-grid li:nth-child\(3\)\{--process-stagger:\.36s\}/);
  assert.match(styles,/\.hp-process:not\(\.is-revealed\) \.hp-process-grid li\{transform:translateY\(30px\)\}/);
  assert.match(source,/threshold: 0\.24, rootMargin: '0px 0px -18% 0px'/);
  assert.match(styles,/\.hp-service-card--1\{[^}]*transform:translateY\(-9px\)[^}]*box-shadow/s);
  assert.match(styles,/\.hp-service-card--1 \.hp-service-primary-link\{[^}]*background:var\(--hp-plum\)/);
});

test('contact booking CTA uses the requested text and a reduced-motion-safe pulse',async()=>{
  const content=await readFile(path.join(root,'src/data/homePageContent.ts'),'utf8');
  const styles=await readFile(path.join(root,'src/styles/home-page.css'),'utf8');
  assert.match(content,/booking: 'Unverbindlich kennenlernen'/);
  assert.match(content,/booking: 'Book a no-obligation intro'/);
  assert.match(styles,/@media\(prefers-reduced-motion:no-preference\)\{[\s\S]*?\.hp-contact-actions>\.hp-button\{animation:hp-contact-pulse 3s ease-in-out infinite\}/);
  assert.match(styles,/@keyframes hp-contact-pulse\{[^}]*\}/);
});

test('native homepage animation distinguishes the portrait business profile and respects reduced motion',async()=>{
  const source=await readFile(path.join(root,'src/components/HomeProblemAnimation.astro'),'utf8');
  const styles=await readFile(path.join(root,'src/styles/home-problem-animation.css'),'utf8');
  assert.match(source,/<svg class="hp-illustration hp-illustration--website" viewBox="0 0 520 360"/);
  assert.match(source,/hp-website-orb/);
  assert.match(styles,/hp-website-visual--unfold \.hp-illustration--website\{[^}]*animation:hp-website-unfold/);
  assert.match(styles,/hp-website-visual--unfold \.hp-website-orb\{[^}]*animation:hp-website-orb-pulse/);
  assert.match(styles,/hp-website-unfold/);
  assert.match(styles,/hp-website-orb-pulse 3\.4s/);
  assert.match(styles,/hp-website-shockwave/);
  assert.match(styles,/hp-website-sparks/);
  assert.match(styles,/clip-path:circle\(160% at 50% 50%\)/);
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

test('homepage problems copy follows the visual on narrow screens and website support hero omits its kicker',async()=>{
  const homepage=await readFile(path.join(dist,'de/index.html'),'utf8');
  const section=homepage.match(/<section[^>]*id="home-next"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section);
  assert.ok(section.indexOf('id="problems-title"')<section.indexOf('hp-presence-loop'));
  assert.ok(section.indexOf('hp-presence-loop')<section.indexOf('Wir halten Ihren Online-Auftritt immer aktuell.'));
  assert.ok(section.indexOf('Wir halten Ihren Online-Auftritt immer aktuell.')<section.indexOf('Erstgespräch führen'));
  const animationStyles=await readFile(path.join(root,'src/styles/home-problem-animation.css'),'utf8');
  assert.match(animationStyles,/grid-template-areas:"heading visual" "copy visual"/);
  assert.match(animationStyles,/@media\(max-width:900px\)\{[^}]*grid-template-areas:"heading" "visual" "copy"/);

  for (const route of ['de/website-betreuung/index.html','en/website-support/index.html']) {
    const html=await readFile(path.join(dist,route),'utf8');
    const hero=html.match(/<div class="sd-hero-grid">([\s\S]*?)<\/div>/)?.[1];
    assert.ok(hero);
    assert.doesNotMatch(hero,/class="sv-kicker"/);
  }
  const redesign=await readFile(path.join(dist,'de/website-ueberarbeiten/index.html'),'utf8');
  assert.match(redesign,/class="sv-kicker"/);
});
