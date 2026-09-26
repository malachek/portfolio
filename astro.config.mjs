// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Dev-only pages live under src/pages/dev (component showcase, and later /_matrix).
 * They are useful locally and must never ship, so they are deleted from the build output.
 */
const stripDevPages = {
  name: 'strip-dev-pages',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('./dev/', dir), { recursive: true, force: true });
    },
  },
};

export default defineConfig({
  site: 'https://malachek.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [stripDevPages],
  // Old and alternate paths that links in the wild may use. Real 301s move to the
  // Worker at deploy time; these keep them working in every environment meanwhile.
  redirects: {
    '/cora': '/taralumen-cora',
  },
  vite: {
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  },
});
