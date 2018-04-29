// bootstrap css + main styles
import 'bootstrap/dist/css/bootstrap.css'
import styles from './app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore }  from 'redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Title from './components/Title';
import List from './components/List'
import Task from './components/Task';

import { connect, Provider } from 'react-redux';
import { addList, removeList } from './actions/index';
import { jreducer } from './reducer/index';

const initialState = {
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

const store = createStore(jreducer, initialState);


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
let CommonArea = (props) => {
 return (
    <Switch>
      <Route exact path='/' render={() => {
        return (
          <div>
            {
              props.lists.map( (item, index) => {
                return (
                  <div key={index}>
                    <Link to={`/${item.listName}`}>{item.listName}</Link>
                    <button onClick={() => props.removeList(item.listName)}>X</button>
                  </div>
                );
              })
            }
            <hr/>
            <CreateList addList={props.addList}/>
          </div>
        );
      }} />
      {/* <Route exact path='/:listname' render={ props => <List lists={lists} addTask={addTask} {...props} />} /> */}
      {/* <Route exact path='/:listname/:taskid' render={ props => <Task lists={lists} editDate={editDate} {...props}/>}/> */}
    </Switch>
  );
};

let mapStateToPropsCommonArea = (state, ownProps) => ({
  lists: state.listCollection
});

let mapDispatchToPropsCommonArea = {
  addList,
  removeList
};

CommonArea = connect(
  mapStateToPropsCommonArea,
  mapDispatchToPropsCommonArea
)(CommonArea);

// stateful component
class Main extends React.Component {
  constructor (props) {
    super (props);
  }

  // addTask (taskName, listName) {
  //   let message;
  //   let newCollection = this.state.listCollection.slice();
  //   newCollection.forEach((list) => {
  //     if (list.listName === listName && list.data.some((task) => task.taskName === taskName )){
  //       message = 'Task Already Exists';
  //       console.log(message);
  //     }
  //     else if (list.listName === listName) {
  //       message = 'New task added';
  //       list.data.push({
  //         taskName: taskName,
  //         taskId:  `t${list.data.length + 1}`,
  //         idDone: false,
  //         details: {
  //           date: '',
  //           time: ''
  //         }
  //       });
  //       this.setState({
  //         listCollection: newCollection // is this correct ?
  //       })
  //     }
  //   });
  // }

  // editDate(event) {
  //   console.log(event.target.value); // omg again i need to pass this to the deepest child :'(
  // }

  render () {
    return (
      <div>
        <Title/>
        <CommonArea/>
      </div>
    );
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
