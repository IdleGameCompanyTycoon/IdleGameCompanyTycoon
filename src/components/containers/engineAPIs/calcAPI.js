import * as mainAPI from './mainAPI.js';

export const addContract = (parent, contract) => {
  let contractsArr = parent.state.activeContracts.slice(0);
  contractsArr.push(contract);
  parent.setState({
    activeContracts: contractsArr
  })
}

export const closeContract =  (parent, contract) => {
  mainAPI.updateMoney(parent, contract.revenue);
  let activeContractsArr = parent.state.activeContracts.slice(0);
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

export const addTeamContract = (parent, contract,  engine) => {
  parent.state.teams[engine.state.selectedTeam].activeContract = true;
  contract.team = engine.state.selectedTeam;
}

export const addTeamEmployee = (engine, dataObj) =>{
  dataObj.team = engine.state.selectedTeam;

}

export const checkContract = (parent, engine, contract) => {
 return !parent.state.teams[engine.state.selectedTeam].activeContract;
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

export const updateProgress = (contract, loc) => {
  contract.written += loc;
  contract.progress = contract.written / contract.loc * 100;
}
