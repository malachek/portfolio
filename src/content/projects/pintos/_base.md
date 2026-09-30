---
# Pintos: design write-up from master/06-projects/6-12 and threads/DESIGNDOC.txt (2026-09-29). Page on dev, tools and software. Code is NOT published (coursework); ask before changing that.
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
            src: /art/live/8636d122aaec4c36db55e2821c3478b4caafac5e.png-w512.png
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
  - id: design
    heading: Design
    blocks:
      - id: design-alarm
        type: text
        title: Sleeping without spinning
        md: |-
          The stock timer made sleeping threads spin in a loop, checking the clock. I replaced that with a sleep list kept in order of wake-up time. A sleeping thread records when it should wake, inserts itself into the list and blocks, so it costs nothing while it waits.

          On every timer tick the interrupt handler only looks at the front of the list, waking threads until it reaches one that isn't due. Keeping the list sorted is what keeps the time spent inside the interrupt handler short. Interrupts are disabled while a thread inserts itself, so a tick can never land halfway through.
      - id: design-donation
        type: text
        title: Priority donation
        md: |-
          When a high-priority thread waits on a lock held by a low-priority one, it lends its priority to the holder so the holder can finish and release it. Each thread tracks the locks it holds and the lock it's waiting for, and each lock keeps its own list of waiting donors, ordered by priority.

          Tracking donors per lock (instead of one list of every donor) makes release cheap: when a lock is released, only that lock's donations go away, and the thread's priority is recomputed from what's left. Donation follows the chain of lock holders up to a depth of 8, which handles nested donation and keeps the worst case bounded. Semaphores, locks and condition variables all wake their highest-priority waiter first.
      - id: design-mlfqs
        type: text
        title: The multi-level feedback queue
        md: |-
          The advanced scheduler (4.4BSD style) sets each thread's priority from how much CPU it has used recently and how "nice" it is to other threads, alongside a system-wide load average. Recent CPU time and priorities are recalculated every 4 ticks and the load average every second, so threads that hog the CPU drift down and waiting threads rise.

          When threads tie on priority, the one that has waited longest runs next (round robin), which the ordered ready list gives for free.
      - id: design-fixed-point
        type: text
        title: Fixed-point math
        md: |-
          The kernel has no floating point, but the scheduler's formulas need fractions. I built a small fixed-point layer that packs decimals into integers behind readable operations, so the scheduling math reads like ordinary arithmetic instead of bit shifts, where operator precedence mistakes are easy to make.
      - id: design-next
        type: text
        title: What I'd change
        md: |-
          Re-sorting the whole ready list every 4 ticks inside the interrupt handler is O(N log N). With more time I'd keep 64 separate queues, one per priority level, which makes insertion, scheduling and recalculation O(1) and removes the sort entirely.
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
    src: /art/live/8636d122aaec4c36db55e2821c3478b4caafac5e.png-w512.png
    alt: Scheduler trace
  blurb: 'Solo and optional: most of the class did not attempt it.'
small:
  blurb: Preemptive priority scheduler. C, kernel.
  image: /art/live/8636d122aaec4c36db55e2821c3478b4caafac5e.png-w512.png
---
