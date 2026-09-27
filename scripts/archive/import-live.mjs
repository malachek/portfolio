#!/usr/bin/env node
/**
 * One-time port: turns baseline/live/<page>.json (captured by `npm run baseline`)
 * into src/content/projects/<slug>/_base.md, keeping the live copy verbatim.
 *
 *   node scripts/import-live.mjs exo the-fallen ...
 *
 * Only the fact-lock fixes in FIXES below are applied. Everything else is ported as-is.
 * Refuses to overwrite an existing _base.md unless --force is passed.
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { stringify } from 'yaml';

const args = process.argv.slice(2);
const force = args.includes('--force');
const pages = args.filter((a) => !a.startsWith('--'));

/** Fact locks from the project brief. Applied to every string. */
const FIXES = [
  [/(?<!UE5 )\bBlueprints\b(?! scripting| VM| arrays| can)/g, 'UE5 Blueprints'],
  [/\bGames Director\b/g, 'Co-Founder & Game Engineer'],
];
const fix = (s) => FIXES.reduce((t, [re, to]) => t.replace(re, to), s);

/** Each page's accent, taken from its card on the live homepage. */
const ACCENTS = {
  exo: '#D52FC7', 'the-fallen': '#B38C1D', 'kawaiian-isolation': '#FF3399', 'burning-out': '#E34622',
  'burnt-out-games-llc': '#F05F23', 'taralumen-cora': '#D88394', vgdc: '#6D6EF5',
};
/** Sections whose capsules run copy at the full 888px width instead of the 680px measure (measured on the live site). */
const WIDE_SECTIONS = { exo: /^design$/i };
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
// Markdown-escape the few characters that would change meaning in capsule copy.
const esc = (s) => fix(s).replace(/</g, '\\<').replace(/>/g, '\\>').replace(/^(\d+)\. /, '$1\\. ').replace(/^([-+*#]) /, '\\$1 ');
const colsFor = (w) => (w >= 600 ? 1 : w >= 380 ? 2 : 3);

function convert(live, name) {
  const b = live.blocks;
  let start = b.findIndex((x) => x.t === 'media' && x.w >= 1000);
  const background = start >= 0 ? b[start].src : undefined; // some heroes paint their art as a CSS background
  if (start < 0) start = b.findIndex((x) => x.t === 'display') - 1;
  const page = { title: '', accent: ACCENTS[name] ?? '#D52FC7', path: `/${name}`, seo: { title: live.title, description: live.description ?? '' }, hero: { lines: [] } };
  if (background) page.hero.background = background;
  let i = start + 1;
  // Hero: title, lines, logo.
  for (; i < b.length; i++) {
    const x = b[i];
    if (x.t === 'display' && !page.title) { page.title = x.text; continue; }
    if (x.t === 'p' && page.title) { page.hero.lines.push(fix(x.text)); continue; }
    if (x.t === 'a') continue;
    if (x.t === 'media' && page.title) { page.hero.logo = x.src; if (x.alt) page.hero.logoAlt = x.alt; continue; }
    if (x.t === 'capsule') break;
  }
  if (!page.title) throw new Error('no hero title');
  if (page.hero.logoAlt && /burning out/i.test(page.hero.logoAlt) && !/burning/i.test(name)) delete page.hero.logoAlt; // stale alt copied between pages
  // Overview capsule.
  const ov = b[i];
  if (ov?.t === 'capsule' && ov.items[0]?.t === 'display') {
    const heading = ov.items[0].text;
    const texts = ov.items.filter((x) => x.t === 'p' && !x.href);
    const half = Math.floor(texts.length / 2);
    const rows = texts.slice(0, half).map((l, k) => ({ label: l.text, value: fix(texts[half + k].text) }));
    const code = ov.items.find((x) => /github\.com/.test(x.href ?? ''));
    const appIds = ov.items.filter((x) => x.t === 'iframe').map((x) => Number(x.src.match(/widget\/(\d+)/)?.[1])).filter(Boolean);
    page.overview = { heading, rows };
    if (appIds.length) page.overview.steamAppIds = appIds;
    if (code) page.overview.code = { href: code.href, label: code.text.replace(/^https?:\/\//, '') };
    i++;
  }
  // Sections.
  page.sections = [];
  let sec = null;
  let sub = null;
  let n = 0;
  const id = (suffix) => {
    const base = sub ? slug(sub) : sec.id;
    let candidate = `${base}-${suffix}`;
    while (sec._ids.has(candidate)) candidate = `${base}-${suffix}-${++n}`;
    sec._ids.add(candidate);
    return candidate;
  };
  for (; i < b.length; i++) {
    const x = b[i];
    if (x.t === 'eyebrow') break; // footer
    if (x.t === 'a') continue;
    if (x.t === 'display') {
      sec = { id: slug(x.text), heading: x.text, lead: undefined, blocks: [], _ids: new Set() };
      sub = null;
      page.sections.push(sec);
      continue;
    }
    if (!sec) continue;
    if (x.t === 'p' && !x.italic && sec.blocks.length === 0 && !sec.lead) { sec.lead = fix(x.text); continue; }
    if (x.t === 'p' && /^github\.com\//.test(x.text)) {
      sec.blocks.push({ id: id('code'), type: 'link', href: `https://${x.text}`, label: x.text });
      continue;
    }
    if (x.t === 'sub') {
      sub = x.text;
      sec.blocks.push({ id: slug(x.text), type: 'subsection', title: fix(x.text) });
      sec._ids.add(slug(x.text));
      continue;
    }
    if (x.t !== 'capsule') continue;
    const items = x.items.filter((y) => y.t !== 'a');
    const frame = items.find((y) => y.t === 'iframe');
    if (frame && /youtube/.test(frame.src)) {
      const src = frame.src.replace(/[?&]autoplay=1/, '');
      const caption = items.filter((y) => y.t === 'p').map((y) => fix(y.text)).join('\n');
      const blk = { id: id('video'), type: 'embed', src, title: `${page.title} trailer` };
      if (caption) blk.caption = caption;
      sec.blocks.push(blk);
      continue;
    }
    const media = items.filter((y) => y.t === 'media');
    if (media.length) {
      const out = [];
      for (const y of items) {
        if (y.t === 'media') out.push({ kind: y.kind === 'video' ? 'video' : 'image', src: y.src, alt: '' , _w: y.w });
        else if (out.length) out.at(-1).caption = out.at(-1).caption ? `${out.at(-1).caption}\n${fix(y.text)}` : fix(y.text);
      }
      for (const m of out) {
        m.alt = `${page.title}: ${m.caption ?? 'gameplay'}`.replace(/\n/g, ' ');
        delete m._w;
        if (!m.caption) delete m.caption;
      }
      sec.blocks.push({ id: id('media'), type: 'media', cols: colsFor(media[0].w), items: out });
      continue;
    }
    if (items.length && items.every((y) => y.t === 'li')) {
      sec.blocks.push({ id: id('list'), type: 'bullets', items: items.map((y) => esc(y.text)) });
      continue;
    }
    // Prose, possibly mixing paragraphs and list items.
    let title;
    const ps = items.filter((y) => typeof y.text === 'string');
    if (/^design/i.test(sec.heading) && ps.length > 1 && ps[0].t === 'p' && ps[0].text.length < 60 && !/[.!?:]$/.test(ps[0].text)) {
      title = fix(ps.shift().text);
    }
    const parts = [];
    for (const y of ps) {
      if (y.t === 'li') {
        if (parts.length && parts.at(-1).startsWith('- ')) parts[parts.length - 1] += `\n- ${esc(y.text)}`;
        else parts.push(`- ${esc(y.text)}`);
      } else parts.push(esc(y.text));
    }
    const kind = ps.length === 1 && !title ? 'frame' : 'text';
    const blk = { id: id(kind), type: 'text' };
    if (title) blk.title = title;
    blk.md = parts.join('\n\n');
    if (WIDE_SECTIONS[name]?.test(sec.heading)) blk.wide = true;
    if (frame) blk.embed = { src: frame.src, title: 'Press feature', width: 392, height: 459 };
    sec.blocks.push(blk);
  }
  for (const s of page.sections) { delete s._ids; if (!s.lead) delete s.lead; }
  return page;
}

for (const name of pages) {
  const live = JSON.parse(await readFile(new URL(`../baseline/live/${name}.json`, import.meta.url), 'utf8'));
  const page = convert(live, name);
  const dir = new URL(`../src/content/projects/${name}/`, import.meta.url);
  const target = new URL('_base.md', dir);
  if (!force) {
    try { await access(target); console.log(`skip ${name}: _base.md exists (use --force)`); continue; } catch {}
  }
  await mkdir(dir, { recursive: true });
  const header = `# ${page.title}: shared facts and full copy for every role variant.\n# Ported from the live site on ${new Date().toISOString().slice(0, 10)}. Edit freely; this file is now the source.\n`;
  await writeFile(target, `---\n${header}${stringify(page, { lineWidth: 0 })}---\n`);
  const counts = page.sections.map((s) => `${s.heading} (${s.blocks.length})`).join(', ');
  console.log(`wrote ${name}: ${counts}`);
}
