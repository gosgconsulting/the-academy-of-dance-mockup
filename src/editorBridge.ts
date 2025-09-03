/*
  Editor Bridge (Phase 2)
  - When running with ?editor=1, scan DOM for [data-key] text and img[data-key] images
  - Post originals to parent admin iframe as { type: 'AOD_ORIGINAL_CONTENT', payload: { text, images } }
  - Listen for { type: 'AOD_APPLY_OVERRIDES', payload } from parent and apply to DOM
*/

export function initEditorBridge() {
  try {
    // Initial scan and post
    const originals = collectContent();
    postToParent({ type: 'AOD_ORIGINAL_CONTENT', payload: originals });

    // Listen for overrides from parent
    window.addEventListener('message', (ev: MessageEvent) => {
      try {
        // Parent will filter by origin; child can accept all for now
        const msg = ev.data;
        if (!msg || typeof msg !== 'object') return;
        if (msg.type === 'AOD_APPLY_OVERRIDES') {
          const payload = msg.payload || {};
          const content = normalizeContent(payload);
          if (content) applyContent(content);
        }
      } catch {}
    });

    // Re-scan on route changes in SPA environments
    // Basic heuristic: when URL changes without reload, re-send originals after a tick
    let lastHref = location.href;
    setInterval(() => {
      if (location.href !== lastHref) {
        lastHref = location.href;
        setTimeout(() => {
          const fresh = collectContent();
          postToParent({ type: 'AOD_ORIGINAL_CONTENT', payload: fresh });
        }, 100);
      }
    }, 500);
  } catch {}
}

function collectContent(): { text: Record<string,string>, images: Record<string,string> } {
  const text: Record<string,string> = {};
  const images: Record<string,string> = {};

  // Text nodes: any [data-key] that is not an IMG
  document.querySelectorAll('[data-key]').forEach((node) => {
    const el = node as HTMLElement;
    const key = el.getAttribute('data-key') || '';
    if (!key) return;
    if (el.tagName.toLowerCase() === 'img') return; // handled below
    if (!(key in text)) text[key] = el.textContent || '';
  });

  // Images
  document.querySelectorAll('img[data-key]').forEach((node) => {
    const img = node as HTMLImageElement;
    const key = img.getAttribute('data-key') || '';
    if (!key) return;
    if (!(key in images)) images[key] = img.currentSrc || img.src || '';
  });

  return { text, images };
}

function normalizeContent(input: any): { text: Record<string,string>, images: Record<string,string> } | null {
  if (!input || typeof input !== 'object') return null;
  const text = input.text && typeof input.text === 'object' ? input.text : {};
  const images = input.images && typeof input.images === 'object' ? input.images : {};
  return { text, images };
}

function applyContent(content: { text: Record<string,string>, images: Record<string,string> }) {
  try {
    const textMap = content.text || {};
    Object.keys(textMap).forEach((key) => {
      const val = textMap[key];
      if (typeof val !== 'string') return;
      document.querySelectorAll(`[data-key="${cssEscape(key)}"]`).forEach((node) => {
        const el = node as HTMLElement;
        if (el.tagName.toLowerCase() === 'img') return;
        el.textContent = val;
      });
    });

    const imgMap = content.images || {};
    Object.keys(imgMap).forEach((key) => {
      const val = imgMap[key];
      if (typeof val !== 'string') return;
      document.querySelectorAll(`img[data-key="${cssEscape(key)}"]`).forEach((node) => {
        (node as HTMLImageElement).src = val;
      });
    });
  } catch {}
}

function postToParent(message: any) {
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, '*');
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
