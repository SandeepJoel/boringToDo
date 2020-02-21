const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* TODO: 
  Also think and consult about how to implement resetting 
  to default values in settings 
*/
exports.createNewUserDbsetup = functions.auth.user().onCreate((user) => {
  admin.firestore().collection('users').add({
    userDetails: {
      name: user.displayName,
      email: user.email
    },
    settings: {
      general: {
        theme: {
          options: ['light', 'dark'],
          current: 'light'
        },
        layout: {
          options: ['left', 'right', 'blank', 'leftRight'],
          current: 'blank'
        },
        widgets: ['todo']
      },
      backgroundEffects: [
        {
          type: 'plain-background',
          color: "#FFF",
          activated: true
        },
        {
          type: 'color-liquids',
          activated: false,
          config: [
            {
              type: 'gradient',
              colors: ['#4facfe', '#00f2fe'],
              wave: 'blob1'
            },
            {
              type: 'singleColor',
              color: '#000',
              wave: 'blob1'
            },
            {
              type: 'gradient',
              colors: ['#f093fb', '#f5576c'],
              wave: 'blob2'
            },
            {
              type: 'singleColor',
              color: '#FFF',
              wave: 'blob2'
            },
            {
              type: 'gradient',
              colors: ['#84fab0', '#8fd3f4'],
              wave: 'blob1'
            },
            {
              type: 'singleColor',
              color: '#000',
              wave: 'blob1'
            },
            {
              type: 'gradient',
              colors: ['#fa709a', '#fee140'],
              wave: 'blob1'
            },
          ],
        }
      ],
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
