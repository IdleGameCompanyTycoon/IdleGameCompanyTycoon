import React from 'react';
import {acceptApplications} from '../../containers/engineAPIs/mainAPI.js'


const EmployeeApplication = (props) => {

  return (
    <div className="App-">
      {/* TODO: Add Data*/}
      <p>{`${props.application.givenName} ${props.application.lastName}`}</p>
      <p>Work speed: {props.application.loc} LoC</p>
      <p>Salary: {props.application.payment}€</p>
      <img src={props.application.imgUrl} alt="picture of employee"/>
      <button
              onClick={() => acceptApplications(props.parent, props.application)
              }>Accept</button>
    </div>
  )
}

export default EmployeeApplication;
