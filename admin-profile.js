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
    measurementId: "G-7YE66HND5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const FIREBASE_URL = "https://ebus-mbcls-default-rtdb.firebaseio.com/driver-login.json";

// Fetch drivers from Firebase
async function fetchDrivers() {
    const driversData = document.getElementById("drivers-data");
    try {
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) throw new Error("Failed to fetch drivers");
        const data = await response.json();

        // Clear existing rows
        driversData.innerHTML = "";

        if (data) {
            Object.keys(data).forEach((key, index) => {
                const driver = data[key];
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${driver.name}</td>
                    <td>${driver.email}</td>
                    <td>${driver.license}</td>
                `;
                driversData.appendChild(row);
            });
        } else {
            driversData.innerHTML = "<tr><td colspan='4'>No drivers registered yet.</td></tr>";
        }
    } catch (error) {
        console.error("Error fetching drivers:", error);
        driversData.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
    }
}

// Add a new driver to Firebase
document.getElementById("add-driver-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("driver-name").value.trim();
    const email = document.getElementById("driver-email").value.trim();
    const license = document.getElementById("driver-license").value.trim();
    const password = document.getElementById("driver-password").value.trim();

    if (name && email && license) {
        const newDriver = { name, email, license, password };

        try {
            const response = await fetch(FIREBASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDriver),
            });

            if (response.ok) {
                alert("Driver added successfully!");
                fetchDrivers(); // Refresh the drivers list
                document.getElementById("add-driver-form").reset(); // Clear the form
            } else {
                throw new Error("Failed to add driver");
            }
        } catch (error) {
            console.error("Error adding driver:", error);
            alert("Error adding driver. Please try again.");
        }
    } else {
        alert("Please fill in all fields.");
    }
});

// Fetch drivers on page load
fetchDrivers();
