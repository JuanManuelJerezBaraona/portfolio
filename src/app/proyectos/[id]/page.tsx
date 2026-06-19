import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CaseFile from '@/components/case/CaseFile';
import { PROJECTS, getProjectById } from '@/constants/data';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export const generateStaticParams = () =>
  PROJECTS.map((project) => ({ id: project.id }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: 'Proyecto no encontrado — Juan Manuel Jerez' };
  }

  const title = `${project.title} · ${project.flow} — Juan Manuel Jerez`;

  return {
    title,
    description: project.summary,
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
  const { id } = await params;
  const index = PROJECTS.findIndex((project) => project.id === id);

  if (index === -1) {
    notFound();
  }

  const project = PROJECTS[index];
  const prev = index > 0 ? PROJECTS[index - 1] : null;
  const next = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null;

  return <CaseFile project={project} prev={prev} next={next} />;
};

export default ProjectPage;
