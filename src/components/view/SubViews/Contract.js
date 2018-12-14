import React from 'react';
import '../../../assets/css/App-SubViews.css'
import {updateContract} from '../../containers/engineAPIs/mainAPI.js';
import ProgressBar from './ProgressBar.js'

const Contract = (props) => {

  return (
    <div className="App-">
      <p>{props.contract.name}</p>

      <ProgressBar  text="test"
                    contract={props.contract}/>
      <p>{Math.floor(props.contract.progress)} %</p>
      <p>{`${props.contract.description}`}</p>
    </div>
  )
}
export default Contract;
