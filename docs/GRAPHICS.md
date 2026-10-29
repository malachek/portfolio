# Graphics style guide

Explainer graphics on malachek.com (architecture, systems, process) and the small UI pieces around
them. Goal: they should look like Malachy made them, because the reader is judging his process.
Wording follows `resume-system/portfolio/VOICE.md`; this file adds the visual rules and the rules
for words *inside* a graphic.

Decided 2026-10-27 after two rejected passes (a "clean diagram" look and a site-native look both
read as AI design).

## 1. Default: the Miro board look

Explainer graphics look like a crop of one of his Miro boards, because that is where his real
process lives.

| Element | Rule |
|---|---|
| Board | Flat `#2e2e2e`, no dot grid, no gradient |
| Frame | Black-ish `#1c1c1c` rectangle, 2px corners. Its name sits **above** the top-left corner in small light grey (`#cfcfcf`, ~22px), lowercase, like a Miro frame label. This is the only title. |
| Sticky | Square corners (2px), small drop shadow, text centred both ways, dark text `#1a1a1a`. Axis-aligned: Miro never tilts stickies. |
| Sticky colours | Sampled from his boards: yellow `#fef7a9` (default), pink `#ef9fe3`, light pink `#f9daf2`, violet `#b6acf5`, blue `#b8cffa`, cyan `#ace4fc`, orange `#f4b87f`, green `#c7e985`, salmon `#f1a2a0`. One colour per column or group, chosen to tell groups apart. Colour never encodes "importance". |
| Headers | A wider sticky in the group's colour, bold, ~30–34px. Items below it are smaller stickies in the same colour. |
| Connectors | Light grey `#d9d9d9`, 3px, gentle curves with a filled arrowhead (Miro's default). A pink `#ef9fe3` connector marks the one path the reader should follow (a loop back, say). |
| Free text | Off-white `#e8e8e8` notes on the board, never inside a frame title. Bold only on a colon label: **why:**, **note:**. |
| Pen | Hand-drawn shapes (spheres, curves, charts) are strokes like his whiteboard sketches: pink `#e632e4`, purple `#5c4ce0`, light grey. No fills, no gradients. |
| Font | Open Sans (Miro's sticky font), 400 / 600 / 700. Never Jersey 10 or Roboto inside a board. |
| Canvas | 1600 × 900 at 1.6x (2560 × 1440 webp), so it sits in a 16:9 media capsule and zooms cleanly in the lightbox. Leave empty board around the frame; don't fill every pixel. |

**Never:** subtitles under a title, "Fig. N", "malachek.com" footers, numbered circle badges, icon
sets, gradients, glows, coloured header bars on boxes, rounded "card" UI, drop-shadowed panels,
2-colour "accent + neutral" systems, uniform grids of identical boxes.

### Text goes outside the picture (Malachy, 2026-10-27)

A graphic communicates **space and relationships**: what sits next to what, what flows into what,
what belongs to which group, what happens before what. Explanation goes in the page text and the
caption, not on the board.

- Stickies hold **labels**, a few words each (`surface speed`, `PrePhysics`). Never a sentence, never
  a list of sentences inside one sticky.
- No paragraph-length notes on the board. If a graphic needs a "why:" sentence, it belongs in the
  text block above or below it.
- Prefer position, grouping, colour and arrows over words: a column of stickies says "these happen
  in this phase" without the word "phase".
- Test: cover the page text. If the graphic still reads as a dense slide, move words out of it.

### Text that explains a graphic lives in its capsule (Malachy, 2026-10-28)

Give the media block an `md:` field; it renders above the picture inside the same capsule, so the
reader sees they go together. Use the same for a clip or GIF that only makes sense with its text.
The caption stays one short line under the picture.

## 2. Site-native, only for UI on the page itself

Things that are part of the page (the portfolio list under About, chips, link rows) use the site's
own parts and nothing new:

- `Role // Place` with the magenta `//`, as in the homepage hero.
- Text links in `--text`, the current one in `--muted-text`, no underline until hover.
- One line where possible. If it can be said in one line, it isn't a section with a heading.

Never build a site-native *diagram* (capsules + Jersey heading + chips): it reads as a template.

## 3. Words inside a graphic

His boards write in short lowercase phrases. Graphics follow `VOICE.md`, plus:

| Do | Don't |
|---|---|
| Lowercase sticky text: `surface speed`, `1–2 a week` | Title Case On Every Sticky |
| Proper nouns and code names keep their case: `PrePhysics`, `GDD`, `itch.io` | lowercase code names |
| Frame labels say what it is, in his words: `one frame, by tick group` | Marketing titles: "One frame, four tick groups" |
| Arrows for flow: `speed → gravity → move → camera` | prose that describes a flow the arrows already show |
| Colon labels for notes: `why: …` | a tagline under the title |
| Parenthetical asides: `(can run late if the frame does)` | aphorisms: "A quiet map stays quiet." |
| First person where it's his work: `I'm the only programmer` | "the developer", passive voice |
| Numbers from the master files only | rounded or invented numbers, guessed asides ("I tested it a lot") |

Banned everywhere: em dashes, `X, not Y`, rule-of-three padding, aphoristic closers, opening a note
with "So".

## 4. Captions on the page

The media caption under a graphic is one plain sentence in his voice, no period-free fragments
dressed as titles. The section heading already names the topic, so the caption says what to look at:
"Every feature went around this loop." Not a restatement of the frame label.

## 5. Checklist before a graphic ships

1. Could this be a screenshot of his Miro? If anything says "designed", cut it.
2. Every fact traces to the page text, the code, or `resume-system/master`.
3. No banned constructions (section 3).
4. Nothing clips or overlaps at 100% and in the lightbox.
5. Renders from the generator in `scripts/graphics/` (to be added), so edits stay consistent.
