document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle.classList.contains('open')) {
                mobileToggle.classList.remove('open');
                navLinks.classList.remove('active');
            }
        });
    });

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    const heroContent = document.querySelector('.hero-content');
    const heroMedia = document.querySelector('.hero-media');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger hero animations immediately on load
    setTimeout(() => {
        if(heroContent) heroContent.classList.add('active');
        if(heroMedia) heroMedia.classList.add('active');
    }, 100);

    // Parallax effect for hero media
    const heroSection = document.getElementById('hero');
    const frontCard = document.querySelector('.front-card');
    const backCard = document.querySelector('.back-card');

    if (heroSection && frontCard && backCard) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;

            frontCard.style.transform = `translateY(-10px) rotate(2deg) translate(${x}px, ${y}px)`;
            backCard.style.transform = `rotate(-6deg) translateZ(-50px) translate(${x * 0.5}px, ${y * 0.5}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            frontCard.style.transform = 'translateY(0) rotate(0)';
            backCard.style.transform = 'rotate(-6deg) translateZ(-50px)';
        });
    }
});
