import React, { Component } from 'react';

const ProgressBar = (props) => {
  return (
    <div className="Progress-bar">
      <div className="Progress-bar-progress" style={{width: this.progress}}></div>
      <div className="Progress-bar-text">{props.text}</div>
    </div>
  )
}

export default ProgressBar;
