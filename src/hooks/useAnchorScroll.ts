import { useEffect } from 'react';

function escapeForQuerySelector(hash: string): string {
  // Allow standard alpha-numeric hashes; bail if anything unusual is present.
  if (!/^#[a-zA-Z][\w-]*$/.test(hash)) return '';
  return hash;
}

export function useAnchorScroll() {
  useEffect(() => {
    // Let us control scroll position ourselves instead of the browser.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    function getHeaderHeight(): number {
      const header = document.getElementById('main-header');
      return header?.getBoundingClientRect().height ?? 88;
    }

    function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
      const safeHash = escapeForQuerySelector(hash);
      if (!safeHash) return;
      const target = document.querySelector(safeHash);
      if (!target) return;

      const buffer = 16;
      const headerHeight = getHeaderHeight();
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, targetTop - headerHeight - buffer),
        behavior,
      });

      if (hash !== window.location.hash) {
        history.pushState(null, '', hash);
      }
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const safeHash = escapeForQuerySelector(href);
      if (!safeHash || !document.querySelector(safeHash)) return;

      e.preventDefault();
      scrollToHash(safeHash);
    }

    // Initial load: if page lands with #hash, wait for images/fonts to settle so
    // section offsets are correct. Fall back to a timeout on very slow loads.
    if (window.location.hash) {
      const initialHash = window.location.hash;
      const run = () => scrollToHash(initialHash, 'auto');

      if (document.readyState === 'complete') {
        requestAnimationFrame(run);
      } else {
        const onLoad = () => {
          // One extra frame so Framer/motion layout settles.
          requestAnimationFrame(run);
          window.removeEventListener('load', onLoad);
        };
        window.addEventListener('load', onLoad);
        // Safety net: trigger even if load never fires within 1.5s.
        setTimeout(run, 1500);
      }
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
