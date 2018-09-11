import React, { Component } from 'react';
import Main from '../view/Main.js'
import InfoPanel from '../view/MainViews/InfoPanel.js';
import AnimationFrame from '../view/MainViews/AnimationFrame.js';
import Navigation from '../view/MainViews/Navigation.js';
import { Router, Route} from 'react-router-dom';
import ContractsPage from '../view/Pages/ContractsPage.js';
import EmployeesPage from '../view/Pages/EmployeesPage.js';
import AvailableContractsPage from '../view/Pages/AvailableContractsPage.js';
import EmployeeApplicationsPage from '../view/Pages/EmployeeApplicationsPage.js';

class GameEngine extends Component {
  render() {
    // TODO: Add correct page component instead
    return (
      <Main>
        <InfoPanel money={this.props.save.money}
                   date={this.props.save.date}/>
        <AnimationFrame/>
        <Navigation/>
        <Route exact path="/contracts"
                render={routeProps => <ContractsPage {...routeProps}/>}/>
        <Route exact path="/availableContracts" component={AvailableContractsPage}/>
        <Route exact path="/employees" component={EmployeesPage}/>
        <Route exact path="/employeeApplications"
                render={routeProps => <EmployeeApplicationsPage {...routeProps}
                                          availableApplications={this.props.save.availableApplications} />}/>
      </Main>
    )
  }
}

export default GameEngine;
