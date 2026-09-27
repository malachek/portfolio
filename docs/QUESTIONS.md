# Open questions for Malachy

Collected while working unattended. Nothing here blocks the build: each one says what I did in the meantime.

## Design
1. **Phone margins.** Your Figma file (Portfolio-Ref) uses 16px side margins on phones (24px for Skills). You asked for more room, so the rebuild uses 24px everywhere. Right amount?
2. **Homepage hero:** Option A, B or C (or a mix)? All three are at http://localhost:4321/lab/hero-options.
   *Meanwhile:* the current hero stays.
3. **"Also Built" label.** I read "eyebrows are not inline" as the label row, so it's now just "Also Built" on its own line with no date. If you meant something else (e.g. the small card titles and icons), tell me.
4. **Button text contrast.** Light text on the colored "See More" buttons is below the standard contrast level (worst on The Fallen gold and Kawai'ian Isolation pink). Darken the button colors slightly, or switch to dark text on those two?
   *Meanwhile:* unchanged.
5. **Card hover.** The live site has no hover effect on the cards; the whole inner capsule is simply a link. I added a subtle darken plus an accent outline and an underlined title. Keep, tone down, or remove?

## Content
6. **Coursework cards.** "Web Crawler & Search Engine" and "Pintos Thread Scheduler" are coursework. The rule says coursework code is never published; the cards link nowhere, so I kept them as on the live site. Keep them on the homepage, or drop them (and in which variants)?
7. **Live-site link bugs not ported:** on malachek.figma.site the hero paragraph and the three Skills rows are all links to vgdc-uci.com (a Figma Sites slip). The rebuild leaves them as plain text.

## Role sites (build steps 3 to 6)
8. **EXO release date.** The live site says "Steam-approved, pending Q3 2026" (EXO page) and "a third approved for Q3 2026 release" (Burnt Out Games card). Your master file (09-clarifications, 2026-09-25) says EXO is unreleased with **no release date** until a publisher signs. Which is right?
   *Meanwhile:* the new Gameplay / Tools / Design copy says "approved on Steam" with no date; the Generalist site still carries the live wording.
9. **Resume per role.** Each role's Resume link currently opens the same Google Drive PDF. Which PDF should each role link to (Gameplay, Tools, Design, Generalist)? Once you say, I'll serve them from the site, e.g. /resume/Malachy_Kennedy_Gameplay_Resume.pdf.
10. **New copy to check** (everything else is word for word from your master files):
    - Tools hero, line 2: "I build the architecture and pipelines other people work in: modular C# codebases, data-driven content pipelines, and the source control and release tooling behind them."
    - Design, EXO card: "Ran three playtest rounds, lifting player engagement from 43% to 95% (top-two-box)."
    - Tools, Search Engine card: "Crawler, inverted index and TF-IDF ranking in Python. Team of 4; ranking and relevance were my part."
    - Gameplay, Night Walk card: "First-person horror in UE5.7: movement, weapons, and a night-vision post-process shader."
11. **"Collegiate" / "club".** The brief says avoid them, but 08-cautions says you stand behind "North America's largest collegiate game dev club". I kept that line on the Gameplay card and left it out of Tools and Design. OK?
12. **Comments card** (Design site) has no image and I picked its color (#3A6EA5). Send an image, or tell me to drop it.
13. **Which projects on which role.** First pass is on http://localhost:4321/lab/matrix (Gameplay leads EXO, Tools leads EXO then Kawai'ian Isolation with CORA first under Experience, Design leads The Fallen with Limital and Comments in Also Built). Change anything?
