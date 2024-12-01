import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

// Handle form submission
document.getElementById('driver-login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('driver-username').value.trim();
    const password = document.getElementById('driver-password').value.trim();
    const errorMessage = document.getElementById('login-error');

    // Validate input fields
    if (!username || !password) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    try {
        // Fetch the driver-login data from Firebase
        const response = await fetch("https://ebus-mbcls-default-rtdb.firebaseio.com/driver-login.json");

        if (!response.ok) {
            throw new Error("Failed to fetch data from Firebase.");
        }

        const drivers = await response.json();

        if (drivers) {
            // Check if credentials match any record in the driver-login collection
            let isValid = false;

            for (const key in drivers) {
                const driver = drivers[key];
                if (driver.email === username && driver.password === password) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                alert("Login successful!");
                window.location.href = "driver-profile.html"; // Redirect to driver profile
            } else {
                errorMessage.textContent = "Invalid username or password!";
            }
        } else {
            errorMessage.textContent = "No driver data found!";
        }
    } catch (error) {
        console.error("Error validating login:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
    }
});
