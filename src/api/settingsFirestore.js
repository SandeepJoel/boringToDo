import { db } from "../config/firestoreConfig";

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
        }
      })
      .catch((error) => {
        reject(Error(error));
        console.error("Error updating document: ", error);
      })
  });
}

export function activateAndUpdateBackgroundEffectFS(userId, payload) {
  return new Promise(function (resolve, reject) {
    let batch = db.batch();
    let effectId = payload.type;
    let activateDocRef = db.doc(`/users/${userId}`);
    let mainDocRef = db.doc(`/users/${userId}/backgroundEffectsCollection/${effectId}`);
    batch.update(mainDocRef, payload);
    batch.update(activateDocRef, { 'settings.activeBackgroundEffect': payload });
    batch.commit()
    .then(function() {
      resolve();
    })
    .catch((error) => {
      reject(Error(error));
      console.error("Error updating document: ", error);
    })
  });
}

export function updateGeneralSettingsFS(userId, payload) {
  return new Promise(function (resolve, reject) {
    db.doc(`/users/${userId}`)
      .update({ 'settings.general': payload })
      .then(function () {
        resolve();
      })
      .catch((error) => {
        reject(Error(error));
        console.error("Error updating settings: ", error);
      })
  })
}
