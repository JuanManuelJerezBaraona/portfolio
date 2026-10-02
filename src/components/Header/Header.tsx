import type { CSSProperties } from 'react';
import Link from 'next/link';
import { PERSONAL_INFO } from '@/constants/data';
import Micrograph from './Micrograph';

const CHANNELS = [
  { id: 'ch-c1', label: 'Frontend', color: 'text-dapi', code: 'C1' },
  { id: 'ch-c2', label: 'Backend', color: 'text-gfp', code: 'C2' },
  { id: 'ch-c3', label: 'IA', color: 'text-mcherry', code: 'C3' },
];

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

const Header = () => {
  return (
    <header id="home" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <p className="rise meta text-muted">
            {PERSONAL_INFO.title} · {PERSONAL_INFO.location}
          </p>

          <h1 className="rise display mt-6 text-[2.75rem] sm:text-6xl lg:text-[5.4rem]" style={delay(80)}>
            Pasé del microscopio al código.
          </h1>

          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style={delay(160)}
          >
            Soy <span className="text-text">{PERSONAL_INFO.shortName}</span>. Estudié Ingeniería en
            Biotecnología y trabajé en un laboratorio de neurobiología antes de dedicarme al
            software. Hoy desarrollo los flujos de cotización, pago y postventa de{' '}
            <span className="text-text">Seguros Falabella</span> con React, Next.js y NestJS, y
            trabajo a diario con agentes de IA.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={delay(240)}>
            <Link href="#projects" className="btn btn-primary">
              Ver proyectos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="square" d="M12 5v14m0 0 6-6m-6 6-6-6" />
              </svg>
            </Link>
            <a href={PERSONAL_INFO.cv} download className="btn btn-ghost">
              Descargar CV
              <span className="meta text-muted">PDF</span>
            </a>
          </div>

          <dl
            className="rise mt-12 grid max-w-xl grid-cols-3 border-t border-line pt-5"
            style={delay(320)}
          >
            <div>
              <dt className="meta text-muted">Full-stack desde</dt>
              <dd className="mt-1 font-medium">{PERSONAL_INFO.fullStackSince}</dd>
            </div>
            <div>
              <dt className="meta text-muted">En producción</dt>
              <dd className="mt-1 font-medium">CL · PE · CO</dd>
            </div>
            <div>
              <dt className="meta text-muted">Perfil</dt>
              <dd className="mt-1 font-medium">
                <Link href="#ia" className="sec-ia link-underline text-accent">
                  IA-ready
                </Link>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="scope-rig mx-auto w-full max-w-[30rem]">
          <div className="scope">
            <Micrograph />
            <div className="scope-reticle" aria-hidden="true" />
            <div
              className="absolute bottom-[17%] right-[19%] z-[4] flex flex-col items-end gap-1"
              aria-hidden="true"
            >
              <span className="h-[3px] w-14 bg-text/85" />
              <span className="meta text-[0.62rem] text-text/80">20 µm</span>
            </div>
          </div>

          <figcaption className="mt-8">
            <fieldset>
              <legend className="meta text-muted">
                Neurona en cultivo, tres canales. Apaga uno para ver cada capa.
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {CHANNELS.map((channel) => (
                  <label key={channel.id} htmlFor={channel.id} className="channel">
                    <input id={channel.id} type="checkbox" defaultChecked />
                    <span className={`swatch ${channel.color}`} aria-hidden="true" />
                    <span className="meta text-muted">{channel.code}</span>
                    <span className="text-sm font-medium">{channel.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </figcaption>
        </figure>
      </div>
    </header>
  );
};

export default Header;
