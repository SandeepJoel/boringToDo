import React from 'react';
const IndividualTask = (props) => {
  let {tasks, match, history, handleDescriptionEdit} = props
  let currentTask = tasks.find( item => {
    return item.taskId === match.params.taskId;
  });
  if (currentTask) {
    return (
      <div>
        <a href='#' onClick={() => history.goBack() }>Back</a>
        <input type="text" value={currentTask.taskName} onChange={handleDescriptionEdit}></input>
        <br/>
        <br/>
        Description:
        <br/>
        <br/>
        <textarea rows='10' cols='50' value={currentTask.details.description} onChange={handleDescriptionEdit}></textarea>
      </div>
    );
  } else {
    return (
      <div>Loading..</div>
    );
  }
};

export default IndividualTask;
