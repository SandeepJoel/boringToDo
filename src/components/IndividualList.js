import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { getCurrentListDataFS, getCurrentTasksFS, addTaskFS, removeTaskFS, updateTaskPropertiesFS } from  "../api/todoFirestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IndividualTask from './IndividualTask';
import { generateRandomString } from '../utils/helpers';
import { withUserContext } from './UserLoginSignup';

export const IndividualList = withUserContext(
  class extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        tasks: [],
        selectedFilter: 'active',
        currentListName: '',
        editingTaskId: '',
        editing: false
      };

      this.currentListId = this.props.match.params.listId;
      this.addTask = this.addTask.bind(this);
      this.removeTask = this.removeTask.bind(this);
      this.handleDetailedEdit = this.handleDetailedEdit.bind(this);
      this.toggleEditTaskName = this.toggleEditTaskName.bind(this);
      this.tickCheckbox = this.tickCheckbox.bind(this);
      this.setTasksfilter = this.setTasksfilter.bind(this);
      this.getFilteredTasks = this.getFilteredTasks.bind(this);
      this.fetchTasksDataAndStoreItInState = this.fetchTasksDataAndStoreItInState.bind(this);
    }

    async fetchTasksDataAndStoreItInState() {
      if (!this.props.userData || this.props.userData.userId == "") {
        return;
      } 
      // get and set current selected listname in state
      this.setState({
        currentListName: (await getCurrentListDataFS(this.props.userData.userId, this.props.match.params.listId)).listName
      });
      
      // get tasks of the current list from db
      this.setState({
        tasks: await getCurrentTasksFS(this.props.userData.userId, this.props.match.params.listId)
      });
    }

    componentDidUpdate(prevProps) {
      if (this.props.userData.userId !== prevProps.userData.userId ) {
        this.fetchTasksDataAndStoreItInState()
      }
    }

    componentDidMount() {
      this.fetchTasksDataAndStoreItInState();
      window.addEventListener('beforeunload', this.componentCleanup);
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', this.componentCleanup);
      this.componentCleanup();
    }

    componentCleanup() {
      // dom cleanup or event handlers cleanup goes here..
    }  

    addTask (taskName) {
      let newtaskId = generateRandomString();
      let payload = {
        details: {
          description: ''
        },
        isDone: false,
        taskId: newtaskId,
        taskName: taskName
      };
      let newState = this.state.tasks.concat(payload);
      this.setState({
        tasks: newState
      });
      
      addTaskFS(this.props.userData.userId, this.props.match.params.listId, newtaskId, payload)

      this.toggleEditTaskName(newtaskId);
    }

    removeTask (taskId) {
      let remainingTasks = this.state.tasks.filter((task) => {
        return task.taskId != taskId;
      });

      // update new tasks array to state
      this.setState({
        tasks: remainingTasks
      });

      removeTaskFS(this.props.userData.userId, this.props.match.params.listId, taskId)
    }

    // this function handles only for one level of nesting inside state object
    handleDetailedEdit (property, taskId, subChildPropertyName, event) {
      if (event.keyCode === 13) {
        this.toggleEditTaskName(taskId);
        return;
      }

      let editedTaskIndex = this.state.tasks.findIndex(item => item.taskId === taskId);
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

        updateTaskPropertiesFS(this.props.userData.userId, this.props.match.params.listId, taskId, {
          [subChildPropertyName]: payload
        })

      } else {
        this.setState({
          tasks: [
            ...this.state.tasks.slice(0, editedTaskIndex),
            Object.assign({}, this.state.tasks[editedTaskIndex], payload),
            ...this.state.tasks.slice(editedTaskIndex + 1)
          ]
        });

        updateTaskPropertiesFS(this.props.userData.userId, this.props.match.params.listId, taskId, payload)
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
      updateTaskPropertiesFS(this.props.userData.userId, this.props.match.params.listId, taskId, payload)
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
              <div className='todo-container container-350-600 screen-2'>
                <header>
                  <h2 className="list-heading">{this.state.currentListName || '....'}</h2>
                  <div className="status">
                    <span>{ isNaN(donePercent) ? "Your list is empty" : `${donePercent}% done` }</span>
                    <FontAwesomeIcon className='add-task' icon='plus-circle' size='2x' onClick={() => this.addTask("")}></FontAwesomeIcon>
                  </div>
                </header>
                <section className='main-body'>
                <div className='tasks'>
                  {
                    filteredTasks.length > 0 && filteredTasks.slice(0).reverse().map((item, index) => {
                      return (
                      <div key={item.taskId} className={ "task " + (item.isDone ? 'done': '') }>
                        <div className='task-initial-view'>
                          <input type='checkbox' name={item.taskName} defaultChecked={item.isDone} onChange={() => this.tickCheckbox(item.taskId)}></input>
                          <div className='task-name'>
                            {
                              (this.state.editing && this.state.editingTaskId == item.taskId) ?
                              <input  autoFocus type="text" defaultValue={item.taskName} onKeyUp={(e) => this.handleDetailedEdit('taskName',item.taskId, false, e)} ></input>
                              :
                              <Link to={`${this.props.match.url}/${item.taskId}`}>{item.taskName}</Link>
                            }
                          </div>
                          <FontAwesomeIcon icon="pen" size="sm" className='editListIcon' onClick={() => this.toggleEditTaskName(item.taskId)} />
                        </div>
                        <div className={`task-details ${this.state.editingTaskId == item.taskId ? 'active' : ''} `}>
                          <div className='delete-task' onClick={() => this.removeTask(item.taskId)}>
                            <span> Delete task</span>
                            <FontAwesomeIcon className='delete-icon' icon="trash"  size="sm"/>
                          </div>
                        </div>
                      </div>
                      );
                    })
                  }
                </div>
                </section>
                <footer>
                  <Link to='/'>
                    <FontAwesomeIcon className="back" icon="arrow-left" size="sm"></FontAwesomeIcon>
                  </Link>
                  <div className="filters">
                    <button className={ this.state.selectedFilter === 'all' ? 'selected' : '' } onClick={() => this.setTasksfilter('all')}> All </button>
                    <button className={ this.state.selectedFilter === 'active' ? 'selected' : '' } onClick={() => this.setTasksfilter('active')}> Active </button>
                    <button className={ this.state.selectedFilter === 'completed' ? 'selected' : '' } onClick={() => this.setTasksfilter('completed')}> Completed </button>
                  </div>
                </footer>
              </div>
            )
          }
          } />
          <Route exact path={`${this.props.match.url}/:taskId`} render = {(props) => <IndividualTask {...props} tasks={this.state.tasks} handleDetailedEdit={this.handleDetailedEdit} /> } />
        </Switch>
      )
    }
  }
)