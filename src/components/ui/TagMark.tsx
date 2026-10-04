/**
 * The logo: his initials as a closing tag. Each symbol carries one of the
 * hero's channels, in order: < C1 frontend, / C2 backend, > C3 IA.
 */
const TagMark = ({ className = '' }: { className?: string }) => (
  <span className={`whitespace-nowrap font-mono font-semibold ${className}`} aria-hidden="true">
    <span className="text-dapi">&lt;</span>
    <span className="text-gfp">/</span>
    <span className="text-text">JM</span>
    <span className="text-mcherry">&gt;</span>
  </span>
);

export default TagMark;
