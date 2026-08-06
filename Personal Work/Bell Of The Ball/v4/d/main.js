document.addEventListener('DOMContentLoaded', () => {
    // Nav scroll effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Split text for pull quote
    const pullQuote = document.getElementById('pull-quote');
    if (pullQuote) {
        const text = pullQuote.innerText;
        pullQuote.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.classList.add('word');
            span.innerText = word + ' ';
            span.style.transitionDelay = `${i * 0.05}s`;
            pullQuote.appendChild(span);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a stagger container, stagger children
                if (entry.target.classList.contains('gallery-row-1') || entry.target.classList.contains('gallery-row-2')) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('is-visible');
                        }, index * 200);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const animElements = document.querySelectorAll(
        '.fade-in, .fade-in-up, .hero-media-wrapper, .pull-quote, .slide-in-left, .slide-in-right, .slide-in-alternating, .stagger-item'
    );

    animElements.forEach(el => observer.observe(el));

    // Initial load animation for hero elements
    setTimeout(() => {
        document.querySelectorAll('.hero-content.fade-in-up, .hero-media-wrapper').forEach(el => {
            el.classList.add('is-visible');
        });
    }, 100);
});
