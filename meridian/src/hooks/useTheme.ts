import { useCallback, useEffect, useState } from 'react';

function initialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem('meridian-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/**
 * Class-based theme. The smooth cross-fade lives in index.css (background
 * + border color transitions, motion-users only), so toggling here never
 * flashes — the surfaces glide between palettes.
 */
export function useTheme(): { theme: 'light' | 'dark'; toggle: () => void } {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('meridian-theme', theme);
    } catch {
      /* ignore private-mode failures */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
