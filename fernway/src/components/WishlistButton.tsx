import type { ReactElement } from 'react';
import { Heart } from 'lucide-react';
import { useShop } from '../store/shop';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
}

// Persisted favorites toggle. Uses aria-pressed so the state is announced;
// the fill change is the visual feedback (no color-only meaning — the label
// also changes).
export function WishlistButton({ productId, productName, className }: WishlistButtonProps): ReactElement {
  const active = useShop((s) => s.wishlist.includes(productId));
  const toggle = useShop((s) => s.toggleWishlist);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      className={`grid h-9 w-9 place-items-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
        active
          ? 'border-fern bg-fern text-white'
          : 'border-stone bg-white/90 text-forest hover:border-fern dark:border-white/15 dark:bg-forest-deep/80 dark:text-white'
      } ${className ?? ''}`}
    >
      <Heart size={16} aria-hidden="true" fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
