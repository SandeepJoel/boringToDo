import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { 
  getUserListsFS,
  createNewListFS,
  deleteListFS,
  updateListPropertiesFS,
  toggleListPropertiesFS
} from '../api/todoFirestore';
import { generateRandomString, getFromLocalStorage } from '../utils/helpers';
import { Loader } from '../components/Loader';

export class Listcollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCollection: [],
      editingListId: '',
      editing: false,
      loading: false
    };
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.toggleEditListName = this.toggleEditListName.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.fetchListDataAndStoreItInState = this.fetchListDataAndStoreItInState.bind(this);
    this.setDefaultList = this.setDefaultList.bind(this);
  }

  async fetchListDataAndStoreItInState() {
    let listsDataArray;
    this.setState({
      loading: true,
    });
    listsDataArray = await getUserListsFS(getFromLocalStorage('userData', 'id'))
    Array.isArray(listsDataArray) &&
      this.setState({
        loading: false,
        listCollection: listsDataArray
      })
  }

  componentDidMount() {
    this.fetchListDataAndStoreItInState();
  }

  // function to add new lists
  addList() {
    let listName = '';
    let randomId = generateRandomString();

    // While creating first list, make it default
    let isDefault = this.state.listCollection.length === 0 ? true: false;

    let payload = {
      listName: listName,
      listId: randomId,
      isDefault
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
    let listToDelete = this.state.listCollection.find((list) => list.listId === listId);
    if (listToDelete.isDefault) {
      alert(`You can't delete default list`);
      return;
    }
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
      listCollection: this.state.listCollection.map(item => 
        item.listId === listId ? 
        { listId: item.listId, listName: newListName, isDefault: item.isDefault }
        : 
        item
      )
    });

    // update any list property values in db
    updateListPropertiesFS(getFromLocalStorage('userData', 'id'), listId, {
      "listName": newListName
    });

    // Need to update the localStorage if it is a default list
    if (listId === getFromLocalStorage('defaultList', 'id')) {
      localStorage.setItem('defaultList', JSON.stringify({
        id: listId,
        listName: newListName,
        isDefault: true
      }))
    }    

  }

  async setDefaultList() {
    let { editingListId } = this.state;
    this.setState({
      listCollection: this.state.listCollection.map(item =>
        item.listId === editingListId ?
          { listId: editingListId, listName: item.listName, isDefault: true }
          :
          { listId: item.listId, listName: item.listName, isDefault: false })
    });

    await toggleListPropertiesFS(getFromLocalStorage('userData', 'id'), editingListId, {
      'isDefault': true
    });
    localStorage.removeItem('defaultList');
    localStorage.removeItem('tasks'); // TODO: I dont know how to clear this else where
  }

  render() {
    let showLoader = this.state.loading;
    return (
      <div className='todo-container container-350'>
        <header>
          <h2>All lists </h2>
          <div className='add'>
            <FontAwesomeIcon icon='plus' 
              size="1x" 
              onClick={() => this.addList()} >
            </FontAwesomeIcon>
          </div>
        </header>
        <section className='main-body'>
          {showLoader ? <Loader type='simple' /> : ''}
          {
            this.state.listCollection.length > 0 && 
            this.state.listCollection.slice(0).reverse().map((item, index) => {
              return (
                <div key={item.listId} className='todo-item'>
                  <div className='todo-item-initial-view'>
                    {
                      (this.state.editing && this.state.editingListId == item.listId) ?
                        <input autoFocus 
                          className='todo-item-name' 
                          type="text" 
                          value={item.listName} 
                          onChange={(e) => this.handleEdit(item.listId, e)} 
                          onKeyPress={(e) => this.handleEdit(item.listId, e)}>  
                        </input>
                        :
                        <Link className='todo-item-name text-ellipsis' 
                          to={{
                            pathname: `/${item.listId}`,
                            currentList: item
                          }}
                          >{item.listName}
                        </Link>
                    }

                    <FontAwesomeIcon icon="pen" 
                      size="sm"
                      onClick={() => this.toggleEditListName(item.listId)} />
                  </div>
                  <div className={`todo-item-details ${this.state.editingListId == item.listId ? 'active' : ''}`}>
                    <span className='default-list-input'>
                      <span className='mr-5'> Set default </span>
                      <input type='radio' 
                        name='default-list' 
                        checked={item.isDefault} 
                        onChange={this.setDefaultList}>
                      </input>
                    </span>
                    <span onClick={() => this.removeList(item.listId)}>
                      <span className='mr-5'> Delete list </span>
                      <FontAwesomeIcon icon="trash" size="sm" />
                    </span>
                  </div>
                </div>
              );
            })
          }
        </section>
      </div>
    )
  }
}
