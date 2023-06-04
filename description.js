// Get the logout element
const logoutButton = document.getElementById("logout");

// Check if token exists in localStorage
const token = JSON.parse(localStorage.getItem("token"));
if (token) {
  logoutButton.innerText = "LogOut";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  });
}

// Function to show or hide the table based on user input
function showTable() {
  const table = document.querySelector("table");
  const moreDetailsButton = document.querySelector('button[type="button"]');
  const boardingValue = document.getElementById("Boarding").value.trim();
  const destinationValue = document.getElementById("Destination").value.trim();

  if (boardingValue !== "" && destinationValue !== "") {
    table.style.display = "block";
    moreDetailsButton.style.display = "none";

    // Update the table with boarding and destination values
    const boardingCell = document.querySelectorAll('td:nth-child(2)');
    const destinationCell = document.querySelectorAll('td:nth-child(4)');

    boardingCell.forEach(cell => cell.innerText = boardingValue);
    destinationCell.forEach(cell => cell.innerText = destinationValue);
  } else {
    alert("Please enter both boarding and destination names.");
  }
}

// Function to submit the form
function submitForm(event) {
  event.preventDefault();

  const selectedFlight = document.querySelector('input[type="radio"]:checked');
  if (selectedFlight) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const boarding = document.getElementById("Boarding").value.trim();
    const destination = document.getElementById("Destination").value.trim();
    const destinationDate = document.getElementById("ddate").value.trim();

    if (
      name !== "" &&
      email !== "" &&
      age !== "" &&
      boarding !== "" &&
      destination !== "" &&
      destinationDate !== ""
    ) {
      const obj = {
        id: Date.now(),
        name: name,
        email: email,
        age: age,
        boarding: boarding,
        destination: destination,
        selectedFlight: selectedFlight.id
      };

      fetch("http://localhost:8080/ticket-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then((response) => {
          if (response.ok) {
            alert("Ticket Booked Successfully");
            return response.json();
          } else {
            throw new Error("Error occurred while submitting the form.");
          }
        })
        .then((data) => {
          // Process the response data if needed
          // Redirect to rewards.html after processing
          localStorage.setItem("bookid",JSON.stringify(data.id));
          window.location.href = "./rewards.html";
        });
        // .catch((error) => {
        //   console.log(error);
        //   alert("Error occurred while submitting the form.");
        // });
    } else {
      alert("Please fill in all the details to confirm the ticket.");
    }
  } else {
    alert("Please select a flight from the table.");
  }
}

// Hide the table initially
const table = document.querySelector("table");
table.style.display = "none";

// Add event listener to the "Click more details" button
const moreDetailsButton = document.querySelector('button[type="button"]');
moreDetailsButton.addEventListener("click", showTable);

// Add event listener to the "Book Ticket" button
const bookTicketButton = document.querySelector('button[type="submit"]');
bookTicketButton.addEventListener("click", submitForm);

// 


window.onscroll = function() {
  showScrollUpButton();
};

function showScrollUpButton() {
  var scrollButton = document.getElementById("scrollUpButton");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}