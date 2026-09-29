import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { parse } from 'yaml';

/**
 * Content collections. Every collection has a schema, so a bad edit fails the
 * build instead of shipping.
 *
 *   site      src/content/site.yaml                   contact, nav, footer
 *   roles     src/content/roles/<role>.yaml            one per role site (dev = malachek.com)
 *   projects  src/content/projects/<name>/_base.md     shared facts + full page
 *   overlays  src/content/projects/<name>/<role>.md    that project on that role
 *
 * Merge rule: page = _base + overlay, overlay wins field by field. No overlay
 * file for a role = the project is not on that role's site. See EDITING.md.
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
    /** The About page (same on every role site). */
    about: z.object({
      heading: z.string(),
      description: z.string(),
      portrait: z.object({ src: z.string(), alt: z.string() }),
      intro: z.array(z.string()),
      profileHeading: z.string(),
      profile: z.array(z.object({ label: z.string(), value: z.string() })),
      favoritesHeading: z.string(),
      favorites: z.array(z.string()),
      photosHeading: z.string(),
      photos: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })),
    }),
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

const iconLink = z.object({ icon: z.enum(['github', 'linkedin', 'steam', 'itch', 'globe', 'link', 'mail']), href: url, label: z.string() });

/** Homepage feature card (Selected Work / Experience). Title, accent and link default to the project's. */
const card = z.object({
  kind: z.enum(['project', 'experience']),
  category: z.string(),
  dates: z.string(),
  title: z.string().optional(),
  org: z.string().optional(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  background: z.string().optional(),
  /** Tiled texture used instead of key art, drawn at 300px. */
  pattern: z.string().optional(),
  chips: z.array(z.string()).default([]),
  bullets: z.array(z.string()),
  links: z.array(iconLink).default([]),
  media: mediaItem.omit({ caption: true }).optional(),
  logo: z.string().optional(),
  blurb: z.string().optional(),
});

/** Small "Also Built" card. Links to the project page when there is one. */
const small = z.object({
  blurb: z.string(),
  image: z.string().optional(),
  links: z.array(iconLink).default([]),
});

const hero = z.object({
  lines: z.array(z.string()).min(1).max(4),
  background: z.string().optional(),
  /** Tiled texture used instead of key art (e.g. Burnt Out Games), drawn at 300px. */
  pattern: z.string().optional(),
  logo: z.string().optional(),
  logoAlt: z.string().optional(),
});

const overview = z.object({
  heading: z.string().default('Project Overview'),
  rows: z.array(z.object({ label: z.string(), value: z.string() })),
  /** Steam store widgets shown beside the table, one per app id. */
  steamAppIds: z.array(z.number().int()).default([]),
  code: z.object({ href: url, label: z.string() }).optional(),
});

/**
 * projects/<name>/_base.md — the shared facts and the full page, for every role.
 * A project with `page: false` has no page of its own (an Also Built card only).
 */
const projects = defineCollection({
  loader: glob({
    pattern: '*/_base.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z
    .object({
      title: z.string(),
      /** The page's accent: rules, pills and chips. Matches the project's home card. */
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      page: z.boolean().default(true),
      /** URL path of the page, e.g. /exo. Old Figma paths must keep working. */
      path: z.string().startsWith('/').optional(),
      seo: z.object({ title: z.string(), description: z.string() }).optional(),
      hero: hero.optional(),
      overview: overview.optional(),
      sections: z.array(section).default([]),
      card: card.optional(),
      small: small.optional(),
    })
    .superRefine((p, ctx) => {
      if (p.page && (!p.path || !p.seo || !p.hero))
        ctx.addIssue({ code: 'custom', message: 'A project with a page needs path, seo and hero (or set page: false).' });
      const seen = new Set<string>();
      for (const id of p.sections.flatMap((s) => s.blocks.map((b) => b.id))) {
        if (seen.has(id)) ctx.addIssue({ code: 'custom', message: `Block id "${id}" is used twice; block ids must be unique within a project.` });
        seen.add(id);
      }
    }),
});

/**
 * projects/<name>/<role>.md — how that project appears on one role's site.
 * The file existing is what puts the project on that role. Every field is
 * optional; whatever is set wins over _base.md, field by field.
 */
const overlays = defineCollection({
  loader: glob({
    pattern: ['*/*.md', '!*/_base.md'],
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    /** false = on this role the project is a card only, with no page of its own. */
    page: z.boolean().optional(),
    seo: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
    hero: hero.partial().optional(),
    overview: overview.partial().optional(),
    /** Section ids in the order to show them. Leave out to show every section in _base order. */
    sections: z.array(z.string()).optional(),
    /** Block ids to hide on this role. */
    hideBlocks: z.array(z.string()).optional(),
    /** Replace parts of a section by id: heading, lead, or its whole block list. */
    sectionOverrides: z.record(z.string(), z.object({
      heading: z.string().optional(),
      lead: z.string().optional(),
      blocks: z.array(block).optional(),
    })).optional(),
    /** Replace fields of a block by id (e.g. its md text, its bullet items). */
    blockOverrides: z.record(z.string(), z.record(z.string(), z.any())).optional(),
    /** Sections that exist only on this role. `after` places one after a section id (default: end). */
    extraSections: z.array(section.extend({ after: z.string().optional() })).optional(),
    card: card.partial().optional(),
    small: small.partial().optional(),
  }),
});

/** roles/<role>.yaml — one file per role site: its hero, what it features, in what order. */
const roles = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/roles', generateId: ({ entry }) => entry.replace(/\.yaml$/, '') }),
  schema: z.object({
    label: z.string(),
    /** Job title shown above the name in the header, e.g. "Gameplay Engineer". */
    jobTitle: z.string(),
    order: z.number().int(),
    enabled: z.boolean().default(true),
    /** Production host for this role, e.g. gameplay.malachek.com */
    host: z.string(),
    seo: z.object({ title: z.string(), description: z.string() }),
    /** Where the nav "Resume" link goes (a PDF path, or /resume). */
    resume: z.string(),
    /** Google Drive file id of this role's resume PDF, embedded on its /resume page. */
    resumeDriveId: z.string().optional(),
    hero: z.object({
      title: z.string(),
      background: z.string().optional(),
      /** Key arts laid side by side behind the hero (4 across, 2x2 on phones). */
      tiles: z.array(z.string()).optional(),
      lines: z.array(z.string()),
      bullets: z.array(z.string()).default([]),
      credential: z.string().optional(),
      avatar: z.string().optional(),
    }),
    selectedWorkHeading: z.string().default('Selected Work'),
    /** Project folder names for the big cards, in order. */
    featured: z.array(z.string()),
    alsoBuiltLabel: z.string().default('Also Built'),
    alsoBuilt: z.array(z.string()).default([]),
    experience: z.array(z.object({ heading: z.string(), items: z.array(z.string()) })).default([]),
    skills: z.object({ heading: z.string().default('Skills'), lines: z.array(z.object({ label: z.string(), items: z.array(z.string()) })) }),
  }),
});

export const collections = { site, projects, overlays, roles };
