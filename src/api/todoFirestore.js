import { db } from "../config/firestoreConfig";

// TODO: Need to change this function to not depend upon the user.displayName for the userId.
// ** get user id using the google user displayName
export function getUserId(userDisplayName) {
  return new Promise((resolve, reject) => {
    db.collection("users").where("userDetails.name", "==", userDisplayName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        resolve(doc.id)
      })
    })
    .catch((error) => {
      reject(Error(error));    
    });    
  })
}

export function getCurrentListDataFS(userId, listId) {
  return new Promise(function(resolve){
    db.collection(`/users/${userId}/listCollection`).doc(listId)
    .get()
    .then((doc) => {
      resolve(doc.data())
    })
    .catch((error) => {
      Error(error);
    });
  })
}

export function getCurrentTasksFS(userId, listId) {
  return new Promise(function(resolve){
    let tasksArray = [];
    db.collection(`/users/${userId}/listCollection/${listId}/taskCollection`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tasksArray.push(doc.data());
      });
      resolve(tasksArray);
    })
    .catch((error) => {
      Error(error);
    });     
  })
}

export function addTaskFS(userId, listId, newtaskId, payload) {  
  db.collection(`/users/${userId}/listCollection/${listId}/taskCollection`)
  .doc(newtaskId)
  .set(payload)
}

export function removeTaskFS(userId, listId, taskId) {  
  db.collection(`/users/${userId}/listCollection/${listId}/taskCollection`)
  .doc(taskId)
  .delete()
}

export function updateTaskPropertiesFS(userId, listId, taskId, payloadData) {
  db.collection(`/users/${userId}/listCollection/${listId}/taskCollection`)
  .doc(taskId)
  .update(payloadData)
  .then()
  .catch((error) => {
    console.error("Error updating document: ", error);
  })
}


// ** List related api functions **

export function getUserListsFS(userId) {
  return new Promise(function(resolve, reject) {
    let data = [];
    db.collection(`/users/${userId}/listCollection`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      resolve(data);
    })
    .catch((error) => {
      reject(Error(error));
    });  
  });
}

export function createNewListFS(userId, newListId, payload) {
  // adding the empty list name to db
  db.collection(`/users/${userId}/listCollection`)
  .doc(newListId)
  .set(payload);
}

export function deleteListFS(userId, listId) {
  db.collection(`/users/${userId}/listCollection`)
  .doc(listId)
  .delete()
  .then()
  .catch((error) => {
      console.error(`Error deleting document: ${listId} -  Error: ${error}`);
  });  
}

export function updateListPropertiesFS(userId, listId, payload) {
  db.collection(`/users/${userId}/listCollection`)
  .doc(listId)
  .update(payload)
  .then()
  .catch((error) => {
    console.error("Error updating document: ", error);
  })
}