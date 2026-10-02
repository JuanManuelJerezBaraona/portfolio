import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Turns a slice of real TypeScript into a "sequencing read".
 *
 * A Sanger sequencer gives each DNA base its own dye: A green, C blue,
 * G yellow (often printed black), T red. Syntax highlighting does the same
 * job for code, so each kind of token is assigned the base with that color:
 *
 *   A · keyword        C · variable / property
 *   G · number/string  T · function call
 *
 * Comments, operators and punctuation don't produce a peak.
 */

export type Base = 'A' | 'C' | 'G' | 'T';

export interface Token {
  text: string;
  base?: Base;
  kind: 'base' | 'comment' | 'punct' | 'space';
  /** Position in the read, used to time the animation. */
  index?: number;
  /** Peak height, 0–1. */
  height?: number;
}

export interface Line {
  number: number;
  tokens: Token[];
  /** Index of the first base on this line. */
  start: number;
}

const KEYWORDS = new Set([
  'const', 'let', 'var', 'if', 'else', 'for', 'of', 'in', 'while', 'return', 'new',
  'true', 'false', 'null', 'undefined', 'typeof', 'function', 'export', 'import',
]);

const TOKEN =
  /(\/\/.*)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$\d'"`]+)/g;

/** Deterministic peak heights, so the trace looks measured, not random each build. */
const peakHeight = (index: number) => 0.45 + ((index * 37) % 55) / 100;

const tokenizeLine = (source: string, counter: { value: number }): Token[] => {
  const tokens: Token[] = [];
  for (const match of source.matchAll(TOKEN)) {
    const [text, comment, string, number, word, space] = match;
    if (comment) {
      tokens.push({ text, kind: 'comment' });
      continue;
    }
    if (space) {
      tokens.push({ text, kind: 'space' });
      continue;
    }

    let base: Base | undefined;
    if (string || number) {
      base = 'G';
    } else if (word) {
      const rest = source.slice((match.index ?? 0) + text.length);
      if (KEYWORDS.has(word)) base = 'A';
      else if (/^\s*\(/.test(rest)) base = 'T';
      else base = 'C';
    }

    if (base) {
      const index = counter.value++;
      tokens.push({ text, kind: 'base', base, index, height: peakHeight(index) });
    } else {
      tokens.push({ text, kind: 'punct' });
    }
  }
  return tokens;
};

/**
 * Reads the lines between `// #region <name>` and `// #endregion <name>`
 * from a source file, dedented. Runs at build time, so the page always
 * shows the code that actually renders the site.
 */
export const readRegion = (file: string, name: string) => {
  const lines = readFileSync(join(process.cwd(), file), 'utf8').split('\n');
  const start = lines.findIndex((line) => line.trim() === `// #region ${name}`);
  const end = lines.findIndex((line) => line.trim() === `// #endregion ${name}`);
  if (start === -1 || end <= start) {
    throw new Error(`Region "${name}" not found in ${file}`);
  }
  const body = lines.slice(start + 1, end);
  const indent = Math.min(
    ...body.filter((line) => line.trim()).map((line) => line.match(/^ */)![0].length),
  );
  return { firstLine: start + 2, lines: body.map((line) => line.slice(indent)) };
};

export const sequence = (file: string, region: string) => {
  const { firstLine, lines } = readRegion(file, region);
  const counter = { value: 0 };
  const read: Line[] = lines.map((source, i) => {
    const start = counter.value;
    return { number: firstLine + i, tokens: tokenizeLine(source, counter), start };
  });
  const bases = read.flatMap((line) =>
    line.tokens.filter((token) => token.base).map((token) => token.base as Base),
  );
  return { lines: read, bases, length: counter.value };
};
