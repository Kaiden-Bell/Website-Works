/*
 * Landing-page lightbox.
 *
 * The portfolio page has had one since it was built (PortfolioGrid.tsx), but
 * the homepage's photographs opened nothing, so they read as page decoration
 * rather than as work someone did. This gives every photograph on the landing
 * page a way in, and gives the Selected Works tiles the whole event behind
 * them — the cover a visitor clicked plus every other photograph from that
 * folder, with the archive entry one link away.
 *
 * It deliberately reuses the portfolio's `pf-*` classes. Two lightboxes that
 * looked different would read as two different features; sharing the CSS means
 * there is one lightbox on this site that happens to be reachable from two
 * places. It is plain DOM rather than a second React island, so the homepage
 * still ships no framework runtime.
 *
 * A trigger declares its set as JSON on `data-lightbox`:
 *
 *   {
 *     "title": "Rustic Stone Venue",
 *     "meta": "WEDDINGS",
 *     "description": "…",              // optional
 *     "href": "/portfolio#slug",       // optional, renders a footer link
 *     "hrefLabel": "See the full event",
 *     "photos": [{ "src": "…", "alt": "…" }]
 *   }
 */

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (!triggers.length) return;

  let overlay = null;
  let opener = null;
  let photos = [];
  let index = 0;
  let previousOverflow = '';

  const render = () => {
    const photo = photos[index];
    const stage = overlay.querySelector('.pf-stage-figure');

    // Replacing the node rather than swapping `src` restarts the fade, which
    // is what makes stepping through a set feel like a set.
    stage.replaceChildren(
      Object.assign(new Image(), { src: photo.src, alt: photo.alt ?? '' })
    );

    const counter = overlay.querySelector('.pf-counter');
    if (counter) counter.textContent = `${index + 1} / ${photos.length}`;

    const rail = overlay.querySelector('.pf-thumbs');
    if (!rail) return;
    rail.querySelectorAll('.pf-thumb').forEach((thumb, i) => {
      const isActive = i === index;
      thumb.dataset.active = String(isActive);
      thumb.setAttribute('aria-current', String(isActive));
    });
    const active = rail.querySelector('[data-active="true"]');
    // Not scrollIntoView: that also scrolls the panel, which drags the title
    // out of sight the moment the lightbox opens.
    if (active) rail.scrollLeft = active.offsetLeft - (rail.clientWidth - active.clientWidth) / 2;
  };

  const step = (delta) => {
    index = (index + delta + photos.length) % photos.length;
    render();
  };

  const close = () => {
    if (!overlay) return;
    document.removeEventListener('keydown', onKeyDown);
    document.body.style.overflow = previousOverflow;
    overlay.remove();
    overlay = null;
    opener?.focus();
    opener = null;
  };

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (photos.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusables = overlay.querySelectorAll(FOCUSABLE);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const build = (set) => {
    const many = photos.length > 1;
    const titleId = 'lightbox-title';

    overlay = document.createElement('div');
    overlay.className = 'pf-overlay';
    overlay.innerHTML = `
      <div class="pf-panel" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
        <button type="button" class="pf-close" aria-label="Close">CLOSE ✕</button>
        <div class="pf-panel-head">
          ${set.meta ? `<span class="label-text">${set.meta}</span>` : ''}
          <h3 id="${titleId}" class="pf-panel-title"></h3>
          ${set.description ? '<p class="pf-panel-desc"></p>' : ''}
        </div>
        <div class="pf-stage">
          ${many ? '<button type="button" class="pf-arrow pf-arrow-prev" aria-label="Previous photograph"><span aria-hidden="true">←</span></button>' : ''}
          <figure class="pf-stage-figure"></figure>
          ${many ? '<button type="button" class="pf-arrow pf-arrow-next" aria-label="Next photograph"><span aria-hidden="true">→</span></button>' : ''}
        </div>
        ${many ? '<p class="label-text pf-counter" aria-live="polite"></p><div class="pf-thumbs"></div>' : ''}
        ${set.href ? `<a class="pf-panel-link" href="${set.href}">${set.hrefLabel ?? 'See the full event'} <span aria-hidden="true">→</span></a>` : ''}
      </div>`;

    // Titles and descriptions are set as text, never as markup — they come from
    // event.json, which is content the client edits.
    overlay.querySelector('.pf-panel-title').textContent = set.title ?? '';
    const desc = overlay.querySelector('.pf-panel-desc');
    if (desc) desc.textContent = set.description;

    const rail = overlay.querySelector('.pf-thumbs');
    if (rail) {
      photos.forEach((photo, i) => {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'pf-thumb';
        thumb.setAttribute('aria-label', `Photograph ${i + 1} of ${photos.length}`);
        thumb.appendChild(
          Object.assign(new Image(), { src: photo.src, alt: '', loading: 'lazy' })
        );
        thumb.addEventListener('click', () => {
          index = i;
          render();
        });
        rail.appendChild(thumb);
      });
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close();
    });
    overlay.querySelector('.pf-close').addEventListener('click', close);
    overlay.querySelector('.pf-arrow-prev')?.addEventListener('click', () => step(-1));
    overlay.querySelector('.pf-arrow-next')?.addEventListener('click', () => step(1));
  };

  const open = (trigger) => {
    let set;
    try {
      set = JSON.parse(trigger.dataset.lightbox);
    } catch {
      return; // A malformed payload leaves the photograph inert rather than breaking the page.
    }
    if (!set?.photos?.length) return;

    opener = trigger;
    photos = set.photos;
    index = Math.max(0, photos.findIndex((p) => p.src === trigger.dataset.lightboxStart));

    build(set);
    document.body.appendChild(overlay);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    render();
    overlay.querySelector('.pf-close').focus();
    document.addEventListener('keydown', onKeyDown);
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', () => open(trigger)));
}
