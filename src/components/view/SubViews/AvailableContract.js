import React from 'react';

const AvailableContract =  (props) => {
  return (
    <div className="App-">
      <p>{props.contract.name}</p>
      <p>LoC to do: {props.contract.loc}</p>
      <p>{`${props.contract.description}`}</p>

      <button
        onClick={() => props.action("acceptContract", props.contract)
        }>Accept</button>

      <button
      onClick={() => props.action("declineContract", props.contract)
      }>Decline</button>
    </div>
  )
}
export default AvailableContract;
