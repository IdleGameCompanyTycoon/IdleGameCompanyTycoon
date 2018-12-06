import React from 'react';
import Contracts from '../SubViews/Contract.js'

const ContractsPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.contracts.map((contract, i) =>
          <Contracts  key={i}
                      contract={contract}
                      parent={props.parent}/>
       )
      }
    </div>
  )
}

export default ContractsPage;
