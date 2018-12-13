import React, { Component } from 'react';
import '../../../assets/css/App-SubViews.css'

const ProgressBar = (props) => {
  console.log(props.contract.progress);
  return (
    <div className="Progress-bar">
      <div className="Progress-bar-progress" style={{width: `${props.contract.progress}%`}}></div>
      <div className="Progress-bar-text">{props.text}</div>
    </div>
  )
}

export default ProgressBar;
