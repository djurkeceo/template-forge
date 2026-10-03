import { useState, type ReactElement } from 'react';
import { Flame, Menu, Moon, Sun, X } from 'lucide-react';

interface NavbarProps {
  dark: boolean;
  onToggleDark: () => void;
}

const LINKS = [
  { label: 'How it cooks', href: '#how' },
  { label: 'Screens', href: '#screens' },
  { label: 'Questions', href: '#faq' },
];

export function Navbar({ dark, onToggleDark }: NavbarProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-crust bg-cream/90 backdrop-blur dark:border-white/10 dark:bg-char-deep/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-paprika text-cream">
            <Flame size={19} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold text-char dark:text-cream">Simmer</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-semibold text-char/65 transition-colors hover:text-char dark:text-cream/70 dark:hover:text-cream">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-9 w-9 place-items-center rounded-xl border border-crust text-char dark:border-white/15 dark:text-cream"
          >
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <a
            href="#download"
            className="hidden rounded-xl bg-paprika px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            Get the app
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-xl border border-crust text-char md:hidden dark:border-white/15 dark:text-cream"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-crust px-5 py-3 md:hidden dark:border-white/10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] font-semibold text-char dark:text-cream">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
