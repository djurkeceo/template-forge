import type { ReactElement } from 'react';
import { Amphora, Droplets, Flower2, Leaf, Sprout, Sun } from 'lucide-react';
import type { TileIcon, TileId } from '../data/products';

interface TileArtProps {
  tile: TileId;
  icon: TileIcon;
  /** Accessible label for the artwork region. */
  label: string;
  className?: string;
}

const ICONS = {
  leaf: Leaf,
  sprout: Sprout,
  flower: Flower2,
  amphora: Amphora,
  droplets: Droplets,
  sun: Sun,
} as const;

// Full literal class names — Tailwind only generates classes it can see
// statically, so never build these with template strings.
const TILES: Record<TileId, string> = {
  1: 'bg-tile-1',
  2: 'bg-tile-2',
  3: 'bg-tile-3',
  4: 'bg-tile-4',
  5: 'bg-tile-5',
  6: 'bg-tile-6',
};

// Consistent placeholder photography: every product gets the same framing —
// graded gradient tile, one centered botanical mark, one hairline ring — so
// the grid reads as art-directed rather than random stock sizes.
// No inline styles: artwork comes from bg-tile-* utilities in tailwind.config.
export function TileArt({ tile, icon, label, className }: TileArtProps): ReactElement {
  const Icon = ICONS[icon];
  return (
    <div
      role="img"
      aria-label={label}
      className={`${TILES[tile]} relative overflow-hidden ${className ?? ''}`}
    >
      {/* Hairline inner frame shared by every tile. */}
      <div aria-hidden="true" className="absolute inset-3 rounded-pod border border-white/25" />
      {/* Soft top-light wash so gradients feel photographic. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/25" />
      <Icon
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-white/85 transition-transform duration-300 group-hover:scale-110"
        strokeWidth={1.25}
      />
    </div>
  );
}
