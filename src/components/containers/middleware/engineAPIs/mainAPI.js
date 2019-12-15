import { timeContracts, resetVolumeContract, getActiveContractForTeam, updateProgress } from './contractAPI';
import { letEmploeeysWork, employeePayment } from './employeeAPI';
import { ON_MONTH_CHANGE } from '../actions/mainActions';

// Update the money, accepts an integer as dataObj
export const updateMoney = (money, stateGetter) => {
  let newMoney = Number(stateGetter('money')) + Number(money);
  return { money: newMoney };
}

// Update the date obj, accepts an dateObj as dataObj
// ** Returns ** If a month change happens on this interval
export const updateDate = (days = 1, stateGetter, dispatcher) => {
  let tmpDate = stateGetter('date');
  let newMonth = false;
  tmpDate.day += days;

  let employeeWork = letEmploeeysWork(stateGetter, dispatcher);
  employeeWork = timeContracts(stateGetter, dispatcher, employeeWork.activeContracts, employeeWork.volumeContracts);
  
  if(tmpDate.day >= 31){
    const volumeContracts = resetVolumeContract(stateGetter, dispatcher, employeeWork.activeContracts, employeeWork.volumeContracts);
    tmpDate.day -= 30;
    tmpDate.month += 1;
    const employees = employeePayment(stateGetter, dispatcher);
    employeeWork = Object.assign({}, employeeWork, volumeContracts, employees)
    newMonth = true;
  } else if( tmpDate.month >= 12) {
    tmpDate.month -= 11;
    tmpDate.year += 1;
  }

  if (newMonth) {
    dispatcher({ name: ON_MONTH_CHANGE });
  }
  return Object.assign({ date: tmpDate }, employeeWork);
}

// Updates the current monthly expanses. Can take a optional parameter which contains the updated amount
export const updateMonthlyExpenses = (stateGetter, newEmployeesArray = stateGetter('employees'), valueToUpdate = 0) => {
  let newExpenses = 0;
  
  if (valueToUpdate) {
    newExpenses = stateGetter('expensesPerMonth') + valueToUpdate;
  } else {
    // TODO: Chances are that we have more expenses in the future than just the employees, therefore we should implement a seperate function in the future
    newEmployeesArray.forEach(employee => {
      newExpenses += Number(employee.payment);
    })
  }

  return { expensesPerMonth: newExpenses };
}

// Updates the current monthly expanses. Can take a optional parameter which contains the updated amount
export const updateDailyLoc = (stateGetter, newEmployeesArray = stateGetter('employees'), valueToUpdate = 0) => {
  let newLoc = 0;
  if (valueToUpdate) {
    newLoc = stateGetter('locPerDay') + valueToUpdate;
  } else {
    newEmployeesArray.forEach(employee => {
      newLoc += Number(employee.loc);
    })
  }

  return { locPerDay: newLoc };
}

// On an animation frame click this function updates the LoC of the currently
// selected Contract
// TODO: So we have a DataObj with selectedTeam but also a selected Team var? Whut?
export const locClick = (stateGetter, selectedTeam) => {
  let taskId = stateGetter('teams')[selectedTeam].selectedTaskId;
  if(taskId) {

  }
}

//statt engine team
export const updateLoc = (stateGetter, dispatcher, loc, team = 0, activeContractsArr, volumeContracts) => {
  if(!stateGetter('teams')[team].activeContract) return;
  activeContractsArr = activeContractsArr || stateGetter('activeContracts');
  volumeContracts = volumeContracts || stateGetter('volumeContracts')
  do {
    let contract = getActiveContractForTeam(activeContractsArr, team) 

    if(contract && stateGetter('teams')[team].activeContract){
      [loc, volumeContracts, activeContractsArr] = updateProgress(stateGetter, dispatcher, contract, loc, activeContractsArr, volumeContracts);
    }else{
      loc = 0;
      break;
    }
  } while (loc > 0);

  return [activeContractsArr, volumeContracts];
}


/*
**
** Function which runs when a month change happens
**
*/
export const onMonthChange = (stateGetter) => {
  const employeesByType = stateGetter('employeesByType');

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

  return { traineesLeaving: traineesLeaving, employeesByType: employeesByType };
}



export const notAvailable = () => {
  console.log("You cant accept an other Contract!");
}
