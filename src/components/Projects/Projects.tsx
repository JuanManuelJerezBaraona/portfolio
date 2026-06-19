import { PROJECTS } from '@/constants/data';

import FunnelNode from './FunnelNode';
import ProjectsCarousel from './ProjectsCarousel';

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="label text-neon">// El sistema</p>
          <h2
            id="projects-heading"
            className="mt-4 text-3xl font-bold leading-[1.05] text-text sm:text-4xl lg:text-5xl"
          >
            El recorrido del cliente, <span className="text-grad">de punta a punta.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            No son cinco proyectos sueltos: es una sola plataforma de seguros que construí
            etapa por etapa. Recórrela como lo hace un cliente real —y abre cualquier nodo
            para ver qué hay detrás.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <span className="dot dot-live" />
              <span className="label text-muted">En línea · público</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="dot dot-idle" />
              <span className="label text-muted">Acceso interno</span>
            </span>
          </div>
        </div>

        {PROJECTS.length === 0 ? (
          <div className="hud mt-12 p-8 text-center text-muted">
            No hay flujos para mostrar por ahora.
          </div>
        ) : (
          <>
            {/* Desktop · vertical funnel spine */}
            <ol className="relative mx-auto mt-16 hidden max-w-5xl lg:block">
              <span
                aria-hidden
                className="spine-y absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2"
              />
              {PROJECTS.map((project, index) => {
                const onLeft = index % 2 === 0;
                const stage = String(project.stage).padStart(2, '0');

                return (
                  <li
                    key={project.id}
                    className="relative grid grid-cols-2 items-center [&:not(:first-child)]:mt-12"
                  >
                    {/* spine marker */}
                    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                      <div className="hud flex h-14 w-14 items-center justify-center rounded-xl border-line shadow-[0_0_30px_-6px_rgba(255,46,136,0.4)]">
                        <span className="text-grad font-display text-lg font-bold">{stage}</span>
                      </div>
                    </div>

                    {/* branch connector */}
                    <span
                      aria-hidden
                      className={`spine-x absolute top-1/2 z-0 h-px w-14 -translate-y-1/2 ${
                        onLeft ? 'right-1/2' : 'left-1/2'
                      }`}
                    />

                    {onLeft ? (
                      <>
                        <div className="col-start-1 pr-16">
                          <FunnelNode project={project} />
                        </div>
                        <div className="col-start-2" />
                      </>
                    ) : (
                      <>
                        <div className="col-start-1" />
                        <div className="col-start-2 pl-16">
                          <FunnelNode project={project} />
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Mobile · swiper */}
            <div className="mt-12 lg:hidden">
              <ProjectsCarousel projects={PROJECTS} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
