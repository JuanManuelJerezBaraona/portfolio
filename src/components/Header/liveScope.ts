import {
  AXON_OPACITY,
  AXON_WIDTH,
  BRANCH_OPACITY,
  BRANCH_WIDTH,
  PUNCTA_OPACITY,
  PUNCTA_WIDTH,
  SIZE,
  createRandom,
  growCulture,
  type Point,
} from './neuron';

/**
 * The hero micrograph, live. The same culture the server draws as SVG
 * (`neuron.ts`, same seed), redrawn in WebGL as a z-stack: every structure is
 * a cloud of soft points with a depth, so the field can do what a still image
 * can't.
 *
 *   depth      each neuron sits on its own plane; out of the focal plane a
 *              point spreads and dims (same light over a wider spot)
 *   stage      the pointer tilts the stack, so planes slide against each other
 *   focus      scrolling away racks the focus through the stack
 *   activity   a neuron fires now and then, and when it's clicked: the signal
 *              runs out along its dendrites and its synapses flash as it
 *              passes; the rest of the culture answers a moment later
 *
 * Plain WebGL2, no library: the whole scene is one draw call of points
 * through one shader, which doesn't need a scene graph. Channels blend the
 * way the rest of the site does: light is added in fluorescence, absorbed in
 * brightfield. Colors are read from the tokens, so both modes just work.
 *
 * Loaded on demand by `LiveMicrograph`, after the still image has painted.
 */

/** Culture units per second along a dendrite. */
const SIGNAL_SPEED = 230;

/** Depth of each neuron's plane, in culture units; the central one is in focus. */
const NEURON_Z = [0, -60, 50, 105, -100];

/** Blur (the SVG glow filters' stdDeviation) around each kind of structure. */
const GLOW = { neuron: 2.4, puncta: 1.6 };

const KIND = { gauss: 0, nucleus: 1, soma: 2 } as const;
const CHANNEL = { c1: 0, c2: 1, c3: 2 } as const;

/** x, y, z · sigma, amp, spacing, kind · channel, aspect, rotation, neuron · distance */
const STRIDE = 12;

/** The field is at most 34rem wide; at 2× that's ~1100 px. Nothing may ask for more than this. */
const MAX_BITMAP = 1600;

const VERTEX = `#version 300 es
precision highp float;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec4 aShape; // sigma, amplitude, spacing along a line (0: a dot), kind
layout(location = 2) in vec4 aCell;  // channel, aspect, rotation, neuron (-1: none)
layout(location = 3) in float aDist; // path length from the soma

uniform float uPx;        // device pixels per culture unit
uniform float uMaxPoint;
uniform vec2 uTilt;
uniform float uFocus;
uniform float uAperture;
uniform float uZoom;
uniform float uTime;
uniform float uFire[5];
uniform float uPulse;
uniform vec3 uGain;
uniform vec3 uPointer;    // x, y in culture units, strength

out float vAmp;
out float vSize;          // sprite width in culture units
out float vKind;
out vec2 vRadius;         // gaussian sigma, or the ellipse's radii
out float vRot;
out float vEdge;          // soma: how hard its edge is
flat out int vChan;

void main() {
  vec3 p = aPos - vec3(${SIZE / 2}.0, ${SIZE / 2}.0, 0.0);
  float depth = p.z - uFocus;
  p.xy += uTilt * p.z;
  p.xy *= uZoom * (1.0 + depth * 0.00045);
  gl_Position = vec4(p.x / ${SIZE / 2}.0, -p.y / ${SIZE / 2}.0, 0.0, 1.0);

  float kind = aShape.w;
  float blur = abs(depth) * uAperture;
  float amp = aShape.y;

  // A signal on its way out from the soma: the front, and calcium decaying behind it.
  float pulse = 0.0;
  if (aCell.w >= 0.0) {
    float t = uTime - uFire[int(aCell.w + 0.5)] - aDist / ${SIGNAL_SPEED}.0;
    float front = exp(-t * t * 70.0);
    float tail = t > 0.0 ? exp(-t * 1.6) * (1.0 - exp(-t * 30.0)) : 0.0;
    pulse = (front + 0.45 * tail) * uPulse;
  }

  float radius;
  if (kind < 0.5) {
    // Never thinner than the optics resolve; the same light then spreads wider.
    float sigma = max(sqrt(aShape.x * aShape.x + blur * blur), 0.62 / uPx);
    bool synapse = aCell.x > 1.5;
    if (synapse) sigma *= 1.0 + 0.14 * pulse;
    amp *= aShape.z > 0.0
      ? aShape.z * aShape.x / (2.5066 * sigma * sigma)
      : (aShape.x * aShape.x) / (sigma * sigma);
    amp *= 1.0 + (synapse ? 1.5 : 1.15) * pulse;
    vRadius = vec2(sigma);
    vEdge = 0.0;
    radius = 3.0 * sigma;
  } else {
    float spread = 2.0 * blur;
    vec2 r = vec2(aShape.x, aShape.x * aCell.y);
    vec2 wide = sqrt(r * r + spread * spread);
    amp *= (r.x * r.y) / (wide.x * wide.y);
    if (kind > 1.5) amp *= 1.0 + 0.5 * pulse;
    vRadius = wide;
    vEdge = 8.0 / (1.0 + 3.0 * spread / aShape.x);
    radius = max(wide.x, wide.y) * (kind > 1.5 ? 1.4 : 1.6);
  }

  // The excitation light is a little stronger under the pointer.
  vec2 fromPointer = p.xy + vec2(${SIZE / 2}.0) - uPointer.xy;
  amp *= 1.0 + 0.55 * uPointer.z * exp(-dot(fromPointer, fromPointer) / 4600.0);

  int channel = int(aCell.x + 0.5);
  vAmp = amp * uGain[channel];
  vChan = channel;
  vKind = kind;
  vRot = aCell.z;
  vSize = 2.0 * radius;
  gl_PointSize = min(vSize * uPx * uZoom, uMaxPoint);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;

in float vAmp;
in float vSize;
in float vKind;
in vec2 vRadius;
in float vRot;
in float vEdge;
flat in int vChan;

uniform vec3 uColor[3];
uniform float uMode; // 0: light is added (fluorescence) · 1: light is absorbed (brightfield)

out vec4 outColor;

void main() {
  vec2 d = (gl_PointCoord - 0.5) * vSize;
  float a;
  if (vKind < 0.5) {
    a = exp(-dot(d, d) / (2.0 * vRadius.x * vRadius.x));
  } else {
    float c = cos(vRot);
    float s = sin(vRot);
    float rho = length(vec2(c * d.x + s * d.y, -s * d.x + c * d.y) / vRadius);
    // A nucleus falls off from its center; a soma is flat with a soft edge.
    a = vKind < 1.5 ? exp(-1.35 * rho * rho * rho) : exp(-pow(rho / 1.05, vEdge));
  }
  // The sprite ends where the falloff would otherwise be cut.
  a = clamp((a - 0.011) * vAmp, 0.0, 1.0);

  vec3 color = uColor[vChan];
  outColor = uMode < 0.5
    ? vec4(color * a, 1.0)
    : vec4(pow(max(color, vec3(0.004)), vec3(a)), 1.0);
}
`;

/** Every structure of the culture as points, interleaved (see STRIDE). */
const buildPoints = () => {
  const culture = growCulture();
  // A second generator for what the flat image doesn't have (depth), so the
  // culture's own sequence stays untouched.
  const random = createRandom(20260117);
  const spread = (amount: number) => (random() - 0.5) * 2 * amount;
  const data: number[] = [];

  const push = (
    x: number,
    y: number,
    z: number,
    sigma: number,
    amp: number,
    spacing: number,
    kind: number,
    channel: number,
    aspect: number,
    rotation: number,
    neuron: number,
    dist: number,
  ) => {
    data.push(x, y, z, sigma, amp, spacing, kind, channel, aspect, rotation, neuron, dist);
  };

  /** Points every `spacing` along a polyline; `at` gives depth and distance for a path fraction. */
  const along = (points: Point[], spacing: number, visit: (x: number, y: number, travelled: number) => void) => {
    let travelled = 0;
    let next = 0;
    for (let i = 1; i < points.length; i += 1) {
      const a = points[i - 1];
      const b = points[i];
      const length = Math.hypot(b.x - a.x, b.y - a.y);
      while (next <= travelled + length) {
        const t = length ? (next - travelled) / length : 0;
        visit(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, next);
        next += spacing;
      }
      travelled += length;
    }
  };

  /** A stroke as the SVG draws it: a sharp core and the glow filter's halo around it. */
  const stroke = (
    points: Point[],
    width: number,
    opacity: number,
    neuron: number,
    depthAt: (travelled: number) => number,
    startDist: number,
  ) => {
    const core = 0.42 * width;
    const halo = Math.hypot(core, GLOW.neuron);
    for (const [sigma, amp] of [
      [core, opacity],
      [halo, (opacity * core) / halo],
    ]) {
      const spacing = 1.2 * sigma;
      along(points, spacing, (x, y, travelled) => {
        push(x, y, depthAt(travelled), sigma, amp, spacing, KIND.gauss, CHANNEL.c2, 1, 0, neuron, startDist + travelled);
      });
    }
  };

  // Dendrites: a branch starts at the depth its parent ended at, and wanders.
  const endDepth: number[] = [];
  const branchDepth = culture.branches.map((branch, index) => {
    const from = branch.parent < 0 ? NEURON_Z[branch.neuron] : endDepth[branch.parent];
    const to = from + spread(branch.length * 0.3);
    endDepth[index] = to;
    return (travelled: number) => from + (to - from) * (branch.length ? travelled / branch.length : 0);
  });
  culture.branches.forEach((branch, index) => {
    stroke(
      branch.points,
      BRANCH_WIDTH[branch.order],
      BRANCH_OPACITY[branch.order],
      branch.neuron,
      branchDepth[index],
      branch.start,
    );
  });

  for (const axon of culture.axons) {
    const from = NEURON_Z[axon.neuron];
    const drift = spread(70);
    let length = 0;
    for (let i = 1; i < axon.points.length; i += 1) {
      length += Math.hypot(axon.points[i].x - axon.points[i - 1].x, axon.points[i].y - axon.points[i - 1].y);
    }
    stroke(axon.points, AXON_WIDTH, AXON_OPACITY, axon.neuron, (travelled) => from + (drift * travelled) / length, 0);
  }

  // Synaptic puncta: a dot and its halo, at the depth of the dendrite they sit on.
  for (const punctum of culture.puncta) {
    const branch = culture.branches[punctum.branch];
    let depth = spread(130);
    let neuron = -1;
    let dist = 0;
    if (branch) {
      const steps = branch.points.length - 1;
      const travelled = (branch.length * punctum.at) / steps;
      depth = branchDepth[punctum.branch](travelled) + spread(5);
      neuron = branch.neuron;
      dist = branch.start + travelled;
    }
    const core = 0.42 * PUNCTA_WIDTH[punctum.size];
    const halo = Math.hypot(core, GLOW.puncta);
    const opacity = PUNCTA_OPACITY[punctum.size];
    push(punctum.x, punctum.y, depth, core, opacity, 0, KIND.gauss, CHANNEL.c3, 1, 0, neuron, dist);
    push(punctum.x, punctum.y, depth, halo, (opacity * core * core) / (halo * halo), 0, KIND.gauss, CHANNEL.c3, 1, 0, neuron, dist);
  }

  const radians = (degrees: number) => (degrees * Math.PI) / 180;

  culture.nuclei.forEach((nucleus, index) => {
    const depth = index < culture.somas.length ? NEURON_Z[index] : spread(120);
    push(nucleus.x, nucleus.y, depth, nucleus.rx, 0.95, 0, KIND.nucleus, CHANNEL.c1, nucleus.ry / nucleus.rx, radians(nucleus.rot), -1, 0);
  });

  culture.somas.forEach((soma, index) => {
    push(soma.x, soma.y, NEURON_Z[index], soma.r, 0.78, 0, KIND.soma, CHANNEL.c2, 0.82, radians(soma.rot), index, 0);
    // The glow around it, which the SVG gets from its blur filter.
    push(soma.x, soma.y, NEURON_Z[index], soma.r * 0.8, 0.32, 0, KIND.gauss, CHANNEL.c2, 1, 0, index, 0);
  });

  return { data: new Float32Array(data), somas: culture.somas };
};

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[micrograph] shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

/** A token's value as r, g, b in 0–1. The tokens are hex; anything else goes through a canvas. */
const readColor = (styles: CSSStyleDeclaration, token: string): [number, number, number] => {
  const value = styles.getPropertyValue(token).trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value)?.[1];
  if (hex) {
    const full = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as [number, number, number];
  }
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return [1, 1, 1];
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface LiveScopeOptions {
  /** The first frame is on the canvas: it can take over from the still image. */
  onReady: () => void;
  /** The GPU dropped the context: go back to the still image. */
  onLost: () => void;
}

/**
 * Starts drawing on `canvas`. `rig` is the `.scope-rig` around it, where the
 * channel toggles live. Returns a function that stops everything, or null if
 * WebGL2 isn't available (the still image simply stays).
 */
export const startLiveScope = (canvas: HTMLCanvasElement, rig: HTMLElement, options: LiveScopeOptions) => {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  });
  if (!gl) return null;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[micrograph] program:', gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  const { data, somas } = buildPoints();
  const count = data.length / STRIDE;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  const bytes = STRIDE * 4;
  [3, 4, 4, 1].reduce((offset, size, location) => {
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, bytes, offset * 4);
    return offset + size;
  }, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const u = {
    px: uniform('uPx'),
    maxPoint: uniform('uMaxPoint'),
    tilt: uniform('uTilt'),
    focus: uniform('uFocus'),
    aperture: uniform('uAperture'),
    zoom: uniform('uZoom'),
    time: uniform('uTime'),
    fire: uniform('uFire'),
    pulse: uniform('uPulse'),
    gain: uniform('uGain'),
    pointer: uniform('uPointer'),
    color: uniform('uColor'),
    mode: uniform('uMode'),
  };
  const maxPoint = (gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array)[1];
  gl.uniform1f(u.maxPoint, maxPoint);
  gl.enable(gl.BLEND);

  /* ---- what the frame reads ------------------------------------------- */

  const header = rig.closest('header');
  const toggles = ['ch-c1', 'ch-c2', 'ch-c3'].map((id) => rig.querySelector<HTMLInputElement>(`#${id}`));
  const fire = new Float32Array(somas.length).fill(-100);
  const queue: { at: number; neuron: number }[] = [];
  const gain = new Float32Array([1, 1, 1]);
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
  const pointer = { x: SIZE / 2, y: SIZE / 2, strength: 0, target: 0 };
  let solo = -1;
  let focus = 0;
  let brightfield = false;
  let paletteStale = true;
  let visible = true;
  let frame = 0;
  let ready = false;
  let dead = false;
  const startedAt = performance.now();
  let last = startedAt;

  const applyPalette = () => {
    paletteStale = false;
    const styles = getComputedStyle(document.documentElement);
    const background = readColor(styles, '--scope-bg');
    // The field is light when its channels are stains rather than light.
    brightfield = styles.getPropertyValue('--blend').trim() === 'multiply';
    gl.uniform3fv(u.color, new Float32Array(['--dapi', '--gfp', '--mcherry'].flatMap((token) => readColor(styles, token))));
    gl.uniform1f(u.mode, brightfield ? 1 : 0);
    gl.uniform1f(u.pulse, brightfield ? 0.6 : 1);
    gl.clearColor(background[0], background[1], background[2], 1);
    if (brightfield) gl.blendFunc(gl.DST_COLOR, gl.ZERO);
    else gl.blendFunc(gl.ONE, gl.ONE);
  };

  // Measured from the round field around it, never from the canvas itself: a
  // canvas whose CSS size isn't pinned is as wide as its own bitmap, so sizing
  // the bitmap from it would double it on every pass. Capped either way.
  const field = canvas.closest<HTMLElement>('.scope') ?? canvas.parentElement ?? canvas;
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const size = clamp(Math.round(field.clientWidth * ratio), 1, MAX_BITMAP);
    if (canvas.width !== size) {
      canvas.width = size;
      canvas.height = size;
    }
    gl.viewport(0, 0, size, size);
    gl.uniform1f(u.px, size / SIZE);
  };

  const schedule = (neuron: number, at: number) => queue.push({ neuron, at });
  // Spontaneous activity: each neuron fires on its own every several seconds.
  somas.forEach((_, neuron) => schedule(neuron, 1.2 + neuron * 1.7 + Math.random() * 2));

  /** A stimulus at a point of the field: the nearest neuron fires, and the rest answer. */
  const stimulate = (x: number, y: number, now: number) => {
    const distances = somas.map((soma) => Math.hypot(soma.x - x, soma.y - y));
    const nearest = distances.indexOf(Math.min(...distances));
    fire[nearest] = now;
    somas.forEach((soma, neuron) => {
      if (neuron === nearest) return;
      const apart = Math.hypot(soma.x - somas[nearest].x, soma.y - somas[nearest].y);
      schedule(neuron, now + 0.35 + apart / 520);
    });
  };

  const draw = (time: number) => {
    frame = 0;
    if (dead) return;
    const delta = Math.min(time - last, 64);
    last = time;
    const now = (time - startedAt) / 1000;
    const ease = (rate: number) => 1 - Math.exp(-delta / rate);

    if (paletteStale) applyPalette();

    // Due signals fire; a spontaneous one books the neuron's next.
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      if (queue[i].at > now) continue;
      const [{ neuron }] = queue.splice(i, 1);
      if (now - fire[neuron] > 1.5) fire[neuron] = now;
      if (!queue.some((item) => item.neuron === neuron)) schedule(neuron, now + 6 + Math.random() * 9);
    }

    toggles.forEach((toggle, channel) => {
      const on = toggle ? toggle.checked : true;
      let target = on ? 1 : 0;
      if (solo >= 0) target = channel === solo ? (on ? 1 : 0.4) : on ? 0.12 : 0;
      gain[channel] += (target - gain[channel]) * ease(140);
    });

    // The stage: the pointer tilts the stack, on top of a slow drift of its own.
    tilt.x += (tilt.tx - tilt.x) * ease(260);
    tilt.y += (tilt.ty - tilt.y) * ease(260);
    pointer.strength += (pointer.target - pointer.strength) * ease(220);
    const driftX = Math.sin(now * 0.23) * 0.022;
    const driftY = Math.cos(now * 0.17) * 0.022;

    // Scrolling away racks the focus through the stack, towards the far planes.
    let leaving = 0;
    if (header) {
      const rect = header.getBoundingClientRect();
      leaving = clamp(-rect.top / (rect.height * 0.75), 0, 1);
    }
    focus += (smoothstep(leaving) * 95 - focus) * ease(180);

    // The depth opens up over the first second, so the takeover from the flat image is seamless.
    const opening = smoothstep(clamp(now / 1.4, 0, 1));

    gl.uniform1f(u.time, now);
    gl.uniform1fv(u.fire, fire);
    gl.uniform3fv(u.gain, gain);
    gl.uniform2f(u.tilt, (tilt.x + driftX) * opening, (tilt.y + driftY) * opening);
    gl.uniform1f(u.focus, focus);
    gl.uniform1f(u.aperture, 0.011 * opening);
    gl.uniform1f(u.zoom, 1 + 0.05 * smoothstep(leaving));
    gl.uniform3f(u.pointer, pointer.x, pointer.y, pointer.strength);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, count);

    if (!ready) {
      ready = true;
      options.onReady();
    }
    if (visible && !document.hidden) frame = requestAnimationFrame(draw);
  };

  const wake = () => {
    if (!frame && !dead && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(draw);
    }
  };

  /* ---- inputs ---------------------------------------------------------- */

  const scope = canvas.closest<HTMLElement>('.scope') ?? canvas;

  /** A pointer position in culture units, and whether it's inside the round field. */
  const locate = (event: PointerEvent | MouseEvent) => {
    const rect = field.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * SIZE;
    const y = ((event.clientY - rect.top) / rect.height) * SIZE;
    return { x, y, inside: Math.hypot(x - SIZE / 2, y - SIZE / 2) <= SIZE / 2, rect };
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const { x, y, inside, rect } = locate(event);
    // The tilt follows the pointer wherever it is on the page, eased off with distance.
    tilt.tx = clamp((event.clientX - (rect.left + rect.width / 2)) / window.innerWidth, -0.5, 0.5) * 0.2;
    tilt.ty = clamp((event.clientY - (rect.top + rect.height / 2)) / window.innerHeight, -0.5, 0.5) * 0.2;
    pointer.x = x;
    pointer.y = y;
    pointer.target = inside ? 1 : 0;
  };
  const onPointerLeave = () => {
    tilt.tx = 0;
    tilt.ty = 0;
    pointer.target = 0;
  };
  const onClick = (event: MouseEvent) => {
    const { x, y, inside } = locate(event);
    if (inside) stimulate(x, y, (performance.now() - startedAt) / 1000);
  };

  const channels = Array.from(rig.querySelectorAll<HTMLElement>('.channel'));
  const onSolo = (event: Event) => {
    solo = event.type === 'pointerenter' && (event as PointerEvent).pointerType === 'mouse'
      ? channels.indexOf(event.currentTarget as HTMLElement)
      : -1;
  };
  const onMode = () => {
    paletteStale = true;
  };
  const onLost = (event: Event) => {
    event.preventDefault();
    dead = true;
    cancelAnimationFrame(frame);
    options.onLost();
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);
  scope.addEventListener('click', onClick);
  channels.forEach((channel) => {
    channel.addEventListener('pointerenter', onSolo);
    channel.addEventListener('pointerleave', onSolo);
  });
  window.addEventListener('scope-mode-change', onMode);
  document.addEventListener('visibilitychange', wake);
  canvas.addEventListener('webglcontextlost', onLost);

  const sizes = new ResizeObserver(() => {
    resize();
    wake();
  });
  sizes.observe(field);
  const sight = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    wake();
  });
  sight.observe(canvas);

  resize();
  frame = requestAnimationFrame(draw);

  return () => {
    dead = true;
    cancelAnimationFrame(frame);
    sizes.disconnect();
    sight.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    scope.removeEventListener('click', onClick);
    channels.forEach((channel) => {
      channel.removeEventListener('pointerenter', onSolo);
      channel.removeEventListener('pointerleave', onSolo);
    });
    window.removeEventListener('scope-mode-change', onMode);
    document.removeEventListener('visibilitychange', wake);
    canvas.removeEventListener('webglcontextlost', onLost);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
};
