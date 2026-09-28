import { defineConfig } from 'astro/config';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

/**
 * Dev-only pages live under src/pages/lab (component showcase, hero options, the matrix).
 * They are useful locally and must never ship, so they are deleted from the build output.
 */
const stripDevPages = {
  name: 'strip-dev-pages',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('./lab/', dir), { recursive: true, force: true });
    },
  },
};

/**
 * Dev-server only: GET /__grab?src=<figma asset url>&to=art/<file> saves a design asset
 * into public/. Lets the sandboxed assistant pull Figma exports through this Mac.
 * Restricted to Figma asset URLs and public/art/.
 */
const devAssetGrab = {
  name: 'dev-asset-grab',
  apply: /** @type {'serve'} */ ('serve'),
  configureServer(server) {
    server.middlewares.use('/__grab', async (req, res) => {
      try {
        const q = new URL(req.url ?? '', 'http://x').searchParams;
        const src = q.get('src') ?? '';
        const to = q.get('to') ?? '';
        if (!src.startsWith('https://www.figma.com/api/mcp/asset/') || !/^art\/[\w.-]+$/.test(to)) {
          res.statusCode = 400;
          return res.end('bad request');
        }
        const r = await fetch(src);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const buf = Buffer.from(await r.arrayBuffer());
        const target = new URL(`./public/${to}`, import.meta.url);
        await mkdir(new URL('./', target), { recursive: true });
        await writeFile(target, buf);
        res.end(`saved ${to} ${buf.length} bytes ${r.headers.get('content-type')}`);
      } catch (e) {
        res.statusCode = 500;
        res.end(String(e));
      }
    });
  },
};

/**
 * Dev-server only: GET /__task?name=check|build|qa runs that npm script on this Mac
 * and returns its output, so the assistant can type-check and build while its own
 * sandbox has no npm. Fixed allowlist; the dev server only listens on localhost.
 */
const devTasks = {
  name: 'dev-tasks',
  apply: /** @type {'serve'} */ ('serve'),
  configureServer(server) {
    const allowed = { check: ['run', 'check'], build: ['run', 'build'], qa: ['run', 'qa'] };
    server.middlewares.use('/__task', (req, res) => {
      const name = new URL(req.url ?? '', 'http://x').searchParams.get('name') ?? '';
      const args = allowed[/** @type {keyof typeof allowed} */ (name)];
      if (!args) { res.statusCode = 400; return res.end('unknown task'); }
      const child = spawn('npm', args, { cwd: fileURLToPath(new URL('.', import.meta.url)), env: { ...process.env, FORCE_COLOR: '0' } });
      let out = '';
      child.stdout.on('data', (d) => (out += d));
      child.stderr.on('data', (d) => (out += d));
      child.on('close', (code) => { res.setHeader('Content-Type', 'text/plain'); res.end(`exit ${code}\n${out.slice(-20000)}`); });
    });
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
    plugins: [devAssetGrab, devTasks],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  },
});










