import React from 'react';
import '../../../assets/css/App-main-view-infopanel.css';

const InfoPanel = (props) => {
  return (
    <div className='App-info-panel'>
          <p className="App-info-panel-money">Money: {Number(props.money).toLocaleString("es-ES", {minimumFractionDigits: 2})}€</p>
          <p className="App-info-panel-locgen">LoC per Day/Month: {props.locPerDay} / {props.locPerDay*30}</p>
          <p className="App-info-panel-expenses">Expenses: {Number(props.expenses).toLocaleString("es-ES", {minimumFractionDigits: 2})}€</p>
          {props.leavingTrainees !== 0 && props.leavingTrainees && <p className="App-info-panel-message">{props.leavingTrainees} Trainees are done and are about to leave!</p>}
          <p className="App-info-panel-date">Date: {props.date.month}.{props.date.day}.{props.date.year}</p>
        <button className="App-info-panel-homebutton"
                onClick={props.goToHome}>Home</button>
    </div>
  )
}

export default InfoPanel;