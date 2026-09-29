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

## Hosting pieces (2026-09-26)
- `worker/index.js` + `wrangler.jsonc`: one Worker with static assets. Apex serves the root of dist/; each role host serves dist/<role>/ and gets its links de-prefixed with HTMLRewriter; the role switcher points at each role's own host; dev. and www. 301 to the apex; a /gameplay/... path typed on the apex 301s to gameplay.malachek.com. On *.workers.dev everything is served as built (/, /gameplay/, /tools/, /design/), which is the preview.
- Role to host mapping has one source: roles/*.yaml, published as /roles.json for the Worker.
- Per-role sitemap.xml; robots.txt per host (from the Worker on role hosts); a 404 page.
- No custom domains in wrangler.jsonc yet: adding them is the DNS step and waits for Malachy's go.
- Dev-server helpers (never in the build): /__grab saves a Figma asset into public/art; /__task?name=check|build runs that npm script and returns the output, so the assistant can type-check from its sandbox.

## Build step 7: editor (2026-09-26)
- Sveltia CMS at /admin/ (public/admin/index.html). Its config is generated at build time from the content folders (`src/pages/cms-config.yml.ts` → /cms-config.yml), so new projects and roles appear in the editor automatically.
- Views: one collection per role site ("Gameplay site: projects"), one per project ("Project: EXO", its _base plus every role file), and "Role sites and site settings".
- Sign-in: "Work with Local Repository" (Chrome, on his Mac) and GitHub fine-grained access token work with no server. The OAuth Worker for "Sign In with GitHub" is optional and not set up.
- Images upload to public/art; videos are R2 URLs (`npm run media:upload`).
- Found and fixed a duplicate block id in vgdc/_base.md (`output-text` twice; the second is now `output-summary`). Block ids must now be unique per project (schema check).
- EDITING.md written for both paths (editor and VS Code).

## Build step 8 and QA tooling (2026-09-26)
- New pages drafted from master/06-projects facts in VOICE.md voice: /night-walk, /loonage, /limital, /comments, /little-rockstar (each on the roles that list it; inferred lines marked `# VERIFY` in the files). Pages without key art get a soft accent-colored glow in the hero.
- Little Rockstar added to the Tools site's Also Built.
- `npm run qa` (scripts/qa.mjs) checks the built site: outside links against the 00-contact.md whitelist, internal links against dist/, and the fact locks (hard fails) plus review items (UE5 Blueprints, "student", EXO/CORA "shipped", em dashes). First run: PASS; review items are the base copy already listed in the questions.
- Skills lines use "Languages: C++ · …" instead of an em dash; the generalist SEO title uses "|" instead of an em dash.

## Phase 2 scaffold (2026-09-26)
- `roles/software.yaml` (enabled: false): hero leads with shipped products; featured Pintos, Search Engine, EXO, Kawai'ian Isolation. Pintos and Search Engine have write-up pages on this role only; other roles keep them as small cards (`page: false` in their overlay, a new overlay field). No coursework code is linked.
- Unpublished roles show on the local dev server (switcher marks them "(draft)") and are skipped by the production build.
- Production: not started, pending the research the brief asks for.

## Resumes per role (2026-09-27)
- One resume per role, built with resume-system rules (output/portfolio-<role>/, accepted copies in final/). Malachy uploaded them to Google Drive (shared: anyone with the link can view).
- `roles/<role>.yaml → resumeDriveId` holds the Drive file id; each role's /resume page embeds its own PDF. Generalist: Game Engineer; Gameplay: Gameplay Engineer; Tools: Tools Engineer; Design: Technical Game Designer.
- EXO release date: set when the publisher says; every "Q3 2026" removed from the site.

## Card and tag hovers, header options (2026-09-27)
- Homepage cards have two hover targets: the text part and the media part, each a link to the project, each with an accent ring drawn outside it (outline, 4px offset) and a slight darken. Hovering the media part zooms the clip 5%.
- Tags grow and tilt on hover; each tag has its own stable pseudo-random tilt (-4..4°), and hovering a row ruffles every tag a little with a staggered delay, like riffling a deck. Clicking a tag opens the project.
- These hover motions stay on under Reduce Motion (small, pointer-triggered, no loops), matching the call on autoplay clips.
- Header layout options B–E at /lab/header-options (A = current).
- Preview live at malachek-portfolio.malachykennedy1.workers.dev (Workers Builds from GitHub main). Checked: all roles, pages, trailing-slash redirects, /cora, sitemaps, admin; drafts and /lab are absent.

## Buttons and mobile card hover (2026-09-28)
- Link buttons (LinkPill) rebuilt: same padding at every size (40px tall, 44px on phones), bold label, trailing arrow (→ internal, ↗ external, opens a new tab), soft shadow, lift on hover. The cramped Figma-computed 4px/2px tablet and phone padding is gone.
- Button colours come from src/lib/color.ts: white text on the accent darkened just enough for 4.5:1; pale accents keep their colour and take dark text. Pages expose `--accent-btn` / `--accent-ink` next to `--accent`.
- Code-sample link no longer underlined; it breaks after "/" on narrow screens.
- Steam store widget scales down to fit on phones instead of clipping.
- Home feature cards: text and media hover separately on desktop and tablet only. On phones (<800px) they are one capsule, so the whole capsule is one link with one ring, and hovering anywhere zooms the video.

## Header option H (2026-09-28)
- The header now stacks the role's job title (a dropdown) over the name. The dropdown lists every role site by job title and host; its links carry data-lens. The "Viewing" strip under the header is gone.
- Roles have a `jobTitle` field: Game Engineer (apex), Gameplay Engineer, Tools Engineer, Technical Game Designer, Software Engineer (draft). It matches the resume titles.
- Header height is 72px (60px on phones). The icons drop out under 460px; they are in the footer.

## Hero round 2 (lab/hero-v2)
- D2 (reel plus roles), E2 (profile plus game select), DE (reel plus select bar). Each carries the name, both sentences and all three roles. Waiting on his pick.
- The EXO clip includes the UE editor title bar; the reel overscans the top to hide it. Re-exporting the clip without the bar would be cleaner.

## Buttons, round 2, and hero round 3 (2026-09-29)
- He found the reworked buttons and the boxed roles "AI-looking". LinkPill is back to the flat Figma pill (regular weight, no arrow, no lift or shadow); only the contrast-safe colours and the consistent padding stay.
- Hero direction from his answers: him first, the four games behind him as on the live site, the roles as his own tight "Role // Place" lines (short forms: "VGDC at UC Irvine", "UC Irvine '27"), and a game title-screen feel drawn from games he likes.
- lab/hero-v3: T1 main menu, T2 press start, T3 level select. The actions are menu items, not pill buttons. Waiting on his pick.

## Homepage hero shipped, About page (2026-09-29)
- Homepage hero is "T1 chunked" (src/components/home/HomeHero.astro): the four game images behind, the name as a title over the art, the two sentences and the roles each in a translucent dark box (55% with blur). No links in the hero; the header carries Projects / About / Resume.
- Role lines use his tighter wording on every role site: "President // VGDC at UC Irvine", "Game Design B.S. & SWE B.S. // UC Irvine '27". The credential line and avatar/email/icons left the hero (data kept in the yaml).
- New About page on every role site (/about, /gameplay/about, ...). Content lives in site.yaml `about` (editable in the CMS): outdoor portrait, four intro paragraphs in his letter voice (origin at 5, the Tomb Raider credits moment, Burnt Out Games and VGDC, what he plays), a Player Profile table (Explorer / Achiever, genres, based in, looking for), his favorite games as chips, and an "Around the Industry" photo gallery (BlizzCon x2, GDC, Obsidian, Riot, Blizzard). Photos are resized WebP in public/art/about with metadata stripped. Captions name places visited only, never employment.
- Left out on purpose: the suit headshot (kept locally, unused), the GDC group photo (other people's faces) and the blurry Riot sign selfie.
- Header nav gains About; on phones under 460px About hides in the header (it is in the footer) so the longest job title fits.
- (2026-09-29) About page is sent to every studio, so nothing on it may be aimed at one: the Tomb Raider credits story (Crystal Dynamics letter material) is out. Favorites split into his Top 5 (Superliminal, Skyrim, Portal, What Remains of Edith Finch, League of Legends (ARAM)) and other all-time favorites (adds Hollow Knight, Baba Is You; Tomb Raider is "Tomb Raider (2013)"). Favorite tags are solid and hover with a small grow (1.06) and a very slight alternating tilt.
