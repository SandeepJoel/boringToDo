import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import db from '../config/firestoreConfig';
import IndividualTask from './IndividualTask';

class IndividualList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks: [],
      selectedFilter: 'all'
    };
    this.dbCurrentTaskCollectionRef = db.collection(`/users/sQ9fJS91MkIghKjkt6gG/listCollection/${this.props.match.params.listId}/taskCollection`);
    this.currentListId = this.props.match.params.listId;
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleDetailedEdit = this.handleDetailedEdit.bind(this);
    this.tickCheckbox = this.tickCheckbox.bind(this);
    this.setTasksfilter = this.setTasksfilter.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
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
        tasks: tasksArray,
        filteredTasks: tasksArray
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

  // this function handles only for one level of nesting inside state object
  handleDetailedEdit (property, id, subChildPropertyName, event) {
    let editedTaskIndex = this.state.tasks.findIndex(item => item.taskId === id);
    let payload = { [property]: event.target.value };
    if (subChildPropertyName) {
      this.setState({
        tasks: [
          ...this.state.tasks.slice(0, editedTaskIndex),
          Object.assign({}, this.state.tasks[editedTaskIndex],
            {
              [subChildPropertyName]: payload
            }
          ),
          ...this.state.tasks.slice(editedTaskIndex + 1)
        ]
      });

      this.dbCurrentTaskCollectionRef
      .doc(id)
      .update({
        [subChildPropertyName]: payload
      });

    } else {
      this.setState({
        tasks: [
          ...this.state.tasks.slice(0, editedTaskIndex),
          Object.assign({}, this.state.tasks[editedTaskIndex], payload),
          ...this.state.tasks.slice(editedTaskIndex + 1)
        ]
      });

      this.dbCurrentTaskCollectionRef
      .doc(id)
      .update(payload)
    }
  }

  tickCheckbox (taskId) {
    let tickedTaskIndex = this.state.tasks.findIndex(item => item.taskId === taskId);
    let payload = {
      isDone: !this.state.tasks[tickedTaskIndex].isDone
    };
    this.setState({
      tasks: [
        ...this.state.tasks.slice(0, tickedTaskIndex),
        Object.assign({}, this.state.tasks[tickedTaskIndex],
        payload
        ),
        ...this.state.tasks.slice(tickedTaskIndex + 1)
      ]
    });

    // upload tick status to backend
    this.dbCurrentTaskCollectionRef
    .doc(taskId)
    .update(payload)
  }

  setTasksfilter(filterValue) {
    this.setState({
      selectedFilter: filterValue
    });
  }

  // return array of filtered tasks
  getFilteredTasks() {
    switch (this.state.selectedFilter) {
      case 'active':
        return this.state.tasks.filter(item => item.isDone === false);
      case 'completed':
        return this.state.tasks.filter(item => item.isDone === true);
      default:
        return this.state.tasks.filter(() => true);
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path={this.props.match.url} render = { () => {
          let filteredTasks = this.getFilteredTasks();
          return (
            <div>
              <Link to='/'>Back</Link>
              <hr/>
              {
                filteredTasks.length > 0 && filteredTasks.map((item, index) => {
                  return (
                  <div key={item.taskId} className={ item.isDone ? 'done': '' }>
                    <Link to={`${this.props.match.url}/${item.taskId}`}>{item.taskName}</Link>
                    <input type='checkbox' name={item.taskName} defaultChecked={item.isDone} onChange={() => this.tickCheckbox(item.taskId)}></input>
                    <button onClick={() => this.removeTask(item)}>X</button>
                  </div>
                  );
                })
              }
              { /* AddTask component */ }
              <input type='text' id='add-task' onKeyPress={ (e) => e.key == 'Enter' ? this.addTask(document.getElementById('add-task').value, this.props.match.params.listId) : false }/>
              <button onClick={() => this.addTask(document.getElementById('add-task').value) }>Create New Task</button>
              <button onClick={() => this.setTasksfilter('all')}> All </button>
              <button onClick={() => this.setTasksfilter('active')}> Active </button>
              <button onClick={() => this.setTasksfilter('completed')}> Completed </button>
            </div>
          )
        }
        } />
        <Route exact path={`${this.props.match.url}/:taskId`} render = {(props) => <IndividualTask {...props} tasks={this.state.tasks} handleDetailedEdit={this.handleDetailedEdit} /> } />
      </Switch>
    )
  }
 };

export default IndividualList;
