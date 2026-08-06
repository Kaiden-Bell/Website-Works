document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const fadeUpElements = document.querySelectorAll(".fade-up");

    // Scroll listener for header blur
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Intersection Observer for scroll-triggered fade-ups
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Unobserve after fade in
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(element => {
        observer.observe(element);
    });
});
