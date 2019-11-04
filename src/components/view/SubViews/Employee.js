import React from 'react';
import SkillView from './SkillView';

const Employee = (props) => {
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
              <SkillView skills={props.employee.skills} />
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
}

export default Employee;
