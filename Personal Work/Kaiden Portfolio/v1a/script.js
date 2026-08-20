document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Implementation
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Instant movement for dot
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth trailing movement for outline (using CSS transition or requestAnimationFrame)
        // For smoother tracking, requestAnimationFrame could be used, but absolute tracking is fine here
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects on links/buttons
    const hoverElements = document.querySelectorAll('a, button, .project-card, .expertise-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('is-active');
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('is-active');
        });
    });

    // 2. Initial Page Load Animation Stagger
    const loadItems = document.querySelectorAll('.load-item');
    
    loadItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 150 * (index + 1)); // Stagger delay
    });

    // 3. Scroll Reveal using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Parallax Effect for Hero Portrait
    const portraitWrapper = document.querySelector('.hero-portrait-wrapper');
    const parallaxFactor = parseFloat(portraitWrapper.getAttribute('data-parallax') || 0.1);

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Simple parallax: move the portrait down slightly as we scroll down
        if (scrolled < window.innerHeight) {
            // Apply a slight translateY
            portraitWrapper.style.transform = `translateY(calc(-50% + ${scrolled * parallaxFactor}px))`;
        }
    });

    // 5. Smooth Scroll for Anchor Links (handled mostly by CSS scroll-behavior, but preventing default for precise control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
