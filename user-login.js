import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

// Firebase URL for users data
const usersUrl = "https://ebus-mbcls-default-rtdb.firebaseio.com/users.json";

// Get the login form and error message elements
const form = document.getElementById("user-login-form");
const errorMessage = document.getElementById("user-error");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the values entered by the user
    const username = document.getElementById("user-username").value.trim();
    const password = document.getElementById("user-password").value.trim();

    // Check if the fields are empty
    if (username === '' || password === '') {
        errorMessage.textContent = 'Both fields are required!';
        return;
    }

    try {
        // Fetch user data from Firebase using the specified URL
        const response = await fetch(usersUrl);
        if (!response.ok) throw new Error('Failed to fetch users');

        const usersData = await response.json();

        let userFound = false;

        // Iterate through users data and check if any user matches the entered username and password
        for (const key in usersData) {
            const user = usersData[key];
            if (user.username === username && user.password === password) {
                // User found, login successful
                userFound = true;
                // Redirect to user profile page
                window.location.href = "user-profile.html"; // Redirect to profile page
                break;
            }
        }

        if (!userFound) {
            errorMessage.textContent = 'Invalid username or password!';
        }

    } catch (error) {
        console.error("Error validating login credentials:", error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});
