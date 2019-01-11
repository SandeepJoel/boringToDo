const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createNewUserDbsetup = functions.auth.user().onCreate((user) => {
  admin.firestore().collection('users').add({
    userDetails: {
      name: user.displayName
    },
    userSettings: {
      general: {
        googleSignup: {
          activate: false
        }
      }
    }
  })
  .then((docRef) => {
    return console.log("Document written with ID: ", docRef.id)
    //admin.firestore().collection('users').doc(docRef.id)
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
});
