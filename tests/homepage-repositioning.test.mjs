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
    assert.equal((html.match(/<details\b/g)||[]).length,4);
  });
}

test('homepage machine-readable content reflects websites and profiles',async()=>{
  const markdown=await readFile(path.join(dist,'de/index.md'),'utf8');
  assert.match(markdown,/Websites erstellen/);
  assert.match(markdown,/Unternehmensprofile pflegen/);
  assert.doesNotMatch(markdown,/Proposal Assistant|Angebotsassistent|Compliance inklusive/);
  const html=await readFile(path.join(dist,'de/index.html'),'utf8');
  const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.match(data.find(x=>x['@type']==='Organization').description,/Websites und Unternehmensprofile/);
});
