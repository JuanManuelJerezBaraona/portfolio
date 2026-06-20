import { SKILLS } from '@/constants/data';
import { Skill } from '@/types';
import Reveal from '@/components/ui/Reveal';
import SkillCard from './SkillCard';

const CATEGORIES: { key: Skill['category']; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Datos' },
  { key: 'tools', label: 'Herramientas' },
];

const Skills = () => {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="label text-neon">// Stack</p>
          <h2
            id="skills-heading"
            className="mt-4 text-3xl font-bold leading-[1.05] text-text sm:text-4xl lg:text-5xl"
          >
            El arsenal <span className="text-grad">técnico.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            No las colecciono por moda. Son las herramientas con las que de verdad construyo
            —de la base de datos hasta el último pixel— cuando algo tiene que salir bien, rápido
            y para durar.
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {CATEGORIES.map((category, index) => {
            const skills = SKILLS.filter((skill) => skill.category === category.key);
            if (skills.length === 0) return null;

            return (
              <Reveal key={category.key} delay={index * 70}>
                <div className="flex items-center gap-4">
                  <p className="label text-cyan">{category.label}</p>
                  <span className="h-px flex-1 bg-line" />
                  <span className="label text-muted">{String(skills.length).padStart(2, '0')}</span>
                </div>
                <div
                  className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                  role="list"
                  aria-label={`Tecnologías · ${category.label}`}
                >
                  {skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
