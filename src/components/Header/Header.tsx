import type { CSSProperties } from 'react';
import { PERSONAL_INFO } from '@/constants/data';
import Image from 'next/image';
import Link from 'next/link';
import { Corners, StatusDot } from '@/components/ui/Hud';

const TELEMETRY = [
  { k: 'Despliegue', v: 'CL · PE · CO' },
  { k: 'Flujos', v: '05 en vivo' },
  { k: 'Stack', v: '16 tecnologías' },
  { k: 'Experiencia', v: '2+ años' },
];

const FUNNEL = ['COT', 'ACE', 'PAG', 'ACC', 'POS'];

const Header = () => {
  return (
    <header
      id="home"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* LEFT · thesis */}
        <div>
          <div className="rise flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <span className="dot dot-live" />
              <span className="label text-lime">Disponible</span>
            </span>
            <span className="label text-muted">Santiago · CL</span>
            <span className="label text-muted">Full-Stack Developer</span>
          </div>

          <h1
            className="rise mt-7 text-[2.7rem] font-bold leading-[0.97] sm:text-6xl lg:text-[4.6rem]"
            style={{ '--rise-delay': '90ms' } as CSSProperties}
          >
            <span className="block text-text">Construyo el</span>
            <span className="block text-grad">funnel completo.</span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ '--rise-delay': '180ms' } as CSSProperties}
          >
            Soy Juanma, desarrollador full-stack. Construí buena parte del flujo de seguros de
            Falabella —cotizar, aceptar, pagar y resolver postventa, de la primera pantalla al
            último endpoint—.{' '}
            <span className="text-text">Todo en producción para Chile, Perú y Colombia.</span>
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ '--rise-delay': '270ms' } as CSSProperties}
          >
            <Link
              href="#projects"
              className="sheen group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-neon/50 bg-neon/10 px-6 py-3.5 font-mono text-sm font-medium tracking-wide text-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-neon/20 hover:shadow-[0_14px_44px_-14px_rgba(255,46,136,0.8)]"
            >
              Ver el sistema
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />
              </svg>
            </Link>
            <a
              href="/CV-Juan-Manuel-Jerez-Baraona.pdf"
              download="CV-Juan-Manuel-Jerez-Baraona.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.02] px-6 py-3.5 font-mono text-sm font-medium tracking-wide text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-text"
              aria-label="Descargar Currículum Vitae en PDF"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14" />
              </svg>
              Descargar CV
            </a>
          </div>
        </div>

        {/* RIGHT · operator HUD */}
        <div className="rise" style={{ animationDelay: '360ms' }}>
          <div className="hud scanlines boot-sweep relative overflow-hidden p-5 sm:p-6">
            <Corners tone="neon" />

            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="label text-muted">SYS://operador</span>
              <StatusDot status="live" />
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="relative h-24 w-24 flex-none overflow-hidden rounded-xl border border-line sm:h-28 sm:w-28">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={`Foto de ${PERSONAL_INFO.name}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neon/30"
                />
              </div>
              <div className="min-w-0">
                <p className="label text-cyan">ID · JJB-001</p>
                <p className="mt-2 font-display text-lg font-bold leading-tight text-text">
                  Juan Manuel
                  <br />
                  Jerez Baraona
                </p>
                <p className="mt-1.5 text-sm text-muted">Full-Stack Developer</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {TELEMETRY.map((row) => (
                <div key={row.k} className="bg-ink-2/85 px-3.5 py-3">
                  <dt className="label text-muted">{row.k}</dt>
                  <dd className="mt-1.5 font-mono text-sm text-text">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="label text-muted">Funnel</span>
                <span className="label text-cyan/80">05 etapas</span>
              </div>
              <div className="relative mt-3 flex items-center justify-between gap-1.5">
                <span
                  aria-hidden
                  className="spine-x absolute inset-x-2 top-1/2 h-px -translate-y-1/2"
                />
                {FUNNEL.map((stage) => (
                  <span
                    key={stage}
                    className="relative z-10 flex-1 rounded-md border border-line bg-ink/80 py-1.5 text-center font-mono text-[0.62rem] tracking-wide text-muted"
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
