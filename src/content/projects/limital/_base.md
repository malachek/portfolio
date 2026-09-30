---
# Limital: page drafted 2026-09-26 from master/06-projects/6-9-limital.md. Lines marked VERIFY are inferred; check them.
title: Limital
accent: '#60788D'
path: /limital
seo:
  title: "Limital: Focus-First Virtual Workspace | Malachy Kennedy"
  description: "UX research and interface design for a focus-first virtual workspace. 35-participant study; Finalist, UCI Design-a-thon 2025."
hero:
  lines:
    - A focus-first virtual workspace that brings separate apps into one abstracted interface.
    - Designer & UX Researcher · Team of 3 · Figma
    - Finalist, UCI Design-a-thon 2025 · 36 hours
  background: /art/limital/writing-workspace.webp
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Design-a-thon · 3 team members
    - label: Role
      value: Designer & UX Researcher
    - label: Duration
      value: April 2025 (36 hours)
    - label: Research
      value: 35 survey responses, follow-up interviews
    - label: Tools
      value: Figma
    - label: Result
      value: Finalist, UCI Design-a-thon 2025
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Limital is a virtual workspace built around focus: it pulls the apps you're juggling into one interface, and lets you choose how much of each one you see.

          We had 36 hours: about 8 for research and the rest to build it (closer to 18, accounting for sleep).
        # VERIFY: first paragraph summarizes the 6-9 [3] bullets in his voice
      - id: project-description-video
        type: embed
        src: https://www.youtube-nocookie.com/embed/TZCZhlhYBUA
        title: Limital walkthrough
        caption: Walkthrough of the Limital prototype
      - id: project-description-media
        type: media
        cols: 2
        items:
          - kind: image
            src: /art/limital/writing-workspace.webp
            alt: "Limital: a Writing workspace with Discord, Spotify and Docs as plug-ins"
            caption: A Writing workspace, three apps as plug-ins
          - kind: image
            src: /art/limital/workspace-manager.webp
            alt: "Limital: the Workspace Manager with tab limits, header bar, clock and colour scheme per workspace"
            caption: Workspace Manager, limits and layout per workspace
          - kind: image
            src: /art/limital/music-plugin-levels.webp
            alt: "Limital: the music plug-in at three abstraction levels"
            caption: The music plug-in at three abstraction levels
          - kind: image
            src: /art/limital/discord-plugin-levels.webp
            alt: "Limital: the Discord plug-in at three abstraction levels"
            caption: The Discord plug-in at three abstraction levels
  - id: research
    heading: Research
    blocks:
      - id: research-list
        type: bullets
        items:
          - "I led the research phase for our team of 3, defining terminology and prompt scope before any high-fidelity prototyping"
          - "I designed and ran a survey that collected 35 responses in a single day; nearly half of respondents reported difficulty sustaining focus"
          - "The data split into two user segments (information and control vs. relevance and focus), which set our design direction"
          - "I ran follow-up interviews with a subset of respondents and consulted domain experts to validate the direction"
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: what-i-built-list
        type: bullets
        items:
          - "Multi-stage abstraction tests that cut high-overwhelm responses from 43% to 6% across the same cohort"
          - "A focus-oriented workspace that cut self-reported sensory overload by 37% across the 35-participant study"
          - "Constraint-based features: capped plug-ins and tabs, preset abstraction levels, full keyboard navigation, cross-app feature synchronization, and saveable workspace layouts"
          - "One experience across different apps, applying the usability principles of consistency, universal usability, and memory-load reduction"
  - id: case-study
    heading: Case Study
    blocks:
      - id: case-study-inspiration
        type: text
        title: Inspiration
        md: |-
          When the theme was announced, we had a lot of ideas. Too many ideas. We jumped from idea to idea with little-to-no connection, which yielded interesting results, but only until we came across the idea of visual sensory overload did it click. The issue was very current and topical as we ourselves were overwhelmed in the moment.

          We're in an era of innovation, supported by the trend of simplistic user interfaces. On paper, minimalistic interfaces are great for managing cognitive load, but the paper is not enough. Especially as more tech releases, and more responsibilities surmount, no matter how intuitive a new application's interface is, adjusting to it takes effort. "We've been minimalizing User Interfaces, but not User Experiences."

          Applications are designed to serve the user within the application, but when used together, multiple curated experiences clash with each other, creating an overwhelm of visual sensory overload, including differing styles, unnecessary tools, and redundant features.

          "Essentially, we've been creating user experiences, not a user experience."
      - id: case-study-what-it-does
        type: text
        title: What it does
        md: |-
          "Limital is a virtual workspace, composed of abstracted application plug-ins, to cultivate user focus."

          Our aim with Limital is to create a singular, personalized user experience.
      - id: case-study-features
        type: bullets
        items:
          - "Abstraction Levels: Plug-Ins have preset levels of focus/detail, and additional preference setting"
          - "Limits: Only 4 Plug-Ins, and 7 tabs are allowed to be open at once"
          - "Keyboard navigation: Workspace is fully usable without need for mouse input"
          - "Feature Synchronization: Features enabled in one program, if applicable, carry unto others. e.g. Do Not Disturb mode"
          - "Workspace Saving: Multiple workspace layouts can be saved and loaded"
      - id: case-study-how
        type: text
        title: How we built it
        md: |-
          We spent a lot of time in the designing and UX research phase. Before any high-fidelity prototyping, we solidified our definitions and prompt relevance. After deciding our target audience to be people with ADHD due to our application combatting overwhelm, we reached out and interviewed volunteers with ADHD. For more general information, we created a survey measuring the speed of technology and visual sensory overload, which we sent out in many servers to accumulate 35 unique responses! The most interesting data were two defined user groups of those who want information/control vs those who want relevance/focus. We built Limital on Figma.
      - id: case-study-challenges
        type: text
        title: Challenges we ran into
        md: |-
          One challenge we ran into, and were cognizant of from the start, is that to combat overwhelm, we ourselves must not overwhelm through our design; which is difficult considering our application's anticipated use is cross application work.
      - id: case-study-proud
        type: text
        title: Accomplishments that we're proud of
        md: |-
          We've found that even though our design is novel, it doesn't stand out as super new because of how familiar it is, as the plug-ins have similar interfaces to their origin apps.
      - id: case-study-learned
        type: text
        title: What we learned
        md: |-
          We learned how to Design-A-Thon! We learned that different people have different variables that serve to overwhelm them, which isn't necessarily just an overload of information. Some people feel overwhelmed with less accessible information.
      - id: case-study-next
        type: text
        title: What's next for Limital
        md: |-
          1. Focus mode, restricting the opening of other applications
          2. Timer, used by focus mode, replacing daytime details
          3. Reasonings for suggested settings
          4. Audio Sensory Aid, to provide an additional sense in support to visual
          5. Workspace sharing, to share layouts
      - id: case-study-link
        type: link
        href: https://devpost.com/software/limital
        label: Case study on Devpost
small:
  blurb: Abstracted OS Interface. Finalist, UCI Design-a-thon 2025. Figma.
  image: /art/limital/writing-workspace.webp
  links:
  - icon: globe
    href: https://devpost.com/software/limital
    label: Limital case study on Devpost
---
