import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import db from '../config/firestoreConfig';
import IndividualTask from './IndividualTask';

class IndividualList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks: []
    };

    this.dbCurrentTaskCollectionRef = db.collection(`/users/sQ9fJS91MkIghKjkt6gG/listCollection/${this.props.match.params.listId}/taskCollection`);
    this.currentListId = this.props.match.params.listId;
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleDescriptionEdit = this.handleDescriptionEdit.bind(this);
  }

  componentDidMount() {
    let tasksArray = [];
    // get data from db
    this.dbCurrentTaskCollectionRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tasksArray.push(doc.data());
      });
      this.setState({
        tasks: tasksArray
      });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  addTask (taskName) {
    if (taskName == '') {
      alert('Please enter a list name');
      return;
    }
    document.getElementById('add-task').value = '';
    let randomId = Math.random().toString(36).slice(2);
    let payloadObject = {
      details: {
        description: ''
      },
      isDone: false,
      taskId: randomId,
      taskName: taskName
    };
    let newState = this.state.tasks.concat(payloadObject);
    this.setState({
      tasks: newState
    });

    // add task to db
    this.dbCurrentTaskCollectionRef
    .doc(randomId)
    .set(payloadObject)
  }

  removeTask (taskObject) {
    let remainingTasks = this.state.tasks.filter((task) => {
      return task.taskId != taskObject.taskId;
    });

    // update new tasks array to state
    this.setState({
      tasks: remainingTasks
    });

    // delete task from db
    this.dbCurrentTaskCollectionRef
    .doc(taskObject.taskId)
    .delete()
    .then()
    .catch((error) => {
      console.error("Error removing task: ", error);
    })
  }

  handleDescriptionEdit () {
    console.log('handling...');
  }

  render () {
    return (
      <Switch>
        <Route exact path={this.props.match.url} render = { () => {
          return (
            <div>
              <Link to='/'>Back</Link>
              <hr/>
              {
                this.state.tasks.length > 0 && this.state.tasks.map((item, index) => {
                  return (
                  <div key={item.taskId}>
                    <Link to={`${this.props.match.url}/${item.taskId}`}>{item.taskName}</Link>
                    <button onClick={() => this.removeTask(item)}>X</button>
                  </div>
                  );
                })
              }
              { /* AddTask component */ }
              <input type='text' id='add-task' onKeyPress={ (e) => e.key == 'Enter' ? this.addTask(document.getElementById('add-task').value, this.props.match.params.listId) : false }/>
              <button onClick={() => this.addTask(document.getElementById('add-task').value) }>Create New Task</button>
            </div>
          )
        }
        } />
        <Route exact path={`${this.props.match.url}/:taskId`} render = {(props) => <IndividualTask {...props} tasks={this.state.tasks} handleDescriptionEdit={this.handleDescriptionEdit} /> } />
      </Switch>
    )
  }
 };

export default IndividualList;
