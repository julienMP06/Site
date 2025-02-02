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

document.addEventListener("DOMContentLoaded", function() {
    const sneeCard = document.querySelector(".snee-card");

    // Vérifie si la carte existe
    if (sneeCard) {
        sneeCard.addEventListener("click", function() {
            sneeCard.classList.toggle("active");
        });
    }
});


// Interaction pour les cartes de projet (si nécessaire)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});
