import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** Tailwind text color for the eyebrow swatch, e.g. "text-mcherry". */
  tone?: string;
}

const SectionHeading = ({ id, eyebrow, title, children, tone = 'text-muted' }: SectionHeadingProps) => (
  <Reveal className="max-w-3xl">
    <p className="meta flex items-center gap-2.5 text-muted">
      <span className={`swatch ${tone}`} aria-hidden="true" />
      {eyebrow}
    </p>
    <h2 id={id} className="mt-5 text-[2.1rem] leading-[1.02] sm:text-5xl">
      {title}
    </h2>
    {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
  </Reveal>
);

export default SectionHeading;
