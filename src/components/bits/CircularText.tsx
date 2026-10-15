/*
 * Circular Text, from React Bits (https://reactbits.dev, MIT + Commons Clause,
 * see LICENSE.md). Adapted for this site as a server component with no
 * JavaScript and no `motion` dependency: it keeps the original's layout (each
 * letter is a full-size box turned about the centre, so it sits on the rim)
 * and drops the drag, tilt and spin. The text comes in segments, each with
 * its own class, so parts of the ring can take a channel's color; how it
 * moves is up to the CSS that places it (`.objective-ring` in globals.css).
 */

interface Segment {
  text: string;
  className?: string;
}

interface CircularTextProps {
  segments: Segment[];
  className?: string;
}

const CircularText = ({ segments, className = '' }: CircularTextProps) => {
  const letters = segments.flatMap((segment) =>
    Array.from(segment.text).map((char) => ({ char, className: segment.className })),
  );
  const step = 360 / letters.length;

  return (
    <div className={className} aria-hidden="true">
      {letters.map((letter, i) => (
        <span
          key={i}
          className={`absolute inset-0 whitespace-pre text-center ${letter.className ?? ''}`}
          style={{ transform: `rotate(${(i * step).toFixed(2)}deg)` }}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
};

export default CircularText;
