---
# Pintos: design write-up drafted 2026-09-26 from master/06-projects/6-12. Page only on the software role. Code is NOT published (coursework); ask before changing that.
title: Pintos Thread Scheduler
accent: '#FFFFFF'
path: /pintos
seo:
  title: "Pintos Thread Scheduler | Malachy Kennedy"
  description: "A preemptive kernel thread scheduler in C: priority donation, a 4.4BSD multi-level feedback queue, fixed-point math, and O(1) wake-ups. Solo."
hero:
  lines:
    - A preemptive thread scheduler for the Pintos kernel, in C.
    - Solo · C, x86, GDB
    - May to June 2026 · Optional project (most of the class did not attempt it)
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Solo project (optional)
    - label: Duration
      value: May to June 2026
    - label: Language
      value: C
    - label: Tools
      value: x86, GDB
    - label: Code
      value: Available on request
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          Pintos is an instructional operating system kernel. I built its thread scheduler on my own: priority scheduling with preemption, priority donation across locks, and a multi-level feedback queue that balances threads by their CPU history.

          It was optional (most of the class did not attempt it). The code stays private; this page covers the design, and I'm happy to walk through the code on request.
      - id: project-description-media
        type: media
        cols: 1
        items:
          - kind: image
            src: https://malachek.com/_assets/v11/8636d122aaec4c36db55e2821c3478b4caafac5e.png?w=512
            alt: "Scheduler trace: recent_cpu and priority per thread over time"
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: what-i-built-list
        type: bullets
        items:
          - "A preemptive scheduler with priority-based scheduling, non-busy waiting, and a 4.4BSD Multi-Level Feedback Queue driven by recent_cpu and load_avg"
          - "An ordered sleep list in place of the timer's poll loop, so wake-ups are O(1) during interrupt handling"
          - "Nested priority donation to depth 8 across locks, semaphores and condition variables, to stop priority inversion"
          - "A fixed-point math library that packs decimals into integers, so the kernel runs scheduling math with no floating-point hardware"
          - "Atomic critical sections through interrupt masking, preventing races and deadlocks during concurrent priority updates"
card:
  kind: project
  category: Solo Project
  dates: May 2026 - Jun 2026
  chips:
  - C
  - x86
  - GDB
  - Concurrency
  bullets:
  - Engineered a preemptive thread scheduler in C for the Pintos kernel, with priority scheduling and a 4.4BSD Multi-Level Feedback Queue.
  - Mitigated priority inversion with nested priority donation to depth 8 across locks, semaphores, and condition variables.
  - Replaced the timer poll loop with an ordered sleep list for O(1) wake-ups during interrupt handling.
  media:
    kind: image
    src: https://malachek.com/_assets/v11/8636d122aaec4c36db55e2821c3478b4caafac5e.png?w=512
    alt: Scheduler trace
  blurb: 'Solo and optional: most of the class did not attempt it.'
small:
  blurb: Preemptive priority scheduler. C, kernel.
  image: https://malachek.com/_assets/v11/8636d122aaec4c36db55e2821c3478b4caafac5e.png?w=512
---
