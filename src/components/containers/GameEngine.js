import React, { Component } from 'react';
import '../../assets/css/App-main-view.css';
import { updateDate, onMonthChange } from './engineAPIs/mainAPI.js';
import { initApplicationGen, initContractsGen } from './engineAPIs/dataFetchApi.js';
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
import { ActionProvider, ActionWrapper } from './engineAPIs/ActionContext';

class GameEngine extends Component {
  state = {
      selectedTeam: 0
  }

  componentDidMount() {
    initApplicationGen(this.props.setParentState, this.props.getParentState);
    initContractsGen(this.props.setParentState, this.props.getParentState);
    this.gameInterval();
  }

  gameInterval(){
    const timeForDay =  environment.settings.general.timeForDay * 1000;

    setInterval(() => {
        const monthChange = updateDate(this.props.setParentState, undefined, this.props.getParentState);
        if (monthChange) {
          onMonthChange(this.props.getParentState, this.props.setParentState);
        }
        this.props.saveLocal();
    }, timeForDay);
  }

  render() {
    return (
      <ActionProvider setParentState={this.props.setParentState} getParentState={this.props.getParentState} selectedTeam={this.state.selectedTeam}>
        <Main>
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
