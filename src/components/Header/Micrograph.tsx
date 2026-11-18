import type { CSSProperties } from 'react';
import {
  AXON_OPACITY,
  AXON_WIDTH,
  BRANCH_OPACITY,
  BRANCH_WIDTH,
  PUNCTA_OPACITY,
  PUNCTA_WIDTH,
  SIZE,
  growCulture,
  type Point,
} from './neuron';

/**
 * A cultured neuron under a confocal microscope, drawn procedurally.
 *
 *   C1 · DAPI    → nuclei
 *   C2 · GFP     → dendrites, axon and somas
 *   C3 · mCherry → synaptic puncta along the dendrites
 *
 * The culture comes from a seeded generator (`neuron.ts`), so the server
 * always renders the same image and this file ships nothing to the client.
 * Each channel is its own <svg>; globals.css blends them additively
 * (`.scope-layer`) and wires up the toggles. With JavaScript and WebGL, the
 * same culture is redrawn live on top of it (`LiveMicrograph`).
 */

const round = (n: number) => Math.round(n * 10) / 10;

/** A path number at 0.1 precision without the leading zero (`-.4`, `.7`). */
const num = (n: number) => String(round(n)).replace(/^(-?)0\./, '$1.');

// Relative steps from the rounded points (`M x y l dx dy dx dy…`): the same
// line as absolute `L x y` per point in about half the characters, which
// matters because the markup ships twice (HTML + RSC payload).
const toPath = (points: Point[]) => {
  const [first, ...rest] = points.map((p) => ({ x: round(p.x), y: round(p.y) }));
  let previous = first;
  const steps = rest.map((p) => {
    const step = `${num(p.x - previous.x)} ${num(p.y - previous.y)}`;
    previous = p;
    return step;
  });
  // A minus sign already separates two numbers.
  return `M${first.x} ${first.y}l${steps.join(' ')}`.replace(/ -/g, '-');
};

const CULTURE = growCulture();

const IMAGE = {
  // One path string per branch order keeps the hero's markup small.
  branches: BRANCH_WIDTH.map((_, order) =>
    CULTURE.branches
      .filter((branch) => branch.order === order)
      .map((branch) => toPath(branch.points))
      .join(''),
  ),
  axons: CULTURE.axons.map((axon) => toPath(axon.points)),
  somas: CULTURE.somas,
  nuclei: CULTURE.nuclei,
  // Each size is a single path of zero-length round-capped strokes, i.e. dots.
  punctaBySize: PUNCTA_WIDTH.map((_, size) =>
    CULTURE.puncta
      .filter((p) => p.size === size)
      .map((p) => `M${round(p.x)} ${round(p.y)}h0`)
      .join(''),
  ),
};

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
export const micrographSvg = (colors: { c1: string; c2: string; c3: string }) => {
  const nuclei = IMAGE.nuclei
    .map(
      (n) =>
        `<ellipse cx="${round(n.x)}" cy="${round(n.y)}" rx="${round(n.rx)}" ry="${round(n.ry)}" transform="rotate(${round(n.rot)} ${round(n.x)} ${round(n.y)})" fill="url(#n)"/>`,
    )
    .join('');
  const branches = IMAGE.branches
    .map((d, order) => `<path d="${d}" stroke-width="${BRANCH_WIDTH[order]}" stroke-opacity="${BRANCH_OPACITY[order]}"/>`)
    .join('');
  const axons = IMAGE.axons.map((d) => `<path d="${d}" stroke-width="${AXON_WIDTH}" stroke-opacity="${AXON_OPACITY}"/>`).join('');
  const somas = IMAGE.somas
    .map(
      (s) =>
        `<ellipse cx="${round(s.x)}" cy="${round(s.y)}" rx="${s.r}" ry="${round(s.r * 0.82)}" transform="rotate(${round(s.rot)} ${round(s.x)} ${round(s.y)})" fill="${colors.c2}" stroke="none"/>`,
    )
    .join('');
  const puncta = IMAGE.punctaBySize
    .map((d, i) => `<path d="${d}" stroke-width="${PUNCTA_WIDTH[i]}" stroke-opacity="${PUNCTA_OPACITY[i]}"/>`)
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

/**
 * The dendrite and puncta channels as standalone SVGs, served from
 * app/micrograph/[layer] and painted as CSS masks over `currentColor`
 * (`.scope-mask`). A single-color layer is exactly its color times its alpha,
 * so the mask draws the same image, while the ~35 KB of path data ships once
 * as a cacheable file instead of twice in the page (HTML + RSC payload).
 */
export const MICROGRAPH_LAYERS = ['dendrites', 'puncta'] as const;

export const micrographLayerSvg = (layer: (typeof MICROGRAPH_LAYERS)[number]) => {
  const glow = (amount: number) =>
    `<filter id="g" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${amount}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  const body =
    layer === 'dendrites'
      ? `<defs><radialGradient id="h"><stop offset="0%" stop-color="#fff" stop-opacity="0.22"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>${glow(2.4)}</defs>` +
        `<circle cx="292" cy="300" r="200" fill="url(#h)"/>` +
        `<g filter="url(#g)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">` +
        IMAGE.branches
          .map((d, order) => `<path d="${d}" stroke-width="${BRANCH_WIDTH[order]}" stroke-opacity="${BRANCH_OPACITY[order]}"/>`)
          .join('') +
        IMAGE.axons.map((d) => `<path d="${d}" stroke-width="${AXON_WIDTH}" stroke-opacity="${AXON_OPACITY}"/>`).join('') +
        `</g>`
      : `<defs>${glow(1.6)}</defs><g filter="url(#g)" fill="none" stroke="#fff" stroke-linecap="round">` +
        IMAGE.punctaBySize
          .map((d, i) => `<path d="${d}" stroke-width="${PUNCTA_WIDTH[i]}" stroke-opacity="${PUNCTA_OPACITY[i]}"/>`)
          .join('') +
        `</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">${body}</svg>`;
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

    {/* C2 · GFP · neurons: the heaviest path data, so it ships once as a
        static mask (/micrograph/dendrites.svg) instead of twice in the page. */}
    <div className="scope-layer scope-layer--c2 scope-mask scope-mask--dendrites text-gfp" aria-hidden="true" />

    {/* C2 · GFP · somas, on their own layer: their calcium flashes then only
        repaint these five cells, not the blurred dendrite tree above. */}
    <svg {...layerProps} className="scope-layer scope-layer--c2 text-gfp">
      <defs>
        <Glow id="glow-soma" amount={2.4} />
      </defs>
      <g filter="url(#glow-soma)">
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

    {/* C3 · mCherry · synaptic puncta, also a static mask. */}
    <div className="scope-layer scope-layer--c3 scope-mask scope-mask--puncta text-mcherry" aria-hidden="true" />
  </div>
);

export default Micrograph;
