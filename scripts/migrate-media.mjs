#!/usr/bin/env node
/**
 * Move every image and video the site still loads from Figma Sites
 * (https://malachek.com/_assets/... and /_videos/...) onto our own hosting,
 * so nothing breaks when malachek.com stops pointing at Figma.
 *
 *   npm run media:migrate -- setup    create the R2 bucket (safe to re-run) and show its domains
 *   npm run media:migrate -- images   download images into public/art/live/ and rewrite the URLs
 *   npm run media:migrate -- videos   download videos, upload them to R2, rewrite to media.malachek.com
 *   npm run media:migrate -- scan     just list what is still on Figma
 *
 * Needs a one-time `npx wrangler login` (for setup and videos).
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const BUCKET = 'malachek-media';
const MEDIA_BASE = 'https://media.malachek.com';
const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const IMG_DIR = join(ROOT, 'public/art/live');
const CACHE = join(ROOT, '.media-cache');
const RE = /https:\/\/malachek\.com\/_(assets|videos)\/[^\s"'<>)]+/g;

const mode = process.argv[2] ?? 'scan';

function files(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) files(p, out);
    else if (/\.(md|ya?ml|astro|ts|mjs|json)$/.test(n)) out.push(p);
  }
  return out;
}

function scan() {
  const found = new Map(); // url -> Set(files)
  for (const f of files(SRC)) {
    for (const m of readFileSync(f, 'utf8').matchAll(RE)) {
      const u = m[0].replace(/[.,;]+$/, '');
      if (!found.has(u)) found.set(u, new Set());
      found.get(u).add(f);
    }
  }
  return found;
}

function rewrite(map) {
  let n = 0;
  for (const f of files(SRC)) {
    let s = readFileSync(f, 'utf8');
    const before = s;
    for (const [from, to] of map) s = s.split(from).join(to);
    if (s !== before) { writeFileSync(f, s); n++; }
  }
  return n;
}

const extFor = (type, url) => {
  if (/png/.test(type)) return '.png';
  if (/jpe?g/.test(type)) return '.jpg';
  if (/webp/.test(type)) return '.webp';
  if (/gif/.test(type)) return '.gif';
  if (/svg/.test(type)) return '.svg';
  if (/mp4/.test(type)) return '.mp4';
  if (/webm/.test(type)) return '.webm';
  return extname(new URL(url).pathname) || '.bin';
};

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get('content-type') ?? '';
  return { buf: Buffer.from(await res.arrayBuffer()), type };
}

function wrangler(args) {
  const r = spawnSync('npx', ['wrangler', ...args], { encoding: 'utf8' });
  const out = (r.stdout ?? '') + (r.stderr ?? '');
  console.log(`$ wrangler ${args.join(' ')}\n${out.trim()}\n`);
  return { ok: r.status === 0, out };
}

const found = scan();
const images = [...found.keys()].filter((u) => u.includes('/_assets/'));
const videos = [...found.keys()].filter((u) => u.includes('/_videos/'));

if (mode === 'scan') {
  console.log(`Still on Figma: ${images.length} images, ${videos.length} videos.`);
  for (const u of [...images, ...videos]) console.log(`  ${u}`);
} else if (mode === 'setup') {
  wrangler(['whoami']);
  const list = wrangler(['r2', 'bucket', 'list']);
  if (!list.out.includes(BUCKET)) wrangler(['r2', 'bucket', 'create', BUCKET]);
  wrangler(['r2', 'bucket', 'domain', 'list', BUCKET]);
} else if (mode === 'images') {
  mkdirSync(IMG_DIR, { recursive: true });
  const map = new Map();
  for (const url of images) {
    const u = new URL(url);
    const hash = u.pathname.split('/').pop();
    const w = u.searchParams.get('w');
    try {
      const { buf, type } = await download(url);
      const name = `${hash}${w ? `-w${w}` : ''}${extFor(type, url)}`;
      writeFileSync(join(IMG_DIR, name), buf);
      map.set(url, `/art/live/${name}`);
      console.log(`ok  ${(buf.length / 1024).toFixed(0).padStart(6)} KB  ${name}`);
    } catch (e) {
      console.log(`ERR ${url}: ${e.message}`);
    }
  }
  console.log(`\nRewrote ${rewrite(map)} files. ${map.size}/${images.length} images moved.`);
} else if (mode === 'videos') {
  mkdirSync(CACHE, { recursive: true });
  const map = new Map();
  for (const url of videos) {
    const hash = new URL(url).pathname.split('/').pop();
    try {
      const { buf, type } = await download(url);
      const ext = extFor(type, url);
      const key = `live/${hash}${ext}`;
      const local = join(CACHE, `${hash}${ext}`);
      writeFileSync(local, buf);
      const put = wrangler(['r2', 'object', 'put', `${BUCKET}/${key}`, '--file', local, '--remote', '--content-type', type || 'video/mp4']);
      if (!put.ok) throw new Error('upload failed');
      map.set(url, `${MEDIA_BASE}/${key}`);
      console.log(`ok  ${(buf.length / 1e6).toFixed(1).padStart(6)} MB  ${key}`);
    } catch (e) {
      console.log(`ERR ${url}: ${e.message}`);
    }
  }
  console.log(`\nRewrote ${rewrite(map)} files. ${map.size}/${videos.length} videos moved.`);
} else if (mode === 'reupload') {
  // Re-upload the faststart copies in .media-cache/fast/ (moov atom first, made with
  // `ffmpeg -c copy -movflags +faststart`) under live/v2/ with an explicit
  // video/mp4 type, then point the content at them. New keys, so no stale edge cache.
  const dir = join(CACHE, 'fast');
  const map = new Map();
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.mp4'))) {
    const hash = f.replace(/\.mp4$/, '');
    const put = wrangler(['r2', 'object', 'put', `${BUCKET}/live/v2/${f}`, '--file', join(dir, f), '--remote', '--content-type', 'video/mp4', '--cache-control', 'public, max-age=31536000, immutable']);
    if (!put.ok) { console.log(`ERR ${f}`); continue; }
    map.set(`${MEDIA_BASE}/live/${hash}.mp4`, `${MEDIA_BASE}/live/v2/${hash}.mp4`);
    console.log(`ok  live/v2/${f}`);
  }
  console.log(`\nRewrote ${rewrite(map)} files. ${map.size} videos re-uploaded.`);
} else {
  console.log('Usage: npm run media:migrate -- scan|setup|images|videos|reupload');
}
