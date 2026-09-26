import { Marked } from 'marked';

/** Small, synchronous Markdown renderer for capsule copy (paragraphs, lists, links, bold). */
const md = new Marked({ gfm: true, breaks: false, async: false });

md.use({
  renderer: {
    link({ href, text }) {
      const external = /^https?:\/\//.test(href);
      return `<a href="${href}"${external ? ' rel="noopener"' : ''}>${text}</a>`;
    },
  },
});

export function renderMarkdown(source: string): string {
  return md.parse(source) as string;
}

export function renderInline(source: string): string {
  return md.parseInline(source) as string;
}
