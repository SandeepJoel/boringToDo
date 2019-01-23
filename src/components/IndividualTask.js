import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IndividualTask = (props) => {
  let {tasks, match, history, handleDetailedEdit} = props
  let currentTask = tasks.find( item => {
    return item.taskId === match.params.taskId;
  });
  if (currentTask) {
    return (
      <div className="todo-container container-350-600 screen-3">
        <header>
          <h2>{currentTask.taskName}</h2>
          <FontAwesomeIcon className="back" icon="arrow-left" size="lg" onClick={() => history.goBack() }></FontAwesomeIcon>
        </header>
        <section className="main-body">
            <label>Task Name</label>
            <input type="text" value={currentTask.taskName} onChange={(e) => handleDetailedEdit('taskName',currentTask.taskId, false, e)}></input>
            <label>Task Description</label>
            <textarea rows='10' value={currentTask.details.description} onChange={(e) => handleDetailedEdit('description', currentTask.taskId, 'details', e)}></textarea>
        </section>
      </div>
    );
  } else {
    return (
      <div className="screen-3">
        <header>
          <h2>Loading...</h2>
        </header>
      </div>
    );
  }
};

export default IndividualTask;
