import type { CSSProperties } from 'react';
import { MAIN_NEURON, SEED } from '@/components/Header/Micrograph';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { sequence, type Base } from './sequence';

const SOURCE = 'src/components/Header/Micrograph.tsx';
const READ = sequence(SOURCE, 'grow');

const LEGEND: { base: Base; label: string }[] = [
  { base: 'A', label: 'palabra clave' },
  { base: 'C', label: 'variable' },
  { base: 'G', label: 'número' },
  { base: 'T', label: 'llamada' },
];

const ORDERS = [0, 1, 2, 3];

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/** The hero's main neuron, cropped, growing one recursion level at a time. */
const Growth = () => {
  const { x, y, soma } = MAIN_NEURON;
  const half = 175;
  return (
    <figure className="seq-growth">
      <div className="dish">
        <svg
          viewBox={`${x - half} ${y - half} ${half * 2} ${half * 2}`}
          className="dish-neuron text-gfp"
          aria-hidden="true"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {MAIN_NEURON.segments.map((segment, i) => (
              <path
                key={i}
                d={segment.d}
                pathLength={1}
                className="grow-seg"
                strokeWidth={MAIN_NEURON.branchWidth[segment.order]}
                style={vars({ '--o': segment.order })}
              />
            ))}
          </g>
          <circle className="grow-soma" cx={x} cy={y} r={soma} fill="currentColor" />
        </svg>
      </div>
      <figcaption className="mt-5">
        <div className="flex items-center gap-3">
          <span className="meta text-muted">Orden</span>
          <ol className="flex flex-1 gap-1.5" aria-label="Órdenes de ramificación">
            {ORDERS.map((order) => (
              <li key={order} className="order-chip meta" style={vars({ '--o': order })}>
                {order}
              </li>
            ))}
          </ol>
        </div>
        <p className="meta mt-3 leading-relaxed text-muted">
          Cada orden es un nivel de la recursión: la misma neurona del inicio, creciendo.
        </p>
      </figcaption>
    </figure>
  );
};

const CodeLab = () => {
  return (
    <section
      id="codigo"
      className="border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="codigo-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="codigo-heading"
          eyebrow="Biología × código"
          tone="text-gfp"
          title="La neurona del inicio es código."
        >
          <p>
            No es una imagen. Es una función recursiva: cada dendrita avanza unos pasos, se divide
            en dos y la función se vuelve a llamar con una rama más corta. Abajo está ese código,
            el mismo que corre en este sitio, leído como un secuenciador lee ADN.
          </p>
        </SectionHeading>

        <Reveal className="mt-14" amount={0.15}>
          <div className="seq">
            <div className="seq-head meta">
              <span>
                <span className="text-text">grow()</span> · {SOURCE.split('/').pop()}
              </span>
              <span className="hidden sm:inline">
                Lectura 01 · {READ.length} bases · semilla {SEED}
              </span>
            </div>

            <p className="seq-bases meta" aria-hidden="true">
              {READ.bases.map((base, i) => (
                <span key={i} className={`b-${base}`} style={vars({ '--i': i })}>
                  {base}
                </span>
              ))}
            </p>

            <div className="seq-body">
              <div className="seq-code" tabIndex={0} role="region" aria-label="Código de la función grow">
                <pre>
                  <code>
                    {READ.lines.map((line) => (
                      <span key={line.number} className="seq-line" style={vars({ '--start': line.start })}>
                        <span className="seq-ln" aria-hidden="true">
                          {line.number}
                        </span>
                        {line.tokens.length === 0
                          ? ' '
                          : line.tokens.map((token, i) => {
                              if (token.kind === 'space') return token.text;
                              if (token.kind === 'base') {
                                return (
                                  <span
                                    key={i}
                                    className={`tok b-${token.base}`}
                                    style={vars({ '--i': token.index!, '--h': token.height! })}
                                  >
                                    {token.text}
                                  </span>
                                );
                              }
                              return (
                                <span key={i} className={token.kind === 'comment' ? 'tok-comment' : 'tok-punct'}>
                                  {token.text}
                                </span>
                              );
                            })}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>

              <Growth />
            </div>

            <div className="seq-foot">
              <ul className="meta flex flex-wrap gap-x-5 gap-y-2" aria-label="Bases de la lectura">
                {LEGEND.map((item) => (
                  <li key={item.base} className="flex items-center gap-2">
                    <span className={`b-${item.base} font-semibold`}>{item.base}</span>
                    <span className="text-muted">{item.label}</span>
                  </li>
                ))}
              </ul>
              {/* Kept next to its label: focusing it must not scroll the page. */}
              <input id="seq-replay" type="checkbox" className="seq-replay-input" aria-label="Secuenciar de nuevo" />
              <label htmlFor="seq-replay" className="seq-replay btn btn-ghost">
                Secuenciar de nuevo
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="square" d="M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5" />
                </svg>
              </label>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CodeLab;
