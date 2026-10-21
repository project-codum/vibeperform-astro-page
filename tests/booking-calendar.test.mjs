import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mountBookingCalendar } from '../src/scripts/bookingCalendar.ts';

class Node extends EventTarget {
  hidden = true;
  attrs = new Map();
  dataset = {};
  setAttribute(k,v) { this.attrs.set(k,v); }
  hasAttribute(k) { return this.attrs.has(k); }
  removeAttribute(k) { this.attrs.delete(k); }
  set src(v) { this.attrs.set('src',v); }
  focus() { this.focused = true; }
  click() { this.dispatchEvent(new Event('click')); }
}

function fixture(t, { reduced = false } = {}) {
  const saved = Object.getOwnPropertyDescriptor(globalThis,'matchMedia');
  const media = new EventTarget(); media.matches = reduced;
  Object.defineProperty(globalThis,'matchMedia',{configurable:true,value:()=>media});
  t.after(()=>{if(saved) Object.defineProperty(globalThis,'matchMedia',saved); else delete globalThis.matchMedia;});
  const names = ['load','fallback','hide','placeholder','panel','frame','status'];
  const nodes = Object.fromEntries(names.map(name=>[name,new Node()]));
  nodes.frame.dataset.src = 'https://calendar.google.com/calendar/appointments/schedules/example?gv=true';
  const animations=[];
  nodes.panel.animate=()=>{const animation={cancelled:false,cancel(){this.cancelled=true}};animations.push(animation);return animation;};
  const root = { dataset:{phase:'closed'}, querySelector(selector) { return nodes[selector.match(/data-booking-(\w+)/)[1]]; } };
  const controller=mountBookingCalendar(root);
  t.after(()=>controller.destroy());
  return {root,nodes,controller,animations,media};
}

test('calendar stays disconnected until requested and can be closed, reopened and disposed', t => {
  const {root,nodes,controller,animations}=fixture(t);
  assert.equal(nodes.load.hidden,false);
  assert.equal(nodes.fallback.hidden,true);
  assert.equal(nodes.frame.hasAttribute('src'),false);
  nodes.load.click();
  assert.equal(root.dataset.phase,'loading');
  assert.equal(nodes.frame.attrs.get('src'),nodes.frame.dataset.src);
  assert.equal(nodes.panel.hidden,false);
  assert.equal(nodes.placeholder.hidden,true);
  assert.equal(animations.length,1);
  nodes.load.click();
  assert.equal(animations.length,1,'a repeated opening does not restart the request');
  nodes.frame.dispatchEvent(new Event('load'));
  assert.equal(root.dataset.phase,'ready','readiness never waits for the opening animation');
  assert.equal(nodes.status.hidden,true);
  assert.equal(nodes.panel.attrs.get('aria-busy'),'false');
  nodes.hide.click();
  assert.equal(nodes.frame.hasAttribute('src'),false);
  assert.equal(nodes.panel.hidden,true);
  assert.equal(nodes.placeholder.hidden,false);
  assert.equal(nodes.load.focused,true);
  assert.equal(animations[0].cancelled,true);
  nodes.frame.dispatchEvent(new Event('load'));
  assert.equal(root.dataset.phase,'closed','late load events cannot reopen a closed calendar');
  nodes.load.click();
  assert.equal(nodes.frame.hasAttribute('src'),true,'calendar can be loaded again');
  controller.destroy();
  assert.equal(nodes.frame.hasAttribute('src'),false);
});

test('reduced motion skips the opening animation and stops an active one when the preference changes', t=>{
  const {nodes,animations,media}=fixture(t,{reduced:true});
  nodes.load.click(); assert.equal(animations.length,0);
  nodes.hide.click(); media.matches=false; nodes.load.click(); assert.equal(animations.length,1);
  media.matches=true; media.dispatchEvent(new Event('change')); assert.equal(animations[0].cancelled,true);
});

test('built contact sections keep a no-JavaScript booking link and defer Google embedding in both languages', () => {
  for (const locale of ['de','en']) {
    const html = readFileSync(new URL(`../dist/${locale}/index.html`,import.meta.url),'utf8');
    const section = html.match(/<section[^>]*id="kontakt"[\s\S]*?<\/section>/)?.[0];
    assert(section);
    const frame = section.match(/<iframe\b[^>]*>/)?.[0];
    assert(frame);
    assert.doesNotMatch(frame,/\ssrc=/);
    assert.match(frame,/data-src="https:\/\/calendar.google.com\/calendar\/u\/0\/appointments\/schedules\//);
    assert.match(frame,/\?gv=true&amp;hl=(?:de|en)/);
    assert.match(frame,/referrerpolicy="no-referrer"/);
    assert.match(section,/href="https:\/\/calendar.app.google\/utFQgw33PwJTiDk56" target="_blank" rel="noopener noreferrer"/);
    assert.match(section,/mailto:contact@vibeperform.com/);
    assert.doesNotMatch(html,/class="hp-extra"|Wir betrachten verfügbare Nutzungsdaten|We consider available usage data/);
  }
});
