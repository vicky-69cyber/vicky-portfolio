/* ===============================
   FIREBASE SETUP (ES MODULE CDN)
================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 REAL FIREBASE CONFIG */
const firebaseConfig = {
    apiKey: "AIzaSyDwjxV-1n0kZmoG_xM83lIq6yqWii0R54s",
    authDomain: "vicky-portfolio-a99d3.firebaseapp.com",
    projectId: "vicky-portfolio-a99d3",
    storageBucket: "vicky-portfolio-a99d3.appspot.com",
    messagingSenderId: "104806431212",
    appId: "1:104806431212:web:e131c2b67eaa6d0ac98871"
};

// Initialize Firebase (ONCE)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ===============================
   MAIN SCRIPT
================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ===== Mobile Menu ===== */
    const headerNav = document.querySelector(".header .nav");
    const navLinks = document.querySelector(".nav-links");

    if (headerNav && navLinks) {
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
    }

    /* ===== Header Shadow ===== */
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 10);
        });
    }

    /* ===== Scroll Reveal ===== */
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document
        .querySelectorAll(".card, .work-card")
        .forEach(el => observer.observe(el));

    /* ===== Dynamic Year ===== */
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ===== CONTACT FORM → FIREBASE ===== */
    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("formStatus");

    if (form && statusText) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                statusText.textContent = "❌ Please fill all fields";
                return;
            }

            statusText.textContent = "⏳ Sending message...";

            try {
                await addDoc(collection(db, "messages"), {
                    name,
                    email,
                    message,
                    createdAt: serverTimestamp()
                });

                statusText.textContent = "✅ Message sent successfully!";
                form.reset();

            } catch (error) {
                console.error("Firebase Error:", error);
                statusText.textContent = "❌ Failed to send message.";
            }
        });
    }
});
