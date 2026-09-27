/**
 * /roles.json: role id → production host, read by the Cloudflare Worker (worker/index.js)
 * so the host mapping has one source of truth: src/content/roles/*.yaml.
 */
import type { APIRoute } from 'astro';
import { APEX_ROLE, getRoles } from '@/lib/content';

export const GET: APIRoute = async () => {
  const roles = await getRoles();
  const body = { apex: APEX_ROLE, roles: Object.fromEntries(roles.map((r) => [r.id, r.data.host])) };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
