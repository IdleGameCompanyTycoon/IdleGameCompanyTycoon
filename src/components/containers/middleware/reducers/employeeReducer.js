import { acceptApplications, declineApplication, fireEmployee, keepTrainee } from '../engineAPIs/employeeAPI';
import { ACCEPT_APPLICATIONS, DECLINE_APPLICATION, FIRE_EMPLOYEE, KEEP_TRAINEE } from '../actions/employeeActions';

export const employeeReducer = next => stateGetter => dispatcher => (action, previousObject) => {
    switch(action.name) {
        case ACCEPT_APPLICATIONS: 
            previousObject = Object.assign({}, previousObject, acceptApplications(stateGetter, dispatcher, action.value, action.selectedTeam));
            break;
        case DECLINE_APPLICATION: 
            previousObject = Object.assign({}, previousObject, declineApplication(stateGetter, action.value, action.selectedTeam));
            break;
        case FIRE_EMPLOYEE: 
            fireEmployee(action.value);
            break;
        case KEEP_TRAINEE: 
            previousObject = Object.assign({}, previousObject, keepTrainee(stateGetter, action.value, action.selectedTeam));
            break;
    }

    next(action, previousObject);
}

