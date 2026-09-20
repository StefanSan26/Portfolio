import Lenis from "lenis";

// inertial scrolling is a vestibular trigger, so it stays opt-out
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

if (!reduceMotion) {
    const lenis = new Lenis({ duration: 1.1 });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Lenis owns the scroll position, so in-page links go through it
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            lenis.scrollTo(target, { offset: -20 });
        });
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => revealObserver.observe(el));
