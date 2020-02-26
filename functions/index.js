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

const defaultSettings = {
  general: {
    theme: {
      options: ['light', 'dark'],
      current: 'light'
    },
    layout: {
      options: ['left', 'right', 'blank', 'leftRight', 'center'],
      current: 'blank'
    },
    widgets: ['todo']
  },
  backgroundEffects: [
    {
      type: 'plainBackground',
      color: "#FFF",
      activated: true
    },
    {
      type: 'colorLiquids',
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



exports.createNewUserDbsetup = functions.auth.user().onCreate((user) => {
  // Assuming first element in `backgroundEffects` is active by default
  let ActiveBackgroundEffect = JSON.parse(JSON.stringify(defaultSettings.backgroundEffects[0]));
  delete ActiveBackgroundEffect.activated;

  admin.firestore().collection('users').add({
    userDetails: {
      name: user.displayName,
      email: user.email
    },
    settings: {
      general: defaultSettings.general,
      activeBackgroundEffect: ActiveBackgroundEffect,
    }
  })
  .then((docRef) => { 
    console.log("User document written with ID: ", docRef.id);    
    var batch = admin.firestore().batch();
    defaultSettings.backgroundEffects.forEach((setting) => {
      let ref = admin.firestore()
                    .collection(`/users/${docRef.id}/backgroundEffectsCollection`)
                    .doc(setting.type);
      batch.set(ref, setting);
    });
    return batch.commit();
  }).
  then((val) => { 
    console.log("Final value: ", val);    
    return val;
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
});

/* 
  Need to check why this is not running in emulator ?
  Throwed error 4: DEADLINE_EXCEEDED
*/
exports.activateBackgroundEffect = functions.firestore
  .document('/users/{userId}/backgroundEffectsCollection/{effectId}')
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousData = change.before.data();
    const userId = context.params.userId;
    if (newValue.activated === previousData.activated) return null;
    if (newValue.activated === true) {
      const payload = JSON.parse(JSON.stringify(newValue));
      delete payload.activated;
      return admin.firestore().doc(`/users/${userId}`).update({
        settings: {
          activeBackgroundEffect: payload
        }
      })
      .then((result) => {
        console.log('Success', result)
        return result;
      })
      .catch((e) => {
        console.log('Error occurred', e)
      });
    }
    return null;
  });
