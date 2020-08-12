import firebase from '@firebase/app';
import '@firebase/auth';
import { db } from "../config/firestoreConfig";
import { defaultSettings } from '../constants/settings';
import { deepClone } from '../utils/helpers';

// ** Authentication related api functions **

export function authStateChange (signInCallback, signOutCallback) {  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      signInCallback(user);
    } else {
      signOutCallback && signOutCallback();
    }
  });
}

export function googleSignIn(setStatus) {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(async function(result) {    
    if (result && result.additionalUserInfo.isNewUser) {
      setStatus('Creating Your Account ...');
      await accountSetup(result.user);
    }
  }).catch(function(error) {
    console.error("Error in auth: ", error);
  });
}

export function googleSignOut () {
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {
    console.error("Sign-out error");
  });
}

function accountSetup (user) {
  // Assuming first element in `backgroundEffects` is active by default
  let ActiveBackgroundEffect = deepClone(defaultSettings.backgroundEffects[0]);
  return new Promise(function (resolve, reject) {
    let batch = db.batch();
    let userRef = db.collection('users').doc(user.uid);
    batch.set(userRef, {
      settings: {
        general: defaultSettings.general,
        activeBackgroundEffect: ActiveBackgroundEffect,
      }
    })
    defaultSettings.backgroundEffects.forEach((setting) => {
      let ref = db.collection(`/users/${user.uid}/backgroundEffectsCollection`).doc(setting.type);
      batch.set(ref, setting);
    });
    return batch.commit()
    .catch((error) => {
      console.error("Error in Account Setup: ", error);
      reject(Error(error));
    });
  });
}