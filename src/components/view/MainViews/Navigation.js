import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/contracts">Contracts</Link>
        <Link to="/availableContracts">Available Contracts</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/employeeApplications">Employee Applications</Link>
      </nav>
    )
  }
}

export default Navigation;
