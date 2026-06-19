import { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Corners, Deploy, StatusDot } from '@/components/ui/Hud';

interface FunnelNodeProps {
  project: Project;
}

const FunnelNode = ({ project }: FunnelNodeProps) => {
  const stage = String(project.stage).padStart(2, '0');

  return (
    <Link
      href={`/proyectos/${project.id}`}
      className="hud hud-hover scanlines group relative flex h-full flex-col overflow-hidden"
      aria-label={`Abrir case file: ${project.title}`}
    >
      <Corners tone="cyan" />

      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-grad font-display text-3xl font-bold leading-none">{stage}</span>
          <span className="label rounded-[5px] border border-line px-2 py-1 text-cyan">
            {project.flow}
          </span>
        </div>
        <StatusDot status={project.status} showLabel={false} />
      </div>

      <div className="relative mx-5 mt-4 overflow-hidden rounded-lg border border-line bg-ink/60">
        {project.screenshots?.desktop && (
          <Image
            src={project.screenshots.desktop}
            alt={`Vista de ${project.title}`}
            width={1280}
            height={720}
            className="aspect-[16/9] w-full object-cover object-top opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            loading="lazy"
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="font-display text-xl font-bold leading-tight text-text transition-colors group-hover:text-grad">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.role}</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <Deploy countries={project.countries} />
          <span className="label inline-flex items-center gap-1.5 text-muted transition-colors group-hover:text-neon">
            Abrir
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FunnelNode;
