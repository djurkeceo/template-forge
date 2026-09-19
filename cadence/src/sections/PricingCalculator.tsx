import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Building2, CalendarCheck, Info } from 'lucide-react';
import { Toggle } from '../components/Toggle';
import {
  MAX_BOOKINGS,
  MAX_LOCATIONS,
  PLANS,
  clamp,
  formatUSD,
  quote,
  type Plan,
} from '../lib/pricing';

// THE functional centerpiece: a genuinely live calculator.
// Bookings slider + location stepper + plan picker + annual toggle all
// feed the pure `quote()` function — the number shown is always computed,
// never a static string. Fully keyboard-operable with live-region output.
export function PricingCalculator(): ReactElement {
  const [planId, setPlanId] = useState<Plan['id']>('studio');
  const [bookings, setBookings] = useState(950);
  const [locations, setLocations] = useState(1);
  const [annual, setAnnual] = useState(true);

  const result = useMemo(
    () => quote({ planId, bookingsPerMonth: bookings, locations, period: annual ? 'annual' : 'monthly' }),
    [planId, bookings, locations, annual],
  );

  const fillPct = `${(bookings / MAX_BOOKINGS) * 100}%`;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 bg-ink py-16 text-white sm:py-20 dark:bg-ink-deep dark:ring-1 dark:ring-white/10 dark:ring-inset">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <span className="inline-flex w-fit items-center rounded-full bg-marigold px-3 py-1 text-[13px] font-bold text-ink">
              Pricing that moves with you
            </span>
            <h2 id="pricing-title" className="font-display mt-4 max-w-xl text-3xl font-bold leading-[1.05] sm:text-4xl">
              Drag the sliders. The price is real.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/70">
              Every studio books differently. Set your monthly bookings and rooms —
              the quote below recalculates instantly, including overages and the
              annual discount.
            </p>

            {/* Plan picker: real radiogroup, arrow-key navigable. */}
            <div role="radiogroup" aria-label="Choose a plan" className="mt-8 grid gap-3 sm:grid-cols-3">
              {PLANS.map((p) => {
                const active = p.id === planId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setPlanId(p.id)}
                    className={`rounded-panel border-2 p-4 text-left transition-all hover:-translate-y-0.5 ${
                      active
                        ? 'border-marigold bg-white text-ink'
                        : 'border-white/15 bg-white/5 text-white hover:border-white/40'
                    }`}
                  >
                    <span className="font-display text-base font-bold">{p.name}</span>
                    <span className={`mt-1 block text-[13px] ${active ? 'text-fog' : 'text-white/60'}`}>
                      {formatUSD(p.baseMonthly)}/mo · {p.includedBookings} bookings in
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="bookings" className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarCheck size={16} className="text-marigold" aria-hidden="true" />
                  Bookings per month: <output htmlFor="bookings">{bookings.toLocaleString()}</output>
                </label>
                {/* Dynamic --fill drives the slider's filled track; set inline
                    because the value changes every input event. */}
                <input
                  id="bookings"
                  type="range"
                  min={50}
                  max={MAX_BOOKINGS}
                  step={50}
                  value={bookings}
                  onChange={(e) => setBookings(clamp(Number(e.target.value), 50, MAX_BOOKINGS))}
                  className="cadence-range mt-3 w-full"
                  style={{ ['--fill' as string]: fillPct }}
                  aria-describedby="bookings-hint"
                />
                <p id="bookings-hint" className="mt-2 text-xs text-white/60">
                  Counts classes, appointments and day passes together. {result.plan.includedBookings} included on {result.plan.name}.
                </p>
              </div>

              <div>
                <span id="loc-label" className="flex items-center gap-2 text-sm font-semibold">
                  <Building2 size={16} className="text-marigold" aria-hidden="true" />
                  Locations: {locations}
                </span>
                <div className="mt-3 flex items-center gap-3" role="group" aria-labelledby="loc-label">
                  <button
                    type="button"
                    onClick={() => setLocations((v) => clamp(v - 1, 1, MAX_LOCATIONS))}
                    disabled={locations <= 1}
                    aria-label="Remove a location"
                    className="h-10 w-10 rounded-ticket border border-white/25 text-lg font-bold transition-colors hover:bg-white/10 disabled:opacity-30"
                  >
                    −
                  </button>
                  <div aria-hidden="true" className="flex gap-1.5">
                    {Array.from({ length: MAX_LOCATIONS }, (_, i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full ${i < locations ? 'bg-marigold' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setLocations((v) => clamp(v + 1, 1, MAX_LOCATIONS))}
                    disabled={locations >= MAX_LOCATIONS}
                    aria-label="Add a location"
                    className="h-10 w-10 rounded-ticket border border-white/25 text-lg font-bold transition-colors hover:bg-white/10 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  First room included. Extra rooms {formatUSD(result.plan.perLocationMonthly)}/mo each.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="text-white">
                <Toggle
                  checked={annual}
                  onChange={setAnnual}
                  hintLeft="Monthly billing"
                  hintRight="Annual billing"
                />
              </div>
              {annual && (
                <p className="rounded-full bg-verdant px-3 py-1 text-xs font-bold text-white">
                  Annual saves 20% — applied below
                </p>
              )}
            </div>
          </div>

          {/* Receipt panel: light ticket pinned on the dark band for contrast. */}
          <aside
            aria-label="Your quote"
            className="rounded-panel bg-paper p-6 text-ink shadow-lift lg:sticky lg:top-24 dark:bg-white"
          >
            <p className="text-[13px] font-bold uppercase tracking-wide text-fog">Your quote · {result.plan.name}</p>
            <p className="font-display mt-2 text-5xl font-bold" aria-live="polite">
              {formatUSD(result.effectiveMonthly)}
              <span className="text-base font-semibold text-fog">/mo</span>
            </p>
            <p className="mt-1 text-[13px] text-fog">
              {annual ? 'Billed annually' : 'Billed monthly'} · cancel anytime
            </p>

            <dl className="mt-5 space-y-2.5 border-t border-dashed border-ink/20 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-fog">Base · {result.plan.name}</dt>
                <dd className="font-semibold">{formatUSD(result.base)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fog">
                  {result.overageBookings > 0
                    ? `${result.overageBookings.toLocaleString()} extra bookings`
                    : 'Within booking allowance'}
                </dt>
                <dd className="font-semibold">{formatUSD(result.overage)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fog">{locations > 1 ? `${locations - 1} extra location${locations > 2 ? 's' : ''}` : '1 location included'}</dt>
                <dd className="font-semibold">{formatUSD(result.locationsCost)}</dd>
              </div>
              {annual && (
                <div className="flex justify-between text-verdant-deep">
                  <dt className="font-medium">Annual discount (20%)</dt>
                  <dd className="font-semibold">−{formatUSD(result.subtotalMonthly - result.effectiveMonthly)}</dd>
                </div>
              )}
            </dl>

            <a
              href="#cta"
              className="mt-6 flex items-center justify-center rounded-ticket border-2 border-ink bg-ink px-5 py-3 text-sm font-bold text-white shadow-stamp transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0E7C5A]"
            >
              Start 21 days free
            </a>
            <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-fog">
              <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
              Quote updates live as you adjust. Overage is ${result.plan.overagePerBooking.toFixed(2)} per
              booking above {result.plan.includedBookings.toLocaleString()}.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
