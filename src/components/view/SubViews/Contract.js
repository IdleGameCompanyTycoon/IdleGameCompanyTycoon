import React from 'react';

const Contract = (props) => {
  // Add Progress Bar via Child Notation

  return (
    <div className="App-">
      <p>{props.contract.name}</p>
      <p>LoC to do: {props.contract.loc}</p>
      <p>{`${props.contract.description}`}</p>
    </div>
  )
}

export default Contract;
