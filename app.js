// Data initialization
let stalls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38];
let bookings = [];

// DOM references
let companyInput, stallSelect, bookingForm, alertBox, bookingTableBody, bookBtn;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  companyInput = document.getElementById("companyInput");
  stallSelect = document.getElementById("stallSelect");
  bookingForm = document.getElementById("bookingForm");
  alertBox = document.getElementById("alertBox");
  bookingTableBody = document.querySelector("#bookingTable tbody");
  bookBtn = document.getElementById("bookBtn");

  // Populate dropdown initially
  populateDropdown();

  // Add form submit handler
  bookingForm.addEventListener("submit", handleFormSubmit);
});

// Populate dropdown with available stalls
function populateDropdown() {
  // Clear existing options
  stallSelect.innerHTML = "";
  
  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose a stall...";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  stallSelect.appendChild(defaultOption);

  // Get booked stalls
  const bookedStalls = bookings.map(b => b.stall);
  
  // Add available stalls
  stalls.forEach(stallNum => {
    if (!bookedStalls.includes(stallNum)) {
      const option = document.createElement("option");
      option.value = stallNum;
      option.textContent = `Stall ${stallNum}`;
      stallSelect.appendChild(option);
    }
  });

  // Check if all stalls are booked
  const availableStalls = stalls.filter(s => !bookedStalls.includes(s));
  if (availableStalls.length === 0) {
    disableForm();
    showAlert("All stalls booked", "info");
  } else {
    enableForm();
  }
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const company = companyInput.value.trim();
  const stallValue = stallSelect.value;

  // Clear any existing alerts
  clearAlerts();

  // Validation
  if (!company) {
    showAlert("Company name is required.", "error");
    return;
  }
  
  if (!stallValue) {
    showAlert("Please select a stall.", "error");
    return;
  }

  const stall = parseInt(stallValue);

  // Disable form temporarily
  disableForm();

  // Process booking
  setTimeout(() => {
    const timestamp = Date.now();
    const booking = { company, stall, time: timestamp };
    
    bookings.push(booking);
    addBookingToTable(booking);
    showAlert(`Success! ${company} booked Stall ${stall}.`, "success");
    
    // Reset form
    companyInput.value = "";
    stallSelect.selectedIndex = 0;
    
    // Update dropdown
    populateDropdown();
  }, 100);
}

// Add booking to table
function addBookingToTable(booking) {
  const row = document.createElement("tr");
  
  const indexCell = document.createElement("td");
  indexCell.textContent = bookings.length;
  
  const companyCell = document.createElement("td");
  companyCell.textContent = booking.company;
  
  const stallCell = document.createElement("td");
  stallCell.textContent = booking.stall;
  
  const timeCell = document.createElement("td");
  timeCell.textContent = new Date(booking.time).toLocaleString();
  
  row.appendChild(indexCell);
  row.appendChild(companyCell);
  row.appendChild(stallCell);
  row.appendChild(timeCell);
  
  bookingTableBody.appendChild(row);
}

// Show alert message
function showAlert(message, type) {
  const alert = document.createElement("div");
  alert.className = `alert alert--${type}`;
  
  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;
  alert.appendChild(messageSpan);
  
  const closeBtn = document.createElement("button");
  closeBtn.className = "alert__close";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => alert.remove();
  alert.appendChild(closeBtn);
  
  alertBox.appendChild(alert);
}

// Clear alerts
function clearAlerts() {
  alertBox.innerHTML = "";
}

// Disable form
function disableForm() {
  companyInput.disabled = true;
  stallSelect.disabled = true;
  bookBtn.disabled = true;
  bookingForm.classList.add("form-disabled");
}

// Enable form
function enableForm() {
  companyInput.disabled = false;
  stallSelect.disabled = false;
  bookBtn.disabled = false;
  bookingForm.classList.remove("form-disabled");
}