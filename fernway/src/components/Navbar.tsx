import type { ReactElement } from 'react';
import { Heart, Moon, ShoppingBag, Sprout, Sun } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CATEGORIES, type Category } from '../data/products';
import { selectCount, useShop } from '../store/shop';

export type ShopFilter = Category | 'all' | 'wishlist';

interface NavbarProps {
  dark: boolean;
  onToggleDark: () => void;
  filter: ShopFilter;
  onFilter: (f: ShopFilter) => void;
  onHome: () => void;
}

// Storefront bar: brand, category shortcuts, wishlist + cart buttons.
// The cart count badge replays a small pop whenever the cart changes
// (keyed by item count), skipped for reduced motion.
export function Navbar({ dark, onToggleDark, filter, onFilter, onHome }: NavbarProps): ReactElement {
  const count = useShop(selectCount);
  const wishCount = useShop((s) => s.wishlist.length);
  const openDrawer = useShop((s) => s.setDrawerOpen);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-stone bg-mist dark:border-white/10 dark:bg-forest-deep">
      {/* Announcement shelf — static, no motion budget spent here. */}
      <p className="bg-forest px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-white dark:bg-black/30">
        Free shipping over $75 <span className="mx-2 text-sunbeam" aria-hidden="true">•</span> 30-day root guarantee
      </p>
      <nav aria-label="Store" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <button type="button" onClick={onHome} className="flex items-center gap-2" aria-label="Fernway home">
          <span className="grid h-9 w-9 place-items-center rounded-pod bg-forest text-sunbeam">
            <Sprout size={20} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold text-forest dark:text-white">Fernway</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex" aria-label="Categories">
          <li>
            <button
              type="button"
              onClick={() => { onFilter('all'); onHome(); }}
              aria-current={filter === 'all' ? 'page' : undefined}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                filter === 'all' ? 'bg-forest text-white' : 'text-forest/70 hover:bg-fern-tint dark:text-gray-300 dark:hover:bg-white/10'
              }`}
            >
              Shop all
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => { onFilter(c.id); onHome(); }}
                aria-current={filter === c.id ? 'page' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  filter === c.id ? 'bg-forest text-white' : 'text-forest/70 hover:bg-fern-tint dark:text-gray-300 dark:hover:bg-white/10'
                }`}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-10 w-10 place-items-center rounded-pod border border-stone text-forest transition-colors hover:border-fern dark:border-white/15 dark:text-white"
          >
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => { onFilter('wishlist'); onHome(); }}
            aria-label={`Wishlist, ${wishCount} items`}
            className="relative grid h-10 w-10 place-items-center rounded-pod border border-stone text-forest transition-colors hover:border-fern dark:border-white/15 dark:text-white"
          >
            <Heart size={17} aria-hidden="true" />
            {wishCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-sunbeam px-1 text-[11px] font-bold text-forest">
                {wishCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => openDrawer(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative flex h-10 items-center gap-2 rounded-pod bg-forest px-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-sunbeam dark:text-forest"
          >
            <ShoppingBag size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            {reduce ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-sunbeam px-1 text-[11px] font-bold text-forest dark:bg-forest dark:text-white">
                {count}
              </span>
            ) : (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="grid h-5 min-w-5 place-items-center rounded-full bg-sunbeam px-1 text-[11px] font-bold text-forest dark:bg-forest dark:text-white"
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
