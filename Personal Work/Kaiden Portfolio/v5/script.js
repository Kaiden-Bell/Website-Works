document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.height = `${scrollPercent}%`;
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.animate-up, .animate-fade, .animate-slide-right, .animate-in, .section-line');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Parallax Effect for Concentric Circles
    const concentricCircles = document.querySelector('.concentric-circles');
    
    window.addEventListener('scroll', () => {
        if (!concentricCircles) return;
        const scrollY = window.scrollY;
        // Subtle scale and rotation on scroll
        concentricCircles.style.transform = `translate(50%, -50%) scale(${1 + scrollY * 0.0005}) rotate(${scrollY * 0.02}deg)`;
    });

    // 4. Parallax Effect for Orange Sphere
    const orangeSphere = document.querySelector('.orange-sphere');
    
    window.addEventListener('scroll', () => {
        if (!orangeSphere) return;
        const scrollY = window.scrollY;
        orangeSphere.style.transform = `translateY(${scrollY * -0.2}px)`;
    });

    // 5. Initial trigger for elements already in viewport
    setTimeout(() => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);
});
