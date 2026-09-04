const navOpen = document.getElementById("nav-open");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");

function toggleMenu(forceClose = false) {
    if (forceClose) {
        navMenu.classList.remove("show");
        return;
    }
    navMenu.classList.toggle("show");
}

navToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
});

navLinks.forEach((link) =>
    link.addEventListener("click", () => toggleMenu(true))
);

document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMenu(true);
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 12) header?.classList.add("is-scrolled");
    else header?.classList.remove("is-scrolled");
}, { passive: true });

const revealEls = document.querySelectorAll("[data-reveal]");
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
revealEls.forEach((el) => revealObserver.observe(el));

const sections = ["about", "skills", "projects", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
const navBySection = new Map();
document.querySelectorAll(".nav__link[data-nav]").forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    if (id) navBySection.set(id, link);
});

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const link = navBySection.get(entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
                document
                    .querySelectorAll(".nav__link.is-active")
                    .forEach((el) => el.classList.remove("is-active"));
                link.classList.add("is-active");
            }
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
    });
});
