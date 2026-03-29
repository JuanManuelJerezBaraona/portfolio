'use client';

import { PROJECTS } from '@/constants/data';
import { Project } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const projectHref = project.url ?? '#contact';
  const isExternalProject = Boolean(project.url?.startsWith('http'));

  return (
    <article
      className={`group h-full rounded-3xl border border-indigo-300/20 bg-slate-950/65 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_14px_40px_rgba(14,165,233,0.2)] ${
        compact ? 'p-4 sm:p-5 xl:p-6' : 'p-6'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{project.category}</p>
      <h3 className={`${compact ? 'mt-2 line-clamp-2 text-lg sm:text-xl xl:mt-3 xl:line-clamp-none xl:text-xl' : 'mt-3 text-xl'} font-semibold text-white`}>
        {project.title}
      </h3>
      <p className={`${compact ? 'mt-2 line-clamp-3 text-sm xl:mt-3 xl:line-clamp-none' : 'mt-3 text-sm'} leading-relaxed text-slate-300`}>
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

const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const scrollSnaps = emblaApi?.snapList() ?? projects.map((_, index) => index);

  const handleSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedSnap());
  }, [emblaApi]);

  const handleGoTo = (index: number) => {
    emblaApi?.goTo(index);
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div ref={emblaRef} className="overflow-hidden" aria-label="Carrusel de proyectos" aria-roledescription="carousel">
        <div className="-mr-4 flex [touch-action:pan-y_pinch-zoom]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-0 pr-4 flex-[0_0_88%] sm:flex-[0_0_72%] lg:flex-[0_0_58%] xl:flex-[0_0_33.333%]"
            >
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Seleccionar proyecto">
        {scrollSnaps.map((_, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={`project-dot-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleGoTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive ? 'w-8 bg-cyan-300' : 'w-2.5 bg-slate-600'
              }`}
            >
              <span className="sr-only">Ir al grupo {index + 1} de proyectos</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

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

        <ProjectsCarousel projects={PROJECTS} />

        {PROJECTS.length === 0 && (
          <div className="mt-10 rounded-3xl border border-indigo-300/20 bg-slate-950/65 p-8 text-center text-slate-300 backdrop-blur-md">
            No hay proyectos para mostrar por ahora.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
