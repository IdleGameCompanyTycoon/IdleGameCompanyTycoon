import React from 'react';
import SkillView from './SkillView';
import environment from '../../../environment.json';
import { FIRE_EMPLOYEE, KEEP_TRAINEE } from '../../containers/middleware/actions/employeeActions';


const Employee = (props) => {
  return (
    <div>
      <hr>
      </hr>
      <div className="App-page-list-object">

        <table>
          <tbody>
          <tr>
          <td>             
              <img className="App-page-list-object-picture"
               src={`https://${environment.backend}/images/${props.employee.picture}`} alt={'picture of employee'}/>
            </td>
            <td>
              <p>{`${props.employee.givenName} ${props.employee.lastName}`}</p>
              <p>Type: {`${props.employee.employeetype}`}</p>
              {props.employee.employeetype === "freelancer" && <p>{props.employee.contractTime}</p>  }
              <p>Work speed: {props.employee.loc} LoC</p>
              <p>Salary: {props.employee.payment}€</p>
              <SkillView skills={props.employee.skills} />
              {props.employee.working ? 
              <button
              onClick={() => props.action({ name: FIRE_EMPLOYEE, value: props.employee })
              }>Fire</button>:
              "Not Working"}
              { props.employee.traineeTime === 6 && !props.employee.working &&
                <button
                  onClick={() => props.action({ name: KEEP_TRAINEE, value: props.employee})
                  }>Keep</button>
              }
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
