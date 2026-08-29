/*
 * Pricing — sourced from the client's guide (see /pricing-design.md), then
 * corrected against the client directly.
 *
 * CONFIRMED, and in use here:
 *   - The $600 base shared by Corporate and Personal events.
 *   - Weddings start at $1,500, confirmed 2026-08-28. This replaced a $600
 *     base plus a $1,500 "Day-Of Coordination" add-on. The client does not
 *     take weddings without also running the day, so day-of coordination is
 *     not an add-on at all — it is the floor. Listing it as optional both
 *     understated the real starting price and offered a tier that isn't
 *     actually available. What the eight hours on site cover is spelled out in
 *     the Weddings FAQ, not repeated here.
 *   - All three concession machines at $125 PER DAY, each covering supplies
 *     for up to 25 people. (The guide's "$125/hour" rows on the cotton candy
 *     and popcorn machines were a typo.)
 *   - Extra machine supplies at $5 per additional guest, confirmed 2026-08-28.
 *     This replaced "$60 for an additional 40 people" — a block price that
 *     left the open question of whether you could buy two blocks. A per-head
 *     rate has no such edge, so that TODO is now closed.
 *   - An on-site attendant at $10 per hour, confirmed 2026-08-28. This is a
 *     real correction, not an addition: the FAQ previously told visitors
 *     staffing was included in the rental price. It is not. Machines go out
 *     self-serve and an attendant is requested on top.
 *   - Money bouquets and leis from $50 plus the cash placed inside, confirmed
 *     2026-08-28 (was $100).
 *
 * NOT settled, and why PRICING_IS_PLACEHOLDER stays true:
 *   - The $250 balloon arch and the $100 diaper cake still trace to the guide
 *     rather than to the client. They are the last two figures on this page
 *     nobody has confirmed out loud. Confirm them and this flag can go false.
 *   - The guide's other add-on rows are literal "TEMP" entries, so they are
 *     omitted rather than invented.
 *   - Extra balloons are still "Varies" in the guide, so that row carries
 *     `price: null` and contributes nothing to the total.
 *   - The client prices most work custom per event, so the total renders as
 *     "From $X" and never as an exact figure.
 */

export const PRICING_IS_PLACEHOLDER = true;

export interface PricingOption {
  name: string;
  /** Fixed price, or null when the client quotes it per event ("Varies"). */
  price: number | null;
  /** Billing unit shown after the figure, e.g. "per day". */
  unit?: string;
  /**
   * True when `price` is a rate against a quantity the visitor hasn't given us
   * — a head count, a number of hours. The row is shown at its real rate but
   * contributes nothing to the total, because adding $5 to an estimate for a
   * charge that is $5 *per guest* would be worse than showing nothing at all.
   * A machine's "per day" price is NOT a rate in this sense: one day is the
   * sensible default, so it is counted.
   */
  rate?: boolean;
  /** Short qualifier shown under the row. */
  note?: string;
  /*
   * Names of other options in the same event type that must be selected before
   * this one is offered. Extra supplies and an attendant are meaningless
   * without a machine, so those rows stay hidden — and un-select themselves —
   * until one is on the estimate. Empty or absent means the option always
   * shows.
   */
  requires?: string[];
}

export interface EventType {
  name: string;
  /** A floor, not a fixed fee — the client scopes most work per event. */
  basePrice: number;
  includes: string;
  options: PricingOption[];
}

export const CURRENCY = '$';

const SNOW_CONE = 'Snow Cone Machine';
const COTTON_CANDY = 'Cotton Candy Machine';
const POPCORN = 'Popcorn Machine';

const MACHINE_NAMES = [SNOW_CONE, COTTON_CANDY, POPCORN];

const MACHINES: PricingOption[] = [
  ...MACHINE_NAMES.map((name) => ({
    name,
    price: 125,
    unit: 'per day',
    note: 'Supplies for up to 25 people',
  })),
  {
    name: 'Extra Machine Supplies',
    price: 5,
    unit: 'per additional guest',
    rate: true,
    note: 'Beyond the 25 people a machine already covers',
    requires: MACHINE_NAMES,
  },
  {
    name: 'On-Site Attendant',
    price: 10,
    unit: 'per hour',
    rate: true,
    note: 'Machines are self-serve unless an attendant is requested',
    requires: MACHINE_NAMES,
  },
];

const BALLOON_ARCH: PricingOption = { name: 'Balloon Arch', price: 250 };

const MONEY_BOUQUET: PricingOption = {
  name: 'Money Bouquet or Lei',
  price: 50,
  note: 'Plus the cash placed in the bouquet',
};

const DIAPER_CAKE: PricingOption = { name: 'Diaper Cake', price: 100 };

export const EVENT_TYPES: EventType[] = [
  {
    name: 'Wedding',
    basePrice: 1500,
    includes:
      'Day-of coordination on site, plus delivery, setup, and teardown. Scoped per event.',
    options: [BALLOON_ARCH, MONEY_BOUQUET, ...MACHINES],
  },
  {
    name: 'Corporate Event',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [{ name: 'Additional Balloons', price: null }, BALLOON_ARCH, ...MACHINES],
  },
  {
    name: 'Personal Event',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [
      { name: 'Additional Balloons', price: null },
      BALLOON_ARCH,
      MONEY_BOUQUET,
      DIAPER_CAKE,
      ...MACHINES,
    ],
  },
  {
    name: 'Products & Rentals Only',
    basePrice: 0,
    includes: 'À la carte — no planning package required.',
    options: [BALLOON_ARCH, MONEY_BOUQUET, DIAPER_CAKE, ...MACHINES],
  },
];
