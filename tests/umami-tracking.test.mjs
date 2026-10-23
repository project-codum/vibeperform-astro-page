import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
test('all content HTML pages have one Umami tracker in head and no active CMP, Google or Clarity', async()=>{
 async function walk(dir){let paths=[];for(const entry of await readdir(dir,{withFileTypes:true})){const path=new URL(entry.name+(entry.isDirectory()?'/':''),dir);if(entry.isDirectory())paths.push(...await walk(path));else if(entry.name.endsWith('.html'))paths.push(path);}return paths;}
 for(const path of await walk(new URL('../dist/',import.meta.url))){
  const html=await readFile(path,'utf8');if(!html.includes('</head>') || path.pathname.endsWith('/404.html') || /http-equiv="refresh"/i.test(html))continue;
  const head=html.match(/<head>([\s\S]*?)<\/head>/)?.[1];if(!head)continue;
  const scripts=[...head.matchAll(/<script\b[^>]*src="https:\/\/cloud\.umami\.is\/script\.js"[^>]*>/g)];
  assert.equal(scripts.length,1,String(path));assert.match(scripts[0][0],/\bdefer\b/);assert.match(scripts[0][0],/data-website-id="f4d32a51-9990-49dc-8daf-388a72a62b74"/);
  assert.doesNotMatch(head,/cdn\.consentmanager|d\.delivery\.consentmanager|googletagmanager\.com|www\.clarity\.ms/);
 }
});
test('Umami hook removes referrer query and fragment without reading form data',async()=>{
 const component=await readFile(new URL('../src/components/UmamiAnalytics.astro',import.meta.url),'utf8');
 const context={window:{},URL};vm.runInNewContext(component.match(/<script is:inline>([\s\S]*?)<\/script>/)[1],context);
 const clean=context.window.__vibeperformUmamiBeforeSend('event',{url:'/de/',referrer:'https://example.org/?email=secret#private'});
 assert.equal(clean.referrer,'https://example.org/');assert.match(component,/data-exclude-search="true"/);assert.match(component,/data-exclude-hash="true"/);
});
