---
# Loonage: page drafted 2026-09-26 from master/06-projects/6-6-loonage.md. Lines marked VERIFY are inferred; check them.
title: Loonage
accent: '#86BE3A'
path: /loonage
seo:
  title: "Loonage: Custom Polar Physics Platformer | Malachy Kennedy"
  description: "A platformer on a stack of spinning disks. Sole programmer on a team of 6; replaced Unity's physics with a custom polar-coordinate system in a 96-hour jam."
hero:
  lines:
    - A platformer on a stack of spinning disks, running on physics I wrote from scratch.
    - Sole Programmer · Team of 6 · Unity, C#
    - 96-hour game jam · July to August 2025
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Game jam · 6 developers
    - label: Genre
      value: Platformer
    - label: Role
      value: Sole Programmer
    - label: Duration
      value: 96 hours (July to August 2025)
    - label: Engine
      value: Unity
    - label: Language
      value: C#
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Loonage's world is a stack of spinning disks, and the player has to stand on them, ride them, and get pushed around by them as they rotate in either direction.

          Unity's built-in physics couldn't do that without jitter, and it flung players off curved surfaces mid-sprint... so I replaced it with a custom radial physics system, as the only programmer on the team, in 96 hours.
      - id: project-description-media
        type: media
        cols: 1
        items:
          - kind: image
            src: https://malachek.com/_assets/v11/14f7f7f1c050a0883747fbcdf47bcfe8f7dd0588.png?w=512
            alt: "Loonage: the stacked spinning disks"
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: polar-physics
        type: subsection
        title: Polar Physics
      - id: polar-physics-list
        type: bullets
        items:
          - "A custom 2D polar-coordinate physics system replacing Unity's built-in 3D physics"
          - "Arc length converted to angular bounds, projecting linear mesh bounds into precise angular collision ranges"
          - "Polar AABB collision on angular overlap and vertical extent, for traversal across rotating platforms"
          - "Continuous angular collision resolution: radial pushback along the surface curvature, so fast collisions never eject the player"
          - "Ground clamping that lets players stand on rotating platforms and travel with them without jitter"
          - "Spatial queries reduced to one O(N) pass over active entities, with no allocation churn"
  - id: design
    heading: Design
    blocks:
      - id: design-text
        type: text
        md: |-
          The physics only works if the momentum reads as intentional, so I tuned angular pushback, ground clamping and jump arcs until riding a disk felt like something the player chose to do.
        # VERIFY: expands 6-6 [3] "Tuned angular pushback, ground clamping, and jump arcs so rotating-surface momentum reads as intentional."
small:
  blurb: Custom radial physics system using polar coordinates. Unity 6, C#.
  image: https://malachek.com/_assets/v11/14f7f7f1c050a0883747fbcdf47bcfe8f7dd0588.png?w=512
---
