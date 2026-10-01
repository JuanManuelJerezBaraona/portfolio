import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Countries, Status } from '@/components/ui/ProjectMeta';
import ProjectViewer from './ProjectViewer';

const Projects = () => {
  return (
    <section
      id="projects"
      className="border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="projects-heading" eyebrow="Proyectos · Seguros Falabella" title="Cinco etapas del mismo cliente.">
          <p>
            Cinco aplicaciones que, en orden, cubren lo que hace una persona con su seguro: lo
            cotiza, lo contrata, lo paga, entra a su cuenta y resuelve trámites.
          </p>
        </SectionHeading>

        {PROJECTS.length === 0 ? (
          <p className="mt-14 text-muted">Todavía no hay proyectos publicados.</p>
        ) : (
          <>
            <Reveal className="mt-16 hidden lg:block">
              <ProjectViewer projects={PROJECTS} />
            </Reveal>

            <ol className="mt-12 space-y-16 lg:hidden">
              {PROJECTS.map((project) => (
                <Reveal as="li" key={project.id}>
                  <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                    <span className="meta text-gfp">
                      {String(project.stage).padStart(2, '0')} · {project.flow}
                    </span>
                    <Countries countries={project.countries} />
                  </div>
                  <h3 className="mt-3 text-2xl">{project.title}</h3>
                  {project.screenshots?.desktop && (
                    <Image
                      src={project.screenshots.desktop}
                      alt={`Captura de ${project.title}`}
                      width={2530}
                      height={1140}
                      sizes="100vw"
                      className="mt-5 h-auto w-full border border-line"
                    />
                  )}
                  <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link href={`/proyectos/${project.id}`} className="link-underline font-medium">
                      Ver caso completo →
                    </Link>
                    <Status status={project.status} />
                  </div>
                </Reveal>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
