import React, { Component } from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

export const ActionContext = React.createContext();

export class ActionProvider extends Component {

    triggerAction = (action) => {
        action = Object.assign({ selectedTeam: this.props.selectedTeam }, action);
        this.props.dispatcher(action);
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
        <ActionContext.Consumer>
          { actionContext => (
              <React.Fragment>

                {Array.isArray(props.children) ? props.children.map((child, i) => React.cloneElement(child, {action: actionContext.triggerAction, key: i})) : React.cloneElement(props.children, {action: actionContext.triggerAction})}
              </React.Fragment>
            )
          }
        </ActionContext.Consumer>
      )
}