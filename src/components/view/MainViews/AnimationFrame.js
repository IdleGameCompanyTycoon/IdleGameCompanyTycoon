import React, { Component } from 'react';

class AnimationFrame extends Component  {
  render() {
    return (
      <div className='App-animation-frame'
           onClick={() => this.props.action("userClick", 10)}>
      </div>
    )
  }
}

export default AnimationFrame;
