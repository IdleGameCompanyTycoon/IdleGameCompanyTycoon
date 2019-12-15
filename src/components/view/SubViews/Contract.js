import React from 'react';
import '../../../assets/css/App-SubViews.css'
//import {updateContract} from '../../containers/engineAPIs/mainAPI.js';
import ProgressBar from './ProgressBar.js'
import { CANCEL_CONTRACT, SET_CONTRACT_MANUAL_ACTIVE } from '../../containers/middleware/actions/contractActions';

const Contract = (props) => {
  return (
    <div>

    <div className="App-page-list-object">
      <p>{props.contract.name}</p>
      <ProgressBar
                    contract={props.contract}
                    text={Math.floor(props.contract.progress)}/>
                  <p>Progress: {Math.floor(props.contract.written)} of {props.contract.loc}</p>
      <p>Revenue: {`${props.contract.revenue}`}€</p>
        <p>
          This is a {props.contract.contractType} Contract
        </p>
        <p>Time left: {props.contract.time}</p>
        <p>Pinned: {`${props.contract.pinned}`}</p>
      <button
        onClick={() => props.action({ name: CANCEL_CONTRACT, value: props.contract })
      }>Cancel</button>

      <button
        onClick={() => props.action({ name: SET_CONTRACT_MANUAL_ACTIVE, value: props.contract})
      }>set Active</button>


    </div>
    <hr>
    </hr>
    </div>
  )
}
export default Contract;
