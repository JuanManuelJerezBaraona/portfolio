import { PROJECTS } from '@/constants/data';

import ProjectsCarousel from './ProjectsCarousel';

const Projects = () => {
  return (
    <section
      id="projects"
      className="overflow-x-hidden px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl min-w-0">
        <h2 id="projects-heading" className="text-center text-3xl font-bold text-white sm:text-4xl">
          Proyectos destacados
        </h2>

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
