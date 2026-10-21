import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {setImmediate as tick} from 'node:timers/promises';
import {mountCaseStudy} from '../src/scripts/caseStudy.ts';

class Element extends EventTarget {
  dataset={}; attrs=new Map(); textContent='';
  style={removeProperty(name){delete this[name]}};
  setAttribute(name,value){this.attrs.set(name,value)}
  getAttribute(name){return this.attrs.get(name)??null}
  removeAttribute(name){this.attrs.delete(name)}
  click(){this.dispatchEvent(new Event('click'))}
  focus(){document.focused=this}
}
function fixture(t,{reduced=false,mobile=false}={}){
  const root=new Element(),stage=new Element(),status=new Element(),dialog=new Element(),note=new Element(),close=new Element();
  root.dataset.front='after';status.dataset={before:'Before is large',after:'After is large'};
  note.dataset.default='Nothing is sent';dialog.open=false;
  dialog.showModal=()=>{dialog.open=true};dialog.close=()=>{dialog.open=false;dialog.dispatchEvent(new Event('close'))};
  const cards=['before','after'].map(which=>{const card=new Element();card.dataset.hcsCard=which;card.getBoundingClientRect=()=>root.dataset.front===which?{left:300,top:0,width:858,height:635}:{left:0,top:280,width:278,height:233};return card});
  const switches=[new Element(),new Element()];switches.forEach(button=>button.dataset={beforeLabel:'Enlarge before',afterLabel:'Enlarge after'});
  const choices=['before','after'].map(which=>{const button=new Element();button.dataset.hcsGo=which;return button});
  const openers=[new Element()],channels=[new Element(),new Element()];channels[0].dataset.note='Phone demo only';channels[1].dataset.note='Email demo only';
  const singles=new Map([['[data-hcs-stage]',stage],['[data-hcs-status]',status],['[data-hcs-dialog]',dialog],['[data-hcs-contact-note]',note]]);
  const groups=new Map([['[data-hcs-card]',cards],['[data-hcs-switch]',switches],['[data-hcs-go]',choices],['[data-hcs-contact]',openers]]);
  root.querySelector=key=>singles.get(key);root.querySelectorAll=key=>groups.get(key);
  dialog.querySelector=()=>close;dialog.querySelectorAll=()=>channels;
  stage.getBoundingClientRect=()=>({width:1160});
  const animations=[];
  for(const card of cards)card.animate=()=>{let resolve;const finished=new Promise(r=>resolve=r);const animation={finished,finish:resolve,cancel:resolve};animations.push(animation);return animation};
  const media=new EventTarget();media.matches=reduced;
  const touch=new EventTarget();touch.matches=mobile;
  const doc=new EventTarget();doc.hidden=false;const classes=new Set();doc.documentElement={classList:{add:name=>classes.add(name),remove:name=>classes.delete(name)}};
  const values={document:doc,matchMedia:q=>q.includes('reduced')?media:touch,ResizeObserver:class{observe(){}disconnect(){}}};
  const saved=new Map(Object.keys(values).map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
  for(const [key,value]of Object.entries(values))Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
  const controller=mountCaseStudy(root);
  t.after(()=>{controller.destroy();for(const [key,value]of saved){if(value)Object.defineProperty(globalThis,key,value);else delete globalThis[key]}});
  return {root,status,switches,choices,dialog,note,close,openers,channels,animations,doc,classes,finish:()=>animations.slice(-2).forEach(a=>a.finish())};
}

test('each rapid carousel click gets a completed turn instead of being dropped',async t=>{
  const f=fixture(t);f.switches[0].click();f.switches[0].click();
  assert.equal(f.root.dataset.front,'before','second turn waits for the first');
  assert.equal(f.animations.length,2);f.finish();await tick();
  assert.equal(f.root.dataset.front,'after');assert.equal(f.animations.length,4,'both cards perform both requested turns');
  f.finish();await tick();assert.equal(f.root.getAttribute('aria-busy'),null);assert.equal(f.status.textContent,'After is large');
});
test('reduced-motion preference swaps views without an orbital animation',t=>{
  const f=fixture(t,{reduced:true});f.switches[0].click();assert.equal(f.root.dataset.front,'before');assert.equal(f.animations.length,0);assert.equal(f.status.textContent,'Before is large');
});
test('mobile choices keep a single selected view without desktop motion',t=>{
  const f=fixture(t,{mobile:true});f.choices[0].click();assert.equal(f.root.dataset.front,'before');assert.equal(f.choices[0].getAttribute('aria-pressed'),'true');assert.equal(f.choices[1].getAttribute('aria-pressed'),'false');assert.equal(f.animations.length,0);
});
test('contact window closes and returns focus to the opener',t=>{
  const f=fixture(t);f.openers[0].click();assert.equal(f.dialog.open,true);assert(f.classes.has('hcs-dialog-open'));
  f.close.click();assert.equal(f.dialog.open,false);assert.equal(f.doc.focused,f.openers[0]);assert(!f.classes.has('hcs-dialog-open'));
});
test('built DE and EN contact dialogs contain only the confirmed VibePerform details',()=>{
  for(const locale of ['de','en']){
    const html=readFileSync(new URL(`../dist/${locale}/index.html`,import.meta.url),'utf8');
    const dialog=html.match(/<dialog[^>]*data-hcs-dialog[\s\S]*?<\/dialog>/)?.[0];assert(dialog);
    assert.match(dialog,/\+49 160 94712200/);assert.match(dialog,/contact@vibeperform\.com/);assert.match(dialog,/href="tel:\+4916094712200"/);assert.match(dialog,/href="mailto:contact@vibeperform\.com"/);assert.doesNotMatch(dialog,/hms-loistl|5288693|7128814/);
    assert(html.indexOf('data-home-hero')<html.indexOf('id="projekt-hms-loistl"'));
    assert(html.indexOf('id="projekt-hms-loistl"')<html.indexOf('id="home-next"'));
  }
});
