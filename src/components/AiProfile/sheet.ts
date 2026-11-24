/**
 * The grid both sheets of the IA section share: a narrow first column (the
 * build's letter or the step's number), the text, and a third column for the
 * control or the material, under the text on phones and beside it from lg.
 */
export const COLUMNS =
  'grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-4 lg:grid-cols-[4.5rem_minmax(0,1fr)_24rem] lg:gap-x-12';

export const pad = (n: number) => String(n).padStart(2, '0');
