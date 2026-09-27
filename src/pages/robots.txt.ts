/** robots.txt. The Worker serves this same file on every role host, pointing at that host's sitemap. */
import type { APIRoute } from 'astro';
export const GET: APIRoute = () =>
  new Response('User-agent: *\nAllow: /\nDisallow: /lab/\n\nSitemap: https://malachek.com/sitemap.xml\n', { headers: { 'Content-Type': 'text/plain' } });
