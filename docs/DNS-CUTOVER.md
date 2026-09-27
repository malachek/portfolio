# DNS cutover plan (waiting for Malachy's go)

Nothing here has been done. This is the only step that changes what visitors to malachek.com see.

## What changes
| Address | Today | After |
|---|---|---|
| malachek.com | Figma Sites | this site (Generalist) |
| www.malachek.com | Figma Sites (if set) | 301 to malachek.com |
| dev.malachek.com | nothing | 301 to malachek.com |
| gameplay.malachek.com | nothing | Gameplay site |
| tools.malachek.com | nothing | Tools site |
| design.malachek.com | nothing | Design site |

Old links keep working: /exo, /the-fallen, /kawaiian-isolation, /burning-out, /burnt-out-games-llc, /vgdc, /taralumen-cora, /cora, /resume.

## Steps (Cloudflare dashboard)
1. **Record the current setup first (the rollback).** malachek.com → DNS → Records: screenshot every record for `malachek.com` and `www` (type, name, content, proxy status). Keep it.
2. Delete the `malachek.com` and `www` records that point to Figma Sites.
3. Workers & Pages → malachek-portfolio → Settings → Domains & Routes → Add → Custom domain, once each for:
   `malachek.com`, `www.malachek.com`, `dev.malachek.com`, `gameplay.malachek.com`, `tools.malachek.com`, `design.malachek.com`.
   Cloudflare creates the DNS records and certificates itself (a few minutes).
4. Check: malachek.com, gameplay.malachek.com/exo, malachek.com/cora, the role switcher links.
5. Remove the site from Figma Sites' custom-domain setting only after the check passes.

## Rollback (if anything is wrong)
Remove the six custom domains from the Worker, then re-create the records from the step-1 screenshot. Figma Sites serves again within minutes.
