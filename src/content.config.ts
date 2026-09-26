import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { parse } from 'yaml';

/**
 * Content collections. Every collection has a schema, so a bad edit fails the
 * build instead of shipping. Roles, projects and overlays arrive in build step 3.
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

export const collections = { site };
