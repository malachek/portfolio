---
# kawaiian-isolation on the tools site. Only what differs from _base.md goes here.
# Tools angle: the dialogue pipeline and production infrastructure lead; the
# narrative-design essay ("Design") is left off this role. Title from the tools resume.
roleTitle: Technical Director & Tools Engineer
seo:
  description: "Technical Director and Tools Engineer on a UE5 title shipped to Steam, 10,000+ claims in 100 hours. Built a CSV-to-Unreal-to-Wwise dialogue pipeline and ran the team's Perforce server."
sections:
- project-description
- breakdown
- what-i-built
- reception
blockOverrides:
  project-description-text:
    md: |-
      Kawai'ian Isolation is a first-person narrative adventure turned survival horror. The player controls Mayumi as she explores her memories of Kawai'i and the lived purgatory of Paradise.

      It began as a two-quarter pitch project at UCI's Video Game Development Club and continued under Burnt Out Games through polish and commercial release. The production problem: 56 pages of dialogue, a VA director, a Wwise engineer and 30+ contributors, and none of them should need to open Unreal to do their job.
  project-description-text-1:
    md: |-
      So I built the pipeline around them. Writers author dialogue in a Google Sheet, Apps Script exports it as CSV, and a runtime tool in Unreal ingests it, caches the Wwise audio events and resolves each scene's assets.

      Playback branches on cached player choices and world state, so a scene plays differently depending on what the player did three scenes ago.

      Around the pipeline I provisioned and administered an AWS EC2 Perforce server and wrote the onboarding docs that brought 30+ contributors into it.
card:
  bullets:
  - Shipped a UE5 title on Steam that reached 10,000+ claims in its first 100 hours.
  - 'Built a data-driven dialogue pipeline: a Sheets and Apps Script front end exports CSV, and the runtime tool caches audio events, resolves per-scene assets, and branches playback on player choices and world state.'
  - Administered an AWS EC2 Perforce server and wrote the onboarding docs used by 30+ contributors.
---
