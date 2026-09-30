---
# Little Rockstar: page drafted 2026-09-26 from master/06-projects/6-8-little-rockstar.md.
# Lines marked VERIFY are inferred; check them. Logo, screenshots and colour (from the logo's red) added 2026-09-29.
title: Little Rockstar
accent: "#D5473C"
path: /little-rockstar
seo:
  title: "Little Rockstar: VR Narrative Experience | Malachy Kennedy"
  description: "A VR narrative experience in Unity 6 and the Meta XR SDK, built in 48 hours as the sole engineer on a team of 6."
hero:
  lines:
    - A VR narrative experience, built in 48 hours.
    - Sole Engineer · Team of 6 · Unity 6, C#, Meta XR SDK
    - VGDC Winter ZotJam 2026 · 48 hours
  background: /art/little-rockstar/room.webp
  logo: /art/little-rockstar/logo.png
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Game jam · 6 developers
    - label: Genre
      value: VR Narrative Experience
    - label: Role
      value: Sole Engineer
    - label: Duration
      value: January 2026 (48 hours)
    - label: Engine
      value: Unity 6, Meta XR SDK
    - label: Tools
      value: C#, Git, FMOD
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Little Rockstar is a VR narrative experience in the style of Before Your Eyes, made for VGDC's Winter ZotJam 2026.

          I was the only engineer on a team of 6, and I learned the Meta XR SDK from scratch to build it in 48 hours.
      - id: project-description-media
        type: media
        cols: 3
        items:
          - kind: image
            src: /art/little-rockstar/room.webp
            alt: "Little Rockstar: the bedroom, with a desk, a piano and a Before Your Eyes poster"
            caption: The bedroom the story plays out in
          - kind: image
            src: /art/little-rockstar/hands.webp
            alt: "Little Rockstar: the VR hand models in the editor"
            caption: VR hands
          - kind: image
            src: /art/little-rockstar/unity-editor.webp
            alt: "Little Rockstar: Act 1 in the Unity editor, with look-at triggers and spawners listed in the inspector"
            caption: Act 1 in Unity, wired as look-at triggers and spawners
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: what-i-built-list
        type: bullets
        items:
          - "Physics interactions on the Meta XR SDK"
          - "An event-driven narrative system that plays the story beats"
          - "Audio hooks into FMOD"
          - "Version control for the team of 6"
small:
  blurb: VR narrative experience in 48 hours, learning the Meta XR SDK from scratch. Unity 6, C#.
  image: /art/little-rockstar/room.webp
---
