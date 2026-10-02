import { PROJECTS } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCarousel from './ProjectCarousel';
import ProjectViewer from './ProjectViewer';

const Projects = () => {
  return (
    <section
      id="projects"
      className="sec-projects border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="projects-heading" eyebrow="Proyectos · Seguros Falabella" title={
            <>
              Cinco etapas del <em className="hl">mismo cliente</em>.
            </>
          }>
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

            <Reveal className="mt-12 lg:hidden">
              <ProjectCarousel projects={PROJECTS} />
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
