// Independently written visual study inspired by Filip Zrnzevic's metaball hero:
// https://codepen.io/filipz/pen/ogjXgBP
// No original shader, fonts, image assets or demo controls are included.
const vertex = `attribute vec2 position;
void main(){ gl_Position=vec4(position,0.,1.); }`;
const fragment = `precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float cursorPresence;
uniform vec3 centres[4];
uniform vec3 checkBubble;
uniform vec2 checkLight;
uniform vec2 checkPull;
uniform sampler2D checkLabel;
float join(float a,float b,float k){
  float h=clamp(.5+.5*(b-a)/k,0.,1.);
  return mix(b,a,h)-k*h*(1.-h);
}
float field(vec3 p){
  float a=resolution.x/resolution.y;
  // These centres are identical to the original trajectories, calculated once
  // per frame on the CPU instead of in every ray step and normal sample.
  float d=length(p-centres[0])-.57;
  d=join(d,length(p-centres[1])-.26,.30);
  d=join(d,length(p-centres[2])-.64,.30);
  d=join(d,length(p-centres[3])-.30,.32);
  if(checkBubble.z>0.){
    d=join(d,length(p-vec3(checkBubble.xy,.10))-checkBubble.z,.10);
  }
  // The pointer lives in the same aspect-correct world as the other spheres.
  // Smooth union creates a real neck between surfaces, rather than an overlap.
  if(cursorPresence>.001){
    vec3 cursor=vec3(pointer.x*a,pointer.y,.05);
    float nearCheck=0.;
    if(checkBubble.z>0.){
      nearCheck=1.-smoothstep(1.6,3.4,length(cursor.xy-checkBubble.xy)/checkBubble.z);
    }
    float cursorRadius=mix(.15,min(.15,checkBubble.z*.92),nearCheck);
    float neck=mix(.32,min(.32,checkBubble.z*1.75),nearCheck);
    float cursorBall=length(p-cursor)-cursorRadius*cursorPresence;
    d=join(d,cursorBall,neck*cursorPresence);
  }
  return d;
}
vec3 normalAt(vec3 p){
  vec2 e=vec2(.002,0.);
  return normalize(vec3(field(p+e.xyy)-field(p-e.xyy),field(p+e.yxy)-field(p-e.yxy),field(p+e.yyx)-field(p-e.yyx)));
}
vec3 bubbleLight(vec3 n, vec3 light){
  float diffuse=max(dot(n,light),0.);
  float rim=pow(1.-max(n.z,0.),2.7);
  float spec=pow(max(reflect(-light,n).z,0.),28.);
  vec3 base=mix(vec3(.18,.11,.30),vec3(.54,.37,.75),diffuse);
  vec3 color=base*(.27+diffuse*.65)+vec3(.58,.48,.74)*rim*.8+vec3(.95,.83,.99)*spec*.36;
  float band=pow(max(dot(n,normalize(vec3(1.,-.3,.15))),0.),5.);
  return color+vec3(.26,.12,.09)*band;
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-resolution)/resolution.y;
  vec3 light=normalize(vec3(-.5,.8,1.3));
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
  vec3 normal=normalAt(p);
  vec3 color=bubbleLight(normal,light);
  if(checkBubble.z>0.){
    vec3 local=(p-vec3(checkBubble.xy,.10))/checkBubble.z;
    float coverage=1.-smoothstep(1.02,1.68,length(local));
    float inkCoverage=1.-smoothstep(.84,1.24,length(local.xy));
    if(coverage>0. || inkCoverage>0.){
      vec2 face=local.xy;
      // Use the same surface hit for shading and lettering, so the label
      // bends into the neck shared with the cursor bubble.
      vec2 pullAxis=checkPull/max(length(checkPull),.001);
      face-=checkPull*max(0.,dot(face,pullAxis))*.85;
      face+=(normal.xy-normalize(local).xy)*.12;
      float rr=dot(face,face);
      vec2 label=face*(1.+rr*.50);
      label.y/=.68+.32*sqrt(max(0.,1.-face.x*face.x));
      float ink=texture2D(checkLabel,clamp(.5+label*.5,0.,1.)).a;
      vec3 shaded=bubbleLight(normal,normalize(light+vec3(checkLight,0.)))+vec3(.10,.022,.18)*max(0.,normal.z);
      color=mix(color,shaded,coverage);
      color=mix(color,vec3(.93,.87,1.)*(.84+.16*max(0.,normal.z)),ink*inkCoverage);
    }
  }
  gl_FragColor=vec4(color,1.);
}`;

export function mountFluid(canvas, { checkButton = null, onState = () => {} } = {}) {
  const host = canvas.parentElement;
  const region = host.closest('.vf-hero') || host;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  let gl, program, buffer, labelTexture, shaders = [], raf = 0;
  let ready = false, preparing = false, epoch = 0;
  let disposed = false, lost = false, paused = false, visible = false;
  let elapsed = 0, lastFrame = 0, lastTick = 0;
  let px = 0, py = 0, tx = 0, ty = 0;
  let cursorPresence = 0, cursorTarget = 0;
  let pointerInside = false;
  let uniforms;
  const centres = new Float32Array(12);
  const globe = { x: 0, y: 0, radius: 0, lightX: 0, lightY: 0, pullX: 0, pullY: 0 };
  const checkState = checkButton ? new MutationObserver(() => {
    if (checkButton.getAttribute('aria-expanded') === 'true') clearCursor();
    draw();
  }) : null;
  checkState?.observe(checkButton, { attributeFilter: ['aria-expanded'] });

  const state = () => {
    const canAnimate = Boolean(gl && ready && !lost && !motion.matches);
    host.dataset.fluid = gl && ready && !lost ? 'ready' : 'fallback';
    host.dataset.motion = motion.matches ? 'reduced' : paused ? 'paused' : 'running';
    onState({ available: canAnimate, paused });
  };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; lastFrame = lastTick = 0; };
  function release() {
    epoch++; ready = preparing = false;
    if (!gl) return;
    if (labelTexture) gl.deleteTexture(labelTexture);
    labelTexture = null;
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
    buffer = program = null; shaders = [];
  }
  async function setup() {
    const attempt = ++epoch;
    preparing = true;
    gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) throw new Error('WebGL unavailable');
    function compile(type, source) {
      const shader = gl.createShader(type); shaders.push(shader);
      gl.shaderSource(shader, source); gl.compileShader(shader);
      return shader;
    }
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    // Querying shader/link status immediately forces the browser to wait for
    // the GPU compiler. Poll its non-blocking completion flag when available.
    const parallel = gl.getExtension('KHR_parallel_shader_compile');
    if (parallel) {
      while (!gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
        await new Promise(resolve => setTimeout(resolve, 16));
        if (disposed || lost || attempt !== epoch) return;
      }
    }
    if (disposed || lost || attempt !== epoch) return;
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Shader link failed');
    gl.useProgram(program);
    buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = Object.fromEntries(['resolution','pointer','cursorPresence','checkBubble','checkLight','checkPull'].map(key => [key,gl.getUniformLocation(program,key)]));
    uniforms.centres = gl.getUniformLocation(program, 'centres[0]');
    if (checkButton) {
      const label = document.createElement('canvas');
      label.width = label.height = 256;
      const paint = label.getContext('2d');
      if (!paint) throw new Error('Bubble label rendering unavailable');
      paint.font = '700 70px Arial, Helvetica, sans-serif';
      paint.textAlign = 'center';
      paint.textBaseline = 'middle';
      paint.fillStyle = '#fff';
      paint.fillText('Web', 128, 90);
      paint.fillText('Check', 128, 161);
      labelTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, labelTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, label);
      gl.uniform1i(gl.getUniformLocation(program, 'checkLabel'), 0);
    }
    ready = true; preparing = false;
    if (!resize()) draw();
    sync();
  }
  function draw() {
    if (!gl || !ready || lost || disposed || motion.matches || document.hidden) return;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, px, py);
    gl.uniform1f(uniforms.cursorPresence, coarse.matches ? 0 : cursorPresence);
    const a = canvas.width / canvas.height, t = elapsed * .22;
    const sx = coarse.matches ? 0 : px * .045, sy = coarse.matches ? 0 : py * .045;
    const lx = -a * .89 + sx, ly = .84 + sy;
    const rx = a * .89 - sx, ry = -.84 - sy;
    centres.set([
      lx, ly, 0,
      lx + .40 + Math.sin(t) * .16, ly - .46 + Math.cos(t) * .13, .06,
      rx, ry, .06,
      rx - .50 + Math.sin(t * .8) * .16, ry + .46 + Math.cos(t * .7) * .13, .06,
    ]);
    gl.uniform3fv(uniforms.centres, centres);
    if (checkButton) {
      const scale = 1 + .058 * (1 - Math.cos(elapsed * Math.PI * 2 / 2.8));
      const radius = checkButton.getAttribute('aria-expanded') === 'true' ? 0 : globe.radius * scale;
      checkButton.style.setProperty('--bubble-pulse', String(scale));
      const pull = Math.hypot(globe.pullX, globe.pullY);
      if (pull > .005) {
        // Move the HTML hit target with the stretched side of the sphere.
        const angle = Math.atan2(-globe.pullY, globe.pullX);
        const length = 1 / (1 - pull);
        checkButton.style.setProperty('--bubble-shape', `rotate(${angle}rad) translateX(${(length - 1) * 25}%) scaleX(${(1 + length) / 2}) rotate(${-angle}rad)`);
      } else {
        checkButton.style.removeProperty('--bubble-shape');
      }
      gl.uniform3f(uniforms.checkBubble, globe.x, globe.y, radius);
      gl.uniform2f(uniforms.checkLight, globe.lightX, globe.lightY);
      gl.uniform2f(uniforms.checkPull, globe.pullX, globe.pullY);
    }
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  function resize() {
    const bounds = host.getBoundingClientRect();
    // Keep curved silhouettes sharp on large/Retina displays, while bounding
    // the fragment workload. Scheduling and shader optimisations remain active.
    const pixelBudget = coarse.matches ? 1000000 : 4000000;
    const ratio = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(pixelBudget/Math.max(1,bounds.width*bounds.height)));
    const width = Math.max(1,Math.round(bounds.width*ratio));
    const height = Math.max(1,Math.round(bounds.height*ratio));
    if (checkButton && bounds.height > 0) {
      const size = checkButton.offsetWidth;
      globe.x = (checkButton.offsetLeft * 2 + size - bounds.width) / bounds.height;
      globe.y = 1 - (checkButton.offsetTop * 2 + size) / bounds.height;
      globe.radius = size / bounds.height;
    }
    if (canvas.width === width && canvas.height === height) return false;
    canvas.width = width;
    canvas.height = height;
    draw();
    return true;
  }
  function frame(now) {
    raf = 0;
    if (disposed || lost || paused || motion.matches || document.hidden || !visible || !ready) return;
    if (now-lastFrame >= 1000/30-1) {
      if (lastTick) elapsed += Math.min((now-lastTick)/1000,.1);
      lastTick = lastFrame = now;
      px += (tx-px)*.24; py += (ty-py)*.24;
      cursorPresence += (cursorTarget-cursorPresence)*.20;
      if (checkButton && globe.radius) {
        const dx = (px * canvas.width / canvas.height - globe.x) / globe.radius;
        const dy = (py - globe.y) / globe.radius;
        const distance = Math.hypot(dx, dy);
        const proximity = pointerInside && !coarse.matches ? Math.max(0, 1 - distance / 2.4) : 0;
        const pull = proximity * .58 / Math.max(1, distance);
        globe.pullX += (dx * pull - globe.pullX) * .22;
        globe.pullY += (dy * pull - globe.pullY) * .22;
        globe.lightX += (dx * proximity * .4 - globe.lightX) * .22;
        globe.lightY += (dy * proximity * .4 - globe.lightY) * .22;
      }
      draw();
    }
    raf = requestAnimationFrame(frame);
  }
  function sync() {
    stop();
    if (!disposed && !lost && !paused && !motion.matches && !document.hidden && visible && ready) raf = requestAnimationFrame(frame);
    state();
  }
  function preference() {
    if (!motion.matches && !ready && !preparing && !lost) {
      const attempt = epoch + 1;
      setup().catch(() => {
        if (attempt !== epoch) return;
        release(); state();
      });
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
    pointerInside=true;
    const onPanel = event.target instanceof Element && event.target.closest('.vf-check-panel');
    cursorTarget = onPanel ? 0 : 1;
    if (onPanel) cursorPresence=0;
    host.dataset.cursor=cursorTarget ? 'active' : 'inactive';
  }
  const leave = () => {
    pointerInside=false; cursorTarget=0;
    host.dataset.cursor='inactive';
  };
  const clearCursor = () => {
    leave(); cursorPresence=0;
  };
  const visibility = () => { if (document.hidden) clearCursor(); sync(); };
  const contextLost = event => { event.preventDefault(); lost=true; epoch++; ready=preparing=false; stop(); state(); };
  const contextRestored = () => { lost=false; release(); preference(); };
  const sizeObserver = new ResizeObserver(resize);
  const visibilityObserver = new IntersectionObserver(entries => {
    visible=entries[0].isIntersecting;
    if (!visible) clearCursor();
    sync();
  });
  sizeObserver.observe(host);
  if (checkButton) sizeObserver.observe(checkButton);
  visibilityObserver.observe(host);
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
    toggle() { paused=!paused; if (paused) { clearCursor(); draw(); } sync(); },
    destroy() {
      disposed=true; stop(); sizeObserver.disconnect(); visibilityObserver.disconnect();
      checkState?.disconnect();
      checkButton?.style.removeProperty('--bubble-pulse');
      checkButton?.style.removeProperty('--bubble-shape');
      region.removeEventListener('pointermove',move); region.removeEventListener('pointerleave',leave);
      region.removeEventListener('pointercancel',leave);
      document.removeEventListener('visibilitychange',visibility); motion.removeEventListener('change',preference);
      window.removeEventListener('blur',clearCursor);
      canvas.removeEventListener('webglcontextlost',contextLost); canvas.removeEventListener('webglcontextrestored',contextRestored);
      release(); host.removeAttribute('data-fluid'); host.removeAttribute('data-motion'); host.removeAttribute('data-cursor');
    }
  };
}
