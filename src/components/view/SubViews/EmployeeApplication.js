import React from 'react';

const EmployeeApplication = (props) => {
  console.log(props)

  return (
    <div className="App-">
      {/* TODO: Add Data*/}
      <p>{`${props.application.givenName} ${props.application.lastName}`}</p>
      <p>Work speed: {props.application.loc} LoC</p>
      <p>Salary: {props.application.payment}€</p>
      <img src={props.application.imgUrl} alt="picture of employee"/>
      <i></i> {/* TODO: Add Button to accept*/}
    </div>
  )
}

export default EmployeeApplication;
