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
8. ✅ ANSWERED (set when the publisher says; all Q3 2026 dates removed). **EXO release date.** The live site says "Steam-approved, pending Q3 2026" (EXO page) and "a third approved for Q3 2026 release" (Burnt Out Games card). Your master file (09-clarifications, 2026-09-25) says EXO is unreleased with **no release date** until a publisher signs. Which is right?
   *Meanwhile:* the new Gameplay / Tools / Design copy says "approved on Steam" with no date; the Generalist site still carries the live wording.
9. ✅ ANSWERED: one per role; approved and uploaded to Drive; each role's /resume page embeds its own PDF. **Resume per role.** Each role's Resume link currently opens the same Google Drive PDF. Which PDF should each role link to (Gameplay, Tools, Design, Generalist)? Once you say, I'll serve them from the site, e.g. /resume/Malachy_Kennedy_Gameplay_Resume.pdf.
10. **New copy to check** (everything else is word for word from your master files):
    - Tools hero, line 2: "I build the architecture and pipelines other people work in: modular C# codebases, data-driven content pipelines, and the source control and release tooling behind them."
    - Design, EXO card: "Ran three playtest rounds, lifting player engagement from 43% to 95% (top-two-box)."
    - Tools, Search Engine card: "Crawler, inverted index and TF-IDF ranking in Python. Team of 4; ranking and relevance were my part."
    - Gameplay, Night Walk card: "First-person horror in UE5.7: movement, weapons, and a night-vision post-process shader."
11. **"Collegiate" / "club".** The brief says avoid them, but 08-cautions says you stand behind "North America's largest collegiate game dev club". I kept that line on the Gameplay card and left it out of Tools and Design. OK?
12. **Comments card** (Design site) has no image and I picked its color (#3A6EA5). Send an image, or tell me to drop it.
13. **Which projects on which role.** First pass is on http://localhost:4321/lab/matrix (Gameplay leads EXO, Tools leads EXO then Kawai'ian Isolation with CORA first under Experience, Design leads The Fallen with Limital and Comments in Also Built). Change anything?

## Editor, video and deploy (build steps 7 and 9)
14. ✅ ANSWERED: OK. **R2 bucket for videos.** `npm run media:upload` expects a bucket named `malachek-media` served at `media.malachek.com`. OK to create those in your Cloudflare account (next session, with you there), or different names?
15. **Editor sign-in.** The editor works today on your Mac ("Work with Local Repository" in Chrome) and from anywhere with a GitHub access token (EDITING.md §4). A "Sign In with GitHub" button also needs a small sign-in Worker on Cloudflare. Want that, or is the token enough?
16. ✅ ANSWERED: yes. **GitHub repo.** The local repo has no GitHub remote yet. Create `malachek/portfolio` (public, as chosen) and push? That's needed before the Cloudflare preview.
17. **EDITING.md screenshots.** The brief asks for screenshots of the editor. I can take them once you've picked the folder in Chrome once ("Work with Local Repository"), since I can't pick a folder for you.

## New pages (build step 8)
18. **Five new pages drafted** from your master files, in your voice: /night-walk, /loonage, /limital, /comments, /little-rockstar. Each `_base.md` marks inferred sentences with `# VERIFY`. The ones to read:
    - Night Walk, Design: "With 72 hours, I cut scope to one loop and spent the time polishing it."
    - Loonage, Design: "…until riding a disk felt like something the player chose to do."
    - Limital, description: "it pulls the apps you're juggling into one interface, and lets you choose how much of each one you see."
19. **Art for the new pages.** None of them has hero art, so their heroes use a soft glow in the page color. Comments and Little Rockstar have no image at all. Send key art / screenshots when you have them (and a clip for Night Walk?).
20. **Little Rockstar's color** is a placeholder (#E8A33D, amber). Pick one?
21. **Loonage engine version.** The live card says "Unity 6"; your master file says "Unity" with no version. Which?
22. **Comments on Devpost.** Your master file says Comments is published on Devpost, but that URL isn't on the whitelist, so the page has no link. Add it to 00-contact.md and I'll link it.

## Phase 2 (production., software.)
23. **Software site drafted, not published** (`roles/software.yaml`, `enabled: false`). Preview it at http://localhost:4321/software/ (the dev server shows drafts; the real build skips them). It leads with Pintos, then Search Engine, with write-up pages for both. **Pintos code is not linked anywhere**; the page says "available on request". Does your course allow publishing it? Also: can your resume-system automation (resume builder, job watcher) be shown as a project, and what are you comfortable disclosing?
24. **Production: a case-study page, or a full site?** Research is done (docs/research-production.md): only 1 of ~10 readable producer postings at your target studios mentions a portfolio (Crystal Dynamics' entry-level AP, "preferred"). I recommend **one production case-study page** (VGDC and Burnt Out Games releases, with real artifacts: a schedule or sprint board, a scope-cut decision, a postmortem) linked from production resumes, not a full production site. Agree? And which artifacts can you share?
25. **Search Engine page** says "Team project · 4 developers" and "Everything except the UI; ranking and relevance were my main contribution", per 6-11. It never says coursework. OK?

## Copy
26. **Proposed copy edits** are in docs/COPY-EDITS.md (the "student" / "collegiate" lines). Typos and "UE5 Blueprints" fixes are already applied.
