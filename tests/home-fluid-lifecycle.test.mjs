import test from 'node:test';
import assert from 'node:assert/strict';
import {mountFluid} from '../src/lib/homeFluid.js';

function fixture(t,{reduced=false,complete=true}={}) {
  const frames=new Map(),events=new Map(),canvasEvents=new Map();let id=0,resize,contexts=0,draws=0,widthWrites=0,heightWrites=0;
  let completion=complete,resolveReady;
  const ready=new Promise(resolve=>resolveReady=resolve),states=[];
  const motion={matches:reduced,addEventListener(){},removeEventListener(){}};
  const coarse={matches:false};
  const document={hidden:false,addEventListener:(name,fn)=>events.set(name,fn),removeEventListener:name=>events.delete(name)};
  const host={dataset:{},closest:()=>null,getBoundingClientRect:()=>({width:1365,height:900,left:0,top:0}),addEventListener(){},removeEventListener(){},removeAttribute(name){delete this.dataset[name.slice(5)]}};
  const noop=()=>{};
  const gl={VERTEX_SHADER:1,FRAGMENT_SHADER:2,LINK_STATUS:3,ARRAY_BUFFER:4,STATIC_DRAW:5,FLOAT:6,TRIANGLES:7,
    createShader:()=>({}),shaderSource:noop,compileShader:noop,
    // The synchronous per-shader status query must never be used on success.
    getShaderParameter(){throw Error('Synchronous shader status query')},
    createProgram:()=>({}),attachShader:noop,linkProgram:noop,
    getExtension:()=>({COMPLETION_STATUS_KHR:99}),getProgramParameter:(_,param)=>param===99?completion:true,
    useProgram:noop,createBuffer:()=>({}),bindBuffer:noop,bufferData:noop,getAttribLocation:()=>0,enableVertexAttribArray:noop,vertexAttribPointer:noop,getUniformLocation:(_,name)=>name,
    viewport:noop,uniform2f:noop,uniform1f:noop,uniform3fv:noop,drawArrays(){draws++},deleteBuffer:noop,deleteProgram:noop,deleteShader:noop};
  const canvas={parentElement:host,getContext(){contexts++;return gl},addEventListener:(name,fn)=>canvasEvents.set(name,fn),removeEventListener:name=>canvasEvents.delete(name)};
  let width=300,height=150;
  Object.defineProperties(canvas,{width:{get:()=>width,set:v=>{width=v;widthWrites++}},height:{get:()=>height,set:v=>{height=v;heightWrites++}}});
  const values={document,devicePixelRatio:2,matchMedia:q=>q.includes('reduced')?motion:coarse,
    requestAnimationFrame:fn=>{frames.set(++id,fn);return id},cancelAnimationFrame:id=>frames.delete(id),
    ResizeObserver:class{constructor(fn){resize=fn}observe(){}disconnect(){}},
    IntersectionObserver:class{constructor(fn){this.fn=fn}observe(){this.fn([{isIntersecting:true}])}disconnect(){}},
    window:{addEventListener(){},removeEventListener(){}}};
  const saved=new Map(Object.keys(values).map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));
  for(const [k,value]of Object.entries(values))Object.defineProperty(globalThis,k,{configurable:true,writable:true,value});
  const controller=mountFluid(canvas,{onState:state=>{states.push(state);if(state.available)resolveReady()}});
  t.after(()=>{controller.destroy();for(const [k,d]of saved){if(d)Object.defineProperty(globalThis,k,d);else delete globalThis[k]}});
  return {controller,ready,states,frames,document,events,canvas,canvasEvents,resize:()=>resize(),complete:()=>{completion=true},counts:()=>({contexts,draws,widthWrites,heightWrites})};
}

test('GPU compilation yields until completion and then exposes the real animated canvas',async t=>{
  const f=fixture(t,{complete:false});assert.equal(f.counts().draws,0);assert.equal(f.states.at(-1).available,false);
  f.complete();await f.ready;assert(f.counts().draws>0);assert.equal(f.frames.size,1);
  assert(f.canvas.width*f.canvas.height>2700000,'Retina desktop keeps enough detail for curved silhouettes');
  assert(f.canvas.width*f.canvas.height<4005000,'bounded rendering resolution');
});
test('disconnect while GPU compilation is pending cannot draw or restart animation',async t=>{
  const f=fixture(t,{complete:false});f.controller.destroy();f.complete();await new Promise(resolve=>setTimeout(resolve,25));
  assert.equal(f.counts().draws,0);assert.equal(f.frames.size,0);assert.equal(f.events.size,0);
});
test('reduced motion avoids creating a GPU context',t=>{
  const f=fixture(t,{reduced:true});assert.equal(f.counts().contexts,0);assert.equal(f.frames.size,0);
});
test('unchanged resize does not clear or redraw the GPU buffer',async t=>{
  const f=fixture(t);await f.ready;f.controller.toggle();const before=f.counts();f.resize();f.resize();assert.deepEqual(f.counts(),before);
});
test('pause and hidden-document transitions stop rendering and resume safely',async t=>{
  const f=fixture(t);await f.ready;assert.equal(f.frames.size,1);
  f.controller.toggle();assert.equal(f.frames.size,0);f.controller.toggle();assert.equal(f.frames.size,1);
  f.document.hidden=true;f.events.get('visibilitychange')();assert.equal(f.frames.size,0);
  f.document.hidden=false;f.events.get('visibilitychange')();assert.equal(f.frames.size,1);
});
