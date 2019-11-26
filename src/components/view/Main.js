import React from 'react';
import { ActionContext } from '../containers/engineAPIs/ActionContext';

const Main = (props) => {
  return (
    <ActionContext>
      { actionContext => (
        <div className="App">
          {props.children.map((child, i) => React.cloneElement(child, {action: actionContext.triggerAction, key: i}))}
        </div>
        )
      }
    </ActionContext>
  )
}

export default Main;
