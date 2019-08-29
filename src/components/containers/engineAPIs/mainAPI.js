import * as contractAPI from './contractAPI.js';
import * as employeeAPI from './employeeAPI';

// Update the money, accepts an integer as dataObj
export const updateMoney = (setParentState, money, selectedTeam, getParentState) => {
  let newMoney = getParentState('money') + money;
  setParentState('money', newMoney);
}

// Update the date obj, accepts an dateObj as dataObj
export const updateDate = (parent, days = 1) => {
  let tmpDate = Object.assign({}, getParentState('date'));
  tmpDate.day += days;

  employeeAPI.letEmploeeysWork(setParentState, null, getParentState);
  contractAPI.timeContracts(setParentState, null, getParentState);

  if(tmpDate.day >= 31){
    contractAPI.resetVolumeContract(setParentState, null, getParentState);
    tmpDate.day -= 30;
    tmpDate.month += 1;
    employeeAPI.employeePayment(setParentState, getParentState);
  } else if( tmpDate.month >= 12) {
    tmpDate.month -= 11;
    tmpDate.year += 1;
  }
  setParentState('date', tmpDate)
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



export const notAvailable = () => {
  console.log("You cant accept an other Contract!");
}
