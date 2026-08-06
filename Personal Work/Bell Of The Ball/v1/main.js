/**
 * Bell of the Ball - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Glassmorphic Header Scroll Effect
    const header = document.getElementById('site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // trigger slightly before bottom
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // only reveal once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Subtle Parallax for Hero Media
    const heroMedia = document.querySelector('.hero-media');
    
    if (heroMedia) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            // Only apply parallax if near top of page
            if (scrollPos < window.innerHeight) {
                // Move media down slightly as we scroll down
                const yPos = scrollPos * 0.15;
                heroMedia.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
