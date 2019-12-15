import { acceptContract, declineContract, cancelContract, setContractManualActive, setContractActive } from '../engineAPIs/contractAPI';
import { ACCEPT_CONTRACT, DECLINE_CONTRACT, CANCEL_CONTRACT, SET_CONTRACT_MANUAL_ACTIVE, SET_CONTRACT_ACTIVE } from '../actions/contractActions';

export const contractReducer = next => stateGetter => dispatcher => (action, previousObject) => {
    console.log(action)
    switch(action.name) {
        case ACCEPT_CONTRACT: 
            previousObject = Object.assign({}, previousObject, acceptContract(stateGetter, dispatcher, action.value, action.selectedTeam));
            break;
        case DECLINE_CONTRACT: 
            previousObject = Object.assign({}, previousObject, declineContract(stateGetter, action.value, action.selectedTeam));
            break;
        case CANCEL_CONTRACT: 
            previousObject = Object.assign({}, previousObject, cancelContract(stateGetter, dispatcher, action.value, action.selectedTeam));
            break;
        case SET_CONTRACT_MANUAL_ACTIVE: 
            previousObject = Object.assign({}, previousObject, setContractManualActive(stateGetter, action.value, action.selectedTeam));
            break;
        case SET_CONTRACT_ACTIVE:
            previousObject = Object.assign({}, previousObject, setContractActive(stateGetter, action.value));
            break;
    }

    next(action, previousObject);
}

