#!/usr/bin/env node
/**
 * Screenshot helper for design review. Leave it running in its own Terminal window:
 *
 *   npm run shots
 *
 * It watches .shots/request.json. Each request is a list of
 *   { name, url, width, height?, fullPage?, scrollTo?, clip?: {x,y,width,height}, waitMs? }
 * and it writes .shots/out/<name>.png, then .shots/done.json. Press Ctrl+C to stop.
 * A request item of the form { download: url, to: 'public/…' } saves that file into the
 * project instead (used to pull design assets the sandbox can't reach).
 */
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';

const dir = new URL('../.shots/', import.meta.url);
const out = new URL('out/', dir);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
let last = 0;
console.log('Screenshot helper running. Leave this window open (Ctrl+C to stop).');

async function run(req) {
  const results = [];
  for (const r of req) {
    if (r.download) {
      try {
        const res = await fetch(r.download);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const target = new URL(`../${r.to}`, import.meta.url);
        await mkdir(new URL('./', target), { recursive: true });
        await writeFile(target, Buffer.from(await res.arrayBuffer()));
        results.push({ name: r.to, ok: true, type: res.headers.get('content-type') });
      } catch (e) {
        results.push({ name: r.to, ok: false, error: e.message });
      }
      continue;
    }
    const ctx = await browser.newContext({ viewport: { width: r.width ?? 1280, height: r.height ?? 900 }, deviceScaleFactor: r.scale ?? 1, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    try {
      await page.goto(r.url, { waitUntil: 'networkidle', timeout: 60_000 });
      if (r.scrollTo != null) await page.evaluate((y) => scrollTo(0, y), r.scrollTo);
      await page.waitForTimeout(r.waitMs ?? 1200);
      await page.screenshot({ path: new URL(`${r.name}.png`, out).pathname, fullPage: !!r.fullPage, clip: r.clip });
      results.push({ name: r.name, ok: true });
    } catch (e) {
      results.push({ name: r.name, ok: false, error: e.message.split('\n')[0] });
    }
    await ctx.close();
  }
  return results;
}

for (;;) {
  try {
    const s = await stat(new URL('request.json', dir));
    if (s.mtimeMs > last) {
      last = s.mtimeMs;
      const req = JSON.parse(await readFile(new URL('request.json', dir), 'utf8'));
      const results = await run(req);
      await writeFile(new URL('done.json', dir), JSON.stringify({ at: Date.now(), requestMtime: last, results }, null, 2));
      console.log(`${new Date().toLocaleTimeString()}  ${results.filter((r) => r.ok).length}/${results.length} shots`);
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}
