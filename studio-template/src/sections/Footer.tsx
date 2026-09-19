import type { ReactElement } from 'react';
import { CalendarCheck } from 'lucide-react';

const COLS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Product',
    links: [
      { label: 'Timetable & waitlists', href: '#features' },
      { label: 'Live pricing', href: '#pricing' },
      { label: 'Studio stories', href: '#stories' },
      { label: 'Questions', href: '#faq' },
    ],
  },
  {
    title: 'Template',
    links: [
      { label: 'Swap the hero', href: '#variants' },
      { label: 'Swap the features', href: '#variants' },
      { label: 'Swap pricing layout', href: '#variants' },
      { label: 'Customise the palette', href: '#customise' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '#cta' },
      { label: 'Start free trial', href: '#cta' },
      { label: 'Back to top', href: '#top' },
    ],
  },
];

// Semantic footer: <footer> + nav lists with real anchors.
export function Footer(): ReactElement {
  return (
    <footer className="border-t border-line bg-white dark:border-white/10 dark:bg-ink-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-marigold dark:bg-marigold dark:text-ink">
              <CalendarCheck size={20} aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold text-ink dark:text-white">Cadence</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog dark:text-gray-300">
            Bookings, memberships and payouts for independent service studios.
            A commercial template — replace the copy, keep the engine.
          </p>
          <p className="mt-4 text-xs text-fog dark:text-gray-400">
            Demo content is fictional. No real studios, people or photos.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[13px] font-bold uppercase tracking-wide text-fog dark:text-gray-400">
                {col.title}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm font-medium text-ink hover:underline hover:underline-offset-4 dark:text-gray-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-fog sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
          <p>© 2026 Cadence Template Co. Built with React, Tailwind and Motion.</p>
          <p>Palette: paper · ink · verdant · marigold. Type: Space Grotesk + Inter.</p>
        </div>
      </div>
    </footer>
  );
}
