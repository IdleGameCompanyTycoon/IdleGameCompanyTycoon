import React from 'react';

const Employee = (props) => {
  let working;
  if(props.employee.working){
    working = "Working";
  }else{
    working =  "Fired";
  }
    return (

      <div className="App-">
        {/* TODO: Add Missing data*/}
        <p>{working} </p>
        <p>{`${props.employee.givenName} ${props.employee.lastName}`}</p>
        <p>Work speed: {props.employee.loc} LoC</p>
        <p>Salary: {props.employee.payment}€</p>
        <img src={props.employee.imgUrl} alt="picture of employee"/>
          <button
            onClick={() => props.action("fireEmployee", props.employee)
        }>Fire</button>
      </div>
    )
}

export default Employee;
