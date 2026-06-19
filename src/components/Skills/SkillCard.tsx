import { Skill } from '@/types';
import Image from 'next/image';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="hud hud-hover group flex flex-col items-center gap-3 p-4"
      role="listitem"
      aria-label={skill.name}
    >
      <div className="flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
        <Image
          src={skill.icon}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          loading="lazy"
        />
      </div>
      <span className="text-center text-xs font-medium text-muted transition-colors group-hover:text-text">
        {skill.name}
      </span>
    </div>
  );
};

export default SkillCard;
