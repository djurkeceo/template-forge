import { useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { SearchX } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { PRODUCTS } from './data/products';
import { useShop } from './store/shop';
import { Navbar, type ShopFilter } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopToolbar, type PriceBucket, type SortKey } from './components/ShopToolbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutFlow } from './components/CheckoutFlow';
import { Footer } from './components/Footer';

export type Route = { name: 'shop' } | { name: 'product'; id: string } | { name: 'checkout' };

function inBucket(price: number, bucket: PriceBucket): boolean {
  if (bucket === 'under25') return price < 25;
  if (bucket === 'mid') return price >= 25 && price <= 60;
  if (bucket === 'over60') return price > 60;
  return true;
}

// Demo shell: shop grid ↔ product detail ↔ checkout, plus the cart drawer
// overlay. Filter/sort state lives here so the toolbar and grid share it.
export default function App(): ReactElement {
  const { dark, toggle } = useDarkMode();
  const [route, setRoute] = useState<Route>({ name: 'shop' });
  const [filter, setFilter] = useState<ShopFilter>('all');
  const [bucket, setBucket] = useState<PriceBucket>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const wishlist = useShop((s) => s.wishlist);

  // Every route change starts at the top (route views are separate pages).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const visible = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (filter === 'wishlist' && !wishlist.includes(p.id)) return false;
      if (filter !== 'all' && filter !== 'wishlist' && p.category !== filter) return false;
      // Price filter applies to the base price (variant choice happens later).
      if (!inBucket(p.price, bucket)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    else sorted.sort((a, b) => b.popularity - a.popularity);
    return sorted;
  }, [filter, bucket, sort, wishlist]);

  const isFiltered = filter !== 'all' || bucket !== 'all';

  function clearFilters(): void {
    setFilter('all');
    setBucket('all');
    setSort('featured');
  }

  function goShop(): void {
    setRoute({ name: 'shop' });
  }

  return (
    <div className="min-h-screen bg-mist text-forest-ink dark:bg-forest-deep dark:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-sunbeam focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-forest"
      >
        Skip to content
      </a>

      <Navbar dark={dark} onToggleDark={toggle} filter={filter} onFilter={setFilter} onHome={goShop} />

      <main id="main">
        {route.name === 'shop' && (
          <>
            <Hero
              onShopNow={() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <section id="catalog" aria-label="Product catalog" className="mx-auto max-w-6xl scroll-mt-32 px-5 pb-20">
              <ShopToolbar
                filter={filter}
                onFilter={setFilter}
                bucket={bucket}
                onBucket={setBucket}
                sort={sort}
                onSort={setSort}
                shown={visible.length}
                total={PRODUCTS.length}
                onClear={clearFilters}
                isFiltered={isFiltered}
              />
              {visible.length === 0 ? (
                // Empty-search state — buyers check for this.
                <div className="mx-auto flex max-w-md flex-col items-center px-5 py-16 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-fern-tint text-fern-deep dark:bg-white/10 dark:text-sunbeam">
                    <SearchX size={28} aria-hidden="true" />
                  </span>
                  <h2 className="font-display mt-4 text-2xl font-bold text-forest dark:text-white">
                    {filter === 'wishlist' ? 'No saved plants yet' : 'Nothing in this patch'}
                  </h2>
                  <p className="mt-2 text-[15px] text-forest/60 dark:text-gray-400">
                    {filter === 'wishlist'
                      ? 'Tap the heart on any product and it will wait for you here.'
                      : 'Try a different collection or price band — the monstera is worth it.'}
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-pod bg-forest px-6 py-3 text-sm font-bold text-white dark:bg-sunbeam dark:text-forest"
                  >
                    Show everything
                  </button>
                </div>
              ) : (
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                  {visible.map((p) => (
                    <li key={p.id}>
                      <ProductCard product={p} onOpen={(id) => setRoute({ name: 'product', id })} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        {route.name === 'product' && (
          <ProductDetail
            productId={route.id}
            onBack={goShop}
            onOpen={(id) => setRoute({ name: 'product', id })}
          />
        )}

        {route.name === 'checkout' && <CheckoutFlow onBackToShop={goShop} />}
      </main>

      <Footer onHome={goShop} />
      <CartDrawer onCheckout={() => setRoute({ name: 'checkout' })} onBrowse={goShop} />
    </div>
  );
}
