import React from 'react';

const EmployeeApplication = (props) => {
  console.log(props)

  return (
    <div className="App-">
      {/* TODO: Add Data*/}
      <p>{`${props.application.firstName} ${props.application.givenName}`}</p>
      <p></p>
      <img src={props.application.imgUrl} alt="picture of employee"/>
      <i></i> {/* TODO: Add Button to accept*/}
    </div>
  )
}

export default EmployeeApplication;
