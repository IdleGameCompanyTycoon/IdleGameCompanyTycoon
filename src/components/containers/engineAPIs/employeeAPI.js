import * as mainAPI from './mainAPI.js';
import * as contractAPI from './contractAPI.js';
import environment from '../../../environment.json';

export const initEmployee = (employee, team) => {
  employee.team =  team;
  employee.workingDays = 0;
  employee.working = true;
}

export const letEmploeeysWork = (parent, args) => {
  let loc = {};
  for(let employee of parent.state.employees){
    if(!employee.working){
      continue;
    }
    if(!loc[employee.team]){
      loc[employee.team] = 0;
    }
    loc[employee.team] += employee.loc;
    employee.workingDays += 1;
  }

  for(let team in loc){
    mainAPI.updateLoc(parent, loc[team], team);
  }
}

export const employeePayment = (parent) => {
  let payment = 0;
  let employeePayment = 0;
  for(let employee of parent.state.employees){
    payment += Math.floor(employee.payment * employee.workingDays / 30);
    if(employee.working === false){
      deleteEmployee(parent, employee);
    }
    employee.workingDays = 0;

  }
  mainAPI.updateMoney(parent, -payment);
}

export const acceptApplications = (parent, application, team) => {
  declineApplication(parent, application, team);
  initEmployee(application, team);

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

export const fireEmployee = (parents, employee, team) => {
  employee.working = false;
}

export const deleteEmployee = (parent, employee) => {
  let employeesArr = parent.state.employees;
  let index = employeesArr.indexOf(employee);

  if(index > -1){
    employeesArr.splice(index, 1);
  }

  parent.setState({
    employees: employeesArr
  });
}
