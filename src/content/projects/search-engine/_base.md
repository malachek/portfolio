---
# Search Engine: write-up page drafted 2026-09-26 from master/06-projects/6-11. Shown as a page only on the software role (other roles: page: false in their overlay). No code is published.
title: Web Crawler & Search Engine
accent: '#5A565F'
path: /search-engine
seo:
  title: "Search Engine & Web Crawler | Malachy Kennedy"
  description: "Ranking and relevance for a 6,700-page search engine in Python: TF-IDF, cosine normalization, Jaccard boosting, sub-second queries from disk. Team of 4."
hero:
  lines:
    - A search engine and web crawler over 6,700+ pages, answering queries in under a second.
    - Ranking & Relevance, Crawler, Index · Team of 4 · Python
    - February to March 2026
overview:
  heading: Project Overview
  rows:
    - label: Type
      value: Team project · 4 developers
    - label: My part
      value: Everything except the UI; ranking and relevance were my main contribution
    - label: Duration
      value: February to March 2026
    - label: Language
      value: Python
    - label: Libraries
      value: BeautifulSoup, heapq, RegEx
    - label: Scale
      value: 6,700+ pages indexed
sections:
  - id: project-description
    heading: Project Description
    blocks:
      - id: project-description-text
        type: text
        md: |-
          A search engine and web crawler built by a team of 4. I worked on everything except the interface: the crawler, the index, and (my main contribution) the ranking.

          It indexes 6,700+ pages and answers queries in under a second, straight from disk, without loading the index into memory.
      - id: project-description-media
        type: media
        cols: 1
        items:
          - kind: image
            src: https://malachek.com/_assets/v11/74a23f142bbb0792c91d030e7f21f10bbcbcc276.png?w=512
            alt: "The search engine's results page"
  - id: what-i-built
    heading: What I Built
    blocks:
      - id: ranking
        type: subsection
        title: Ranking & Relevance
      - id: ranking-list
        type: bullets
        items:
          - "Ranked results from Porter Stemmer tokenization, TF-IDF vector space scoring, cosine normalization, and Jaccard similarity boosting"
          - "Custom tokenizers and scrapers (BeautifulSoup, RegEx) that strip HTML, filter stopwords, parse domain metrics, and compute term frequencies"
      - id: index
        type: subsection
        title: Index
      - id: index-list
        type: bullets
        items:
          - "An inverted index over 6,700+ pages, built with a K-way external merge sort (heapq) that merges partial index files line by line within RAM limits"
          - "Sub-second queries against the master index on disk, using byte-offset seeking instead of loading it into memory"
          - "A smaller memory footprint through __slots__ on posting structures and aggressive garbage collection during stream conversion"
      - id: crawler
        type: subsection
        title: Crawler
      - id: crawler-list
        type: bullets
        items:
          - "Domain scoping, politeness delays, and defenses against spider traps, infinite calendar loops, and query-parameter explosions"
          - "Exact duplicate detection with MD5 content hashing, plus length-based filtering of low-value pages before they reach the index"
card:
  kind: project
  category: Team Project
  dates: Feb 2026 - Mar 2026
  chips:
  - Python
  - TF-IDF
  - BeautifulSoup
  - Information Retrieval
  bullets:
  - 'Built the ranking and relevance layer for a 6,700-page search engine: Porter Stemmer tokenization, TF-IDF vector scoring, cosine normalization, and Jaccard similarity boosting.'
  - Tuned scoring across the corpus to return ranked results in under a second, straight from disk.
  - Team of 4; I built everything except the UI.
  media:
    kind: image
    src: https://malachek.com/_assets/v11/74a23f142bbb0792c91d030e7f21f10bbcbcc276.png?w=512
    alt: Search engine results page
  blurb: Search engine and web crawler over 6,700+ pages.
small:
  blurb: TF-IDF inverted index. Python.
  image: https://malachek.com/_assets/v11/74a23f142bbb0792c91d030e7f21f10bbcbcc276.png?w=512
---
