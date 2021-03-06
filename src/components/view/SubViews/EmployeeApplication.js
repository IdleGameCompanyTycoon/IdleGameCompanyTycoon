import React, { useState } from 'react';
import SkillView from './SkillView';
import environment from '../../../environment.json';
import { ACCEPT_APPLICATIONS, DECLINE_APPLICATION } from '../../containers/middleware/actions/employeeActions';
import EmployeeTypeApplicationOptions from './EmployTypeApplicationOptions';

const EmployeeApplication = (props) => {
  const [optionsSet, setOptionsSet] = useState(true);


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
               src={`https://${environment.backend}/images/${props.application.picture}`} alt={'picture of employee'}/>
            </td>
            <td>
              {`${props.application.givenName} ${props.application.lastName}`}
              <p>{props.application.employeetype.charAt(0).toUpperCase() + props.application.employeetype.slice(1)}</p>
              <p>Work speed: {props.application.loc} LoC</p>
              <p>Salary: {props.application.payment}€</p>
              <SkillView skills={props.application.skills} />
              <button
                onClick={() => optionsSet ? props.action({ name: ACCEPT_APPLICATIONS, value: props.application }) : null // We still need some kind of error message for when options are not set
                }>Accept</button>
              <button
                onClick={() => props.action({ name: DECLINE_APPLICATION, value: props.application })
                }>Decline</button>
              <EmployeeTypeApplicationOptions application={props.application} setOptions={setOptionsSet} optionsSet={optionsSet} />  
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

export default EmployeeApplication;
