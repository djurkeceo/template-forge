import { useEffect, useState } from 'react';

/** Reactive prefers-reduced-motion flag — every animation consults it. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent): void => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
