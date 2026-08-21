/*
 * Portfolio grid + lightbox.
 *
 * The grid renders one cover per event. Opening an event mounts its lightbox
 * and only then do that event's other photos enter the DOM — so the archive
 * can grow without the page getting heavier. Every non-cover image is
 * `loading="lazy"` on top of that.
 *
 * No navigation and no page load: the lightbox is a client-side overlay. It
 * does update the URL hash so a specific event can be linked and so the
 * browser Back button closes it, which is what people expect from a modal
 * that changed the address bar.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_EVENTS,
  type PortfolioCategory,
  type PortfolioEvent,
} from '../data/portfolio';

type Filter = PortfolioCategory | 'All';

export default function PortfolioGrid() {
  const [active, setActive] = useState<Filter>('All');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = useMemo(
    () => (active === 'All' ? PORTFOLIO_EVENTS : PORTFOLIO_EVENTS.filter((e) => e.category === active)),
    [active]
  );

  const openEvent = useMemo(
    () => PORTFOLIO_EVENTS.find((e) => e.slug === openSlug) ?? null,
    [openSlug]
  );

  // Deep-link support: honour an incoming #event-slug, and follow Back/Forward.
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace(/^#/, '');
      setOpenSlug(PORTFOLIO_EVENTS.some((e) => e.slug === slug) ? slug : null);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const open = useCallback((slug: string) => {
    window.location.hash = slug;
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    setOpenSlug(null);
    // Drop the hash without adding another history entry.
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  return (
    <div>
      <div className="pf-filters">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className="label-text pf-filter"
            aria-pressed={active === cat}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="pf-grid">
        {visible.map((event) => (
          <button
            key={event.slug}
            type="button"
            className="pf-tile"
            onClick={() => open(event.slug)}
            aria-haspopup="dialog"
          >
            <span className={`pf-tile-media shape-${event.shape}`}>
              <img src={event.cover.src} alt={event.cover.alt} loading="lazy" />
            </span>
            <span className="pf-tile-meta">
              <span className="pf-tile-title">{event.title}</span>
              <span className="label-text">
                {event.category.toUpperCase()}
                {event.photos.length > 0 && ` · ${event.photos.length + 1} PHOTOS`}
              </span>
            </span>
          </button>
        ))}
      </div>

      {openEvent && <Lightbox event={openEvent} onClose={close} />}
    </div>
  );
}

function Lightbox({ event, onClose }: { event: PortfolioEvent; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Trap focus inside the dialog.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const all = [event.cover, ...event.photos];

  return (
    <div className="pf-overlay" onClick={onClose}>
      <div
        className="pf-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${event.slug}-title`}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="pf-close" onClick={onClose} ref={closeRef} aria-label="Close">
          CLOSE ✕
        </button>

        <div className="pf-panel-head">
          <span className="label-text">
            {event.category.toUpperCase()}
            {event.date && ` · ${event.date.toUpperCase()}`}
          </span>
          <h3 id={`${event.slug}-title`} className="pf-panel-title">
            {event.title}
          </h3>
          <p className="pf-panel-desc">{event.description}</p>
        </div>

        <div className="pf-panel-photos">
          {all.map((photo, i) => (
            <figure key={photo.src} className={`pf-photo shape-${((event.shape + i) % 6) + 13}`}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        {all.length === 1 && (
          <p className="pf-panel-note">More photographs from this event are being added.</p>
        )}
      </div>
    </div>
  );
}
