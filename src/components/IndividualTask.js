import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IndividualTask = (props) => {
  let {tasks, match, history, handleDetailedEdit} = props
  let currentTask = tasks.find( item => {
    return item.taskId === match.params.taskId;
  });
  if (currentTask) {
    return (
      <div className="todo-container container-350 screen-3">
        <header>
          <h2 className='mt-15 text-ellipsis'>{currentTask.taskName}</h2>
        </header>
        <section className="main-body">
            <label>Task Name</label>
            <input type="text" 
              value={currentTask.taskName} 
              onChange={(e) => handleDetailedEdit('taskName',currentTask.taskId, false, e)}>  
            </input>
            <label>Task Description</label>
            <textarea rows='10' 
              value={currentTask.details.description} 
              onChange={(e) => handleDetailedEdit('description', currentTask.taskId, 'details', e)}>
            </textarea>
        </section>
        <footer>
          <FontAwesomeIcon icon="arrow-left" 
            size="1x" 
            onClick={() => history.goBack()}>
          </FontAwesomeIcon>
        </footer>
      </div>
    );
  }
};

export default IndividualTask;
