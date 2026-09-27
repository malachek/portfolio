/** <role>.malachek.com/sitemap.xml (built at /<role>/sitemap.xml; the Worker maps it). */
import type { APIRoute } from 'astro';
import { APEX_ROLE, getRoles } from '@/lib/content';
import { sitemapFor } from '@/lib/sitemap';

export async function getStaticPaths() {
  const roles = await getRoles();
  return roles.filter((r) => r.id !== APEX_ROLE).map((role) => ({ params: { role: role.id }, props: { role } }));
}
export const GET: APIRoute = async ({ props }) => sitemapFor(props.role);
