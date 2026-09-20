import { useCallback, useEffect, useState } from 'react';

function initialDark(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const saved = window.localStorage.getItem('fernway-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

/** Class-based dark mode, persisted. Toggles `.dark` on <html>. */
export function useDarkMode(): { dark: boolean; toggle: () => void } {
  const [dark, setDark] = useState<boolean>(initialDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem('fernway-theme', next ? 'dark' : 'light');
      } catch {
        /* ignore private-mode failures */
      }
      return next;
    });
  }, []);

  return { dark, toggle };
}
