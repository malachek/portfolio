# DECISIONS — malachek.com code rebuild

Settled choices. Do not re-ask. Every new decision gets a dated line here.

## Phase 0 (2026-09-26)

| # | Question | Decision |
|---|---|---|
| 1 | Hosting | Cloudflare Workers static assets + Host→folder Worker, deployed by Workers Builds from GitHub. (Verify current free-tier file size/count limits before committing.) |
| 2 | Apex | malachek.com serves the Generalist (dev) variant directly, with a lens switcher in the nav. dev.malachek.com 301s to the apex. Old Figma paths keep resolving. |
| 3 | v1 variants | Generalist (apex), Gameplay, Tools, Design. Production + Software = phase 2. |
| 4 | CMS | Sveltia CMS at /admin, GitHub OAuth via a Cloudflare Worker (same pattern as burntoutgames.com). "By role" and "By project" views over the same files. |
| 5 | Video | Cloudflare R2 on media.malachek.com. MP4 (H.264) + optional WebM, no GIFs. `npm run media:upload <file>` prints the URL. |
| 6 | Repo | `malachek/portfolio`, public. No NDA material in it. |
| 7 | New pages | The Fallen, Burnt Out Games (already planned) + Night Walk, Loonage, Limital, Little Rockstar, Comments. Search Engine + Pintos with phase-2 software variant. Drafted from master/ facts only; inferred sentences marked `<!-- VERIFY -->`. |
| 8 | Resume PDFs | Build 4 untailored track PDFs with build_resume.py (Generalist, Gameplay, Tools, Design); Malachy approves each before it goes live. |
| 9 | Figma MCP | Yes. Portfolio-Ref (fileKey bxnKAhmMJZwlMsyGW2tpCb) confirmed readable 2026-09-26. |

## Carried-over settled items
- Pintos / CS121 crawler / 122a code are NOT published (resume-system/portfolio/03-code-samples-plan.md). The site gets a write-up + "code available on request".
- Token decisions in the project prompt §3 (purple / purple-text, muted / muted-text, Roboto Black subsection headings, Roboto Bold instead of Inter) are settled.

## Build step 1 (2026-09-26)
- Framework: Astro 5, static output, plain CSS custom properties, no Tailwind. Fonts self-hosted via Fontsource (Roboto 400 / 500 italic / 700 / 700 italic / 900, Jersey 10). Brand icons from simple-icons (CC0) as inline SVG.
- Rendered type sizes come from the live site's computed styles, because Figma Sites' per-breakpoint text overrides are not exposed by the Figma API. Details in `docs/design-baseline.md`.
- Where the Figma file and `14-COMPONENT-SPEC.md` disagree, the file wins (media capsules padded, 24px capsule gap, 36px section gap). Listed in `docs/design-baseline.md`.
- Dev-only pages live in `src/pages/dev/` and are deleted from production builds.

## Found during Phase 0 — needs fixing
- `resume-system/master/00-contact.md` whitelist lists `malachek.com/cora`, but the live URL is `/taralumen-cora`. The rebuild keeps `/taralumen-cora` and adds `/cora` as a redirect so both resolve; whitelist to be corrected.
- Open in resume-system/portfolio/README.md: presidency start month; BOG title set (3 in 4-1 vs 4 in CLAUDE.md).

## Build step 2 (2026-09-26)
- Copy source: the **live site** (newer than 18-FINAL-COPY.md in places), captured by `npm run baseline` into `baseline/live/*.json` and ported verbatim by `scripts/import-live.mjs` / `scripts/import-home.mjs`. Only fact-lock fixes applied automatically (Blueprints → UE5 Blueprints).
- Every project page has its own accent (rules, pills, chips), taken from its card on the homepage: EXO #D52FC7, The Fallen #B38C1D, Kawai'ian Isolation #FF3399, Burning Out #E34622, Burnt Out Games #F05F23, CORA #D88394, VGDC #6D6EF5.
- The live site's tablet and phone layouts are missing content that desktop has (e.g. VGDC's Design section, an older EXO Camera block). The rebuild shows the desktop content at every size.
- Media still streams from malachek.com/_videos and /_assets for now; it moves to R2 before the DNS cutover.
- Per-page SEO titles/descriptions from resume-system/portfolio/15-seo-metadata.md (em dashes swapped for colons).
- URLs not on the whitelist were dropped: peteryoon.itch.io/night-walk, malachek.itch.io ("Everything else" line). /resume still embeds the Google Drive PDF until per-role PDFs exist.
