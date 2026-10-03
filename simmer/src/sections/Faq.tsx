import { useState, type ReactElement } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../lib/content';

// Working accordion: one open at a time, native buttons with expanded
// state and labelled regions.
export function Faq(): ReactElement {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16 sm:py-20">
      <h2 id="faq-title" className="font-display text-center text-3xl font-bold text-char sm:text-4xl dark:text-cream">
        Asked at every dinner party
      </h2>
      <ul className="mt-8 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li
              key={f.q}
              className={`overflow-hidden rounded-card border-2 transition-colors ${
                isOpen ? 'border-char bg-white shadow-card dark:border-butter dark:bg-white/5' : 'border-crust bg-white/60 hover:border-char/40 dark:border-white/10 dark:bg-white/[0.02]'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-[15px] font-bold text-char dark:text-cream">{f.q}</span>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-char text-cream dark:bg-butter dark:text-char' : 'bg-cream-deep text-char dark:bg-white/10 dark:text-cream'}`}>
                  {isOpen ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                </span>
              </button>
              {isOpen && (
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`} className="px-5 pb-5">
                  <p className="text-[15px] leading-relaxed text-char/70 dark:text-cream/70">{f.a}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
