import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/contracts">Contracts</Link>
      </nav>
    )
  }
}

export default Navigation;
