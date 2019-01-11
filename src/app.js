// main styles
import styles from './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// TODO: Later activate this router
// import { MemoryRouter } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {db, googleSignIn, googleSignOut, authStateChange } from './config/firestoreConfig';
import IndividualList from './components/IndividualList';

library.add(fas, far);

const MyContext = React.createContext();
class MyProvider extends React.Component {
  constructor (props) {
    super (props);
    this.defaultState = {
      userName: "X - User",
      userPhotoUrl: "",
      userId: ""
    }
    this.state = this.defaultState;
  }

  componentDidMount() {
    authStateChange (
      // on google signIn state
      (user) => {
        db.collection("users").where("userDetails.name", "==", user.displayName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("In PROVIDER");
            console.log(doc.id, "===>", doc.data());
            this.setState({
              userName: user.displayName,
              userPhotoUrl: user.photoURL,
              userId: doc.id
            })
          })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      },
      // on google signOut state
      () => {
        this.setState(this.defaultState);
      }
    )
  }

  render () {
    return (
      <MyContext.Provider value={{
        state: this.state
      }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
class Listcollection extends React.Component {
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
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.userData.state.userId);
    console.log(prevProps.userData.state.userId)
    if (this.props.userData.state.userId !== prevProps.userData.state.userId && this.props.userData.state.userId !== "") {
      this.dbCurrentUserListCollectionRef = db.collection(`/users/${this.props.userData.state.userId}/listCollection`);
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
    return (
      <div className='lists-section screen-1'>
        <header>
          <h2>All lists {this.props.userData.state.userId}</h2>
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

const ListcollectionWrapper = () => (
  <MyContext.Consumer>
    {(context) => (
      <Listcollection userData = {context}/>
    )}
  </MyContext.Consumer>
);


const Todo = () => (
  <Switch>
    <Route exact path='/' component={ListcollectionWrapper} />
    <Route path='/:listId' render={ props => <IndividualList {...props} />} />
  </Switch>
);


class User extends React.Component {
  constructor (props) {
    super (props);
  }
  render () {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div>
            <button onClick={googleSignIn}>Google Sign In</button>
            <span id="user-name">
              { context.state.userName }
              { context.state.userId }
            </span>
            <img src={ context.state.userPhotoUrl } alt="" id="user-photo" />
            <button onClick={googleSignOut}>Google Sign out</button>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

const App = () => (
  <MyProvider>
    <User/>
    <Router>
      <Todo/>
    </Router>
  </MyProvider>
);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
