import * as mainAPI from './mainAPI.js';
import * as contractAPI from './contractAPI.js';
import environment from '../../../environment.json';

export const initEmployee = (employee, team) => {
  employee.team =  team;
  employee.workingDays = 0;
  employee.working = true;
}

export const letEmploeeysWork = (setParentState, args, getParentState) => {
  let loc = {};
  for(let employee of getParentState('employees')){
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
    mainAPI.updateLoc(setParentState, loc[team], team, getParentState);
  }
}

export const employeePayment = (setParentState, getParentState) => {
  let payment = 0;
  let employeePayment = 0;
  for(let employee of getParentState('employees')){
    payment += Math.floor(employee.payment * employee.workingDays / 30);
    if(employee.working === false){
      deleteEmployee(setParentState, employee, getParentState);
    }
    employee.workingDays = 0;

  }
  mainAPI.updateMoney(setParentState, -payment, null, getParentState);
}

export const acceptApplications = (setParentState, application, team, getParentState) => {
  declineApplication(setParentState, application, team, getParentState);
  initEmployee(application, team);

  let employeesArr = getParentState('employees');
  employeesArr.push(application);
  setParentState('employees', employeesArr);
}

export const declineApplication = (setParentState, application, team, getParentState) => {
  let availableApplicationsArr = getParentState('availableApplications');
  let index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  setParentState('availableApplications', availableApplicationsArr);
}

export const fireEmployee = (setParentState, employee, team) => {
  employee.working = false;
}

export const deleteEmployee = (setParentState, employee, getParentState) => {
  let employeesArr = getParentState('employees');
  let index = employeesArr.indexOf(employee);

  if(index > -1){
    employeesArr.splice(index, 1);
  }

  setParentState('employees', employeesArr);
}
