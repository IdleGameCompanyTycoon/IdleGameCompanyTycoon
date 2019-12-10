import React, { Component } from 'react';
import * as mainAPI from './mainAPI.js';
import * as dataFetchApi from './dataFetchApi.js';
import * as contractAPI from './contractAPI.js';
import * as employeeAPI from './employeeAPI.js';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

export const ActionContext = React.createContext();

export class ActionProvider extends Component {
    state = {
        actions: {
            "setContractActive": contractAPI.setContractManualActive,
            "userClick": mainAPI.updateLoc,
            "acceptContract": contractAPI.acceptContract,
            "declineContract": contractAPI.declineContract,
            "cancelContract": contractAPI.cancelContract,
            "acceptApplication": employeeAPI.acceptApplications,
            "declineApplication": employeeAPI.declineApplication,
            "fireEmployee": employeeAPI.fireEmployee,
            "keepTrainee": employeeAPI.keepTrainee
          }
    };

    triggerAction = (action, args) => {
        this.state.actions[action](this.props.setParentState, args, this.props.selectedTeam, this.props.getParentState);
    };

    render() {
        return (
            <ActionContext.Provider
                value={{
                    triggerAction: this.triggerAction
                }}
            >
                {this.props.children}
            </ActionContext.Provider>
        );
    }
}

export const ActionWrapper = (props) => {
    return (
        <ActionContext>
          { actionContext => (
              <React.Fragment>
                {Array.isArray(props.children) ? props.children.map((child, i) => React.cloneElement(child, {action: actionContext.triggerAction, key: i})) : React.cloneElement(props.children, {action: actionContext.triggerAction})}
              </React.Fragment>
            )
          }
        </ActionContext>
      )
}