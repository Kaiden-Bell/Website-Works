document.addEventListener('DOMContentLoaded', () => {
    // Nav Scroll
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Hero Text Stagger
    const heroWords = document.querySelectorAll('.hero-word');
    heroWords.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('animate');
        }, 100 + (index * 150));
    });

    // Intersection Observer for scroll reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('reveal-snap');
        // Transition delay for staggered effect based on grid position
        card.style.transitionDelay = `${(index % 2) * 150}ms`;
        revealObserver.observe(card);
    });

    // Apply observer to Portfolio blocks
    const portfolioBlocks = document.querySelectorAll('.portfolio-block');
    portfolioBlocks.forEach((block) => {
        block.classList.add('reveal-snap');
        revealObserver.observe(block);
    });
});
