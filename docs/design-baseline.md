# Design baseline — what the rebuild matches, and why

Measured 2026-09-26 from two sources:

- **Portfolio-Ref** Figma file (`bxnKAhmMJZwlMsyGW2tpCb`), via the Figma MCP server: colors, fonts,
  auto-layout padding and gaps, component structure.
- **The live site** (malachek.com), `getComputedStyle` at 1280 / 800 / 374 on `/` and `/exo`:
  rendered type sizes. Figma Sites applies per-breakpoint overrides to text styles that the
  Figma API does not return (the file reports "Body Text" as 16px; the site renders it at
  20 / 18 / 17). Where they differ, **the live render wins for sizes**, the file wins for everything else.

## Type scale (rendered)

| Role | Font | 1280 | 800 | 374 | Line height |
|---|---|---:|---:|---:|---|
| Page title / section heading | Jersey 10 | 48 | 40 | 32 | 1 |
| Group heading (spec §3b, not yet on the live site) | Jersey 10 | 32 | 28 | 24 | 1 |
| Subsection heading | Roboto Black 900 | 24 | 22 | 20 | 1 |
| Body paragraphs | Roboto 400 | 20 | 18 | 17 | 1.6 / 1.6 / 1.5 |
| Lists, captions, overview rows | Roboto 400 | 20 | 18 | 17 | 1.28 |
| Header / footer eyebrow | Roboto Bold, uppercase, `#6B7DA8` | 14 | 13 | 12 | 1.2 / 1 / 1 |
| Home card title | Roboto Black | 40 | 30 | 28 | 1 |
| Home experience company | Roboto Medium Italic | 32 | 28 | 20 | 1 |
| Chips | Roboto 400 | 16 | 12 | 10 | 1.28 |
| Code-sample pill (overview) | Roboto 400 | 16 | 12 | 10 | 1.28 |
| Small card title (was Inter Bold) | Roboto Bold | 20 | 18 | 17 | 1.6 |

## Boxes (rendered)

| | 1280 | 800 | 374 |
|---|---|---|---|
| Capsule width | 952 | 736 | 342 |
| Capsule padding | 24 / 32 | 24 | 24 / 16 |
| Capsule radius | 32 | 32 | 32 text, 24 media |
| Gap between capsules | 24 | 24 | 24 |
| Section heading band | pad 36 / 0 / 8, gap 8, rule 3 | same | pad 57 / 0 / 6, rule 2 |
| Media tile, 3-up | 274 × 154 | 2-up 332 | 1-up |
| Media, full | 888 × 499 | 688 | 310 |
| Media radius | 0, `object-fit: cover` | | |
| Media → caption | 24 | 24 | 24 |

## Settled token decisions (from the project prompt, do not re-ask)

- Purple `#5858C7` for fills/rules only; `#706EF4` for purple text.
- Muted `#516092` for decoration only; `#707FB0` for captions and secondary text.
- Body Text Bold is Roboto Bold (Inter dropped).
- Subsection heading is Roboto **Black** (weight from the file). Sizes are the rendered 24/22/20.

## Differences found between the Figma file and the component spec

`14-COMPONENT-SPEC.md` predates the current file in several places. The rebuild follows the file
(and the live render), per the settled rule. Listed so nothing is lost:

| | Spec | File / live | Rebuild uses |
|---|---|---|---|
| Media capsule padding | 0 (edge to edge) | 24 / 32, same as text | file |
| Gap between capsules | 64 | 24 | file |
| Section margin below | 96 | 36 | file |
| Body line height | 1.6 everywhere | 1.6 paragraphs, 1.28 lists and rows | live |
| Media tile radius / border | 8, 1px border | 0, none | live |
| Caption | Roboto 16 muted, 8 below | body size, white, centred, 24 below | file |
| Eyebrow/nav colour | `#6B7DA8` | `#6B7DA8` | agree |

## Pending visual fixes (need Malachy's OK before they ship; shown side by side in the first preview)

1. **Text-safe purple and muted** (settled; to be shown): `#706EF4`, `#707FB0`.
2. **Pill text contrast.** `#DCF1FF` on magenta `#D52FC7` is 3.57:1; white is 4.15:1. Both fail AA for
   20px regular text. Options: darken the pill fill to about `#B0229F` (white text 5.5:1), or make pill
   text Roboto Bold ≥ 19px (large text, needs 3:1, passes as is).
3. **Header icon opacity.** GitHub/LinkedIn icons are white at 34% opacity, about 2.9:1 against the
   ground. WCAG non-text contrast needs 3:1; 40% opacity gives about 3.6:1.
4. **Mobile chip text** renders at 10px on the live site. Not a WCAG failure, but very small.

## Live-site facts that inform the rebuild

- The live site has **no heading elements at all** (every heading is a styled div) and seven sticky
  section headings on `/exo`. The rebuild keeps the sticky headings and makes them real `<h2>`s.
- All gameplay media on `/exo` is already served as video (`/_videos/v1/...`), not GIF.
- Every page shares one title/description; per-page SEO lands in build step 3.
