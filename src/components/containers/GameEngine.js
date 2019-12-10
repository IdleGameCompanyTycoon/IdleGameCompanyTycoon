import React, { Component } from 'react';
import '../../assets/css/App-main-view.css';
import * as mainAPI from './engineAPIs/mainAPI.js';
import * as dataFetchApi from './engineAPIs/dataFetchApi.js';
import * as contractAPI from './engineAPIs/contractAPI.js';
import * as employeeAPI from './engineAPIs/employeeAPI.js';
import Main from '../view/Main.js';
import Noti from '../view/MainViews/Notification.js';
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
      "setContractActive": contractAPI.setContractManualActive,
      "userClick": mainAPI.updateLoc,
      "acceptContract": contractAPI.acceptContract,
      "declineContract": contractAPI.declineContract,
      "cancelContract": contractAPI.cancelContract,
      "acceptApplication": employeeAPI.acceptApplications,
      "declineApplication": employeeAPI.declineApplication,
      "fireEmployee": employeeAPI.fireEmployee,
    }
  }

  triggerAction = (action, args) => {
    this.actions[action](this.props.setParentState, args, this.state.selectedTeam, this.props.getParentState);
  }

  setNotification = (args) => {
    if(this.props.getParentState('notif')){
      this.props.setParentState('notif'); 
    }else{
      this.props.setParentState('notif', args);
    }
    
  }
  componentDidMount() {
    dataFetchApi.initApplicationGen(this.props.setParentState, this.props.getParentState);
    dataFetchApi.initContractsGen(this.props.setParentState, this.props.getParentState);
    this.gameInterval();
  }

  gameInterval(){
    const timeForDay =  environment.settings.general.timeForDay * 1000;

    setInterval(() => {
        mainAPI.updateDate(this.props.setParentState, undefined, this.props.getParentState);
        this.props.saveLocal();
    }, timeForDay);
  }

  render() {
    return (
      <Main>
        <Noti notif={this.props.save.notif}
              action={this.triggerAction}
              setParentState={this.props.setParentState}/>
        <InfoPanel money={this.props.save.money}
                   date={this.props.save.date}
                   goToHome={this.props.goToHome}
                   noti={this.setNotification}
                   locPerMonth={this.props.save.locPerMonth}
                   expenses={this.props.save.expensesPerMonth}
                   />
        <AnimationFrame action={this.triggerAction}/>
        <Switch>
          <Route exact path="/contracts"
                 render={routeProps => <ContractsPage {...routeProps}
                                            contracts={this.props.save.activeContracts}
                                            volumeContracts={this.props.save.volumeContracts}
                                            action={this.triggerAction}/>}/>/>}/>
          <Route exact path="/availableContracts"
                 render={routeProps => <AvailableContractsPage {...routeProps}
                                            availableContracts={this.props.save.availableContracts}
                                            action={this.triggerAction}/>}/>
          <Route exact path="/employees"
                 render={routeProps => <EmployeesPage {...routeProps}
                                            employees={this.props.save.employees}
                                            action={this.triggerAction}/>}/>
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
