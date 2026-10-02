import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}

/** The swatch takes the color of the enclosing section (`.sec-*`). */
const SectionHeading = ({ id, eyebrow, title, children }: SectionHeadingProps) => (
  <Reveal className="max-w-3xl">
    <p className="meta flex items-center gap-2.5 text-muted">
      <span className="swatch text-accent" aria-hidden="true" />
      {eyebrow}
    </p>
    <h2 id={id} className="mt-5 text-[2.1rem] leading-[1.02] sm:text-5xl">
      {title}
    </h2>
    {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
  </Reveal>
);

export default SectionHeading;
