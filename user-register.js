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

// Get the form and error message elements
const form = document.getElementById('user-register-form');
const errorMessage = document.getElementById('register-error');

// Firebase URL for storing user registration data
const FIREBASE_URL = "https://ebus-mbcls-default-rtdb.firebaseio.com/users.json";

// Handle form submission
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the form values
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();

    // Validate input values
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        errorMessage.textContent = 'All fields are required!';
    } else if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
    } else {
        // Clear error message
        errorMessage.textContent = '';

        // Prepare user data
        const newUser = {
            username,
            email,
            password
        };

        try {
            // Send user data to Firebase
            const response = await fetch(FIREBASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert('Registration Successful! You can now log in.');
                window.location.href = 'user-login.html'; // Redirect to login page
            } else {
                throw new Error('Failed to register user.');
            }
        } catch (error) {
            console.error('Error saving user data:', error);
            errorMessage.textContent = 'Registration failed. Please try again.';
        }
    }
});
