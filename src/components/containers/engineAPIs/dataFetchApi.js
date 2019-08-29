import environment from '../../../environment.json';

// Initiate the fetching of new applications
export const initApplicationGen = (setParentState, getParentState) => {
  const settings =  environment.settings.applications
  let randomTimer = Math.floor(Math.random() * (settings.maxTime - settings.minTime + 1) + settings.minTime) * 1000;
  setTimeout(() => {
    let availableApplicationsArr = getParentState('availableApplications');
    if(availableApplicationsArr.length < settings.maxApplications) {
      fetch(`http://${environment.backend}/getData?operation=getApplication`)
          .then(res => res.json())
          .then(res => {
            availableApplicationsArr.push(res);
            setParentState('availableApplications', availableApplicationsArr);
            initApplicationGen(setParentState, getParentState);
          })
          .catch(err => {
            console.log(err);
            initApplicationGen(setParentState, getParentState);
          })
    } else {
      initApplicationGen(setParentState, getParentState);
    }
  }, randomTimer)
}

// Initiate the fetching of new applications
export const initContractsGen = (setParentState, getParentState) => {
  const settings =  environment.settings.contracts
  let randomTimer = Math.floor(Math.random() * (settings.maxTime - settings.minTime + 1) + settings.minTime) * 1000;
  setTimeout(() => {
    let availableContractsArr = getParentState('availableContracts');
    if(availableContractsArr.length < settings.maxAvailableContracts) {
      fetch(`http://${environment.backend}/getData?operation=getContract`)
          .then(res => res.json())
          .then(res => {
            availableContractsArr.push(res);
            setParentState('availableContracts', availableContractsArr)
            initContractsGen(setParentState, getParentState);
          })
          .catch(err => {
            console.log(err);
            initContractsGen(setParentState, getParentState);
          })
    } else {
      initContractsGen(setParentState, getParentState);
    }
  }, randomTimer)
}
