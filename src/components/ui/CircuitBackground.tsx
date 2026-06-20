/* ============================================================
   CIRCUIT BACKGROUND
   Generative PCB-style traces drawn behind the whole site.
   Deterministic (fixed seed) so server & client render the
   exact same SVG — no hydration mismatch, no client JS needed.
   ============================================================ */

const VIEW_W = 1600;
const VIEW_H = 1000;
const GRID = 40; // px between routing nodes
const COLS = VIEW_W / GRID; // 40
const ROWS = VIEW_H / GRID; // 25

/** Seeded PRNG (mulberry32) — keeps the layout stable across renders. */
const makeRng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// 8 compass directions (grid steps), clockwise from East.
const DIRS = [
  [1, 0], [1, 1], [0, 1], [-1, 1],
  [-1, 0], [-1, -1], [0, -1], [1, -1],
] as const;

type Hue = 'base' | 'cyan' | 'neon' | 'violet' | 'lime';

const HUE: Record<Hue, string> = {
  base: '150, 140, 210',
  cyan: '53, 230, 255',
  neon: '255, 46, 136',
  violet: '124, 58, 237',
  lime: '198, 255, 74',
};

type Trace = { d: string; hue: Hue; opacity: number; width: number };
type Marker = { x: number; y: number; r: number; hue: Hue; opacity: number; ring: boolean };
type Pulse = { d: string; hue: Hue; dur: number; delay: number; r: number };

/** Build the whole circuit field once, deterministically. */
const buildField = () => {
  const rng = makeRng(0x5eed_1337);
  const ri = (n: number) => Math.floor(rng() * n);
  const pick = <T,>(arr: readonly T[]) => arr[ri(arr.length)];

  const traces: Trace[] = [];
  const markers: Marker[] = [];
  const pulses: Pulse[] = [];

  // Most traces are quiet "base" indigo; accent colours appear sparingly.
  const hueBag: Hue[] = [
    'base', 'base', 'base', 'base', 'base', 'base',
    'cyan', 'cyan', 'violet', 'violet', 'neon',
  ];

  const TRACE_COUNT = 76;

  for (let i = 0; i < TRACE_COUNT; i++) {
    let gx = 1 + ri(COLS - 2);
    let gy = 1 + ri(ROWS - 2);
    let dir = ri(8);

    const pts: Array<[number, number]> = [[gx, gy]];
    const segments = 2 + ri(4); // 2–5 elbows

    for (let s = 0; s < segments; s++) {
      const [dx, dy] = DIRS[dir];
      // How far we can travel before hitting the canvas edge.
      const budget = Math.min(
        dx > 0 ? COLS - 2 - gx : dx < 0 ? gx - 1 : 99,
        dy > 0 ? ROWS - 2 - gy : dy < 0 ? gy - 1 : 99,
      );
      const len = Math.min(2 + ri(6), budget);
      if (len < 1) break;

      gx += dx * len;
      gy += dy * len;
      pts.push([gx, gy]);

      // Prefer gentle 45°/90° turns over sharp reversals — reads as PCB routing.
      dir = (dir + pick([-2, -1, 0, 1, 2]) + 8) % 8;
    }

    if (pts.length < 2) continue;

    const hue = pick(hueBag);
    const accent = hue !== 'base';
    const d = pts
      .map(([x, y], j) => `${j ? 'L' : 'M'}${x * GRID} ${y * GRID}`)
      .join(' ');

    traces.push({
      d,
      hue,
      opacity: accent ? 0.1 + rng() * 0.07 : 0.05 + rng() * 0.05,
      width: rng() < 0.25 ? 1.5 : 1,
    });

    // Endpoints get a solder pad; starts sometimes get a via ring.
    const [sx, sy] = pts[0];
    const [ex, ey] = pts[pts.length - 1];
    markers.push({ x: ex * GRID, y: ey * GRID, r: 2.2, hue, opacity: accent ? 0.4 : 0.22, ring: false });
    if (rng() < 0.55) {
      markers.push({ x: sx * GRID, y: sy * GRID, r: 3.2, hue, opacity: accent ? 0.35 : 0.2, ring: true });
    }
    // Tiny junction dots on the elbows.
    for (let j = 1; j < pts.length - 1; j++) {
      if (rng() < 0.22) {
        markers.push({ x: pts[j][0] * GRID, y: pts[j][1] * GRID, r: 1.3, hue, opacity: 0.3, ring: false });
      }
    }

    // A handful of longer accent traces carry a travelling data pulse.
    if (accent && pts.length >= 3 && pulses.length < 7) {
      pulses.push({
        d,
        hue,
        dur: 7 + rng() * 6,
        delay: -rng() * 12,
        r: hue === 'neon' ? 2.6 : 2.2,
      });
    }
  }

  // A few focal "hub" vias — concentric rings that anchor the composition.
  for (let i = 0; i < 9; i++) {
    const x = (2 + ri(COLS - 4)) * GRID;
    const y = (2 + ri(ROWS - 4)) * GRID;
    const hue = pick(['cyan', 'violet', 'neon'] as const);
    markers.push({ x, y, r: 5.5, hue, opacity: 0.16, ring: true });
    markers.push({ x, y, r: 2, hue, opacity: 0.3, ring: false });
  }

  return { traces, markers, pulses };
};

const FIELD = buildField();

/**
 * Full-bleed generative circuit field. Sits behind all content, fades at the
 * edges via a CSS mask, and stays subtle on the deep-ink background.
 *
 * Rendered as two layers for mobile scroll performance:
 *  - A STATIC svg (traces, soft glow, vias) — rasterised once, never repaints
 *    while scrolling.
 *  - A separate PULSES svg holding only the animated dots, so their per-frame
 *    motion never re-rasterises the big masked field underneath.
 */
const CircuitBackground = () => (
  <>
    <svg
      className="circuit-bg"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soft glow under the pulse traces — a wide, faint static stroke that
          fakes a bloom without the cost of an SVG blur filter. */}
      <g fill="none" strokeLinecap="round">
        {FIELD.pulses.map((p, i) => (
          <path key={i} d={p.d} stroke={`rgba(${HUE[p.hue]}, 0.08)`} strokeWidth={5} />
        ))}
      </g>

      {/* Traces */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {FIELD.traces.map((t, i) => (
          <path
            key={i}
            d={t.d}
            stroke={`rgba(${HUE[t.hue]}, ${t.opacity})`}
            strokeWidth={t.width}
          />
        ))}
      </g>

      {/* Vias, pads & junction dots */}
      <g>
        {FIELD.markers.map((m, i) =>
          m.ring ? (
            <circle
              key={i}
              cx={m.x}
              cy={m.y}
              r={m.r}
              fill="none"
              stroke={`rgba(${HUE[m.hue]}, ${m.opacity})`}
              strokeWidth={1}
            />
          ) : (
            <circle key={i} cx={m.x} cy={m.y} r={m.r} fill={`rgba(${HUE[m.hue]}, ${m.opacity})`} />
          ),
        )}
      </g>
    </svg>

    {/* Travelling data pulses — isolated layer, paused during scroll via CSS. */}
    <svg
      className="circuit-bg circuit-bg--pulses"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {FIELD.pulses.map((p, i) => (
        <circle
          key={i}
          r={p.r}
          className="circuit-pulse"
          fill={`rgb(${HUE[p.hue]})`}
          style={{
            offsetPath: `path('${p.d}')`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </svg>
  </>
);

export default CircuitBackground;
