import React from 'react';

export const Loader = (props) => {
  let { size, type } = props;
  let loaderHtml = <div className="loader"></div>;
  if (type == 'simple') {
    return loaderHtml;
  }
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
  } else if (props.pastDelay) {
    return loaderHtml;
  } else {
    return null;
  }
};