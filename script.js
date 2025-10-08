// Scroll to top when the page loads
document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
});

// Intersection Observer pour afficher les sections au scroll
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".hidden");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});

// Interaction pour la carte .snee-card (si elle existe)
document.addEventListener("DOMContentLoaded", function() {
    const sneeCard = document.querySelector(".snee-card");

    if (sneeCard) {
        sneeCard.addEventListener("click", function() {
            sneeCard.classList.toggle("active");
        });
    }
});

// Interaction pour les cartes de projet (solution 2 : indépendantes)
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Ignorer le clic sur un lien
            if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) return;

            // Toggle uniquement la carte cliquée
            card.classList.toggle('active');
        });
    });
});

