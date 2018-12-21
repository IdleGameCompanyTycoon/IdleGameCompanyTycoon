import * as contractAPI from './contractAPI.js';
import * as employeeAPI from './employeeAPI';

// Update the money, accepts an integer as dataObj
export const updateMoney = (obj, dataObj) => {
  let newMoney = obj.state.money + dataObj;
  obj.setState({
    money: newMoney
  })
}

// Update the date obj, accepts an dateObj as dataObj
export const updateDate = (parent, days = 1) => {
  let tmpDate = Object.assign({}, parent.state.date);
  tmpDate.day += days;

  employeeAPI.letEmploeeysWork(parent);

  if(tmpDate.day >= 31){
    tmpDate.day -= 30;
    tmpDate.month += 1;

    employeeAPI.employeePayment(parent);
  } else if( tmpDate.month >= 12) {
    tmpDate.month -= 11 ;
    tmpDate.year += 1;
  }
  parent.setState({
    date: tmpDate
  })
}



// On an animation frame click this function updates the LoC of the currently
// selected Contract
export const locClick = (obj, dataObj) => {
  let taskId = obj.state.teams[dataObj.selectedTeam].selectedTaskId;
  if(taskId) {

  }
}

//statt engine team
export const updateLoc =  (parent, loc, team) => {
  if(!parent.state.teams[team].activeContract) return;
  let activeContractsArr = parent.state.activeContracts;
  let contract = contractAPI.getActiveContractForTeam(activeContractsArr, team);
  contractAPI.updateProgress(parent, contract, loc);
  parent.setState({
    activeContracts: activeContractsArr
  });
}









export const notAvailable = () => {
  console.log("You cant accept an other Contract!");
}
