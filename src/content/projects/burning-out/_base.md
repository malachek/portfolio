---
# Burning Out: shared facts and full copy for every role variant.
# Ported from the live site on 2026-09-26. Edit freely; this file is now the source.
title: Burning Out
accent: "#E34622"
path: /burning-out
seo:
  title: "Burning Out: Multiplayer Survival Horror | Malachy Kennedy"
  description: "Co-op horror shipped on Steam. Networked inventory on Mirror, a torch-and-fire system built as the tension mechanic, validated with 100+ playtesters."
hero:
  lines:
    - Co-op horror maze escape, lit and lived only by sharing fire.
    - Gameplay & Network Engineer · 7 core developers · Unity 6, Mirror Networking
    - Shipped on Steam, the studio's first release
  background: https://malachek.com/_assets/v11/f700424867b8be9c9457bdccc5e522d4f83863a6.png
  logo: https://malachek.com/_assets/v11/cd20337cc83da35fcaab874e1990acfe1cc9ebad.png?w=256
  logoAlt: Burning Out Logo
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Commercial Release (Steam)
    - label: Genre
      value: Multiplayer Survival Horror
    - label: Role
      value: Gameplay & Network Engineer
    - label: Size
      value: "7"
    - label: Duration
      value: Jan 2025 - Aug 2025
    - label: Engine
      value: Unity 6
    - label: Tools
      value: |-
        C#, Mirror Networking, 
        Steamworks, Git, Miro
  steamAppIds:
    - 3795170
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Burning Out is a third-person co-op survival horror game about being alone together. Players escape the maze's floors as a group, evading its monsters and unearthing its secrets. The only light down there is fire they have to carry, share, and spend.

          It began in UCI's Game Design program, boothed at the Z3 Games Expo 2025, and shipped to Steam under Burnt Out Games. I drove the whiteboard discussions around one question, and we used it as the basis for every design decision: how do you make multiplayer horror actually scary?
      - id: project-description-video
        type: embed
        src: https://www.youtube-nocookie.com/embed/67qtTwK3ETY
        title: Burning Out trailer
      - id: project-description-text-1
        type: text
        md: |-
          Being alone in the dark is frightening. Being alone in the dark with three friends on voice chat is a comedy.

          So the light became the answer: fire is finite, it burns down, and you have to carry and share it.

          Splitting up means somebody walks in the dark. The game never enforces the group staying together; the players enforce it on each other.

          Fire is the only resource and it gets handed between players, so every client has to agree about who is holding what.
      - id: project-description-frame
        type: text
        md: I designed and engineered core gameplay, systems and UX, and co-founded the LLC that published it.
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: damage-and-stats
        type: subsection
        title: Damage and Stats
      - id: damage-and-stats-frame
        type: text
        md: The tension mechanic is a lighting system.
      - id: damage-and-stats-list
        type: bullets
        items:
          - "Torch and fire system: dynamic lighting, flame behavior, torchwood burndown, tuned so a torch running low is something you notice before it matters"
          - Movement controls and interaction
      - id: damage-and-stats-media
        type: media
        cols: 3
        items:
          - kind: image
            src: https://malachek.com/_assets/v11/85d884655a3b88c20276494b61c5e5960337ed91.png
            alt: "Burning Out: Pick-Up & Light"
            caption: Pick-Up & Light
          - kind: image
            src: https://malachek.com/_assets/v11/e72927781df4f58d88516a90dc2c3e8f7fdb8697.png
            alt: "Burning Out: Dominance Swap & Drop"
            caption: Dominance Swap & Drop
          - kind: image
            src: https://malachek.com/_assets/v11/8ad59aa08a8e38124ce839a36bcf7f4178605485.png
            alt: "Burning Out: Fire Sharing"
            caption: Fire Sharing
      - id: systems-and-network-engineering
        type: subsection
        title: Systems & Network Engineering
      - id: systems-and-network-engineering-frame
        type: text
        md: Every client has to agree on who is holding which light, and where they are
      - id: systems-and-network-engineering-list
        type: bullets
        items:
          - Networked inventory on Mirror with custom OOP containers and templated items ↓
          - Item state kept consistent across clients
          - Animated on-hand and off-hand selection, synced between players
          - System documentation as the contract designers and programmers built against
      - id: ux-and-release
        type: subsection
        title: UX & Release
      - id: ux-and-release-frame
        type: text
        md: Every playtest came back about clarity
      - id: ux-and-release-list
        type: bullets
        items:
          - 100+ playtesters across classes and the Z3 Expo, through notes and surveys
          - "Clarity pass: loading screen, themed tutorial billboard, coordinate markers, and better visibility on the stepping-stones toward the goal"
          - Steam storefront setup, release logistics, and rapid fixes for what live players surfaced after launch
      - id: ux-and-release-media
        type: media
        cols: 2
        items:
          - kind: image
            src: https://malachek.com/_assets/v11/bc190e277b256de7cbb769e624d0657634d417d8.png?w=512
            alt: "Burning Out: gameplay"
          - kind: image
            src: https://malachek.com/_assets/v11/fccf4c50f5f1686f0741cd81f59d4092ce1d9fcd.png?w=512
            alt: "Burning Out: gameplay"
  - id: design
    heading: Design
    blocks:
      - id: designing-fear-into-co-op
        type: subsection
        title: Designing Fear into Co-op
      - id: designing-fear-into-co-op-text
        type: text
        md: |-
          Co-op defuses horror. Being alone in the dark is frightening. Being alone in the dark with three friends on voice chat is a comedy.

          Most co-op horror games answer this by separating players with objectives or map design. That works right up until players stop cooperating.

          So I made the light itself the answer. Fire is finite, it burns down, and players carry and share it. Every decision about where to go is also a decision about who gets to see.

          The group stays together because splitting up means someone walks in the dark. The game never enforces that; the players enforce it on each other.
  - id: reception
    heading: Reception
    blocks:
      - id: reception-text
        type: text
        md: |-
          Shipped on Steam, Burnt Out Games' first commercial release

          100+ playtesters across classroom sessions and a public expo booth

          Boothed at the UCI Z3 Games Expo 2025
---
