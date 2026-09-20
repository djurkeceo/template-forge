import { useEffect, useRef, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShoppingBasket, Trash2, X } from 'lucide-react';
import { FREE_SHIPPING_AT, formatUSD } from '../data/products';
import { selectCount, selectResolvedLines, selectSubtotal, useShop } from '../store/shop';
import { QuantityStepper } from './QuantityStepper';
import { TileArt } from './TileArt';

interface CartDrawerProps {
  onCheckout: () => void;
  onBrowse: () => void;
}

// Slide-in mini-cart: overlay + right panel, no page reload. Focus moves to
// the close button on open and returns naturally on close; Escape dismisses.
// A free-shipping progress bar nudges the subtotal upward — computed live.
export function CartDrawer({ onCheckout, onBrowse }: CartDrawerProps): ReactElement {
  const open = useShop((s) => s.drawerOpen);
  const setOpen = useShop((s) => s.setDrawerOpen);
  const lines = useShop(selectResolvedLines);
  const subtotal = useShop(selectSubtotal);
  const count = useShop(selectCount);
  const setQty = useShop((s) => s.setQty);
  const removeLine = useShop((s) => s.removeLine);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when the drawer opens (screen-reader context).
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open ]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  const panelMotion = reduce
    ? {}
    : {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { type: 'spring' as const, stiffness: 320, damping: 34 },
      };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-forest-deep/60"
            {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } })}
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={`Shopping cart, ${count} items`}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-mist shadow-2xl dark:bg-forest-deep"
            {...panelMotion}
          >
            <div className="flex items-center justify-between border-b border-stone px-5 py-4 dark:border-white/10">
              <h2 className="font-display text-lg font-bold text-forest dark:text-white">
                Your cart {count > 0 && <span className="text-sm font-semibold text-forest/50 dark:text-gray-400">({count})</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-pod border border-stone text-forest dark:border-white/15 dark:text-white"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {lines.length === 0 ? (
              // Empty-cart state — buyers check for this.
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-fern-tint text-fern-deep dark:bg-white/10 dark:text-sunbeam">
                  <ShoppingBasket size={28} aria-hidden="true" />
                </span>
                <p className="font-display text-xl font-bold text-forest dark:text-white">Nothing potted yet</p>
                <p className="text-sm leading-relaxed text-forest/60 dark:text-gray-400">
                  Your cart is empty. The pothos is $18, forgiving, and a great place to start.
                </p>
                <button
                  type="button"
                  onClick={() => { setOpen(false); onBrowse(); }}
                  className="mt-2 rounded-pod bg-forest px-6 py-3 text-sm font-bold text-white dark:bg-sunbeam dark:text-forest"
                >
                  Browse the nursery
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-stone px-5 py-3 dark:border-white/10">
                  {remaining > 0 ? (
                    <p className="text-[13px] font-semibold text-forest/70 dark:text-gray-300">
                      <strong className="text-forest dark:text-white">{formatUSD(remaining)}</strong> away from free shipping
                    </p>
                  ) : (
                    <p className="text-[13px] font-bold text-fern-deep dark:text-sunbeam">Free shipping unlocked</p>
                  )}
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone dark:bg-white/10" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free shipping">
                    {/* Dynamic width set inline: it changes with every cart edit. */}
                    <div className="h-full rounded-full bg-fern transition-all dark:bg-sunbeam" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <ul className="cart-scroll flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {lines.map((l) => (
                    <li key={`${l.productId}-${l.variantId}`} className="flex gap-3 rounded-pod border border-stone bg-white p-3 dark:border-white/10 dark:bg-white/5">
                      <TileArt tile={l.tile} icon={l.icon} label="" className="h-20 w-16 shrink-0 rounded-pod" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-forest dark:text-white">{l.name}</p>
                            <p className="text-xs text-forest/60 dark:text-gray-400">{l.variantLabel}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(l.productId, l.variantId)}
                            aria-label={`Remove ${l.name} from cart`}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-forest/50 hover:bg-red-50 hover:text-red-600 dark:text-gray-400"
                          >
                            <Trash2 size={15} aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <QuantityStepper small qty={l.qty} onChange={(q) => setQty(l.productId, l.variantId, q)} label={`Quantity of ${l.name}`} />
                          <p className="text-sm font-bold tabular-nums text-forest dark:text-white">{formatUSD(l.total)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-stone bg-white px-5 py-4 dark:border-white/10 dark:bg-forest-deep">
                  <dl className="flex items-center justify-between">
                    <dt className="text-sm font-semibold text-forest/60 dark:text-gray-400">Subtotal</dt>
                    <dd className="font-display text-xl font-bold tabular-nums text-forest dark:text-white" aria-live="polite">
                      {formatUSD(subtotal)}
                    </dd>
                  </dl>
                  <p className="mt-1 text-xs text-forest/50 dark:text-gray-500">Shipping + taxes calculated at checkout.</p>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); onCheckout(); }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-pod bg-forest px-6 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-sunbeam dark:text-forest"
                  >
                    Checkout
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
