import React from 'react';
import Employee from '../SubViews/Employee.js';

const EmployeesPage = (props) => {
  return (
    <div className='App-page'>
      {
        props.employees.map((employee, i) =>
        <Employee key={i}
                  employee={employee}
                  action={props.action}/>
        )

      }

    </div>
  )
}

export default EmployeesPage;
