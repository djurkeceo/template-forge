import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { formatUSD, type Product } from '../data/products';
import { useShop } from '../store/shop';
import { Stars } from './Stars';
import { TileArt } from './TileArt';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: Product;
  onOpen: (id: string) => void;
}

const BADGE_STYLES: Record<NonNullable<Product['badge']>, string> = {
  Bestseller: 'bg-forest text-white',
  New: 'bg-fern text-white',
  Sale: 'bg-sunbeam text-forest',
  'Low stock': 'bg-white text-bark border border-stone',
};

// Shelf card: consistent 4/5 tile, hover zoom on the artwork, quick-add with
// a morph-to-check confirmation. The whole tile is NOT one giant link —
// image and title are separate buttons so keyboard users get clear targets.
export function ProductCard({ product, onOpen }: ProductCardProps): ReactElement {
  const addLine = useShop((s) => s.addLine);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function quickAdd(): void {
    const first = product.variants[0];
    addLine(product.id, first?.id ?? 'std', 1);
    setAdded(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-shelf border border-stone bg-white shadow-shelf transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-forest-deep">
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpen(product.id)}
          aria-label={`View ${product.name}`}
          className="block w-full"
        >
          <TileArt
            tile={product.tile}
            icon={product.icon}
            label={`${product.name} artwork`}
            className="aspect-[4/5] w-full"
          />
        </button>
        {product.badge !== undefined && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </span>
        )}
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-fern-deep dark:text-fern-tint">
          {product.category}
        </p>
        <button type="button" onClick={() => onOpen(product.id)} className="text-left">
          <h3 className="font-display text-base font-bold leading-snug text-forest-ink hover:underline hover:underline-offset-4 dark:text-white">
            {product.name}
          </h3>
        </button>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold text-forest dark:text-white">{formatUSD(product.price)}</span>
            {product.compareAt !== undefined && (
              <s className="text-sm text-bark/50 dark:text-gray-400">{formatUSD(product.compareAt)}</s>
            )}
          </p>
          <button
            type="button"
            onClick={quickAdd}
            aria-live="polite"
            aria-label={added ? `${product.name} added to cart` : `Quick add ${product.name} to cart`}
            className={`flex items-center gap-1.5 rounded-pod px-3.5 py-2 text-[13px] font-bold transition-all active:scale-95 ${
              added
                ? 'bg-fern text-white'
                : 'bg-forest text-white hover:bg-fern-deep dark:bg-sunbeam dark:text-forest dark:hover:bg-sunbeam-soft'
            }`}
          >
            {added ? <Check size={15} aria-hidden="true" /> : <ShoppingBag size={15} aria-hidden="true" />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
