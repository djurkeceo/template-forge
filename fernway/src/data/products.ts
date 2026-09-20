// ————————————————————————————————————————————————————————————————
// Mock catalog for the Fernway template.
//
// REPLACE WITH YOUR REAL PRODUCT API/CMS HERE: keep the `Product` shape
// (or adapt the components) and swap `PRODUCTS` for a fetch call. Every
// price, filter and cart calculation reads from this model, so there is
// exactly one place to rewire.
//
// All names, plants and copy are invented generics. Product artwork is
// gradient tiles + lucide icons (see `tile` + tailwind.config.js), so the
// template ships zero photo licenses to worry about.
// ————————————————————————————————————————————————————————————————

export type Category = 'plants' | 'planters' | 'care';

export interface CategoryMeta {
  id: Category;
  label: string;
  blurb: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'plants', label: 'Plants', blurb: 'Nursery-grown, shipped in moss' },
  { id: 'planters', label: 'Planters', blurb: 'Clay, stone and recycled shells' },
  { id: 'care', label: 'Care', blurb: 'Feeds, mists and honest tools' },
];

/** Tile artwork id (bg-tile-1 … bg-tile-6) + icon drawn on top. */
export type TileId = 1 | 2 | 3 | 4 | 5 | 6;
export type TileIcon = 'leaf' | 'sprout' | 'flower' | 'amphora' | 'droplets' | 'sun';

/** A selectable option such as pot size. `priceDelta` adds to base price. */
export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  name: string;
  /** Invented cultivar line — flavor copy, not a real species claim. */
  line: string;
  blurb: string;
  details: string[];
  category: Category;
  /** Base price in USD (variant deltas add on top). */
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  /** 0–100 buyer-interest score driving the "Most loved" sort. */
  popularity: number;
  /** ISO date driving the "Newest" sort. */
  addedAt: string;
  tile: TileId;
  icon: TileIcon;
  badge?: 'Bestseller' | 'New' | 'Sale' | 'Low stock';
  variants: ProductVariant[];
  care: { light: string; water: string; level: string };
}

const POT_SIZES: ProductVariant[] = [
  { id: 's4', label: '4 in nursery pot', priceDelta: 0 },
  { id: 's6', label: '6 in nursery pot', priceDelta: 14 },
  { id: 's10', label: '10 in floor pot', priceDelta: 38 },
];

const PLANTER_SIZES: ProductVariant[] = [
  { id: 's4', label: 'Fits 4 in pot', priceDelta: 0 },
  { id: 's6', label: 'Fits 6 in pot', priceDelta: 12 },
];

const SINGLE: ProductVariant[] = [{ id: 'std', label: 'Standard', priceDelta: 0 }];

export const PRODUCTS: Product[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    line: 'Big-split leaves, nursery-raised from cuttings',
    blurb: 'The split-leaf classic, raised slow so it arrives bushy — not leggy. Ships staked in damp moss.',
    details: ['45–60 cm tall on arrival', 'Nursery pot with drainage included', 'Pet-aware placement guide in the box'],
    category: 'plants',
    price: 48,
    rating: 4.8,
    reviews: 412,
    popularity: 98,
    addedAt: '2026-02-14',
    tile: 1,
    icon: 'leaf',
    badge: 'Bestseller',
    variants: POT_SIZES,
    care: { light: 'Bright, indirect', water: 'Weekly', level: 'Easy' },
  },
  {
    id: 'fiddle-fig',
    name: 'Fiddle-Leaf Fig',
    line: 'Statement tree with violin leaves',
    blurb: 'For the bright corner that needs a main character. Acclimated to indoor light before it ships.',
    details: ['70–90 cm tall, single stem', 'Rotating care calendar included', 'Prefers one spot — no shuffling'],
    category: 'plants',
    price: 86,
    compareAt: 104,
    rating: 4.6,
    reviews: 188,
    popularity: 84,
    addedAt: '2025-11-02',
    tile: 2,
    icon: 'leaf',
    badge: 'Sale',
    variants: POT_SIZES,
    care: { light: 'Bright, direct morning', water: 'Every 10 days', level: 'Intermediate' },
  },
  {
    id: 'golden-pothos',
    name: 'Golden Pothos',
    line: 'Trailing, forgiving, nearly unkillable',
    blurb: 'The starter plant that survives holidays, dark flats and forgetful waterers. Trails fast on a shelf.',
    details: ['30–40 cm trails on arrival', 'Roots in water if you snip it', 'Tolerates low light'],
    category: 'plants',
    price: 18,
    rating: 4.9,
    reviews: 631,
    popularity: 95,
    addedAt: '2025-08-19',
    tile: 5,
    icon: 'sprout',
    badge: 'Bestseller',
    variants: POT_SIZES,
    care: { light: 'Low to bright indirect', water: 'Every 2 weeks', level: 'Easy' },
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    line: 'Silver-striped prayer plant',
    blurb: 'A showpiece that folds its leaves at night. Loves humidity and filtered water — worth the ritual.',
    details: ['35–45 cm wingspan', 'Humidity tray included', 'Keep away from crisp drafts'],
    category: 'plants',
    price: 54,
    rating: 4.5,
    reviews: 143,
    popularity: 72,
    addedAt: '2026-06-01',
    tile: 4,
    icon: 'flower',
    badge: 'New',
    variants: POT_SIZES,
    care: { light: 'Medium indirect', water: 'Weekly, filtered', level: 'Fussy but loved' },
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant Laurentii',
    line: 'Upright swords with yellow edges',
    blurb: 'Water it monthly, ignore it otherwise. Survives the office, the basement and the gift exchange.',
    details: ['40–55 cm tall', 'Tolerates drought and low light', 'Slow grower, long liver'],
    category: 'plants',
    price: 32,
    rating: 4.7,
    reviews: 389,
    popularity: 88,
    addedAt: '2025-05-27',
    tile: 4,
    icon: 'sprout',
    variants: POT_SIZES,
    care: { light: 'Anything but dark', water: 'Monthly', level: 'Easy' },
  },
  {
    id: 'olive-tree',
    name: 'Indoor Olive Tree',
    line: 'Silvery Mediterranean canopy',
    blurb: 'A small tree for the sunniest window you own. Drops a leaf when moved — then settles for years.',
    details: ['80–100 cm, pruned canopy', 'Needs 6 hours of sun', 'Terracotta-ready root ball'],
    category: 'plants',
    price: 98,
    rating: 4.4,
    reviews: 97,
    popularity: 64,
    addedAt: '2026-07-20',
    tile: 6,
    icon: 'sun',
    badge: 'Low stock',
    variants: POT_SIZES,
    care: { light: 'Full sun', water: 'Weekly, deep', level: 'Intermediate' },
  },
  {
    id: 'ridge-planter',
    name: 'Ridge Clay Planter',
    line: 'Hand-pressed stoneware with saucer',
    blurb: 'Weighty, matte and slightly irregular — the pot that makes a $18 plant look like $80.',
    details: ['Drainage hole + matching saucer', 'Frost-safe for porches', 'Each piece varies slightly'],
    category: 'planters',
    price: 42,
    rating: 4.8,
    reviews: 256,
    popularity: 90,
    addedAt: '2025-10-11',
    tile: 3,
    icon: 'amphora',
    badge: 'Bestseller',
    variants: PLANTER_SIZES,
    care: { light: '—', water: '—', level: 'Dishwasher-safe saucer' },
  },
  {
    id: 'dune-planter',
    name: 'Dune Sand Planter',
    line: 'Soft-grain finish, tapered foot',
    blurb: 'A pale, sandy shell that disappears so the plant gets the attention. Light enough to hang.',
    details: ['Recycled composite shell', 'Hidden hanger notch', 'Wipes clean with damp cloth'],
    category: 'planters',
    price: 28,
    rating: 4.6,
    reviews: 174,
    popularity: 76,
    addedAt: '2026-01-08',
    tile: 5,
    icon: 'amphora',
    variants: PLANTER_SIZES,
    care: { light: '—', water: '—', level: 'Indoor / sheltered' },
  },
  {
    id: 'basalt-planter',
    name: 'Basalt Cube Planter',
    line: 'Charcoal stone cube, sealed',
    blurb: 'Modern anchor for shelves and desks. Sealed stone, felt feet, zero wobble.',
    details: ['Sealed against water rings', 'Felt base pads included', 'Suits 4–6 in nursery pots'],
    category: 'planters',
    price: 56,
    compareAt: 68,
    rating: 4.7,
    reviews: 121,
    popularity: 69,
    addedAt: '2025-09-30',
    tile: 6,
    icon: 'amphora',
    badge: 'Sale',
    variants: PLANTER_SIZES,
    care: { light: '—', water: '—', level: 'Wipe clean' },
  },
  {
    id: 'mist-spray',
    name: 'Fern Mist Spray',
    line: 'Continuous fine mist, 300 ml',
    blurb: 'Calatheas and ferns notice the difference in a week. Continuous spray, no pumping mid-mist.',
    details: ['300 ml glass bottle', 'Refillable, zero propellant', 'Also great for seedlings'],
    category: 'care',
    price: 16,
    rating: 4.5,
    reviews: 203,
    popularity: 81,
    addedAt: '2025-07-15',
    tile: 2,
    icon: 'droplets',
    variants: SINGLE,
    care: { light: '—', water: '—', level: '—' },
  },
  {
    id: 'green-feed',
    name: 'Green Feed Concentrate',
    line: 'Gentle liquid feed, makes 24 jugs',
    blurb: 'One cap per watering can, spring through autumn. Won’t burn roots when you follow the cap.',
    details: ['250 ml concentrate', 'Balanced 4-4-4 + seaweed', 'Dosing cap included'],
    category: 'care',
    price: 22,
    rating: 4.7,
    reviews: 317,
    popularity: 86,
    addedAt: '2025-06-03',
    tile: 1,
    icon: 'droplets',
    badge: 'Bestseller',
    variants: SINGLE,
    care: { light: '—', water: '—', level: '—' },
  },
  {
    id: 'pruner-snips',
    name: 'Precision Pruning Snips',
    line: 'Spring-loaded, sap-groove blades',
    blurb: 'Clean cuts that heal fast. Locks shut, wipes clean, survives the junk drawer.',
    details: ['Carbon-steel blades', 'Safety lock + wipe cloth', 'Spare spring in the box'],
    category: 'care',
    price: 26,
    rating: 4.8,
    reviews: 149,
    popularity: 74,
    addedAt: '2026-04-12',
    tile: 3,
    icon: 'sun',
    badge: 'New',
    variants: SINGLE,
    care: { light: '—', water: '—', level: '—' },
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Unit price including the chosen variant delta. */
export function unitPrice(product: Product, variantId: string): number {
  const variant = product.variants.find((v) => v.id === variantId);
  return product.price + (variant?.priceDelta ?? 0);
}

export function formatUSD(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: n % 1 === 0 ? 0 : 2 });
}

// Commerce rules in one place so buyers tune them once.
export const FREE_SHIPPING_AT = 75;
export const FLAT_SHIPPING = 6.95;
