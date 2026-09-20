// Icon-spot registry: remembers where each desktop tile currently sits so
// freshly opened windows can appear BESIDE their icon. Module-level Map
// (not React state) because both icons (writers) and dock/welcome
// shortcuts (readers) need it without re-rendering the desk on every drag.

import type { AppId } from './apps';

export interface Spot {
  x: number;
  y: number;
}

const spots = new Map<AppId, Spot>();

export function setIconSpot(app: AppId, spot: Spot): void {
  spots.set(app, spot);
}

export function getIconSpot(app: AppId): Spot | undefined {
  return spots.get(app);
}

/**
 * Window origin for an icon at (ix, iy): just right of the tile, roughly
 * aligned to its top, clamped inside the viewport. Window default is
 * 560×430, so the right clamp reserves ~600px and the bottom ~520px
 * (menubar + dock breathing room).
 */
export function windowSpotFor(ix: number, iy: number): Spot {
  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth;
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight;
  return {
    x: Math.min(Math.max(8, ix + 132), Math.max(8, vw - 600)),
    y: Math.min(Math.max(8, iy - 24), Math.max(8, vh - 520)),
  };
}
