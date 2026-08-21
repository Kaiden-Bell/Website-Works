/*
 * Pricing — sourced from the client's guide (see /pricing-design.md).
 *
 * PARTIALLY CONFIRMED. What's real and in use here:
 *   - The $600 base price shared by Weddings, Corporate, and Personal events.
 *   - Every product and rental figure (balloon arch, money bouquet, diaper
 *     cake, and the three concession machines).
 *
 * What is NOT settled, and why PRICING_IS_PLACEHOLDER stays true:
 *   - The guide's add-on rows are mostly literal "TEMP" entries. Those are
 *     omitted entirely rather than invented.
 *   - Day-of coordination and extra balloons are marked "Varies" in the guide,
 *     so they carry `price: null` and contribute nothing to the total.
 *   - The client prices most work custom per event. Averages are coming from a
 *     review of their real past quotes; until then the total renders as
 *     "From $X", never as an exact figure.
 *
 * TODO(client): two things to resolve with the guide's author —
 *   1. The snow cone machine is listed at $125/DAY while the cotton candy and
 *      popcorn machines are $125/HOUR. That is a very large gap for three
 *      comparable items and reads like a typo. Encoded exactly as written.
 *   2. "Supplies up to 25 people" appears once, under the machines. Assumed to
 *      apply to all three; confirm whether it also caps anything else.
 */

export const PRICING_IS_PLACEHOLDER = true;

export interface PricingOption {
  name: string;
  /** Fixed price, or null when the client quotes it per event ("Varies"). */
  price: number | null;
  /** Billing unit shown after the figure, e.g. "per hour". */
  unit?: string;
  /** Short qualifier shown under the row. */
  note?: string;
}

export interface EventType {
  name: string;
  /** A floor, not a fixed fee — the client scopes most work per event. */
  basePrice: number;
  includes: string;
  options: PricingOption[];
}

export const CURRENCY = '$';

const MACHINES: PricingOption[] = [
  { name: 'Snow Cone Machine', price: 125, unit: 'per day', note: 'Supplies for up to 25 people' },
  { name: 'Cotton Candy Machine', price: 125, unit: 'per hour', note: 'Supplies for up to 25 people' },
  { name: 'Popcorn Machine', price: 125, unit: 'per hour', note: 'Supplies for up to 25 people' },
];

const BALLOON_ARCH: PricingOption = { name: 'Balloon Arch', price: 250 };

export const EVENT_TYPES: EventType[] = [
  {
    name: 'Wedding',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [
      { name: 'Day-Of Coordination', price: null },
      BALLOON_ARCH,
      { name: 'Money Bouquet or Lei', price: 100, note: 'Plus the cash placed in the bouquet' },
      ...MACHINES,
    ],
  },
  {
    name: 'Corporate Event',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [
      { name: 'Additional Balloons', price: null },
      BALLOON_ARCH,
      ...MACHINES,
    ],
  },
  {
    name: 'Personal Event',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [
      { name: 'Additional Balloons', price: null },
      BALLOON_ARCH,
      { name: 'Money Bouquet or Lei', price: 100, note: 'Plus the cash placed in the bouquet' },
      { name: 'Diaper Cake', price: 100 },
      ...MACHINES,
    ],
  },
  {
    name: 'Products & Rentals Only',
    basePrice: 0,
    includes: 'À la carte — no planning package required.',
    options: [
      BALLOON_ARCH,
      { name: 'Money Bouquet or Lei', price: 100, note: 'Plus the cash placed in the bouquet' },
      { name: 'Diaper Cake', price: 100 },
      ...MACHINES,
    ],
  },
];
