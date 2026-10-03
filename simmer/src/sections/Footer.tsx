import type { ReactElement } from 'react';
import { Flame } from 'lucide-react';

export function Footer(): ReactElement {
  return (
    <footer className="border-t border-crust bg-cream-deep/50 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-paprika text-cream">
              <Flame size={17} aria-hidden="true" />
            </span>
            <span className="font-display text-base font-bold text-char dark:text-cream">Simmer</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-char/55 dark:text-cream/55">
            Cook what’s already home. A commercial template — swap the screens, keep the scroll.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {[
            { title: 'App', links: ['#how', '#screens', '#faq'] , labels: ['How it cooks', 'Screens', 'Questions']},
            { title: 'Get it', links: ['#download', '#download', '#download'], labels: ['App Store', 'Google Play', 'Notify me'] },
            { title: 'Template', links: ['#top', '#top', '#top'], labels: ['Back to top', 'Swap screens', 'Swap copy'] },
          ].map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-char/45 dark:text-cream/45">{col.title}</h2>
              <ul className="mt-2.5 space-y-2">
                {col.links.map((href, i) => (
                  <li key={`${href}-${i}`}>
                    <a href={href} className="text-sm font-medium text-char/70 hover:underline hover:underline-offset-4 dark:text-cream/70">
                      {col.labels[i] ?? href}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-crust dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 text-xs text-char/45 sm:flex-row sm:justify-between dark:text-cream/45">
          <p>© 2026 Simmer Template Co. Fictional app — no real affiliation.</p>
          <p>Palette: char · cream · paprika · basil · butter. Type: Outfit + Inter.</p>
        </div>
      </div>
    </footer>
  );
}
