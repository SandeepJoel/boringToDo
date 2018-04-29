export const addList = (listName) => ({
  type: 'ADD_NEW_LIST',
  listName
});

export const removeList = (listName) => ({
  type: 'REMOVE_LIST',
  listName
});
