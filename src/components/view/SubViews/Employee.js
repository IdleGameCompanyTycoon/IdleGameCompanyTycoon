import React from 'react';

const Employee = (props) => {
<<<<<<< HEAD
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
=======
  return (
    <div>
      <hr>
      </hr>
      <div className="App-page-list-object">

        <table>
          <tbody>
          <tr>
            <td style={{width:7 + "vw"}}>
              <img src={props.employee.imgUrl} alt="picture of employee"/>
            </td>
            <td>
              <p>{`${props.employee.givenName} ${props.employee.lastName}`}</p>
              <p>Work speed: {props.employee.loc} LoC</p>
              <p>Salary: {props.employee.payment}€</p>

              <button
                onClick={() => props.action("fireEmployee", props.employee)
                }>Fire</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        </hr>
    </div>
  )
>>>>>>> b5d6064b5c234f2a968d2d859ed676baa4d2a805
}

export default Employee;
