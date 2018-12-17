import React, { Component } from 'react';
import '../../assets/css/App-main-view.css';
import * as mainAPI from './engineAPIs/mainAPI.js';
import * as dataFetchApi from './engineAPIs/dataFetchApi.js';
import Main from '../view/Main.js';
import InfoPanel from '../view/MainViews/InfoPanel.js';
import AnimationFrame from '../view/MainViews/AnimationFrame.js';
import Navigation from '../view/MainViews/Navigation.js';
import { Switch, Redirect, Route} from 'react-router-dom';
import ContractsPage from '../view/Pages/ContractsPage.js';
import EmployeesPage from '../view/Pages/EmployeesPage.js';
import AvailableContractsPage from '../view/Pages/AvailableContractsPage.js';
import EmployeeApplicationsPage from '../view/Pages/EmployeeApplicationsPage.js';
import environment from '../../environment.json';

class GameEngine extends Component {
  state = {
      selectedTeam: 0
  }

  constructor() {
    super();
    this.actions = {
      "userClick": mainAPI.updateLoc,
      "acceptContract": mainAPI.acceptContract,
      "declineContract": mainAPI.declineContract,
      "acceptApplication": mainAPI.acceptApplications,
      "declineApplication": mainAPI.declineApplication
    }
  }

  triggerAction = (action, args) => {
    this.actions[action](this.props.parent, args, this.state.selectedTeam);
  }

  componentDidMount() {
    dataFetchApi.initApplicationGen(this.props.parent);
    dataFetchApi.initContractsGen(this.props.parent);
    this.gameInterval();
  }

  gameInterval(){
    const timeForDay =  environment.settings.general.timeForDay * 1000;

    setInterval(() => {
      //alles in updateDate funktion tuen
      mainAPI.updateEmploeeys(this.props.parent, 1, this.state.selectedTeam);
      mainAPI.updateDate(this.props.parent, 1);
    }, timeForDay);
  }

  render() {
    return (
      <Main>
        <InfoPanel money={this.props.save.money}
                   date={this.props.save.date}
                   goToHome={this.props.goToHome}/>
        <AnimationFrame action={this.triggerAction}/>
        <Switch>
          <Route exact path="/contracts"
                 render={routeProps => <ContractsPage {...routeProps}
                                            contracts={this.props.save.activeContracts}
                                            action={this.triggerAction}/>}/>/>}/>
          <Route exact path="/availableContracts"
                 render={routeProps => <AvailableContractsPage {...routeProps}
                                            availableContracts={this.props.save.availableContracts}
                                            action={this.triggerAction}/>}/>
          <Route exact path="/employees"
                 render={routeProps => <EmployeesPage {...routeProps}
                                            parent={this.props.parent}
                                            employees={this.props.save.employees} />}/>
          <Route exact path="/employeeApplications"
                 render={routeProps => <EmployeeApplicationsPage {...routeProps}
                                            availableApplications={this.props.save.availableApplications}
                                            action={this.triggerAction}/>}/>
          <Redirect from="*" to="/contracts"/>
        </Switch>
        <Navigation/>
      </Main>
    )
  }
}

export default GameEngine;
