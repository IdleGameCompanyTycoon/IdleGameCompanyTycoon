import React, { Component } from 'react';
import '../../assets/css/App-main-view.css';
import { initApplicationGen, initContractsGen } from './middleware/engineAPIs/dataFetchApi.js';
import Main from '../view/Main.js';
import Noti from '../view/MainViews/Notification.js'; // FIXME: USE FULL FUNCTION NAMES GOD DAMN IT! ^^
import InfoPanel from '../view/MainViews/InfoPanel.js';
import AnimationFrame from '../view/MainViews/AnimationFrame.js';
import Navigation from '../view/MainViews/Navigation.js';
import { Switch, Redirect, Route} from 'react-router-dom';
import ContractsPage from '../view/Pages/ContractsPage.js';
import EmployeesPage from '../view/Pages/EmployeesPage.js';
import AvailableContractsPage from '../view/Pages/AvailableContractsPage.js';
import EmployeeApplicationsPage from '../view/Pages/EmployeeApplicationsPage.js';
import environment from '../../environment.json';
import { ActionProvider, ActionWrapper } from './middleware/engineAPIs/ActionContext';
import { applyMiddleware } from './middleware/middleware';
import { UPDATE_DATE } from './middleware/actions/mainActions'; 

class GameEngine extends Component {
  state = {
      selectedTeam: 0
  }

  componentDidMount() {
    this.dispatcher = applyMiddleware(this.props.getParentState, this.props.setParentState);
    
    initApplicationGen(this.props.getParentState, this.dispatcher);
    initContractsGen(this.props.getParentState, this.dispatcher);
    this.gameInterval();
  }

  gameInterval(){
    const timeForDay =  environment.settings.general.timeForDay * 1000;

    setInterval(() => {
        this.dispatcher({ name: UPDATE_DATE });
        this.props.saveLocal();
    }, timeForDay);
  }
  
  setNotification = (args) => {
    // Broken, handle via middleware
    // if(this.props.getParentState('notif')){
    //   this.props.setParentState('notif'); 
    // }else{
    //   this.props.setParentState('notif', args);
    // }
    
  }
  render() {
    return (
      <ActionProvider dispatcher={this.dispatcher} selectedTeam={this.state.selectedTeam}>
        <Main>
        <Noti notif={this.props.save.notif}
              action={this.triggerAction}
              setParentState={this.props.setParentState}/>
          <InfoPanel money={this.props.save.money}
                    date={this.props.save.date}
                    goToHome={this.props.goToHome}
                    locPerDay={this.props.save.locPerDay}
                    expenses={this.props.save.expensesPerMonth}
                    leavingTrainees={this.props.save.traineesLeaving}
                    />
          <AnimationFrame/>
          <Switch>
            <Route exact path="/contracts"
                  render={routeProps => <ActionWrapper><ContractsPage {...routeProps}
                                              contracts={this.props.save.activeContracts}
                                              volumeContracts={this.props.save.volumeContracts}/></ActionWrapper>}/>}/>
            <Route exact path="/availableContracts"
                  render={routeProps => <ActionWrapper><AvailableContractsPage {...routeProps}
                                              availableContracts={this.props.save.availableContracts}/></ActionWrapper>}/>
            <Route exact path="/employees"
                  render={routeProps => <ActionWrapper><EmployeesPage {...routeProps}
                                              employees={this.props.save.employees}/></ActionWrapper>}/>
            <Route exact path="/employeeApplications"
                  render={routeProps => <ActionWrapper><EmployeeApplicationsPage {...routeProps}
                                              availableApplications={this.props.save.availableApplications}/></ActionWrapper>}/>
            <Redirect from="*" to="/contracts"/>
          </Switch>
          <Navigation/>
        </Main>
      </ActionProvider>
    )
  }
}

export default GameEngine;
