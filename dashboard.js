// Display user data
function displayUserData() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
  
        // Fetch user details from Firestore
        db.collection('users').doc(uid).get()
          .then((doc) => {
            if (doc.exists) {
              const userName = doc.data().name || 'User';
              document.getElementById('welcome-message').textContent = `Welcome, ${userName}!`;
            } else {
              alert('No user data found!');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        window.location.href = 'index.html'; // Redirect to login
      }
    });
  }
  
  // Setup logout functionality
  function setupLogoutButton() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        auth.signOut()
          .then(() => {
            alert('Logged out successfully!');
            window.location.href = 'index.html';
          })
          .catch((error) => {
            console.error('Error during logout:', error);
          });
      });
    }
  }
  
  // Initialize dashboard functionality
  document.addEventListener('DOMContentLoaded', () => {
    displayUserData();
    setupLogoutButton();
  });
  
  // Menu Bar Toggle
  const menuIcon = document.getElementById('menu-icon');
  const sideMenu = document.getElementById('side-menu');

  menuIcon.addEventListener('click', () => {
    sideMenu.classList.toggle('show');
  });