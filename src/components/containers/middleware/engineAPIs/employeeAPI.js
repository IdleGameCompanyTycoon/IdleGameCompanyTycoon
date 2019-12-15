import { updateMoney, updateLoc, updateMonthlyExpenses, updateDailyLoc } from './mainAPI.js';
import * as contractAPI from './contractAPI.js';
import environment from '../../../../environment.json';
import { midOfMinMax, calcNewSkill } from '../../helpers/calcValues';
import { UPDATE_MONEY } from '../actions/mainActions';

export const initEmployee = (employee, team) => {
  employee.team =  team;
  employee.workingDays = 0;
  employee.working = true;
}

export const letEmploeeysWork = (stateGetter, dispatcher) => {
  const loc = {};
  for(let employee of stateGetter('employees')){
    if(!employee.working){
      continue;
    }
    if(!loc[employee.team]){
      loc[employee.team] = 0;
    }
    loc[employee.team] += employee.loc;
    employee.workingDays += 1;
  }

  let activeContractsArray = stateGetter('activeContracts'), 
      volumeContracts = stateGetter('volumeContracts');

  for(let team in loc){
    const updateResponse = updateLoc(stateGetter, dispatcher, loc[team], team, activeContractsArray, volumeContracts)
    console.log(loc)
    if (updateResponse) [activeContractsArray, volumeContracts] = updateResponse;
  }

  return { activeContractsArray: activeContractsArray, volumeContracts: volumeContracts }
}

export const employeePayment = (stateGetter, dispatcher) => {
  let payment = 0;
  let employees = stateGetter('employees');
  for(let employee of employees){
    payment += Math.floor(employee.payment * employee.workingDays / 30);
    if(employee.working === false){
      employees = deleteEmployee(stateGetter, dispatcher, employee, employees);
    }
    employee.workingDays = 0;

  }
  dispatcher({ name: UPDATE_MONEY, value: -payment })

  return { employees: employees };
}

export const acceptApplications = (stateGetter, dispatcher, application, team = 0) => {
  const applications = declineApplication(stateGetter, application, team);
  initEmployee(application, team);

  const employeesArr = stateGetter('employees');
  employeesArr.push(application);

  const employeesTypeObj = stateGetter('employeesByType');

  // We have to update our monthly loc and expenses when hiring a new employee
  // TODO: In theory we can pass application.payment in the second parameter to update more efficently.
  // But due to the async nature of setState we can't be sure that the current value is up to date therefore we need to somehow qeue
  // The calculations on multiple occasions or we have to somehow get the currently qeued setState value.
  const expanses = updateMonthlyExpenses(stateGetter, employeesArr);
  const dayliLoc = updateDailyLoc(stateGetter, employeesArr);
  dispatcher({ name: UPDATE_MONEY, value: -environment.settings.employees.hardwareCosts });

  return Object.assign({ employees: employeesArr, employeesByType: addEmployeeByTypeToObj(employeesTypeObj, application) }, expanses, dayliLoc, applications);
}

export const declineApplication = (stateGetter, application, team) => {
  const availableApplicationsArr = stateGetter('availableApplications');
  const index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  return { availableApplications: availableApplicationsArr };
}

export const fireEmployee = (employee) => {
  employee.working = false;
}

export const deleteEmployee = (stateGetter, dispatcher, employee, newEmployeesArray) => {
  const employeesArr = stateGetter('employees');
  const employeesTypeObj = stateGetter('employeesByType')
  const index = employeesArr.indexOf(employee);
  
  if(index > -1){
    employeesArr.splice(index, 1);
  }
  
  // We have to update our monthly loc and expenses when firing a employee
  // TODO: In theory we can pass application.payment in the second parameter to update more efficently.
  // But due to the async nature of setState we can't be sure that the current value is up to date therefore we need to somehow qeue
  // The calculations on multiple occasions or we have to somehow get the currently qeued setState value.
  const expanses = updateMonthlyExpenses(stateGetter, newEmployeesArray);
  const dayliLoc = updateDailyLoc(stateGetter, newEmployeesArray);
  
  return Object.assign({ employees: employeesArr, employeesByType: removeEmployeeFromTypeObj(employeesTypeObj, employee)}, expanses, dayliLoc);
}

const addEmployeeByTypeToObj = (employeesTypeObj, application) => {
  if (!employeesTypeObj[application.employeetype]) {
    employeesTypeObj[application.employeetype] = {};
  }

  if (!employeesTypeObj[application.employeetype][application.team]) {
    employeesTypeObj[application.employeetype][application.team] = []
  }

  employeesTypeObj[application.employeetype][application.team].push(application);
  return employeesTypeObj;
}

const removeEmployeeFromTypeObj = (employeesTypeObj, employee) => {
  const employeesTypeArr = employeesTypeObj[employee.employeeType][employee.team]
  const index = employeesTypeArr.indexOf(employee);
  employeesTypeArr.splice(index, 1);

  return employeesTypeObj;
}

export const keepTrainee = (stateGetter, employee, team = 0) => {
  delete employee.traineeTime;
  employee.working = true;
  let newEmployeesByType = removeEmployeeFromTypeObj(stateGetter('employeesByType'), employee);
  employee.employeeType = 'developer';
  newEmployeesByType = addEmployeeByTypeToObj(newEmployeesByType, employee);
  const modifiers = environment.settings.traineeModifier;

  employee.skills = calcNewSkill(midOfMinMax(modifiers.skills.min, modifiers.skills.max), employee.skills);
  employee.loc += midOfMinMax(modifiers.loc.min, modifiers.loc.max) * employee.loc;
  employee.payment += midOfMinMax(modifiers.payment.min, modifiers.payment.max) * employee.payment;

  return { employeesByType: newEmployeesByType };
}