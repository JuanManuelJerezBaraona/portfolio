/**
 * The logo: his initials as a closing tag. Each symbol carries one of the
 * hero's channels, in order: < C1 frontend, / C2 backend, > C3 IA.
 * On hover the brackets part and each symbol lights up (`.tag-mark`).
 */
const TagMark = ({ className = '' }: { className?: string }) => (
  <span className={`tag-mark whitespace-nowrap font-mono font-semibold ${className}`} aria-hidden="true">
    <span className="tag-open text-dapi">&lt;</span>
    <span className="tag-slash text-gfp">/</span>
    <span className="text-text">JM</span>
    <span className="tag-close text-mcherry">&gt;</span>
  </span>
);

export default TagMark;
