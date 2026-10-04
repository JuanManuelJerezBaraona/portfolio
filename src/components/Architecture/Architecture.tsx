import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getArchitecture } from '@/constants/data';
import type { ArchitectureLayer } from '@/types';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/** Full class names, so Tailwind sees them. */
const CHANNEL: Record<ArchitectureLayer['channel'], string> = {
  dapi: 'text-dapi',
  gfp: 'text-gfp',
  yfp: 'text-yfp',
  text: 'text-text',
};

/*
 * The hexagon is drawn in its own coordinates and never wider than 22rem,
 * so its labels stay at reading size on every screen. Flat-top hexagons:
 * the two bottom corners sit at 25% and 75% of the width, right above the
 * two outbound nodes. Each outer node names the adapter that reaches it.
 */
const W = 290;
const H = 276;
const CX = 145;
const CY = 127;
const RINGS = [145, 103, 63];
const SIN60 = Math.sqrt(3) / 2;

const round = (n: number) => Math.round(n * 10) / 10;

const hexagon = (r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return `${round(CX + r * Math.cos(angle))},${round(CY + r * Math.sin(angle))}`;
  }).join(' ');

/** Vertical position halfway through the band between two rings, above or below the center. */
const band = (outer: number, inner: number, side: -1 | 1) => CY + side * ((outer + inner) / 2) * SIN60;

interface NodeProps {
  channel: ArchitectureLayer['channel'];
  label: string;
  /** The adapter on the hexagon's edge that this node talks to. */
  adapter: string;
  /** Adapter under the label instead of beside it, for the narrow bottom nodes. */
  stacked?: boolean;
}

const Node = ({ channel, label, adapter, stacked = false }: NodeProps) => (
  <div
    className={`flex border border-line bg-void px-3.5 py-2.5 ${
      stacked ? 'flex-col gap-1' : 'items-center justify-between gap-3'
    }`}
  >
    <span className="flex items-center gap-2.5 text-[0.95rem] font-medium">
      <span className={`swatch ${CHANNEL[channel]}`} aria-hidden="true" />
      {label}
    </span>
    <span className="meta text-muted">{adapter}</span>
  </div>
);

const Connector = () => <span className="mx-auto block h-7 w-px bg-line-strong" aria-hidden="true" />;

const Hexagon = () => {
  const t = useTranslations('Architecture');
  const [outer, middle, inner] = RINGS;
  const bottom = round(CY + outer * SIN60);

  return (
    <figure className="border border-line bg-stage">
      <figcaption className="meta border-b border-line px-4 py-2.5 text-muted">{t('figure')}</figcaption>

      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[22rem]">
          <Node channel="dapi" label="Next.js · React" adapter={t('endpoint')} />
          <Connector />

          <svg viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible text-gfp" role="img" aria-label={t('figure')}>
            {RINGS.map((r, i) => (
              <polygon
                key={r}
                points={hexagon(r)}
                fill="currentColor"
                fillOpacity={[0.04, 0.07, 0.13][i]}
                stroke="currentColor"
                strokeOpacity={[0.5, 0.7, 0.95][i]}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {[CX - outer / 2, CX + outer / 2].map((x) => (
              <line key={x} x1={x} y1={bottom} x2={x} y2={H} stroke="var(--line-strong)" vectorEffect="non-scaling-stroke" />
            ))}

            <g textAnchor="middle">
              <text x={CX} y={band(outer, middle, -1) - 3} className="fill-text text-[12px] font-semibold">
                {t('infrastructure')}
              </text>
              <text x={CX} y={band(outer, middle, -1) + 11} className="meta fill-muted text-[8.5px]">
                {t('infrastructureNote')}
              </text>

              <text x={CX} y={band(middle, inner, -1) - 3} className="fill-text text-[12px] font-semibold">
                {t('application')}
              </text>
              <text x={CX} y={band(middle, inner, -1) + 11} className="meta fill-muted text-[8.5px]">
                {t('applicationNote')}
              </text>

              <text x={CX} y={CY - 2} className="fill-text text-[13px] font-semibold">
                {t('domain')}
              </text>
              <text x={CX} y={CY + 13} className="meta fill-muted text-[8.5px]">
                {t('domainNote')}
              </text>
            </g>
          </svg>

          <div className="grid grid-cols-2 gap-3">
            <Node channel="yfp" label="MongoDB" adapter={t('repository')} stacked />
            <Node channel="text" label={t('otherApis')} adapter={t('httpService')} stacked />
          </div>
        </div>
      </div>

      <p className="meta border-t border-line px-4 py-3 leading-relaxed text-muted">{t('rule')}</p>
    </figure>
  );
};

const Architecture = () => {
  const t = useTranslations('Architecture');
  const layers = getArchitecture(useLocale());

  return (
    <section
      id="arquitectura"
      className="sec-arquitectura border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="arquitectura-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            id="arquitectura-heading"
            eyebrow={t('eyebrow')}
            title={t.rich('title', { hl: (chunks) => <em className="hl">{chunks}</em> })}
          >
            <p>{t('body')}</p>
          </SectionHeading>

          <Reveal delay={120} className="mt-12">
            <Hexagon />
            <Link href="#ia" className="meta link-underline mt-4 inline-block text-muted hover:text-text">
              {t('skill')} →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ol className="border-t border-line" aria-label={t('layers')}>
            {layers.map((layer) => (
              <li key={layer.id} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <h3 className="flex items-center gap-2.5 text-xl">
                  <span className={`swatch ${CHANNEL[layer.channel]}`} aria-hidden="true" />
                  {layer.name}
                </h3>
                <div>
                  <p className="leading-relaxed text-muted">{layer.role}</p>
                  <p className="meta mt-3 text-accent">{layer.tools.join(' · ')}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default Architecture;
