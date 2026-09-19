import type { ReactElement } from 'react';
import { ArrowRight, CalendarDays, CreditCard, Users } from 'lucide-react';
import { Button } from '../components/Button';

// Variant B — "Ticket stub": centered compact hero with a perforated
// strip of three outcomes. Buyers can swap this in for a calmer page top.
export function HeroCentered(): ReactElement {
  return (
    <section aria-labelledby="hero-alt-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-[100%] bg-verdant-tint blur-3xl dark:bg-verdant/15" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-12 text-center sm:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-verdant-deep dark:border-white/15 dark:bg-white/5 dark:text-marigold-soft">
          <CalendarDays size={14} aria-hidden="true" />
          Bookings, memberships and payouts in one place
        </p>
        <h1
          id="hero-alt-title"
          className="font-display mt-5 text-4xl font-bold leading-[1.03] text-ink sm:text-5xl dark:text-white"
        >
          Fill every seat without chasing anyone.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fog dark:text-gray-300">
          One link for booking, one waitlist that fills itself, one payout every
          Friday. Built for the way small studios really run.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="#pricing" size="lg">
            Price your studio
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Button href="#stories" size="lg" variant="secondary">
            Meet the studios
          </Button>
        </div>

        {/* Perforated ticket strip — dashed dividers, three mini outcomes. */}
        <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 divide-y divide-dashed divide-ink/20 rounded-panel border-2 border-ink bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/20 dark:border-white dark:bg-ink-surface">
          {[
            { icon: Users, top: 'Waitlist ×4', bottom: 'every full class offers seats in order' },
            { icon: CreditCard, top: 'Friday payout', bottom: 'memberships and drop-ins reconciled' },
            { icon: CalendarDays, top: '2-min reschedule', bottom: 'members move themselves, rules apply' },
          ].map((row) => (
            <div key={row.top} className="flex items-center gap-3 px-5 py-4 text-left">
              <row.icon size={22} className="shrink-0 text-verdant dark:text-marigold" aria-hidden="true" />
              <div>
                <dt className="text-sm font-bold text-ink dark:text-white">{row.top}</dt>
                <dd className="text-[13px] leading-snug text-fog dark:text-gray-300">{row.bottom}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
