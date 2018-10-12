import React, { Component } from 'react';
import '../../../assets/css/App-nav.css';
import { Link } from 'react-router-dom';


class Navigation extends Component {
  state = {
    windowWidth: window.innerWidth
  }


  render() {
    return (
      <nav>

        <Link className="Button-style" to="/contracts">
          <img className="Button-style-icon"
               src={require('../../../icons/contracts.png')}>
          </img>{window.innerWidth >= 1000 && <span> Contracts</span>}
        </Link>

        <Link className="Button-style" to="/availableContracts">
          <img className="Button-style-icon"
               src={require('../../../icons/avcontracts.png')}>
          </img>{window.innerWidth >= 1000 && <span> Available Contracts</span>}
        </Link>

        <Link className="Button-style" to="/employees">
          <img className="Button-style-icon"
               src={require('../../../icons/employee.png')}>
          </img>{window.innerWidth >= 1000 && <span> Employees</span>}
        </Link>
        <Link className="Button-style" to="/employeeApplications">
          <img className="Button-style-icon"
               src={require('../../../icons/application.png')}>
          </img>{window.innerWidth >= 1000 && <span> Employee Applications</span>}
        </Link>
      </nav>
    )
  }
}

export default Navigation;
