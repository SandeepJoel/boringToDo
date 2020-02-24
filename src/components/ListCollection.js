import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { getUserListsFS, createNewListFS, deleteListFS, updateListPropertiesFS } from '../api/todoFirestore';
import { generateRandomString, getFromLocalStorage } from '../utils/helpers';

export class Listcollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCollection: [],
      editingListId: '',
      editing: false
    };
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.toggleEditListName = this.toggleEditListName.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.fetchListDataAndStoreItInState = this.fetchListDataAndStoreItInState.bind(this);
  }

  async fetchListDataAndStoreItInState() {
    let listsDataArray;
    listsDataArray = await getUserListsFS(getFromLocalStorage('userData', 'id'))
    Array.isArray(listsDataArray) &&
      this.setState({ listCollection: listsDataArray })
  }

  componentDidMount() {
    this.fetchListDataAndStoreItInState();
  }

  // function to add new lists
  addList() {
    let listName = '';
    let randomId = generateRandomString();
    let payload = {
      listName: listName,
      listId: randomId
    };

    let newState = this.state.listCollection.concat(payload);
    this.setState({
      listCollection: newState
    });

    // create a new list in db
    createNewListFS(getFromLocalStorage('userData', 'id'), randomId, payload);
    this.toggleEditListName(randomId);
  }

  // function to delete lists
  removeList(listId) {
    this.setState({
      listCollection: this.state.listCollection.filter((list) => list.listId != listId)
    });
    // delete a list from db
    deleteListFS(getFromLocalStorage('userData', 'id'), listId)
  }

  /* function to toggle list name editing */
  toggleEditListName(listId) {
    if (this.state.editing == true && this.state.editingListId === listId) {
      this.setState({
        editingListId: '',
        editing: false
      })
    } else {
      this.setState({
        editingListId: listId,
        editing: true
      })
    }
  }

  /* function for storing the changing list name value in UI State and in DB */
  handleEdit(listId, event) {
    if (event.key == 'Enter') {
      this.toggleEditListName(listId);
      return;
    }
    let newListName = event.target.value;
    this.setState({
      listCollection: this.state.listCollection.map(item => item.listId === listId ? { listId: item.listId, listName: newListName } : item)
    });

    // update any list property values in db
    updateListPropertiesFS(getFromLocalStorage('userData', 'id'), listId, {
      "listName": newListName
    });

  }

  render() {
    return (
      <div className='todo-container container-350-600 lists-section screen-1'>
        <header>
          <h2>All lists </h2>
          <FontAwesomeIcon icon='plus-circle' size="lg" id='create-list' onClick={() => this.addList()} ></FontAwesomeIcon>
        </header>
        <div className='lists'>
          {
            this.state.listCollection.length > 0 && this.state.listCollection.slice(0).reverse().map((item, index) => {
              return (
                <div key={item.listId} className='list'>
                  <div className='list-initial-view'>
                    {
                      (this.state.editing && this.state.editingListId == item.listId) ?
                        <input autoFocus className='list-name' type="text" value={item.listName} onChange={(e) => this.handleEdit(item.listId, e)} onKeyPress={(e) => this.handleEdit(item.listId, e)}></input>
                        :
                        <Link className='list-name' to={`/${item.listId}`}>{item.listName}</Link>
                    }

                    <FontAwesomeIcon icon="pen" size="sm" className='editListIcon' onClick={() => this.toggleEditListName(item.listId)} />
                  </div>
                  <div className={`list-details ${this.state.editingListId == item.listId ? 'active' : ''}`}>
                    <span className='default-list-input'>
                      Set as default <input type='radio' name='default-list'></input></span>
                    <span onClick={() => this.removeList(item.listId)}>
                      Delete List <FontAwesomeIcon icon="trash" size="sm" />
                    </span>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }
}
