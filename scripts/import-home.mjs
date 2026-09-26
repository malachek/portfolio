#!/usr/bin/env node
/**
 * One-time port of the live homepage (baseline/live/home.json) into src/content/home.yaml.
 * Copy is verbatim except the fact-lock fixes. Links come from the whitelist in
 * resume-system/master/00-contact.md; URLs not on it are dropped and listed.
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { stringify } from 'yaml';

const force = process.argv.includes('--force');
const target = new URL('../src/content/home.yaml', import.meta.url);
if (!force) { try { await access(target); console.log('home.yaml exists (use --force)'); process.exit(0); } catch {} }

const live = JSON.parse(await readFile(new URL('../baseline/live/home.json', import.meta.url), 'utf8'));
const fix = (s) => s.replace(/\s*\n\s*/g, ' ').replace(/(?<!UE5 )\bBlueprints\b/g, 'UE5 Blueprints').replace(/​/g, '').trim();
const b = live.blocks;
let i = b.findIndex((x) => x.t === 'media' && x.w >= 1000);

// Per-card data the live DOM doesn't expose as links (its links are click handlers).
const CARDS = {
  EXO: { href: '/exo', accent: '#D52FC7', links: [
    { icon: 'steam', href: 'https://store.steampowered.com/app/4587490/EXO', label: 'EXO on Steam' },
    { icon: 'github', href: 'https://github.com/malachek/EXO_CodeSamples', label: 'EXO code samples on GitHub' } ] },
  'The Fallen': { href: '/the-fallen', accent: '#B38C1D', links: [
    { icon: 'itch', href: 'https://kkartin.itch.io/fallen', label: 'The Fallen on itch.io' } ] },
  'Kawai’ian Isolation': { href: '/kawaiian-isolation', accent: '#FF3399', links: [
    { icon: 'steam', href: 'https://store.steampowered.com/app/3812810/Kawaiian_Isolation', label: "Kawai'ian Isolation on Steam" } ] },
  'Burning Out': { href: '/burning-out', accent: '#E34622', links: [
    { icon: 'steam', href: 'https://store.steampowered.com/app/3795170/Burning_Out', label: 'Burning Out on Steam' } ] },
  'Co-Founder & Game Engineer': { href: '/burnt-out-games-llc', accent: '#F05F23', links: [
    { icon: 'globe', href: 'https://burntoutgames.com', label: 'Burnt Out Games website' } ] },
  'Game Development Intern': { href: '/taralumen-cora', accent: '#D88394', links: [
    { icon: 'github', href: 'https://github.com/malachek/CORA_CodeSamples', label: 'CORA code samples on GitHub' } ] },
  President: { href: '/vgdc', accent: '#6D6EF5', links: [
    { icon: 'globe', href: 'https://vgdc-uci.com', label: 'VGDC website' } ] },
};
const SMALL = {
  'Night Walk': { accent: '#43792E' },
  'Trick or Treat': { accent: '#632E03', links: [{ icon: 'globe', href: 'https://www.roblox.com/games/89963863217995/Trick-or-Treat', label: 'Play Trick or Treat on Roblox' }] },
  Loonage: { accent: '#86BE3A' },
  Limital: { accent: '#60788D', links: [{ icon: 'globe', href: 'https://devpost.com/software/limital', label: 'Limital case study on Devpost' }] },
  'Web Crawler & Search Engine': { accent: '#5A565F' },
  'Pintos Thread Scheduler': { accent: '#FFFFFF' },
};

const home = { hero: { background: b[i].src, bullets: [], lines: [] }, selectedWork: { heading: '', cards: [] }, alsoBuilt: { cards: [] }, experience: [], skills: { heading: 'Skills', lines: [] } };
i++;
// Hero
for (; i < b.length; i++) {
  const x = b[i];
  if (x.t === 'display' && !home.hero.title) { home.hero.title = x.text; continue; }
  if (x.t === 'display') break;
  if (x.t === 'p') home.hero.lines.push(fix(x.text));
  else if (x.t === 'li') home.hero.bullets.push(fix(x.text));
  else if (x.t === 'eyebrow' && !x.href) home.hero.credential = fix(x.text);
  else if (x.t === 'media') home.hero.avatar = x.src;
}
home.selectedWork.heading = b[i].text; i++;

// Feature cards: background media (1280) starts a card.
function readCard(kind) {
  const card = { kind, chips: [], bullets: [] };
  if (b[i].t === 'media' && b[i].w >= 1000) { card.background = b[i].src; i++; }
  const metaP = [];
  for (; i < b.length; i++) {
    const x = b[i];
    if (x.t === 'sub') { card.title = fix(x.text); continue; }
    if (!card.title) { if (x.t === 'p') metaP.push(x.text); continue; }
    if (x.t === 'li') { card.bullets.push(fix(x.text)); continue; }
    if (x.t === 'p' && x.text === 'See More') { card._seeMore = true; continue; }
    if (x.t === 'media') {
      if (x.w <= 200 && !card._seeMore && x.src.includes('1afaa335')) continue; // link-icon sprite
      if (!card._seeMore) { if (kind === 'experience') card.orgLogo = x.src; continue; }
      if (x.w >= 1000) break;
      if (!card.media) card.media = { kind: /_videos/.test(x.src) ? 'video' : 'image', src: x.src };
      else card.logo = x.src;
      continue;
    }
    if (x.t === 'p' && !card._seeMore) {
      if (kind === 'experience' && !card.org) card.org = fix(x.text); else card.chips.push(fix(x.text));
      continue;
    }
    if (x.t === 'p' && card._seeMore) {
      if (card.media && !card.blurb) { card.blurb = fix(x.text); i++; break; } // blurb closes the card
      break; // no clip: this p starts the next card
    }
    if (x.t === 'display' || x.t === 'eyebrow') break;
  }
  card.category = metaP[0];
  card.dates = metaP.at(-1);
  delete card._seeMore;
  Object.assign(card, CARDS[card.title] ?? {});
  if (card.media) card.media.alt = `${card.title}: ${card.blurb ?? card.category}`;
  return card;
}
while (b[i]?.t === 'media' && b[i].w >= 1000) home.selectedWork.cards.push(readCard('project'));

// Also Built
const ab = [];
for (; i < b.length && b[i].t !== 'display'; i++) ab.push(b[i]);
const abP = ab.filter((x) => x.t === 'p').map((x) => fix(x.text)).filter(Boolean);
home.alsoBuilt.label = abP[0];
home.alsoBuilt.dates = abP.find((t) => /\d{4}\s*-\s*\w+ \d{4}/.test(t));
for (let k = 0; k < ab.length; k++) {
  if (ab[k].t === 'media') {
    const title = fix(ab[k + 1].text); const blurb = fix(ab[k + 2].text);
    home.alsoBuilt.cards.push({ title, blurb, image: ab[k].src, ...(SMALL[title] ?? { accent: '#5A565F' }) });
  }
}
const dropped = [];
const more = ab.find((x) => x.t === 'p' && /Everything else/.test(x.text));
if (more) dropped.push(`Also Built footer "${more.text}" (malachek.itch.io is not on the whitelist)`);
dropped.push('Night Walk itch link (peteryoon.itch.io/night-walk is not on the whitelist)');

// Experience + leadership sections
while (b[i]?.t === 'display' && b[i].text !== 'Skills') {
  const section = { heading: b[i].text, cards: [] };
  i++;
  while (b[i] && b[i].t !== 'display') section.cards.push(readCard('experience'));
  // A second group ("Leadership Experience") is a card whose category differs; keep it in the same list.
  home.experience.push(section);
}
// Skills
home.skills.heading = b[i].text; i++;
for (; i < b.length && b[i].t === 'p'; i++) {
  const [label, items] = fix(b[i].text).split(/\s+—\s+/);
  home.skills.lines.push({ label, items: items.split(/\s+·\s+/) });
}

await writeFile(target, `# Homepage content (generalist variant). Ported from the live site; edit freely.\n${stringify(home, { lineWidth: 0 })}`);
console.log(`wrote home.yaml: ${home.selectedWork.cards.length} work cards, ${home.alsoBuilt.cards.length} also-built, ${home.experience.map((s) => `${s.heading} (${s.cards.length})`).join(', ')}`);
console.log('Dropped (not on the URL whitelist):\n  - ' + dropped.join('\n  - '));
