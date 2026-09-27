#!/usr/bin/env node
/**
 * Upload a video (or any big media file) to the Cloudflare R2 bucket and print
 * the URL to paste into the editor or a content file.
 *
 *   npm run media:upload -- path/to/clip.mp4
 *   npm run media:upload -- path/to/clip.mp4 exo/movement.mp4   (choose the name)
 *
 * Needs a one-time `npx wrangler login`. Videos never go in git (see EDITING.md).
 * Encode first per resume-system/portfolio/00-ASSET-PIPELINE.md: MP4 (H.264), no GIFs.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { basename } from 'node:path';

const BUCKET = process.env.MEDIA_BUCKET ?? 'malachek-media';
const PUBLIC_BASE = process.env.MEDIA_BASE ?? 'https://media.malachek.com';

const [file, keyArg] = process.argv.slice(2);
if (!file || !existsSync(file)) {
  console.error('Usage: npm run media:upload -- <file> [name-in-bucket]');
  process.exit(1);
}
if (/\.gif$/i.test(file)) {
  console.error('GIFs are not used on the site. Convert to MP4 first (see 00-ASSET-PIPELINE.md).');
  process.exit(1);
}
const key = (keyArg ?? basename(file)).replace(/^\/+/, '').replace(/\s+/g, '-').toLowerCase();
const mb = (statSync(file).size / 1e6).toFixed(1);
const type = /\.mp4$/i.test(file) ? 'video/mp4' : /\.webm$/i.test(file) ? 'video/webm' : undefined;

console.log(`Uploading ${file} (${mb} MB) to ${BUCKET}/${key} ...`);
const args = ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${key}`, '--file', file, '--remote'];
if (type) args.push('--content-type', type);
const r = spawnSync('npx', args, { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`\nDone. Paste this URL where the video goes:\n\n  ${PUBLIC_BASE}/${key}\n`);
