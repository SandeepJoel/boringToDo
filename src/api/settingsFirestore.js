import { db } from "../config/firestoreConfig";

// TODO: Need to change this function to not depend upon the user.displayName for the userId.
// ** get user id using the google user displayName
export function getUserIdFromFS(userDisplayName) {
  return new Promise((resolve, reject) => {
    db.collection("users").where("userDetails.name", "==", userDisplayName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          resolve({
            id: doc.id
          })
        })
      })
      .catch((error) => {
        reject(Error(error));
      });
  })
}

export function getSettingsFS(userId) {
  return new Promise(function (resolve, reject) {
    db.collection('users').doc(userId)
      .get()
      .then((doc) => {
        resolve(doc.data().settings)
      })
      .catch((error) => {
        reject(Error(error));
      });
  })
}

// background effects apis

export function getBackgroundEffectFS(userId, effectId) {
  return new Promise(function (resolve, reject) {
    db.collection(`/users/${userId}/backgroundEffectsCollection`)
      .doc(effectId)
      .get().then(function (doc) {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          resolve({});
          console.log("No such document!");
        }
      })
      .catch((error) => {
        reject(Error(error));
        console.error("Error updating document: ", error);
      })
  });
}

export function activateAndUpdateBackgroundEffectFS(userId, effectId, payload) {
  return new Promise(function (resolve, reject) {
    let batch = db.batch();
    let activateDocRef = db.doc(`/users/${userId}`);
    let mainDocRef = db.doc(`/users/${userId}/backgroundEffectsCollection/${effectId}`);
    batch.update(mainDocRef, payload);
    batch.update(activateDocRef, { settings: { activateBackground: payload }});
    batch.commit()
    .then(function() {
      console.log("Success updating document");
      resolve();
    })
    .catch((error) => {
      reject(Error(error));
      console.error("Error updating document: ", error);
    })
  });
}
