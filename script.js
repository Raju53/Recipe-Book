// --- DOM Elements ---
const recipeForm = document.getElementById('recipe-form');
const recipeNameInput = document.getElementById('recipe-name');
const recipeImageInput = document.getElementById('recipe-image');
const recipeIngredientsInput = document.getElementById('recipe-ingredients');
const recipeInstructionsInput = document.getElementById('recipe-instructions');
const recipesContainer = document.getElementById('recipes-container');
const searchInput = document.getElementById('search-input');

// Modal elements
const recipeDetailModal = document.getElementById('recipe-detail-modal');
const detailName = document.getElementById('detail-name');
const detailImage = document.getElementById('detail-image');
const detailIngredients = document.getElementById('detail-ingredients');
const detailInstructions = document.getElementById('detail-instructions');
const closeButton = document.querySelector('.close-button');

// --- Global Variables ---
let recipes = []; // This array will hold all our recipe objects

// --- Helper Functions ---

/**
 * Loads recipes from localStorage.
 * @returns {Array} An array of recipe objects.
 */
function loadRecipes() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        try {
            recipes = JSON.parse(storedRecipes);
        } catch (e) {
            console.error("Error parsing recipes from localStorage:", e);
            recipes = []; // Reset if corrupted
        }
    } else {
        recipes = []; // No recipes found, start with an empty array
    }
    displayRecipes(recipes); // Display loaded recipes immediately
}

/**
 * Saves the current recipes array to localStorage.
 */
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Displays a list of recipes in the recipes container.
 * @param {Array} recipesToDisplay - The array of recipe objects to display.
 */
function displayRecipes(recipesToDisplay) {
    recipesContainer.innerHTML = ''; // Clear existing recipes

    if (recipesToDisplay.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Add one above or adjust your search!</p>';
        return;
    }

    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.id = recipe.id; // Store ID for easy lookup

        // Fallback image if URL is empty or invalid
        const imageUrl = recipe.image || 'https://placehold.co/400x180/E5E7EB/6B7280?text=No+Image';

        recipeCard.innerHTML = `
            <img src="${imageUrl}" alt="${recipe.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x180/E5E7EB/6B7280?text=No+Image';">
            <div class="recipe-card-content">
                <h3>${recipe.name}</h3>
                <p>${recipe.ingredients[0] ? recipe.ingredients[0].substring(0, 50) + '...' : 'No ingredients listed.'}</p>
            </div>
        `;

        // Event listener to view full details when card is clicked
        recipeCard.addEventListener('click', () => showRecipeDetails(recipe.id));
        recipesContainer.appendChild(recipeCard);
    });
}

/**
 * Generates a unique ID for a new recipe.
 * @returns {string} A unique ID.
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Shows the detailed view of a specific recipe in a modal.
 * @param {string} id - The ID of the recipe to display.
 */
function showRecipeDetails(id) {
    const recipe = recipes.find(r => r.id === id);

    if (!recipe) {
        console.error("Recipe not found for ID:", id);
        return;
    }

    detailName.textContent = recipe.name;
    detailImage.src = recipe.image || 'https://placehold.co/600x300/E5E7EB/6B7280?text=No+Image+Available';
    detailImage.alt = recipe.name;

    // Populate ingredients list
    detailIngredients.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        detailIngredients.appendChild(li);
    });

    // Populate instructions list
    detailInstructions.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        detailInstructions.appendChild(li);
    });

    recipeDetailModal.style.display = 'flex'; // Show the modal
}

/**
 * Hides the recipe detail modal.
 */
function hideRecipeDetails() {
    recipeDetailModal.style.display = 'none';
}

// --- Event Listeners ---

// Handle form submission to add a new recipe
recipeForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)

    const name = recipeNameInput.value.trim();
    const image = recipeImageInput.value.trim();
    const ingredients = recipeIngredientsInput.value.split('\n').map(item => item.trim()).filter(item => item !== '');
    const instructions = recipeInstructionsInput.value.split('\n').map(item => item.trim()).filter(item => item !== '');

    // Basic validation
    if (!name || ingredients.length === 0 || instructions.length === 0) {
        alert("Please fill in all required fields (Name, Ingredients, and Preparation Steps).");
        return;
    }

    const newRecipe = {
        id: generateUniqueId(), // Assign a unique ID
        name,
        image,
        ingredients,
        instructions
    };

    recipes.push(newRecipe); // Add new recipe to our array
    saveRecipes(); // Save the updated array to localStorage
    displayRecipes(recipes); // Re-display all recipes (including the new one)

    // Clear the form
    recipeForm.reset();
});

// Handle search input (will be expanded in a later step)
searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
    displayRecipes(filteredRecipes);
});

// Close modal when close button is clicked
closeButton.addEventListener('click', hideRecipeDetails);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === recipeDetailModal) {
        hideRecipeDetails();
    }
});

// --- Initial Load ---
// Load recipes when the page first loads
document.addEventListener('DOMContentLoaded', loadRecipes);
