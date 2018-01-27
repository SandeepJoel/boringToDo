import React from 'react';
import { Link } from 'react-router-dom';

const List = ({lists, match, addTask}) => {
  let currentListObject = lists.find( item => {
    return item.listName === match.params.listname
  });
  return (
   <div>
    <Link to='/'>Back</Link>
    <hr/>
    {
      currentListObject.data.map( (item, index) => {
       return (
        <div key={index}>
          <Link to={`${match.url}/${item.taskId}`}>{item.taskName}</Link>
        </div>
       );
      })
    }
    { /* AddTask component */}
    <input type='text' id='add-task' onKeyPress={(e) => e.key == 'Enter' ? addTask(document.getElementById('add-task').value,match.params.listname) : false }/>
    <button onClick={() => addTask(document.getElementById('add-task').value,match.params.listname) }>Create New Task</button>
  </div>
  )
 };

export default List
