import { useMemo, useState } from 'react';

type Category = 'Weddings' | 'Corporate' | 'Celebrations';

interface Piece {
  src: string;
  alt: string;
  caption: string;
  category: Category;
  shape: number;
}

const PIECES: Piece[] = [
  { src: '/photos/services/event-design-bridal-table.jpg', alt: 'A long wooden bridal table dressed with a navy and blue floral garland runner, candles, and gold-rimmed place settings', caption: 'Navy & Wood Reception', category: 'Weddings', shape: 4 },
  { src: '/photos/services/officiating-ceremony-arch.jpg', alt: 'A wooden circular ceremony arch with sheer draping and oversized poppy flowers, set against a stone building and pine forest', caption: 'Poppy Ceremony Arch', category: 'Weddings', shape: 5 },
  { src: '/photos/portfolio/mr-and-mrs-tablescape.jpg', alt: 'A rustic wedding place setting with a wood charger, sage tablecloth, and a gold Mr. and Mrs. sign against a stone wall', caption: 'Rustic Wedding', category: 'Weddings', shape: 7 },
  { src: '/photos/services/balloons-purple-wisteria.jpg', alt: 'A purple and lavender organic balloon garland with wisteria accents arcing over a wooden cross at a stone-walled venue', caption: 'Wisteria Ceremony Garland', category: 'Weddings', shape: 6 },
  { src: '/photos/portfolio/winter-snowflake-arch.jpg', alt: 'A blue and silver balloon arch with star and snowflake accents inside a boutique interior', caption: 'Winter Launch', category: 'Corporate', shape: 8 },
  { src: '/photos/portfolio/gala-ballroom-tablescape.jpg', alt: 'A black, gold, and purple place setting at a formal ballroom gala table', caption: 'Corporate Gala', category: 'Corporate', shape: 10 },
  { src: '/photos/portfolio/extended-corporate-anthem-arch.jpg', alt: 'A blue and white balloon arch with silver stars at a corporate brand-launch event, with branded gift bags on tables', caption: 'Brand Launch', category: 'Corporate', shape: 11 },
  { src: '/photos/portfolio/jungle-baby-shower-garland.jpg', alt: 'A sage green and gold balloon garland framing a jungle-themed baby shower backdrop reading A Little King is on His Way', caption: 'Baby Shower', category: 'Celebrations', shape: 9 },
  { src: '/photos/portfolio/extended-jungle-banquet-table.jpg', alt: 'A long banquet table set with dark green and gold charger plates and a monstera leaf table runner', caption: 'Jungle Banquet', category: 'Celebrations', shape: 12 },
];

const CATEGORIES: Array<Category | 'All'> = ['All', 'Weddings', 'Corporate', 'Celebrations'];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All');

  const visible = useMemo(
    () => (active === 'All' ? PIECES : PIECES.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      <div className="mb-16 flex flex-wrap gap-x-8 gap-y-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className="label-text cursor-pointer border-0 bg-transparent p-0 transition-colors"
            style={{ color: active === cat ? 'var(--color-ochre-rust)' : undefined }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((piece) => (
          <figure key={piece.src} className="flex flex-col">
            <img
              src={piece.src}
              alt={piece.alt}
              className={`p-media shape-${piece.shape}`}
              style={{ height: '50vh', marginBottom: '1rem' }}
              loading="lazy"
            />
            <figcaption className="label-text">{piece.caption.toUpperCase()}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
