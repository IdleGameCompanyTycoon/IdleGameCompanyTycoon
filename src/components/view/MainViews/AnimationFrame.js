import React, { Component } from 'react';
import environment from '../../../environment.json';

class AnimationFrame extends Component  {
  render() {
    return (
      <div className='App-animation-frame'
           onClick={() => this.props.action("userClick", environment.settings.general.locGenerationPerClick)}>
      </div>
    )
  }
}

export default AnimationFrame;
