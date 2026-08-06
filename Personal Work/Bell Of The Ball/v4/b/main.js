document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Special handling for service numbers
                if (entry.target.classList.contains('service-info')) {
                    const number = entry.target.querySelector('.service-number');
                    if (number) {
                        setTimeout(() => number.classList.add('is-visible'), 300);
                    }
                }

                // observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, observerOptions);

    // Observe all fade elements
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Special handling for pull quote word-by-word reveal
    const pullQuote = document.querySelector('.quote-text');
    if (pullQuote) {
        const words = pullQuote.innerText.split(' ');
        pullQuote.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.classList.add('quote-word');
            span.innerText = word + ' ';
            span.style.transitionDelay = `${index * 0.1}s`;
            pullQuote.appendChild(span);
        });

        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wordSpans = entry.target.querySelectorAll('.quote-word');
                    wordSpans.forEach(span => span.classList.add('is-visible'));
                }
            });
        }, { threshold: 0.5 });
        
        quoteObserver.observe(pullQuote);
    }
});
