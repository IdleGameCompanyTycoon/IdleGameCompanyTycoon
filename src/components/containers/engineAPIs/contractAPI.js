import * as mainAPI from './mainAPI.js';
import * as employeeAPI from './employeeAPI.js';
import environment from '../../../environment.json';

export const addContract = (parent, team, contract) => {
  let contractsArr = parent.state.activeContracts;
  contractsArr.push(contract);
  ++parent.state.teams[team].numberOfContracts;
  contract.team = team;
  parent.setState({
    activeContracts: contractsArr
  })
}

export const closeContract =  (parent, contract) => {
  mainAPI.updateMoney(parent, contract.revenue);
  let activeContractsArr = parent.state.activeContracts;
  let index =  activeContractsArr.indexOf(contract);
  activeContractsArr.splice(index, 1);
  --parent.state.teams[contract.team].numberOfContracts;
  if(activeContractsArr.length <= 0){
    //if no active contracts left, set the activeContracts attribute to false
    parent.state.teams[contract.team].activeContract = false;
  }else{
    //set the first contract in the array as active
    activeContractsArr[0].active = true;
  }

  parent.setState({
    activeContracts: activeContractsArr
  })
}

export const updateContract = (parent, oldContract, newContract) => {
  declineContract(parent, oldContract);
  addContract(parent, newContract);
}

export const checkContract = (parent, team, contract) => {
 if(parent.state.teams[team].numberOfContracts > environment.settings.contracts.maxActiveContracts){
   return false;
 }else{
   return true;
 }
}

export const getActiveContractForTeam = (activeContracts, team) => {
  let teamContract;
  activeContracts.forEach((contract) => {
    if(contract.team == team && contract.active){
      teamContract = contract;
    }
  });

  return teamContract;
}

export const updateProgress = (parent, contract, loc) => {
  contract.written += loc;
  contract.progress = contract.written / contract.loc * 100;

  if(contract.progress >= 100){
    closeContract(parent, contract);
  }
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

  if(!parent.state.teams[team].activeContract){
    contract.active = true;
    parent.state.teams[team].activeContract = true;

  }else {
    contract.active =  false;
  }

  //remove contract from availableContracy array
  declineContract(parent, contract, team);
  contract.progress = 0;
  contract.written =  0;
  //add contract to activeContracts array
  addContract(parent, team, contract);
}
