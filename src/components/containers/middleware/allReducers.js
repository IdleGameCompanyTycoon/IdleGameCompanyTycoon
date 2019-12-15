import { mainReducer } from './reducers/mainReducer';
import { contractReducer } from './reducers/contractReducer';
import { employeeReducer } from './reducers/employeeReducer';
import { fetchReducer } from './reducers/fetchReducer';


export default [
    mainReducer,
    contractReducer,
    employeeReducer,
    fetchReducer
]