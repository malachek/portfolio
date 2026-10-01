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

## Rollback record (captured 2026-09-30, before the apex swap)
| Name | Type | Content | Proxy |
|---|---|---|---|
| malachek.com | A | 204.69.207.1 | DNS only |
| www.malachek.com | CNAME | sites.figma.net | DNS only |
| _figma_sites_verify.malachek.com | TXT | "v=faf18e28-91bd-4753-9b0b-7dee15125692" | DNS only (left in place) |
| media.malachek.com | R2 | malachek-media | Proxied (left in place) |

Progress: gameplay., tools., design., dev. added as Worker custom domains on 2026-09-30 and checked.

## Done (2026-09-30, ~18:10 PT)
Malachy deleted the apex A (204.69.207.1) and www CNAME (sites.figma.net) records and added malachek.com and www.malachek.com as Worker custom domains. Checked after propagation: malachek.com serves this site; www redirects to the apex keeping the path; gameplay., tools., design. serve their role sites; dev. redirects to the apex; /cora redirects to /taralumen-cora; /gameplay/exo on the apex redirects to gameplay.malachek.com; robots.txt and /sitemap.xml are served; videos play from media.malachek.com.
Still to do (Malachy, later): remove the custom domain from Figma Sites once he's happy; the _figma_sites_verify TXT record can then be deleted.
