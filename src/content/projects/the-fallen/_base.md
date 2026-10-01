---
# The Fallen: shared facts and full copy for every role variant.
# Ported from the live site on 2026-09-26. Edit freely; this file is now the source.
title: The Fallen
accent: "#B38C1D"
path: /the-fallen
seo:
  title: "The Fallen: Action RPG Combat Demo | Malachy Kennedy"
  description: "A full action RPG combat kit built in one week: rewritten GAS damage pipeline, a 4-hit chain with hitstop and cancel windows, nine derived stats. UE 5.8."
hero:
  lines:
    - Action RPG combat kit built in one week, tuned to shipped-game feel.
    - Combat Engineer & Designer · Solo-programmed all player combat on a team of 8
    - Unreal Engine 5.8, C++, GAS · UniJam 2026
  background: /art/live/de093ab5c6458b75392c96d2ee63ca5356f3c2ec.webp
  logo: /art/live/fbf1649d27509ee2bebf2a989d1dec035697ffa1.png-w256.png
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Game Jam · 8 developers
    - label: Genre
      value: Action RPG Combat Demo
    - label: Role
      value: Combat Engineer & Designer
    - label: Duration
      value: Jun 2026 - July 2026 (1 week)
    - label: Engine
      value: Unreal Engine 5.8
    - label: Tools
      value: C++, UE5 Blueprints, GAS, Perforce
    - label: Status
      value: Released on itch.io
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          The Fallen is an action RPG combat kit I built in one week for UniJam 2026.

          The genre I was pulling from gives you variety by swapping characters mid-fight, and the more characters there are the more that compounds. I wanted it out of one character, which meant everything had to fit in a single kit and stay interesting for a whole fight instead of a four-second window.

          I wondered... how hard could it be? (Spoiler: it was hard, but I got them all in, and they feel pretty damn good.)

          References: Genshin Impact's systems, Zenless Zone Zero's feel and its stagger meter, League of Legends' kit complexity, Dislyte's interactions, Infinity Blade's progression.
      - id: project-description-media
        type: media
        cols: 1
        items:
          - kind: video
            src: https://media.malachek.com/live/2b11a8062517fd5f4ee7822fab28170affa696d8.mp4
            alt: "The Fallen: C++ targeting, anim warping, direction camera shake, kockback"
            caption: C++ targeting, anim warping, direction camera shake, kockback
      - id: project-description-text-1
        type: text
        md: |-
          Animation cancelling is the core of the whole thing. My special doubles as an attack-chain reset, so pressing it keeps you attacking.

          Add input buffering and two continuation windows on top, and the order you press things in becomes a real decision.

          On top of that is game feel with directional hitstop to give impact and visceral immersion into the game.

          I also rewrote GAS’s damage pipeline in C++ for a large variety of stats to create variety in player builds and playstyles.
      - id: project-description-media-2
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/16e5e08f9add5cf8188c2ca78020fe071cbd284b.mp4
            alt: "The Fallen: Directional hitstop and cancel windows"
            caption: Directional hitstop and cancel windows
          - kind: video
            src: https://media.malachek.com/live/7a2a5e02af751cc339118cd4832071912950dd70.mp4
            alt: "The Fallen: Ultimate State"
            caption: Ultimate State
          - kind: video
            src: https://media.malachek.com/live/f626bfff7116dddffce8bb0fda79cab97f633813.mp4
            alt: "The Fallen: Combo sequence"
            caption: Combo sequence
      - id: project-description-frame
        type: text
        md: I solo-programmed all player combat and core game logic, plus the hooks for UI, audio and VFX, and worked with the AI programmer on special interactions.
  - id: what-i-built
    heading: What I Built
    lead: Solo-programmed all player combat on a team of 8. One week.
    blocks:
      - id: damage-and-stats
        type: subsection
        title: Damage and Stats
      - id: damage-and-stats-frame
        type: text
        md: I rewrote GAS’s damage pipeline to account for custom interactions and complex systematic interactions.
      - id: damage-and-stats-list
        type: bullets
        items:
          - "Rewrote the GAS damage pipeline in C++: custom damage types, formula-driven resolution, layered modifiers, split callbacks"
          - "Nine derived stats over four exposed resources: health, stamina, energy, daze"
          - Diminishing-returns curves on every scaling stat
          - "Pierce: percentage defense ignore, plus on-hit decay damage scaled to enemy max health"
          - "Impact: flat-to-daze conversion on direct hits only, damage-over-time excluded"
          - "Dark Proficiency and Dark Mastery: scaling into decaying targets and into ultimate lifesteal"
          - Crit chance, crit damage, attack speed, defense, magic damage and energy recharge, all through the same pipeline
      - id: damage-and-stats-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/4a984b7cfbd967c42443d2284968b717a01196a2.mp4
            alt: "The Fallen: Standard damages"
            caption: Standard damages
          - kind: image
            src: /art/live/06805e885a08d8a4a63fcaec558b72a4fe7969a0.webp
            alt: "The Fallen: ← Stats in this"
            caption: ← Stats in this
          - kind: video
            src: https://media.malachek.com/live/f69c05bfbf7fe833a7a0f835e7bd68bc5ae08be4.mp4
            alt: "The Fallen: Dark on Dark interaction"
            caption: Dark on Dark interaction
      - id: animation-system-and-feel
        type: subsection
        title: Animation System & Feel
      - id: animation-system-and-feel-frame
        type: text
        md: Where the variety comes from. Input-driven Animation System.
      - id: animation-system-and-feel-list
        type: bullets
        items:
          - Four-hit chain into charged attack, special and ultimate, sequenced through AnimNotify hitboxes
          - "Input buffering: inputs sent mid-action queue and fire the instant recovery ends"
          - Attack stringing with two continuation windows and dynamic blending by input timing
          - Animation cancelling into charged, special, ultimate and dash-sprint ↓
          - Cancel windows on specific frames
          - Timeout-driven reset to neutral on a dropped combo
          - Hitstop with per-attack-type durations, tripled on dark-imbued hits
          - Directional camera shake oriented to the swing, differing for punch, kick, sword and elemental
          - Invulnerability frames on dodge and on specific ability startups
          - Parry and dodge windows with time dilation and a damage bonus
      - id: animation-system-and-feel-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/17de6c169858c7c638b78c555e1d4d0a24782f2e.mp4
            alt: "The Fallen: Animation Cancelling Attack with Ability into Attack"
            caption: Animation Cancelling Attack with Ability into Attack
          - kind: video
            src: https://media.malachek.com/live/e483936287537041290b8ce91483c0deed50d0a6.mp4
            alt: "The Fallen: Standard Attack Chain"
            caption: Standard Attack Chain
          - kind: video
            src: https://media.malachek.com/live/3fddefcc065b9dd29801ef3a3e43b93a8287e11e.mp4
            alt: "The Fallen: Directional Hitstop and Camera Shake & Zoom"
            caption: Directional Hitstop and Camera Shake & Zoom
      - id: status-systems
        type: subsection
        title: Status Systems
      - id: status-systems-frame
        type: text
        md: What decides which route through the kit is right for this enemy.
      - id: status-systems-list
        type: bullets
        items:
          - "Decay : A damage-over-time debuff that re-resolves the entire kit against that target, with bonus dark damage scaling off current health, energy returned on dark damage, healing on kill, and mass detonation by the ultimate"
          - "Daze: a stagger meter. Stuns at max, increases damage taken, strips 50% defense, doubles pierced damage. Mine is the implementation and the tuning."
          - Impact-to-daze values tuned per attack, per ability and per interaction
          - The two fed from deliberately separate stats, so both stay worth building
      - id: status-systems-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/e9579fff6b7d174be741e9c179d34480e75c768c.mp4
            alt: "The Fallen: Decay"
            caption: Decay
          - kind: video
            src: https://media.malachek.com/live/f69c05bfbf7fe833a7a0f835e7bd68bc5ae08be4.mp4
            alt: "The Fallen: Dark Attack on Decaying Enemy"
            caption: Dark Attack on Decaying Enemy
          - kind: video
            src: https://media.malachek.com/live/5067a4afd95e78db1e90298e025300b1e834fce8.mp4
            alt: "The Fallen: Stunning Enemy with Daze"
            caption: Stunning Enemy with Daze
      - id: abilities-and-targeting
        type: subsection
        title: Abilities & Targeting
      - id: abilities-and-targeting-frame
        type: text
        md: An ability has to give value and variety to the kit.
      - id: abilities-and-targeting-list
        type: bullets
        items:
          - Special ability doubling as an auto-attack reset
          - "Ultimate: detonates every active decay instance, refunds energy per pop, then drains health and converts all dark damage to lifesteal; self-extending on correct sequencing, early recast refunds health equal to decay damage dealt"
          - C++ targeting that blends player movement into attacks with custom anim warping
          - Knockback resolution reading the direction of the hit
          - Charged attack doubles as an accessible ability at the cost of time, with a reward of critting on dash, and parrying enemy attacks.
      - id: abilities-and-targeting-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/38cee28fab7dc99050b3b414ec33ed4e4e4be10e.mp4
            alt: "The Fallen: Ultimate Ability State"
            caption: Ultimate Ability State
          - kind: video
            src: https://media.malachek.com/live/bebceacd2f77e6cfb1ff7834d60bf5ec11afe87a.mp4
            alt: "The Fallen: Anim Warping"
            caption: Anim Warping
          - kind: video
            src: https://media.malachek.com/live/be45ff33f9f0a78fd2644a1f9a59938b04ccd110.mp4
            alt: "The Fallen: Charged Attack Parry"
            caption: Charged Attack Parry
      - id: architecture
        type: subsection
        title: Architecture
      - id: architecture-frame
        type: text
        md: Seven people building against combat without breaking it
      - id: architecture-list
        type: bullets
        items:
          - C++ combat core bridged to UE5 Blueprints with typed callbacks used to spawn damage numbers consistently
          - C++ classes for UI hooks to optimize stat check calls and provide to UI Designer
          - Cooldowns, lifesteal and deferred damage kept consistent across every system
          - Data Structures to store player and enemy stats to test scaling
          - Save system to save and load player stats as they progress run-to-run
          - Designers could build against combat without being able to break it
  - id: breakdowns
    heading: Breakdowns
    blocks:
      - id: how-one-character-can-hold-the-field-animations
        type: subsection
        title: How one character can hold the field (animations)
      - id: how-one-character-can-hold-the-field-animations-text
        type: text
        md: |-
          The challenge was one character, and the genre I was borrowing from builds variety by swapping. So the variety had to come from somewhere else, and at its core it came from the animation system.

          A basic attack is committed. An ability is not. The basic chain cancels on any non-basic input, and my special doubles as an attack-chain reset, so pressing it puts you back at the start of the chain instead of waiting out the animation. That's the Eula's-E pattern, and it means an ability is an animation-layer decision before it's a damage decision.

          Once cancelling exists, the order and timing of your inputs changes your output, not just your stat sheet. Input buffering queues anything sent mid-action and fires it the instant recovery ends. Two continuation windows blend the chain differently depending on when you press. Cancel windows open on specific frames into dash, special or ultimate.

          So there isn't one optimal rotation, there are several valid routes through the same kit.
      - id: how-one-character-can-hold-the-field-animations-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/e483936287537041290b8ce91483c0deed50d0a6.mp4
            alt: "The Fallen: Standard Combo Chain"
            caption: Standard Combo Chain
          - kind: video
            src: https://media.malachek.com/live/60949edc904ff94b8d3bddc4bf5468def5d6b389.mp4
            alt: "The Fallen: Standard Combo Chain with Input Buffering"
            caption: Standard Combo Chain with Input Buffering
          - kind: video
            src: https://media.malachek.com/live/e7b50b970e9efc3704779826d6f71115f31b04a6.mp4
            alt: "The Fallen: Hitboxes authored on the timeline"
            caption: Hitboxes authored on the timeline
      - id: decay-and-daze
        type: subsection
        title: Decay & Daze
      - id: decay-and-daze-text
        type: text
        md: |-
          The systems layer on top of cancelling. It decides which of those routes is right for the enemy in front of you.

          Daze is a stagger meter inspired by ZZZ’s. It fills as the enemy takes damage based on the applying attack/ability, stuns at max, raises damage taken, strips half their defense and doubles pierced damage. What is mine there is the implementation and the tuning, which is most of the work in practice.

          Decay is a custom system I built for The Fallen when designing the Dark element and how it should play as a hypercarry. Decay is a damage-over-time debuff that changes what the rest of the kit does to a target: bonus dark damage scaling off current health, energy returned on dark damage, healing on kill, and every active instance detonated at once by the ultimate. Nothing in the kit resolves the same way against a decaying enemy as against a healthy one.

          The interaction between the two is the part I spent the most time on. Impact converts a flat number into daze on direct hits only, and decay's damage-over-time is deliberately immune to it, so stacking Impact rewards on-hit pressure and stacking Dark Proficiency rewards applying decay and letting it tick. Neither can double-dip into the other, so both stay worth building.

          That closes the loop. Attack speed feeds daze, daze opens a window pierce exploits, pierce adds decay damage, decay returns energy, energy pays for the ultimate, and the ultimate detonates decay.
      - id: decay-and-daze-media
        type: media
        cols: 3
        items:
          - kind: video
            src: https://media.malachek.com/live/4a984b7cfbd967c42443d2284968b717a01196a2.mp4
            alt: "The Fallen: Attack + Decay Attack"
            caption: Attack + Decay Attack
          - kind: video
            src: https://media.malachek.com/live/e9579fff6b7d174be741e9c179d34480e75c768c.mp4
            alt: "The Fallen: Decay DOT"
            caption: Decay DOT
          - kind: video
            src: https://media.malachek.com/live/5067a4afd95e78db1e90298e025300b1e834fce8.mp4
            alt: "The Fallen: Daze to Stun"
            caption: Daze to Stun
  - id: design
    heading: Design
    blocks:
      - id: designing-variety-into-one-character
        type: subsection
        title: Designing Variety into One Character
      - id: designing-variety-into-one-character-text
        type: text
        md: |-
          The genre I wanted to explore hands the player variety through parties. Genshin, ZZZ and Dislyte build depth by swapping characters mid-rotation, and the more characters there are, the more that variety compounds.

          I wanted that depth inside one character.

          That constraint drove everything after it. If the player never swaps, every source of variety has to live in one kit, and that kit has to stay interesting for a whole fight instead of a four-second window.
      - id: designing-variety-into-one-character-text-3
        type: text
        title: What makes an ability feel like an ability
        md: |-
          An ability is an attack that can't behave like one. It can't be spammable, it needs a reason to press that a basic attack never needs, and it has to give value to the kit and take value back out.

          In Genshin, players use Eula's E as an auto-attack reset rather than for its damage. That pattern holds across hypercarries built for high on-field uptime, which was my constraint exactly. So the ability earns its place inside the attack chain: pressing it keeps you attacking.

          That's an animation-layer mechanic. I wanted a systems layer on top of it.
      - id: designing-variety-into-one-character-text-4
        type: text
        title: So what is dark, actually
        md: |-
          Genshin is my main inspiration, so the character needed an element. I picked dark, because I don't think games have really explored it.

          Dark magic in film and books is a shadow, and shadow goes through things. So a dark attack should ignore the armor in front of it, and it should hinder what it hits. Pierce came straight out of that. For the hindering half I used a stagger meter, which is ZZZ's, not mine.

          Pierce and a stagger meter alone still leave one optimal loop: some normals, cancel with E, cancel E with dash, repeat. So dark got Decay. That one is entirely my design: it changes how every later attack resolves against that target, and scales up as their health drops.

          Now the ability does two things at once. It resets the chain in the animation layer and changes the target's state in the systems layer, and each makes the other worth doing.
      - id: designing-variety-into-one-character-text-5
        type: text
        title: The fantasy the ultimate is for
        md: "The dark overlord version of the power fantasy is specific: sacrifice your own life force to destroy theirs and take it for yourself. So the ultimate drains your health the whole time it's active, converts your dark damage to lifesteal, and pays you back at the end for every point of decay damage it dealt."
      - id: designing-variety-into-one-character-text-6
        type: text
        title: Bundling the level-ups
        md: |-
          The usual problem with stat upgrades is that one of them is always correct, so the pick isn't really a pick. So I bundled them: roughly 25 options, most granting a weighted mix of two or three stats. Taking the stat you want usually means taking something else with it, and there's no always-choose-crit answer.

          Bundling gave me somewhere to put flavor, too. Once an option is a combination and not a number, it earns a name, and Damnate, Decayer and Pray can do lore work that "Crit Rate +5%" never could.
  - id: reception
    heading: Reception
    blocks:
      - id: reception-text
        type: text
        md: |-
          One week: a rewritten damage pipeline, a 4-hit chain with three ability tiers, two interacting status systems, nine derived stats, and an animation system with buffering, cancelling, hitstop, and i-frames. Tuned until it stopped feeling like a jam build.

          Outcome: A very proud team with the work we did. We all impressed ourselves and eachother :)
# Homepage card (Selected Work). Role overlays can override any field.
card:
  kind: project
  chips:
  - Unreal Engine 5.8
  - C++
  - UE5 Blueprints
  - GAS
  - Perforce
  bullets:
  - Solo-programmed all player combat on a team of 8, in a one-week jam.
  - 'Built the animation system the kit runs on: input buffering, two continuation windows, cancel windows on specific frames, and AnimNotify hitboxes.'
  - Rewrote the GAS damage pipeline in C++ so a single hit resolves differently by attack type, target state, and what landed before it.
  - Designed Decay, a status that re-resolves every later attack against its target, over 9 derived stats on diminishing-returns curves.
  background: /art/live/de093ab5c6458b75392c96d2ee63ca5356f3c2ec.webp
  media:
    kind: image
    src: /art/live/7b823eb48ccbe1e948493a81dd054c86f4a48f06.png.gif
    alt: 'The Fallen: Action RPG combat kit built in one week, tuned to shipped-game feel.'
  logo: /art/live/fbf1649d27509ee2bebf2a989d1dec035697ffa1.png-w128.png
  blurb: Action RPG combat kit built in one week, tuned to shipped-game feel.
  category: Game Jam
  dates: Jun 2026 - Jul 2026
  links:
  - icon: itch
    href: https://kkartin.itch.io/fallen
    label: The Fallen on itch.io
---
