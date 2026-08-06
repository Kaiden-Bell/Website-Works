document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const openMenu = () => {
        fullscreenMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeMenu = () => {
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Intersection Observer for scroll reveals
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-right');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Suble Parallax on Hero Media Placeholders
    const parallaxElements = document.querySelectorAll('.hero-collage .media-placeholder');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed');
            if (speed) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
});
