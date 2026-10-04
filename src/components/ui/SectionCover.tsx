import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { getNavLinks } from '@/constants/data';
import Reveal from './Reveal';

interface SectionCoverProps {
  /** Section id, as in NAV_LINKS: its position there is the chapter number. */
  id: string;
  /** Short readout on the right, e.g. "Seguros Falabella · CL · PE · CO". */
  note?: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Opens a section like a chapter: its number out of the total, a note, and
 * its name set across the width in the section's color. The name comes into
 * focus as the section enters, the way the hero's micrograph does on load.
 * Colors come from the enclosing `.sec-*`.
 */
const SectionCover = ({ id, note }: SectionCoverProps) => {
  const links = getNavLinks(useLocale());
  const index = links.findIndex((link) => link.id === id);

  return (
    <Reveal className="cover" amount={0.35}>
      <div className="meta flex items-baseline justify-between gap-4">
        <span className="text-accent">
          {pad(index + 1)} / {pad(links.length)}
        </span>
        {note && <span className="text-right text-muted">{note}</span>}
      </div>
      <p className="cover-name display mt-3">{links[index].label}</p>
    </Reveal>
  );
};

export default SectionCover;
