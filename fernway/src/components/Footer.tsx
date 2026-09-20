import type { ReactElement } from 'react';
import { Sprout } from 'lucide-react';

interface FooterProps {
  onHome: () => void;
}

// Semantic footer with shop anchors. All links route inside the demo.
export function Footer({ onHome }: FooterProps): ReactElement {
  return (
    <footer className="border-t border-stone bg-white dark:border-white/10 dark:bg-forest-deep">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-pod bg-forest text-sunbeam">
              <Sprout size={20} aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold text-forest dark:text-white">Fernway</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-forest/60 dark:text-gray-400">
            Nursery-grown plants, clay planters and honest care goods.
            A commercial template — swap the catalog, keep the engine.
          </p>
          <p className="mt-4 text-xs text-forest/40 dark:text-gray-500">
            Demo content is fictional. No real brands, names or photos.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {[
            { title: 'Shop', links: ['Plants', 'Planters', 'Care goods'] },
            { title: 'Help', links: ['Shipping', 'Returns', 'Guarantee'] },
            { title: 'Template', links: ['Setup guide', 'Payment wiring', 'Custom colors'] },
          ].map((col) => (
            <div key={col.title}>
              <h2 className="text-[13px] font-bold uppercase tracking-wide text-forest/50 dark:text-gray-400">{col.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={onHome}
                      className="text-sm font-medium text-forest hover:underline hover:underline-offset-4 dark:text-gray-300"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-stone dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-forest/50 sm:flex-row sm:items-center sm:justify-between dark:text-gray-500">
          <p>© 2026 Fernway Template Co. Built with React, Tailwind, Motion and Zustand.</p>
          <p>Palette: forest · mist · fern · sunbeam. Type: Sora + Manrope.</p>
        </div>
      </div>
    </footer>
  );
}
