import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { parse } from 'yaml';

/**
 * Content collections. Every collection has a schema, so a bad edit fails the
 * build instead of shipping.
 *
 *   site      src/content/site.yaml               contact, nav, footer
 *   projects  src/content/projects/<slug>/_base.md  one file per project page
 *   (roles + per-role overlays arrive in build step 3)
 */

const url = z.string().url();

const site = defineCollection({
  loader: file('src/content/site.yaml', { parser: (text) => ({ site: parse(text) }) }),
  schema: z.object({
    name: z.string(),
    email: z.string().email(),
    github: url,
    linkedin: url,
    availability: z.string(),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
});

/** One media item: a video clip or a still. `src` is a URL (R2 later, live site for now). */
const mediaItem = z.object({
  kind: z.enum(['video', 'image']),
  src: z.string(),
  poster: z.string().optional(),
  alt: z.string(),
  caption: z.string().optional(),
});

/** Every block has an id so role overlays can show, hide, reorder or override it. */
const blockBase = { id: z.string().regex(/^[a-z0-9-]+$/, 'ids are lowercase-with-dashes') };

const block = z.discriminatedUnion('type', [
  // Roboto Black heading between capsules.
  z.object({ ...blockBase, type: z.literal('subsection'), title: z.string() }),
  // A capsule of prose (Markdown: paragraphs, lists, links, bold). Optional inline title.
  z.object({
    ...blockBase,
    type: z.literal('text'),
    title: z.string().optional(),
    md: z.string(),
    wide: z.boolean().optional(),
    /** An embedded page shown under the copy (e.g. a press article). */
    embed: z.object({ src: url, title: z.string(), width: z.number(), height: z.number() }).optional(),
  }),
  // (wide: the copy spans the full capsule instead of the 680px reading measure, as in Design sections)
  // A capsule holding one bullet list at the compact measure.
  z.object({ ...blockBase, type: z.literal('bullets'), items: z.array(z.string()).min(1) }),
  // A capsule of media: 1, 2 or 3 across (3 collapses to 2 on tablet, 1 on phone).
  z.object({ ...blockBase, type: z.literal('media'), cols: z.union([z.literal(1), z.literal(2), z.literal(3)]), items: z.array(mediaItem).min(1) }),
  // An embedded player (YouTube trailer), 16:9 inside a capsule.
  z.object({ ...blockBase, type: z.literal('embed'), src: url, title: z.string(), caption: z.string().optional() }),
  // A centred magenta link pill (code samples, store pages).
  z.object({ ...blockBase, type: z.literal('link'), href: z.string(), label: z.string() }),
]);

const section = z.object({
  id: z.string(),
  heading: z.string(),
  /** One-line frame under the heading, outside any capsule. */
  lead: z.string().optional(),
  blocks: z.array(block),
});

const projects = defineCollection({
  loader: glob({
    pattern: '*/_base.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    /** The page's accent: rules, pills and chips. Matches the project's home card. */
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    /** Old Figma path this page must keep answering at, e.g. /exo */
    path: z.string().startsWith('/'),
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      lines: z.array(z.string()).min(1).max(4),
      background: z.string().optional(),
      /** Tiled texture used instead of key art (e.g. Burnt Out Games), drawn at 300px. */
      pattern: z.string().optional(),
      logo: z.string().optional(),
      logoAlt: z.string().optional(),
    }),
    overview: z
      .object({
        heading: z.string().default('Project Overview'),
        rows: z.array(z.object({ label: z.string(), value: z.string() })),
        /** Steam store widgets shown beside the table, one per app id. */
        steamAppIds: z.array(z.number().int()).default([]),
        code: z.object({ href: url, label: z.string() }).optional(),
      })
      .optional(),
    sections: z.array(section),
  }),
});

const iconLink = z.object({ icon: z.enum(['github', 'linkedin', 'steam', 'itch', 'globe', 'link']), href: url, label: z.string() });
const featureCard = z.object({
  kind: z.enum(['project', 'experience']),
  category: z.string(),
  dates: z.string(),
  title: z.string(),
  org: z.string().optional(),
  href: z.string(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  background: z.string().optional(),
  /** Tiled texture used instead of key art, drawn at 300px. */
  pattern: z.string().optional(),
  chips: z.array(z.string()).default([]),
  bullets: z.array(z.string()),
  links: z.array(iconLink).default([]),
  media: mediaItem.omit({ caption: true }).optional(),
  logo: z.string().optional(),
  orgLogo: z.string().optional(),
  blurb: z.string().optional(),
});

/** The homepage (generalist variant). Role variants reorder/override it in step 3. */
const home = defineCollection({
  loader: file('src/content/home.yaml', { parser: (text) => ({ home: parse(text) }) }),
  schema: z.object({
    hero: z.object({
      title: z.string(),
      background: z.string(),
      lines: z.array(z.string()),
      bullets: z.array(z.string()).default([]),
      credential: z.string().optional(),
      avatar: z.string().optional(),
    }),
    selectedWork: z.object({ heading: z.string(), cards: z.array(featureCard) }),
    alsoBuilt: z.object({
      label: z.string().default('Also Built'),
      dates: z.string().optional(),
      cards: z.array(z.object({
        title: z.string(),
        blurb: z.string(),
        image: z.string().optional(),
        accent: z.string(),
        href: z.string().optional(),
        links: z.array(iconLink).default([]),
      })),
    }),
    experience: z.array(z.object({ heading: z.string(), cards: z.array(featureCard) })),
    skills: z.object({ heading: z.string(), lines: z.array(z.object({ label: z.string(), items: z.array(z.string()) })) }),
  }),
});

export const collections = { site, projects, home };
