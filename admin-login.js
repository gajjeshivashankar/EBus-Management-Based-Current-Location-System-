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


document.getElementById("admin-login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value.trim();
    const errorMessage = document.getElementById("admin-error");

    if (!username || !password) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    try {
        // Fetch all admin data
        const response = await fetch("https://ebus-mbcls-default-rtdb.firebaseio.com/EMBLS.json");
        const data = await response.json();

        // Check if credentials match
        const matchedAdmin = Object.values(data || {}).find(
            (admin) => admin.username === username && admin.password === password
        );

        if (matchedAdmin) {
            alert("Login successful!");
            window.location.href = "admin-profile.html"; // Redirect to admin profile
        } else {
            errorMessage.textContent = "Username or password is incorrect!";
        }
    } catch (error) {
        console.error("Error during login:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
