import React from 'react';
import '../../../assets/css/App-notification.css';

const Noti = (props) => {
  if(!props.notif){return null}
  if(props.notif === "info"){ // FIXME: Notif? Full names!
    return(
      <div className="App-noti">
        <div className="App-close"
          onClick={() => props.setParentState("notif") }> x </div>
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
