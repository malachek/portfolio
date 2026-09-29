/**
 * Cloudflare Worker in front of the static build (Workers static assets).
 *
 *   malachek.com/*            → the generalist site at the root of dist/
 *   gameplay.malachek.com/*   → dist/gameplay/*   (same for tools., design., …)
 *   dev.malachek.com, www.    → 301 to malachek.com
 *   *.workers.dev (preview)   → dist/ as built: /, /gameplay/, /tools/ … side by side
 *
 * Pages are built with role-prefixed links (/gameplay/exo). On a role's own host
 * the Worker strips that prefix from links, and points the role switcher at the
 * same page (data-lens-path) on each role's own host. Role → host comes from /roles.json (built from roles/*.yaml).
 */

const APEX = 'malachek.com';
let rolesCache;

async function getRoles(env, origin) {
  if (!rolesCache) {
    const res = await env.ASSETS.fetch(new URL('/roles.json', origin));
    rolesCache = res.ok ? await res.json() : { apex: 'dev', roles: {} };
  }
  return rolesCache;
}

const isHtml = (res) => (res.headers.get('Content-Type') || '').includes('text/html');
const hasExtension = (path) => /\.[a-z0-9]+$/i.test(path);

class LinkRewriter {
  constructor(role, cfg) {
    this.role = role; // current role id, or null on the apex
    this.cfg = cfg;
  }
  element(el) {
    const attr = el.tagName === 'link' ? 'href' : 'href';
    const href = el.getAttribute(attr);
    if (!href) return;
    const lens = el.getAttribute('data-lens');
    if (lens) {
      const host = this.cfg.roles[lens];
      // Keep the page when the other role has it (Header sets data-lens-path).
      const path = el.getAttribute('data-lens-path') || '/';
      if (host) el.setAttribute(attr, `https://${host}${path}`);
      return;
    }
    if (this.role && (href === `/${this.role}` || href.startsWith(`/${this.role}/`))) {
      el.setAttribute(attr, href.slice(this.role.length + 1) || '/');
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;

    if (host === `www.${APEX}` || host === `dev.${APEX}`) {
      return Response.redirect(`https://${APEX}${url.pathname}${url.search}`, 301);
    }

    const production = host === APEX || host.endsWith(`.${APEX}`);
    if (!production) return env.ASSETS.fetch(request); // workers.dev preview: serve the build as is

    const cfg = await getRoles(env, url.origin);
    const role = Object.keys(cfg.roles).find((id) => id !== cfg.apex && cfg.roles[id] === host) || null;

    if (!role) {
      // Apex. A role path typed on the apex goes to that role's own host.
      const first = url.pathname.split('/')[1];
      if (first && first !== cfg.apex && cfg.roles[first]) {
        const rest = url.pathname.slice(first.length + 1) || '/';
        return Response.redirect(`https://${cfg.roles[first]}${rest}${url.search}`, 301);
      }
      const res = await env.ASSETS.fetch(request);
      return isHtml(res) ? new HTMLRewriter().on('a[data-lens]', new LinkRewriter(null, cfg)).transform(res) : res;
    }

    // Role host. Tidy any prefixed path, then serve dist/<role>/<path>.
    if (url.pathname === `/${role}` || url.pathname.startsWith(`/${role}/`)) {
      return Response.redirect(`https://${host}${url.pathname.slice(role.length + 1) || '/'}${url.search}`, 301);
    }
    if (url.pathname === '/robots.txt') {
      return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://${host}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
    }
    const inner = new URL(`/${role}${url.pathname}${url.search}`, url.origin);
    let res = await env.ASSETS.fetch(new Request(inner, request));
    // Shared files (/_astro, /art, fonts, favicon) live once at the root.
    if (res.status === 404 && hasExtension(url.pathname)) res = await env.ASSETS.fetch(request);
    if (res.status >= 300 && res.status < 400) {
      // Trailing-slash redirects come back with the /<role> prefix; strip it.
      const loc = res.headers.get('Location');
      if (loc) {
        const l = new URL(loc, inner);
        if (l.pathname.startsWith(`/${role}/`) || l.pathname === `/${role}`) {
          return Response.redirect(`https://${host}${l.pathname.slice(role.length + 1) || '/'}${l.search}`, res.status);
        }
      }
    }
    if (!isHtml(res)) return res;
    return new HTMLRewriter().on('a[href]', new LinkRewriter(role, cfg)).transform(res);
  },
};
