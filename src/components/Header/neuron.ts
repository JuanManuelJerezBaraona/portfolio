/**
 * The culture behind the hero micrograph: five neurons grown procedurally,
 * with their nuclei, the glia around them and their synaptic puncta.
 *
 * Shared by the two renderers of the same image: `Micrograph.tsx` draws it on
 * the server as SVG, and `liveScope.ts` draws it in the browser as a WebGL
 * z-stack. The generator is seeded, so both get the same culture, point for
 * point, and the second can take over from the first without a jump.
 *
 * The order of the `random()` calls is the image: adding, removing or
 * reordering one changes every neuron. Anything a renderer needs beyond the
 * drawing (which neuron a branch belongs to, how far along it a point sits)
 * is derived here without drawing from the generator.
 */

export const SIZE = 600;

/** Width (and brightness) per branch order: primary dendrites are thickest. */
export const BRANCH_WIDTH = [3.4, 2.1, 1.3, 0.8];
export const BRANCH_OPACITY = [0.95, 0.85, 0.7, 0.55];
export const AXON_WIDTH = 0.9;
export const AXON_OPACITY = 0.6;

/** Puncta come in three sizes. */
export const PUNCTA_WIDTH = [2.4, 3.4, 4.6];
export const PUNCTA_OPACITY = [0.75, 0.85, 0.95];

/** Fixed seed: the neuron grows the same way on every visit. */
const SEED = 20131126;

/** Small, fast, seedable PRNG (mulberry32). */
export const createRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export interface Point {
  x: number;
  y: number;
}

export interface Branch {
  /** Index of its neuron in `somas`. */
  neuron: number;
  /** Branch order: 0 for primary dendrites, +1 per fork. */
  order: number;
  /** Index of the branch it forks from; -1 for a primary dendrite. */
  parent: number;
  /** Path length from the soma to this branch's first point. */
  start: number;
  /** Path length of the branch itself. */
  length: number;
  points: Point[];
}

export interface Axon {
  neuron: number;
  points: Point[];
}

export interface Soma extends Point {
  r: number;
  rot: number;
}

export interface Nucleus extends Point {
  rx: number;
  ry: number;
  rot: number;
}

export interface Punctum extends Point {
  /** 0–2, an index into PUNCTA_WIDTH. */
  size: number;
  /** The branch it sits on, and the point along it; -1 for background puncta. */
  branch: number;
  at: number;
}

export interface Culture {
  branches: Branch[];
  axons: Axon[];
  somas: Soma[];
  /** The first `somas.length` are the neurons' own nuclei; the rest are glia. */
  nuclei: Nucleus[];
  puncta: Punctum[];
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

export const pathLength = (points: Point[]) => {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
};

export const growCulture = (): Culture => {
  const random = createRandom(SEED);
  const range = (min: number, max: number) => min + random() * (max - min);

  const branches: Branch[] = [];
  const axons: Axon[] = [];
  const somas: Soma[] = [];
  const puncta: Punctum[] = [];

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

  const grow = (
    neuron: number,
    parent: number,
    start: Point,
    angle: number,
    length: number,
    order: number,
    maxOrder: number,
  ) => {
    const { points, heading } = walk(start, angle, length, 5, 0.28);
    const index = branches.length;
    const from = parent < 0 ? 0 : branches[parent].start + branches[parent].length;
    branches.push({ neuron, order, parent, start: from, length: pathLength(points), points });

    // Synapses sit along the dendrite, slightly off the shaft.
    points.slice(1).forEach((p, i) => {
      if (random() < 0.55 + order * 0.1) {
        puncta.push({ x: p.x + range(-3, 3), y: p.y + range(-3, 3), size: 0, branch: index, at: i + 1 });
      }
    });

    if (order >= maxOrder) return;
    const tip = points[points.length - 1];
    const spread = range(0.35, 0.7);
    grow(neuron, index, tip, heading - spread, length * range(0.6, 0.8), order + 1, maxOrder);
    if (random() < 0.85) {
      grow(neuron, index, tip, heading + spread, length * range(0.6, 0.8), order + 1, maxOrder);
    }
  };

  NEURONS.forEach((spec, neuron) => {
    const offset = random() * Math.PI * 2;
    for (let i = 0; i < spec.dendrites; i += 1) {
      const angle = offset + (i / spec.dendrites) * Math.PI * 2 + range(-0.3, 0.3);
      const start = {
        x: spec.x + Math.cos(angle) * spec.soma * 0.7,
        y: spec.y + Math.sin(angle) * spec.soma * 0.7,
      };
      grow(neuron, -1, start, angle, spec.reach * range(0.8, 1.25), 0, spec.depth);
    }

    if (spec.axon) {
      const { points } = walk(
        { x: spec.x, y: spec.y },
        offset + range(0, Math.PI * 2),
        spec.axon,
        28,
        0.16,
      );
      axons.push({ neuron, points });
    }

    somas.push({ x: spec.x, y: spec.y, r: spec.soma, rot: range(-40, 40) });
  });

  // Glia and out-of-plane cells: nuclei with no visible processes.
  const nuclei: Nucleus[] = somas.map((s) => ({ x: s.x, y: s.y, rx: s.r * 0.78, ry: s.r * 0.66, rot: s.rot }));
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
    puncta.push({ x: range(0, SIZE), y: range(0, SIZE), size: 0, branch: -1, at: 0 });
  }

  for (const p of puncta) {
    p.size = Math.floor(random() * 3);
  }

  return { branches, axons, somas, nuclei, puncta };
};
