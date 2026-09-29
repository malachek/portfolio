#!/usr/bin/env node
/**
 * Content QA over the built site (run `npm run build` first, then `npm run qa`).
 *
 *  1. Links: every outside <a href> must be on the whitelist in
 *     resume-system/master/00-contact.md (or a malachek.com role host / mailto).
 *  2. Internal links: every /path an <a> points at must exist in dist/.
 *  3. Fact locks from the brief, grepped in the visible text of every page.
 *
 * Exit code 1 if anything fails, so it can gate a deploy.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const CONTACT = process.env.CONTACT_MD ?? new URL('../../../resume-system/master/00-contact.md', import.meta.url).pathname;

if (!existsSync(DIST)) { console.error('No dist/. Run npm run build first.'); process.exit(1); }

// ---- whitelist ----
const norm = (u) => u.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').toLowerCase();
let whitelist = [];
if (existsSync(CONTACT)) {
  const md = readFileSync(CONTACT, 'utf8');
  const cells = [...md.matchAll(/\|\s*[^|]+\|\s*([a-z0-9.-]+\.[a-z]{2,}[^\s|]*)\s*\|/gi)].map((m) => m[1]);
  const bullets = [...md.matchAll(/—\s+([a-z0-9.-]+\.[a-z]{2,}\/[^\s·]+)/gi)].map((m) => m[1]);
  whitelist = [...cells, ...bullets].map(norm);
} else {
  console.warn(`! Whitelist file not found at ${CONTACT}; set CONTACT_MD=path/to/00-contact.md`);
}
const roleHosts = JSON.parse(readFileSync(join(DIST, 'roles.json'), 'utf8')).roles;
const hosts = Object.values(roleHosts).map((h) => h.toLowerCase());
const allowedExternal = (href) => {
  const n = norm(href);
  if (hosts.some((h) => n === h || n.startsWith(`${h}/`))) return true;
  return whitelist.some((w) => n === w || n.startsWith(`${w}/`) || n.startsWith(`${w}?`));
};

// ---- pages ----
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } };
walk(DIST);

const problems = [];
const warn = [];
const exists = (path) => {
  const clean = decodeURI(path.split('#')[0].split('?')[0]);
  if (clean === '' ) return true;
  const p = join(DIST, clean);
  return existsSync(p) && statSync(p).isFile() ? true : existsSync(join(p, 'index.html')) || existsSync(`${p}.html`);
};

const LOCKS = [
  { re: /\bREST API\b/i, msg: 'EXO Discord login is OAuth2 with PKCE, never "REST API"' },
  { re: /\bHattas\b/i, msg: 'Hattas is cancelled; never mention it' },
  { re: /\bGames Director\b/i, msg: '"Games Director" is retired' },
  { re: /(?<!UE5 )\bBlueprints?\b/, msg: 'Always "UE5 Blueprints"', soft: true },
  { re: /\bstudents?\b/i, msg: 'Avoid "student"', soft: true },
  { re: /[^.!?]*\b(EXO|CORA)\b[^.!?]*\bshipped\b[^.!?]*/i, msg: 'EXO / CORA are never "shipped"', soft: true },
  { re: /[^.!?]*\b(The Fallen|Night Walk|Loonage)\b[^.!?]*\b(\d+(st|nd|rd|th) place|ranked|placed|winner)\b/i, msg: 'No rankings for The Fallen, Night Walk, Loonage' },
  { re: /\bPintos\b[^.!?]*github\.com/i, msg: 'Pintos code is never published' },
];

for (const file of pages) {
  const rel = '/' + relative(DIST, file);
  if (rel.startsWith('/admin/')) continue;
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(mailto:|#)/.test(href)) continue;
    if (/^https?:/.test(href)) { if (!allowedExternal(href)) problems.push(`${rel}: link not on the whitelist: ${href}`); continue; }
    if (href.startsWith('/') && !exists(href)) problems.push(`${rel}: broken internal link: ${href}`);
  }
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ');
  for (const lock of LOCKS) {
    const m = text.match(lock.re);
    if (m) (lock.soft ? warn : problems).push(`${rel}: ${lock.msg}: "…${m[0].trim().slice(0, 140)}…"`);
  }
  const dashes = (text.match(/—/g) ?? []).length;
  if (dashes > 2) warn.push(`${rel}: ${dashes} em dashes (avoid where possible)`);
}

const uniq = (a) => [...new Set(a)];
console.log(`Checked ${pages.length} pages against ${whitelist.length} whitelisted URLs.`);
if (warn.length) console.log(`\nReview (${uniq(warn).length}):\n  ` + uniq(warn).join('\n  '));
if (problems.length) {
  console.log(`\nFAIL (${uniq(problems).length}):\n  ` + uniq(problems).join('\n  '));
  process.exit(1);
}
console.log('\nPASS: no whitelist, link or fact-lock failures.');
