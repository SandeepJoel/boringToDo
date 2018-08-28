// main styles
import styles from './app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Title from './components/Title';
import List from './components/List'
import Task from './components/Task';

// createList component
const CreateList = ({ addList }) => {
  return (
    <div>
      <input type='text' id='submit' onKeyPress={(e) => e.key == 'Enter' ? addList(document.getElementById('submit').value) : false
      }/>
      <button onClick={() => addList(document.getElementById('submit').value) }>Create New List</button>
    </div>
  );
};

// common area component
const CommonArea = ({lists, addList, removeList, addTask, editDate}) => {
 return (
    <Switch>
      <Route exact path='/' render={() => {
        return (
          <div>
            {
              lists.map( (item, index) => {
                return (
                  <div key={index}>
                    <Link to={`/${item.listName}`}>{item.listName}</Link>
                    <button onClick={() => removeList(item.listName)}>X</button>
                  </div>
                );
              })
            }
            <hr/>
            <CreateList addList={addList}/>
          </div>
        );
      }} />
      <Route exact path='/:listname' render={ props => <List lists={lists} addTask={addTask} {...props} />} />
      <Route exact path='/:listname/:taskid' render={ props => <Task lists={lists} editDate={editDate} {...props}/>}/>
    </Switch>
  );
};

// stateful component
class Main extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      // list of lists
      listCollection: [
        {
          listName: 'List-1',
          id: 1,
          data: [
            {
              taskName: 'Task 1',
              taskId: 't1',
              isDone: false,
              details: {
                date: '10-11-2017',
                time: '10:30pm'
              }
            },
            {
              taskName: 'Task 2',
              taskId: 't2',
              isDone: false,
              details: {
                date: '12-11-2017',
                time: '11:30pm'
              }
            }
          ]
        },
        {
          listName: 'List-2',
          id: 2,
          data: [
            {
              taskName: 'Task 3',
              taskId: 't3',
              isDone: false,
              details: {
                date: '13-11-2017',
                time: '13:30pm'
              }
            }
          ]
        }
      ]
    };
  }

  // function that will be used by the children of this component
  addList (listName) {
    document.getElementById('submit').value = '';
    let newState = this.state.listCollection.concat({
      listName: listName,
      id: this.state.listCollection.length + 1,
      data: []
    });
    // why is this step necessary? This is done to preserver state immutability....
    this.setState({
      listCollection: newState
    });
  }

  removeList (listName) {
    let remainingElements = this.state.listCollection.filter((list) => {
      return list.listName != listName
    });
    this.setState({
      listCollection: remainingElements
    })
  }

  addTask (taskName, listName) {
    let message;
    let newCollection = this.state.listCollection.slice();
    newCollection.forEach((list) => {
      if (list.listName === listName && list.data.some((task) => task.taskName === taskName )){
        message = 'Task Already Exists';
        console.log(message);
      }
      else if (list.listName === listName) {
        message = 'New task added';
        list.data.push({
          taskName: taskName,
          taskId:  `t${list.data.length + 1}`,
          idDone: false,
          details: {
            date: '',
            time: ''
          }
        });
        this.setState({
          listCollection: newCollection // is this correct ?
        })
      }
    });
  }

  editDate(event) {
    console.log(event.target.value); // omg again i need to pass this to the deepest child :'(
  }

  render () {
    return (
      <div>
        <Title numberOfLists = { this.state.listCollection.length }/>
        <CommonArea lists = { this.state.listCollection } addList = {this.addList.bind(this)}
         editDate={this.editDate.bind(this)} addTask={this.addTask.bind(this)} removeList = {this.removeList.bind(this)} />
      </div>
    );
  }
};

ReactDOM.render(
  <Router>
    <Main/>
  </Router>,
  document.getElementById('root')
);
