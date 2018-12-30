import React from 'react';
import '../../../assets/css/App-SubViews.css'
//import {updateContract} from '../../containers/engineAPIs/mainAPI.js';
import ProgressBar from './ProgressBar.js'

const Contract = (props) => {

  return (
    <div>
      <hr>
      </hr>
    <div className="App-page-list-object">
      <p>{props.contract.name}</p>
      <ProgressBar
                    contract={props.contract}/>
                  <p>Progress: {Math.floor(props.contract.progress)} % of {props.contract.loc}</p>
      <p>Revenue: {`${props.contract.revenue}`} $</p>
      <button
        onClick={() => props.action("cancelContract", props.contract)
      }>Cancel</button>
    </div>
    <hr>
    </hr>
    </div>
  )
}
export default Contract;
