import * as calcAPI from './calcAPI.js';

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
  if(tmpDate.day >= 31){
    tmpDate.day -= 30;
    tmpDate.month += 1;

    calcAPI.employeePayment(parent);
  } else if( tmpDate.month >= 12) {
    tmpDate.month -= 11 ;
    tmpDate.year += 1;
  }
  parent.setState({
    date: tmpDate
  })
}

//Pro team !!!
//loc zusammenrechnen
export const updateEmploeeys = (parent, args) => {
  let loc = {};
  console.log(parent.state.employees);
  for(let employee of parent.state.employees){
  if(!loc[employee.team]){
      loc[employee.team] = 0;
  }
  loc[employee.team] += employee.loc;
}

  for(let team in loc){
    updateLoc(parent, loc[team], team);
  }
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

  let contract = calcAPI.getContractForTeam(activeContractsArr, team);
  calcAPI.updateProgress(contract, loc);
  if(contract.progress >= 100){
    calcAPI.closeContract(parent, contract);
  }else {
    parent.setState({
      activeContracts: activeContractsArr
    })
  }
}

export const acceptApplications = (parent, application, team) => {
  declineApplication(parent, application, team);

  calcAPI.addTeamEmployee(team, application);

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

export const acceptContract =  (parent, contract, team) => {
  if(!calcAPI.checkContract(parent, team, contract)) {
    calcAPI.notAvailable();
    return;
  }
  //remove contract from availableContracy array
  declineContract(parent, contract, team);

  contract.progress = 0;
  contract.written =  0;
  //add contract to activeContracts array
  calcAPI.addContract(parent, contract);
  calcAPI.addTeamContract(parent, contract, team);
}

export const declineContract = (parent, contract, team) => {
  let availableContractsArr = parent.state.availableContracts;
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  parent.setState({
    availableContracts: availableContractsArr
  })
}
