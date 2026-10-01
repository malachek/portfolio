---
# Kawai’ian Isolation: shared facts and full copy for every role variant.
# Ported from the live site on 2026-09-26. Edit freely; this file is now the source.
title: Kawai’ian Isolation
accent: "#FF3399"
path: /kawaiian-isolation
seo:
  title: "Kawai'ian Isolation: Narrative Horror | Malachy Kennedy"
  description: "Technical Director on a UE5 title shipped to Steam, 10,000+ claims in 100 hours. 22 scenes scripted in UE5 Blueprints and a CSV-to-Wwise dialogue pipeline."
hero:
  lines:
    - First-person narrative adventure. A tragedy about the beauty and horror of identity.
    - Technical Director & Engineer · 6 core, 30+ contributors · Unreal Engine 5.3
    - Shipped on Steam, reaching 10,000+ claims in the first 100 hours.
  background: /art/live/c122267c0dd96616744b0da7a45051bd2f598f1d.webp
  logo: /art/live/5e20111865f706bd15b7d90449d40bb7373405d0.png-w256.png
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Commercial Release (Steam)
    - label: Genre
      value: Narrative Adventure Horror
    - label: Role
      value: Technical Director & Engineer
    - label: Size
      value: 6 Core, 30+ Contributors
    - label: Duration
      value: Apr 2024 - May 2026
    - label: Engine
      value: Unreal Engine 5.3
    - label: Tools
      value: |-
        UE5 Blueprints, Wwise, Perforce,
        Apps Script, Miro, Sheets
    - label: Status
      value: |-
        Released on Steam with
        10,000+ claims in 100 hours.
  steamAppIds:
    - 3812810
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Kawai'ian Isolation is a first-person narrative adventure turned survival horror. The player controls Mayumi as she explores her memories of Kawai'i and the lived purgatory of Paradise.

          It began as a two-quarter pitch project at UCI's Video Game Development Club and continued under Burnt Out Games through polish and commercial release. The core problem: how do you move a player through a story when nothing in the design is allowed to force them?
      - id: project-description-video
        type: embed
        src: https://www.youtube-nocookie.com/embed/-8HKhfh5VAc
        title: Kawai’ian Isolation trailer
        caption: Trailer. Wrote, recorded, and edited by me (in Premiere Pro)
      - id: project-description-text-1
        type: text
        md: |-
          How do you move a player through a story when nothing in the design is allowed to force them? Waypoints work, and they announce that the game is steering.

          So I borrowed from level design and used it inside narrative design: landmarks, framing, and fear paced deliberately. (It took a LOT of playtesting.)

          Writers author 56 pages of dialogue in a spreadsheet and the build reads it, so the VA director and the Wwise engineer never have to open Unreal.

          We had twice the script we could implement. Cutting half of it is what turned the timeline jump into the mystery.
      - id: project-description-frame
        type: text
        md: I served as Technical Director across Audio, Design, Programming and Writing, and worked as Tools Engineer, Narrative Designer and Writer, and Gameplay Designer.
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: tools-engineering
        type: subsection
        title: Tools Engineering
      - id: tools-engineering-frame
        type: text
        md: Automating 56 pages of dialogue outside of engine, into Unreal.
      - id: tools-engineering-list
        type: bullets
        items:
          - CSV to Unreal to Wwise dialogue pipeline for 56 pages of dialogue ↓
          - Google Sheet and Apps Script front end, so VO authoring never opens the build
          - "Runtime ingest: AkAudioEvent caching from the Wwise project, per-scene asset resolution, gamestate-context chunk loading"
          - Branching playback auto-advancing against Wwise event length, player action and world state
          - "10 custom Agile tools in Miro and Sheets: scheduling calendar, progress tracker, visual Kanban"
      - id: tools-engineering-media
        type: media
        cols: 2
        items:
          - kind: image
            src: /art/live/a0672772e180688f62c40ccd74a1e4f36a5b2620.webp
            alt: "Kawai’ian Isolation: One of ten production tools"
            caption: One of ten production tools
          - kind: image
            src: /art/live/0d7af7a4109d916f9cde17db2ac300b4c137c02e.webp
            alt: "Kawai’ian Isolation: Scheduling against the dependency graph"
            caption: Scheduling against the dependency graph
      - id: technical-design-and-scripting
        type: subsection
        title: Technical Design & Scripting
      - id: technical-design-and-scripting-frame
        type: text
        md: 22 scenes, with none allowing forceful control of the player
      - id: technical-design-and-scripting-list
        type: bullets
        items:
          - 22 single-player scenes scripted in UE5 Blueprints and project-proprietary tools
          - AI direction, dialogue events, Blackboard checks
          - Player pathing, progression and collision
          - Save system, coded animations, and calls into tech-art systems like weather
      - id: technical-design-and-scripting-media
        type: media
        cols: 2
        items:
          - kind: image
            src: /art/live/dbc971671304f87737b5a14c5ca0985e68a2cec2.png.gif
            alt: "Kawai’ian Isolation: Branding playback, auto-advancing with Wwise calls"
            caption: Branding playback, auto-advancing with Wwise calls
          - kind: image
            src: /art/live/d4522998bba0b0f2f4fe90c827e931d7f811c3de.png.gif
            alt: "Kawai’ian Isolation: A scripted scene playing out"
            caption: A scripted scene playing out
      - id: direction-and-production
        type: subsection
        title: Direction & Production
      - id: direction-and-production-frame
        type: text
        md: I made custom production tools to accommodate our many teams across many scenes.
      - id: direction-and-production-list
        type: bullets
        items:
          - Technical department of 18+ contributors across four disciplines
          - AWS EC2 Perforce server, provisioned and administered
          - Onboarding docs and tutorials that brought 30+ contributors into the pipeline
      - id: narrative-design-and-writing
        type: subsection
        title: Narrative Design & Writing
      - id: narrative-design-and-writing-frame
        type: text
        md: Building characters to stay coherent and feel real across 22 scenes.
      - id: narrative-design-and-writing-list
        type: bullets
        items:
          - 56-page screenplay across 22 scenes, with a second writer and two consulting narrative designers
          - "One-page character template: Characterization, Development, Motivation, Need, Hamartia"
          - Character psychology drawn from Jungian theory, Objective Personality and the Enneagram
          - Timeline restructure that halved implementation scope without breaking flow
      - id: narrative-design-and-writing-media
        type: media
        cols: 2
        items:
          - kind: image
            src: /art/live/e0a1d08d70a7327af183fea43ef9835993f5872e.png.png
            alt: "Kawai’ian Isolation: The template every character is built from"
            caption: The template every character is built from
          - kind: image
            src: /art/live/28f2f99645084424865b67d3fffd012c1bb9ec5f.png.png
            alt: "Kawai’ian Isolation: Character sheet for Annabelle, our companion’s foil"
            caption: Character sheet for Annabelle, our companion’s foil
  - id: breakdown
    heading: Breakdown
    blocks:
      - id: the-dialogue-pipeline
        type: subsection
        title: The dialogue pipeline
      - id: the-dialogue-pipeline-list
        type: bullets
        items:
          - 56 pages of dialogue, a VA director, a Wwise engineer and 30+ contributors, none of whom should need to open Unreal to do their job. So I designed the content pipeline around that constraint instead of around the engine.
          - A Google Sheet with Apps Script externalizes VO authoring, so the VA director and the Wwise engineer work cued to dialogue without ever touching the build. The runtime tool ingests the CSV, caches AkAudioEvent files from their source location in the Wwise project, resolves the assets each scene needs, loads chunks into memory against the gamestate context, and auto-advances playback against Wwise event length, player actions and world state.
          - Branching playback selects lines from cached player choices and world state, so a scene plays differently depending on what the player did three scenes ago.
          - Writers author in a spreadsheet, the tool reads it, and the build is downstream of both.
      - id: the-dialogue-pipeline-media
        type: media
        cols: 3
        items:
          - kind: image
            src: /art/live/f29a995b1aa4875cd6b60251e8269b2732fac37f.png-w512.png
            alt: "Kawai’ian Isolation: Authoring Sheet with JS"
            caption: Authoring Sheet with JS
          - kind: image
            src: /art/live/768dd53413a39aa8a76900f59e19242a9bd5734b.png-w512.png
            alt: "Kawai’ian Isolation: Import to Unreal"
            caption: Import to Unreal
          - kind: image
            src: /art/live/dbc971671304f87737b5a14c5ca0985e68a2cec2.png.gif
            alt: "Kawai’ian Isolation: Dialogue Playback"
            caption: Dialogue Playback
  - id: design
    heading: Design
    blocks:
      - id: designing-direction-without-force
        type: subsection
        title: Designing Direction Without Force
      - id: designing-direction-without-force-frame
        type: text
        md: Automating 56 pages of dialogue outside of engine, into Unreal.
      - id: designing-direction-without-force-text
        type: text
        md: |-
          A linear game can close the door behind you. Kawai'ian Isolation is open and semi-linear, so the player can stand still, walk the wrong way, or miss the thing the next scene depends on. Nothing in the design is allowed to grab them, and the story still has to land in order.

          The cheap answers are waypoints, objective markers, and a character telling you where to go. All of them work, and all of them announce that the game is steering.

          So I borrowed from level design and used it inside narrative design. Landmarks to draw attention. Framing to establish the objective without stating it. Fear, paced deliberately, to keep the player walking forward instead of exploring backward. It took a lot of playtesting.
      - id: designing-direction-without-force-text-2
        type: text
        md: |-
          Cutting half the game without breaking it We had far more script written than we had capacity to implement, and a generic cut would have broken the flow. The flow was the game.

          The original script ran chronologically: Past, then Present, then Paradise. Restructuring it made the jump between timelines part of the mystery. The change in location told the player a jump had happened with nobody explaining it, and every playtester understood it. Lore from the Present went in as teasers, so players piece the events together across playthroughs.

          It halved the scenes we had to implement, and it made the game better, because it forced us to cut everything that wasn't essential. The voice came out very strong despite saying almost nothing.
      - id: designing-direction-without-force-text-3
        type: text
        title: Making the characters feel real
        md: |-
          Direction only works if the player wants to follow the story, and that comes down to whether the characters read as people. Immersion is the whole product on a narrative game; a player who stops believing a character stops caring where that character is going.

          For the psychology underneath them I drew on Jungian theory, Objective Personality and the Enneagram.

          Those gave me a formula characterization is a byproduct of, so I could work out what would make a character break down, what that breakdown would look like, and how it would function in the story.

          Then I built a one-page template to force consistency: Characterization, Development, Motivation, Need, and Hamartia. Need and Hamartia are the two that actually drive a character somewhere, and they're why the template exists at all.
  - id: reception
    heading: Reception
    blocks:
      - id: reception-text
        type: text
        md: |-
          10,000+ claims in the first 100 hours on Steam

          30+ contributors across a two-year development

          Featured in New University: a behind-the-scenes on Burnt Out Games & Kawai'ian Isolation
        embed:
          src: https://newuniversity.org/2026/05/10/a-behind-the-scenes-of-burnt-out-games-kawaiian-isolation/
          title: Press feature
          width: 392
          height: 459
# Homepage card (Selected Work). Role overlays can override any field.
card:
  kind: project
  chips:
  - Unreal Engine 5.3
  - UE5 Blueprints
  - Wwise
  - Perforce
  - Apps Script
  - Steam
  bullets:
  - Shipped on Steam, reaching 10,000+ claims in its first 100 hours.
  - Engineered a CSV-to-Unreal-to-Wwise dialogue pipeline with branching playback that selects lines from cached player choices and world state, so 56 pages of dialogue were authored outside the build.
  - Scripted mechanics, levels, and sequencing for 22 single-player scenes in UE5 Blueprints, covering AI direction, dialogue events, Blackboard checks, the save system, coded animations, and player pathing.
  - Technical Director for 18+ contributors across audio, design, programming and writing; ran the AWS EC2 Perforce server for 30+.
  background: /art/live/d43cbfd72790816057b2b227ecb49fb376f08c41.webp
  media:
    kind: image
    src: /art/live/82674e6a2c6d8afa01cf8dc7acfdf908325797a0.png.gif
    alt: 'Kawai’ian Isolation: First-person narrative adventure horror. 30+ contributors.'
  logo: /art/live/5e20111865f706bd15b7d90449d40bb7373405d0.png-w128.png
  blurb: First-person narrative adventure horror. 30+ contributors.
  category: Game Project
  dates: Apr 2024 - Jan 2026
  links:
  - icon: steam
    href: https://store.steampowered.com/app/3812810/Kawaiian_Isolation
    label: Kawai'ian Isolation on Steam
---
