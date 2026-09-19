// All placeholder content lives here — invented studios, people and copy.
// Nothing references a real brand; gradients and CSS shapes stand in for photos.

export interface StudioProof {
  name: string;
  kind: string;
  stat: string;
}

export const PROOF_STUDIOS: StudioProof[] = [
  { name: 'Fern & Form Pilates', kind: 'Pilates · 2 rooms', stat: 'No-shows down 41%' },
  { name: 'Half Mile Swim Lab', kind: 'Swim school · 340 pupils', stat: 'Rebookings up 2.1×' },
  { name: 'Copperline Climb', kind: 'Bouldering · day passes', stat: 'Front-desk hours cut 12/wk' },
  { name: 'Juniper Music Rooms', kind: 'Tutoring · 14 teachers', stat: 'Late payments down 68%' },
  { name: 'Alder Physio Co.', kind: 'Physio · 3 clinicians', stat: 'Waitlist fills in 9 min' },
  { name: 'Moss & Bell Salon', kind: 'Salon · 6 chairs', stat: 'Memberships up 33%' },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tint: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We stopped running the studio from a group chat. Parents book, pay and reschedule themselves, and the Saturday queue finally behaves.',
    name: 'Maya R.',
    role: 'Owner, swim school of 340 pupils',
    initials: 'MR',
    tint: 'bg-verdant text-white',
  },
  {
    quote:
      'The waitlist is the quiet hero. A cancellation at 7am is rebooked by 7:09 without anyone touching the phone.',
    name: 'Devon K.',
    role: 'Manager, bouldering gym',
    initials: 'DK',
    tint: 'bg-marigold text-ink',
  },
  {
    quote:
      'Memberships plus drop-ins used to mean two systems and a spreadsheet. Now payouts land every Friday and match to the penny.',
    name: 'Priya S.',
    role: 'Founder, pilates studio',
    initials: 'PS',
    tint: 'bg-ink text-white',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'How long does it take to move our timetable over?',
    a: 'Most studios import classes, staff and members from a spreadsheet in one afternoon. The guided importer flags clashes before anything goes live, and you can run Cadence alongside paper lists until the first full week completes.',
  },
  {
    q: 'What happens when a class is full?',
    a: 'The waitlist takes over automatically: members join in one tap, get notified in order when a seat opens, and the seat releases to the next person if they pass. You set how long each offer lasts, from 5 minutes to 24 hours.',
  },
  {
    q: 'Do you handle no-shows and late cancellations?',
    a: 'Yes. Each membership tier gets its own cancellation window and fee, collected from the card on file. Studios using it typically see no-shows fall by a third in the first month.',
  },
  {
    q: 'Can members from one location visit another?',
    a: 'On Studio and Collective plans, yes. Home-location priority, cross-location credits and staff rotas are all configurable, so a climbing member can drop into the sister gym without creating a second account.',
  },
  {
    q: 'How do payouts work?',
    a: 'Card payments settle to your bank on a rolling 2-day schedule, with memberships, drop-ins and retail separated on one statement. Refunds and partial credits post back to the original card in one click.',
  },
];
