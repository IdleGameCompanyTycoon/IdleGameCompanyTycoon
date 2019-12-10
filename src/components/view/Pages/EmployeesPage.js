import React from 'react';
import Employee from '../SubViews/Employee.js';
import '../../../assets/css/App-Pages.css';

const EmployeesPage = (props) => {
  return (
    <div className='App-page'>
      <div className="App-page-list">
      {
        props.employees.map((employee, i) =>
        <Employee key={i}
                  employee={employee}
                  action={props.action}/>
            )
      }
      </div>
    </div>
  )
}

export default EmployeesPage;
