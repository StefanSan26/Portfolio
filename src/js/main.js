const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");

function setMenu(open) {
    navMenu.classList.toggle("show", open);
    navToggle.setAttribute("aria-expanded", String(open));
}

navToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenu(!navMenu.classList.contains("show"));
});

navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        setMenu(false);
    }
});

window.addEventListener(
    "scroll",
    () => {
        if (window.scrollY > 12) header?.classList.add("is-scrolled");
        else header?.classList.remove("is-scrolled");
    },
    { passive: true }
);

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
navBySection.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
});
