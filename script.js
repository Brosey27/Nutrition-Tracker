// script.js
const mealInput = document.getElementById('meal');
const ingredientsInput = document.getElementById('ingredients');
const addEntryButton = document.getElementById('addEntry');
const entryList = document.getElementById('entryList');
const totalCaloriesElement = document.getElementById('totalCalories');

let entries = [];
let totalCalories = 0;

addEntryButton.addEventListener('click', addEntry);

function addEntry() {
  const meal = mealInput.value;
  const ingredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());
  const calories = calculateCalories(ingredients);

  if (meal && ingredients.length > 0) {
    const entry = { meal, ingredients, calories };
    entries.push(entry);
    updateUI();
    resetInputs();
  }
}

function calculateCalories(ingredients) {
  // Calculate calories based on ingredients (simplified for example)
  return ingredients.length * 50;
}

function updateUI() {
  entryList.innerHTML = '';
  totalCalories = 0;

  entries.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${entry.meal} - ${entry.calories} calories`;
    entryList.appendChild(listItem);

    totalCalories += entry.calories;
  });

  totalCaloriesElement.textContent = totalCalories;
}

function resetInputs() {
  mealInput.value = '';
  ingredientsInput.value = '';
}
