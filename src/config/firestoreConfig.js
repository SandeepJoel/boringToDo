import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyByrozorXNG7v0DS_fFBhxEYoPqPlXsOJo",
  authDomain: "boringtodo-1445e.firebaseapp.com",
  databaseURL: "https://boringtodo-1445e.firebaseio.com",
  projectId: "boringtodo-1445e",
  storageBucket: "boringtodo-1445e.appspot.com",
  messagingSenderId: "182261911162"
};

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export { db };