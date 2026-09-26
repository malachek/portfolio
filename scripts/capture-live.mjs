#!/usr/bin/env node
/**
 * Captures the live Figma Sites build as the visual baseline for the rebuild.
 *
 *   npm run baseline
 *
 * For every page, at 1280 / 800 / 374:
 *   baseline/screens/<page>-<width>.jpg   full-page screenshot
 *   baseline/computed-styles.json         distinct text and box styles per page and width
 * And once per page at 1280:
 *   baseline/live/<page>.json             structure + verbatim copy + media URLs
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { extractPage, probeStyles } from './lib/extract-page.js';

const SITE = process.env.LIVE_SITE ?? 'https://malachek.com';
const PAGES = ['', 'exo', 'the-fallen', 'kawaiian-isolation', 'burning-out', 'burnt-out-games-llc', 'vgdc', 'taralumen-cora', 'resume'];
const WIDTHS = [1280, 800, 374];

const root = new URL('../baseline/', import.meta.url);
await mkdir(new URL('screens/', root), { recursive: true });
await mkdir(new URL('live/', root), { recursive: true });

const browser = await chromium.launch();
const styles = {};

async function settle(page) {
  // Scroll the whole page so lazy media loads, then return to the top.
  await page.evaluate(async () => {
    const step = innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  for (const slug of PAGES) {
    const name = slug || 'home';
    const url = `${SITE}/${slug}`;
    process.stdout.write(`${width}px  /${slug} ... `);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
      await settle(page);
      await page.screenshot({ path: new URL(`screens/${name}-${width}.jpg`, root).pathname, fullPage: true, type: 'jpeg', quality: 70 });
      (styles[name] ??= {})[width] = await page.evaluate(probeStyles);
      if (width === 1280) {
        const data = await page.evaluate(extractPage);
        await writeFile(new URL(`live/${name}.json`, root), JSON.stringify(data, null, 2));
      }
      console.log('ok');
    } catch (err) {
      console.log(`FAILED: ${err.message.split('\n')[0]}`);
    }
  }
  await context.close();
}

await writeFile(new URL('computed-styles.json', root), JSON.stringify(styles, null, 2));
await browser.close();
console.log('\nDone. Baseline written to baseline/.');
