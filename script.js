// script.js
const mealInput = document.getElementById('meal');
const caloriesInput = document.getElementById('calories');
const fiberInput = document.getElementById('fiber');
const proteinInput = document.getElementById('protein');
const carbsInput = document.getElementById('carbs');
const addEntryButton = document.getElementById('addEntry');
const entryList = document.getElementById('entryList');

addEntryButton.addEventListener('click', addEntry);

function addEntry() {
  const meal = mealInput.value;
  const calories = parseInt(caloriesInput.value, 10);
  const fiber = parseFloat(fiberInput.value);
  const protein = parseFloat(proteinInput.value);
  const carbs = parseFloat(carbsInput.value);

  if (meal && !isNaN(calories) && !isNaN(fiber) && !isNaN(protein) && !isNaN(carbs)) {
    const entry = { meal, calories, fiber, protein, carbs };
    displayEntry(entry);
    clearInputs();
  } else {
    console.log('Invalid input for entry.');
  }
}

function displayEntry(entry) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <strong>${entry.meal}</strong> - Calories: ${entry.calories}, Fiber: ${entry.fiber}g, Protein: ${entry.protein}g, Carbs: ${entry.carbs}g
  `;
  entryList.appendChild(listItem);
}

function clearInputs() {
  mealInput.value = '';
  caloriesInput.value = '';
  fiberInput.value = '';
  proteinInput.value = '';
  carbsInput.value = '';
}
