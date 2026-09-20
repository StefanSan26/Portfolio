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

const spyTargets = [...document.querySelectorAll(".nav__link[data-nav]")]
    .map((link) => ({
        link,
        section: document.getElementById(
            link.getAttribute("href").replace("#", "")
        ),
    }))
    .filter((t) => t.section)
    .sort((a, b) => a.section.offsetTop - b.section.offsetTop);

// Holds the link you clicked, because the last sections share the final
// screenful — without this, clicking "Stack" would light up "Contact".
let lockedLink = null;

navLinks.forEach((link) =>
    link.addEventListener("click", () => {
        lockedLink = link;
        updateActiveLink();
    })
);

// pointerdown covers dragging the scrollbar, which fires no wheel event
["wheel", "touchstart", "keydown", "pointerdown"].forEach((evt) =>
    window.addEventListener(
        evt,
        () => {
            lockedLink = null;
        },
        { passive: true }
    )
);

function updateActiveLink() {
    const line = window.innerHeight * 0.32;
    let current = spyTargets.find((t) => t.link === lockedLink) ?? null;

    if (!lockedLink) {
        for (const t of spyTargets) {
            if (t.section.getBoundingClientRect().top <= line) current = t;
        }
        // the last section is too short to ever reach the line on its own
        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;
        if (atBottom) current = spyTargets[spyTargets.length - 1];
    }

    spyTargets.forEach((t) =>
        t.link.classList.toggle("is-active", t === current)
    );
}

let spyQueued = false;
function queueActiveLink() {
    if (spyQueued) return;
    spyQueued = true;
    requestAnimationFrame(() => {
        spyQueued = false;
        updateActiveLink();
    });
}

window.addEventListener("scroll", queueActiveLink, { passive: true });
window.addEventListener("resize", queueActiveLink);
updateActiveLink();
