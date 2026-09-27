import { absUrl, rolePages, type Role } from '@/lib/content';

/** One sitemap per role site, listing its homepage, project pages and resume. */
export async function sitemapFor(role: Role) {
  const pages = await rolePages(role.id);
  const urls = ['/', ...pages.map((p) => p.path!), '/resume'].map((p) => absUrl(role, p));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
