// ————————————————————————————————————————————————————————————————
// Simmer content model: four feature chapters, each with a matching phone
// screen. Buyers swap copy here and screens in src/screens/ — the sticky
// scroll-sync, carousel and dots all read from this one list.
// All names, dishes and copy are invented originals.
// ————————————————————————————————————————————————————————————————

export interface Feature {
  id: 'matches' | 'cook' | 'plan' | 'shop';
  step: string;
  title: string;
  body: string;
  bullets: string[];
}

export const FEATURES: Feature[] = [
  {
    id: 'matches',
    step: 'Step one',
    title: 'Tell Simmer what’s in the fridge',
    body: 'Tap what you have — half an onion, tired spinach, that parmesan heel. Simmer ranks tonight’s dinners by what you can already cook.',
    bullets: ['92% average pantry match', 'Expiry-first sorting', 'No barcode scanning marathons'],
  },
  {
    id: 'cook',
    step: 'Step two',
    title: 'Cook along without touching the phone',
    body: 'Big-type steps, a thumb-sized timer, and voice-advance when your hands are covered in flour. Dinner in 25 minutes, one screen.',
    bullets: ['Hands-free step advance', 'Built-in multi-timer', 'Works with the screen locked'],
  },
  {
    id: 'plan',
    step: 'Step three',
    title: 'The week plans itself around you',
    body: 'Pick three dinners and Simmer lays out the week, reusing leftovers on purpose — Monday’s roast becomes Wednesday’s tacos.',
    bullets: ['Leftover-aware sequencing', 'Drag-to-swap evenings', 'Two taps to re-plan'],
  },
  {
    id: 'shop',
    step: 'Step four',
    title: 'One short list, nothing wasted',
    body: 'The plan collapses into a single grouped grocery list. Check things off in-store; the list survives a dead signal in aisle nine.',
    bullets: ['Auto-grouped by aisle', 'Works fully offline', 'Shareable with one link'],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'Is Simmer really free?',
    a: 'Yes — matching, cooking mode and the weekly plan are free forever. A $4/month simmer+ tier adds household sync and unlimited saved weeks. No ads, ever; your grocery data is never sold.',
  },
  {
    q: 'Do I have to photograph my fridge?',
    a: 'No. Most cooks just tap ingredients from a visual pantry grid — about 40 seconds the first time, then Simmer remembers your staples. Photo scan exists, but it is optional, not the product.',
  },
  {
    q: 'What about allergies and diets?',
    a: 'Set them once — vegetarian, gluten-free, nut allergy, halal — and every match, plan and list respects them automatically. Household profiles can differ per person.',
  },
  {
    q: 'Does it work offline?',
    a: 'Cook mode and grocery lists are fully offline. Matching needs a connection the first time it sees a new ingredient, then caches it.',
  },
  {
    q: 'Which phones are supported?',
    a: 'iPhone 12 and newer, and Android 10 and newer. The watch timer companion needs watchOS 9 or Wear OS 4.',
  },
];
