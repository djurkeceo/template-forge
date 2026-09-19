import type { ReactElement } from 'react';
import { useState } from 'react';
import { CalendarCheck, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '../components/Button';

interface NavbarProps {
  dark: boolean;
  onToggleDark: () => void;
}

const LINKS: Array<{ label: string; href: string }> = [
  { label: 'How it runs', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Studios', href: '#stories' },
  { label: 'Questions', href: '#faq' },
];

// Sticky bar with mobile disclosure. Semantic <nav> + aria-expanded
// so keyboard users can open the menu and land on real anchors.
export function Navbar({ dark, onToggleDark }: NavbarProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur dark:border-white/10 dark:bg-ink-deep/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-marigold dark:bg-marigold dark:text-ink">
            <CalendarCheck size={20} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold text-ink dark:text-white">
            Cadence
            <span className="ml-2 hidden rounded-full bg-verdant-tint px-2 py-0.5 align-middle text-[11px] font-semibold text-verdant-deep sm:inline-block dark:bg-white/10 dark:text-marigold-soft">
              for studios
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-fog transition-colors hover:text-ink dark:text-gray-300 dark:hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-9 w-9 place-items-center rounded-ticket border border-line text-ink transition-colors hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <Button href="#pricing" size="md">
            See live pricing
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-9 w-9 place-items-center rounded-ticket border border-line text-ink dark:border-white/15 dark:text-white"
          >
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-ticket border border-line text-ink dark:border-white/15 dark:text-white"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-paper px-5 py-3 md:hidden dark:border-white/10 dark:bg-ink-deep">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded py-2.5 text-[15px] font-medium text-ink dark:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="py-2">
            <Button href="#pricing" size="md">
              See live pricing
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
}
