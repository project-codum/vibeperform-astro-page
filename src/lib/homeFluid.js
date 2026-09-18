// Independently written visual study inspired by Filip Zrnzevic's metaball hero:
// https://codepen.io/filipz/pen/ogjXgBP
// No original shader, fonts, image assets or demo controls are included.
const vertex = `attribute vec2 position;
void main(){ gl_Position=vec4(position,0.,1.); }`;
const fragment = `precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float cursorPresence;
uniform float time;
uniform float influence;
float join(float a,float b,float k){
  float h=clamp(.5+.5*(b-a)/k,0.,1.);
  return mix(b,a,h)-k*h*(1.-h);
}
float field(vec3 p){
  float a=resolution.x/resolution.y;
  float t=time*.22;
  vec3 shift=vec3(pointer*.045*influence,0.);
  vec3 left=vec3(-a*.89,.84,0.)+shift;
  vec3 right=vec3(a*.89,-.84,.06)-shift;
  float d=length(p-left)-.57;
  d=join(d,length(p-left-vec3(.40+sin(t)*.16,-.46+cos(t)*.13,.06))-.26,.30);
  d=join(d,length(p-right)-.64,.30);
  d=join(d,length(p-right-vec3(-.50+sin(t*.8)*.16,.46+cos(t*.7)*.13,0.))-.30,.32);
  vec3 satellite=vec3(a*.59+sin(t*.8)*.10,.48+cos(t)*.12,.10);
  d=join(d,length(p-satellite)-.13,.18);
  // The pointer lives in the same aspect-correct world as the other spheres.
  // Smooth union creates a real neck between surfaces, rather than an overlap.
  if(cursorPresence>.001){
    vec3 cursor=vec3(pointer.x*a,pointer.y,.05);
    float cursorBall=length(p-cursor)-.15*cursorPresence;
    d=join(d,cursorBall,.32*cursorPresence);
  }
  return d;
}
vec3 normalAt(vec3 p){
  vec2 e=vec2(.002,0.);
  return normalize(vec3(field(p+e.xyy)-field(p-e.xyy),field(p+e.yxy)-field(p-e.yxy),field(p+e.yyx)-field(p-e.yyx)));
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-resolution)/resolution.y;
  vec3 origin=vec3(uv,3.);
  vec3 direction=vec3(0.,0.,-1.);
  float travel=0.; bool hit=false;
  for(int i=0;i<40;i++){
    float d=field(origin+direction*travel);
    if(d<.002){hit=true;break;}
    travel+=d*.85;
    if(travel>5.)break;
  }
  if(!hit){gl_FragColor=vec4(0.);return;}
  vec3 p=origin+direction*travel;
  vec3 n=normalAt(p);
  vec3 light=normalize(vec3(-.5,.8,1.3));
  float diffuse=max(dot(n,light),0.);
  float rim=pow(1.-max(n.z,0.),2.7);
  float spec=pow(max(dot(reflect(-light,n),-direction),0.),28.);
  vec3 base=mix(vec3(.18,.11,.30),vec3(.54,.37,.75),diffuse);
  vec3 color=base*(.27+diffuse*.65)+vec3(.58,.48,.74)*rim*.8+vec3(.95,.83,.99)*spec*.36;
  float band=pow(max(dot(n,normalize(vec3(1.,-.3,.15))),0.),5.);
  color+=vec3(.26,.12,.09)*band;
  gl_FragColor=vec4(color,1.);
}`;

export function mountFluid(canvas, { onState = () => {} } = {}) {
  const host = canvas.parentElement;
  const region = host.closest('.vf-hero') || host;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  let gl, program, buffer, shaders = [], raf = 0;
  let disposed = false, lost = false, paused = false, visible = false;
  let elapsed = 0, lastFrame = 0, lastTick = 0;
  let px = 0, py = 0, tx = 0, ty = 0;
  let cursorPresence = 0, cursorTarget = 0;
  let pointerInside = false;
  let uniforms;

  const state = () => {
    const canAnimate = Boolean(gl && program && !lost && !motion.matches);
    host.dataset.fluid = gl && program && !lost ? 'ready' : 'fallback';
    host.dataset.motion = motion.matches ? 'reduced' : paused ? 'paused' : 'running';
    onState({ available: canAnimate, paused });
  };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; lastFrame = lastTick = 0; };
  function release() {
    if (!gl) return;
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
    buffer = program = null; shaders = [];
  }
  function setup() {
    gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) throw new Error('WebGL unavailable');
    function compile(type, source) {
      const shader = gl.createShader(type); shaders.push(shader);
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader compilation failed');
      return shader;
    }
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Shader link failed');
    gl.useProgram(program);
    buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = Object.fromEntries(['resolution','pointer','cursorPresence','time','influence'].map(key => [key,gl.getUniformLocation(program,key)]));
    resize(); state();
  }
  function draw() {
    if (!gl || !program || lost || disposed || motion.matches) return;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, px, py);
    gl.uniform1f(uniforms.cursorPresence, coarse.matches ? 0 : cursorPresence);
    gl.uniform1f(uniforms.time, elapsed);
    gl.uniform1f(uniforms.influence, coarse.matches ? 0 : 1);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  function resize() {
    const bounds = host.getBoundingClientRect();
    // Cap total fragments as well as DPR. This is a budget, not a device benchmark.
    const pixelBudget = coarse.matches ? 420000 : 1000000;
    const ratio = Math.min(devicePixelRatio || 1, 1.25, Math.sqrt(pixelBudget/Math.max(1,bounds.width*bounds.height)));
    canvas.width = Math.max(1,Math.round(bounds.width*ratio));
    canvas.height = Math.max(1,Math.round(bounds.height*ratio));
    draw();
  }
  function frame(now) {
    raf = 0;
    if (disposed || lost || paused || motion.matches || document.hidden || !visible || !program) return;
    if (now-lastFrame >= 1000/30-1) {
      if (lastTick) elapsed += Math.min((now-lastTick)/1000,.1);
      lastTick = lastFrame = now;
      px += (tx-px)*.24; py += (ty-py)*.24;
      cursorPresence += (cursorTarget-cursorPresence)*.20;
      draw();
    }
    raf = requestAnimationFrame(frame);
  }
  function sync() {
    stop();
    if (!disposed && !lost && !paused && !motion.matches && !document.hidden && visible && program) raf = requestAnimationFrame(frame);
    state();
  }
  function preference() {
    if (!motion.matches && !program && !lost) {
      try { setup(); } catch { release(); }
    }
    sync();
  }
  function move(event) {
    if (event.pointerType === 'touch' || coarse.matches || motion.matches || paused) return;
    const rect = host.getBoundingClientRect();
    tx=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));
    ty=Math.max(-1,Math.min(1,1-(event.clientY-rect.top)/rect.height*2));
    // Enter at the actual pointer, never fly in from the centre of the text.
    if (!pointerInside) { px=tx; py=ty; }
    pointerInside=true; cursorTarget=1;
    host.dataset.cursor='active';
  }
  const leave = () => {
    pointerInside=false; cursorTarget=0;
    host.dataset.cursor='inactive';
  };
  const clearCursor = () => {
    leave(); cursorPresence=0;
  };
  const visibility = () => { if (document.hidden) clearCursor(); sync(); };
  const contextLost = event => { event.preventDefault(); lost=true; stop(); state(); };
  const contextRestored = () => { lost=false; release(); preference(); };
  const sizeObserver = new ResizeObserver(resize);
  const visibilityObserver = new IntersectionObserver(entries => {
    visible=entries[0].isIntersecting;
    if (!visible) clearCursor();
    sync();
  });
  sizeObserver.observe(host); visibilityObserver.observe(host);
  region.addEventListener('pointermove',move,{passive:true});
  region.addEventListener('pointerleave',leave,{passive:true});
  region.addEventListener('pointercancel',leave,{passive:true});
  document.addEventListener('visibilitychange',visibility);
  window.addEventListener('blur',clearCursor);
  motion.addEventListener('change',preference);
  canvas.addEventListener('webglcontextlost',contextLost);
  canvas.addEventListener('webglcontextrestored',contextRestored);
  preference();
  return {
    toggle() { paused=!paused; sync(); },
    destroy() {
      disposed=true; stop(); sizeObserver.disconnect(); visibilityObserver.disconnect();
      region.removeEventListener('pointermove',move); region.removeEventListener('pointerleave',leave);
      region.removeEventListener('pointercancel',leave);
      document.removeEventListener('visibilitychange',visibility); motion.removeEventListener('change',preference);
      window.removeEventListener('blur',clearCursor);
      canvas.removeEventListener('webglcontextlost',contextLost); canvas.removeEventListener('webglcontextrestored',contextRestored);
      release(); host.removeAttribute('data-fluid'); host.removeAttribute('data-motion'); host.removeAttribute('data-cursor');
    }
  };
}
