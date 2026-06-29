document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    const setHeaderState = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    const closeMenu = () => {
        menuToggle?.classList.remove("active");
        navbar?.classList.remove("open");
        document.body.classList.remove("nav-open");
        menuToggle?.setAttribute("aria-expanded", "false");
    };

    menuToggle?.addEventListener("click", () => {
        const isOpen = navbar?.classList.toggle("open");
        menuToggle.classList.toggle("active", Boolean(isOpen));
        document.body.classList.toggle("nav-open", Boolean(isOpen));
        menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });

    window.addEventListener("scroll", setHeaderState, { passive: true });
    setHeaderState();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const delay = entry.target.dataset.delay;
            if (delay) {
                entry.target.style.transitionDelay = delay;
            }

            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -6% 0px"
    });

    document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
        revealObserver.observe(element);
    });
});
