import React from 'react';
import '../../../assets/css/App-main-view-infopanel.css';

const InfoPanel = (props) => {
  return (
    <div className='App-info-panel'>
<<<<<<< HEAD
        <div className="App-info-panel-data">
          <p>Money: {props.money}</p>
          <p>Day {props.date.day}, Month {props.date.month}, Year {props.date.year}</p>
        </div>

        <button className="App-info-panel-home-button"
                onClick={() => {props.goToHome()}}>Home</button>
=======
          <p className="App-info-panel-money">Money: {props.money}</p>
          <p className="App-info-panel-locgen">LoC per Month: XXXXX{/*TODO: TO BE ADDED*/}</p>
          <p className="App-info-panel-expenses">Expenses: XXXXX{/*TODO: TO BE ADDED*/}</p>
          <p className="App-info-panel-date">Date: {props.date.month}.{props.date.day}.{props.date.year}</p>
        <button className="App-info-panel-homebutton"
                onClick={props.goToHome}>Home</button>
>>>>>>> b5d6064b5c234f2a968d2d859ed676baa4d2a805
    </div>
  )
}

export default InfoPanel;
