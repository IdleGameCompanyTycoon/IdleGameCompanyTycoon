export const updateMoney = (obj, val) => {
  console.log(obj.state);
  let newMoney = obj.state.money + val;
  obj.setState({
    money: newMoney
  })
}

export const updateDate = (obj, dateObj) => {
  obj.setState({
    date: dateObj
  })
}
