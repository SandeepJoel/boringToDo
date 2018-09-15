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
      listCollection: []
    };
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.dbCurrentUserListCollectionRef = db.collection("/users/sQ9fJS91MkIghKjkt6gG/listCollection");
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
      id: randomId
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


  removeList (listObject) {
    let remainingElements = this.state.listCollection.filter((list) => {
      return list.id != listObject.id
    });
    this.setState({
      listCollection: remainingElements
    });

    // delete data from db
    this.dbCurrentUserListCollectionRef
    .doc(listObject.id)
    .delete()
    .then()
    .catch((error) => {
        console.log(`Error deleting document: ${listObject.id} -  Error: ${error}`);
    });
  }

  render () {
    return (
      <div>
        {
          this.state.listCollection.length > 0 && this.state.listCollection.map((item, index) => {
            return (
              <div key={item.id}>
                <Link to={`/${item.id}`}>{item.listName}</Link>
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
