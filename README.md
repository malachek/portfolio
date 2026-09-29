# malachek.com

Malachy Kennedy's portfolio, rebuilt in code from the approved Figma design, with role-tailored
variants (gameplay, tools, design, generalist) generated from one codebase and one content source.

- **Stack:** Astro (static), plain CSS custom properties, TypeScript, Zod-validated content.
- **Hosting:** Cloudflare Workers static assets + a small Worker (`worker/index.js`, `wrangler.jsonc`) that maps each host to its role folder.
- **Editing:** see `EDITING.md` (editor at /admin/, or VS Code). **Open questions:** `docs/QUESTIONS.md`.
- **Decisions:** see `DECISIONS.md`. **Design measurements:** see `docs/design-baseline.md`.

## Run it on your Mac

Open Terminal, then paste these one at a time:

```bash
cd ~/Documents/GitHub/portfolio
npm install
npm run dev
```

Leave that Terminal window open. The sites are now at:

- http://localhost:4321/ (Generalist), /gameplay/, /tools/, /design/ (and drafts such as /software/)
- http://localhost:4321/lab/matrix: every project against every role site
- http://localhost:4321/lab/components and /lab/hero-options: dev-only pages
- http://localhost:4321/admin/index.html: the editor

Press `Ctrl + C` in Terminal to stop it.

## Other commands

| Command | What it does |
|---|---|
| `npm run build` | Type-check and build every role site into `dist/` |
| `npm run qa` | After a build: links vs. the whitelist, broken links, fact locks |
| `npm run media:upload -- <file>` | Upload a video to R2 and print its URL |
| `npm run shots` | Screenshot helper used for design review (leave running) |
