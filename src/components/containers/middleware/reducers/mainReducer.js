import { updateDate, updateMoney, onMonthChange, updateLoc } from '../engineAPIs/mainAPI';
import { UPDATE_DATE, UPDATE_MONEY, ON_MONTH_CHANGE, ON_USER_CLICK } from '../actions/mainActions';

export const mainReducer = next => stateGetter => dispatcher => (action, previousObject) => {
    switch(action.name) {
        case UPDATE_DATE: 
            previousObject = Object.assign({}, previousObject, updateDate(action.value, stateGetter, dispatcher));
            break;
        case UPDATE_MONEY: 
            previousObject = Object.assign({}, previousObject, updateMoney(action.value, stateGetter));
            break;
        case ON_MONTH_CHANGE:
            previousObject = Object.assign({}, previousObject, onMonthChange(stateGetter));
            break;
        case ON_USER_CLICK:
            const locResponse = updateLoc(stateGetter, dispatcher, action.value);
            previousObject = Object.assign({}, previousObject);
            break;
        default:
            break;
    }

    next(action, previousObject);
}