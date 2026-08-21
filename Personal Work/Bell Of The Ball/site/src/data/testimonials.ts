/*
 * REAL client testimonials — sourced from the business's public Google and
 * Yelp reviews (see /testimonials.txt for the raw capture with full names,
 * review counts, and dates).
 *
 * Two editorial rules applied here:
 *
 *  1. Surnames are reduced to an initial ("Helder P."), matching the
 *     convention Yelp already uses on its own reviews. The full names are
 *     public on Google, so printing them in full would be defensible — but
 *     these are private individuals who reviewed a business, not public
 *     endorsers, and the initial costs the testimonial nothing.
 *
 *  2. Quotes are verbatim. Where one has been shortened, the excerpt is
 *     contiguous, marked `excerpted: true`, and the full original is kept in a
 *     comment directly above it so nothing is silently lost.
 *
 * NO reviewer photographs. The raw capture notes that avatars are attached to
 * each reviewer's Google account — those are personal photos of private
 * individuals, hotlinking Google's CDN would break the moment they rotate a
 * URL, and republishing someone's profile picture as a marketing asset is not
 * something a public review implies consent for. The faceted monogram stands
 * in. If a client ever supplies a photo directly, add `image` and the
 * component picks it up.
 */

export const TESTIMONIALS_ARE_PLACEHOLDER = false;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** True when `quote` is a contiguous excerpt rather than the full review. */
  excerpted?: boolean;
  /** Only ever a photo the client supplied directly — never a scraped avatar. */
  image?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Bell of the Ball did an amazing job with my daughter's 8th birthday party! Everything was absolutely beautiful, from the décor to the cotton candy and snow cones. They truly brought our Harry Potter vision to life and helped make her day so special and memorable.",
    name: 'N. A.',
    role: "Children's Birthday · Google",
    excerpted: true,
    // Full: "...I couldn't have asked for a better experience. Highly recommend!"
  },
  {
    quote:
      'Her decorating skills are truly next level. She took our vision and transformed the entire space. Christa made the whole planning process totally stress free and smooth from start to finish! If you need someone to bring your events to life Christa is definitely the one to call.',
    name: 'Jamii L.',
    role: 'Spa-Day Birthday Party · Google',
    excerpted: true,
    // Full: "Working with Bell of the Ball for a birthday party for my daughter
    // was an absolute dream from start to finish! Her decorating skills are
    // truly next level. She took our vision (My daughter wanted a spa day
    // party) and transformed the entire space and made it look super cute for
    // my daughter. Bell of the ball (Christa Bell) made the whole planning
    // process totally stress free and smooth from start to finish! If you need
    // someone to bring your events to life Christa is definitely the one to
    // call."
  },
  {
    quote:
      'Very pleasant and professional to work with. The decorations and theme are a custom fit to each individual party. I would hire over and over and over again!',
    name: 'Christin S.',
    role: 'Themed Party · Google',
  },
  {
    quote:
      "Working with Christa on my wife and I's wedding was absolutely fantastic! An amazing officiant, amazing decorator, and everything my wife and I could have ever asked for! Above and beyond! Would recommend 100 times over!",
    name: 'Helder P.',
    role: 'Wedding & Officiating · Google',
  },
  {
    quote:
      'Highly professional and punctual! Capable of accommodating what feels like an endless variety of events! Very personable folks as well, would recommend their services to anyone!',
    name: 'Michael B.',
    role: 'Multiple Events · Google',
  },
  {
    quote:
      'Christa is an incredible event planner who brings every vision to life with creativity, professionalism, and heart. She makes everything run smoothly and look effortless. If you want your event to feel special and unforgettable, she’s the one to call!',
    name: 'TaTiana M.',
    role: 'Event Planning · Google',
    excerpted: true,
    // Full opens: "I love Bell of the Ball! Bell of the Ball is amazing!"
  },
  {
    quote: 'Shared my vision and she ran with my theme and idea and exceeded my expectations!',
    name: 'Charda S.',
    role: 'Themed Event · Google',
  },
  {
    quote:
      'My husband and I just had our wedding and having Christa as our officiant was the cherry on top! From our meetup to getting everything sorted out and arranged like we wanted to hearing on our day everything we discussed and more! Very respectful and fun!',
    name: 'Giordan B.',
    role: 'Wedding Officiating · Google',
    excerpted: true,
    // Full closes: "Worth it 1000% to go with them for your party needs!"
  },
  {
    quote:
      'Christa went above and beyond for my 20 year reunion!! She had all the colors I wanted and even brought a backdrop for our arch. I was blown away from the professionalism and communication. Also, she was VERY reasonable with pricing. I would highly recommend for any event.',
    name: 'Jessica W.',
    role: 'Class Reunion · Google',
  },
  {
    quote:
      'Definitely would recommend a Bell of the Ball event. Not only does she plan events, she does wedding planning, notary, party supplies rentals, and balloon art for celebrations. One stop shop for all your party needs!',
    name: 'Robin A.',
    role: 'Sip & Paint Event · Yelp',
    excerpted: true,
    // Full: "Bell of the Ball hosted a Sip & Paint at a chicken wing restaurant
    // in Reno. They supplied all the paint supplies and gave us a drink voucher
    // for the restaurant. We all got to open a tape individually for food
    // orders too. We got to pick out our own canvases with stencil art. There
    // were a lot of designs to choose from. Our tickets were prepunched before
    // the event for $40. We had good music and good food and drinks. I got to
    // connect with some new people and we had a great time. Definitely would
    // recommend a Bell of the Ball event. Not only does she plan events, she
    // does wedding planning, notary, party supplies rentals, and balloon art
    // for celebrations. One stop shop for all your party needs!"
  },
  {
    quote:
      'Event planning is exceptional, hands down best in town. Family business also. Love love love this. Thank you for helping with my birthday.',
    name: 'Keisha C.',
    role: 'Birthday · Yelp',
    excerpted: true,
    // Full review opens "Love love love your services from book bags to custom
    // shirts." Trimmed because custom shirts, cups, and mugs are no longer
    // offered — leaving it in would advertise a discontinued service.
  },
];
