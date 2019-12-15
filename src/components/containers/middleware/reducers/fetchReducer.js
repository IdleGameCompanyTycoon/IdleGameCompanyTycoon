import { ADD_APPLICATION, ADD_CONTRACT } from '../actions/fetchActions';
import AvailableContract from '../../../view/SubViews/AvailableContract';

export const fetchReducer = next => stateGetter => dispatcher => (action, previousObject) => {
    switch(action.name) {
        case ADD_APPLICATION: 
            const availableApplications = stateGetter('availableApplications');
            availableApplications.push(action.value);
            previousObject = Object.assign({}, previousObject, { availableApplications: availableApplications});
            break;
        case ADD_CONTRACT: 
            const availableContracts = stateGetter('availableContracts');
            availableContracts.push(action.value);
            previousObject = Object.assign({}, previousObject, { availableContracts: availableContracts});
            break;
    }

    next(action, previousObject);
}

