import React from 'react';
import '../../../assets/css/App-main-view-infopanel.css';

const InfoPanel = (props) => {
  return (
    <div className='App-info-panel'>
          <p className="App-info-panel-money">Money: {props.money}</p>
          <p className="App-info-panel-locgen">LoC per Month: {props.locPerMonth}</p>
          <p className="App-info-panel-expenses">Expenses: {props.expenses}</p>
          <p className="App-info-panel-date">Date: {props.date.month}.{props.date.day}.{props.date.year}</p>
        <button className="App-info-panel-homebutton"
                onClick={props.goToHome}>Home</button>
    </div>
  )
}

export default InfoPanel;
