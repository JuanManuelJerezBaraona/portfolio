/**
 * TEMPORARY (iOS crash hunt, PR #2): `?sin=live,heroe,...` switches pieces of
 * motion off so the one that makes iOS kill the tab can be found on a phone.
 * Remove before merging.
 */
export const off = (piece: string) => {
  if (typeof window === 'undefined') return false;
  const list = new URLSearchParams(window.location.search).get('sin')?.split(',') ?? [];
  return list.includes(piece) || (piece !== 'live' && list.includes('escenas'));
};
