import type { CSSProperties } from 'react';

/**
 * A cultured neuron under a confocal microscope, drawn procedurally.
 *
 *   C1 · DAPI    → nuclei
 *   C2 · GFP     → dendrites, axon and somas
 *   C3 · mCherry → synaptic puncta along the dendrites
 *
 * The generator is seeded, so the server always renders the same image and
 * nothing ships to the client. Each channel is its own <svg>; globals.css
 * blends them additively (`.scope-layer`) and wires up the toggles.
 */

const SIZE = 600;

/** Small, fast, seedable PRNG (mulberry32). */
const createRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const round = (n: number) => Math.round(n * 10) / 10;

interface Point {
  x: number;
  y: number;
}

interface NeuronSpec {
  x: number;
  y: number;
  dendrites: number;
  reach: number;
  depth: number;
  soma: number;
  axon?: number;
}

const NEURONS: NeuronSpec[] = [
  { x: 292, y: 300, dendrites: 7, reach: 74, depth: 3, soma: 15, axon: 420 },
  { x: 110, y: 470, dendrites: 5, reach: 58, depth: 3, soma: 11, axon: 260 },
  { x: 490, y: 120, dendrites: 6, reach: 60, depth: 3, soma: 12 },
  { x: -30, y: 170, dendrites: 5, reach: 70, depth: 3, soma: 12 },
  { x: 640, y: 450, dendrites: 5, reach: 72, depth: 3, soma: 12 },
];

/** Width (and brightness) per branch order: primary dendrites are thickest. */
const BRANCH_WIDTH = [3.4, 2.1, 1.3, 0.8];
const BRANCH_OPACITY = [0.95, 0.85, 0.7, 0.55];

const generate = () => {
  const random = createRandom(20131126);
  const range = (min: number, max: number) => min + random() * (max - min);

  // One path string per branch order keeps the markup small.
  const branches: string[] = BRANCH_WIDTH.map(() => '');
  const axons: string[] = [];
  const somas: { x: number; y: number; r: number; rot: number }[] = [];
  const puncta: Point[] = [];

  const walk = (start: Point, angle: number, length: number, steps: number, wander: number) => {
    const points: Point[] = [start];
    let { x, y } = start;
    let heading = angle;
    const step = length / steps;
    for (let i = 0; i < steps; i += 1) {
      heading += range(-wander, wander);
      x += Math.cos(heading) * step;
      y += Math.sin(heading) * step;
      points.push({ x, y });
    }
    return { points, heading };
  };

  const toPath = (points: Point[]) =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`).join('');

  const grow = (start: Point, angle: number, length: number, order: number, maxOrder: number) => {
    const { points, heading } = walk(start, angle, length, 5, 0.28);
    branches[order] += toPath(points);

    // Synapses sit along the dendrite, slightly off the shaft.
    for (const p of points.slice(1)) {
      if (random() < 0.55 + order * 0.1) {
        puncta.push({ x: p.x + range(-3, 3), y: p.y + range(-3, 3) });
      }
    }

    if (order >= maxOrder) return;
    const tip = points[points.length - 1];
    const spread = range(0.35, 0.7);
    grow(tip, heading - spread, length * range(0.6, 0.8), order + 1, maxOrder);
    if (random() < 0.85) {
      grow(tip, heading + spread, length * range(0.6, 0.8), order + 1, maxOrder);
    }
  };

  for (const neuron of NEURONS) {
    const offset = random() * Math.PI * 2;
    for (let i = 0; i < neuron.dendrites; i += 1) {
      const angle = offset + (i / neuron.dendrites) * Math.PI * 2 + range(-0.3, 0.3);
      const start = {
        x: neuron.x + Math.cos(angle) * neuron.soma * 0.7,
        y: neuron.y + Math.sin(angle) * neuron.soma * 0.7,
      };
      grow(start, angle, neuron.reach * range(0.8, 1.25), 0, neuron.depth);
    }

    if (neuron.axon) {
      const { points } = walk(
        { x: neuron.x, y: neuron.y },
        offset + range(0, Math.PI * 2),
        neuron.axon,
        28,
        0.16,
      );
      axons.push(toPath(points));
    }

    somas.push({ x: neuron.x, y: neuron.y, r: neuron.soma, rot: range(-40, 40) });
  }

  // Glia and out-of-plane cells: nuclei with no visible processes.
  const nuclei = somas.map((s) => ({ x: s.x, y: s.y, rx: s.r * 0.78, ry: s.r * 0.66, rot: s.rot }));
  for (let i = 0; i < 26; i += 1) {
    const r = range(6, 10.5);
    nuclei.push({
      x: range(20, SIZE - 20),
      y: range(20, SIZE - 20),
      rx: r,
      ry: r * range(0.62, 0.85),
      rot: range(0, 180),
    });
  }

  // Background puncta that aren't on a visible dendrite.
  for (let i = 0; i < 70; i += 1) {
    puncta.push({ x: range(0, SIZE), y: range(0, SIZE) });
  }

  // Split puncta into three sizes; each size is a single path of
  // zero-length round-capped strokes, i.e. dots.
  const punctaBySize = ['', '', ''];
  for (const p of puncta) {
    const bucket = Math.floor(random() * 3);
    punctaBySize[bucket] += `M${round(p.x)} ${round(p.y)}h0`;
  }

  return { branches, axons, somas, nuclei, punctaBySize };
};

const IMAGE = generate();

const Glow = ({ id, amount }: { id: string; amount: number }) => (
  <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur stdDeviation={amount} result="bloom" />
    <feMerge>
      <feMergeNode in="bloom" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

const layerProps = {
  viewBox: `0 0 ${SIZE} ${SIZE}`,
  'aria-hidden': true,
  preserveAspectRatio: 'xMidYMid slice',
} as const;

/**
 * The same image as one standalone SVG string, for places that can't use
 * CSS blending (the Open Graph card). Channels blend with `screen`.
 */
export const micrographSvg = (colors = { c1: '#6f8cff', c2: '#4ef08f', c3: '#ff4f73' }) => {
  const nuclei = IMAGE.nuclei
    .map(
      (n) =>
        `<ellipse cx="${round(n.x)}" cy="${round(n.y)}" rx="${round(n.rx)}" ry="${round(n.ry)}" transform="rotate(${round(n.rot)} ${round(n.x)} ${round(n.y)})" fill="url(#n)"/>`,
    )
    .join('');
  const branches = IMAGE.branches
    .map((d, order) => `<path d="${d}" stroke-width="${BRANCH_WIDTH[order]}" stroke-opacity="${BRANCH_OPACITY[order]}"/>`)
    .join('');
  const axons = IMAGE.axons.map((d) => `<path d="${d}" stroke-width="0.9" stroke-opacity="0.6"/>`).join('');
  const somas = IMAGE.somas
    .map(
      (s) =>
        `<ellipse cx="${round(s.x)}" cy="${round(s.y)}" rx="${s.r}" ry="${round(s.r * 0.82)}" transform="rotate(${round(s.rot)} ${round(s.x)} ${round(s.y)})" fill="${colors.c2}" stroke="none"/>`,
    )
    .join('');
  const puncta = IMAGE.punctaBySize
    .map((d, i) => `<path d="${d}" stroke-width="${[2.4, 3.4, 4.6][i]}" stroke-opacity="${[0.75, 0.85, 0.95][i]}"/>`)
    .join('');

  const glow = (id: string, amount: number) =>
    `<filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${amount}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
<defs><radialGradient id="n"><stop offset="0%" stop-color="${colors.c1}" stop-opacity="0.95"/><stop offset="70%" stop-color="${colors.c1}" stop-opacity="0.6"/><stop offset="100%" stop-color="${colors.c1}" stop-opacity="0"/></radialGradient>${glow('g1', 3)}${glow('g2', 2.4)}${glow('g3', 1.6)}</defs>
<rect width="${SIZE}" height="${SIZE}" fill="#000"/>
<g style="mix-blend-mode:screen" filter="url(#g1)">${nuclei}</g>
<g style="mix-blend-mode:screen" filter="url(#g2)" fill="none" stroke="${colors.c2}" stroke-linecap="round" stroke-linejoin="round">${branches}${axons}${somas}</g>
<g style="mix-blend-mode:screen" filter="url(#g3)" fill="none" stroke="${colors.c3}" stroke-linecap="round">${puncta}</g>
</svg>`;
};

const Micrograph = () => (
  <div className="scope-field">
    {/* C1 · DAPI · nuclei */}
    <svg {...layerProps} className="scope-layer scope-layer--c1 text-dapi">
      <defs>
        <radialGradient id="nucleus">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <Glow id="glow-c1" amount={3} />
      </defs>
      <g filter="url(#glow-c1)">
        {IMAGE.nuclei.map((n, i) => (
          <ellipse
            key={i}
            cx={round(n.x)}
            cy={round(n.y)}
            rx={round(n.rx)}
            ry={round(n.ry)}
            transform={`rotate(${round(n.rot)} ${round(n.x)} ${round(n.y)})`}
            fill="url(#nucleus)"
          />
        ))}
      </g>
    </svg>

    {/* C2 · GFP · neurons */}
    <svg {...layerProps} className="scope-layer scope-layer--c2 text-gfp">
      <defs>
        <radialGradient id="haze">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <Glow id="glow-c2" amount={2.4} />
      </defs>
      <circle cx="292" cy="300" r="200" fill="url(#haze)" />
      <g
        filter="url(#glow-c2)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {IMAGE.branches.map((d, order) => (
          <path
            key={order}
            d={d}
            strokeWidth={BRANCH_WIDTH[order]}
            strokeOpacity={BRANCH_OPACITY[order]}
          />
        ))}
        {IMAGE.axons.map((d, i) => (
          <path key={i} d={d} strokeWidth={0.9} strokeOpacity={0.6} />
        ))}
        {IMAGE.somas.map((s, i) => (
          <ellipse
            key={i}
            className="soma"
            style={{ '--ca-delay': `${1.5 + i * 2.3}s` } as CSSProperties}
            cx={round(s.x)}
            cy={round(s.y)}
            rx={s.r}
            ry={round(s.r * 0.82)}
            transform={`rotate(${round(s.rot)} ${round(s.x)} ${round(s.y)})`}
            fill="currentColor"
            stroke="none"
          />
        ))}
      </g>
    </svg>

    {/* C3 · mCherry · synaptic puncta */}
    <svg {...layerProps} className="scope-layer scope-layer--c3 text-mcherry">
      <defs>
        <Glow id="glow-c3" amount={1.6} />
      </defs>
      <g filter="url(#glow-c3)" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d={IMAGE.punctaBySize[0]} strokeWidth={2.4} strokeOpacity={0.75} />
        <path d={IMAGE.punctaBySize[1]} strokeWidth={3.4} strokeOpacity={0.85} />
        <path d={IMAGE.punctaBySize[2]} strokeWidth={4.6} strokeOpacity={0.95} />
      </g>
    </svg>
  </div>
);

export default Micrograph;
