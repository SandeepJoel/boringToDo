export const jreducer = (state, action) => {
  switch(action.type) {
    case 'ADD_NEW_LIST': {
      document.getElementById('submit').value = '';
      return {
        ...state,
        listCollection: [
          ...state.listCollection,
          {
          listName: action.listName,
          id: state.listCollection.length + 1,
          data: []
         }
        ]
      }
    }
    case 'REMOVE_LIST': {
      return {
        ...state,
        listCollection: state.listCollection.filter((item) => {
          return item.listName != action.listName
        })
      }
    }
    default:
      return state;
  }
}
