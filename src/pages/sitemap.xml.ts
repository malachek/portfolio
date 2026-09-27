/** malachek.com/sitemap.xml: the generalist site. Role sitemaps: /<role>/sitemap.xml. */
import type { APIRoute } from 'astro';
import { APEX_ROLE, getRole } from '@/lib/content';
import { sitemapFor } from '@/lib/sitemap';

export const GET: APIRoute = async () => sitemapFor(await getRole(APEX_ROLE));
