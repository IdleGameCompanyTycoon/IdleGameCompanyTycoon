import React, { Component } from 'react';
import Offline from './components/containers/Offline';
import Online from './components/containers/Online';

class App extends Component {
  state =  {
    selected: false,
    online: false,
    offline: false
  }

  componentDidMount() {
    let savedSelection = localStorage.getItem('selection');
    console.log(savedSelection);
    if(savedSelection) {
      savedSelection = JSON.parse(savedSelection);
      this.setState({
        ...savedSelection
      })
    }
  }

  // TODO: Save the current selection to the local storage
  setToOnline = () => {
    this.setState({
      selected: true,
      online: true,
      offline: false
    }, this.saveToLocalStorage)
  }

  setToOffline = () => {
    this.setState({
      selected: true,
      online: false,
      offline: true
    }, this.saveToLocalStorage)
  }

  saveToLocalStorage = () => {
    console.log('test')
    let selection = JSON.stringify(this.state);
    localStorage.setItem('selection', selection);
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
