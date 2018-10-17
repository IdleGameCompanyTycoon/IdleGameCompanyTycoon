import React, { Component } from 'react';

class Online extends Component {
  render() {
    return (
      <div className="App-Online">
        <p>Online Mode not available Yet</p>
        <button className="App-Online-Home-Button"
                onClick={this.props.goToHome}>Home</button>

      </div>
    )
  }
}

export default Online;
