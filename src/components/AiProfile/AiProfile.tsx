import { useLocale, useTranslations } from 'next-intl';
import { getAiPractices } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionCover from '@/components/ui/SectionCover';
import SectionHeading from '@/components/ui/SectionHeading';

/** One of his real skills, trimmed to what's safe to show publicly. Kept verbatim (in Spanish) in both languages. */
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
  const t = useTranslations('Ai');
  const practices = getAiPractices(useLocale());

  return (
    <section
      id="ia"
      className="sec-ia chapter px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-32 lg:pt-8"
      aria-labelledby="ia-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionCover id="ia" note={t('note')} />
        <div className="mt-14 grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              id="ia-heading"
              title={t.rich('title', { hl: (chunks) => <em className="hl">{chunks}</em> })}
            >
              <p>{t('body')}</p>
            </SectionHeading>

            <Reveal delay={120} className="mt-12">
              <figure className="border border-line bg-stage">
                <figcaption className="meta flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 text-muted">
                  <span>{t('skill')}</span>
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
              {practices.map((practice) => (
                <li key={practice.id} className="border-b border-line py-7">
                  <h3 className="text-xl">{practice.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{practice.body}</p>
                  <p className="meta mt-4 text-accent">{practice.tools.join(' · ')}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AiProfile;
