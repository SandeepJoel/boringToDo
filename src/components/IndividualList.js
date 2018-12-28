import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import db from '../config/firestoreConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IndividualTask from './IndividualTask';

class IndividualList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks: [],
      selectedFilter: 'all',
      currentListName: '',
      editingTaskId: '',
      editing: false
    };
    this.dbCurrentTaskCollectionRef = db.collection(`/users/sQ9fJS91MkIghKjkt6gG/listCollection/${this.props.match.params.listId}/taskCollection`);
    this.dbCurrentListDocRef = db.collection(`/users/sQ9fJS91MkIghKjkt6gG/listCollection`).doc(this.props.match.params.listId);
    this.currentListId = this.props.match.params.listId;
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleDetailedEdit = this.handleDetailedEdit.bind(this);
    this.toggleEditTaskName = this.toggleEditTaskName.bind(this);
    this.tickCheckbox = this.tickCheckbox.bind(this);
    this.setTasksfilter = this.setTasksfilter.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
  }

  componentDidMount() {
    let tasksArray = [];

    this.dbCurrentListDocRef.get().then((doc) => {
      this.setState({
        currentListName :doc.data().listName
      });
    });
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

    this.toggleEditTaskName(randomId);
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
    if (event.keyCode === 13) {
      this.toggleEditTaskName(id);
      return;
    }

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

  /* function to toggle task name editing */
  toggleEditTaskName (taskId) {
    if (this.state.editing == true && this.state.editingTaskId === taskId) {
      this.setState({
        editingTaskId: '',
        editing: false
      })
    } else {
      this.setState({
        editingTaskId: taskId,
        editing: true
      })
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path={this.props.match.url} render = { () => {
          let filteredTasks = this.getFilteredTasks();
          let donePercent = Math.round((this.state.tasks.filter(item => item.isDone === true).length/this.state.tasks.length) * 100)
          return (
            <div className='screen-2'>
              <header>
                <h3>{this.state.currentListName}</h3>
                <div className="status">
                  <span>{ isNaN(donePercent) ? "..." : `${donePercent} % done` }</span>
                  <FontAwesomeIcon icon='plus-circle' size="lg" onClick={() => this.addTask("")}></FontAwesomeIcon>
                </div>
              </header>
              <section className='main-body'>
               {
                filteredTasks.length > 0 && filteredTasks.slice(0).reverse().map((item, index) => {
                  return (
                  <div key={item.taskId} className={ item.isDone ? 'task-item done': 'task-item' }>
                    <input type='checkbox' name={item.taskName} defaultChecked={item.isDone} onChange={() => this.tickCheckbox(item.taskId)}></input>
                    <div className='task-name'>
                    {
                      (this.state.editing && this.state.editingTaskId == item.taskId) ?
                      <input  autoFocus type="text" defaultValue={item.taskName} onKeyUp={(e) => this.handleDetailedEdit('taskName',item.taskId, false, e)} ></input>
                      :
                      <Link to={`${this.props.match.url}/${item.taskId}`}>{item.taskName}</Link>
                    }
                    </div>
                    <button onClick={() => this.toggleEditTaskName(item.taskId)}>i</button>
                    <button onClick={() => this.removeTask(item)}>X</button>
                  </div>
                  );
                })
               }
              </section>
              <footer>
                <Link to='/'>
                  <FontAwesomeIcon icon="arrow-left" size="sm"></FontAwesomeIcon>
                </Link>
                <button onClick={() => this.setTasksfilter('all')}> All </button>
                <button onClick={() => this.setTasksfilter('active')}> Active </button>
                <button onClick={() => this.setTasksfilter('completed')}> Completed </button>
              </footer>
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
