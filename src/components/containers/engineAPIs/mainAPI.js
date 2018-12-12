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

export const acceptApplications = (parent, application) => {
  declineApplication(parent, application);
  //add the employee to the Array employees
  let employeesArr = parent.state.employees.slice(0);
  employeesArr.push(application);
  parent.setState({
    employees: employeesArr
  })
}

export const declineApplication =  (parent, application) => {
  let availableApplicationsArr =  parent.state.availableApplications.slice(0);
  let index = availableApplicationsArr.indexOf(application);
  if(index > -1) availableApplicationsArr.splice(index, 1);

  parent.setState({
    availableApplications: availableApplicationsArr
  })
}

export const acceptContract =  (parent, contract) => {
  //remove contract from availableContracy array
  declineContract(parent, contract);

  //add contract to activeContracts array
  let contractsArr = parent.state.activeContracts.slice(0);
  contractsArr.push(contract);
  parent.setState({
    activeContracts: contractsArr
  })
}

export const declineContract = (parent, contract) => {
  let availableContractsArr = parent.state.availableContracts.slice(0);
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  parent.setState({
    availableContracts: availableContractsArr
  })
}
