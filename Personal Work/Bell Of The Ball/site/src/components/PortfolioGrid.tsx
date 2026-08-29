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
 *
 * The lightbox shows one photograph at a time. Visitors reported that the
 * earlier collage gave them no way to step through an event, so it now carries
 * previous/next arrows, ArrowLeft/ArrowRight keys, a position counter, and a
 * thumbnail rail for jumping. Navigation wraps at both ends.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PortfolioCategory, PortfolioEvent } from '../data/portfolio-types';

type Filter = PortfolioCategory | 'All';

interface Props {
  /** Built from the folder tree at build time — see src/data/portfolio.ts. */
  events: PortfolioEvent[];
  categories: Filter[];
}

export default function PortfolioGrid({ events, categories }: Props) {
  const [active, setActive] = useState<Filter>('All');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = useMemo(
    () => (active === 'All' ? events : events.filter((e) => e.category === active)),
    [active, events]
  );

  const openEvent = useMemo(
    () => events.find((e) => e.slug === openSlug) ?? null,
    [openSlug, events]
  );

  // Deep-link support: honour an incoming #event-slug, and follow Back/Forward.
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace(/^#/, '');
      setOpenSlug(events.some((e) => e.slug === slug) ? slug : null);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [events]);

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
        {categories.map((cat) => (
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
  const thumbRailRef = useRef<HTMLDivElement | null>(null);

  const all = useMemo(() => [event.cover, ...event.photos], [event]);
  const [index, setIndex] = useState(0);

  // Wrap at both ends: from the last photo, Next returns to the first.
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + all.length) % all.length),
    [all.length]
  );

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
      if (all.length > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        step(e.key === 'ArrowLeft' ? -1 : 1);
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
  }, [onClose, step, all.length]);

  // Keep the active thumbnail in view as the visitor steps past the rail's edge.
  // Setting scrollLeft directly rather than calling scrollIntoView: the latter
  // also scrolls every scrollable ancestor, which on open dragged the overlay
  // down far enough to hide the event title.
  useEffect(() => {
    const rail = thumbRailRef.current;
    const active = rail?.querySelector<HTMLElement>('[data-active="true"]');
    if (!rail || !active) return;
    rail.scrollLeft = active.offsetLeft - (rail.clientWidth - active.clientWidth) / 2;
  }, [index]);

  const current = all[index];
  const hasMany = all.length > 1;

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
          {event.description && <p className="pf-panel-desc">{event.description}</p>}
        </div>

        <div className="pf-stage">
          {hasMany && (
            <button
              type="button"
              className="pf-arrow pf-arrow-prev"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
            >
              <span aria-hidden="true">←</span>
            </button>
          )}

          <figure className="pf-stage-figure">
            {/* Keyed on src so a changed photo fades in rather than swapping hard. */}
            <img key={current.src} src={current.src} alt={current.alt} />
          </figure>

          {hasMany && (
            <button
              type="button"
              className="pf-arrow pf-arrow-next"
              onClick={() => step(1)}
              aria-label="Next photograph"
            >
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        {hasMany ? (
          <>
            <p className="label-text pf-counter" aria-live="polite">
              {index + 1} / {all.length}
            </p>

            <div className="pf-thumbs" ref={thumbRailRef}>
              {all.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  className="pf-thumb"
                  data-active={i === index}
                  aria-current={i === index}
                  aria-label={`Photograph ${i + 1} of ${all.length}`}
                  onClick={() => setIndex(i)}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="pf-panel-note">More photographs from this event are being added.</p>
        )}
      </div>
    </div>
  );
}
