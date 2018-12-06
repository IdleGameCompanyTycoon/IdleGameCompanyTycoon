import React from 'react';
import {acceptContract} from '../../containers/engineAPIs/mainAPI.js';

const AvailableContract =  (props) => {
  return (
    <div className="App-">
      <p>{props.contract.name}</p>
      <p>LoC to do: {props.contract.loc}</p>
      <p>{`${props.contract.description}`}</p>
      <button
        onClick={() => acceptContract(props.parent, props.contract)
        }>Accept</button>
    </div>
  )
}

export default AvailableContract;
