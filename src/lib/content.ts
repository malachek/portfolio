/**
 * Resolves what a role's site shows: the role file, plus each project's _base
 * merged with its overlay for that role. Every page goes through here, so the
 * merge rule lives in one place:
 *
 *   page = _base + <role> overlay, the overlay winning field by field
 *   (objects merge key by key; lists are replaced whole).
 *   No overlay file for a role = the project is not on that role's site.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Role = CollectionEntry<'roles'>;
export type Project = CollectionEntry<'projects'>['data'];
type Overlay = CollectionEntry<'overlays'>['data'];

/** The generalist role is served at the apex (malachek.com), so it has no path prefix. */
export const APEX_ROLE = 'dev';

/** Path prefix for a role inside the build: '' for the apex role, '/gameplay' etc. otherwise. */
export const roleBase = (roleId: string) => (roleId === APEX_ROLE ? '' : `/${roleId}`);

/** Link to a path on a role's site: href('gameplay', '/exo') → '/gameplay/exo'. */
export const href = (roleId: string, path: string) => {
  const base = roleBase(roleId);
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return path === '/' ? `${base}/` : `${base}${path}`;
};

/** Absolute URL of a path on the role's production host (canonical, og:url). */
export const absUrl = (role: Role, path: string) => `https://${role.data.host}${path === '/' ? '/' : path}`;

export async function getRoles(opts: { includeDisabled?: boolean } = {}) {
  const roles = await getCollection('roles');
  // Unpublished roles (enabled: false) still show on the local dev server, so drafts can be previewed.
  return roles
    .filter((r) => opts.includeDisabled || r.data.enabled || import.meta.env.DEV)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getRole(id: string) {
  const r = await getEntry('roles', id);
  if (!r) throw new Error(`No role file src/content/roles/${id}.yaml`);
  return r;
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

/** Deep merge: objects merge key by key, everything else (lists included) is replaced. */
export function merge<T>(base: T, over: unknown): T {
  if (!isObj(base) || !isObj(over)) return (over === undefined ? base : (over as T));
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (v === undefined) continue;
    out[k] = isObj(out[k]) && isObj(v) ? merge(out[k], v) : v;
  }
  return out as T;
}

export async function getOverlay(slug: string, roleId: string): Promise<Overlay | undefined> {
  return (await getEntry('overlays', `${slug}/${roleId}`))?.data;
}

/** A project as one role sees it, or undefined when it has no overlay for that role. */
export async function resolveProject(slug: string, roleId: string): Promise<(Project & { slug: string }) | undefined> {
  const base = (await getEntry('projects', slug))?.data;
  if (!base) throw new Error(`Role "${roleId}" lists "${slug}", but src/content/projects/${slug}/_base.md does not exist.`);
  const ov = await getOverlay(slug, roleId);
  if (!ov) return undefined;

  const { sections: order, hideBlocks = [], sectionOverrides = {}, blockOverrides = {}, extraSections = [], roleTitle, ...fields } = ov;
  const merged = merge(base, fields) as Project;

  // Per-role job title: swap the Role row and the same words in the hero lines.
  if (roleTitle && merged.overview) {
    const row = merged.overview.rows.find((r) => r.label === 'Role');
    const old = row?.value;
    merged.overview = { ...merged.overview, rows: merged.overview.rows.map((r) => (r.label === 'Role' ? { ...r, value: roleTitle } : r)) };
    if (old && merged.hero) merged.hero = { ...merged.hero, lines: merged.hero.lines.map((l) => l.replace(old, roleTitle)) };
  }

  let sections = base.sections.map((s) => {
    const o = sectionOverrides[s.id];
    return o ? { ...s, ...Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) } : s;
  });
  if (order) {
    const byId = new Map(sections.map((s) => [s.id, s]));
    const missing = order.filter((id) => !byId.has(id) && !extraSections.some((e) => e.id === id));
    if (missing.length) throw new Error(`${slug}/${roleId}.md lists unknown section ids: ${missing.join(', ')}`);
    sections = order.map((id) => byId.get(id)).filter((s): s is (typeof sections)[number] => !!s);
  }
  for (const { after, ...extra } of extraSections) {
    if (order?.includes(extra.id)) {
      sections.splice(order.indexOf(extra.id), 0, extra);
      continue;
    }
    const i = after ? sections.findIndex((s) => s.id === after) : -1;
    if (i >= 0) sections.splice(i + 1, 0, extra);
    else sections.push(extra);
  }
  sections = sections.map((s) => ({
    ...s,
    blocks: s.blocks
      .filter((b) => !hideBlocks.includes(b.id))
      .map((b) => (blockOverrides[b.id] ? ({ ...b, ...blockOverrides[b.id] } as typeof b) : b)),
  }));

  return { ...merged, sections, slug };
}

export type FeatureCardData = NonNullable<Project['card']> & { title: string; accent: string; href: string };

/** Everything the role's homepage shows, resolved and in order. */
export async function resolveHome(role: Role) {
  const r = role.data;
  const load = async (slugs: string[]) =>
    (await Promise.all(slugs.map(async (s) => {
      const p = await resolveProject(s, role.id);
      if (!p) console.warn(`[content] roles/${role.id}.yaml lists "${s}" but projects/${s}/${role.id}.md does not exist, so it is hidden.`);
      return p;
    }))).filter((p): p is NonNullable<typeof p> => !!p);

  const toCard = (p: Project & { slug: string }): FeatureCardData | undefined => {
    if (!p.card) return undefined;
    return {
      ...p.card,
      title: p.card.title ?? p.title,
      accent: p.card.accent ?? p.accent,
      href: p.page && p.path ? href(role.id, p.path) : '#',
    };
  };

  const featured = (await load(r.featured)).map(toCard).filter((c): c is FeatureCardData => !!c);
  const alsoBuilt = (await load(r.alsoBuilt))
    .filter((p) => p.small)
    .map((p) => ({
      title: p.title,
      accent: p.accent,
      blurb: p.small!.blurb,
      links: p.small!.links,
      href: p.page && p.path ? href(role.id, p.path) : undefined,
      media: p.small!.image ? { image: p.small!.image, alt: '' } : undefined,
    }));
  const experience = await Promise.all(
    r.experience.map(async (g) => ({
      heading: g.heading,
      cards: (await load(g.items)).map(toCard).filter((c): c is FeatureCardData => !!c),
    })),
  );
  return { hero: r.hero, selectedWorkHeading: r.selectedWorkHeading, featured, alsoBuiltLabel: r.alsoBuiltLabel, alsoBuilt, experience, skills: r.skills };
}

/** Every project page a role publishes (base has a page and the role has an overlay). */
/** Role-relative paths that exist on a role's site ('/', '/about', '/resume', '/exo' ...). Memoized per build. */
const pathCache = new Map<string, Promise<Set<string>>>();
export function rolePaths(roleId: string) {
  if (!pathCache.has(roleId)) {
    pathCache.set(roleId, rolePages(roleId).then((pages) => new Set(['/', '/about', '/resume', ...pages.map((p) => p.path!)])));
  }
  return pathCache.get(roleId)!;
}

export async function rolePages(roleId: string) {
  const projects = await getCollection('projects');
  const out = [];
  for (const p of projects) {
    if (!p.data.page || !p.data.path) continue;
    const page = await resolveProject(p.id, roleId);
    if (page?.page) out.push(page);
  }
  return out;
}
