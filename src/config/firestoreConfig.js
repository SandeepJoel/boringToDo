import firebase from '@firebase/app';
import '@firebase/firestore';

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
export { db };