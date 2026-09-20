import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProduct, unitPrice, type TileIcon, type TileId } from '../data/products';

// ————————————————————————————————————————————————————————————————
// Cart-state approach: one tiny Zustand store, persisted to localStorage.
//
// - `lines` holds cart rows keyed by product+variant (so a 4in and 6in pot
//   of the same plant are separate lines, like a real cart).
// - `wishlist` holds product ids. Both survive reloads via `persist`.
// - Money is DERIVED (subtotal/count selectors), never stored, so prices
//   can't drift from the catalog. All components read the same selectors.
// No backend, no context providers — `useShop()` works anywhere.
// ————————————————————————————————————————————————————————————————

export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  name: string;
  variantLabel: string;
  unit: number;
  total: number;
  tile: TileId;
  icon: TileIcon;
}

interface ShopState {
  lines: CartLine[];
  wishlist: string[];
  drawerOpen: boolean;
  lastAddedAt: number;
  addLine: (productId: string, variantId: string, qty: number) => void;
  removeLine: (productId: string, variantId: string) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setDrawerOpen: (open: boolean) => void;
}

function sameLine(a: CartLine, b: CartLine): boolean {
  return a.productId === b.productId && a.variantId === b.variantId;
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      lines: [],
      wishlist: [],
      drawerOpen: false,
      lastAddedAt: 0,

      addLine: (productId, variantId, qty) =>
        set((s) => {
          const cleanQty = Math.min(99, Math.max(1, Math.floor(qty)));
          const existing = s.lines.find((l) => sameLine(l, { productId, variantId, qty: 0 }));
          const lines =
            existing === undefined
              ? [...s.lines, { productId, variantId, qty: cleanQty }]
              : s.lines.map((l) =>
                  sameLine(l, { productId, variantId, qty: 0 })
                    ? { ...l, qty: Math.min(99, l.qty + cleanQty) }
                    : l,
                );
          // Bump the timestamp so the cart badge + toast replay their pop.
          return { lines, drawerOpen: true, lastAddedAt: Date.now() };
        }),

      removeLine: (productId, variantId) =>
        set((s) => ({ lines: s.lines.filter((l) => !sameLine(l, { productId, variantId, qty: 0 })) })),

      setQty: (productId, variantId, qty) =>
        set((s) => ({
          // Qty 0 removes the line — one control, no separate delete needed.
          lines:
            qty <= 0
              ? s.lines.filter((l) => !sameLine(l, { productId, variantId, qty: 0 }))
              : s.lines.map((l) =>
                  sameLine(l, { productId, variantId, qty: 0 })
                    ? { ...l, qty: Math.min(99, Math.max(1, Math.floor(qty))) }
                    : l,
                ),
        })),

      clearCart: () => set({ lines: [] }),

      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),

      setDrawerOpen: (open) => set({ drawerOpen: open }),
    }),
    {
      name: 'fernway-shop',
      // Persist only shopper data — UI flags like drawerOpen stay session-only.
      partialize: (s) => ({ lines: s.lines, wishlist: s.wishlist }),
    },
  ),
);

/** Catalog-joined lines; drops rows whose product vanished (safe CMS swaps).
 *  IMPORTANT: this builds a fresh array on every call, so subscribers MUST
 *  read it via `useShallow` (see CartDrawer) — a bare subscription hands
 *  React a new snapshot each render and loops forever into a blank page. */
export function selectResolvedLines(s: ShopState): ResolvedLine[] {
  const out: ResolvedLine[] = [];
  for (const l of s.lines) {
    const p = getProduct(l.productId);
    if (p === undefined) continue;
    const variant = p.variants.find((v) => v.id === l.variantId);
    const unit = unitPrice(p, l.variantId);
    out.push({
      ...l,
      name: p.name,
      variantLabel: variant?.label ?? '',
      unit,
      total: unit * l.qty,
      tile: p.tile,
      icon: p.icon,
    });
  }
  return out;
}

export function selectSubtotal(s: ShopState): number {
  return selectResolvedLines(s).reduce((sum, l) => sum + l.total, 0);
}

export function selectCount(s: ShopState): number {
  return s.lines.reduce((sum, l) => sum + l.qty, 0);
}
