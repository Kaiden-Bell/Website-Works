document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Slight delay for the outline for a smoother effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect on links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(225, 29, 43, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Split text for hero animation
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(text => {
        const chars = text.textContent.split('');
        text.textContent = '';
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            span.style.animationDelay = `${i * 0.1}s`;
            text.appendChild(span);
        });
    });

    // Animate hero text chars
    setTimeout(() => {
        const chars = document.querySelectorAll('.char');
        chars.forEach((char, i) => {
            char.animate([
                { opacity: 0, transform: 'translateY(100px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 800,
                delay: i * 50,
                easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                fill: 'forwards'
            });
        });
    }, 300);

    // Scroll Reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up');
    
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

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
