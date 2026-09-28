/**
 * Button colours from a project accent.
 *
 * Accents run from white to dark brown, so a fixed text colour can't work.
 * `buttonColors(accent)` returns a background and ink that pass WCAG AA
 * (4.5:1) for normal-size text:
 *  - normally white ink, with the accent darkened just enough to pass;
 *  - pale accents (white, pastels) that would need a heavy darken keep their
 *    colour and take dark ink instead.
 */
const DARK_INK = '#05060f';
const LIGHT_INK = '#ffffff';

function parse(hex: string): [number, number, number] | null {
  const m = hex.trim().replace('#', '');
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

function lum([r, g, b]: [number, number, number]): number {
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const toHex = (rgb: number[]) => '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

export function buttonColors(accent: string): { bg: string; ink: string } {
  const rgb = parse(accent);
  if (!rgb) return { bg: accent, ink: LIGHT_INK };
  const L = lum(rgb);
  const darkInkL = lum(parse(DARK_INK)!);
  // Prefer white ink everywhere so buttons read as one family; darken the
  // accent until it passes. Only accents that would need more than a 25%
  // darken (near-white, pale) keep their colour and take dark ink instead.
  let k = 1;
  let cur = rgb;
  while (contrast(lum(cur), 1) < 4.5 && k > 0.3) {
    k -= 0.01;
    cur = rgb.map((v) => v * k) as [number, number, number];
  }
  if (k < 0.75 && contrast(L, darkInkL) >= 4.5) return { bg: toHex(rgb), ink: DARK_INK };
  return { bg: toHex(cur), ink: LIGHT_INK };
}

/** CSS custom properties for an element that sets --accent. */
export function accentVars(accent: string): string {
  const { bg, ink } = buttonColors(accent);
  return `--accent:${accent};--accent-btn:${bg};--accent-ink:${ink}`;
}
