import * as mainAPI from './mainAPI.js';
import * as contractAPI from './contractAPI.js';

export const letEmploeeysWork = (parent, args) => {
  let loc = {};
  for(let employee of parent.state.employees){
  if(!loc[employee.team]){
      loc[employee.team] = 0;
  }
  loc[employee.team] += employee.loc;
}

  for(let team in loc){
    mainAPI.updateLoc(parent, loc[team], team);
  }
}

export const addTeamEmployee = (team, dataObj) =>{
  dataObj.team = team;

}

export const employeePayment = (parent) => {
  let payment = 0;
  for(let employee of parent.state.employees){
    payment += employee.payment;
  }
  mainAPI.updateMoney(parent, -payment);
}

export const acceptApplications = (parent, application, team) => {
  declineApplication(parent, application, team);

  addTeamEmployee(team, application);

  let employeesArr = parent.state.employees;
  employeesArr.push(application);
  parent.setState({
    employees: employeesArr
  })
}

export const declineApplication =  (parent, application, team) => {
  let availableApplicationsArr =  parent.state.availableApplications;
  let index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  parent.setState({
    availableApplications: availableApplicationsArr
  })
}
