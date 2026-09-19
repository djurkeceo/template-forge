import type { ReactElement } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { PLANS, formatUSD } from '../lib/pricing';

const PERKS: Record<string, string[]> = {
  starter: ['200 bookings / month', '1 timetable + online booking link', 'Email reminders'],
  studio: ['800 bookings / month', 'Waitlist + memberships', 'Friday payouts + card on file'],
  collective: ['2,500 bookings / month', 'Up to 5 locations + shared rotas', 'Priority migration help'],
};

// Variant B — classic three-tier cards for buyers who want a familiar
// pricing wall next to (or instead of) the calculator band.
export function PricingTiers(): ReactElement {
  return (
    <section aria-labelledby="tiers-title" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <SectionHeading
        kicker="Pick a starting point"
        title="Three plans, no seating-chart math required"
        lede="Every plan includes the booking link, reminders and free timetable import. Move up when the waitlist tells you to."
        align="center"
      />
      <ul className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const featured = p.id === 'studio';
          return (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 0.1}
              className={`flex flex-col rounded-panel p-7 ${
                featured
                  ? 'border-2 border-ink bg-ink text-white shadow-stamp lg:-my-3 lg:py-10 dark:border-marigold dark:bg-ink-surface'
                  : 'border border-line bg-white shadow-card dark:border-white/10 dark:bg-ink-surface dark:text-white'
              }`}
            >
              {featured && (
                <p className="mb-3 w-fit rounded-full bg-marigold px-3 py-1 text-xs font-bold text-ink">
                  Most studios land here
                </p>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className={`mt-1 text-sm ${featured ? 'text-white/70' : 'text-fog dark:text-gray-300'}`}>{p.blurb}</p>
              <p className="font-display mt-4 text-4xl font-bold">
                {formatUSD(p.baseMonthly)}
                <span className={`text-sm font-semibold ${featured ? 'text-white/60' : 'text-fog'}`}>/month</span>
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm">
                {PERKS[p.id]?.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check
                      size={16}
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 ${featured ? 'text-marigold' : 'text-verdant dark:text-marigold'}`}
                    />
                    <span className={featured ? 'text-white/85' : 'text-ink dark:text-gray-200'}>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex-1" />
              <Button
                href="#cta"
                variant={featured ? 'primary' : 'secondary'}
                size="md"
                aria-label={`${p.cta} on the ${p.name} plan`}
              >
                {i === 2 ? 'Talk to us' : p.cta}
              </Button>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
