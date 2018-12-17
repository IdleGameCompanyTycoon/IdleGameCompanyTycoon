import * as mainAPI from './mainAPI.js';

export const addContract = (parent, contract) => {
  let contractsArr = parent.state.activeContracts;
  contractsArr.push(contract);
  parent.setState({
    activeContracts: contractsArr
  })
}

export const closeContract =  (parent, contract) => {
  mainAPI.updateMoney(parent, contract.revenue);
  let activeContractsArr = parent.state.activeContracts;
  let index =  activeContractsArr.indexOf(contract);
  activeContractsArr.splice(index, 1);

  parent.state.teams[contract.team].activeContract = false;

  parent.setState({

    activeContracts: activeContractsArr
  })
}

export const updateContract = (parent, oldContract, newContract) => {
  mainAPI.declineContract(parent, oldContract);
  addContract(parent, newContract);
}

export const addTeamContract = (parent, contract,  team) => {
  parent.state.teams[team].activeContract = true;
  contract.team = team;
}

export const addTeamEmployee = (team, dataObj) =>{
  dataObj.team = team;

}

export const checkContract = (parent, team, contract) => {
 return !parent.state.teams[team].activeContract;
}

export const notAvailable = () => {
  console.log("You cant accept an other Contract!");
}

export const getContractForTeam = (activeContracts, team) => {
  let teamContract;
  activeContracts.forEach((contract) => {
    if(contract.team == team) teamContract = contract;
  });

  return teamContract;
}

export const employeePayment = (parent) => {
  let payment = 0;
  for(let employee of parent.state.employees){
    payment += employee.payment;
  }
  mainAPI.updateMoney(parent, -payment);
}

export const updateProgress = (contract, loc) => {
  contract.written += loc;
  contract.progress = contract.written / contract.loc * 100;
}
