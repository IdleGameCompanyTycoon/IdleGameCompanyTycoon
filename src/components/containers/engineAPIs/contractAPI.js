import * as mainAPI from './mainAPI.js';
import * as employeeAPI from './employeeAPI.js';

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
  declineContract(parent, oldContract);
  addContract(parent, newContract);
}

export const addTeamContract = (parent, contract,  team) => {
  parent.state.teams[team].activeContract = true;
  contract.team = team;
}

export const checkContract = (parent, team, contract) => {
 return !parent.state.teams[team].activeContract;
}

export const getContractForTeam = (activeContracts, team) => {
  let teamContract;
  activeContracts.forEach((contract) => {
    if(contract.team == team) teamContract = contract;
  });

  return teamContract;
}

export const updateProgress = (contract, loc) => {
  contract.written += loc;
  contract.progress = contract.written / contract.loc * 100;
}

export const declineContract = (parent, contract, team) => {
  let availableContractsArr = parent.state.availableContracts;
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  parent.setState({
    availableContracts: availableContractsArr
  })
}

export const acceptContract =  (parent, contract, team) => {
  if(!checkContract(parent, team, contract)) {
    mainAPI.notAvailable();
    return;
  }
  //remove contract from availableContracy array
  declineContract(parent, contract, team);

  contract.progress = 0;
  contract.written =  0;
  //add contract to activeContracts array
  addContract(parent, contract);
  addTeamContract(parent, contract, team);
}
