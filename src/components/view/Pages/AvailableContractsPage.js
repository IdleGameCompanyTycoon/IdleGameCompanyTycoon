import React from 'react';
import Contracts from '../SubViews/AvailableContract.js';
import '../../../assets/css/App-Page-ListBody.css';

const AvailableContractsPage = (props) => {
  return (
    <div className='App-page'>
      <div className="App-page-list">
      {
        props.availableContracts.map((contract, i) =>
        <Contracts  key={i}
                    contract={contract}
                    action={props.action}/>
       )
      }

      </div>
    </div>
  )
}

export default AvailableContractsPage;
