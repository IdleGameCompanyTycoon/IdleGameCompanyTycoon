import React from 'react';
import EmployeeApplication from '../SubViews/EmployeeApplication.js';
import '../../../assets/css/App-Page-ListBody.css';

const EmployeeApplicationsPage = (props) => {

  return (
    <div className='App-page'>
      <div className="App-page-list">

      {
        props.availableApplications.map((application, i) =>
        <EmployeeApplication key={i}
                             application={application}
                             action={props.action}/>
        )
      }
      </div>
      <div className="App-page-body">
        {/* TODO: Add Data*/}
      </div>
    </div>
  )

}

export default EmployeeApplicationsPage;
