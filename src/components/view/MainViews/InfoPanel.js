import React from 'react';

const InfoPanel = (props) => {
  return (
    <div className='App-info-panel'>
        <div className="App-info-panel-data">
          <p>Money: {props.money}</p>
          <p>Day {props.date.day}, Month {props.date.month}, Year {props.date.year}</p>
        </div>

        <button className="App-info-panel-home-button"
                onClick={() => {props.goToHome()}}>Home</button>
    </div>
  )
}

export default InfoPanel;
