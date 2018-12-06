import React from 'react';
import Contracts from '../SubViews/AvailableContract.js';
import '../../../assets/css/App-Page-Employee-Applications.css';

const AvailableContractsPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.parent.state.availableContracts.map((contract, i) =>
        <Contracts  key={i}
                    contract={contract}
                    parent={props.parent}/>
       )
      }


    </div>
  )
}

export default AvailableContractsPage;
