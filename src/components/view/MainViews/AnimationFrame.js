import React, { Component } from 'react';

class AnimationFrame extends Component  {
  render() {
    return (
      <div className='App-animation-frame'
           onClick={() => this.props.increaseFunc("userClick", 100)}>
      </div>
    )
  }
}

export default AnimationFrame;
