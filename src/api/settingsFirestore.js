import { db } from "../config/firestoreConfig";

export function updateTodoColorFS(userId, color) {
  db.collection(`/users`)
  .doc(userId)
  .update({
    "userSettings.todo.plain.color": color
  })
  .then()
  .catch((error) => {
    console.error("Error updating document: ", error);
  })
}
