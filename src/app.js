// main styles
import styles from './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
// TODO: Later activate this router
// import { MemoryRouter } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import db from './config/firestoreConfig';
// import Title from './components/Title';
import IndividualList from './components/IndividualList';

class Listcollection extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      listCollection: [],
      editingListId: '',
      editing: false
    };
    this.dbCurrentUserListCollectionRef = db.collection("/users/sQ9fJS91MkIghKjkt6gG/listCollection");
    this.listNameEdit = React.createRef();
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.toggleEditListName = this.toggleEditListName.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    // Getting listCollection of the user
    let result = [];
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

  // function to add new lists
  addList (listName) {
    if (listName == '') {
      alert('Please enter a list name');
      return;
    }
    let randomId = Math.random().toString(36).slice(2);
    document.getElementById('submit').value = '';
    let payloadObject = {
      listName: listName,
      listId: randomId
    };

    let newState = this.state.listCollection.concat(payloadObject);
    this.setState({
      listCollection: newState
    });

    // adding the list name to db
    this.dbCurrentUserListCollectionRef
    .doc(randomId)
    .set(payloadObject);
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
    return (
      <div>
        {
          this.state.listCollection.length > 0 && this.state.listCollection.map((item, index) => {
            return (
              <div key={item.listId}>
                {
                  (this.state.editing && this.state.editingListId == item.listId) ?
                    <input ref={this.listNameEdit} type="text" value={item.listName} onChange={(e) => this.handleEdit(item.listId, e)}></input>
                    :
                    <Link to={`/${item.listId}`}>{item.listName}</Link>
                }

                <button onClick={() => this.toggleEditListName(item.listId)}>i</button>
                <button onClick={() => this.removeList(item)}>X</button>
              </div>
            );
          })
        }
        <input type='text' id='submit' onKeyPress={(e) => e.key == 'Enter' ? this.addList(document.getElementById('submit').value) : false
        }/>
        <button onClick={() => this.addList(document.getElementById('submit').value) }>Create New List</button>
      </div>
    )
  }
}

const Middleman = () => (
  <Switch>
    <Route exact path='/' component={Listcollection} />
    <Route path='/:listId' render={ props => <IndividualList {...props} />} />
  </Switch>
);

ReactDOM.render(
  <Router>
    <Middleman/>
  </Router>,
  document.getElementById('root')
);
