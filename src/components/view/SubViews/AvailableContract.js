import React from 'react';

const AvailableContract =  (props) => {
  return (
    <div>
      <hr>
      </hr>
      <div className="App-page-list-object">


        <p>
          {props.contract.name}
        </p>
        <p>
          This is a {props.contract.contractType} Contract
        </p>
        <p>
          Needed Lines of Code: {props.contract.loc}
        </p>

        <p>
          Revenue: {`${props.contract.revenue}€`}
        </p>

        <button
          onClick={() => props.action("acceptContract", props.contract)
          }>Accept</button>


          <button
            onClick={() => props.action("declineContract", props.contract)
            }>Decline</button>


          </div>

          <hr>

          </hr>

        </div>
  )
}
export default AvailableContract;
