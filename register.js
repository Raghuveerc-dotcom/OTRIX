firebase.auth().onAuthStateChanged(user => {
  if (user) {
      // Get the logged-in user's UID
      const userUid = user.uid;

      // Now that we have the UID, proceed with the form submission logic
      document.getElementById('businessForm').addEventListener('submit', async (e) => {
          e.preventDefault();

          const businessName = document.getElementById('businessName').value;
          const ownerName = document.getElementById('ownerName').value;
          const email = document.getElementById('email').value;
          const phone = document.getElementById('phone').value;
          const businessType = document.getElementById('businessType').value;
          const industry = document.getElementById('industry').value;
          const location = document.getElementById('location').value;
          const description = document.getElementById('description').value;
          const funding = document.getElementById('funding').value;
          const amount = document.getElementById('amount').value;
          const howHelp = document.getElementById('howHelp').value;
          const logo = document.getElementById('logo').files[0];

          // Upload the logo if any
          let logoUrl = '';
          if (logo) {
              const storageRef = firebase.storage().ref().child(`logos/${logo.name}`);
              await storageRef.put(logo);
              logoUrl = await storageRef.getDownloadURL();
          }

          // Save the form data to Firestore, including the logged-in user's UID
          try {
              await db.collection("businesses").add({
                  userId: userUid,  // Add the logged-in user's UID to the business data
                  businessName,
                  ownerName,
                  email,
                  phone,
                  businessType,
                  industry,
                  location,
                  description,
                  funding,
                  amount,
                  howHelp,
                  logoUrl,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });

              alert('Business Registered Successfully!');
              document.getElementById('businessForm').reset();
          } catch (error) {
              console.error('Error saving business registration:', error);
              alert('There was an error saving your business registration.');
          }
      });
  } else {
      // User is not logged in, handle accordingly
      alert("You need to log in first.");
      window.location.href = "login.html";  // Redirect to login page or handle accordingly
  }
});