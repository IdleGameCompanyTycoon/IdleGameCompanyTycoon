import React, { Component } from 'react';
import Main from '../view/Main.js'
import InfoPanel from '../view/MainViews/InfoPanel.js';
import AnimationFrame from '../view/MainViews/AnimationFrame.js';
import Navigation from '../view/MainViews/Navigation.js';
import { Router, Route} from 'react-router-dom';
import ContractsPage from '../view/Pages/ContractsPage.js';
import EmployeesPage from '../view/Pages/EmployeesPage.js';

class GameEngine extends Component {
  render() {
    console.log(this.props)
    // TODO: Add correct page component instead
    return (
      <Main>
        <InfoPanel money={this.props.save.money}
                   date={this.props.save.date}/>
        <AnimationFrame/>
        <Navigation/>

          <Route exact path="/contracts" component={ContractsPage}/>
          <Route exact path="/employees" component={EmployeesPage}/>

      </Main>
    )
  }
}

export default GameEngine;
