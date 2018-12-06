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

export const acceptApplications = (obj, dataObj) => {
  //remove apllication from availbleApplications Array
  let index = obj.state.availableApplications.indexOf(dataObj);
  if (index > -1) {
    obj.state.availableApplications.splice(index, 1);
  }
  //add the employee to the Array employees
  let employeesArr = obj.state.employees;
  employeesArr.push(dataObj);
  obj.setState({
    employees: employeesArr
  })
}

export const acceptContract =  (parent, contract) => {
  try{
    //remove contract from availableContracy array
    let index = parent.state.availableContracts.indexOf(contract);
    if (index < 0) throw "index is less than 0";
    parent.state.availableContracts.splice(index, 1);

    //add contract to activeContracts array
    let contractsArr = parent.state.activeContracts;
    contractsArr.push(contract);
    parent.setState({
      activeContracts: contractsArr
    })

  } catch (e){
    console.log(e);
  }
}
