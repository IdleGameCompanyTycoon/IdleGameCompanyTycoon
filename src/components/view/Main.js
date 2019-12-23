import React from 'react';
import { ActionContext } from '../containers/middleware/engineAPIs/ActionContext';

const Main = (props) => {
  return (
    <ActionContext.Consumer>
      { actionContext => (
        <div className="App">
          {props.children.map((child, i) => React.cloneElement(child, {action: actionContext.triggerAction, key: i}))}
        </div>
        )
      }
    </ActionContext.Consumer>
  )
}

export default Main;
