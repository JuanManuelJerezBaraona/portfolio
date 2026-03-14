'use client';

import { SKILLS } from '@/constants/data';
import SkillCard from './SkillCard';

const Skills = () => {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl">
        <h2
          id="skills-heading"
          className="text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Stack tecnológico
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
          Herramientas con las que construyo interfaces robustas, accesibles y escalables.
        </p>

        <div
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          role="list"
          aria-label="Lista de habilidades técnicas"
        >
          {SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

