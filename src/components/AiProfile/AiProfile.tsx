import { AI_PRACTICES } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/** One of his real skills, trimmed to what's safe to show publicly. */
const SKILL_TREE = `.claude/skills/nestjs-hexagonal-arch/
├─ SKILL.md
└─ references/
   ├─ layers-overview.md
   ├─ endpoint.md
   ├─ usecase.md
   ├─ service.md
   └─ testing.md`;

const SKILL_FRONTMATTER = `---
name: nestjs-hexagonal-arch
description: Arquitectura hexagonal en NestJS.
  Crea endpoints, use cases, servicios HTTP
  y tests respetando las capas domain,
  application e infrastructure.
---`;

const AiProfile = () => {
  return (
    <section
      id="ia"
      className="sec-ia border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="ia-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            id="ia-heading"
            eyebrow="Perfil IA-ready"
            title={
              <>
                Uso IA todos los días. Y <em className="hl">reviso todo</em> lo que escribe.
              </>
            }
          >
            <p>
              Vengo de analizar datos en un laboratorio, así que trato a un modelo de lenguaje
              como a cualquier instrumento: rápido y útil, pero no le creo hasta verificarlo.
            </p>
          </SectionHeading>

          <Reveal delay={120} className="mt-12">
            <figure className="border border-line bg-stage">
              <figcaption className="meta flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 text-muted">
                <span>Una de mis skills</span>
                <span className="text-accent">Claude Code</span>
              </figcaption>
              <div className="grid gap-px bg-line">
                <pre className="meta overflow-x-auto bg-stage p-4 leading-relaxed text-muted">
                  {SKILL_TREE}
                </pre>
                <pre className="meta overflow-x-auto bg-stage p-4 leading-relaxed text-text/85">
                  {SKILL_FRONTMATTER}
                </pre>
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ul className="border-t border-line">
            {AI_PRACTICES.map((practice) => (
              <li key={practice.id} className="border-b border-line py-7">
                <h3 className="text-xl">{practice.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{practice.body}</p>
                <p className="meta mt-4 text-accent">{practice.tools.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default AiProfile;
