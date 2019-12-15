import { combineReducers } from './combineReducers';
import allReducers from './allReducers';

export const applyMiddleware = (getState, setState) => {
    let initialReducer = () => {};
    let middleWareStatus = 'WAITING'
    let qeue = [];

    const runFromQeue = () => {
        if (qeue.length > 0) {
            initialReducer(qeue[0]);
            qeue.shift();
        } else {
            middleWareStatus = 'WAITING';
        }
    }

    const dispatcher = (action) => {
        if (middleWareStatus === 'WAITING') {
            middleWareStatus = 'RUNNING';
            initialReducer(action);
        } else {
            qeue.push(action);
        }
    }

    const stateGetter = key => {
        let value = getState(key);

        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                value = [...value];
            } else {
                value = Object.assign({}, value);
            }
        }

        return value;
    }

    const stateSetter = (action, objectToSet) => {
        setState(objectToSet, runFromQeue);
    }

    initialReducer = combineReducers(allReducers, stateGetter, stateSetter, dispatcher);

    return dispatcher;
}

