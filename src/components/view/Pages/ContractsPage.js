import React from 'react';
import Contracts from '../SubViews/Contract.js'
import '../../../assets/css/App-Page-ListBody.css';

const ContractsPage = (props) => {
  return (
    <div className='App-page'>
      <div className="App-page-list">
      {
        props.contracts.map((contract, i) =>
          <Contracts  key={i}
                      contract={contract}
                      action={props.action}/>
       )
      }
      </div>
    </div>
  )
}

export default ContractsPage;
