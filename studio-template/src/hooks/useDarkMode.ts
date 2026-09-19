import { useCallback, useEffect, useState } from 'react';

/** Resolve the initial theme without rendering first (avoids effect setState). */
function initialDark(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const saved = window.localStorage.getItem('cadence-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

/**
 * Class-based dark mode.
 * Reads the saved preference (or OS setting on first visit), toggles the
 * `dark` class on <html>, and persists the choice. Buyers can drop this
 * hook into any header.
 */
export function useDarkMode(): { dark: boolean; toggle: () => void } {
  const [dark, setDark] = useState<boolean>(initialDark);

  // Sync the DOM class whenever state changes (external system sync only).
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem('cadence-theme', next ? 'dark' : 'light');
      } catch {
        /* private-mode storage failures should never break the theme */
      }
      return next;
    });
  }, []);

  return { dark, toggle };
}
