/**
 * /cms-config.yml: settings for the Sveltia CMS editor at /admin/ (linked from public/admin/index.html).
 * Generated from the content folders on every build, so a new project or role
 * shows up in the editor without touching this file. See EDITING.md.
 *
 * Two views over the same files:
 *   "By role"     one collection per role: that site's settings and every project overlay on it.
 *   "By project"  one collection per project: its _base.md and every role's overlay of it.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { stringify } from 'yaml';

type Field = Record<string, unknown>;
const str = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'string', required: false, ...extra });
const text = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'text', required: false, ...extra });
const md = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'markdown', required: false, ...extra });
const bool = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'boolean', required: false, ...extra });
const strList = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'list', required: false, field: { name: 'item', label: 'Item', widget: 'string' }, ...extra });
const textList = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'list', required: false, field: { name: 'item', label: 'Item', widget: 'text' }, ...extra });
const obj = (name: string, label: string, fields: Field[], extra: Field = {}): Field => ({ name, label, widget: 'object', required: false, collapsed: true, fields, ...extra });
const list = (name: string, label: string, fields: Field[], extra: Field = {}): Field => ({ name, label, widget: 'list', required: false, collapsed: true, fields, ...extra });
const img = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'image', required: false, hint: 'Upload an image, or paste a URL. Videos: paste the R2 URL into a video field instead.', ...extra });
const accent = (name = 'accent', label = 'Accent color (#rrggbb)'): Field => str(name, label, { pattern: ['^#[0-9a-fA-F]{6}$', 'Use a hex color like #D52FC7'] });

const iconLinks = list('links', 'Icon links', [
  { name: 'icon', label: 'Icon', widget: 'select', options: ['github', 'steam', 'itch', 'globe', 'link', 'linkedin', 'mail'] },
  str('href', 'URL (must be on the whitelist in resume-system/master/00-contact.md)'),
  str('label', 'Label for screen readers'),
]);
const mediaFields: Field[] = [
  { name: 'kind', label: 'Kind', widget: 'select', options: ['video', 'image'] },
  str('src', 'Video URL (R2) or image', { hint: 'Videos never go in the repo: upload with `npm run media:upload` and paste the URL.' }),
  str('poster', 'Poster image URL (videos)'),
  str('alt', 'Alt text'),
  text('caption', 'Caption'),
];
const idField = str('id', 'Block id (lowercase-with-dashes; overlays refer to it)', { required: true, pattern: ['^[a-z0-9-]+$', 'lowercase letters, digits and dashes'] });
const blocks: Field = {
  name: 'blocks', label: 'Blocks (capsules)', widget: 'list', required: false, collapsed: true, typeKey: 'type',
  types: [
    { name: 'subsection', label: 'Subsection heading', fields: [idField, str('title', 'Title')] },
    { name: 'text', label: 'Text capsule', fields: [idField, str('title', 'Title'), md('md', 'Text'), bool('wide', 'Full width (instead of the reading measure)')] },
    { name: 'bullets', label: 'Bullet list capsule', fields: [idField, textList('items', 'Bullets')] },
    { name: 'media', label: 'Media capsule (1, 2 or 3 across)', fields: [idField, { name: 'cols', label: 'Across', widget: 'select', options: [1, 2, 3] }, list('items', 'Items', mediaFields)] },
    { name: 'embed', label: 'Embedded player (YouTube)', fields: [idField, str('src', 'Embed URL'), str('title', 'Title'), text('caption', 'Caption')] },
    { name: 'link', label: 'Link pill', fields: [idField, str('href', 'URL'), str('label', 'Label')] },
  ],
};
const sectionFields: Field[] = [str('id', 'Section id', { required: true }), str('heading', 'Heading'), text('lead', 'Lead line'), blocks];
const heroFields: Field[] = [
  textList('lines', 'Hero lines (1 to 4)'),
  img('background', 'Background art (fills the hero)'),
  img('pattern', 'Tiled texture instead of art (300px tiles)'),
  img('logo', 'Game logo (fitted, never cropped)'),
  str('logoAlt', 'Logo alt text'),
];
const cardFields: Field[] = [
  { name: 'kind', label: 'Card type', widget: 'select', options: ['project', 'experience'], required: false },
  str('category', 'Top-left label (e.g. Game Project)'),
  str('dates', 'Top-right dates'),
  str('title', 'Title (defaults to the project title)'),
  str('org', 'Organization (experience cards)'),
  accent('accent', 'Accent (defaults to the project accent)'),
  img('background', 'Background art (fills the card)'),
  img('pattern', 'Tiled texture instead of art'),
  strList('chips', 'Tech chips'),
  textList('bullets', 'Bullets'),
  iconLinks,
  obj('media', 'Clip or image', mediaFields.filter((f) => f.name !== 'caption')),
  img('logo', 'Logo over the clip'),
  text('blurb', 'Line under the clip'),
];
const smallFields: Field[] = [text('blurb', 'Blurb'), img('image', 'Thumbnail (fitted)'), iconLinks];

const baseFields: Field[] = [
  str('title', 'Title', { required: true }),
  accent(),
  bool('page', 'Has its own page', { default: true }),
  str('path', 'Page path (e.g. /exo). Old Figma paths must not change.'),
  obj('seo', 'Search result title and description', [str('title', 'Title'), text('description', 'Description')]),
  obj('hero', 'Page hero', heroFields),
  obj('overview', 'Overview table', [
    str('heading', 'Heading'),
    list('rows', 'Rows', [str('label', 'Label'), str('value', 'Value')]),
    { name: 'steamAppIds', label: 'Steam app ids', widget: 'list', required: false, field: { name: 'id', label: 'App id', widget: 'number', value_type: 'int' } },
    obj('code', 'Code link', [str('href', 'URL'), str('label', 'Label')]),
  ]),
  list('sections', 'Sections', sectionFields),
  obj('card', 'Homepage card', cardFields),
  obj('small', 'Also Built card', smallFields),
];

const overlayFields = (sectionIds: string[], blockIds: string[]): Field[] => [
  ...(sectionIds.length
    ? [
        { name: 'sections', label: 'Sections to show, in order (leave empty to show all)', widget: 'select', multiple: true, required: false, options: sectionIds },
        { name: 'hideBlocks', label: 'Blocks to hide on this role', widget: 'select', multiple: true, required: false, options: blockIds },
      ]
    : []),
  obj('card', 'Homepage card: only fill what changes for this role', cardFields),
  obj('small', 'Also Built card: only fill what changes', smallFields),
  ...(sectionIds.length
    ? [
        obj('hero', 'Page hero: only fill what changes', heroFields),
        obj('seo', 'Search title and description for this role', [str('title', 'Title'), text('description', 'Description')]),
        list('extraSections', 'Sections only this role has', [...sectionFields, str('after', 'Place after section id (empty = end)')]),
      ]
    : []),
];

const roleFields: Field[] = [
  str('label', 'Name in the role switcher', { required: true }),
  str('jobTitle', 'Job title above your name in the header', { required: true }),
  { name: 'order', label: 'Order in the switcher', widget: 'number', value_type: 'int' },
  bool('enabled', 'Published', { default: true }),
  str('host', 'Web address (e.g. gameplay.malachek.com)'),
  obj('seo', 'Search result title and description', [str('title', 'Title'), text('description', 'Description')]),
  str('resume', 'Resume link (PDF path or /resume)'),
  obj('hero', 'Homepage hero', [
    str('title', 'Name'), textList('lines', 'Lines'), strList('bullets', 'Bullets'), str('credential', 'Credential line (caps)'),
    img('avatar', 'Avatar'), { name: 'tiles', label: 'Background arts (4 across, 2x2 on phones)', widget: 'list', required: false, field: { name: 'src', label: 'Image', widget: 'image' } },
  ]),
  str('selectedWorkHeading', 'Selected Work heading'),
  strList('featured', 'Big cards, in order (project folder names)'),
  str('alsoBuiltLabel', 'Also Built label'),
  strList('alsoBuilt', 'Also Built cards, in order (project folder names)'),
  list('experience', 'Experience groups', [str('heading', 'Heading'), strList('items', 'Cards, in order (project folder names)')]),
  obj('skills', 'Skills', [str('heading', 'Heading'), list('lines', 'Lines', [str('label', 'Label'), strList('items', 'Items')])]),
];

export const GET: APIRoute = async () => {
  const roles = (await getCollection('roles')).sort((a, b) => a.data.order - b.data.order);
  const projects = (await getCollection('projects')).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const ids = (p: (typeof projects)[number]) => ({
    sections: [...new Set(p.data.sections.map((s) => s.id))],
    blocks: [...new Set(p.data.sections.flatMap((s) => s.blocks.map((b) => b.id)))],
  });
  const allSections = [...new Set(projects.flatMap((p) => ids(p).sections))];
  const allBlocks = [...new Set(projects.flatMap((p) => ids(p).blocks))];

  const byRole = roles.map((r) => ({
    name: `role-${r.id}`,
    label: `${r.data.label} site: projects`,
    label_singular: `${r.data.label} project`,
    description: `How each project appears on ${r.data.host}. A project with no entry here is not on this site.`,
    folder: 'src/content/projects',
    path: `{{slug}}/${r.id}`,
    extension: 'md',
    format: 'frontmatter',
    create: true,
    identifier_field: 'project',
    slug: '{{project}}',
    summary: '{{slug}}',
    fields: [str('project', 'Project folder name (e.g. exo). Only needed when adding a project to this site.'), ...overlayFields(allSections, allBlocks)],
  }));

  const settings = {
    name: 'settings',
    label: 'Role sites and site settings',
    files: [
      { name: 'site', label: 'Site settings (contact, nav, availability)', file: 'src/content/site.yaml', fields: [
        str('name', 'Name'), str('email', 'Email'), str('github', 'GitHub URL'), str('linkedin', 'LinkedIn URL'), text('availability', 'Availability line'),
        list('nav', 'Navigation', [str('label', 'Label'), str('href', 'Link (resume = the role\'s resume)')]),
        obj('about', 'About page', [
          str('heading', 'Page heading'), text('description', 'Search description'),
          obj('portrait', 'Portrait', [str('src', 'Image path'), str('alt', 'Alt text')]),
          textList('intro', 'Intro paragraphs'),
          str('profileHeading', 'Profile heading'),
          list('profile', 'Profile rows', [str('label', 'Label'), str('value', 'Value')]),
          str('topHeading', 'Top 5 heading'), strList('top', 'Top 5 games (in order)'),
          str('favoritesHeading', 'Favorites heading'), strList('favorites', 'Other all-time favorites'),
          str('photosHeading', 'Photos heading'),
          list('photos', 'Photos', [str('src', 'Image path'), str('alt', 'Alt text'), str('caption', 'Caption')]),
        ]),
      ] },
      ...roles.map((r) => ({ name: r.id, label: `${r.data.label} site (${r.data.host})`, file: `src/content/roles/${r.id}.yaml`, fields: roleFields })),
    ],
  };

  const byProject = projects.map((p) => ({
    name: `project-${p.id}`,
    label: `Project: ${p.data.title}`,
    files: [
      { name: 'base', label: `${p.data.title}: shared (_base.md)`, file: `src/content/projects/${p.id}/_base.md`, format: 'frontmatter', fields: baseFields },
      ...roles.map((r) => ({
        name: r.id,
        label: `${p.data.title} on ${r.data.label}`,
        file: `src/content/projects/${p.id}/${r.id}.md`,
        format: 'frontmatter',
        fields: overlayFields(ids(p).sections, ids(p).blocks),
      })),
    ],
  }));

  const config = {
    backend: { name: 'github', repo: 'malachek/portfolio', branch: 'main', base_url: 'https://sveltia-cms-auth.malachek.workers.dev' },
    media_folder: 'public/art',
    public_folder: '/art',
    site_url: 'https://malachek.com',
    display_url: 'https://malachek.com',
    editor: { preview: false },
    collections: [settings, ...byRole, ...byProject],
  };
  return new Response('# Generated by src/pages/cms-config.yml.ts. Do not edit; edit that file.\n' + stringify(config, { lineWidth: 0 }), {
    headers: { 'Content-Type': 'text/yaml' },
  });
};
