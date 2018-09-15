import React from 'react';
const IndividualTask = ({tasks, match, history}) => {
  let currentTask = tasks.find( item => {
    return item.taskId === match.params.taskId;
  });
  if (currentTask) {
    return (
      <div>
        <h1>{currentTask.taskName}</h1>
        <a href='#' onClick={() => history.goBack() }>Back</a>
        <p>Date: <input type='text'/></p>
        <p>Time: <input type='text'/></p>
        Description:<br></br>
        <textarea rows='10' cols='30' value={currentTask.details.description} readOnly></textarea>
      </div>
    );
  } else {
    return (
      <div>Loading..</div>
    );
  }

};

export default IndividualTask;
