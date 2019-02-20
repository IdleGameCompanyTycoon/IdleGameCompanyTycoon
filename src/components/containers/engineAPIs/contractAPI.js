import * as mainAPI from './mainAPI.js';
import * as employeeAPI from './employeeAPI.js';
import environment from '../../../environment.json';

export const addContract = (parent, team, contract) => {
  let volumeArray = parent.state.volumeContracts;
  let contractsArr = parent.state.activeContracts;
  contractsArr.push(contract);
  contract.team = team;
  parent.setState({
    activeContracts: contractsArr,
    volumeContracts: volumeArray
  })

}

export const closeContract =  (parent, contract) => {
  if(contract.type === "volume" && contract.terminated !== true) return;
  let activeContractsArr = parent.state.activeContracts;
  let index =  activeContractsArr.indexOf(contract);
  activeContractsArr.splice(index, 1);
  setContractActive(parent);
  parent.setState({
    activeContracts: activeContractsArr
  })
}

export const cancelContract = (parent, contract, team) => {
  contract.terminated = true;
  if(contract.contractType !== "volume"){
    closeContract(parent, contract);
    mainAPI.updateMoney(parent, Math.floor(-contract.revenue*environment.settings.contracts.costForCancel));
  }else{
    contract.time =  31 - parent.state.date.day;
  }
}

export const resetVolumeContract = (parent) => {
  let revenue = 0;
  parent.state.volumeContracts.forEach((contract) => {
    parent.state.activeContracts.push(contract);
  });

  parent.state.activeContracts.forEach((contract) => {
    if(contract.contractType !== "volume") return;
    if(contract.progress < 100){
      revenue -= Math.floor(contract.revenue*environment.settings.contracts.costForCancel / contract.dateOfBegin);
    }else{
      revenue += Math.floor(contract.revenue / contract.dateOfBegin);
    }
    contract.dateOfBegin = 1;
    contract.written = 0;
    contract.progress = 0;
    contract.active = false;
  });
  parent.state.volumeContracts = [];
  setContractActive(parent);
  if(revenue !== 0){
      mainAPI.updateMoney(parent, revenue);
  }
  parent.setState({});
}

export const updateContract = (parent, oldContract, newContract) => {
  declineContract(parent, oldContract);
  addContract(parent, newContract);
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
  let remain;
  if(contract.progress > 100){
    remain = contract.written - contract.loc;
    contract.written -= remain;
    contract.progress = contract.written / contract.loc * 100;
  }

  if(contract.progress >= 100){
    if(contract.contractType === "volume"){
      contract.pinned = false;
      parent.state.volumeContracts.push(contract);
    }else{
      mainAPI.updateMoney(parent, contract.revenue);
    }
    closeContract(parent, contract);
  }
  return remain;
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
  if(!calcNumberOfContracts(parent, team)) {
    mainAPI.notAvailable();
    return;
  }
  declineContract(parent, contract, team);
  contract.progress = 0;
  contract.written =  0;

  switch (contract.contractType) {
    case "timed": contract.time = 10;
      break;
    case "basic": contract.time = -1;
      break;
    case "volume": contract.time = 1;
        contract.terminated = false;
        contract.dateOfBegin = parent.state.date.day;
  }

  //add contract to activeContracts array
  addContract(parent, team, contract);
  setContractActive(parent);
}

export const timeContracts = (parent) => {
  parent.state.activeContracts.forEach((contract) => {
    if((contract.contractType === "timed" || contract.terminated === true) && --contract.time < 1){
      closeContract(parent, contract);
      mainAPI.updateMoney(parent, Math.floor(-contract.revenue*environment.settings.contracts.costForCancel));
    }
  });
  parent.state.volumeContracts.forEach((contract) => {
    if(contract.terminated === true && --contract.time < 1){
      closeContract(parent, contract);
      mainAPI.updateMoney(parent, Math.floor(-contract.revenue*environment.settings.contracts.costForCancel));
    }
  })
  parent.setState({});
}

export const calcNumberOfContracts = (parent, team) => {
  let maxActive = environment.settings.contracts.maxActiveContracts;
  let number = 0;
  parent.state.activeContracts.forEach((contract) => {
      if(contract.team === team){
        number++;
      }
  });

  parent.state.volumeContracts.forEach((contract) => {
      if(contract.team === team){
        number++;
      }
  });
  parent.state.teams[team].numberOfContracts = number;
    if(number >= maxActive){
      return false;
    }else{
      return true;
    }


}

export const setContractManualActive = (parent, contract, team) => {
  contract.pinned = true;
  if(parent.state.activeContracts[0] === contract) {
    parent.setState({});
    return;
  }
  setContractActive(parent, contract, team);
}

export const setContractActive = (parent, contract, team = 0) => {
  let activeContractsArr = parent.state.activeContracts;
  if(activeContractsArr.length <= 0){
    parent.state.teams[team].activeContract = false;
    return;
  }
  if(contract === undefined){
    activeContractsArr.forEach((tmpContract) => {
      if(tmpContract.contractType !== "basic"){
        setContractActive(parent, tmpContract, team);
        return;
      }
    });
    activeContractsArr[0].active = true;
    parent.state.teams[team].activeContract = true;
    return;
  }

  if(contract.progress === 100){
    return;
  }

  if(contract.pinned === true){
    activeContractsArr[0].pinned = false;
  }else if(activeContractsArr[0].pinned === true){
    return;
  }

  activeContractsArr[0].active = false;
  let index = activeContractsArr.indexOf(contract);
  activeContractsArr.splice(index, 1);
  activeContractsArr.unshift(contract);
  activeContractsArr[0].active = true;
  parent.setState({
    activeContracts: activeContractsArr
  })
}
