// ============================================
// Authentication Logic - Frontend Only
// ============================================
// This is a simple frontend-only authentication system for demonstration.
// In production, replace this with Firebase Authentication or a backend service.

// Check if user is authenticated (stored in sessionStorage)
function isAuthenticated() {
    return sessionStorage.getItem('isAuthenticated') === 'true';
}

// Set authentication status
function setAuthenticated(status) {
    sessionStorage.setItem('isAuthenticated', status);
}

// Get current page name from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// ============================================
// FIREBASE AUTHENTICATION INTEGRATION POINT
// ============================================
// TODO: Replace this simple authentication with Firebase Authentication
//
// Here's how you would integrate Firebase Authentication:
//
// 1. Add Firebase SDK to HTML:
//    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
//    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>
//
// 2. Initialize Firebase:
//    const firebaseConfig = {
//        apiKey: "YOUR_API_KEY",
//        authDomain: "YOUR_AUTH_DOMAIN",
//        projectId: "YOUR_PROJECT_ID",
//        // ... other config
//    };
//    firebase.initializeApp(firebaseConfig);
//    const auth = firebase.auth();
//
// 3. Replace login function:
//    async function handleLogin(email, password) {
//        try {
//            const userCredential = await auth.signInWithEmailAndPassword(email, password);
//            const user = userCredential.user;
//            // Redirect to learning assistant page
//            window.location.href = 'learning-assistant.html';
//            return { success: true, user: user };
//        } catch (error) {
//            return { success: false, error: error.message };
//        }
//    }
//
// 4. Replace logout function:
//    function handleLogout() {
//        auth.signOut().then(() => {
//            window.location.href = 'index.html';
//        }).catch((error) => {
//            console.error('Logout error:', error);
//        });
//    }
//
// 5. Add auth state listener:
//    auth.onAuthStateChanged((user) => {
//        if (user) {
//            // User is signed in
//            setAuthenticated(true);
//        } else {
//            // User is signed out
//            setAuthenticated(false);
//        }
//    });
//
// 6. Protect routes:
//    auth.onAuthStateChanged((user) => {
//        const currentPage = getCurrentPage();
//        if (currentPage === 'learning-assistant.html' && !user) {
//            window.location.href = 'index.html';
//        }
//    });
// ============================================

// Simple login handler (Frontend-only demo)
// In production, this should validate credentials with Firebase/Backend
function handleLogin(email, password) {
    // Simple validation - in production, validate with Firebase
    if (!email || !password) {
        return {
            success: false,
            error: 'Please enter both email and password.'
        };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: 'Please enter a valid email address.'
        };
    }

    // For demo purposes, accept any email/password combination
    // TODO: Replace with Firebase authentication
    setAuthenticated(true);
    
    // Redirect to learning assistant page
    setTimeout(() => {
        window.location.href = 'learning-assistant.html';
    }, 500); // Small delay for better UX

    return {
        success: true,
        message: 'Login successful!'
    };
}

// Logout handler
function handleLogout() {
    // Clear authentication status
    setAuthenticated(false);
    
    // TODO: Add Firebase signOut() here:
    // firebase.auth().signOut().then(() => {
    //     window.location.href = 'index.html';
    // });
    
    // Redirect to landing page
    window.location.href = 'index.html';
}

// Protect learning assistant page - redirect if not authenticated
function protectRoute() {
    const currentPage = getCurrentPage();
    
    // If user is on learning assistant page but not authenticated
    if (currentPage === 'learning-assistant.html' && !isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

// ============================================
// Page-Specific Event Listeners
// ============================================

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();

    // Landing Page (index.html) - Login button
    if (currentPage === 'index.html' || currentPage === '') {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    }

    // Login Page - Form submission
    if (currentPage === 'login.html') {
        const loginForm = document.querySelector('.login-card');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginSubmitBtn = document.getElementById('loginSubmitBtn');
        const errorMessage = document.getElementById('errorMessage');

        if (loginSubmitBtn) {
            loginSubmitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value;

                // Hide previous error
                errorMessage.style.display = 'none';

                // Attempt login
                const result = handleLogin(email, password);

                if (!result.success) {
                    // Show error message
                    errorMessage.textContent = result.error;
                    errorMessage.style.display = 'block';
                }
                // If successful, handleLogin() will redirect
            });

            // Allow Enter key to submit
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    loginSubmitBtn.click();
                }
            });

            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    passwordInput.focus();
                }
            });
        }
    }

    // Learning Assistant Page - Logout button
    if (currentPage === 'learning-assistant.html') {
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                handleLogout();
            });
        }

        // Protect route - redirect if not authenticated
        protectRoute();
    }
});

