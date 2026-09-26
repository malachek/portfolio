// Runs inside the browser (page.evaluate). Walks a Figma Sites page in document order
// and returns its structure: section headings, subsection headings, capsules and their
// paragraphs / list items / media / links. Used to port the live copy verbatim.
export function extractPage() {
  const PANEL = 'rgb(15, 21, 40)';
  const out = {
    path: location.pathname,
    title: document.title,
    description: document.querySelector('meta[name=description]')?.content ?? null,
    ogImage: document.querySelector('meta[property="og:image"]')?.content ?? null,
    blocks: [],
  };
  const isCapsule = (el) => {
    const cs = getComputedStyle(el);
    return cs.backgroundColor === PANEL && parseFloat(cs.borderRadius) >= 20;
  };
  const ownText = (el) =>
    [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
  const seen = new Set();
  let capsule = null;
  let cap = null;
  for (const el of document.querySelectorAll('body *')) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
    if (isCapsule(el) && !(capsule && capsule.contains(el))) {
      capsule = el;
      cap = { t: 'capsule', items: [] };
      out.blocks.push(cap);
      continue;
    }
    if (capsule && !capsule.contains(el)) { capsule = null; cap = null; }
    const target = cap ? cap.items : out.blocks;
    const cs = getComputedStyle(el);
    if (el.tagName === 'VIDEO' || el.tagName === 'IMG') {
      const r = el.getBoundingClientRect();
      if (r.width < 60) continue;
      target.push({
        t: 'media',
        kind: el.tagName.toLowerCase(),
        src: el.currentSrc || el.src || el.querySelector('source')?.src || null,
        poster: el.poster || null,
        alt: el.alt || null,
        w: Math.round(r.width),
        h: Math.round(r.height),
      });
      continue;
    }
    if (el.tagName === 'IFRAME') {
      target.push({ t: 'iframe', src: el.src });
      continue;
    }
    if (!ownText(el)) continue;
    const blk = el.closest('li') || el.closest('p') || el;
    if (seen.has(blk)) continue;
    seen.add(blk);
    const text = blk.innerText.replace(/ /g, ' ').trim();
    if (!text) continue;
    const bcs = getComputedStyle(blk.tagName === 'LI' ? (blk.querySelector('span') || blk) : el);
    const fam = bcs.fontFamily.split(',')[0].replace(/"/g, '');
    const kind =
      blk.tagName === 'LI' ? 'li'
      : fam.startsWith('Jersey') ? 'display'
      : bcs.fontWeight === '900' ? 'sub'
      : bcs.textTransform === 'uppercase' ? 'eyebrow'
      : 'p';
    const item = { t: kind, text, font: `${fam} ${bcs.fontWeight} ${bcs.fontSize}` };
    if (bcs.fontStyle === 'italic') item.italic = true;
    const a = blk.closest('a');
    if (a) item.href = a.getAttribute('href');
    const links = [...blk.querySelectorAll('a')].map((x) => x.getAttribute('href'));
    if (links.length) item.links = links;
    target.push(item);
  }
  return out;
}

// Aggregated computed styles: every distinct text style and box style on the page.
export function probeStyles() {
  const out = { vw: innerWidth, docH: document.documentElement.scrollHeight, text: {}, boxes: {} };
  for (const el of document.querySelectorAll('body *')) {
    if (['SCRIPT', 'STYLE'].includes(el.tagName)) continue;
    const cs = getComputedStyle(el);
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (own) {
      const k = [cs.fontFamily.split(',')[0].replace(/"/g, ''), cs.fontWeight, cs.fontStyle, cs.fontSize,
        cs.lineHeight, cs.color, cs.textTransform, cs.letterSpacing].join(' | ');
      out.text[k] ??= { count: 0, example: el.textContent.trim().slice(0, 50) };
      out.text[k].count++;
    }
    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderRadius !== '0px') {
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      const k = [cs.backgroundColor, cs.borderRadius, Math.round(r.width), cs.padding, cs.gap,
        cs.borderWidth !== '0px' ? `${cs.borderWidth} ${cs.borderColor}` : ''].join(' | ');
      out.boxes[k] = (out.boxes[k] || 0) + 1;
    }
  }
  return out;
}
