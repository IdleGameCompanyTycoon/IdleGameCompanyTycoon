import React from 'react';

const EmployeeApplication = (props) => {

  return (
    <div>
      <hr>
      </hr>
      <div className="App-page-list-object">

        <table>
          <tbody>
          <tr>
            <td style={{width:7 + "vw"}}>
              <img
              src={props.application.imgUrl}
              alt="picture of employee"/>
            </td>
            <td>
              {/* TODO: Add Data*/}
              {`${props.application.givenName} ${props.application.lastName}`}
              <p>
                Work speed: {props.application.loc} LoC
              </p>

              <p>Salary: {props.application.payment}€</p>



              <button
                onClick={() => props.action("acceptApplication", props.application)
                }>Accept</button>


                <button
                  onClick={() => props.action("declineApplication", props.application)
                  }>Decline</button>
            </td>
          </tr>
          </tbody>
        </table>


          </div>

          <hr>
          </hr>

        </div>

  )
}

export default EmployeeApplication;
