import { BookOpenText, Compass, Inbox, Palette, ScrollText, type LucideIcon } from 'lucide-react';

// ————————————————————————————————————————————————————————————————
// App registry: ids, invented names, icon tiles. Data-only module (kept
// separate from the provider in os.tsx so fast-refresh lint stays quiet).
// Buyers add an app here, add its content file in src/apps/, and add one
// line to the APP_CONTENT maps in Desktop.tsx + MobileFallback.tsx.
// ————————————————————————————————————————————————————————————————

export type AppId = 'fieldnotes' | 'waypoints' | 'ledger' | 'postbox' | 'hues';

export interface AppMeta {
  id: AppId;
  /** Invented app name — buyers rename these to their own. */
  name: string;
  tagline: string;
  icon: LucideIcon;
  /** Literal tile classes (never template-built, so Tailwind sees them). */
  tile: string;
}

export const APPS: AppMeta[] = [
  { id: 'fieldnotes', name: 'Fieldnotes', tagline: 'About Robin', icon: BookOpenText, tile: 'bg-marigold text-ink' },
  { id: 'waypoints', name: 'Waypoints', tagline: 'Selected work', icon: Compass, tile: 'bg-lagoon text-white' },
  { id: 'ledger', name: 'Ledger', tagline: 'Resume & timeline', icon: ScrollText, tile: 'bg-paper text-ink' },
  { id: 'postbox', name: 'Postbox', tagline: 'Say hello', icon: Inbox, tile: 'bg-spruce-pine text-marigold-soft' },
  { id: 'hues', name: 'Hues', tagline: 'Recolor the desk', icon: Palette, tile: 'bg-marigold-soft text-ink' },
];

export function appMeta(id: AppId): AppMeta {
  const found = APPS.find((a) => a.id === id);
  if (found === undefined) throw new Error(`Unknown app: ${id}`);
  return found;
}

export type DeskTint = 'spruce' | 'pine' | 'deep';

/** Literal desk tints for the Hues app — never template-built. */
export const DESK_TINTS: Record<DeskTint, string> = {
  spruce: 'desk-felt',
  pine: 'bg-spruce-pine',
  deep: 'bg-spruce-deep',
};
