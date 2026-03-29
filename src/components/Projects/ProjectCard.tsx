'use client';

import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const projectHref = project.url ?? '#contact';
  const isExternalProject = Boolean(project.url?.startsWith('http'));

  return (
    <article
      className={`group relative z-0 h-full rounded-3xl border border-indigo-300/20 bg-slate-950/65 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_10px_28px_rgba(14,165,233,0.24)] ${
        compact ? 'p-4 sm:p-5 xl:p-6' : 'p-6'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{project.category}</p>
      <h3
        className={`${compact ? 'mt-2 line-clamp-2 text-lg sm:text-xl xl:mt-3 xl:line-clamp-none xl:text-xl' : 'mt-3 text-xl'} font-semibold text-white`}
      >
        {project.title}
      </h3>
      <p
        className={`${compact ? 'mt-2 line-clamp-3 text-sm xl:mt-3 xl:line-clamp-none' : 'mt-3 text-sm'} leading-relaxed text-slate-300`}
      >
        {project.description}
      </p>

      {project.screenshots && (
        <div className={compact ? 'mt-4 xl:mt-5' : 'mt-5'}>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <Image
              src={project.screenshots.desktop}
              alt={`Vista desktop de ${project.title}`}
              width={1366}
              height={768}
              className={`mx-auto w-full rounded-2xl object-contain ${compact ? 'max-h-55 lg:max-h-65 xl:max-h-none' : 'h-full'}`}
            />
          </div>

          <div className="overflow-hidden rounded-2xl md:hidden">
            <Image
              src={project.screenshots.mobile}
              alt={`Vista mobile de ${project.title}`}
              width={390}
              height={844}
              className={`mx-auto rounded-2xl object-contain ${compact ? 'max-w-45 sm:max-w-50' : 'h-full w-full'}`}
            />
          </div>
        </div>
      )}

      <Link
        href={projectHref}
        target={isExternalProject ? '_blank' : undefined}
        rel={isExternalProject ? 'noopener noreferrer' : undefined}
        className={`${compact ? 'mt-5 text-[13px] xl:mt-6 xl:text-sm' : 'mt-6 text-sm'} inline-flex items-center font-semibold text-cyan-100 transition-colors group-hover:text-white`}
        aria-label={
          isExternalProject
            ? `Visitar ${project.title}`
            : `Consultar por ${project.title}`
        }
      >
        {isExternalProject ? 'Visitar sitio' : 'Ver caso completo'}
        <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">
          &rarr;
        </span>
      </Link>
    </article>
  );
};

export default ProjectCard;
