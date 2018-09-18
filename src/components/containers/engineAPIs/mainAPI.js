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
export const locClick = (obj, dataObj) {
  let taskId = obj.state.teams[dataObj.selectedTeam].selectedTaskId;
  if(taskId) {

  }
}
