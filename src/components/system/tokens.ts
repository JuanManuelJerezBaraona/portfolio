import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The design tokens as globals.css defines them, read at build time so the
 * system page can never drift from the CSS. Fluorescence is the `:root`
 * block; brightfield is the block that redefines it.
 */
export type Mode = 'fluorescence' | 'brightfield';

const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

const block = (selector: string) => {
  const start = css.indexOf('{', css.indexOf(selector));
  let depth = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}' && --depth === 0) return css.slice(start + 1, i);
  }
  return '';
};

const declarations = (body: string) =>
  Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));

const fluorescence = declarations(block(':root {'));
const brightfield = { ...fluorescence, ...declarations(block(':root:has(#mode-brightfield:checked)')) };

export const tokenValue = (name: string, mode: Mode) => (mode === 'fluorescence' ? fluorescence : brightfield)[name];

// WCAG 2 relative luminance and contrast; only solid #rrggbb values qualify.
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (a: string | undefined, b: string | undefined) => {
  const solid = /^#[0-9a-f]{6}$/i;
  if (!a || !b || !solid.test(a) || !solid.test(b)) return null;
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
