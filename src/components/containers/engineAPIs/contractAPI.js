import { updateMoney, notAvailable } from './mainAPI.js';
import * as employeeAPI from './employeeAPI.js';
import environment from '../../../environment.json';

export const addContract = (setParentState, contract, team, getParentState) => {
  let volumeArray = getParentState('volumeContracts');
  let contractsArr = getParentState('activeContracts');
  contractsArr.push(contract);
  contract.team = team;
  setParentState(null, {
    activeContracts: contractsArr,
    volumeContracts: volumeArray
  })

}

export const closeContract =  (setParentState, contract, getParentState) => {
  if(contract.type === "volume" && contract.terminated !== true) return;
  let activeContractsArr = getParentState('activeContracts');
  let index =  activeContractsArr.indexOf(contract);
  activeContractsArr.splice(index, 1);
  setContractActive(setParentState, undefined, undefined, getParentState);
  setParentState('activeContracts', activeContractsArr);
}

export const cancelContract = (setParentState, contract, team, getParentState) => {
  contract.terminated = true;
  if(contract.contractType !== "volume"){
    closeContract(setParentState, contract, getParentState);
    updateMoney(setParentState, Math.floor(-contract.revenue*environment.settings.contracts.costForCancel), undefined, getParentState);
  }else{
    contract.time =  31 - getParentState('date').day;
  }
}

export const resetVolumeContract = (setParentState, getParentState) => {
  let revenue = 0;
  getParentState('volumeContracts').forEach((contract) => {
    getParentState('activeContracts').push(contract);
  });

  getParentState('activeContracts').forEach((contract) => {
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
  setParentState('volumeContracts', []);
  setContractActive(setParentState, undefined, undefined, getParentState);
  if(revenue !== 0){
      updateMoney(setParentState, revenue, undefined, getParentState);
  }
  setParentState({});
}

export const updateContract = (setParentState, oldContract, newContract, getParentState) => {
  declineContract(setParentState, oldContract, null, getParentState);
  addContract(setParentState, newContract, null, getParentState);
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

export const updateProgress = (setParentState, contract, loc, getParentState) => {
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
      getParentState('volumeContracts').push(contract);
    }else{
      updateMoney(setParentState, contract.revenue, undefined, getParentState);
    }
    closeContract(setParentState, contract, getParentState);
  }
  return remain;
}

export const declineContract = (setParentState, contract, team, getParentState) => {
  let availableContractsArr = getParentState('availableContracts');
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  setParentState('availableContracts', availableContractsArr);
}

export const acceptContract =  (setParentState, contract, team, getParentState) => {
  if(!calcNumberOfContracts(getParentState, team)) {
    notAvailable();
    return;
  }
  declineContract(setParentState, contract, team, getParentState);
  contract.progress = 0;
  contract.written =  0;

  switch (contract.contractType) {
    case "timed": contract.time = 10;
      break;
    case "basic": contract.time = -1;
      break;
    case "volume": contract.time = 1;
        contract.terminated = false;
        contract.dateOfBegin = getParentState('date').day;
  }

  //add contract to activeContracts array
  addContract(setParentState, contract, team, getParentState);
  setContractActive(setParentState, undefined, undefined, getParentState);
}

export const timeContracts = (setParentState, getParentState) => {
  getParentState('activeContracts').forEach((contract) => {
    if((contract.contractType === "timed" || contract.terminated === true) && --contract.time < 1){
      closeContract(setParentState, contract, getParentState);
      updateMoney(setParentState, Math.floor(-contract.revenue*environment.settings.contracts.costForCancel), undefined, getParentState);
    }
  });
  getParentState('volumeContracts').forEach((contract) => {
    if(contract.terminated === true && --contract.time < 1){
      closeContract(setParentState, contract, getParentState);
      updateMoney(setParentState, Math.floor(-contract.revenue*environment.settings.contracts.costForCancel), undefined, getParentState);
    }
  })
  setParentState({});
}

export const calcNumberOfContracts = (getParentState, team) => {
  let maxActive = environment.settings.contracts.maxActiveContracts;
  let number = 0;
  getParentState('activeContracts').forEach((contract) => {
      if(contract.team === team){
        number++;
      }
  });

  getParentState('volumeContracts').forEach((contract) => {
      if(contract.team === team){
        number++;
      }
  });
  getParentState('teams')[team].numberOfContracts = number;
    if(number >= maxActive){
      return false;
    }else{
      return true;
    }


}

export const setContractManualActive = (setParentState, contract, team, getParentState) => {
  contract.pinned = true;
  if(getParentState('activeContracts')[0] === contract) {
    setParentState({});
    return;
  }
  setContractActive(setParentState, contract, team, getParentState);
}

export const setContractActive = (setParentState, contract, team = 0, getParentState) => {
  let activeContractsArr = getParentState('activeContracts');
  if(activeContractsArr.length <= 0){
    getParentState('teams')[team].activeContract = false;
    return;
  }
  if(contract === undefined){
    activeContractsArr.forEach((tmpContract) => {
      if(tmpContract.contractType !== "basic"){
        setContractActive(setParentState, tmpContract, team, getParentState);
        return;
      }
    });
    activeContractsArr[0].active = true;
    getParentState('teams')[team].activeContract = true;
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
  setParentState('activeContracts', activeContractsArr);
}
