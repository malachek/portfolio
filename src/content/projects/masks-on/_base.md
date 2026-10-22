---
# Masks On: page drafted 2026-10-20 from resume-system/master/06-projects/6-19-masks-on.md and the AAS_Capstone source.
# Media from Malachy 2026-10-20. The three gun clips wait in .media-cache/masks-on/; upload them so the URLs resolve:
#   npm run media:upload -- .media-cache/masks-on/guns-pistol.mp4 masks-on/guns-pistol.mp4   (same for rifle, sniper)
title: Masks On
accent: '#D90A14'
path: /masks-on
seo:
  title: "Masks On: Online Stealth Arena Shooter | Malachy Kennedy"
  description: "An online stealth arena FPS in Unreal Engine 5.8, built by a team of 2 in 2 days with an AI-first C++ pipeline: gun feel, a server-authoritative stealth ability, and an action-driven loot director."
hero:
  lines:
    - Online stealth arena shooter, and the gun-feel prototype for my capstone.
    - Gameplay Engineer & Level Designer · Team of 2 · Unreal Engine 5.8
    - Fall ZotJam 2026 · 2 days · Built with Claude Code and Unreal MCP
  background: /art/masks-on/arena.webp
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Game jam · Team of 2
    - label: Genre
      value: Online Stealth Arena FPS
    - label: Role
      value: Gameplay Engineer & Level Designer
    - label: Duration
      value: October 2026 (2 days)
    - label: Engine
      value: Unreal Engine 5.8 (C++)
    - label: Tools
      value: C++, Claude Code, Unreal MCP plugin, Rider, Perforce
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: gun-clips
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/masks-on/guns-pistol.mp4
            poster: /art/masks-on/guns-pistol-poster.webp
            alt: "Masks On: firing the pistol on a test range, showing recoil and viewmodel kick"
            caption: Pistol
          - kind: video
            src: https://media.malachek.com/masks-on/guns-rifle.mp4
            poster: /art/masks-on/guns-rifle-poster.webp
            alt: "Masks On: firing the rifle from the hip and down the sight, showing recoil drift and aim-down-sights"
            caption: Rifle
          - kind: video
            src: https://media.malachek.com/masks-on/guns-sniper.mp4
            poster: /art/masks-on/guns-sniper-poster.webp
            alt: "Masks On: aiming the sniper through its scope on a test range"
            caption: Sniper
      - id: project-description-text
        type: text
        md: |-
          Masks On is an AI development experiment: an online stealth arena shooter my teammate and I built in 2 days for Fall ZotJam 2026 by directing Claude agents. I wrote the specs and reviewed every change; Claude wrote the code. You scavenge guns, chain kill streaks, and hold C to put on the Mask and go invisible (until you fire, take damage, or someone sets off the EMP).

          My real goal was the guns. My capstone is an action-adventure shooter, so I used the jam to build gun feel I could carry straight into it… and the capstone now continues from this codebase.

          My second goal was to find out how far agentic development could go in Unreal, so I built the whole project around it. It runs client-server multiplayer through Steam for up to 8 players, with about 20 ms of delay between clients: my teammate set up the netcode and the Steam connection, and I integrated all my systems into it.
      - id: project-description-media
        type: media
        cols: 2
        items:
          - kind: image
            src: /art/masks-on/mask-channel.webp
            alt: "Masks On: firing the rifle as the Mask channel completes, next to two glowing loot pads"
            caption: The Mask channel finishing mid-fight
          - kind: image
            src: /art/masks-on/showcase.webp
            alt: "Masks On being played on two projector screens at the Fall ZotJam 2026 showcase, with the Mask's stealth timer on screen"
            caption: Playing it live at the Fall ZotJam 2026 showcase
  - id: ai-pipeline
    heading: The AI Pipeline
    lead: How two devs built an online shooter in 2 days by directing Claude
    blocks:
      - id: why-cpp
        type: subsection
        title: "Why Everything Is C++"
      - id: why-cpp-text
        type: text
        md: |-
          Claude can't edit UE5 Blueprints (they're binary assets), and it's slow at reading them.

          Visual scripting is usually the fast way to prototype since C++ takes a while to write; with Claude writing it, C++ doesn't take a while, so prototyping in C++ was actually faster (and skipping the scripting VM's overhead was a bonus).
      - id: no-assets
        type: subsection
        title: "No System Needs an Asset"
      - id: no-assets-list
        type: bullets
        items:
          - "UI: every HUD, menu, lobby and scoreboard is built in C++ on a shared widget kit, so there's no UMG asset to hand-edit"
          - "Visuals: the stealth effect and the arena's laser-tag look drive the camera and world post-process settings directly"
          - "Pickups: health and shield orbs are made from engine shapes"
          - "Audio: sounds are found by file name (SFX_Name_01, _02…) and skipped silently if they aren't imported yet, so the game runs on a partial set"
          - "Setup: the loot director spawns itself when a level doesn't have one, and weapon classes are discovered from what's in the level"
      - id: my-role
        type: subsection
        title: "My Role: Specs & Review"
      - id: my-role-list
        type: bullets
        items:
          - "Specs: I wrote each feature as a detailed spec with the numbers in it (mag sizes, cooldowns, reload rules, loot spawn rules, how often bots miss), so Claude skipped the planning step and asked clarifying questions instead"
          - "Parallel agents: I ran several Claude sessions at once, with standing project instructions, and watched their narration as they worked"
          - "Review: I read the diffs and tested each build by hand, used MCP for in-depth tests (edge cases, movement numbers), and verified milestones with full builds"
          - "Caught by playtesting: recoil that left your aim lower than where it started (a bug in Claude's compensation logic), sensitivity about 2000x too high, an ammo HUD that never appeared, and arms holding a ghost gun after a drop"
          - "Pushback: Claude built for single-player first; I made it multiplayer"
          - "Perforce: when my teammate pushed to shared files, I had Claude hold its edits, pulled, then had it reapply on top"
      - id: unreal-mcp
        type: subsection
        title: "Unreal MCP"
      - id: unreal-mcp-text
        type: text
        md: |-
          I connected Claude to the running editor through Epic's experimental Model Context Protocol (MCP) plugin, new in UE 5.8. I used it to inspect the project, validate my hand-built greybox level for cracks, and run in-depth tests: gameplay edge cases, game feel, and movement tuning numbers.

          I also tried integrating a skeletal mesh and animations through it. The animations worked, but the mesh came in so broken I reverted all of it. My takeaway: MCP is great for analyzing the state of things, much less for changing them, so changes went through C++ I could review.

          The level was the exception to all of this: I designed and built the arena by hand in the Editor, with no AI involved.
  - id: what-i-built
    heading: What I Designed & Directed
    blocks:
      - id: gun-feel
        type: subsection
        title: Gun Feel
      - id: gun-feel-list
        type: bullets
        items:
          - "Recoil patterns per gun: kick ramps up over a burst, and horizontal kick starts at 25% and widens, so bursts climb straight then wander"
          - "Yaw bias and consistency settings that turn random jitter into drift a player can learn and pull against"
          - "Eased recoil recovery, with a ceiling on total climb"
          - "A procedural viewmodel on damped springs: fire kick, look sway, movement bob, strafe tilt, landing dip and equip raise, pivoting at the grip"
          - "Aiming down sights cuts the viewmodel kick to 30% and lets a zoom-scaled camera shake carry the recoil, so it reads the same at any magnification"
          - "Hitscan with headshots for the pistol, rifle and sniper; a projectile grenade launcher"
      - id: gun-feel-media-2
        type: media
        cols: 1
        items:
          - kind: image
            src: /art/masks-on/rifle.webp
            alt: "Masks On: the rifle held at the hip, with the slanted red-and-black ammo HUD"
            caption: The rifle and the code-built HUD
      - id: the-mask
        type: subsection
        title: "The Mask & EMP"
      - id: the-mask-list
        type: bullets
        items:
          - "Hold to channel, then invisible to players and AI until the timer runs out or you fire"
          - "Server-authoritative and replicated as server time stamps (\"invisible until T\"), so every machine derives the same state from its own clock with no per-frame replication"
          - "A stealth screen effect that starts cold and calm, then warms, pulses like a quickening heartbeat and glitches as your time runs out (with the world's audio muffled the whole time)"
          - "One EMP on the map: it cancels channels, flashes invisible players visible, and briefly slows and disarms them"
      - id: the-mask-media
        type: media
        cols: 1
        items:
          - kind: image
            src: /art/masks-on/stealth-ads.webp
            alt: "Masks On: aiming down the rifle's sight while invisible, with the cold blue stealth tint and a 4.4-second stealth timer"
            caption: Invisible, with 4.4 seconds left
      - id: loot-director
        type: subsection
        title: Loot Director
      - id: loot-director-list
        type: bullets
        items:
          - "Spawns are driven by action: shots, kills and players running dry fill a meter, and each fill puts one item out, so a quiet map stays quiet"
          - "Placement pulls players together or apart: spots far from everyone, or near a crowd (never right on top of it)"
          - "Crowds roll rifles and grenade launchers; isolated spots roll snipers and the EMP"
          - "Ammo is chosen by what players are short of and placed near whoever needs it, and pings only go to the players an item matters to"
      - id: match-and-ui
        type: subsection
        title: "Match & UI"
      - id: match-and-ui-list
        type: bullets
        items:
          - "Scoring for kill streaks, shutdowns, assists, and tea-bagging a body for ammo and points"
          - "Sprint and aim speed folded into client-side movement prediction so they don't rubber-band online"
          - "8 code-built widgets: an ammo and ability HUD with off-screen ping arrows, match HUD, main menu, a lobby with host-weighted item settings, pause menu, scoreboard, end screen and nameplates"
  - id: design
    heading: Design
    blocks:
      - id: stealth-price
        type: subsection
        title: "Stealth Has a Price"
      - id: stealth-price-text
        type: text
        md: |-
          Firing a single bullet breaks the Mask, so invisibility is for repositioning and grabbing ammo from exposed spots. A kill takes 10 seconds off the 15-second cooldown, so a good ambush pays you back.

          The EMP is the counter: there's only ever one on the map, and everyone gets pinged when it drops.
      - id: loot-moves-players
        type: subsection
        title: "Loot That Moves Players"
      - id: loot-moves-players-text
        type: text
        md: |-
          Most spawn points stay empty on purpose. Items appear where players have to run at each other (or away from everyone) to get them, and the loot follows the fight: rifles where the crowd is, snipers where it isn't.
      - id: powerful-guns
        type: subsection
        title: "Guns That Feel Powerful"
      - id: powerful-guns-text
        type: text
        md: |-
          Every gun was designed to feel powerful, and every playtester said it did. That feel is what the capstone kept.

          Ammo is scarce on purpose so you have to explore the map: small magazines (8 pistol, 20 rifle, 2 grenade launcher, 2 sniper), one spare magazine to start, and low caps on what you can carry.
      - id: scoring
        type: subsection
        title: "Scoring"
      - id: scoring-text
        type: text
        md: |-
          Kill streaks are there to encourage hunting: each kill on a streak pays more, and ending someone else's streak pays a shutdown bonus.

          Gapped games get a domination rule: once the leader has more than 3x everyone else's points combined, the match ends early instead of dragging on.
  - id: play
    heading: Play
    blocks:
      - id: play-link
        type: link
        href: https://malachek.itch.io/masks-on
        label: Play Masks On on itch.io
card:
  kind: project
  category: AI Development Project
  dates: Oct 2026
  chips:
  - Unreal Engine 5.8
  - Claude Code
  - Unreal MCP
  - Perforce
  - Steam
  bullets:
  - Directed parallel Claude agents from written specs to a playable online FPS in 2 days on a team of 2.
  - Used Epic's experimental UE 5.8 MCP plugin to validate a hand-built greybox level and run in-depth game-feel and edge-case tests.
  - Reviewed every AI diff and tested each build, catching agent bugs in recoil, sensitivity and the HUD.
  background: /art/masks-on/arena.webp
  media:
    kind: video
    src: https://media.malachek.com/masks-on/guns-rifle.mp4
    poster: /art/masks-on/guns-rifle-poster.webp
    alt: 'Masks On: firing the rifle on a test range'
  blurb: An AI-agent Unreal FPS, built in 2 days by directing Claude.
  links:
  - icon: itch
    href: https://malachek.itch.io/masks-on
    label: Masks On on itch.io
small:
  blurb: An AI-agent Unreal FPS built in 2 days with Claude Code and Epic's MCP plugin. UE5.8
  image: /art/masks-on/rifle.webp
  links:
  - icon: itch
    href: https://malachek.itch.io/masks-on
    label: Masks On on itch.io
---
