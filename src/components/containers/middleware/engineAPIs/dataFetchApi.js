import environment from '../../../../environment.json';
import { ADD_APPLICATION, ADD_CONTRACT } from '../actions/fetchActions';

// Initiate the fetching of new applications
export const initApplicationGen = (stateGetter, dispatcher) => {
  const settings =  environment.settings.applications
  let randomTimer = Math.floor(Math.random() * (settings.maxTime - settings.minTime + 1) + settings.minTime) * 1000;
  setTimeout(() => {
    let availableApplicationsArr = stateGetter('availableApplications');
    if(availableApplicationsArr.length < settings.maxApplications) {
      fetch(`https://${environment.backend}/getData?operation=getApplication`)
          .then(res => res.json())
          .then(res => {
            dispatcher({ name: ADD_APPLICATION, value: res });
            initApplicationGen(stateGetter, dispatcher);
          })
          .catch(err => {
            console.log(err);
            initApplicationGen(stateGetter, dispatcher);
          })
    } else {
      initApplicationGen(stateGetter, dispatcher);
    }
  }, randomTimer)
}

// Initiate the fetching of new applications
export const initContractsGen = (stateGetter, dispatcher) => {
  const settings =  environment.settings.contracts
  let randomTimer = Math.floor(Math.random() * (settings.maxTime - settings.minTime + 1) + settings.minTime) * 1000;
  setTimeout(() => {
    let availableContractsArr = stateGetter('availableContracts');
    if(availableContractsArr.length < settings.maxAvailableContracts) {
      fetch(`https://${environment.backend}/getData?operation=getContract`)
          .then(res => res.json())
          .then(res => {
            dispatcher({ name: ADD_CONTRACT, value: res });
            initContractsGen(stateGetter, dispatcher);
          })
          .catch(err => {
            console.log(err);
            initContractsGen(stateGetter, dispatcher);
          })
    } else {
      initContractsGen(stateGetter, dispatcher);
    }
  }, randomTimer)
}
