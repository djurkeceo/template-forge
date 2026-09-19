import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertial momentum scrolling via Lenis.
 * - Skipped entirely for prefers-reduced-motion users (native scroll stays).
 * - Anchor links are routed through Lenis with a sticky-header offset so
 *   in-page navigation keeps its momentum instead of jumping.
 * - autoRaf lets Lenis drive its own requestAnimationFrame loop.
 */
export function useLenis(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: true });

    const onClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor === null || anchor === undefined) return;
      const hash = anchor.getAttribute('href');
      if (hash === null || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (el === null) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
      window.history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
}
