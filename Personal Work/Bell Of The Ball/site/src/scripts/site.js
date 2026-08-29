// Ported from the v3/b comp's main.js. The scroll-spy became a static
// current-page check since each section is now its own route.
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-links a');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      mobileMenuBtn.textContent = isOpen ? 'MENU' : 'CLOSE';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.textContent = 'MENU';
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-right');
  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  revealElements.forEach((el) => revealOnScroll.observe(el));

  const parallaxElements = document.querySelectorAll('.parallax-text');
  if (parallaxElements.length) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      parallaxElements.forEach((el) => {
        const speed = el.dataset.speed || 0.1;
        el.style.transform = `translateY(${-(scrolled * speed)}px)`;
      });
    });
  }

  // Mouse parallax for the team portraits. Each image eases toward a target
  // offset derived from the pointer's position within the grid; the two
  // portraits use different depths so they don't move as one flat plane.
  const parallaxScope = document.querySelector('[data-parallax-scope]');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (parallaxScope && finePointer && !reduceMotion) {
    const MAX_SHIFT = 16; // px at full depth
    const EASE = 0.09;
    const layers = Array.from(parallaxScope.querySelectorAll('[data-parallax-depth]')).map((el) => ({
      el,
      depth: parseFloat(el.dataset.parallaxDepth) || 1,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    }));

    let frame = null;

    const step = () => {
      let settling = false;
      layers.forEach((layer) => {
        layer.x += (layer.targetX - layer.x) * EASE;
        layer.y += (layer.targetY - layer.y) * EASE;
        if (Math.abs(layer.targetX - layer.x) > 0.05 || Math.abs(layer.targetY - layer.y) > 0.05) {
          settling = true;
        }
        layer.el.style.setProperty('--parallax-x', `${layer.x.toFixed(2)}px`);
        layer.el.style.setProperty('--parallax-y', `${layer.y.toFixed(2)}px`);
      });
      frame = settling ? requestAnimationFrame(step) : null;
    };

    const run = () => {
      if (frame === null) frame = requestAnimationFrame(step);
    };

    parallaxScope.addEventListener('pointermove', (event) => {
      const rect = parallaxScope.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      layers.forEach((layer) => {
        layer.targetX = -nx * MAX_SHIFT * layer.depth;
        layer.targetY = -ny * MAX_SHIFT * layer.depth;
      });
      run();
    });

    parallaxScope.addEventListener('pointerleave', () => {
      layers.forEach((layer) => {
        layer.targetX = 0;
        layer.targetY = 0;
      });
      run();
    });
  }

  // Back-to-top (homepage only — the button simply isn't on other pages).
  // Appears once you're well past the hero so it never covers the opening view.
  const toTop = document.querySelector('[data-to-top]');
  if (toTop) {
    const SHOW_AFTER = () => window.innerHeight * 1.5;
    let ticking = false;

    const sync = () => {
      toTop.hidden = window.scrollY < SHOW_AFTER();
      ticking = false;
    };

    sync();
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(sync);
      },
      { passive: true }
    );

    toTop.addEventListener('click', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    link.classList.toggle('active', linkPath === currentPath);
  });
});
