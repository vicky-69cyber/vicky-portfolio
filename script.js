document.addEventListener("DOMContentLoaded", () => {

    /* ===== Mobile menu ===== */
    const headerNav = document.querySelector(".header .nav");
    const navLinks = document.querySelector(".nav-links");

    const navToggle = document.createElement("button");
    navToggle.className = "mobile-toggle";
    navToggle.innerHTML = "☰";
    headerNav.appendChild(navToggle);

    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        navToggle.innerHTML =
            navLinks.classList.contains("show") ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            navToggle.innerHTML = "☰";
        });
    });

    /* ===== Header shadow on scroll ===== */
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });

    /* ===== Scroll reveal ===== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document
        .querySelectorAll(".card, .work-card, .contact-btn")
        .forEach(el => observer.observe(el));

    /* ===== Dynamic year ===== */
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ===== Contact form UX (works with Firebase) ===== */
    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", () => {
            statusText.textContent = "⏳ Sending message...";
        });
    }

});
