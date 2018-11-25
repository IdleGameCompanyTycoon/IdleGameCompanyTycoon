import React from 'react';

const Employee = (props) => {
  return (
    <div className="App-">
      {/* TODO: Add Missing data*/}
      <p>{`${props.application.givenName} ${props.application.lastName}`}</p>
      <p>Work speed: {props.application.loc} LoC</p>
      <p>Salary: {props.application.payment}€</p>
      <img src={props.application.imgUrl} alt="picture of employee"/>
    </div>
  )
}

export default Employee;
