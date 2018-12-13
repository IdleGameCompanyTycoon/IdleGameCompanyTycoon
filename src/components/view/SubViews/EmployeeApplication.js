import React from 'react';

const EmployeeApplication = (props) => {

  return (
    <div className="App-">
      {/* TODO: Add Data*/}
      <p>{`${props.application.givenName} ${props.application.lastName}`}</p>
      <p>Work speed: {props.application.loc} LoC</p>
      <p>Salary: {props.application.payment}€</p>
      <img src={props.application.imgUrl} alt="picture of employee"/>
      <button
        onClick={() => props.action("acceptApplication", props.application)
        }>Accept</button>

      <button
        onClick={() => props.action("declineApplication", props.application)
        }>Decline</button>

    </div>
  )
}

export default EmployeeApplication;
