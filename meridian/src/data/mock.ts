// ————————————————————————————————————————————————————————————————
// Mock dataset for the Meridian template.
//
// REPLACE WITH YOUR REAL API HERE: every view reads these typed models,
// so rewiring means swapping these exports for fetch calls (plus the
// simulated latency in App.tsx). All names, companies and numbers are
// invented generics — nothing belongs to a real business.
// ————————————————————————————————————————————————————————————————

export type Plan = 'Starter' | 'Studio' | 'Collective';
export type Status = 'active' | 'trialing' | 'past_due' | 'paused';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  plan: Plan;
  status: Status;
  mrr: number;
  seats: number;
  joined: string;
  /** 0–100 health score driving the bar + sort. */
  health: number;
}

export const CUSTOMERS: Customer[] = [
  { id: 'c01', name: 'Maya Rook', company: 'Fern & Form', email: 'maya@fernandform.example', plan: 'Studio', status: 'active', mrr: 249, seats: 14, joined: '2024-02-11', health: 92 },
  { id: 'c02', name: 'Devon Kade', company: 'Copperline', email: 'devon@copperline.example', plan: 'Collective', status: 'active', mrr: 499, seats: 42, joined: '2023-09-04', health: 88 },
  { id: 'c03', name: 'Priya Shah', company: 'Juniper Rooms', email: 'priya@juniperrooms.example', plan: 'Studio', status: 'trialing', mrr: 0, seats: 6, joined: '2026-08-19', health: 64 },
  { id: 'c04', name: 'Tomas Ivers', company: 'Half Mile Lab', email: 'tomas@halfmilelab.example', plan: 'Starter', status: 'active', mrr: 79, seats: 5, joined: '2025-05-27', health: 78 },
  { id: 'c05', name: 'Alba Moreno', company: 'Moss & Bell', email: 'alba@mossandbell.example', plan: 'Studio', status: 'past_due', mrr: 249, seats: 11, joined: '2024-11-02', health: 41 },
  { id: 'c06', name: 'Jonas Feld', company: 'Alder Physio', email: 'jonas@alderphysio.example', plan: 'Starter', status: 'active', mrr: 79, seats: 4, joined: '2025-01-15', health: 83 },
  { id: 'c07', name: 'Nadia Osei', company: 'Stillwater', email: 'nadia@stillwater.example', plan: 'Collective', status: 'active', mrr: 499, seats: 38, joined: '2023-12-08', health: 95 },
  { id: 'c08', name: 'Ruth Calloway', company: 'Bramble & Co', email: 'ruth@brambleco.example', plan: 'Starter', status: 'paused', mrr: 0, seats: 3, joined: '2024-06-30', health: 35 },
  { id: 'c09', name: 'Ellis Tran', company: 'Foxglove', email: 'ellis@foxglove.example', plan: 'Studio', status: 'active', mrr: 249, seats: 16, joined: '2024-04-17', health: 81 },
  { id: 'c10', name: 'Wren Abara', company: 'Larkspur Fit', email: 'wren@larkspurfit.example', plan: 'Studio', status: 'trialing', mrr: 0, seats: 8, joined: '2026-07-25', health: 58 },
  { id: 'c11', name: 'Otto Lindqvist', company: 'Northglass', email: 'otto@northglass.example', plan: 'Collective', status: 'past_due', mrr: 499, seats: 51, joined: '2023-05-19', health: 47 },
  { id: 'c12', name: 'Sable Quinn', company: 'Dunmere', email: 'sable@dunmere.example', plan: 'Starter', status: 'active', mrr: 79, seats: 5, joined: '2025-10-03', health: 74 },
  { id: 'c13', name: 'Iris Vane', company: 'Cattail', email: 'iris@cattail.example', plan: 'Studio', status: 'active', mrr: 249, seats: 13, joined: '2024-08-22', health: 86 },
  { id: 'c14', name: 'Hollis Beck', company: 'Grackle', email: 'hollis@grackle.example', plan: 'Starter', status: 'trialing', mrr: 0, seats: 2, joined: '2026-09-02', health: 52 },
  { id: 'c15', name: 'June Park', company: 'Sweetflag', email: 'june@sweetflag.example', plan: 'Collective', status: 'active', mrr: 499, seats: 44, joined: '2024-01-09', health: 91 },
  { id: 'c16', name: 'Ash Boudreaux', company: 'Palmetto', email: 'ash@palmetto.example', plan: 'Studio', status: 'paused', mrr: 0, seats: 7, joined: '2023-11-14', health: 38 },
];

export interface RevenuePoint {
  label: string;
  revenue: number;
  signups: number;
}

// Deterministic generator: same seed shape every load so the demo is
// stable, but shaped like real SaaS growth (trend + weekly wave + noise).
// `days` drives the 7/30/90-day range filter on the Overview chart.
export function revenueSeries(days: 7 | 30 | 90): RevenuePoint[] {
  const out: RevenuePoint[] = [];
  // Cheap deterministic pseudo-random from the index (no seed library).
  const noise = (i: number): number => {
    const x = Math.sin(i * 127.1 + days * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < days; i++) {
    const growth = 1 + i * 0.012;
    const wave = 1 + 0.18 * Math.sin((i / 7) * Math.PI * 2);
    const jitter = 0.92 + noise(i) * 0.16;
    out.push({
      label: days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] ?? `D${i + 1}` : `Day ${i + 1}`,
      revenue: Math.round(4200 * growth * wave * jitter),
      signups: Math.round(38 * growth * wave * jitter),
    });
  }
  return out;
}

export interface ChannelDatum {
  channel: string;
  share: number;
}

export const CHANNELS: ChannelDatum[] = [
  { channel: 'Organic search', share: 34 },
  { channel: 'Referrals', share: 26 },
  { channel: 'Partners', share: 18 },
  { channel: 'Paid', share: 14 },
  { channel: 'Other', share: 8 },
];

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

export const ACTIVITY: ActivityItem[] = [
  { id: 'a1', text: 'Northglass upgraded 32 seats to Collective', time: '9 min ago' },
  { id: 'a2', text: 'Trial started: Larkspur Fit (8 seats)', time: '41 min ago' },
  { id: 'a3', text: 'Invoice #2841 failed for Moss & Bell — retry scheduled', time: '2 hrs ago' },
  { id: 'a4', text: 'Sweetflag renewed for 12 months', time: '5 hrs ago' },
  { id: 'a5', text: 'Weekly payout of $18,204 sent to connected account', time: 'Yesterday' },
];

export function formatUSD(n: number, digits = 0): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits });
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}
