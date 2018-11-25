import React from 'react';
import Employee from '../SubViews/Employee.js';

const EmployeesPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.parent.state.employees.map((application, i) =>
        <Employee key={i}
                  application={application}/>
        )

      }

    </div>
  )
}

export default EmployeesPage;
