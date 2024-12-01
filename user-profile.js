import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child, query, equalTo } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJJA5VUpGujpwRkWY4p4d1WH2Ke9NZ21Q",
    authDomain: "ebus-mbcls.firebaseapp.com",
    projectId: "ebus-mbcls",
    storageBucket: "ebus-mbcls.firebasestorage.app",
    messagingSenderId: "336828784236",
    appId: "1:336828784236:web:3ed13745fce3d54baac249",
    measurementId: "G-7YE66HND5C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Firebase URL
const FIREBASE_URL = "https://ebus-mbcls-default-rtdb.firebaseio.com/travel-details.json";

// Clear travel details table on page load
function clearTravelDetailsTable() {
    const travelDetailsTable = document.getElementById("travel-details");
    travelDetailsTable.innerHTML = ""; // Clear all rows
}
// Function to retrieve travel details and display all on page load
async function fetchTravelDetails() {
    const travelDetailsTable = document.getElementById("travel-details");
    travelDetailsTable.innerHTML = ""; // Clear existing rows

    try {
        // Fetch all travel details from Firebase
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch travel details.");
        }

        const travelData = await response.json();

        // Check if data exists
        if (!travelData || Object.keys(travelData).length === 0) {
            const noDataRow = document.createElement("tr");
            noDataRow.innerHTML = `<td colspan="8">No travel details available.</td>`;
            travelDetailsTable.appendChild(noDataRow);
        } else {
            // Populate table with travel data
            Object.values(travelData).forEach((travel) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${travel.busRegNumber || "N/A"}</td>
                    <td>${travel.busType || "N/A"}</td>
                    <td>${travel.date || "N/A"}</td>
                    <td>${travel.from || "N/A"}</td>
                    <td>${travel.to || "N/A"}</td>
                    <td>${travel.startTime || "N/A"}</td>
                    <td>${travel.reachingTime || "N/A"}</td>
                    <td>${travel.contact || "N/A"}</td>
                `;
                travelDetailsTable.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching travel details:", error);
        const errorRow = document.createElement("tr");
        errorRow.innerHTML = `<td colspan="8">Error loading travel details. Please try again later.</td>`;
        travelDetailsTable.appendChild(errorRow);
    }
}

// Function to retrieve travel details based on user input
async function searchBusDetails() {
    const startLocation = document.getElementById("start-location").value.trim().toLowerCase();
    const destinationLocation = document.getElementById("destination-location").value.trim().toLowerCase();

    const travelDetailsTable = document.getElementById("travel-details");
    travelDetailsTable.innerHTML = ""; // Clear existing rows

    if (!startLocation || !destinationLocation) {
        alert("Please enter both start and destination locations.");
        return;
    }

    try {
        // Fetch travel details from Firebase
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch travel details.");
        }

        const travelData = await response.json();

        // Filter travel details based on user input
        const filteredDetails = Object.values(travelData || {}).filter(
            (travel) =>
                travel.from.toLowerCase() === startLocation &&
                travel.to.toLowerCase() === destinationLocation
        );

        // Display filtered results in the table
        if (filteredDetails.length === 0) {
            const noResultRow = document.createElement("tr");
            noResultRow.innerHTML = `<td colspan="8">No travel details found for the given locations.</td>`;
            travelDetailsTable.appendChild(noResultRow);
        } else {
            filteredDetails.forEach((travel) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${travel.busRegNumber || "N/A"}</td>
                    <td>${travel.busType || "N/A"}</td>
                    <td>${travel.date || "N/A"}</td>
                    <td>${travel.from || "N/A"}</td>
                    <td>${travel.to || "N/A"}</td>
                    <td>${travel.startTime || "N/A"}</td>
                    <td>${travel.reachingTime || "N/A"}</td>
                    <td>${travel.contact || "N/A"}</td>
                `;
                travelDetailsTable.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error retrieving travel details:", error);
        alert("An error occurred while retrieving travel details. Please try again.");
    }
}

// Logout function
function logout() {
    alert("You have been logged out.");
    window.location.href = "main.html"; // Redirect to login page
}

// Attach functions to the global scope
window.fetchTravelDetails = fetchTravelDetails;
window.searchBusDetails = searchBusDetails;
window.logout = logout;

// Fetch all travel details on page load
fetchTravelDetails();
