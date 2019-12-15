import React from 'react';
import SkillView from './SkillView';
import environment from '../../../environment.json';
import '../../../assets/css/App-Pages.css';

const EmployeeApplication = (props) => {
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
               src={`http://${environment.backend}/images/${props.application.picture}`} alt={'picture of ${environment.backend} employee'}/>
            </td>
            <td>
              {`${props.application.givenName} ${props.application.lastName}`}
              <p>{props.application.employeetype.charAt(0).toUpperCase() + props.application.employeetype.slice(1)}</p>
              <p>Work speed: {props.application.loc} LoC</p>
              <p>Salary: {props.application.payment}€</p>
              <SkillView skills={props.application.skills} />
              <button
                onClick={() => props.action("acceptApplication", props.application)
                }>Accept</button>
              <button
                onClick={() => props.action("declineApplication", props.application)
                }>Decline</button>
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
