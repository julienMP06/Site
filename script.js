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

// 🔹 Nouveau : ouverture des cartes de projet dans un modal
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalLink = document.getElementById("modalLink");
    const closeBtn = document.querySelector(".modal .close");

    const cards = document.querySelectorAll("#projects .card");

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Ignorer le clic sur un lien
            if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) return;

            modal.style.display = "flex";
            modalTitle.textContent = card.querySelector("h3").textContent;

            const img = card.querySelector("img");
            modalImage.src = img ? img.src : "";

            // Prendre le contenu caché si présent sinon la description courte
            const hiddenContent = card.querySelector(".hidden-content");
            if (hiddenContent && hiddenContent.innerHTML.trim() !== "") {
                modalDescription.innerHTML = hiddenContent.innerHTML;
            } else {
                const shortDesc = card.querySelector("p");
                modalDescription.textContent = shortDesc ? shortDesc.textContent : "";
            }

            const link = card.querySelector("a");
            if(link) {
                modalLink.href = link.href;
                modalLink.style.display = "inline-block";
            } else {
                modalLink.style.display = "none";
            }
        });
    });

    // Fermer le modal
    closeBtn.addEventListener("click", () => modal.style.display = "none");

    // Fermer si clic en dehors
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});

// 🔍 Filtrage des projets par catégorie
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#projects .card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
