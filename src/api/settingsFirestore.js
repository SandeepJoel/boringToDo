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
        /* 
          Investigate why we not able to select only certain
          fields from a document in firestore 
        */
        resolve(doc.data().settings)
      })
      .catch((error) => {
        reject(Error(error));
      });
  })
}

// export function updateTodoColorFS(userId, color) {
//   db.collection(`/users`)
//   .doc(userId)
//   .update({
//     "userSettings.todo.plain.color": color
//   })
//   .then()
//   .catch((error) => {
//     console.error("Error updating document: ", error);
//   })
// }
