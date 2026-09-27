# Editing the portfolio

Everything on every version of the site (Generalist, Gameplay, Tools, Design, …) comes from plain text files in `src/content/`. You can change them two ways:

- **The editor** (a web page with forms): easiest for text, bullets, order and images.
- **VS Code**: open the file and type. Best for bigger changes, and you can always ask Claude to do it.

Both change the same files. Nothing goes live until the change is pushed to GitHub (the editor's **Publish** button does that for you).

---

## 1. Where things live

```
src/content/
  site.yaml                  your name, email, GitHub, LinkedIn, the availability line, the menu
  roles/
    dev.yaml                 the Generalist site (malachek.com)
    gameplay.yaml            gameplay.malachek.com
    tools.yaml               tools.malachek.com
    design.yaml              design.malachek.com
  projects/
    exo/
      _base.md               EXO's facts and full page, shared by every site
      dev.md                 how EXO shows on the Generalist site
      gameplay.md            … on the Gameplay site
      tools.md               … on the Tools site
      design.md              … on the Design site
    the-fallen/ …
```

**The one rule:** a page is `_base.md` plus that site's file, and **the site's file wins** wherever it says something. A site file that is almost empty means "show it exactly like `_base.md`".

- **A project is on a site only if it has a file for that site.** No `tools.md` in `loonage/` = Loonage is not on the Tools site.
- **The role file decides the homepage order.** In `roles/gameplay.yaml`, `featured:` is the list of big cards in order, `alsoBuilt:` the small cards, `experience:` the experience cards. The names are the project folder names (`exo`, `the-fallen`, …).

### What each project file can hold

| In `_base.md` | What it is |
|---|---|
| `title`, `accent` | Name and page color (`#D52FC7`) |
| `page: false` | No page of its own; only a small "Also Built" card |
| `path` | The page address, e.g. `/exo`. **Never change these for existing pages**: links you already sent must keep working. |
| `seo` | The title and description Google shows |
| `hero` | The top of the page: lines, background art, logo |
| `overview` | The table under the hero |
| `sections` | The page itself: each section has `blocks` (text, bullets, media, embeds, link pills) |
| `card` | The big homepage card (chips, bullets, clip, dates) |
| `small` | The small "Also Built" card |

| In a site file (`gameplay.md` …) | What it does on that site only |
|---|---|
| `card:` | Replace any card field, e.g. different `bullets:` or `chips:` |
| `small:` | Replace the small card's blurb, image or links |
| `sections:` | Which sections show, in which order (list of section ids). Leave it out to show all of them. |
| `hideBlocks:` | Block ids to hide |
| `blockOverrides:` | Change one block's text, e.g. `blockOverrides: { project-description-text: { md: "New text" } }` |
| `extraSections:` | Sections that exist only on this site |
| `hero:`, `seo:` | Replace the page's hero lines or search text |

**See the whole system at once:** with the site running (step 3), open **http://localhost:4321/lab/matrix**. Rows are projects, columns are sites; each cell says where the project appears. Click a cell to open that file in VS Code; click "view" to see the page.

---

## 2. Rules the content must follow

These are checked by you (and by Claude) before anything goes live:

- Only links on the whitelist in `resume-system/master/00-contact.md`.
- EXO and CORA: never "shipped" (EXO is approved on Steam; CORA went to internal review). EXO's Discord login is "OAuth2 with PKCE", never "REST API".
- No rankings for The Fallen, Night Walk or Loonage. Roblox is never a headline.
- Always "UE5 Blueprints". Avoid em dashes and "student".
- Videos never go in the repo (see step 6).

If a file breaks a format rule (a missing title, a color that isn't `#rrggbb`, two blocks with the same id), the build stops and says which file and line. Nothing broken can go live.

---

## 3. See your changes on your Mac

Open **Terminal** (Cmd + Space, type Terminal, Enter) and paste:

```
cd ~/Documents/GitHub/portfolio && npm run dev
```

Leave that window open. In Chrome:

- Generalist site: http://localhost:4321/
- Gameplay: http://localhost:4321/gameplay/ · Tools: http://localhost:4321/tools/ · Design: http://localhost:4321/design/
- The matrix: http://localhost:4321/lab/matrix

Pages update by themselves when a file changes. If one looks stale, refresh; if it still looks old, press **Ctrl + C** in Terminal and run the command again.

To stop the site: click the Terminal window and press **Ctrl + C**.

---

## 4. Edit with the editor

### On your Mac (no sign-in needed)

1. Start the site (step 3).
2. In **Chrome**, open **http://localhost:4321/admin/index.html**
3. Click **Work with Local Repository** and choose the `portfolio` folder (Documents → GitHub → portfolio).
4. Edit. **Save** writes the file on your Mac. Check the result at http://localhost:4321/.
5. To put it live, commit and push in GitHub Desktop (or ask Claude).

### From any browser, including your phone

Open **https://malachek.com/admin/** (after the site moves to the new host) and choose **Sign In Using Access Token**.

One-time setup, on github.com:
1. Your picture (top right) → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. Name: `portfolio editor`. Expiration: 1 year. Repository access: **Only select repositories** → `malachek/portfolio`.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. **Generate token**, copy it, paste it into the editor. Your browser remembers it.

With a token, **Publish** commits straight to GitHub and the site redeploys in about a minute.

### Two ways to browse in the editor

- **"Gameplay site: projects"** (and one for each site): every project on that site. This is "edit everything on gameplay in one place". **New entry** adds a project to that site: type its folder name (e.g. `loonage`).
- **"Project: EXO"** (one per project): EXO's shared file plus its file for every site. This is "edit EXO everywhere in one place".
- **"Role sites and site settings"**: each site's hero, card order and skills, plus your contact details.

Note: saving from the editor drops the `#` comment lines at the top of a file. That's fine; they're only notes.

---

## 5. Edit in VS Code

1. Open VS Code → **File → Open Folder…** → Documents → GitHub → `portfolio`.
2. Open the file from the list on the left (e.g. `src/content/projects/exo/gameplay.md`).
3. Type, then **Cmd + S** to save. The site at localhost updates.

Indentation matters in these files: keep the same number of spaces as the line above. Lines starting with `- ` are list items. Text with a colon in it needs quotes: `- "Shipped on Steam: the studio's first release."`

---

## 6. Images and videos

- **Images**: in the editor, click the image field and upload; it's saved in `public/art/`. In VS Code, put the file in `public/art/` and write `/art/name.png`.
  Logos and content images are always shown whole (fitted); only backgrounds fill their box.
- **Videos** live in Cloudflare R2, not in the repo. Encode as MP4 (H.264), never GIF (see `00-ASSET-PIPELINE.md`). Then in Terminal:

  ```
  cd ~/Documents/GitHub/portfolio && npm run media:upload -- ~/Desktop/clip.mp4 exo/movement.mp4
  ```

  It prints a URL like `https://media.malachek.com/exo/movement.mp4`; paste that into the video field. (First time only: `npx wrangler login`.)

---

## 7. Add things

- **A project to a site**: create `src/content/projects/<project>/<site>.md` containing just

  ```
  ---
  ---
  ```

  then add the folder name to that site's `featured:` or `alsoBuilt:` list in `roles/<site>.yaml`.
- **A new project**: make a folder in `src/content/projects/`, copy `_base.md` from a similar project, edit it. Use `page: false` for a small card only.
- **A new site** (e.g. production): copy `roles/gameplay.yaml` to `roles/production.yaml`, change `label`, `host`, `order`, and set `enabled: false` until it's ready.

---

## 8. Put it live

Every push to `main` on GitHub rebuilds and redeploys the site (Cloudflare Workers Builds). The editor's **Publish** pushes for you. From GitHub Desktop: write a summary, **Commit to main**, then **Push origin**.

If the build fails, GitHub shows a red ✗ on the commit and the live site stays as it was. Ask Claude to read the error.
