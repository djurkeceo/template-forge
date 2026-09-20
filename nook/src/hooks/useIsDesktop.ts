import { useEffect, useState } from 'react';

/**
 * Desktop vs. touch layout switch. Draggable windows need a fine pointer
 * and room to roam; anything else gets the simplified launchpad fallback.
 */
export function useIsDesktop(): boolean {
  const [desktop, setDesktop] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      window.matchMedia('(min-width: 768px)').matches,
  );

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const wide = window.matchMedia('(min-width: 768px)');
    const onChange = (): void => setDesktop(fine.matches && wide.matches);
    fine.addEventListener('change', onChange);
    wide.addEventListener('change', onChange);
    return () => {
      fine.removeEventListener('change', onChange);
      wide.removeEventListener('change', onChange);
    };
  }, []);

  return desktop;
}
