import React, { Component } from 'react';
import GameEngine from './GameEngine.js';

class Offline extends Component {

  //  TODO: These are just example save data, implement backend and local saves
  state = {
    money: 100,
    availableContracts: [],
    activeContracts: [],
    availableApplications: [],
    employees: [],
    date: {
      year: 1970,
      month: 1,
      day: 1
    },
    teams: {
      0: {
        taskType: "",
        selectedTaskId:
      }
    }
  }

  // TODO: Check if Local saves exist, if not initalize default data from the server
  componentDidMount() {

  }

  render() {
    return(
      <React.Fragment>
        {this.state.money && <GameEngine save={this.state} parent={this}/>}
      </React.Fragment>
    )
  }
}

export default Offline;
