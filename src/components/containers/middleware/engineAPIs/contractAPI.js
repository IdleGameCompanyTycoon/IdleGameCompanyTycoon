import { updateMoney, notAvailable } from './mainAPI.js';
import * as employeeAPI from './employeeAPI.js';
import environment from '../../../../environment.json';
import { UPDATE_MONEY } from '../actions/mainActions';
import { SET_CONTRACT_ACTIVE } from '../actions/contractActions';

export const addContract = (contract, team, stateGetter, contractsArr = stateGetter('activeContracts')) => {
  contractsArr.push(contract);
  contract.team = team;
  return { activeContracts: contractsArr };

}

export const closeContract =  (stateGetter, dispatcher, contract, activeContractsArr) => {
  if(contract.type === "volume" && contract.terminated !== true) return;
  activeContractsArr = activeContractsArr || stateGetter('activeContracts');
  let index =  activeContractsArr.indexOf(contract);
  activeContractsArr.splice(index, 1);
  dispatcher({ name: SET_CONTRACT_ACTIVE });
  return activeContractsArr;
}

//if Contract is cancel manually from user
export const cancelContract = (stateGetter, dispatcher, contract, team = 0) => {
  contract.terminated = true;
  if(contract.contractType !== "volume"){
    const activeContracts = closeContract(stateGetter, dispatcher, contract);
    dispatcher({ name: UPDATE_MONEY, value: contract.penalty });
    return { activeContracts: activeContracts };
  }else{
    contract.time =  31 - stateGetter('date').day;
  }
  return;
}

export const resetVolumeContract = (stateGetter, dispatcher, activeContractsArray = stateGetter('activeContracts'), volumeContracts = stateGetter('volumeContracts')) => {
  let revenue = 0;
  volumeContracts.forEach((contract) => {
    activeContractsArray.push(contract);
  });

  activeContractsArray.forEach((contract) => {
    if(contract.contractType !== "volume") return;
    if(contract.progress < 100){
      revenue -= Math.floor(contract.penalty * contract.dateOfBegin / 30);
    }else{
      revenue += Math.floor(contract.revenue * contract.dateOfBegin / 30);
    }
    contract.dateOfBegin = 1;
    contract.written = 0;
    contract.progress = 0;
    contract.active = false;
  });

  const activeContractObject = setContractActive(stateGetter, dispatcher, activeContractsArray);
  if(revenue !== 0){
      dispatcher({ name: UPDATE_MONEY, value: revenue })
  }

  return Object.assign({}, { activeContracts: activeContractsArray, volumeContracts: [] }, activeContractObject);
}

export const updateContract = (stateGetter, oldContract, newContract) => {
  let activeContracts = declineContract(stateGetter, oldContract).activeContracts;
  activeContracts = addContract(newContract, 0, stateGetter, activeContracts).activeContracts;
  return activeContracts;
}

export const getActiveContractForTeam = (activeContracts, team) => {
  let teamContract;
  activeContracts.forEach((contract) => {
    if(contract && (contract.team === team) && contract.active){
      teamContract = contract;
    }
  });

  return teamContract;
}

export const updateProgress = (stateGetter, dispatcher, contract, loc, activeContractsArr, volumeContracts) => {
  contract.written += loc;
  contract.progress = contract.written / contract.loc * 100;
  let remain;
  if(contract.progress > 100){
    remain = contract.written - contract.loc;
    contract.written -= remain;
    contract.progress = contract.written / contract.loc * 100;
  }

  volumeContracts = volumeContracts || stateGetter('volumeContracts');
  activeContractsArr = activeContractsArr || stateGetter('activeContracts');


  if(contract.progress >= 100){
    if(contract.contractType === "volume"){
      contract.pinned = false;
      volumeContracts.push(contract);
    }else{
      dispatcher({ name: UPDATE_MONEY, value: contract.revenue });
    }
    activeContractsArr = closeContract(stateGetter, dispatcher, contract);
  }
  return [remain, volumeContracts, activeContractsArr];
}

export const declineContract = (stateGetter, contract, team = 0) => {
  let availableContractsArr = stateGetter('availableContracts');
  let index = availableContractsArr.indexOf(contract);

  if(index > -1) availableContractsArr.splice(index, 1);

  return { availableContracts: availableContractsArr };
}

export const acceptContract =  (stateGetter, dispatcher, contract, team = 0) => {

  if(contract.contractType === "volume" && !calcNumberOfContracts(stateGetter, team)) {
    notAvailable();
    return;
  }

  let availableContracts = declineContract(stateGetter, contract, team).availableContracts;
  contract.progress = 0;
  contract.written =  0;
  let remain, 
  volumeContracts = stateGetter('volumeContracts'), 
  activeContractsArr;


  switch (contract.contractType) {
    case "timed": contract.time = 10;
      break;
    case "basic": contract.time = -1;
      break;
    case "volume": contract.time = 1;
        contract.terminated = false;
        contract.dateOfBegin = stateGetter('date').day;
        let freeLoc = Math.floor(contract.loc * (contract.dateOfBegin / 30));
        [remain, volumeContracts, activeContractsArr] = updateProgress(stateGetter, dispatcher, contract, freeLoc);
  }

  //add contract to activeContracts array
  activeContractsArr = addContract(contract, team, stateGetter, activeContractsArr).activeContracts;
  const activeContractResponse = setContractActive(stateGetter, undefined, activeContractsArr);

  return Object.assign({ activeContracts: activeContractsArr, volumeContracts: volumeContracts, availableContracts: availableContracts }, activeContractResponse);
}

export const timeContracts = (stateGetter, dispatcher, activeContractsArr = stateGetter('activeContracts'), volumeContracts = stateGetter('volumeContracts')) => {
  stateGetter('activeContracts').forEach((contract) => {
    if((contract.contractType === "timed" || contract.terminated === true) && --contract.time < 1){
      activeContractsArr = closeContract(stateGetter, dispatcher, contract, activeContractsArr);
      dispatcher({ name: UPDATE_MONEY, value: contract.penalty });
    }
  });
  stateGetter('volumeContracts').forEach((contract) => {
    if(contract.terminated === true && --contract.time < 1){
      activeContractsArr = closeContract(stateGetter, dispatcher, contract, activeContractsArr);
      dispatcher({ name: UPDATE_MONEY, value: contract.penalty });
    }
  })
  return { activeContracts: activeContractsArr,  volumeContracts: volumeContracts };
}

export const calcNumberOfContracts = (getParentState, team) => {
  let maxActive = environment.settings.contracts.maxActiveContracts;
  let number = 0;
  getParentState('activeContracts').forEach((contract) => {
      if(contract.team === team && contract.contractType === "volume"){
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

export const setContractManualActive = (stateGetter, contract, team, activeContractsArray = stateGetter('activeContracts')) => {
  contract.pinned = true;
  if(stateGetter('activeContracts')[0] === contract) {
    return;
  }
  return setContractActive(stateGetter, contract, activeContractsArray, team);
}

export const setContractActive = (stateGetter, contract, activeContractsArr = stateGetter('activeContracts'),  team = 0) => {
  if(activeContractsArr.length <= 0){
    const teams = stateGetter('teams');
    teams[team].activeContract = false;
    return { teams: teams };
  }
  if(contract === undefined){
    let teams;
    activeContractsArr.forEach((tmpContract) => {
      // if(tmpContract.contractType !== "basic"){
      //   // const updatedValues = setContractActive(stateGetter, contract, activeContractsArr, team);
      //   // teams = Object.assign({}, teams, updatedValues.teams);
      //   // activeContractsArr = Object.assign({}, activeContractsArr, updatedValues.activeContractsArr);
      //   // return;
      // }
    });
    activeContractsArr[0].active = true;
    teams = teams || stateGetter('teams');
    teams[team].activeContract = true;
    return { teams: teams, activeContracts: activeContractsArr };
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

  return { activeContracts: activeContractsArr };
}
