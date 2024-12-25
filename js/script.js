// Attendre le chargement complet du DOM pour garantir que les éléments sont accessibles
window.addEventListener("DOMContentLoaded", () => {
    // Sélectionner tous les produits (cartes) et l'élément affichant le prix total
    const products = document.querySelectorAll(".card");
    const totalPriceElement = document.querySelector(".total");

    // Initialiser la variable pour le prix total
    let totalPrice = 0;

    // Parcourir chaque produit pour attacher les événements nécessaires
    products.forEach((product) => {
        // Sélection des boutons et des éléments associés à chaque produit
        const plusButton = product.querySelector(".fa-plus-circle"); // Bouton "ajouter"
        const minusButton = product.querySelector(".fa-minus-circle"); // Bouton "réduire"
        const deleteButton = product.querySelector(".fa-trash-alt"); // Bouton "supprimer"
        const heartButton = product.querySelector(".fa-heart"); // Bouton "favori"
        const quantityElement = product.querySelector(".quantity"); // Élément pour la quantité
        const unitPriceElement = product.querySelector(".unit-price"); // Élément pour le prix unitaire

        // Initialiser la quantité et convertir le prix unitaire en nombre entier
        let quantity = 0;
        const unitPrice = parseInt(unitPriceElement.textContent.replace("$", ""));

        // Fonction pour mettre à jour le prix total affiché dans le DOM
        const updateTotalPrice = () => {
            totalPriceElement.textContent = `${totalPrice} $`;
        };

        // Ajouter un produit lorsque le bouton "plus" est cliqué
        plusButton.addEventListener("click", () => {
            quantity++; // Incrémenter la quantité
            quantityElement.textContent = quantity; // Mettre à jour l'affichage de la quantité
            totalPrice += unitPrice; // Ajouter le prix unitaire au total
            updateTotalPrice(); // Mettre à jour le prix total affiché
        });

        // Réduire la quantité lorsque le bouton "moins" est cliqué
        minusButton.addEventListener("click", () => {
            if (quantity > 0) { // Assurer que la quantité reste positive
                quantity--; // Décrémenter la quantité
                quantityElement.textContent = quantity; // Mettre à jour l'affichage de la quantité
                totalPrice -= unitPrice; // Soustraire le prix unitaire du total
                updateTotalPrice(); // Mettre à jour le prix total affiché
            }
        });

        // Supprimer le produit du panier lorsque le bouton "supprimer" est cliqué
        deleteButton.addEventListener("click", () => {
            totalPrice -= quantity * unitPrice; // Réduire le total en fonction de la quantité et du prix unitaire
            quantity = 0; // Réinitialiser la quantité
            updateTotalPrice(); // Mettre à jour le prix total affiché
            product.remove(); // Supprimer le produit du DOM
        });

        // Ajouter ou retirer le produit des favoris lorsque le bouton "cœur" est cliqué
        heartButton.addEventListener("click", () => {
            heartButton.classList.toggle("liked"); // Ajouter ou retirer la classe "liked"
            // Changer la couleur en fonction de l'état "liked"
            heartButton.style.color = heartButton.classList.contains("liked") ? "#de6b5c" : "black";
        });
    });
});
