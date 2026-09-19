// Central pricing model for the Cadence template.
//
// Buyers edit PLANS and ADDONS here; every number shown in the demo
// (calculator, tier cards, comparison table) derives from these values
// so the storefront can never drift out of sync.

export type BillingPeriod = 'monthly' | 'annual';

export interface Plan {
  id: 'starter' | 'studio' | 'collective';
  name: string;
  blurb: string;
  // Base fee covers the included booking allowance.
  baseMonthly: number;
  includedBookings: number;
  // Per extra booking above the allowance.
  overagePerBooking: number;
  // Per additional location above the first.
  perLocationMonthly: number;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    blurb: 'One room, one timetable. For new studios finding their rhythm.',
    baseMonthly: 29,
    includedBookings: 200,
    overagePerBooking: 0.35,
    perLocationMonthly: 12,
    cta: 'Start with Starter',
  },
  {
    id: 'studio',
    name: 'Studio',
    blurb: 'Our most chosen plan. Waitlists, memberships and payouts.',
    baseMonthly: 79,
    includedBookings: 800,
    overagePerBooking: 0.22,
    perLocationMonthly: 19,
    cta: 'Choose Studio',
  },
  {
    id: 'collective',
    name: 'Collective',
    blurb: 'Several sites, one rota. For groups sharing staff and members.',
    baseMonthly: 159,
    includedBookings: 2500,
    overagePerBooking: 0.14,
    perLocationMonthly: 29,
    cta: 'Talk to us',
  },
];

export interface QuoteInput {
  planId: Plan['id'];
  bookingsPerMonth: number;
  locations: number;
  period: BillingPeriod;
}

export interface Quote {
  plan: Plan;
  base: number;
  overage: number;
  locationsCost: number;
  subtotalMonthly: number;
  /** What the visitor actually pays per month after the annual discount. */
  effectiveMonthly: number;
  annualDiscountRate: number;
  overageBookings: number;
}

export const ANNUAL_DISCOUNT_RATE = 0.2;
export const MAX_BOOKINGS = 5000;
export const MAX_LOCATIONS = 5;

/** Clamp helper keeps slider / stepper input inside sane bounds. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function getPlan(planId: Plan['id']): Plan {
  const found = PLANS.find((p) => p.id === planId);
  // Fallback is deliberate: corrupt query params should still render Studio.
  return found ?? PLANS[1]!;
}

/**
 * Pure quote math — exported so buyers can unit-test it and reuse it
 * in checkout code. All money is rounded to whole dollars for display.
 */
export function quote(input: QuoteInput): Quote {
  const plan = getPlan(input.planId);
  const bookings = clamp(Math.round(input.bookingsPerMonth), 0, MAX_BOOKINGS);
  const locations = clamp(Math.round(input.locations), 1, MAX_LOCATIONS);

  const overageBookings = Math.max(0, bookings - plan.includedBookings);
  const overage = overageBookings * plan.overagePerBooking;
  const locationsCost = (locations - 1) * plan.perLocationMonthly;
  const subtotalMonthly = plan.baseMonthly + overage + locationsCost;
  const annualDiscountRate = input.period === 'annual' ? ANNUAL_DISCOUNT_RATE : 0;
  const effectiveMonthly = subtotalMonthly * (1 - annualDiscountRate);

  return {
    plan,
    base: plan.baseMonthly,
    overage,
    locationsCost,
    subtotalMonthly,
    effectiveMonthly,
    annualDiscountRate,
    overageBookings,
  };
}

export function formatUSD(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
