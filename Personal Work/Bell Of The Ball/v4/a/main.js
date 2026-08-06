document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Navigation Scroll State
    const nav = document.getElementById('main-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Parallax Effect for Hero Media
    const heroMedia = document.getElementById('hero-media');
    
    window.addEventListener('scroll', () => {
        if (!heroMedia) return;
        const scrollPosition = window.scrollY;
        // Apply subtle parallax (moving slower than scroll)
        if (scrollPosition < window.innerHeight) {
            heroMedia.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
    });

    // Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const revealElements = [
        '.fade-in-up',
        '.slide-in-right',
        '.expand-rule',
        '.reveal-text',
        '.reveal-card',
        '.gallery-reveal'
    ];

    revealElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        // Add staggered delay for gallery and service cards
        if (selector === '.gallery-reveal' || selector === '.reveal-card') {
            elements.forEach((el, index) => {
                el.style.transitionDelay = `${index * 150}ms`;
                revealObserver.observe(el);
            });
        } else {
            elements.forEach(el => revealObserver.observe(el));
        }
    });
});
