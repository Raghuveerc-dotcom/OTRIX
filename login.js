const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}


// Handle Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Firebase Authentication: Create User
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created
        const user = userCredential.user;

        // Firebase Firestore: Save additional user data
        firebase.firestore().collection('users').doc(user.uid).set({
          name: name,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
          .then(() => {
            alert('User registered successfully!');
            // Redirect to features page
            window.location.href = 'dashboard.html';
          })
          .catch((error) => {
            console.error('Error saving user data :', error);
            alert('Error saving user data. Please try again.');
          });
      })
      .catch((error) => {
        // Handle errors
        console.error('Error during signup:', error);
        alert(error.message);
      });
  });
}



// forgot password
const forgotPasswordLink = document.getElementById('forgot-password-link');
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', () => {
    const email = prompt('Enter your email address for password reset:');
    if (email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email sent! Check your inbox.');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  });
}


