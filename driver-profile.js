import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJJA5VUpGujpwRkWY4p4d1WH2Ke9NZ21Q",
    authDomain: "ebus-mbcls.firebaseapp.com",
    databaseURL: "https://ebus-mbcls-default-rtdb.firebaseio.com",
    projectId: "ebus-mbcls",
    storageBucket: "ebus-mbcls.firebasestorage.app",
    messagingSenderId: "336828784236",
    appId: "1:336828784236:web:3ed13745fce3d54baac249",
    measurementId: "G-7YE66HND5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const FIREBASE_URL = "https://ebus-mbcls-default-rtdb.firebaseio.com/travel-details.json";

// Show specific section
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}
window.showSection = showSection;

// Fetch travel details
async function fetchTravelDetails() {
    const travelDetails = document.getElementById("travel-details");
    try {
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) throw new Error("Failed to fetch travel details");
        const data = await response.json();

        travelDetails.innerHTML = "";
        if (data) {
            Object.keys(data).forEach((key, index) => {
                const travel = data[key];
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${travel.busRegNumber}</td>
                    <td>${travel.busType}</td>
                    <td>${travel.date}</td>
                    <td>${travel.from}</td>
                    <td>${travel.to}</td>
                    <td>${travel.startTime}</td>
                    <td>${travel.reachingTime}</td>
                    <td>${travel.contact}</td>
                    <td><button onclick="deleteTravelDetail('${key}')">Delete</button></td>
                `;
                travelDetails.appendChild(row);
            });
        } else {
            travelDetails.innerHTML = "<tr><td colspan='11'>No travel details posted yet.</td></tr>";
        }
    } catch (error) {
        console.error("Error fetching travel details:", error);
        travelDetails.innerHTML = "<tr><td colspan='11'>Error loading data.</td></tr>";
    }
}
window.fetchTravelDetails = fetchTravelDetails;

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const travelID = document.getElementById("travel-id").value || null;
    const busRegNumber = document.getElementById("bus-reg-number").value.trim();
    const busType = document.getElementById("bus-type").value.trim();
    const date = document.getElementById("travel-date").value;
    const from = document.getElementById("from-location").value.trim();
    const to = document.getElementById("to-location").value.trim();
    const startTime = document.getElementById("start-time").value;
    const reachingTime = document.getElementById("reaching-time").value;
    const contact = document.getElementById("contact-details").value.trim();


    const travelDetail = {
        busRegNumber,
        busType,
        date,
        from,
        to,
        startTime,
        reachingTime,
        contact,
    };

    try {
        if (travelID) {
            // Update existing record
            await update(ref(db, `travel-details/${travelID}`), travelDetail);
            alert("Travel details updated successfully!");
        } else {
            // Add new record
            await set(ref(db, `travel-details/${Date.now()}`), travelDetail);
            alert("Travel details added successfully!");
        }

        fetchTravelDetails();
        document.getElementById("post-details-form").reset();
        showSection("view-details-section");
    } catch (error) {
        console.error("Error saving travel details:", error);
        alert("Error saving travel details. Please try again.");
    }
}

// Delete travel detail
async function deleteTravelDetail(travelID) {
    try {
        // Reference the specific travel detail by its ID
        const travelRef = ref(db, `travel-details/${travelID}`);
        await remove(travelRef); // Remove the travel detail
        alert("Travel detail deleted successfully!");
        fetchTravelDetails(); // Refresh the travel details table
    } catch (error) {
        console.error("Error deleting travel detail:", error);
        alert("Error deleting travel detail. Please try again.");
    }
}

window.deleteTravelDetail = deleteTravelDetail;
window.handleFormSubmit = handleFormSubmit;

function logout() {
    alert("You have been logged out.");
    window.location.href = "main.html"; // Redirect to the main.html page
}
window.logout = logout;

// Fetch travel details on page load
fetchTravelDetails();
window.showSection = showSection;