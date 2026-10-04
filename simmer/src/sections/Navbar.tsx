import { useState, type ReactElement } from 'react';
import { Flame, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
          <motion.button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            whileTap={{ scale: 0.9, rotate: 12 }}
            className="grid h-9 w-9 place-items-center rounded-xl border border-crust text-char dark:border-white/15 dark:text-cream"
          >
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </motion.button>
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
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-crust px-5 py-3 md:hidden dark:border-white/10"
          >
            {LINKS.map((l, i) => (
              <motion.li key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] font-semibold text-char dark:text-cream">
                  {l.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
