import type { ReactElement } from 'react';
import { Menu, Moon, Search, Sun } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onOpenMobileNav: () => void;
}

// Top bar: mobile menu, live title, Linear-style search trigger (opens the
// command palette on focus — the honest premium pattern), theme toggle,
// and a monogram avatar. No real search logic lives here; the palette owns it.
export function Topbar({ title, subtitle, theme, onToggleTheme, onOpenPalette, onOpenMobileNav }: TopbarProps): ReactElement {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-paper px-4 sm:px-6 dark:border-night-line dark:bg-night">
      <button
        type="button"
        onClick={onOpenMobileNav}
        aria-label="Open navigation menu"
        className="grid h-9 w-9 place-items-center rounded-md text-ink-soft hover:bg-ink/5 md:hidden dark:text-gray-300 dark:hover:bg-white/10"
      >
        <Menu size={18} aria-hidden="true" />
      </button>

      <div className="min-w-0">
        <h1 className="font-display truncate text-lg font-bold tracking-tight">{title}</h1>
        <p className="hidden truncate text-[13px] text-ink-faint sm:block dark:text-gray-400">{subtitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Search and commands (Control K)"
          className="flex h-9 items-center gap-2.5 rounded-md border border-line bg-white px-3 text-sm text-ink-faint shadow-sm transition-colors hover:border-ink/25 dark:border-night-line dark:bg-night-raised dark:text-gray-400"
        >
          <Search size={15} aria-hidden="true" />
          <span className="hidden lg:inline">Search or command…</span>
          <kbd className="hidden rounded border border-line bg-paper px-1.5 font-mono text-[11px] sm:inline dark:border-night-line dark:bg-night">
            ⌘K
          </kbd>
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="grid h-9 w-9 place-items-center rounded-md border border-line bg-white text-ink-soft shadow-sm transition-all hover:scale-105 active:scale-95 dark:border-night-line dark:bg-night-raised dark:text-gray-300"
        >
          {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        </button>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 select-none place-items-center rounded-full bg-ink font-display text-xs font-bold text-white dark:bg-white dark:text-ink"
        >
          RA
        </span>
      </div>
    </header>
  );
}
