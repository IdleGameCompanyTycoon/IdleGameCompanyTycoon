import React, { Component } from 'react';
import '../../../assets/css/App-SubViews.css'

const ProgressBar = (props) => {
  return (
    <div className="Progress-bar">

      <div className="Progress-bar-progress" media="aural"style={{width: `${props.contract.progress}%`}}>{props.text}</div>



    </div>

  )
}

export default ProgressBar;
