/*
 * FAQ content.
 *
 * Unlike pricing.ts and testimonials.ts, most of this is REAL — every answer
 * marked `confirmed` is drawn directly from PRODUCT.md (confirmed services,
 * positioning, users, operating context) and states nothing the client has not
 * already established.
 *
 * Items marked `todo` are questions real visitors will ask that PRODUCT.md
 * genuinely does not answer (service area, lead time, deposit terms). They
 * render with a visible TODO(client) marker in development so they cannot be
 * shipped by accident. Fill in the answer and flip `status` to 'confirmed'.
 */

export interface FaqItem {
  question: string;
  answer: string;
  status: 'confirmed' | 'todo';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What does Bell of the Ball actually do?',
    answer:
      'Five things, under one roof: premium event design and full-service planning, professional officiating, notary services, organic balloon arrangements, and party concession rentals. Most vendors specialise in one of those. We handle all five.',
    status: 'confirmed',
  },
  {
    question: 'Why book one company instead of separate vendors?',
    answer:
      'Stitching together a planner, an officiant, a décor team, and a rental company means you absorb the coordination tax yourself — four contracts, four timelines, four people to chase on the day. With us it is one point of contact from first concept through final teardown.',
    status: 'confirmed',
  },
  {
    question: 'How does the process start?',
    answer:
      'With a consultation. That conversation is where we scope the event, walk through what you have in mind, and put real pricing against it. Everything — design direction, timeline, budget — follows from there.',
    status: 'confirmed',
  },
  {
    question: 'Do you work on corporate events, or only celebrations?',
    answer:
      'Both, equally. Brand launches, galas, team gatherings, and holiday parties sit alongside birthdays, baby showers, anniversaries, and graduations in our work. The planning discipline is the same; only the brief changes.',
    status: 'confirmed',
  },
  {
    question: 'How large an event can you take on?',
    answer:
      'Events range from intimate family gatherings to large-scale corporate productions. If you are unsure whether your event is too small or too involved, the consultation is the fastest way to find out.',
    status: 'confirmed',
  },
  {
    question: 'Is the estimate on this page a real quote?',
    answer:
      'No — it is a planning tool to give you a sense of scale before you get in touch. Every event has variables the estimator cannot see: venue, guest count, season, and how much of the build we are handling. Your actual quote comes out of the consultation.',
    status: 'confirmed',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'Reno, Nevada and the surrounding area. If you are outside it and planning something worth the drive, ask — travel is usually workable.',
    status: 'confirmed',
    // TODO(client): confirm the outer travel/delivery radius, particularly for
    // concession rentals, which need same-day drop-off and pickup.
  },
  {
    question: 'How far in advance should we book?',
    answer:
      'TODO(client): confirm typical lead times, plus deposit and cancellation terms.',
    status: 'todo',
  },
];
