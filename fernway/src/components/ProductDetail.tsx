import { useState, type ReactElement } from 'react';
import { ArrowLeft, Check, Droplets, Gauge, ShoppingBag, Sun } from 'lucide-react';
import { PRODUCTS, formatUSD, getProduct, unitPrice } from '../data/products';
import { useShop } from '../store/shop';
import { ProductCard } from './ProductCard';
import { QuantityStepper } from './QuantityStepper';
import { Stars } from './Stars';
import { TileArt } from './TileArt';
import { WishlistButton } from './WishlistButton';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onOpen: (id: string) => void;
}

// Full detail view: gallery, variant selector, quantity stepper, live price.
// Gallery "photos" are the same art-directed tile system at larger sizes —
// three framings (tile, alternate tile, care close-up) with thumbnails.
export function ProductDetail({ productId, onBack, onOpen }: ProductDetailProps): ReactElement {
  const product = getProduct(productId);
  const addLine = useShop((s) => s.addLine);

  const [variantId, setVariantId] = useState<string>(product?.variants[0]?.id ?? 'std');
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [added, setAdded] = useState(false);

  if (product === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <p className="font-display text-2xl font-bold">That plant wandered off.</p>
        <button type="button" onClick={onBack} className="mt-4 font-bold text-fern-deep underline underline-offset-4">
          Back to the shop
        </button>
      </div>
    );
  }

  const price = unitPrice(product, variantId);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const shots = [
    { tile: product.tile, icon: product.icon, label: `${product.name}, front view` },
    { tile: ((product.tile % 6) + 1) as typeof product.tile, icon: product.icon, label: `${product.name}, detail view` },
    { tile: (((product.tile + 2) % 6) + 1) as typeof product.tile, icon: 'droplets' as const, label: `${product.name}, care close-up` },
  ];
  const current = shots[shot] ?? shots[0]!;

  // Arrow const (not a hoisted function declaration) so `product` narrowing holds.
  const handleAdd = (): void => {
    addLine(product.id, variantId, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-fern-deep hover:underline hover:underline-offset-4 dark:text-sunbeam"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to the shop
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <TileArt tile={current.tile} icon={current.icon} label={current.label} className="aspect-[4/5] w-full rounded-shelf" />
          <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Product images">
            {shots.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setShot(i)}
                aria-pressed={shot === i}
                aria-label={`Show ${s.label}`}
                className={`overflow-hidden rounded-pod border-2 transition-all ${
                  shot === i ? 'border-forest dark:border-sunbeam' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <TileArt tile={s.tile} icon={s.icon} label="" className="aspect-square w-full" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-fern-deep dark:text-sunbeam">{product.category}</p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="font-display text-3xl font-bold text-forest sm:text-4xl dark:text-white">{product.name}</h1>
            <WishlistButton productId={product.id} productName={product.name} />
          </div>
          <p className="mt-1 text-[15px] font-medium text-forest/60 dark:text-gray-300">{product.line}</p>
          <div className="mt-3">
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>
          <p className="mt-4 leading-relaxed text-forest/80 dark:text-gray-300">{product.blurb}</p>

          <p className="mt-5 flex items-baseline gap-2" aria-live="polite">
            <span className="font-display text-3xl font-bold text-forest dark:text-white">{formatUSD(price)}</span>
            {product.compareAt !== undefined && <s className="text-lg text-bark/50">{formatUSD(product.compareAt)}</s>}
          </p>

          {product.variants.length > 1 && (
            <fieldset className="mt-6">
              <legend className="text-sm font-bold text-forest dark:text-white">Size</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const active = v.id === variantId;
                  return (
                    <label
                      key={v.id}
                      className={`cursor-pointer rounded-pod border-2 px-4 py-2 text-sm font-bold transition-colors ${
                        active
                          ? 'border-forest bg-forest text-white dark:border-sunbeam dark:bg-sunbeam dark:text-forest'
                          : 'border-stone bg-white text-forest hover:border-fern dark:border-white/15 dark:bg-transparent dark:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`variant-${product.id}`}
                        value={v.id}
                        checked={active}
                        onChange={() => setVariantId(v.id)}
                        className="sr-only"
                      />
                      {v.label}
                      {v.priceDelta > 0 && <span className="ml-1.5 font-semibold opacity-70">+{formatUSD(v.priceDelta)}</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <QuantityStepper qty={qty} onChange={setQty} label={`Quantity of ${product.name}`} />
            <button
              type="button"
              onClick={handleAdd}
              aria-live="polite"
              className={`flex flex-1 items-center justify-center gap-2 rounded-pod px-6 py-3.5 font-bold transition-all active:scale-[0.98] ${
                added ? 'bg-fern text-white' : 'bg-forest text-white hover:bg-fern-deep dark:bg-sunbeam dark:text-forest'
              }`}
            >
              {added ? <Check size={18} aria-hidden="true" /> : <ShoppingBag size={18} aria-hidden="true" />}
              {added ? 'Added to cart' : `Add to cart · ${formatUSD(price * qty)}`}
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Sun, k: 'Light', v: product.care.light },
              { icon: Droplets, k: 'Water', v: product.care.water },
              { icon: Gauge, k: 'Level', v: product.care.level },
            ].map((c) => (
              <li key={c.k} className="rounded-pod border border-stone bg-white px-3 py-2.5 text-center dark:border-white/10 dark:bg-forest-deep">
                <c.icon size={17} className="mx-auto text-fern-deep dark:text-sunbeam" aria-hidden="true" />
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-forest/50 dark:text-gray-400">{c.k}</p>
                <p className="text-[13px] font-bold text-forest dark:text-white">{c.v}</p>
              </li>
            ))}
          </ul>

          <h2 className="font-display mt-7 text-lg font-bold text-forest dark:text-white">What arrives in the box</h2>
          <ul className="mt-2 space-y-1.5">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[15px] text-forest/80 dark:text-gray-300">
                <Check size={16} className="mt-1 shrink-0 text-fern-deep dark:text-sunbeam" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-16">
          <h2 id="related-title" className="font-display text-2xl font-bold text-forest dark:text-white">
            Pairs well with
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
