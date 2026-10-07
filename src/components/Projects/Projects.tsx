import { useLocale, useTranslations } from 'next-intl';
import { getProjects } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionCover from '@/components/ui/SectionCover';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCarousel from './ProjectCarousel';
import ProjectViewer from './ProjectViewer';

const Projects = () => {
  const t = useTranslations('Projects');
  const projects = getProjects(useLocale());

  return (
    <section
      id="projects"
      className="sec-projects chapter px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-32 lg:pt-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionCover id="projects" note={t('note')} />
        <SectionHeading
          id="projects-heading"
          className="mt-14"
          title={t.rich('title', { hl: (chunks) => <em className="hl">{chunks}</em> })}
        >
          <p>{t('body')}</p>
        </SectionHeading>

        {projects.length === 0 ? (
          <p className="mt-14 text-muted">{t('empty')}</p>
        ) : (
          <>
            {/* No Reveal here: the stack runs several screens tall, so a visible
                ratio would never be reached; each project comes into focus instead. */}
            <div className="mt-16 hidden lg:block">
              <ProjectViewer projects={projects} />
            </div>

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
