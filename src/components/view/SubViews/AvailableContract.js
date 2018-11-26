import React from 'react';

const AvailableContract =  (props) => {
  return (
    <div className="App-">


      <p>{`${props.contracts.name}`}</p>
      <p>{`${props.contracts.loc_lower}`}</p>

    </div>
  )
}

export default AvailableContract;
