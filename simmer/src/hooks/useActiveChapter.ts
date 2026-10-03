import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-sync engine for the sticky phone showcase.
 *
 * How it works: each feature chapter registers its <section> element in
 * `register`. ONE IntersectionObserver watches them all with a centered
 * band (rootMargin pulls the top and bottom in, so only the chapter
 * crossing the middle counts). The chapter with the highest intersection
 * ratio wins and becomes `active` — the phone cross-fades to its screen.
 *
 * Why IntersectionObserver and not scroll position math: no scroll
 * listeners firing every frame, no layout thrash, and it stays correct
 * when content reflows (fonts, images, resize). Reduced-motion users get
 * the same content updates with the transition collapsed to instant.
 */
export function useActiveChapter(count: number): {
  active: number;
  register: (index: number) => (el: HTMLElement | null) => void;
} {
  const [active, setActive] = useState(0);
  const sections = useRef<Array<HTMLElement | null>>(Array(count).fill(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best = -1;
        let bestRatio = 0;
        for (const entry of entries) {
          const index = sections.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            best = index;
            bestRatio = entry.intersectionRatio;
          }
        }
        // Only accept clear winners — avoids flicker between chapters.
        if (best >= 0 && bestRatio > 0.3) setActive(best);
      },
      {
        // Centered band: only the middle ~40% of the viewport counts.
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.3, 0.6, 1],
      },
    );

    for (const el of sections.current) {
      if (el !== null) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [count]);

  function register(index: number): (el: HTMLElement | null) => void {
    return (el: HTMLElement | null) => {
      sections.current[index] = el;
    };
  }

  return { active, register };
}
