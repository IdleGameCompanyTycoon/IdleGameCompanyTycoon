import React from 'react';
import EmployeeApplication from '../SubViews/EmployeeApplication.js';

const EmployeeApplicationsPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.availableApplications.map((application, i) =>
        <EmployeeApplication key={i}
                             application={application}/>
        )
      }
    </div>
  )
}

export default EmployeeApplicationsPage;
