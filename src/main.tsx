import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prefetch local content JSON before initial render so components/DOM can be hydrated early
(async () => {
  function pathToSlug(pathname: string): string | null {
    const p = pathname.replace(/\/$/, '') || '/';
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

  async function prefetchLocalContent() {
    try {
      const slug = pathToSlug(window.location.pathname);
      if (!slug) return;
      const res = await fetch(`/content/${encodeURIComponent(slug)}.json`, { credentials: 'omit' });
      if (!res.ok) return;
      const json = await res.json().catch(() => null);
      if (json && typeof json === 'object') {
        (window as any).AOD_LOCAL_CONTENT = json;
      }
    } catch {}
  }

  await prefetchLocalContent();

  createRoot(document.getElementById("root")!).render(<App />);

  // Phase 2: Conditionally initialize editor bridge when in editor mode
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('editor') === '1') {
      import('./editorBridge')
        .then((m) => {
          if (typeof m.initEditorBridge === 'function') m.initEditorBridge();
        })
        .catch(() => {});
    } else {
      // Runtime content bridge for headless consumption
      import('./contentBridge')
        .then((m) => {
          if (typeof m.initContentBridge === 'function') m.initContentBridge();
        })
        .catch(() => {});
    }
  } catch {}
})();
