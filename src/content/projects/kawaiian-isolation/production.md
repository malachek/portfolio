---
# kawaiian-isolation on the production site. Only what differs from _base.md goes here.
# Card bullets: master [5] track.
# Production evidence (Malachy's artifacts, 2026-10-21), shown on the production site only. Teammate names blurred.
card:
  bullets:
  - Led a technical department of 18+ contributors across audio, design, programming, and writing on a shipped Steam title (10,000+ claims in 100 hours).
  - Managed cross-team pipelines with 10 custom Agile tools in Miro and Google Sheets after off-the-shelf production tools couldn't model the project's dependencies.
  - Cut a 30+ contributor project to a shippable scope and landed it on Steam across a 2-year run.
small:
  blurb: 'Shipped on Steam with 30+ contributors: custom Agile tooling, a Perforce server, and a scope cut that improved the script.'
extraSections:
- id: production
  heading: Production
  lead: How a 30+ contributor team planned and shipped it
  after: project-description
  blocks:
  - id: tooling
    type: subsection
    title: Tooling the Team Actually Used
  - id: tooling-text
    type: text
    md: 'Off-the-shelf production tools couldn''t model how our work depended on itself: a scene needed its script, its voice lines and its level before it could be scripted. So I built 10 planning tools in Miro and Google Sheets, including a scheduling calendar, a progress tracker and a visual Kanban, driven by spreadsheet macros.


      We ran it close to waterfall (the dependencies forced an order), adjusted in Agile sprints as things slipped.'
  - id: tooling-schedule
    type: media
    cols: 1
    items:
    - kind: image
      src: /art/production-case-study/schedule.webp
      alt: 'Kawai''ian Isolation production schedule in Miro: weekly rows from July to September, one lane per department, with dependency arrows and playable milestones'
      caption: 'The schedule: a lane per department, a row per week, and milestones like "intro fully playable"'
  - id: tooling-trackers
    type: media
    cols: 2
    items:
    - kind: image
      src: /art/production-case-study/weekly-tracker.webp
      alt: 'Weekly task tracker: each developer''s task with two check-ins and an end status, colored by percent complete'
      caption: 'Weekly tracker: every task gets two check-ins and an end status, colored by completion'
    - kind: image
      src: /art/production-case-study/kanban.webp
      alt: Department Kanban board in Miro with backlog, to-do, in progress, completed and approved columns
      caption: Department Kanban, from backlog to approved
  - id: progress-checks
    type: subsection
    title: Progress Checks
  - id: progress-checks-text
    type: text
    md: 'Every developer posted progress twice a week in one channel (art on Tuesdays and Thursdays, tech on Mondays and Wednesdays), tagging the departments involved and attaching evidence: a screenshot, a video or a document. Tasks lived on a shared calendar, and a tracker showed who was keeping up.'
  - id: progress-checks-media
    type: media
    cols: 2
    items:
    - kind: image
      src: /art/production-case-study/task-updates.webp
      alt: 'Task Updates for Devs document: assignment, progress checks, completion, responding, extensions, task input, exemptions'
      caption: The task update rules every developer followed
    - kind: image
      src: /art/production-case-study/progress-checks.webp
      alt: 'Progress check tracker: check-in completion per developer across weeks, grouped by department'
      caption: Check-in tracker, by department and week
  - id: dependencies
    type: subsection
    title: Mapping the Dependencies
  - id: dependencies-text
    type: text
    md: 'Work flowed one way: writing hands the script to design, design writes the GDD alongside art''s storyboards, and engine and audio build from the GDD, trading Wwise event data and screen recordings. Each scene got its own event-sequencing lane, and each system got an architecture diagram before anyone built it.'
  - id: dependencies-media
    type: media
    cols: 3
    items:
    - kind: image
      src: /art/production-case-study/dependency-flow.webp
      alt: 'Department pipeline: writing to design, design with art, then engine and audio'
      caption: The department pipeline
    - kind: image
      src: /art/production-case-study/sequencing.webp
      alt: 'Event sequencing board: one lane per scene showing which departments'' work lands where'
      caption: Event sequencing, scene by scene
    - kind: image
      src: /art/production-case-study/systems.webp
      alt: Architecture diagrams for the player controller, interaction, scene loader, events, save and dialogue systems
      caption: System architecture, planned before building
  - id: scope-cut
    type: subsection
    title: The Scope Cut That Made It Better
  - id: scope-cut-text
    type: text
    md: 'The script ran in order: Past → Present → Paradise. We had written more than the team could build, and cutting every part a little would have broken the story''s flow.


      I respliced Past and Paradise into alternating chapters, so the jump between timelines became a deliberate mystery beat and the change of location signaled it without exposition. The Present timeline''s lore moved into discoverable teasers.


      Result: roughly half the scenes to implement, and a stronger script.'
  - id: scope-cut-media
    type: media
    cols: 2
    items:
    - kind: image
      src: /art/production-case-study/beat-board.webp
      alt: 'Beat board in Miro: scenes grouped into Intro, Alone and Train, each tagged A or B for the alternating structure'
      caption: The beat board, with scenes tagged for the alternating chapters
    - kind: image
      src: /art/production-case-study/need-might.webp
      alt: 'Need versus Might board: what the player must discover or figure out, and what is optional'
      caption: 'Need vs Might: what the player must find, and what could go'
  - id: pipeline
    type: subsection
    title: Pipeline & Onboarding
  - id: pipeline-list
    type: bullets
    items:
    - Led a technical department of 18+ contributors across audio, design, programming and writing
    - Ran an AWS EC2 Perforce server and wrote the onboarding docs and tutorials that brought 30+ contributors into it
    - Carried the project from a 2-quarter pitch through polish and commercial publishing under an LLC
  - id: kawaiian-result
    type: text
    md: '**Outcome:** shipped on Steam, with 10,000+ claims in its first 100 hours and 8 reviews, all positive.'
---
