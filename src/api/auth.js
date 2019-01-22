import firebase from 'firebase';

// ** Authentication related api functions **

export function authStateChange (signInCallback, signOutCallback) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User is signed in --- ASC")
      // trigger the passed callback function with the user object
      signInCallback(user);
    } else {
      console.log("User is signed out --- ASC")
      signOutCallback && signOutCallback();
    }
  });
}

export function googleSignIn () {
  // google authentication using firebase
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;

  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
  });
}

export function googleSignOut () {
  firebase.auth().signOut().then(function() {
    console.log("Sign-out successful");
  }).catch(function(error) {
    console.log("Sign-out error");
  });
}