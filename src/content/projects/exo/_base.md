---
# EXO: shared facts and full copy for every role variant.
# Ported from the live site on 2026-09-26. Edit freely; this file is now the source.
title: EXO
accent: "#D52FC7"
path: /exo
seo:
  title: "EXO: Third-Person Movement Shooter | Malachy Kennedy"
  description: "Sole programmer on an 11-person Unreal Engine 5.6 title. Rebuilt directional gravity for spherical traversal, three enemy archetypes, C++ GAS architecture."
hero:
  lines:
    - Third-person movement shooter on spherical planets, where speed is the weapon.
    - Game Engineer & Tech Lead · Sole programmer on a team of 11 · Unreal Engine 5.6
    - 3rd Place, ICS Project Expo · Steam-approved, pending Q3 2026
  background: https://malachek.com/_assets/v11/54f4922f342c7cdc6cea7b862e628ecadcd39aeb.png
  logo: https://malachek.com/_assets/v11/ce44e07dc887d4f99a6bfd0db1a8a922f3908549.png
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Team Project · 11 developers
    - label: Genre
      value: 3rd Person Action Shooter
    - label: Role
      value: Game Engineer & Tech Lead
    - label: Duration
      value: August 2025 - Present
    - label: Engine
      value: Unreal Engine 5.6
    - label: Tools
      value: C++, UE5 Blueprints, GAS, Perforce
    - label: Status
      value: On Steam. Pending Q3 2026.
  steamAppIds:
    - 4587490
  code:
    href: https://github.com/malachek/EXO_CodeSamples
    label: github.com/malachek/EXO_CodeSamples
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          EXO is a third-person movement shooter set on spherical planets, where speed is the weapon.

          Players orbit, leap between planets, and chain high-velocity maneuvers, shooting enemies and tearing out their souls to use as fuel.

          Every system in it answers one question: how do you make a game feel as fast as it is without making it as hard as it is?
      - id: project-description-media
        type: media
        cols: 1
        items:
          - kind: video
            src: https://malachek.com/_videos/v1/4dd3d3ae56b170bec92f22b4f777b5288b179c98
            alt: "EXO: Spherical traversal at high speeds (in Unreal Editor, showing Hit Debugs to compensate for no audio)"
            caption: |-
              Spherical traversal at high speeds
              (in Unreal Editor, showing Hit Debugs to compensate for no audio)
      - id: project-description-text-1
        type: text
        md: |-
          Unreal launches you into the stratosphere at 300 MPH, so I rebuilt the velocity and physics model underneath as a parallel transport.

          Enemies run AT you, arcing around the planet's curve to arrive head-on. Anything that approaches from the side at this speed is a hit you never saw.

          Speed is felt through in game systems in both aesthetics, but namely feel. Acceleration kicks back, and the danger of speed kicks-in in Overdrive.

          Souls tie the two halves together: kill to earn them, spend them to accelerate. You're never choosing which game you're playing.
      - id: project-description-frame
        type: text
        md: I’m the sole programmer on a team of 11, working from systems design through C++ implementation, UE5 Blueprints scripting, and the Perforce pipeline the rest of the team builds against.
  - id: what-i-built
    heading: What I Built
    lead: Sole programmer! Every system below is mine.
    blocks:
      - id: movement-and-physics
        type: subsection
        title: Movement & Physics
      - id: movement-and-physics-frame
        type: text
        md: Rebuilt from the velocity model up, because the stock one breaks at speed.
      - id: movement-and-physics-list
        type: bullets
        items:
          - "Spherical force component: a named force registry with parallel transport, impulse and continuous forces, local or world space, surface-locked or free 3D"
          - Rebuilt Unreal's directional gravity for spherical traversal at 300 MPH
          - Two-channel velocity model separating player steering from external forces
          - Dynamic max-speed headroom that expands with accumulated force
          - Polar steering with independent turn-rate and acceleration curves
          - "Variable-height jump on an arbitrary up-vector: five gravity scales, a hold window, and a release cut"
          - Force damping with an exponential-tail cutoff
      - id: movement-and-physics-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://malachek.com/_videos/v1/f0f8eb7ea168c8c6ad3757976fc2cc726fd6f16f
            alt: "EXO: Large spherical force wrapping around the planet."
            caption: Large spherical force wrapping around the planet.
          - kind: video
            src: https://malachek.com/_videos/v1/22f3bef1b162b6f670ea4e42ba3cfd31af6e4467
            alt: "EXO: Entering Overdrive (note the Soul-Health Bar and the MPH)"
            caption: Entering Overdrive (note the Soul-Health Bar and the MPH)
          - kind: video
            src: https://malachek.com/_videos/v1/64751e8beecb8dcf2f17f52965f4b8d0db323520
            alt: "EXO: Spherical force component: Jump, Dash, Jump and Dash"
            caption: "Spherical force component: Jump, Dash, Jump and Dash"
      - id: architecture-and-performance
        type: subsection
        title: Architecture & Performance
      - id: architecture-and-performance-frame
        type: text
        md: Frame-level control, because at this speed, ordering is visible.
      - id: architecture-and-performance-list
        type: bullets
        items:
          - "Player logic split across four tick groups with a one-way dependency chain: Pre-Physics, During Physics, Post Physics, Post Physics Work"
          - Used tick groups to do intensive operations parallel to Unreal’s physics engine, ensure core calculations came first, and schedule visceral systems before visual for player feel and game performance.
          - "O(1) intrusive linked-list object pooling: one pointer swap to acquire, one to release, deferred queue capped at a single allocation per tick"
          - GAS attribute clamping in PreAttributeChange
          - Ability system component initialization ordering across PossessedBy and OnRep_PlayerState
          - Async targeting requests kept off the critical path
          - Unreal Insights profiling across tick groups and pooling
      - id: camera-and-aiming
        type: subsection
        title: Camera & Aiming
      - id: camera-and-aiming-frame
        type: text
        md: Conveying speed without costing the player the ability to aim.
      - id: camera-and-aiming-list
        type: bullets
        items:
          - "Decoupled facing and reticle, modeled on spaceship combat: you steer along one line and fire along another"
          - Predictive look-ahead, speed-scaled pullback, Dutch angle, roll, camera lag, and shake that grows with velocity
          - Reticle warping from averaged raw input delta, with time-since-aim recentering
          - "Aim assist: sphere-trace friction that softly locks the cursor to a target"
          - "Autotarget: async scored selection over a 5000-unit radius, weighted camera look 0.5, distance 0.3, movement direction 0.2"
          - Dynamic FOV, time dilation, ADS slowdown, on-target easing
          - Full controller support with separate mouse and gamepad look paths
      - id: camera-and-aiming-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://malachek.com/_videos/v1/ed90c15cb12c1f613b227f7c78e39cc6e1b0e0f6
            alt: "EXO: Motion streaks & edge warping"
            caption: Motion streaks & edge warping
          - kind: video
            src: https://malachek.com/_videos/v1/75330ac92a4487fc6420b5822dd5aa1c71189cb8
            alt: "EXO: You steer along one line and fire along another"
            caption: You steer along one line and fire along another
          - kind: image
            src: https://malachek.com/_assets/v11/9601174302ed32f8be4443c1faacf40c346d858e.png
            alt: "EXO: Auto Targeting"
            caption: Auto Targeting
      - id: combat-systems
        type: subsection
        title: Combat Systems
      - id: combat-systems-frame
        type: text
        md: Modular on GAS, because the ability list is still growing.
      - id: combat-systems-list
        type: bullets
        items:
          - "Every weapon and ability built on GAS: tags, commit-on-execute, attribute sets, gameplay effects, gameplay cues"
          - "Hit detection component with three regions: mesh raytrace, socketed weakspot sphere, proximity sphere, all four outcomes routed into GAS as tags"
          - "Forgiveness pass: hittable telegraphs, pool-safe detach the frame an enemy dies"
          - Hitscan weapons with Niagara VFX bound to ability state
          - "Soul x Health: a GAS attribute with its own drain and regen states. Taking damage lowers the gauge capacity. Includes an overspend mode “Overdrive” where health is spent when soul runs out"
          - "Overdrive: a health-draining boost state with a burn-out window scaled to how long you held it"
      - id: combat-systems-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://malachek.com/_videos/v1/e70be8e665bcb769c13361267212c138fd4c582f
            alt: "EXO: Scan-and-multi-dash ability"
            caption: Scan-and-multi-dash ability
          - kind: video
            src: https://malachek.com/_videos/v1/4f7d51412c1c55f282880134280ed8e462dddf3b
            alt: "EXO: Hit detection component (viewport)"
            caption: Hit detection component (viewport)
          - kind: image
            src: https://malachek.com/_assets/v11/946397ef4e3615639f54b7707d7aa91001214803.png
            alt: "EXO: Ability cooldowns"
            caption: Ability cooldowns
      - id: enemy-ai
        type: subsection
        title: Enemy AI
      - id: enemy-ai-frame
        type: text
        md: "Built against one question: what still reads at 300 MPH?"
      - id: enemy-ai-list
        type: bullets
        items:
          - Two shipped archetypes. Boss and Turret in progress.
          - "Drone: five-state machine, predictive lead targeting, a telegraphed frozen ground marker, and holding windows that hand back reaction time"
          - "Husk: arcs around the planet's curvature to arrive head-on, closing-speed- scaled detonation, and a hitbox that expands with its own telegraph"
          - "Spherical path director: surface projection with collision-height offset, intercept lead points, cluster-angle spread"
          - Credit-based spawn director allocating against weighted enemy cards
          - Speed-adaptive spawn cone, 60° to 30°, blending current heading, recent heading and velocity
          - Viewport-aware angular culling, so nothing despawns while you're looking at it
      - id: enemy-ai-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://malachek.com/_videos/v1/19decf4fb9d95896dfddd342616f5bb5b2231253
            alt: "EXO: Drone: predict, telegraph, fire"
            caption: "Drone: predict, telegraph, fire"
          - kind: video
            src: https://malachek.com/_videos/v1/ac4dbeba79d6e7c9d55fa6ddc140e246ab965a43
            alt: "EXO: Husk: arcing to run AT player"
            caption: "Husk: arcing to run AT player"
          - kind: video
            src: https://malachek.com/_videos/v1/fa00d2a1cbb6108d337775e686f6d53d3180c27f
            alt: "EXO: Enemies spawn at readable distance and position"
            caption: Enemies spawn at readable distance and position
      - id: world-and-progression
        type: subsection
        title: World & Progression
      - id: world-and-progression-frame
        type: text
        md: Pacing tools. Systems in the game to bring help and danger at high speeds.
      - id: world-and-progression-list
        type: bullets
        items:
          - "Crucifix and obelisk chain: shoot it down, unearth it, planet-shake impact, three-stock regenerating heal station"
          - Laser hazards that cost you speed and never stop you outright
          - "Level-up-by-shooting progression: stat cards placed in the sky, ticks and ranks, permutation-unlocked abilities (designed, not yet built)"
      - id: world-and-progression-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://malachek.com/_videos/v1/059d22ebcd3abd7c34530f7bc92b02d4cc703678
            alt: "EXO: Laser hazards require pathing, and serve as a landmark to gauge speed."
            caption: Laser hazards require pathing, and serve as a landmark to gauge speed.
          - kind: video
            src: https://malachek.com/_videos/v1/c95ef8bd605da5872b650fedd386ec9920f309a1
            alt: "EXO: Heal shooting down to spawn obelisk"
            caption: Heal shooting down to spawn obelisk
          - kind: video
            src: https://malachek.com/_videos/v1/df17c3bd045238af2db855a48b59de051fd9f278
            alt: "EXO: Healing obelisk"
            caption: Healing obelisk
  - id: breakdowns
    heading: Breakdowns
    blocks:
      - id: usphericalforcecomponent
        type: subsection
        title: USphericalForceComponent
      - id: usphericalforcecomponent-text
        type: text
        md: |-
          Unreal assumes the world has one down. On a planet, every point has a different one, and UE5's character movement still stores velocity as a world-space vector. Travel far enough around a sphere and that vector no longer lies on the surface you're standing on. At walking pace nobody notices. At 300 MPH it throws you off the planet.

          So I replaced the velocity model instead of patching the symptom. Every frame the component takes the rotation between last frame's surface normal and this frame's, and rotates every stored velocity by it, which is the standard way to carry a vector along a curved surface. Player steering and external forces ride in separate channels and are summed only at the final write, so a knockback can't corrupt your acceleration curve and holding forward can't cancel a knockback.
      - id: one-frame-by-tick-phase
        type: subsection
        title: One frame, by tick phase
      - id: one-frame-by-tick-phase-text
        type: text
        md: |-
          The player runs across four tick groups instead of one, and the order is the architecture.

          - Pre-physics decides everything before the simulation: surface speed, gravity direction, aim smoothing, aim assist, autotarget. It also runs my spherical gravity systems now to override and send to Unreal’s CMC Physics calculation.
          - During-physics resolves the move and runs heavy work in parallel with the physics engine, then aligns the camera.
          - Post-physics reads where the camera ended up: boom distance, pullback, Dutch angle, roll, velocity shake.
          - Post-physics work runs what doesn't affect gameplay, so field of view and the speed VFX can lose calculation time when the earlier groups run long.

          Every dependency points one way. Surface speed is computed before the camera reads it, gravity is applied before the move, the move resolves before the camera aligns, and the VFX read the final state of all of it.

          Collapse it into one tick and something samples a stale transform. At 300 MPH that's a visible frame of lag on exactly what the player is looking at.
  - id: design
    heading: Design
    blocks:
      - id: designing-combat-and-feel-at-speed
        type: subsection
        title: Designing Combat and Feel at SPEED
      - id: designing-combat-and-feel-at-speed-text
        type: text
        md: |-
          Speed and combat compete for the same attention, and most games pick one. Movement shooters, despite the name, use narrow linear levels to handle the going for you, so you can spend everything on the aiming.

          EXO is planet-scale and open, so the player steers the entire time. I couldn't hand off either half. The problem became decoupling perceived speed from mechanical difficulty: make it feel as fast as it is, without making it as hard as it is.
        wide: true
      - id: designing-combat-and-feel-at-speed-text-2
        type: text
        title: Why spheres
        md: Speed is relative. You can't feel it in the absolute, only against something else. A planet has no ending, no wall and no level boundary, so the player accelerates for as long as they can hold it together and the horizon keeps producing new things to measure against.
        wide: true
      - id: designing-combat-and-feel-at-speed-text-3
        type: text
        title: Two halves pulling opposite directions
        md: |-
          Everything on the perceived side raises the sensation: speed lines, motion streaks, edge warping, dynamic FOV, camera pullback, a small player against a huge world, sweeping environment pieces, shake that scales with velocity, chromatic aberration, hazards, and an MPH readout that goes up. Built across me, the 3D artist, the VFX artist and the audio engineer.

          Everything on the mechanical side lowers the difficulty, so the two meet somewhere operable: time dilation on reaction moments, ADS slowdown, on-target easing, auto-aim, aim assist, heat-seek, movement anticipation, staged speed tiers, and a velocity-to-MPH curve that reads fast and stays controllable.
        wide: true
      - id: designing-combat-and-feel-at-speed-text-4
        type: text
        title: Designing around acceleration
        md: |-
          The first version was hold shift, spend soul, go faster. Players held it constantly. It worked, and it had no danger in it.

          The insight came from our own marketing. Reviewing the short-form clips we were cutting, I kept flagging that they didn't look fast. That's the trap with a velocity number: anyone can make it go up and call the game fast.

          Felt speed is the gap between the speed you're at and the speed you were just at. So acceleration was the thing to design around. Starting a boost caches your current velocity, multiplies it by 1.5 and pushes hard to reach it, then keeps climbing slowly. Release, and you fall to your peak divided by 1.5.

          Every boost re-bases the curve. You never return to where you started, you return to a fraction of your new peak, and the next boost measures itself from there. Hold past empty and you enter Overdrive, which doubles current velocity and drains health, then exits into a burn-out window scaled to how long you stayed in.

          There is now a reason to let go of shift. Players don’t want to, but make up for it by using the calm in the storm to shoot down more enemies. And then when their Soul is back... it feels so much better to pedal to the metal.
        wide: true
      - id: designing-combat-and-feel-at-speed-text-5
        type: text
        title: Choice without stopping the game
        md: "Designed on paper, not yet built. Roguelike progression usually stops the game to present a choice, which in a game about momentum is the worst possible moment to take momentum away. So: level up, two or three stat options appear in the sky at a set distance, and you shoot the one you want. No pause, no slowdown. Five ticks ranks a stat up, and the first three permutations of two ranked stats unlock abilities matching that pairing. Mystery, but not a lottery; you should be able to predict roughly what fantasy a combination feeds."
        wide: true
  - id: reception
    heading: Reception
    blocks:
      - id: reception-text
        type: text
        md: |-
          3rd Place, ICS Project Expo, Game Design

          200+ playtesters across public sessions, with incredible reception, all coming in skeptical but having a blast; with many coming back for more.

          Demoed at the VGDC Z3 Games Expo (400+ attendance) and the SGDA Summit

          Steam-approved, pending Q3 2026 release

          Now it’s time to polish it up and work on publishing!
  - id: code
    heading: Code
    blocks:
      - id: code-frame
        type: text
        md: "Selected C++ from EXO: the intrusive object pool, the GAS attribute layer, and ability system initialization, each with a written breakdown."
      - id: code-code
        type: link
        href: https://github.com/malachek/EXO_CodeSamples
        label: github.com/malachek/EXO_CodeSamples
# Homepage card (Selected Work). Role overlays can override any field.
card:
  kind: project
  chips:
  - Unreal Engine 5.6
  - C++
  - UE5 Blueprints
  - GAS
  - Wwise
  - Perforce
  bullets:
  - Sole programmer on a team of 11. 3rd Place, ICS Project Expo.
  - Rebuilt Unreal's velocity model for spherical traversal, carrying velocity across surface curvature so the player stays on the planet at 300 MPH.
  - 'Designed enemy archetypes around what stays readable at speed: predictive drones, and arcing chargers whose telegraph is also their hitbox.'
  - 'Built the C++ layer underneath: four tick groups, O(1) intrusive pooling, GAS attribute clamping, and Discord OAuth2 with PKCE.'
  background: https://malachek.com/_assets/v11/9be49ad03c738b0097d663bfd53d30329406dbec.png
  media:
    kind: video
    src: https://malachek.com/_videos/v1/4dd3d3ae56b170bec92f22b4f777b5288b179c98
    alt: 'EXO: Third-person movement shooter on spherical planets, where speed is the weapon.'
  logo: https://malachek.com/_assets/v11/ce44e07dc887d4f99a6bfd0db1a8a922f3908549.png
  blurb: Third-person movement shooter on spherical planets, where speed is the weapon.
  category: Game Project
  dates: Aug 2024 - Present
  links:
  - icon: steam
    href: https://store.steampowered.com/app/4587490/EXO
    label: EXO on Steam
  - icon: github
    href: https://github.com/malachek/EXO_CodeSamples
    label: EXO code samples on GitHub
---
