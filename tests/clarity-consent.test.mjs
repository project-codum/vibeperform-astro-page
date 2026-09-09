import test from 'node:test';
import assert from 'node:assert/strict';
import { installClarity } from '../src/scripts/clarity-consent.js';
function fixture(hostname = 'www.vibeperform.com', data) {
 const events = {}, scripts = [];
 const win = {location:{hostname},__cmp(command, args){if(command==='getCMPData') return data;if(command==='addEventListener') events[args[0]]=args[1];}};
 const doc = {createElement(){return {dataset:{}};},head:{appendChild(s){scripts.push(s);}}};
 return {win,doc,events,scripts,setData(value){data=value;},fire(name='consent'){events[name]?.(name);}};
}
test('Clarity stays unloaded for missing ID, local previews, unavailable CMP and unrelated vendor consent',()=>{
 for(const [host,id,data] of [['www.vibeperform.com','',{}],['localhost','abc123',{vendorConsents:{s2631:true}}],['www.vibeperform.com','abc123',undefined],['www.vibeperform.com','abc123',{vendorConsents:{other:true}}]]){
  const f=fixture(host,data);installClarity(f.win,f.doc,id);f.fire('consentapproved');assert.equal(f.scripts.length,0);
 }
});
test('specific vendor consent loads once with analytics granted and ads denied',()=>{
 const f=fixture();installClarity(f.win,f.doc,'abc123');f.setData({vendorConsents:{s2631:true}});f.fire();f.fire();installClarity(f.win,f.doc,'abc123');
 assert.equal(f.scripts.length,1);assert.equal(f.scripts[0].src,'https://www.clarity.ms/tag/abc123');
 assert.deepEqual(f.win.clarity.q,[['consentv2',{analytics_Storage:'granted',ad_Storage:'denied'}]]);
});
test('revocation queues denied plus stop even while script is still loading, without reload or restart',()=>{
 const f=fixture('vibeperform.com',{vendorConsents:{s2631:true}});installClarity(f.win,f.doc,'abc123');f.fire('consentrejected');f.fire('consentapproved');
 assert.equal(f.scripts.length,1);assert.deepEqual(f.win.clarity.q.slice(-2),[['consentv2',{analytics_Storage:'denied',ad_Storage:'denied'}],['stop']]);
});
test('custom consent removing Clarity stops active SDK',()=>{
 const f=fixture('www.vibeperform.com',{vendorConsents:{s2631:true}});installClarity(f.win,f.doc,'abc123');const calls=[];f.win.clarity=(...args)=>calls.push(args);f.setData({vendorConsents:{s2631:false}});f.fire('consentcustom');f.fire();assert.deepEqual(calls.map(c=>c[0]),['consentv2','stop']);
});
