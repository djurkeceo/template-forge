import type { ReactElement } from 'react';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { FAQS } from '../lib/content';

// Accessible accordion: native <button> + aria-expanded + region.
// Only one item open at a time; keyboard users tab through questions.
export function Faq(): ReactElement {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          kicker="Honest answers"
          title="Asked at every demo, answered here"
          lede="Migration, waitlists, payouts. If your question isn't listed, the trial includes a real human walkthrough — not a chatbot loop."
        />
        <ul className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                className={`overflow-hidden rounded-panel border transition-colors ${
                  isOpen
                    ? 'border-ink bg-white shadow-card dark:border-marigold dark:bg-ink-surface'
                    : 'border-line bg-white hover:border-fog dark:border-white/10 dark:bg-ink-surface'
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
                  <span className="font-display text-[15px] font-bold text-ink dark:text-white">{f.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                      isOpen ? 'bg-ink text-marigold dark:bg-marigold dark:text-ink' : 'bg-paper text-ink dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    {isOpen ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`} className="px-5 pb-5">
                    <p className="text-[15px] leading-relaxed text-fog dark:text-gray-300">{f.a}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
