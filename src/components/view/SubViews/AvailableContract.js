import React from 'react';

const AvailableContract =  (props) => {
  return (
    <div className="App-page-list-object">

      <p>{props.contract.name}</p>
      <p>Needed Lines of Code: {props.contract.loc}</p>
      <p>Revenue: {`${props.contract.revenue}`}</p>
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
