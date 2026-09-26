# malachek.com

Malachy Kennedy's portfolio, rebuilt in code from the approved Figma design, with role-tailored
variants (gameplay, tools, design, generalist) generated from one codebase and one content source.

- **Stack:** Astro (static), plain CSS custom properties, TypeScript, Zod-validated content.
- **Hosting:** Cloudflare Workers static assets (set up in a later step).
- **Decisions:** see `DECISIONS.md`. **Design measurements:** see `docs/design-baseline.md`.

## Run it on your Mac

Open Terminal, then paste these one at a time:

```bash
cd ~/Documents/GitHub/portfolio
npm install
npm run dev
```

Leave that Terminal window open. The site is now at http://localhost:4321, and the component
showcase is at http://localhost:4321/dev/components. Press `Ctrl + C` in Terminal to stop it.
