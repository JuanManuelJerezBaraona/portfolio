'use client';

import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const projectHref = project.url ?? '#contact';
  const isExternalProject = Boolean(project.url?.startsWith('http'));

  return (
    <article className="relative z-0 h-full rounded-3xl border border-indigo-300/20 bg-slate-950/65 p-4 backdrop-blur-md sm:p-5 xl:p-6">
      <p className="font-heading text-xs uppercase tracking-[0.18em] text-cyan-200/80">{project.category}</p>
      <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-white sm:text-xl xl:mt-3 xl:line-clamp-none xl:text-xl">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300 xl:mt-3 xl:line-clamp-none">
        {project.description}
      </p>

      {project.screenshots && (
        <div className="mt-4 xl:mt-5">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={project.screenshots.desktop}
              alt={`Vista desktop de ${project.title}`}
              width={1366}
              height={768}
              className="mx-auto max-h-55 w-full rounded-2xl object-contain lg:max-h-65 xl:max-h-none"
              loading="lazy"
            />
          </div>
        </div>
      )}

      <Link
        href={projectHref}
        target={isExternalProject ? '_blank' : undefined}
        rel={isExternalProject ? 'noopener noreferrer' : undefined}
        className="mt-5 inline-flex items-center text-[13px] font-semibold text-cyan-100 xl:mt-6 xl:text-sm"
        aria-label={
          isExternalProject
            ? `Visitar ${project.title}`
            : `Consultar por ${project.title}`
        }
      >
        {isExternalProject ? 'Visitar sitio' : 'Ver caso completo'}
        <span className="ml-2" aria-hidden="true">
          &rarr;
        </span>
      </Link>
    </article>
  );
};

export default ProjectCard;
