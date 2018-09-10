import React from 'react';

const InfoPanel = (props) => {
  console.log(props)
  return (
    <div className='App-info-panel'>
      <p>Money: {props.money}</p>
      <p>Day {props.date.day}, Month {props.date.month}, Year {props.date.year}</p>
    </div>
  )
}

export default InfoPanel;
