const PATHS = {
  out: 'M7 17 17 7m0 0H8m9 0v9',
  down: 'M12 5v14m0 0 6-6m-6 6-6-6',
  right: 'M5 12h14m0 0-6-6m6 6-6 6',
  prev: 'M15 5l-7 7 7 7',
  next: 'M9 5l7 7-7 7',
} as const;

/**
 * The arrows on buttons and links. Hovering the link or button around one
 * sends it out through the edge it points at and back in from the opposite
 * edge (`.arrow` in globals.css), like the next field sliding under the
 * objective.
 */
const Arrow = ({ dir, className = 'h-4 w-4' }: { dir: keyof typeof PATHS; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`arrow ${className}`}
    data-dir={dir}
    aria-hidden="true"
  >
    <path strokeLinecap="square" d={PATHS[dir]} />
  </svg>
);

export default Arrow;
