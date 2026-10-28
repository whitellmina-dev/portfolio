// Smooth scrolling 
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener("click", function(event) {
        const targetId = this.getAttribute("href");
        const targetSection = targetId.length > 1
            ? document.querySelector(targetId)
            : null;

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* Active Navigation */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

function updateActiveNavigation() {
    let currentSection = "home";

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);

/* Project Search */

const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");

if (projectSearch) {
    projectSearch.addEventListener("input", function() {
        const searchText = projectSearch.value.toLowerCase().trim();

        projectCards.forEach(function(card) {
            const projectText = card.textContent.toLowerCase();

            if (projectText.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Mobile Navigation Menu
const menuToggle = document.getElementById("menuToggle");
const mobileNavLinks = document.getElementById("navLinks");

if (menuToggle && mobileNavLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mobileNavLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu after clicking a link
    mobileNavLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mobileNavLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

/* Contact Form */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value;

        const emailSubject = encodeURIComponent(subject || "Portfolio Enquiry");
        const emailBody = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        window.location.href =
            "mailto:whitellminavp@gmail.com?subject=" +
            emailSubject + "&body=" + emailBody;
    });
}
