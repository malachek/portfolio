---
# Resume System: Malachy's own resume tooling (resume-system repo). Software site only.
# Framing rule (Malachy, 2026-10-21): recruiters will know his resume came from this, so the goal stated
# up front is the most accurate resume that shows his skills truthfully. Never mention the application
# form filler, and never frame it as beating ATS filters.
title: Resume System
accent: '#3D8BFF'
path: /resume-system
seo:
  title: "Resume System: Accurate Resumes from One Source of Truth | Malachy Kennedy"
  description: "A Python and Claude Code tool that builds one-page resumes from a verified master file, with truth rules that block any claim it can't trace to a fact."
hero:
  lines:
    - A tool that builds the most accurate resume I can send, from one verified source of truth.
    - Solo · Python, Claude Code, LibreOffice
    - August 2026 to present
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Personal tool
    - label: Duration
      value: August 2026 to present
    - label: Language
      value: Python
    - label: Tools
      value: Claude Code, python-docx, LibreOffice, Git
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          I built this to answer one question: what's the most accurate resume I can send for a given posting?

          A master file holds every project and job I've done, with the facts, the numbers I've verified, and the phrasing I've approved. For each posting the system picks the entries that fit it and lays out a one-page resume from them. I read and approve every resume before it goes anywhere, and if you're reading this, the resume that sent you here came from it.
  - id: truth-rules
    heading: Truth Rules
    lead: The hard part was making it impossible to say something untrue
    blocks:
      - id: truth-rules-list
        type: bullets
        items:
          - "Provenance: every bullet has to point to the master fact it came from, or it doesn't ship"
          - "Never-claim list: skills I don't have can't appear, however strongly a posting asks for them; a real gap goes in the report for me to see"
          - "Locked facts: approved job titles, a whitelist of links, and rules like \"approved for release, never shipped\" for games that haven't launched"
          - "Stress testing: I ran it against 11 real postings looking for failures, found it inventing employers and pulling claims from the posting itself, and added a gate for each failure"
  - id: layout
    heading: Layout Engine
    blocks:
      - id: layout-list
        type: bullets
        items:
          - "Measures where lines actually wrap by rendering the page with LibreOffice, so no bullet leaves a single word hanging on its own line"
          - "Reports how full the page is and how many lines are left, so a resume fits on one page in one edit"
          - "Exports DOCX and PDF with a consistent file name for the recruiter's folder"
  - id: job-watch
    heading: Job Watch
    blocks:
      - id: job-watch-text
        type: text
        md: |-
          Twice a day it checks 161 studios' own job boards through their public APIs (Greenhouse, Workday, Lever and Ashby), keeps only internships and entry-level roles I'm eligible for, and sorts them by how well they fit.

          It never writes a resume on its own: a strong match comes to me as a question, and I decide.
  - id: how-i-built-it
    heading: How I Built It
    blocks:
      - id: how-i-built-it-text
        type: text
        md: |-
          I built it with Claude Code, and the rules file it follows is the real product: every time a run got something wrong, I traced why and wrote a rule so it can't happen again.

          The master file is split into an index plus small entry files, so each run reads only what that posting needs.
card:
  kind: project
  category: Software Project
  dates: Aug 2026 - Present
  chips:
  - Python
  - Claude Code
  - python-docx
  - LibreOffice
  - REST APIs
  bullets:
  - Builds one-page resumes from a verified master file, with rules that block any claim it can't trace to a fact.
  - Measures real line wraps by rendering with LibreOffice, so no bullet leaves a word hanging.
  - Polls 161 studios' own job boards (Greenhouse, Workday, Lever, Ashby) twice a day and sorts postings by fit.
  media:
    kind: image
    src: /art/resume-system/resume-page.webp
    alt: 'A resume built by the system'
  blurb: The resume you're reading came from it.
small:
  image: /art/resume-system/resume-page.webp
  blurb: 'Builds one-page resumes from a verified source of truth, with rules that block any claim it can''t trace. Python, Claude Code.'
---
