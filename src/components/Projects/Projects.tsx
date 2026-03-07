'use client';

import { PROJECTS } from '@/constants/data';
import Link from 'next/link';

const Projects = () => {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl">
        <h2 id="projects-heading" className="text-center text-3xl font-bold text-white sm:text-4xl">
          Proyectos destacados
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
          Una muestra de productos diseñados para destacar visualmente y cumplir objetivos reales de negocio.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => {
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

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-500/30 bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
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
      </div>
    </section>
  );
};

export default Projects;
