---
# CORA: shared facts and full copy for every role variant.
# Ported from the live site on 2026-09-26. Edit freely; this file is now the source.
title: CORA
accent: "#D88394"
path: /taralumen-cora
seo:
  title: "CORA: 2.5D Metroidvania | Taralumen Games Internship"
  description: "Unity 6 internship at Taralumen Games: a 6,208-LOC C# codebase on Strategy Pattern and dependency injection, 40+ builds, now a studio's production reference."
hero:
  lines:
    - A 2.5D multi-plane metroidvania about confronting anxiety through play.
    - Game Development Intern at Taralumen Games · Unity 6, C#
    - Apr 2025 – Mar 2026 · Under NDA
  background: https://malachek.com/_assets/v11/03e1803a382b085deaf0be0a6105fe77a5965a80.png?w=1536
  logo: https://malachek.com/_assets/v11/a98d4015968683d1996141dca36f065312aaae24.png?w=256
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Internship Project
    - label: Genre
      value: 2.5D Platformer Metroidvania
    - label: Role
      value: Game Development Intern
    - label: Team
      value: Reporting to CEO and board
    - label: Duration
      value: Apr 2025 - Mar 2026
    - label: Engine
      value: Unity 6
    - label: Tools
      value: C#, Unity 6, Git, Trello
  code:
    href: https://github.com/malachek/CORA_CodeSamples
    label: github.com/malachek/CORA_CodeSamples
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          CORA is a 2.5D multi-plane adventure game about navigating depth and solving puzzles across overlapping planes of space. Its mechanics, levels, and narrative teach players to confront anxiety using real-world coping strategies.

          Over the internship I completed a fully-fledged demo: 3 environment levels and 30+ production-ready mechanics, delivered across 40+ playable builds on a twice-weekly review cadence, iterating directly on CEO and board feedback. That demo is now the reference build a co-development studio is using for official production.

          I built the codebase for constant iteration, using modular systems, swappable behavior, and custom tooling, so designs could change without the architecture fighting back.
  - id: what-i-built
    heading: What I Built
    lead: The codebase. Why it was built for constant change is in Designing to Stick With You, below.
    blocks:
      - id: what-i-built-text
        type: text
        md: |-
          The build is under NDA. The architecture is what I can show.

          The defining constraint was the cadence. Twice-weekly reviews for a year, 40+ playable builds, and any mechanic could be revised or cut between one review and the next.

          A codebase optimized for the design you have is the wrong target when the design moves every three days. The real requirement was absorbing change cheaply: 6,208 lines across 67 scripts, built so I could swap a mechanic without touching the systems around it.
      - id: selected-files
        type: subsection
        title: Selected Files
      - id: selected-files-list
        type: bullets
        items:
          - "MoveMods.cs (Architecture & Scalability): Strategy Pattern alongside a data pipeline. SOLID code that scales without a horrendous Update() loop, so new movement mods drop in without touching the existing ones."
          - "ObjectFinder.cs (Tools Programming & Advanced C#): Generics, LINQ, and Func delegates behind a robust, reusable lookup layer. It replaces Unity's FindObjectsOfType\\<T\\>(), which scans the full scene graph on every call."
          - "CoroutineRunner.cs (Systems Management & Memory Control): a dedicated manager that iterates tracked lists and objects with built-in sentinel abort logic, so async work tears down deterministically instead of outliving whatever started it."
          - "MovementBase.cs (Input Abstraction & Dependency Injection): a form of Dependency Injection with Unity's New Input System, passing lambdas into swappable movement strategies for the MovementPipeline."
          - "GroundChecks.cs (Optimization & Bitwise Operations): maps physical layers onto tightly controlled state enums and filters physics queries with bitmasks, to keep spatial queries reliable and performant on a non-standard platforming base."
          - "Depth-based collision: layer bitmasking and raycasts that resolve which plane an object occupies, so a 2.5D space with overlapping geometry sorts correctly for both movement and combat."
  - id: designing-to-stick-with-you
    heading: Designing to Stick With You
    lead: The design problem my time at Tarallumen is built around.
    blocks:
      - id: designing-to-stick-with-you-text
        type: text
        md: |-
          CORA teaches real anxiety coping mechanisms, and the design question is whether any of it survives the player closing the game.

          The enemies represent anxiety. The abilities counter them, and each one maps to a real active relief technique.

          The player practices the coping mechanism repeatedly, because it's how you win the fight. The story covers the same ground, so mechanic and narrative argue for the same thing.
      - id: teaching-without-a-wall-of-text
        type: subsection
        title: Teaching without a wall of text
      - id: teaching-without-a-wall-of-text-text
        type: text
        md: |-
          The cheap version of this game explains itself in a tutorial popup. That fails twice: nobody reads it, and a lecture about anxiety is the opposite of the experience I wanted.

          So everything teaches diegetically. The player learns a technique by needing it, using it, and watching it work on something that was hurting them a second ago.
      - id: designing-for-a-very-wide-audience
        type: subsection
        title: Designing for a very wide audience
      - id: designing-for-a-very-wide-audience-text
        type: text
        md: |-
          CORA is aimed at a wide audience, young children included. That set a hard bar on ease of use and how fast the game is to pick up, and it's why the build went through 40+ playable versions on a twice-weekly review cadence.

          If a mechanic needed explaining, it wasn't finished. That standard is what most of those 40+ builds were spent on, and it's the reason the demo became the reference build a co-development studio is now working from.
  - id: outcome
    heading: Outcome
    blocks:
      - id: outcome-list
        type: bullets
        items:
          - 40+ playable builds delivered on a twice-weekly review cadence
          - 30+ production-ready mechanics across 3 environments
          - Demo adopted by a co-development studio as its production reference
---
