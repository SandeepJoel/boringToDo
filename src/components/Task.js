import React from 'react';
const Task = ({lists, match, history, editDate}) => {
  let currentListObject = lists.filter( item => {
    return item.listName === match.params.listname
  })[0];

  let currentTaskObject = currentListObject.data.find( item => {
    return item.taskId === match.params.taskid
  });
  return (
    <div>
      <h1>{currentTaskObject.taskName}</h1>
      <a href='#' onClick={() => history.goBack() }>Back</a>
      <p>Date: -- <input type='text' value={currentTaskObject.details.date} onChange={(e) => editDate(e)}/></p>
      <p>Time: -- <input type='text' value={currentTaskObject.details.time} onChange={() => '' }/></p>
      <hr/>
      <h4>Trying to do auto save... but now this section will not work for now</h4>
    </div>
  );
};

export default Task;
