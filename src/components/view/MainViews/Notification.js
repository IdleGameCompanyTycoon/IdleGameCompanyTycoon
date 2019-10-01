import React from 'react';
import '../../../assets/css/App-notification.css';

const Noti = (props) => {
  if(!props.notif){return null}
  if(props.notif === "info"){
    return(
      <div className="App-noti">
        <div className="App-close"
          onClick={() => props.setParentState("notif") }> x </div>
        {props.action("getter","monthlyCost")}
      </div>
    )
  }
  return (
    <div className="Noti">
      {props.notif}
    </div>
  )
 
}

export default Noti;
