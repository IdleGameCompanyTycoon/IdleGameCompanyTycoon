import * as calcAPI from './calcAPI.js';

// Update the money, accepts an integer as dataObj
export const updateMoney = (obj, dataObj) => {
  let newMoney = obj.state.money + dataObj;
  obj.setState({
    money: newMoney
  })
}

// Update the date obj, accepts an dateObj as dataObj
export const updateDate = (obj, dataObj) => {
  obj.setState({
    date: dataObj
  })
}

// On an animation frame click this function updates the LoC of the currently
// selected Contract
export const locClick = (obj, dataObj) => {
  let taskId = obj.state.teams[dataObj.selectedTeam].selectedTaskId;
  if(taskId) {

  }
}

export const updateLoc =  (parent, engine, dataObj) => {
  let contract =  parent.state.activeContracts[0];

  contract.progress += dataObj;

  if(contract.progress >= 100){
    calcAPI.closeContract(parent, parent.state.activeContracts[0]);
  }else {
    calcAPI.updateContract(parent, parent.state.activeContracts[0], contract);
    console.log("RUN");
  }
}

export const acceptApplications = (parent, engine, application) => {
  declineApplication(parent, engine, application);

  calcAPI.addTeamEmployee(engine, application);

  let employeesArr = parent.state.employees.slice(0);
  employeesArr.push(application);
  parent.setState({
    employees: employeesArr
  })
}

export const declineApplication =  (parent, engine, application) => {
  let availableApplicationsArr =  parent.state.availableApplications.slice(0);
  let index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  parent.setState({
    availableApplications: availableApplicationsArr
  })
}

export const acceptContract =  (parent, engine, contract) => {
  let team = engine.selectedTeam;
  if(!calcAPI.checkContract(parent, engine, contract)) {
    calcAPI.notAvailable();
    return;
  }
  //remove contract from availableContracy array
  declineContract(parent, engine, contract);

  //add contract to activeContracts array
  calcAPI.addContract(parent, contract);
  calcAPI.addTeamContract(parent, engine, contract);
}

export const declineContract = (parent, engine, contract) => {
  let availableContractsArr = parent.state.availableContracts.slice(0);
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  parent.setState({
    availableContracts: availableContractsArr
  })
}
