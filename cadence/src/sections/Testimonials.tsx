import type { ReactElement } from 'react';
import { Quote } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TESTIMONIALS } from '../lib/content';

// Split rhythm: sticky intro on the left, stacked quote cards on the right.
// Cards alternate alignment and use three different treatments so they
// don't read as one stamped grid.
export function Testimonials(): ReactElement {
  return (
    <section id="stories" aria-labelledby="stories-title" className="scroll-mt-20 border-y border-line bg-white dark:border-white/10 dark:bg-ink-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            kicker="Studio stories"
            title="Saturday used to need a clipboard"
            lede="Three owners on what changed in the first month. All names shortened for privacy; every number from their payout reports."
          />
          <dl className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-ticket bg-paper p-4 dark:bg-white/5">
              <dt className="sr-only">Average no-show reduction</dt>
              <dd className="font-display text-2xl font-bold text-ink dark:text-white">−38%</dd>
              <dd className="text-xs text-fog dark:text-gray-400">no-shows, first 30 days</dd>
            </div>
            <div className="rounded-ticket bg-paper p-4 dark:bg-white/5">
              <dt className="sr-only">Median setup time</dt>
              <dd className="font-display text-2xl font-bold text-ink dark:text-white">1 afternoon</dd>
              <dd className="text-xs text-fog dark:text-gray-400">spreadsheet to live booking</dd>
            </div>
          </dl>
        </div>

        <ul className="flex flex-col gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.1}>
              <figure
                className={`rounded-panel border border-line p-6 shadow-card sm:p-7 dark:border-white/10 dark:bg-ink-surface ${
                  i === 1 ? 'bg-ink text-white sm:ml-10' : 'bg-paper sm:mr-10 dark:bg-ink-surface dark:text-white'
                } ${i === 2 ? 'sm:ml-6 sm:mr-4' : ''}`}
              >
                <Quote size={22} aria-hidden="true" className={i === 1 ? 'text-marigold' : 'text-verdant dark:text-marigold'} />
                <blockquote className="mt-3 text-[15px] leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold ${t.tint}`}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t.name}</span>
                    <span className={`block text-xs ${i === 1 ? 'text-white/60' : 'text-fog dark:text-gray-400'}`}>
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
