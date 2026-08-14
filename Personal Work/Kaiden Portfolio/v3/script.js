document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Kinetic Typography & Parallax on Scroll
    const heroTitle = document.querySelector('.hero-title');
    const heroPortrait = document.getElementById('hero-portrait');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Motion Blur Effect based on scroll speed / position
        // Increase blur as we scroll down
        const blurAmount = Math.min(scrolled / 50, 20);
        document.documentElement.style.setProperty('--motion-blur', `blur(${blurAmount}px)`);
        
        // Parallax for portrait
        if (heroPortrait && scrolled < window.innerHeight) {
            heroPortrait.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        // Title parallax
        if (heroTitle && scrolled < window.innerHeight) {
            heroTitle.style.transform = `translateX(${-scrolled * 0.1}px)`;
        }
    });

    // Cursor Follow effect for project cards
    const projectCards = document.querySelectorAll('.project-image-placeholder');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // Page Load Animation
    // Trigger the visibility of hero elements
    setTimeout(() => {
        const heroTitleEl = document.getElementById('hero-title');
        if (heroTitleEl) {
            heroTitleEl.style.opacity = '0';
            heroTitleEl.style.transform = 'translateX(100px) skewX(20deg)';
            heroTitleEl.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            
            requestAnimationFrame(() => {
                heroTitleEl.style.opacity = '1';
                heroTitleEl.style.transform = 'translateX(0) skewX(0)';
            });
        }
    }, 100);
});
