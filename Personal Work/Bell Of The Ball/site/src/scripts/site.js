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

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    link.classList.toggle('active', linkPath === currentPath);
  });
});
