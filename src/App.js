import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state =  {
    selected: false,
    online: false,
    offline: false
  }

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
          <div className="offline"></div>
        }
        {this.state.online &&
          <div className="online"></div>
        }
      </div>
    );
  }
}

export default App;
