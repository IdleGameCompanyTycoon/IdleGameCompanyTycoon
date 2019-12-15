import * as contractAPI from './contractAPI.js';
import * as employeeAPI from './employeeAPI';

// Update the money, accepts an integer as dataObj
export const updateMoney = (setParentState, money, selectedTeam, getParentState) => {
  let newMoney = getParentState('money') + money;
  setParentState('money', newMoney);
}

// Update the date obj, accepts an dateObj as dataObj
// ** Returns ** If a month change happens on this interval
export const updateDate = (setParentState, days = 1, getParentState) => {
  let tmpDate = Object.assign({}, getParentState('date'));
  let newMonth = false;
  tmpDate.day += days;

  employeeAPI.letEmploeeysWork(setParentState, null, getParentState);
  contractAPI.timeContracts(setParentState, getParentState);

  if(tmpDate.day >= 31){
    contractAPI.resetVolumeContract(setParentState, getParentState);
    tmpDate.day -= 30;
    tmpDate.month += 1;
    employeeAPI.employeePayment(setParentState, getParentState);
    newMonth = true;
  } else if( tmpDate.month >= 12) {
    tmpDate.month -= 11;
    tmpDate.year += 1;
  }

  setParentState('date', tmpDate, true);
  return newMonth;
}

// Updates the current monthly expanses. Can take a optional parameter which contains the updated amount
export const updateMonthlyExpenses = (setParentState, valueToUpdate, getParentState) => {
  let newExpenses = 0;
  
  if (valueToUpdate) {
    newExpenses = getParentState('expensesPerMonth') + valueToUpdate;
  } else {
    // TODO: Chances are that we have more expenses in the future than just the employees, therefore we should implement a seperate function in the future
    getParentState('employees').forEach(employee => {
      newExpenses += Number(employee.payment);
    })
  }

  setParentState('expensesPerMonth', newExpenses);
}

// Updates the current monthly expanses. Can take a optional parameter which contains the updated amount
export const updateDailyLoc = (setParentState, valueToUpdate, getParentState) => {
  let newLoc = 0;
  if (valueToUpdate) {
    newLoc = getParentState('locPerDay') + valueToUpdate;
  } else {
    getParentState('employees').forEach(employee => {
      newLoc += Number(employee.loc);
    })
  }

  setParentState('locPerDay', newLoc);
}

// On an animation frame click this function updates the LoC of the currently
// selected Contract
// TODO: So we have a DataObj with selectedTeam but also a selected Team var? Whut?
export const locClick = (setParentState, dataObj, selectedTeam, getParentState) => {
  let taskId = getParentState('teams')[dataObj.selectedTeam].selectedTaskId;
  if(taskId) {

  }
}

//statt engine team
export const updateLoc = (setParentState, loc, team, getParentState) => {
  if(!getParentState('teams')[team].activeContract) return;
  let activeContractsArr = getParentState('activeContracts');
  do{
    if(getParentState('teams')[team].activeContract){
      loc = contractAPI.updateProgress(setParentState, contractAPI.getActiveContractForTeam(activeContractsArr, team), loc, getParentState);
    }else{
      break;
    }
  }while (loc > 0);
  setParentState('activeContracts', activeContractsArr);
}


/*
**
** Function which runs when a month change happens
**
*/
export const onMonthChange = (getParentState, setParentState, args) => {
  const employeesByType = getParentState('employeesByType');

  // Update trainee time
  let traineesLeaving = 0;
  for(let team in employeesByType.trainee) {
    employeesByType.trainee[team].forEach(employee => {
      if (!employee.traineeTime) {
        employee.traineeTime = 1;
      } else if (employee.traineeTime >= 6) {
        employee.working = false;
        traineesLeaving++;
      } else {
        employee.traineeTime++;
      }
    })
  }

  setParentState('traineesLeaving', traineesLeaving);
}



export const notAvailable = () => {
  console.log("You cant accept an other Contract!");
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//helper funktions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

