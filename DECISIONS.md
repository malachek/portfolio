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
- URLs not on the whitelist were dropped: malachek.itch.io ("Everything else" line). peteryoon.itch.io/night-walk was confirmed correct by Malachy and added to the whitelist. /resume still embeds the Google Drive PDF until per-role PDFs exist.

## Design fidelity pass (2026-09-26)
Goal from Malachy: keep 90-95% of the Figma design, fix what looks off, tidy to web standards.
- Gameplay videos autoplay muted and looped with no player UI, even with Reduce Motion on (his call). They pause while off screen.
- Site header is sticky. Section headings stick at the top underneath it, so the heading text lands just below the header, like the live site.
- Header content spans the same 1080px as the live site on desktop (name at x100).
- List bullets are small dots (Figma), not the default disc.
- Chips: 3px 6px padding (Figma's 2px sides read cramped). Chip and code-link text raised to 14px on tablet and 12px on phone, because 10px is below a readable size. Phone chips wrap and center instead of scrolling sideways.
- Card icons run GitHub, Steam, itch, website (Figma order).
- Card clips fill their frame (cover, 16px radius) instead of letterboxing on black.
- Phone cards: date row split left/right, tighter title/chips/rule spacing, section rule inset to line up with the heading text.
- Burnt Out Games gets its Figma backing: the ember pattern (`public/art/bog-pattern.jpg`, tiled at 300px) behind the page hero and the home experience card. New optional `pattern` field on project heroes and home cards. Re-running the importers with `--force` would drop it.
- `astro.config.mjs` has a dev-server-only `/__grab` route that saves a Figma asset URL into `public/art/`, so design assets can be pulled while the sandbox has no internet. It is not part of the built site.

## Review round 1 fixes (2026-09-26)
- Media rule: logos and content (videos, screenshots, thumbnails) are **fitted**, never cropped; only backgrounds **fill**.
- Homepage hero art is the four game key arts side by side (`hero.tiles` in home.yaml): 4 across on desktop and tablet (so tablet shows all four), 2x2 on phones.
- Homepage cards: the whole inner capsule is the link (as on the live site), with a hover state (darken and accent outline). On tablet, where a card splits into a text capsule and a media capsule, both light up together. Icon links and See More stay separately clickable. Also Built cards with a page or a single outside link are clickable as a whole.
- Also Built: label only, no date (the band covers many projects). Grid is 3 / 3 / 2 across; titles and icons stay on one line.
- Phone gutters 24px (file: 16) and roomier card padding.
- Header rebuilt as one row at every size, 48px tall, with a hairline and a light blur. Icons sit after the links; they drop out below 360px wide. Section titles stick just below it.
- Footer rebuilt: name and availability on the left, email / GitHub / LinkedIn with icons on the right, then a base row with the copyright and page links. The file's footer repeated the header, which read as a second header.
- Questions raised while working unattended live in `docs/QUESTIONS.md`.

## Build steps 3 to 6: content model and role sites (2026-09-26)
- Files: `src/content/roles/<role>.yaml` (one per site), `src/content/projects/<name>/_base.md` (shared facts, the full page, the homepage `card:` and the Also Built `small:` card), and `src/content/projects/<name>/<role>.md` overlays. The homepage data that used to live in `home.yaml` now lives in the role file (hero, order, skills) and in each project's `card:`.
- Merge rule (src/lib/content.ts): overlay wins field by field; objects merge key by key, lists replace whole. An overlay file existing is what puts a project on that role.
- Deviation from the brief, for less typing: an overlay that does not list `sections:` shows every section in `_base` order. Listing `sections:` sets order and visibility. `hideBlocks`, `blockOverrides`, `sectionOverrides` and `extraSections` cover the rest.
- Projects without a page (`page: false`): Night Walk, Trick or Treat, Loonage, Limital, Comments, Search Engine, Pintos. They appear as Also Built cards.
- URL layout in the build: generalist at the root (/, /exo …, the old Figma paths), other roles under /gameplay/, /tools/, /design/. Links inside a role are prefixed paths. In production the Worker serves each role at its own host and rewrites those prefixed links (see `worker/`).
- Dev-only pages moved from /dev to /lab (so /dev never collides with a role): /lab/components, /lab/hero-options, /lab/matrix (the projects x roles grid; click a cell to open its file in VS Code).
- Role switcher ("Viewing: Generalist · Gameplay · Tools · Design") sits under the header on every role homepage.
- Role copy comes from the per-track bullets in resume-system/master; each overlay's comment names its source. New sentences are listed in docs/QUESTIONS.md.
