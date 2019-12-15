import React, { Component } from 'react';
import environment from '../../../environment.json';
import '../../../assets/css/App-main-view-animationframe.css';
import { ON_USER_CLICK } from '../../containers/middleware/actions/mainActions.js';

class AnimationFrame extends Component  {
  render() {
    return (
      <div className='App-animation-frame'
           onClick={() => this.props.action({ name: ON_USER_CLICK, value: environment.settings.general.locGenerationPerClick})}>
           <div className='box'>
              <p>{"import * as contractAPI from './contractAPI.js';"}</p>
              <p>{"import * as employeeAPI from './employeeAPI';"}</p>
              <p>{"// Update the money, accepts an integer as dataObj"}</p>
              <p>{"export const updateMoney = (parent, money) => {"}</p>
              <p>{"  let newMoney = parent.state.money + money;"}</p>
              <p>{"  parent.setState({"}</p>
              <p>{"    money: newMoney"}</p>
              <p>{"  })"}</p>
              <p>{"}"}</p>
              <p>{"// Update the date obj, accepts an dateObj as dataObj"}</p>
              <p>{"export const updateDate = (parent, days = 1) => {"}</p>
              <p>{"  let tmpDate = Object.assign({}, parent.state.date);"}</p>
              <p>{"  tmpDate.day += days;"}</p>
              <p>{"  employeeAPI.letEmploeeysWork(parent);"}</p>
              <p>{"  if(tmpDate.day >= 31){"}</p>
              <p>{"    tmpDate.day -= 30;"}</p>
              <p>{"    tmpDate.month += 1;"}</p>
              <p>{"    employeeAPI.employeePayment(parent);"}</p>
              <p>{"  } else if( tmpDate.month >= 12) {"}</p>
              <p>{"    tmpDate.month -= 11 ;"}</p>
              <p>{"    tmpDate.year += 1;"}</p>
              <p>{"  }"}</p>
              <p>{"  parent.setState({"}</p>
              <p>{"    date: tmpDate"}</p>
              <p>{"  })"}</p>
              <p>{"}"}</p>
              <p>{"// On an animation frame click this function updates the LoC of the currently selected Contract"}</p>
              <p>{"export const locClick = (obj, dataObj) => {"}</p>
              <p>{"  let taskId = obj.state.teams[dataObj.selectedTeam].selectedTaskId;"}</p>
              <p>{"  if(taskId) {"}</p>
              <p>{"  }"}</p>
              <p>{"}"}</p>
              <p>{"//statt engine team"}</p>
              <p>{"export const updateLoc =  (parent, loc, team) => {"}</p>
              <p>{"  if(!parent.state.teams[team].activeContract) return;"}</p>
              <p>{"  let activeContractsArr = parent.state.activeContracts;"}</p>
              <p>{"  let contract = contractAPI.getActiveContractForTeam(activeContractsArr, team);"}</p>
              <p>{"  contractAPI.updateProgress(parent, contract, loc);"}</p>
              <p>{"  parent.setState({"}</p>
              <p>{"    activeContracts: activeContractsArr"}</p>
              <p>{"  });"}</p>
              <p>{"}"}</p>
              <p>{"export const notAvailable = () => {"}</p>
              <p>{"  console.log('You cant accept an other Contract!');"}</p>
              <p>{"}"}</p>
           </div>
      </div>
    )
  }
}

export default AnimationFrame;
