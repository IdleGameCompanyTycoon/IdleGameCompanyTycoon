import React, { Component } from 'react';
import Main from '../view/Main.js'
import InfoPanel from '../view/MainViews/InfoPanel.js';
import AnimationFrame from '../view/MainViews/AnimationFrame.js';
import Navigation from '../view/MainViews/Navigation.js';

class GameEngine extends Component {
  render() {
    console.log(this.props)
    // TODO: Add correct page component instead
    return (
      <Main>
        <InfoPanel money={this.props.save.money}
                   date={this.props.save.date}/>
        <AnimationFrame/>
        <Navigation/>
      </Main>
    )
  }
}

export default GameEngine;
