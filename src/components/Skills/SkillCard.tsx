'use client';

import { Skill } from '@/types';
import Image from 'next/image';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="group rounded-2xl border border-indigo-300/20 bg-slate-950/65 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_10px_28px_rgba(14,165,233,0.24)]"
      role="listitem"
      aria-label={`Skill: ${skill.name}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
          <Image
            src={skill.icon}
            alt={`${skill.name} icon`}
            width={64}
            height={64}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span className="text-center text-sm font-medium text-slate-100">
          {skill.name}
        </span>
      </div>
    </div>
  );
};

export default SkillCard;

