import { useLocale, useTranslations } from 'next-intl';
import { getProjects } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCarousel from './ProjectCarousel';
import ProjectViewer from './ProjectViewer';

const Projects = () => {
  const t = useTranslations('Projects');
  const projects = getProjects(useLocale());

  return (
    <section
      id="projects"
      className="sec-projects border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="projects-heading"
          eyebrow={t('eyebrow')}
          title={t.rich('title', { hl: (chunks) => <em className="hl">{chunks}</em> })}
        >
          <p>{t('body')}</p>
        </SectionHeading>

        {projects.length === 0 ? (
          <p className="mt-14 text-muted">{t('empty')}</p>
        ) : (
          <>
            <Reveal className="mt-16 hidden lg:block">
              <ProjectViewer projects={projects} />
            </Reveal>

            <Reveal className="mt-12 lg:hidden">
              <ProjectCarousel projects={projects} />
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
