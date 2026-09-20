import type { ReactElement } from 'react';
import { RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import type { ShopFilter } from './Navbar';

export type PriceBucket = 'all' | 'under25' | 'mid' | 'over60';
export type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc';

interface ShopToolbarProps {
  filter: ShopFilter;
  onFilter: (f: ShopFilter) => void;
  bucket: PriceBucket;
  onBucket: (b: PriceBucket) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  shown: number;
  total: number;
  onClear: () => void;
  isFiltered: boolean;
}

const BUCKETS: Array<{ id: PriceBucket; label: string }> = [
  { id: 'all', label: 'Any price' },
  { id: 'under25', label: 'Under $25' },
  { id: 'mid', label: '$25–$60' },
  { id: 'over60', label: 'Over $60' },
];

const SORTS: Array<{ id: SortKey; label: string }> = [
  { id: 'featured', label: 'Most loved' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

// Working filter + sort bar. Categories are a radiogroup-lite (aria-pressed
// buttons), price is a second dimension, sort is a native select — the most
// robust control for keyboard and screen-reader shoppers.
export function ShopToolbar(props: ShopToolbarProps): ReactElement {
  const { filter, onFilter, bucket, onBucket, sort, onSort, shown, total, onClear, isFiltered } = props;

  const pill = (active: boolean): string =>
    `rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors ${
      active
        ? 'border-forest bg-forest text-white dark:border-sunbeam dark:bg-sunbeam dark:text-forest'
        : 'border-stone bg-white text-forest/70 hover:border-fern dark:border-white/15 dark:bg-transparent dark:text-gray-300'
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by collection">
        <button type="button" onClick={() => onFilter('all')} aria-pressed={filter === 'all'} className={pill(filter === 'all')}>
          Everything
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" onClick={() => onFilter(c.id)} aria-pressed={filter === c.id} className={pill(filter === c.id)}>
            {c.label}
          </button>
        ))}
        <button type="button" onClick={() => onFilter('wishlist')} aria-pressed={filter === 'wishlist'} className={pill(filter === 'wishlist')}>
          Saved
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by price">
          {BUCKETS.map((b) => (
            <button key={b.id} type="button" onClick={() => onBucket(b.id)} aria-pressed={bucket === b.id} className={pill(bucket === b.id)}>
              {b.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-forest/70 dark:text-gray-300">
          Sort
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="rounded-pod border border-stone bg-white px-3 py-1.5 text-sm font-bold text-forest dark:border-white/15 dark:bg-forest-deep dark:text-white"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-forest/60 dark:text-gray-400" aria-live="polite">
          Showing {shown} of {total} goods
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 text-sm font-bold text-fern-deep underline-offset-4 hover:underline dark:text-sunbeam"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
