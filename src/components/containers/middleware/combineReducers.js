export const combineReducers = (reducersArray, stateGetter, stateSetter, dispatcher) => {
    return invokeReducers(reducersArray, 0, stateGetter, stateSetter, dispatcher)
}


const invokeReducers = (reducers, i, stateGetter, stateSetter, dispatcher) => {
    let newReducer;
    if (reducers.length > i+1) {
        newReducer = reducers[i](invokeReducers(reducers, i+1, stateGetter, stateSetter, dispatcher));
    } else {
        newReducer = reducers[i](stateSetter);
    }

    return newReducer(stateGetter)(dispatcher);
}
