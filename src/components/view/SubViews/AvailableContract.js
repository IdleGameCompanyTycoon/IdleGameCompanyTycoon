import React from 'react';
import { ACCEPT_CONTRACT, DECLINE_CONTRACT } from '../../containers/middleware/actions/contractActions';


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
          onClick={() => props.action({ name: ACCEPT_CONTRACT, value: props.contract })
          }>Accept</button>


          <button
            onClick={() => props.action({ name: DECLINE_CONTRACT, value: props.contract })
            }>Decline</button>


          </div>

          <hr>

          </hr>

        </div>
  )
}
export default AvailableContract;
