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
  activeContractsArr.splice(0,1);
  parent.setState({
    activeContracts: activeContractsArr
  })
}

export const updateContract = (parent, oldContract, newContract) => {
  mainAPI.declineContract(parent, oldContract);
  addContract(parent, newContract);
}

export const addTeamContract = (parent, engine, contract) => {
  parent.state.teams[engine.state.selectedTeam].activeContract = true;
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
