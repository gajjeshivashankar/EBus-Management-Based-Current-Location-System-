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


document.getElementById("admin-register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value.trim();
    const confirmPassword = document.getElementById("admin-confirm-password").value.trim();
    const errorMessage = document.getElementById("admin-error");

    if (!username || !email || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    try {
        const adminData = {
            username,
            email,
            password,
        };

        // Sending data to Firebase
        const response = await fetch("https://ebus-mbcls-default-rtdb.firebaseio.com/EMBLS.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = "admin-login.html"; // Redirect to login page
        } else {
            throw new Error("Failed to save data.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
