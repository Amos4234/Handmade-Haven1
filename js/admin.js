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
        // For now, we will fetch and display data assuming the user is authorized
        fetchAndDisplayArtists();
        fetchAndDisplayUsers();
    } else {
        console.log('No user is signed in.');
        // Redirect to login page or show a message
        window.location.href = 'login.html'; // Redirect to login if not signed in
    }
});


// Function to fetch and display artists from Firestore
const fetchAndDisplayArtists = async () => {
    try {
        const artistTableBody = document.getElementById('artistTableBody');
        if (!artistTableBody) {
            console.error("Artist table body not found!");
            return;
        }

        const artistsSnapshot = await db.collection('artists').get();
        artistTableBody.innerHTML = ''; // Clear existing rows

        artistsSnapshot.forEach(doc => {
            const artist = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${artist.imageUrl || 'images/placeholder.jpg'}" alt="${artist.name}" width="50"></td>
                <td>${artist.name}</td>
                <td>${artist.bio || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-artist-btn" data-id="${doc.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-artist-btn" data-id="${doc.id}">Delete</button>
                </td>
            `;
            artistTableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching or displaying artists:', error);
        // Display an error message to the user
    }
};

// Function to fetch and display users from Firestore
const fetchAndDisplayUsers = async () => {
    try {
        const userTableBody = document.getElementById('userTableBody');
        if (!userTableBody) {
             console.error("User table body not found!");
             return;
        }
        const usersSnapshot = await db.collection('users').get();
        userTableBody.innerHTML = ''; // Clear existing rows

        usersSnapshot.forEach(doc => {
            const user = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.email}</td>
                <td>${user.name || 'N/A'}</td>
                <td>${user.role || 'User'}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-user-btn" data-id="${doc.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-user-btn" data-id="${doc.id}">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching or displaying users:', error);
        // Display an error message to the user
    }
};


// Add event listeners for edit/delete buttons (will be implemented later)
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-artist-btn')) {
        const artistId = event.target.dataset.id;
        console.log('Edit artist with ID:', artistId);
        // Implement edit artist logic
    } else if (event.target.classList.contains('delete-artist-btn')) {
        const artistId = event.target.dataset.id;
        console.log('Delete artist with ID:', artistId);
        // Implement delete artist logic
    } else if (event.target.classList.contains('edit-user-btn')) {
        const userId = event.target.dataset.id;
        console.log('Edit user with ID:', userId);
        // Implement edit user logic
    } else if (event.target.classList.contains('delete-user-btn')) {
        const userId = event.target.dataset.id;
        console.log('Delete user with ID:', userId);
        // Implement delete user logic
    }
});

// Basic logout functionality
const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log('User signed out');
            window.location.href = 'login.html'; // Redirect to login page after logout
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    });
}