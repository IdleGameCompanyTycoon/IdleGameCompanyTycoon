import * as calcAPI from './calcAPI.js';

// Update the money, accepts an integer as dataObj
export const updateMoney = (obj, dataObj) => {
  let newMoney = obj.state.money + dataObj;
  obj.setState({
    money: newMoney
  })
}

// Update the date obj, accepts an dateObj as dataObj
export const updateDate = (parent, days) => {
  let tmpDate = parent.state.date;
  tmpDate.day += days;
  if(tmpDate.day >= 31){
    tmpDate.day -= 31;
    tmpDate.month += 1;

    calcAPI.employeePayment(parent);
  } else if( tmpDate.month >= 12) {
    tmpDate.month -= 1;
    tmpDate.year += 1;

  }
  parent.setState({
    date: tmpDate
  })
}

export const updateEmploeeys = (parent, args, engine) => {
  parent.state.employees.forEach((employee) =>{
    updateLoc(parent, employee.loc, engine);
  });
}

// On an animation frame click this function updates the LoC of the currently
// selected Contract
export const locClick = (obj, dataObj) => {
  let taskId = obj.state.teams[dataObj.selectedTeam].selectedTaskId;
  if(taskId) {

  }
}

export const updateLoc =  (parent, loc, engine) => {
  if(!parent.state.teams[engine.state.selectedTeam].activeContract) return;
  let activeContractsArr = parent.state.activeContracts.slice(0);

  let contract = calcAPI.getContractForTeam(activeContractsArr, engine.state.selectedTeam);
  calcAPI.updateProgress(contract, loc);
  if(contract.progress >= 100){
    calcAPI.closeContract(parent, contract);
  }else {
    parent.setState({
      activeContracts: activeContractsArr
    })
  }
}

export const acceptApplications = (parent, application, engine) => {
  declineApplication(parent, application, engine);

  calcAPI.addTeamEmployee(engine, application);

  let employeesArr = parent.state.employees.slice(0);
  employeesArr.push(application);
  parent.setState({
    employees: employeesArr
  })
}

export const declineApplication =  (parent, application, engine) => {
  let availableApplicationsArr =  parent.state.availableApplications.slice(0);
  let index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  parent.setState({
    availableApplications: availableApplicationsArr
  })
}

export const acceptContract =  (parent, contract, engine) => {
  let team = engine.selectedTeam;
  if(!calcAPI.checkContract(parent, engine, contract)) {
    calcAPI.notAvailable();
    return;
  }
  //remove contract from availableContracy array
  declineContract(parent, contract, engine);

  contract.progress = 0;
  contract.written =  0;
  //add contract to activeContracts array
  calcAPI.addContract(parent, contract);
  calcAPI.addTeamContract(parent, contract, engine);
}

export const declineContract = (parent, contract, engine) => {
  let availableContractsArr = parent.state.availableContracts.slice(0);
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  parent.setState({
    availableContracts: availableContractsArr
  })
}
