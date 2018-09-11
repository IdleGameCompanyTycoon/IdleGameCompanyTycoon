import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/contracts">Contracts</Link>
        <Link to="/employees">Employees</Link>
      </nav>
    )
  }
}

export default Navigation;
