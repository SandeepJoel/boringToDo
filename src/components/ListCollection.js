import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import {db } from '../config/firestoreConfig';

export class Listcollection extends React.Component {
  constructor (props) {
    super (props);
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

  fetchListDataAndStoreItInState () {    
    // dont do anything when the user is not logged in
    if (this.props.userData.userId == "") {
      return;
    }
    console.log("fetching list data and storing it in state");
    this.dbCurrentUserListCollectionRef = db.collection(`/users/${this.props.userData.userId}/listCollection`);
    let result = [];
    // Getting listCollection of the user
    this.dbCurrentUserListCollectionRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push(doc.data())
      });
      this.setState({
        listCollection: result
      })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate - ListCollection");
    if (this.props.userData.userId !== prevProps.userData.userId) {
      this.fetchListDataAndStoreItInState()
    }
  }

  componentDidMount() {
    console.log("componentDidMount - ListCollection");
    this.fetchListDataAndStoreItInState();
  }

  // function to add new lists
  addList () {
    let listName = '';
    let randomId = Math.random().toString(36).slice(2);
    let payloadObject = {
      listName: listName,
      listId: randomId
    };

    let newState = this.state.listCollection.concat(payloadObject);
    this.setState({
      listCollection: newState
    });

    // adding the empty list name to db
    this.dbCurrentUserListCollectionRef
    .doc(randomId)
    .set(payloadObject);

    this.toggleEditListName(randomId);
  }

  // function to delete lists
  removeList (listObject) {
    let remainingElements = this.state.listCollection.filter((list) => {
      return list.listId != listObject.listId
    });
    this.setState({
      listCollection: remainingElements
    });

    // delete data from db
    this.dbCurrentUserListCollectionRef
    .doc(listObject.listId)
    .delete()
    .then()
    .catch((error) => {
        console.log(`Error deleting document: ${listObject.listId} -  Error: ${error}`);
    });
  }

  /* function to toggle list name editing */
  toggleEditListName (listId) {
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
  handleEdit (listId, event) {
    if (event.key == 'Enter') {
      this.toggleEditListName(listId);
      return;
    }
    let newListName = event.target.value;
    let newState = this.state.listCollection.map(item => {
      return item.listId === listId ? { listId: item.listId, listName: newListName } : item
      });
    this.setState({
      listCollection: newState
    });

    this.dbCurrentUserListCollectionRef
    .doc(listId)
    .update({
      listName: newListName
    })
    .then()
    .catch((error) => {
      console.error("Error updating document: ", error);
    })
  }

  render () {
    console.log("running render - ListCollection");
    return (
      <div className='todo-container lists-section screen-1'>
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
                    <span onClick={() => this.removeList(item)}>
                      Delete List <FontAwesomeIcon icon="trash-alt"  size="sm" />
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