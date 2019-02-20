import React, { Component } from 'react';
import GameEngine from './GameEngine.js';

class Offline extends Component {

  //  TODO: These are just example save data, implement backend and local saves
  state = {
    money: 100,
    reputation: 1, //Dummy value
    availableContracts: [],
    activeContracts: [],
    volumeContracts: [],
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
        selectedTaskId:"",
        activeContract: false,
        numberOfContracts: 0
      }
    }
  }

  // TODO: Check if Local saves exist, if not initalize default data from the server
  componentDidMount() {
    let savedSelection = localStorage.getItem('Saves');
    console.log(savedSelection + " GameEngine");
    if(savedSelection) {
      savedSelection = JSON.parse(savedSelection);
      this.setState({
        ...savedSelection
      })
    }
  }

  saveToLocalStorage = () => {
    let selection = JSON.stringify(this.state);
    localStorage.setItem('Saves', selection);
  }

  render() {
    return(
      <React.Fragment>
        {this.state.money && <GameEngine  save={this.state} parent={this} goToHome={this.props.goToHome}
                                          saveLocal={this.saveToLocalStorage}/>}
      </React.Fragment>
    )
  }
}

export default Offline;
