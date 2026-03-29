'use client';

import { Skill } from '@/types';
import Image from 'next/image';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="rounded-2xl border border-indigo-300/20 bg-slate-950/65 p-5 backdrop-blur-md"
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
            className="object-contain"
            loading="lazy"
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

