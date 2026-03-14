'use client';

import { PROJECTS } from '@/constants/data';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const TECH_ICON_MAP: Record<string, string> = {
  TypeScript: '/icons/typescript.svg',
  JavaScript: '/icons/javascript.svg',
  React: '/icons/react.svg',
  'Next.js': '/icons/nextjs.svg',
  NestJS: '/icons/nestjs.svg',
  'Bootstrap 5': '/icons/bootstrap.svg',
  'Tailwind CSS': '/icons/tailwindcss.svg',
  MongoDB: '/icons/mongodb.svg',
  Figma: '/icons/figma.svg',
  Storybook: '/icons/storybook.svg',
  Zustand: '/icons/zustand.svg',
  Strapi: '/icons/strapi.svg',
  'Strapi 5': '/icons/strapi.svg',
};

const DEFAULT_FILTER = 'Todos';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState(DEFAULT_FILTER);

  const availableFilters = useMemo(
    () => [
      DEFAULT_FILTER,
      ...Array.from(new Set(PROJECTS.flatMap((project) => project.filters))),
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === DEFAULT_FILTER) {
      return PROJECTS;
    }

    return PROJECTS.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl">
        <h2 id="projects-heading" className="text-center text-3xl font-bold text-white sm:text-4xl">
          Proyectos destacados
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
          Una muestra de productos diseñados para destacar visualmente y cumplir objetivos reales de negocio.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {availableFilters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-300/60 bg-cyan-400/15 text-white shadow-[0_0_24px_rgba(34,211,238,0.18)]'
                    : 'border-indigo-300/20 bg-slate-900/55 text-slate-300 hover:border-cyan-300/40 hover:text-white'
                }`}
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => {
            const projectHref = project.url ?? '#contact';
            const isExternalProject = Boolean(project.url?.startsWith('http'));

            return (
            <article
              key={project.id}
              className="group rounded-3xl border border-indigo-300/20 bg-slate-950/65 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_14px_40px_rgba(14,165,233,0.2)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{project.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

              {project.screenshots && (
                <div className="mt-5 rounded-2xl border border-indigo-200/20 bg-slate-900/60 p-3">
                  <div className="hidden overflow-hidden rounded-xl border border-slate-500/25 md:block">
                    <Image
                      src={project.screenshots.desktop}
                      alt={`Vista desktop de ${project.title}`}
                      width={1366}
                      height={768}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-500/25 md:hidden">
                    <Image
                      src={project.screenshots.mobile}
                      alt={`Vista mobile de ${project.title}`}
                      width={390}
                      height={844}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => {
                  const techIcon = TECH_ICON_MAP[tech];

                  return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-500/30 bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {techIcon && (
                      <Image
                        src={techIcon}
                        alt={`Icono de ${tech}`}
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5"
                      />
                    )}
                    {tech}
                  </span>
                  );
                })}
              </div>

              <Link
                href={projectHref}
                target={isExternalProject ? '_blank' : undefined}
                rel={isExternalProject ? 'noopener noreferrer' : undefined}
                className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-100 transition-colors group-hover:text-white"
                aria-label={
                  isExternalProject
                    ? `Visitar ${project.title}`
                    : `Consultar por ${project.title}`
                }
              >
                {isExternalProject ? 'Visitar sitio' : 'Ver caso completo'}
                <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-10 rounded-3xl border border-indigo-300/20 bg-slate-950/65 p-8 text-center text-slate-300 backdrop-blur-md">
            No hay proyectos para este filtro por ahora.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
