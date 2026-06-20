import { PROJECTS, groupTechStack } from '@/constants/data';
import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Corners, Deploy, StatusDot } from '@/components/ui/Hud';
import Reveal from '@/components/ui/Reveal';

interface CaseFileProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

const CaseFile = ({ project, prev, next }: CaseFileProps) => {
  const stage = String(project.stage).padStart(2, '0');
  const stackGroups = groupTechStack(project.techStack);
  const hasMobileShot = Boolean(project.screenshots?.mobile);

  return (
    <article className="px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-5xl">
        {/* back + funnel position */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-cyan"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6-6m-6 6 6 6" />
            </svg>
            Volver al sistema
          </Link>

          <ol className="flex items-center gap-1.5" aria-label="Posición en el funnel">
            {PROJECTS.map((node) => {
              const isCurrent = node.id === project.id;
              return (
                <li key={node.id}>
                  <Link
                    href={`/proyectos/${node.id}`}
                    aria-label={`${node.flow} (etapa ${node.stage})`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-7 bg-linear-to-r from-neon to-cyan'
                        : 'w-3 bg-line hover:bg-muted'
                    }`}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* hero */}
        <header className="mt-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-grad font-display text-2xl font-bold leading-none">{stage}</span>
            <span className="label rounded-[5px] border border-line px-2 py-1 text-cyan">
              {project.flow}
            </span>
            <StatusDot status={project.status} />
            <span className="label text-muted">Seguros Falabella</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.02] text-text sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 font-mono text-sm text-neon-soft">{project.role}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-neon/50 bg-neon/10 px-5 py-3 font-mono text-sm tracking-wide text-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-neon/20 hover:shadow-[0_14px_44px_-14px_rgba(255,46,136,0.8)]"
              >
                Visitar sitio
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7m0 0H8m9 0v9" />
                </svg>
              </a>
            )}
            <Deploy countries={project.countries} className="gap-1.5" />
          </div>
        </header>

        {/* highlights */}
        <dl className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
          {project.highlights.map((highlight, index) => (
            <Reveal
              key={highlight.label}
              className="hud scanlines relative overflow-hidden p-4 text-center sm:p-5"
              delay={index * 90}
            >
              <Corners tone="cyan" />
              <dd className="text-grad font-display text-3xl font-bold sm:text-4xl">{highlight.value}</dd>
              <dt className="label mt-2 text-muted">{highlight.label}</dt>
            </Reveal>
          ))}
        </dl>

        {/* desktop screenshot · browser frame */}
        {project.screenshots?.desktop && (
          <Reveal as="figure" className="hud mt-12 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-neon/70" />
              <span className="h-3 w-3 rounded-full bg-lime/70" />
              <span className="h-3 w-3 rounded-full bg-cyan/70" />
              <span className="ml-3 hidden flex-1 truncate rounded-md border border-line bg-ink/60 px-3 py-1 font-mono text-xs text-muted sm:block">
                {project.url ? project.url.replace(/^https?:\/\//, '') : 'acceso-interno · seguros falabella'}
              </span>
            </div>
            <Image
              src={project.screenshots.desktop}
              alt={`Vista desktop de ${project.title}`}
              width={2530}
              height={1140}
              className="w-full"
              priority
            />
          </Reveal>
        )}

        {/* narrative + aside */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-12">
            <Reveal as="section">
              <h2 className="label text-neon">// El reto</h2>
              <p className="mt-4 text-lg leading-relaxed text-text/90">{project.challenge}</p>
            </Reveal>

            <Reveal as="section">
              <h2 className="label text-neon">// Lo que construí</h2>
              <ul className="mt-5 space-y-3">
                {project.contributions.map((item, index) => (
                  <li key={item} className="hud flex items-start gap-4 p-4">
                    <span className="label flex-none rounded-[5px] border border-line px-2 py-1.5 text-cyan">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {hasMobileShot && (
              <Reveal as="section">
                <h2 className="label text-neon">// En el bolsillo</h2>
                <figure className="mt-5 mx-auto w-[248px]">
                  <div className="hud relative rounded-[2rem] p-2.5">
                    <span aria-hidden className="absolute left-1/2 top-3 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-line" />
                    <Image
                      src={project.screenshots!.mobile}
                      alt={`Vista móvil de ${project.title}`}
                      width={659}
                      height={1024}
                      className="w-full rounded-[1.5rem] border border-line"
                      loading="lazy"
                    />
                  </div>
                </figure>
              </Reveal>
            )}
          </div>

          {/* aside · the spec sheet */}
          <Reveal as="aside" className="lg:sticky lg:top-28 lg:self-start">
            <div className="hud scanlines relative overflow-hidden p-6">
              <Corners tone="neon" />
              <p className="label text-muted">Ficha técnica</p>

              <dl className="mt-5 space-y-4 border-b border-line pb-5">
                <div className="flex items-center justify-between gap-4">
                  <dt className="label text-muted">Etapa</dt>
                  <dd className="font-mono text-sm text-text">{stage} / 05 · {project.flow}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="label text-muted">Estado</dt>
                  <dd><StatusDot status={project.status} /></dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="label text-muted">Despliegue</dt>
                  <dd><Deploy countries={project.countries} /></dd>
                </div>
              </dl>

              <div className="mt-5 space-y-5">
                {stackGroups.map((group) => (
                  <div key={group.label}>
                    <p className="label text-muted">{group.label}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-text"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* prev / next */}
        <nav className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2" aria-label="Navegación del funnel">
          {prev ? (
            <Link href={`/proyectos/${prev.id}`} className="hud hud-hover group flex items-center gap-4 p-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 flex-none text-muted transition-colors group-hover:text-cyan" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6-6m-6 6 6 6" />
              </svg>
              <span className="min-w-0">
                <span className="label text-muted">Etapa anterior · {String(prev.stage).padStart(2, '0')}</span>
                <span className="mt-1 block truncate font-display font-bold text-text">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}

          {next ? (
            <Link href={`/proyectos/${next.id}`} className="hud hud-hover group flex items-center justify-end gap-4 p-5 text-right">
              <span className="min-w-0">
                <span className="label text-muted">Siguiente etapa · {String(next.stage).padStart(2, '0')}</span>
                <span className="mt-1 block truncate font-display font-bold text-text">{next.title}</span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 flex-none text-muted transition-colors group-hover:text-neon" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
              </svg>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </nav>
      </div>
    </article>
  );
};

export default CaseFile;
