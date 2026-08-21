/*
 * Portfolio, modelled as EVENTS rather than loose photographs.
 *
 * The grid renders one cover per event, so the page ships ~15 images instead
 * of the whole archive; an event's remaining photos only enter the DOM when
 * its lightbox opens. That's what keeps the page light as the archive grows —
 * add photos to `photos[]` freely, the grid cost stays flat.
 *
 * TODO(client) — two things only the client can supply:
 *
 *   1. DATES. `date` is deliberately optional and currently unset everywhere.
 *      Nothing here is dated because no date is known, and inventing one on a
 *      portfolio piece is exactly the kind of claim PRODUCT.md rules out. Fill
 *      `date` in and the lightbox renders it automatically.
 *
 *   2. GROUPINGS. Events were grouped by visual evidence — matching venues,
 *      palettes, linen, and props across photos — not from client records.
 *      Worth a sanity check. Several entries hold a single photo simply
 *      because that's all we have; they'll fill out as more arrive.
 *
 * EXCLUDED, and must stay excluded (PRODUCT.md):
 *   - table-4x3-01.jpg — a celebration-of-life table bearing a deceased
 *     person's photograph.
 *   - table-16x9-01.jpg — shows a real couple's full names and wedding date.
 *
 * REVIEW BEFORE LAUNCH: grand-opening-orange-arch.jpg has a guest visible in
 * frame holding a balloon. They're small and turned away, but it's the only
 * served photo with an identifiable person who isn't staff — worth confirming
 * the client has their okay.
 */

export type PortfolioCategory = 'Weddings' | 'Corporate' | 'Celebrations' | 'Rentals & Products';

export interface PortfolioPhoto {
  src: string;
  alt: string;
}

export interface PortfolioEvent {
  slug: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  /** Human-readable, e.g. "June 2025". Omitted until the client confirms. */
  date?: string;
  /** Facet variant for the grid tile. */
  shape: number;
  cover: PortfolioPhoto;
  /** Shown in the lightbox, after the cover. Loaded only when opened. */
  photos: PortfolioPhoto[];
}

const P = '/photos';

export const PORTFOLIO_EVENTS: PortfolioEvent[] = [
  {
    slug: 'blue-wood-wedding',
    title: 'Blue & Wood Reception',
    description:
      'Navy and dusty-blue florals run the length of raw wood farm tables, with floating candles, gold-rimmed glassware, and a matching dessert and favor spread. One palette carried from the sweetheart table through to the guest takeaways.',
    category: 'Weddings',
    shape: 4,
    cover: {
      src: `${P}/services/event-design-bridal-table.jpg`,
      alt: 'A long wooden bridal table dressed with a navy and blue floral garland runner, candles, and gold-rimmed place settings',
    },
    photos: [
      { src: `${P}/about/sweetheart-table-detail.jpg`, alt: 'A sweetheart table with floating candles, blue and white florals, and a wooden Mr. and Mrs. sign' },
      { src: `${P}/portfolio/blue-wedding-dessert-table.jpg`, alt: 'A tiered white wedding cake on a dessert table with navy ribbon, greenery garland, and trays of fruit and pastries' },
      { src: `${P}/portfolio/blue-wedding-favor-table.jpg`, alt: 'A favor table lined with navy and burlap gift bags, candles, and a framed sign' },
    ],
  },
  {
    slug: 'rustic-stone-wedding',
    title: 'Rustic Stone Venue',
    description:
      'Wood-slice centerpieces, sage linen, and rattan chargers against an interior stone wall. Wildflowers in clear bottles keep each table low and open so guests can see across them.',
    category: 'Weddings',
    shape: 7,
    cover: {
      src: `${P}/portfolio/mr-and-mrs-tablescape.jpg`,
      alt: 'A rustic wedding place setting with a wood charger, sage tablecloth, and a gold Mr. and Mrs. sign against a stone wall',
    },
    photos: [
      { src: `${P}/about/wildflower-centerpiece.jpg`, alt: 'Wildflowers in glass bottles on a wood-slice centerpiece, table number three' },
    ],
  },
  {
    slug: 'ceremony-arches',
    title: 'Ceremony Arches & Garlands',
    description:
      'Ceremony installations from several weddings — an organic garland climbing a timber cross in sage, gold, and blush; the same cross reworked in purple and lavender wisteria; and a freestanding hoop arch with sheer draping and oversized paper poppies set among the pines.',
    category: 'Weddings',
    shape: 5,
    cover: {
      src: `${P}/hero/church-garland-arch.jpg`,
      alt: 'A sage-green, gold, and white organic balloon garland arcing over a wooden cross at a stone-walled venue',
    },
    photos: [
      { src: `${P}/services/balloons-purple-wisteria.jpg`, alt: 'A purple and lavender organic balloon garland with wisteria accents arcing over a wooden cross at a stone-walled venue' },
      { src: `${P}/services/officiating-ceremony-arch.jpg`, alt: 'A wooden circular ceremony arch with sheer draping and oversized poppy flowers, set against a stone building and pine forest' },
    ],
  },
  {
    slug: 'anthem-brand-launch',
    title: 'Anthem Brand Launch',
    description:
      'A blue, white, and silver arch framing a branded backdrop, with star bursts breaking the line and gift bags staged for arriving guests.',
    category: 'Corporate',
    shape: 11,
    cover: {
      src: `${P}/portfolio/extended-corporate-anthem-arch.jpg`,
      alt: 'A blue and white balloon arch with silver stars at a corporate brand-launch event, with branded gift bags on tables',
    },
    photos: [],
  },
  {
    slug: 'winter-boutique-launch',
    title: 'Winter Boutique Launch',
    description:
      'Navy, ice blue, and chrome balloons built into an entry arch, with oversized snowflakes and star bursts set into the garland and a sequined runner underneath.',
    category: 'Corporate',
    shape: 8,
    cover: {
      src: `${P}/portfolio/winter-snowflake-arch.jpg`,
      alt: 'A blue and silver balloon arch with star and snowflake accents inside a boutique interior',
    },
    photos: [],
  },
  {
    slug: 'seasonal-retail',
    title: 'Seasonal Retail Installations',
    description:
      'Recurring seasonal work against the same branded step-and-repeat: an evergreen and red Christmas arch, a candy-cane and snowman variant, and a Halloween build in orange, purple, and black with ghosts worked into the garland.',
    category: 'Corporate',
    shape: 10,
    cover: {
      src: `${P}/portfolio/retail-christmas-arch.jpg`,
      alt: 'A green, red, and white Christmas balloon arch with stars framing a branded step-and-repeat backdrop in a shopping mall',
    },
    photos: [
      { src: `${P}/portfolio/retail-candycane-arch.jpg`, alt: 'A red and white candy-cane balloon garland with peppermint accents and a snowman beside a branded backdrop' },
      { src: `${P}/portfolio/retail-halloween-arch.jpg`, alt: 'An orange, purple, and black Halloween balloon arch with ghost and pumpkin accents framing a branded backdrop' },
    ],
  },
  {
    slug: 'ballroom-gala',
    title: 'Ballroom Gala',
    description:
      'Black, gold, and purple across a full ballroom — balloon centerpieces on every table, linen napkins tied at each cover, and a room set for a seated dinner.',
    category: 'Corporate',
    shape: 9,
    cover: {
      src: `${P}/portfolio/gala-ballroom-tablescape.jpg`,
      alt: 'A black, gold, and purple place setting at a formal ballroom gala table',
    },
    photos: [
      { src: `${P}/portfolio/gala-ballroom-guests.jpg`, alt: 'A ballroom filled with seated guests at a formal gala under a chandelier' },
    ],
  },
  {
    slug: 'grand-openings',
    title: 'Grand Openings & Brand Events',
    description:
      'Storefront and in-store work: an orange, white, and black entry arch with star bursts for a shop opening, and a purple and black Nightmare Before Christmas build for a specialty retailer.',
    category: 'Corporate',
    shape: 12,
    cover: {
      src: `${P}/portfolio/grand-opening-orange-arch.jpg`,
      alt: 'An orange, white, and black balloon arch with star accents framing a storefront entrance',
    },
    photos: [
      { src: `${P}/portfolio/recipe-box-nightmare-backdrop.jpg`, alt: 'A purple, black, and white Nightmare Before Christmas themed balloon display around a branded sign' },
    ],
  },
  {
    slug: 'jungle-baby-shower',
    title: 'Jungle Baby Shower',
    description:
      'Sage, olive, and gold garland framing a jungle backdrop, with lettered baby blocks, plush safari animals, and a long banquet table run with a monstera-leaf runner and dark green chargers.',
    category: 'Celebrations',
    shape: 6,
    cover: {
      src: `${P}/portfolio/jungle-baby-shower-garland.jpg`,
      alt: 'A sage green and gold balloon garland framing a jungle-themed baby shower backdrop reading A Little King is on His Way',
    },
    photos: [
      { src: `${P}/portfolio/extended-jungle-banquet-table.jpg`, alt: 'A long banquet table set with dark green and gold charger plates and a monstera leaf table runner' },
    ],
  },
  {
    slug: 'safari-park-party',
    title: 'Safari Park Party',
    description:
      'An outdoor build at a neighborhood park — giraffe-print and green balloons over a safari backdrop, with oversized animal figures and lettered blocks staged on the paving.',
    category: 'Celebrations',
    shape: 13,
    cover: {
      src: `${P}/portfolio/safari-park-backdrop.jpg`,
      alt: 'A green, orange, and giraffe-print balloon arch over a safari backdrop with animal figures at an outdoor park',
    },
    photos: [],
  },
  {
    slug: 'halloween-dessert-party',
    title: 'Halloween Dessert Table',
    description:
      'A dessert spread in orange, black, and cream — a tiered naked cake, candles, pumpkins, and themed treats laid over black linen against a printed Halloween backdrop.',
    category: 'Celebrations',
    shape: 14,
    cover: {
      src: `${P}/portfolio/halloween-dessert-table.jpg`,
      alt: 'A Halloween dessert table with a tiered cake, candles, pumpkins, and themed treats on black linen',
    },
    photos: [],
  },
  {
    slug: 'barnyard-first-birthday',
    title: 'Barnyard First Birthday',
    description:
      'A first birthday staged outdoors around a pink playhouse — hay bales, a whitewashed barrel, blush and white florals, and an oversized number one.',
    category: 'Celebrations',
    shape: 15,
    cover: {
      src: `${P}/portfolio/barnyard-first-birthday.jpg`,
      alt: 'A first birthday setup with a pink playhouse, hay bales, blush florals, and a large number one',
    },
    photos: [],
  },
  {
    slug: 'carnival-kids-party',
    title: "Carnival Kids' Party",
    description:
      'Primary-color tables for a children’s party — red and blue linen, tied chair covers, balloon centerpieces, and carnival treats set out within reach.',
    category: 'Celebrations',
    shape: 16,
    cover: {
      src: `${P}/portfolio/carnival-kids-tables.jpg`,
      alt: "A children's party room with red and blue tables, tied chair covers, balloon centerpieces, and carnival treats",
    },
    photos: [],
  },
  {
    slug: 'money-bouquets',
    title: 'Money Bouquets',
    description:
      'Folded-bill bouquets built to order — a blush and rose-gold arrangement with butterfly accents, and a black-rose version with feathers. Priced at the bouquet plus whatever is folded into it.',
    category: 'Rentals & Products',
    shape: 17,
    cover: {
      src: `${P}/contact/celebration-bouquet.jpg`,
      alt: 'A hand-tied celebration bouquet styled with paper roses and gold butterfly accents',
    },
    photos: [
      { src: `${P}/portfolio/money-bouquet-black-roses.jpg`, alt: 'A money bouquet of folded bills with black roses, gold butterflies, and black feather accents' },
    ],
  },
  {
    slug: 'formal-place-settings',
    title: 'Formal Place Settings',
    description:
      'Rental stock dressed for a formal seated dinner — gold-scroll chargers, navy napkins, gold flatware, and a royal blue runner.',
    category: 'Rentals & Products',
    shape: 18,
    cover: {
      src: `${P}/about/rental-charger-detail.jpg`,
      alt: 'Gold-scroll charger plate with a navy napkin and gold flatware, place setting detail',
    },
    photos: [],
  },
];

export const PORTFOLIO_CATEGORIES: Array<PortfolioCategory | 'All'> = [
  'All',
  'Weddings',
  'Corporate',
  'Celebrations',
  'Rentals & Products',
];
