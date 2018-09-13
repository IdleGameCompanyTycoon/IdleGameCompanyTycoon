import React, { Component } from 'react';
import Offline from './components/containers/Offline';
import Online from './components/containers/Online';

class App extends Component {
  state =  {
    selected: false,
    online: false,
    offline: false
  }

  // TODO: Save the current selection to the local storage
  setToOnline = () => {
    this.setState({
      selected: true,
      online: true,
      offline: false
    })
  }

  setToOffline = () => {
    this.setState({
      selected: true,
      online: false,
      offline: true
    })
  }

  render() {
    return (
      <div>
        {!this.state.selected &&
          <div className="App-mode-selection">
            <button className="App-mode-selection-button"
                    onClick={this.setToOffline}>Offline</button>
            <button className="App-mode-selection-button"
                    onClick={this.setToOnline}>Online</button>
          </div>
        }
        {this.state.offline &&
          <Offline/>
        }
        {this.state.online &&
          <Online/>
        }
      </div>
    );
  }
}

export default App;
