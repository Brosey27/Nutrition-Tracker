// script.js
const mealInput = document.getElementById('meal');
const caloriesInput = document.getElementById('calories');
const fiberInput = document.getElementById('fiber');
const proteinInput = document.getElementById('protein');
const carbsInput = document.getElementById('carbs');
const addEntryButton = document.getElementById('addEntry');
const entryList = document.getElementById('entryList');
entryList.addEventListener('click', deleteEntry);
const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
let entries = storedEntries;

updateUI();

entryList.addEventListener('click', deleteEntry);

function deleteEntry(event) {
  if (event.target.classList.contains('delete-entry')) {
    const entryIndex = parseInt(event.target.dataset.index, 10);
    entries.splice(entryIndex, 1); // Remove the entry from the entries array
    updateUI();
    saveEntriesToLocalStorage(); // Save updated entries to localStorage
  }
}

addEntryButton.addEventListener('click', addEntry);

function addEntry() {
    const meal = mealInput.value;
    const calories = parseInt(caloriesInput.value);
    const fiber = parseFloat(fiberInput.value);
    const protein = parseFloat(proteinInput.value);
    const carbs = parseFloat(carbsInput.value);
    const rawDate = document.getElementById('date').value; // Get the selected date in yyyy-mm-dd format
    const dateParts = rawDate.split('-'); // Split the date into parts
  
    if (meal && !isNaN(calories) && !isNaN(fiber) && !isNaN(protein) && !isNaN(carbs) && rawDate) {
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0].substring(2)}`;
      const entry = {
        meal,
        calories,
        fiber,
        protein,
        carbs,
        date: formattedDate
      };
      entries.push(entry); // Add the new entry to the array
      clearInputs();
      updateUI();
      saveEntriesToLocalStorage(); // Save updated entries to localStorage
    } else {
      console.log('Invalid input for entry.');
    }
  }
  
  
  function saveEntriesToLocalStorage() {
    localStorage.setItem('entries', JSON.stringify(entries));
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
  
    // Create a div to hold the date and meal name
    const entryHeader = document.createElement('div');
    entryHeader.className = 'entry-header';
    entryHeader.innerHTML = `
      <strong>Date: ${entry.date}</strong> - ${entry.meal}
    `;
  
    // Create a button for deleting the entry
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-entry';
    deleteButton.dataset.index = index; // Store the index of the entry
  
    listItem.appendChild(entryHeader);
    listItem.appendChild(deleteButton);
    
    // Create a canvas for the pie chart
    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = `chart-${index}`;
    chartCanvas.width = 200;
    chartCanvas.height = 200;
  
    listItem.appendChild(chartCanvas);
  
    entryList.appendChild(listItem);
  
    createPieChart(entry, index); // Create the pie chart
  }
  
  
  function updateUI() {
    entryList.innerHTML = '';
  
    entries.forEach((entry, index) => {
      displayEntry(entry, index);
    });
  }

  function createPieChart(entry, index) {
    const chartElement = document.getElementById(`chart-${index}`);
    const ctx = chartElement.getContext('2d');
  
    const data = {
      labels: ['Calories', 'Fiber', 'Protein', 'Carbs'],
      datasets: [{
        data: [entry.calories, entry.fiber, entry.protein, entry.carbs],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
      }]
    };
  
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `${label}: ${value}g`;
            }
          }
        }
      }
    });
  }
  