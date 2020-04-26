import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { getCurrentListDataFS, getCurrentTasksFS, addTaskFS, removeTaskFS, updateTaskPropertiesFS } from  "../api/todoFirestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IndividualTask from './IndividualTask';
import { generateRandomString, getFromLocalStorage } from '../utils/helpers';
import { Loader } from '../components/Loader';

export class IndividualList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tasks: [],
      selectedFilter: 'all',
      currentListName: '',
      editingTaskId: '',
      editing: false,
      loading: false
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleDetailedEdit = this.handleDetailedEdit.bind(this);
    this.toggleEditTaskName = this.toggleEditTaskName.bind(this);
    this.tickCheckbox = this.tickCheckbox.bind(this);
    this.setTasksfilter = this.setTasksfilter.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
    this.fetchTasksDataAndStoreItInState = this.fetchTasksDataAndStoreItInState.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  async fetchTasksDataAndStoreItInState() {
    let { currentList } = this.props.location;
    let { listId: routeListId } = this.props.match.params;
    let localDefaultList = getFromLocalStorage('defaultList')
    if (!currentList) {
      currentList = localDefaultList.id === routeListId ? localDefaultList : undefined;
    }
    // TODO: Ugly data fallback
    // routeData -> localStorage -> API
    if(!currentList) {
      currentList = await getCurrentListDataFS(getFromLocalStorage('userData', 'id'), routeListId);
     }
    
    let tasks;    
    if (getFromLocalStorage('tasks') && currentList.isDefault) {
      tasks = getFromLocalStorage('tasks');
    } else {
      this.setState({
        loading: true
      });
      tasks = await getCurrentTasksFS(getFromLocalStorage('userData', 'id'), routeListId);
    }
    
    this.setState({
      loading: false,
      tasks,
      currentListName: currentList.listName,
      isDefault: currentList.isDefault
    });

    // TODO: Need to see if we can make this better
    if (currentList.isDefault && !getFromLocalStorage('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    if (currentList.isDefault && !getFromLocalStorage('defaultList', 'id')) {
      localStorage.setItem('defaultList', JSON.stringify({
        id: routeListId,
        listName: currentList.listName,
        isDefault: true
      }));
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
    if (this.state.isDefault) {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
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
    
    addTaskFS(getFromLocalStorage('userData', 'id'), this.props.match.params.listId, newtaskId, payload)

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

    removeTaskFS(getFromLocalStorage('userData', 'id'), this.props.match.params.listId, taskId)
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

      updateTaskPropertiesFS(getFromLocalStorage('userData', 'id'), this.props.match.params.listId, taskId, {
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

      updateTaskPropertiesFS(getFromLocalStorage('userData', 'id'), this.props.match.params.listId, taskId, payload)
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
        Object.assign({}, this.state.tasks[tickedTaskIndex], payload),
        ...this.state.tasks.slice(tickedTaskIndex + 1)
      ]
    });

    // upload tick status to backend
    updateTaskPropertiesFS(getFromLocalStorage('userData', 'id'), this.props.match.params.listId, taskId, payload)
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
          let showLoader = this.state.loading;
          let donePercent = Math.round((this.state.tasks.filter(item => item.isDone === true).length/this.state.tasks.length) * 100)
          return (
            <div className='todo-container container-350'>
              <header>                
                <div>
                  <h2 className="text-ellipsis mb-0">{this.state.currentListName || '....'}</h2>
                  <span className='status' >{ isNaN(donePercent) ? "Your list is empty" : `${donePercent}% done` }</span>                  
                </div>
                <div className='add' onClick={() => this.addTask("")}>
                  <FontAwesomeIcon icon='plus' size='1x'></FontAwesomeIcon>
                </div>
              </header>
              <section className='main-body'>
              <div>
                  {showLoader ? <Loader type='simple' /> : ''}
                {
                  filteredTasks.length > 0 && filteredTasks.slice(0).reverse().map((item, index) => {
                    return (
                    <div key={item.taskId} className={ "todo-item " + (item.isDone ? 'done': '') }>
                      <div className='todo-item-initial-view'>
                        <input type='checkbox' 
                          name={item.taskName} 
                          defaultChecked={item.isDone} 
                          onChange={() => this.tickCheckbox(item.taskId)}
                          >  
                        </input>
                          <div className='todo-item-name  text-ellipsis'>
                          {
                            (this.state.editing && this.state.editingTaskId == item.taskId) ?
                            <input autoFocus 
                              type="text" 
                              defaultValue={item.taskName} onKeyUp={(e) => this.handleDetailedEdit('taskName',item.taskId, false, e)}>
                            </input>
                            :
                            <Link to={`${this.props.match.url}/${item.taskId}`}>{item.taskName}</Link>
                          }
                        </div>
                        <FontAwesomeIcon icon="pen" 
                          size="sm" 
                          onClick={() => this.toggleEditTaskName(item.taskId)} 
                        />
                      </div>
                      <div className={`todo-item-details ${this.state.editingTaskId == item.taskId ? 'active' : ''} `}>
                          <div className='pointer space-between-center' 
                          onClick={() => this.removeTask(item.taskId)}
                        >
                          <span> Delete task</span>
                          <FontAwesomeIcon className='ml-10' 
                            icon="trash"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                    );
                  })
                }
              </div>
              </section>
              <footer>
                <Link to={{
                  pathname: '/',
                  force: true
                }}>
                  <FontAwesomeIcon icon="arrow-left" size="lg"></FontAwesomeIcon>
                </Link>
                <div className="filters">
                  <button 
                    className={`small ${this.state.selectedFilter === 'all' ? 'selected' : ''}`}
                    onClick={() => this.setTasksfilter('all')}> 
                      All 
                  </button>
                  <button 
                    className={`small ${this.state.selectedFilter === 'active' ? 'selected' : ''}` } onClick={() => this.setTasksfilter('active')}>
                      Active 
                  </button>
                  <button 
                    className={`small ${this.state.selectedFilter === 'completed' ? 'selected' : ''}`}onClick={() => this.setTasksfilter('completed')}>
                      Completed
                  </button>
                </div>
              </footer>
            </div>
          )
        }
        } />
        <Route exact path={`${this.props.match.url}/:taskId`} 
          render = {
            (props) => 
              <IndividualTask {...props} 
                tasks={this.state.tasks} 
                handleDetailedEdit={this.handleDetailedEdit} /> 
          }
        />
      </Switch>
    )
  }
}