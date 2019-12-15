import React from 'react';
import SkillView from './SkillView';
import environment from '../../../environment.json';

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
              <p>Work speed: {props.employee.loc} LoC</p>
              <p>Salary: {props.employee.payment}€</p>
              <SkillView skills={props.employee.skills} />
              <button
                onClick={() => props.action("fireEmployee", props.employee)
                }>Fire</button>
              { props.employee.traineeTime === 6 && !props.employee.working &&
                <button
                  onClick={() => props.action("keepTrainee", props.employee)
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
