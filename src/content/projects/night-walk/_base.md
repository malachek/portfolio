---
# Night Walk: page drafted 2026-09-26 from master/06-projects/6-7-night-walk.md. Lines marked VERIFY are inferred; check them.
title: Night Walk
accent: '#43792E'
path: /night-walk
seo:
  title: "Night Walk: First-Person Horror Experience | Malachy Kennedy"
  description: "A first-person horror experience in Unreal Engine 5.7, built by a team of 5 in 72 hours: movement, a double-barrel shotgun, and a night-vision camcorder shader."
hero:
  lines:
    - First-person horror experience where the camcorder is your only light.
    - Engineer, Designer & Tech Artist · Team of 5 · Unreal Engine 5.7
    - Spring ZotJam 2026 · 72 hours
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Game jam · 5 developers
    - label: Genre
      value: First-Person Horror
    - label: Role
      value: Engineer, Designer & Tech Artist
    - label: Duration
      value: April 2026 (72 hours)
    - label: Engine
      value: Unreal Engine 5.7
    - label: Tools
      value: Figma, UMG
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Night Walk is a first-person horror experience my team of 5 built in 72 hours for Spring ZotJam 2026.

          The camcorder is the only light source and the double-barrel shotgun is the only defense, so every look into the dark costs you your weapon.
      - id: project-description-media
        type: media
        cols: 1
        items:
          - kind: image
            src: https://malachek.com/_assets/v11/846f5c5a4d18e88e13060454a449403ca73d7d0c.png?w=512
            alt: "Night Walk: the night-vision camcorder view"
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: gameplay
        type: subsection
        title: Gameplay
      - id: gameplay-list
        type: bullets
        items:
          - "First-person movement in UE 5.7: sprint, crouch, and a muffle mechanic for moving quietly"
          - "Weapon equip, fire and aim for the shotgun, plus camcorder zoom"
          - "Game feel tuned to a commercial standard: per-step camera shake, camera zoom curves, and shotgun-fire camera jolt"
      - id: tech-art-and-ui
        type: subsection
        title: Tech Art & UI
      - id: tech-art-and-ui-list
        type: bullets
        items:
          - "A post-process shader for camcorder night vision, with power-on, flicker, filter and zoom states"
          - UI designed in Figma and implemented in-engine as UMG widgets
  - id: design
    heading: Design
    blocks:
      - id: seeing-costs-you
        type: subsection
        title: "Seeing Costs You"
      - id: seeing-costs-you-text
        type: text
        md: |-
          I made seeing and shooting mutually exclusive: the camcorder is the only light and the shotgun is the only defense, so every look into the dark means lowering the gun.

          The camcorder's own feedback (flicker, zoom, filter states) makes your only vision source a source of tension too.

          With 72 hours, I cut scope to one loop and spent the time polishing it.
        # VERIFY: third paragraph paraphrases 6-7 [3] "Cut scope to one loop and polished it"
  - id: play
    heading: Play
    blocks:
      - id: play-link
        type: link
        href: https://peteryoon.itch.io/night-walk
        label: Play Night Walk on itch.io
small:
  blurb: First person horror experience. UE5.7
  image: https://malachek.com/_assets/v11/846f5c5a4d18e88e13060454a449403ca73d7d0c.png?w=512
  links:
  - icon: itch
    href: https://peteryoon.itch.io/night-walk
    label: Night Walk on itch.io
---
