import React from 'react';
export const PlainBackground = (props) => {
  let { color } = props.settings;
  return (
    <div className="effect-container" style={{ backgroundColor: color }}>
    </div>
  );
};