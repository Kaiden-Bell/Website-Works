# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Direction approved: v3, palette/type variant "b" — Botanical Ledger (see `DESIGN.md`). The full site is scaffolded in `site/` on Astro 5, with a React island for the filterable portfolio and Tailwind CSS v4 (theme tokens mirror `DESIGN.md`, defined in `site/src/styles/global.css`). Static output, no server or database — a newsletter signup, if added, uses a third-party form embed (e.g. Mailchimp/ConvertKit/Buttondown) rather than custom backend infrastructure. Live pages: Home, About, Services, Portfolio, Pricing, Contact. The Pricing page carries a live estimator island plus the FAQ; testimonials run as a marquee section on the Home page. The Portfolio uses an event-grouped grid with a client-side lightbox — one cover image per event ships in the HTML, and an event's remaining photos only enter the DOM when its lightbox opens, so the archive can grow without the page getting heavier. The `site/src/pages/contact.astro` and `Footer.astro` email address is a placeholder (`hello@belloftheball.example`, an intentionally non-resolving domain) pending a confirmed business inbox/phone.

## Users

Families planning milestone celebrations (birthdays, baby showers, anniversaries, graduations) and corporate clients organizing professional events (brand launches, galas, team-building gatherings, holiday parties). Both audiences are equally important. They share a common need: a trustworthy, organized partner who can handle every detail so they can be present at the event rather than running it.

## Product Purpose

Bell of the Ball is a full-service event planning and service rental company. The business exists to give clients a single point of contact for every layer of an event — from initial concept and structural design through professional officiating, organic balloon arrangements, and party concession equipment rentals. Success means a visitor understands the breadth and quality of what's offered, feels confident in the company's execution ability, and books a consultation.

## Positioning

End-to-end ownership across all event layers under one roof. Where competitors specialize in a single vertical (planning only, rentals only, décor only), Bell of the Ball combines premium event design, professional officiating, organic balloon artistry, and concession rentals into a unified service — eliminating the coordination tax clients pay when stitching together multiple vendors.

## Operating Context

Clients typically discover the business through referrals or social media, visit the website to evaluate scope and credibility, and convert by booking a consultation. The consultation is the entry point to scoping, pricing, and planning. Events range from intimate family gatherings to large-scale corporate productions.

## Capabilities and Constraints

**Confirmed services:**
- Premium event design and full-service party planning
- Professional officiating
- Notary services (confirmed by the client; corroborated by a public Yelp review)
- Organic balloon arrangements
- Party concession rentals (equipment for events)

**Discontinued — do not advertise:** custom apparel and drinkware (shirts, cups, mugs, book bags). These appear in an older public review; the client has confirmed they are no longer offered, and the quote is trimmed in `site/src/data/testimonials.ts` accordingly.

**Service area:** Reno, Nevada and the surrounding area. The outer travel/delivery radius — particularly for concession rentals, which need same-day drop-off and pickup — is still unconfirmed.

**Constraints:**
- Real event photography now lives in `assets/photos/` (organized under `hero/`, `about/`, `services/`, `portfolio/`) and is wired into `v3/b` as actual `<img>` elements — the CSS gradient stand-ins are retired in that build. `assets/photos/Potential Photo Candidates/` holds the client's fuller curated set (29 images) to draw further selections from as the site expands.
- Two photos in that candidate set must not be used publicly without explicit consent: `table-4x3-01.jpg` is a memorial/celebration-of-life service table bearing a specific deceased individual's photo, and `table-16x9-01.jpg` shows a real couple's full names and wedding date. Neither is used anywhere in the current build.
- Testimonials are now REAL and live: eleven public Google and Yelp reviews, wired through `site/src/data/testimonials.ts`. Surnames are reduced to an initial and no reviewer photographs are used — reviewer avatars belong to private individuals and a public review does not imply consent to republish a likeness as marketing.
- Pricing is PARTIALLY confirmed (`/pricing-design.md` → `site/src/data/pricing.ts`). Real: the $600 base shared by Weddings/Corporate/Personal, and every product and rental figure. Not settled: the guide's add-on rows are mostly literal "TEMP" placeholders, and most work is scoped custom per event. The client has agreed to share past quotes so averages can be derived. Until then the estimator renders "From $X", never an exact figure, and `PRICING_IS_PLACEHOLDER` stays true. Do not fabricate tiers.
- Open pricing question: the snow cone machine is listed at $125/day while the cotton candy and popcorn machines are $125/hour. Encoded as written; likely a typo, needs the client's confirmation.
- Portfolio is modelled as events, not loose photos (`site/src/data/portfolio.ts`). Event groupings were inferred from visual evidence — matching venues, palettes, linen, props — not from client records, and no event carries a date because none is known. Both need client confirmation.

## Brand Commitments

- **Name:** Bell of the Ball
- **Voice:** Crisp, trustworthy, welcoming — professional execution balanced with organic, vibrant energy. Must bypass standard event-coordinator clichés (generic gold-glitter templates, over-rounded pastel card grids, untextured party-stock photography).
- **Visual guardrails (user-pinned):** No ASCII art or structural linework. No bright neon accents. No untextured generic stock photography. No rounded-everything/bubbly pill shapes. No generic 3–4 icon-grid feature rows. No Inter or generic system-font-only stacks. No evenly distributed pastel or overly safe palettes.

## Evidence on Hand

- A detailed creative brief ([BOTB-Prompt.md](BOTB-Prompt.md)) providing five distinct design directions (v1–v5), each with style tags, layout architecture, and functional application notes.
- Real event photography is in `assets/photos/` and live in the `v3/b` build (hero, about, all four services, and the portfolio grid). A larger curated set (29 images, see `Potential Photo Candidates/`) remains available for the Portfolio page and future pages.
- Real pricing/package tiers and real testimonials/case studies exist with the client but are not yet finalized or shared with this project. Specific values must still not be fabricated.
- No video footage or client logos are on hand. Future work must not fabricate these.

## Product Principles

1. **One call, everything handled.** Every touchpoint reinforces that clients get a single partner for the entire event, not a referral list.
2. **Show the scale.** The website must immediately communicate the company's breadth — from structural design to concession rentals — so visitors never underestimate what's offered.
3. **Earned trust, not claimed trust.** Credibility comes from demonstrating history, scope, and professionalism — not from invented testimonials or inflated claims.
4. **Media-forward storytelling.** Physical event presence (imagery, video, portfolio) must dominate the layout once real assets are available; the structure is designed around that future state.
5. **Effortless path to booking.** Every section guides toward the "Book Consultation" CTA without friction or distraction.
