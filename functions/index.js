const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./boringtodo-1445e-firebase-adminsdk-xgujm-b41cb77b9a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://boringtodo-1445e.firebaseio.com"
});

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
