/*
 * Scroll parallax for the landing page's photographs.
 *
 * The hero already read as parallaxed, but only because the title crawls at a
 * different rate behind it — the photograph itself was flat, as was every other
 * photograph on the page. Moving whole elements was not an option: the
 * portfolio teaser is a twelve-column grid with negative margins, and shifting
 * its tiles would pull the composition apart.
 *
 * So the frame stays exactly where the layout puts it and the photograph moves
 * inside it. Each image is rendered taller than its frame (see .px-frame in
 * components.css) and slides within that overhang, which means the effect costs
 * nothing in layout and can never expose an edge.
 *
 * Depth is per-element: `data-parallax="0.6"` travels a little, `"1.4"` travels
 * a lot. Anything omitted is 1.
 */

/** Share of the frame's own height an image travels at depth 1. */
const RANGE = 0.1;

/* Hard ceiling on travel, whatever depth an element asks for. It matches the
   overhang .px-frame > img is given in components.css — go past this and the
   frame shows an edge. */
const OVERHANG = 0.12;

export function initParallax() {
  const frames = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!frames.length) return;

  // Reduced motion gets the same photographs, held still. The CSS already
  // centres the overhang, so doing nothing here is the correct rendering.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Only frames near the viewport are worth measuring; the rest are skipped
  // entirely, so a long page costs the same per scroll frame as a short one.
  const live = new Set();
  const watcher = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) live.add(entry.target);
        else live.delete(entry.target);
      });
      request();
    },
    { rootMargin: '25% 0px 25% 0px' }
  );
  frames.forEach((frame) => watcher.observe(frame));

  let ticking = false;

  const update = () => {
    ticking = false;
    const viewport = window.innerHeight;

    live.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      if (!rect.height) return;

      // -1 as the frame enters from the bottom, 0 at the centre of the screen,
      // +1 as it leaves past the top.
      const span = (viewport + rect.height) / 2;
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / span;
      const clamped = Math.max(-1, Math.min(1, progress));

      // Positive is downward. The image lags the frame's upward travel, which
      // is what makes it read as sitting further back than the page.
      const depth = parseFloat(frame.dataset.parallax) || 1;
      const travel = Math.min(RANGE * depth, OVERHANG);
      const shift = clamped * rect.height * travel;
      frame.style.setProperty('--px-shift', `${shift.toFixed(1)}px`);
    });
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  update();
}
