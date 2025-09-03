/*
  Runtime Content Bridge
  - Applies local JSON content seeds (preloaded or fetched) and then applies WP overrides via REST
*/

export async function initContentBridge() {
  try {
    const slug = pathToSlug(window.location.pathname);
    if (!slug) return;

    // 1) Apply any preloaded local content
    const pre = (window as any).AOD_LOCAL_CONTENT;
    if (pre && typeof pre === 'object') {
      const normalized = normalizeContent(pre);
      if (normalized) applyContent(normalized);
    }

    // 2) Fetch local JSON and apply
    try {
      const res = await fetch(`/content/${encodeURIComponent(slug)}.json`, { credentials: 'omit' });
      if (res.ok) {
        const json = await res.json();
        const normalized = normalizeContent(json);
        if (normalized) applyContent(normalized);
      }
    } catch {}

    // 3) Fetch WP overrides and apply last (with REST base fallbacks)
    try {
      const bases = getApiBases();
      for (const base of bases) {
        const url = `${trimSlash(base)}/pages/${encodeURIComponent(slug)}`;
        try {
          const res = await fetch(url, { credentials: 'omit' });
          if (res.ok) {
            const data = await res.json();
            const content = data && data.content ? data.content : null;
            const normalized = normalizeContent(content);
            if (normalized) { applyContent(normalized); break; }
          }
        } catch {}
      }
    } catch {}
  } catch {}
}

function pathToSlug(pathname: string): string | null {
  const p = (pathname || '/').replace(/\/$/, '') || '/';
  if (p === '/') return 'index';
  if (p === '/blog') return 'blog';
  if (/^\/blog\/[^/]+$/.test(p)) return 'blog-post';
  if (/^\/blog\/category\/[^/]+$/.test(p)) return 'blog-category';
  if (/^\/blog\/tag\/[^/]+$/.test(p)) return 'blog-tag';
  if (/^\/blog\/author\/[^/]+$/.test(p)) return 'blog-author';
  if (p === '/terms-conditions') return 'terms-conditions';
  if (p === '/privacy-policy') return 'privacy-policy';
  return null;
}

function getApiBases(): string[] {
  const env: any = (import.meta as any).env || {};
  const out: string[] = [];
  const wpUrl = env.VITE_WP_URL;
  if (typeof wpUrl === 'string' && wpUrl.trim() !== '') {
    const root = trimSlash(String(wpUrl));
    out.push(`${root}/?rest_route=/aod/v1`);
  }
  if (env.VITE_AOD_API_BASE) out.push(String(env.VITE_AOD_API_BASE));
  // Local fallback
  out.push('/?rest_route=/aod/v1');
  // De-duplicate while preserving order
  return Array.from(new Set(out));
}

function trimSlash(s: string): string { return s.replace(/\/$/, ''); }

function normalizeContent(input: any): { text: Record<string,string>, images: Record<string,string> } | null {
  if (!input || typeof input !== 'object') return null;
  // Accept { content: { text, images } } or { text, images }
  const c = (input.content && typeof input.content === 'object') ? input.content : input;
  const text = c.text && typeof c.text === 'object' ? c.text : {};
  const images = c.images && typeof c.images === 'object' ? c.images : {};
  return { text, images };
}

function applyContent(content: { text: Record<string,string>, images: Record<string,string> }) {
  try {
    // Text nodes: any element with [data-key]
    const textMap = content.text || {};
    if (textMap && typeof textMap === 'object') {
      Object.keys(textMap).forEach((key) => {
        const val = textMap[key];
        if (typeof val !== 'string') return;
        // Apply to non-img elements
        const nodes = document.querySelectorAll(`[data-key="${cssEscape(key)}"]`);
        nodes.forEach((node) => {
          const el = node as HTMLElement;
          if (el.tagName.toLowerCase() === 'img') return;
          el.textContent = val;
        });
      });
    }

    // Images: img[data-key]
    const imgMap = content.images || {};
    if (imgMap && typeof imgMap === 'object') {
      Object.keys(imgMap).forEach((key) => {
        const val = imgMap[key];
        if (typeof val !== 'string') return;
        const nodes = document.querySelectorAll(`img[data-key="${cssEscape(key)}"]`);
        nodes.forEach((node) => {
          const img = node as HTMLImageElement;
          img.src = val;
        });
      });
    }
  } catch {}
}

// CSS.escape polyfill fallback
function cssEscape(s: string): string {
  try { // @ts-ignore
    if (typeof (window as any).CSS !== 'undefined' && typeof (window as any).CSS.escape === 'function') return (window as any).CSS.escape(s);
  } catch {}
  return s.replace(/[^a-zA-Z0-9_\-]/g, (m) => `\\${m}`);
}
