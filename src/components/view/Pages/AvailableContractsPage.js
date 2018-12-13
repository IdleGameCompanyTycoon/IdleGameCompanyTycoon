import React from 'react';
import Contracts from '../SubViews/AvailableContract.js';
import '../../../assets/css/App-Page-Employee-Applications.css';

const AvailableContractsPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.availableContracts.map((contract, i) =>
        <Contracts  key={i}
                    contract={contract}
                    action={props.action}/>
       )
      }


    </div>
  )
}

export default AvailableContractsPage;
