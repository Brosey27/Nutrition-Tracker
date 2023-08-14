// script.js
const mealInput = document.getElementById('meal');
const caloriesInput = document.getElementById('calories');
const fiberInput = document.getElementById('fiber');
const proteinInput = document.getElementById('protein');
const carbsInput = document.getElementById('carbs');
const addEntryButton = document.getElementById('addEntry');
const entryList = document.getElementById('entryList');
entryList.addEventListener('click', deleteEntry);
const entries = [];

function deleteEntry(event) {
    if (event.target.classList.contains('delete-entry')) {
      const entryIndex = parseInt(event.target.dataset.index, 10);
      entries.splice(entryIndex, 1); // Remove the entry from the entries array
      updateUI();
    }
  }

addEntryButton.addEventListener('click', addEntry);



function addEntry() {
    const meal = mealInput.value;
    const calories = parseInt(caloriesInput.value, 10);
    const fiber = parseFloat(fiberInput.value);
    const protein = parseFloat(proteinInput.value);
    const carbs = parseFloat(carbsInput.value);
  
    if (meal && !isNaN(calories) && !isNaN(fiber) && !isNaN(protein) && !isNaN(carbs)) {
      const entry = { meal, calories, fiber, protein, carbs };
      displayEntry(entry, entries.length); // Pass the index
      entries.push(entry); // Add the new entry to the array
      clearInputs(); // Call the clearInputs function
    } else {
      console.log('Invalid input for entry.');
    }
  }
  
  // Define the clearInputs function
  function clearInputs() {
    mealInput.value = '';
    caloriesInput.value = '';
    fiberInput.value = '';
    proteinInput.value = '';
    carbsInput.value = '';
  }
  
  function displayEntry(entry, index) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${entry.meal}</strong> - Calories: ${entry.calories}, Fiber: ${entry.fiber}g, Protein: ${entry.protein}g, Carbs: ${entry.carbs}g
    `;
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-entry';
    deleteButton.dataset.index = index; // Store the index of the entry
    listItem.appendChild(deleteButton);
  
    entryList.appendChild(listItem);
  }
  
  function updateUI() {
    entryList.innerHTML = '';
  
    entries.forEach((entry, index) => {
      displayEntry(entry, index);
    });
  }