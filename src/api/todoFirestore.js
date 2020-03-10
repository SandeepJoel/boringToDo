import { db } from "../config/firestoreConfig";
// TODO: Check whether authentication happens for all the below API requests
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

export function toggleListPropertiesFS(userId, listId, payload) {
  return new Promise(function (resolve, reject) {
    db.collection(`/users/${userId}/listCollection`).where('isDefault', '==', true).get()
    .then(function (querySnapshot) {
      let oldListIds = [];
      querySnapshot.forEach(function (doc) {
        oldListIds.push(doc.id);
      });
      if (oldListIds.length > 1) {
        reject(Error('Duplicate data found'));
      }
      let batch = db.batch();
      let oldRef = db.doc(`/users/${userId}/listCollection/${oldListIds[0]}`)
      let currentRef = db.doc(`/users/${userId}/listCollection/${listId}`)
      batch.update(oldRef, { isDefault: false })
      batch.update(currentRef, payload)
      return batch.commit();
    })
    .then(function () {
      console.log("Success updating document");
      resolve();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });    
  });
}