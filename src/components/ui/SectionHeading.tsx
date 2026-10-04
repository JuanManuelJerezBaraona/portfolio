import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** The section's statement, under its cover (`SectionCover`). */
const SectionHeading = ({ id, title, children, className = '' }: SectionHeadingProps) => (
  <Reveal className={`max-w-3xl ${className}`}>
    <h2 id={id} className="text-[2.1rem] leading-[1.02] sm:text-5xl">
      {title}
    </h2>
    {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
  </Reveal>
);

export default SectionHeading;
