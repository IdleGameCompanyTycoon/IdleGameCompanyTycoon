import { updateMoney, updateLoc, updateMonthlyExpenses, updateDailyLoc } from './mainAPI.js';
import * as contractAPI from './contractAPI.js';
import environment from '../../../environment.json';

export const initEmployee = (employee, team) => {
  employee.team =  team;
  employee.workingDays = 0;
  employee.working = true;
}

export const letEmploeeysWork = (setParentState, args, getParentState) => {
  const loc = {};
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
    updateLoc(setParentState, loc[team], team, getParentState);
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
  updateMoney(setParentState, -payment, null, getParentState);
}

export const acceptApplications = (setParentState, application, team, getParentState) => {
  declineApplication(setParentState, application, team, getParentState);
  initEmployee(application, team);

  const employeesArr = getParentState('employees');
  employeesArr.push(application);

  // We have to update our monthly loc and expenses when hiring a new employee
  // TODO: In theory we can pass application.payment in the second parameter to update more efficently.
  // But due to the async nature of setState we can't be sure that the current value is up to date therefore we need to somehow qeue
  // The calculations on multiple occasions or we have to somehow get the currently qeued setState value.
  updateMonthlyExpenses(setParentState, null, getParentState);
  updateDailyLoc(setParentState, null, getParentState);

  setParentState('employees', employeesArr);
}

export const declineApplication = (setParentState, application, team, getParentState) => {
  const availableApplicationsArr = getParentState('availableApplications');
  const index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  setParentState('availableApplications', availableApplicationsArr);
}

export const fireEmployee = (setParentState, employee, team) => {
  employee.working = false;
}

export const deleteEmployee = (setParentState, employee, getParentState) => {
  const employeesArr = getParentState('employees');
  const index = employeesArr.indexOf(employee);

  if(index > -1){
    employeesArr.splice(index, 1);
  }

  // We have to update our monthly loc and expenses when firing a employee
  // TODO: In theory we can pass application.payment in the second parameter to update more efficently.
  // But due to the async nature of setState we can't be sure that the current value is up to date therefore we need to somehow qeue
  // The calculations on multiple occasions or we have to somehow get the currently qeued setState value.
  updateMonthlyExpenses(setParentState, null, getParentState);
  updateDailyLoc(setParentState, null, getParentState);

  setParentState('employees', employeesArr);
}
