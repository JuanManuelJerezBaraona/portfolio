import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import CaseFile from '@/components/case/CaseFile';
import { PROJECTS, getProjects } from '@/constants/data';
import { alternatesFor } from '@/i18n/navigation';

interface ProjectPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export const generateStaticParams = () =>
  PROJECTS.map((project) => ({ id: project.id }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { locale, id } = await params;
  const project = getProjects(locale as Locale).find((item) => item.id === id);

  if (!project) {
    const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });
    return { title: t('projectNotFound') };
  }

  const title = `${project.title} · ${project.flow} — Juan Manuel Jerez`;

  return {
    title,
    description: project.summary,
    alternates: alternatesFor(`/proyectos/${project.id}`, locale as Locale),
    openGraph: {
      title,
      description: project.summary,
      images: project.screenshots?.desktop
        ? [{ url: project.screenshots.desktop }]
        : undefined,
    },
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);

  const projects = getProjects(locale as Locale);
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return <CaseFile project={project} projects={projects} prev={prev} next={next} />;
};

export default ProjectPage;
