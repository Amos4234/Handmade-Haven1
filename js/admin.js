// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Add your JavaScript code for the admin page here

// Example: Check if user is logged in (more detailed check for admin role will be added later)
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User is signed in:', user.uid);
        // Proceed with loading admin content or checking admin role
    } else {
        console.log('No user is signed in.');
        // Redirect to login page or show a message
        // window.location.href = 'login.html';
    }
});
