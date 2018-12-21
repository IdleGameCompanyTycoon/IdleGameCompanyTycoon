import React from 'react';
import Contracts from '../SubViews/Contract.js'

const ContractsPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.contracts.map((contract, i) =>
          <Contracts  key={i}
                      contract={contract}
                      action={props.action}/>
       )
      }
    </div>
  )
}

export default ContractsPage;
