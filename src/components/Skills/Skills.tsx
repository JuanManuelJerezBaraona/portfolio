import { SKILLS } from '@/constants/data';
import { SkillCategory } from '@/types';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/** Frontend, backend and IA keep the hero's channel colors. */
const CATEGORIES: { key: SkillCategory; label: string; tone: string }[] = [
  { key: 'frontend', label: 'Frontend', tone: 'text-dapi' },
  { key: 'backend', label: 'Backend', tone: 'text-gfp' },
  { key: 'ai', label: 'IA', tone: 'text-mcherry' },
  { key: 'database', label: 'Datos', tone: 'text-muted' },
  { key: 'tools', label: 'Herramientas', tone: 'text-muted' },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="skills-heading" eyebrow="Stack" title="Con qué trabajo.">
          <p>
            En blanco, lo que uso hoy en Seguros Falabella. En gris, lo que he usado en otros
            proyectos.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category, index) => {
            const skills = SKILLS.filter((skill) => skill.category === category.key);
            if (skills.length === 0) return null;

            return (
              <Reveal key={category.key} delay={index * 60}>
                <h3 className="meta flex items-center gap-2.5 border-b border-line pb-3 font-normal text-muted">
                  <span className={`swatch ${category.tone}`} aria-hidden="true" />
                  {category.label}
                </h3>
                <ul className="mt-4 space-y-2">
                  {skills.map((skill) => (
                    <li
                      key={skill.id}
                      className={`text-lg leading-snug ${skill.current ? 'text-text' : 'text-muted/70'}`}
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
