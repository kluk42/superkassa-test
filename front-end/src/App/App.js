import React, { useState, useEffect } from 'react';
import Api from '../utils/Api';
import './App.css';

function App() {
  const [ btnState, setBtnState ] = useState('off');
  const [ api ] = useState(new Api());

  const loadBtnState = async () => {
      try {
        const { state } = await api.getBtnState();
        if (state !== btnState) setBtnState(state);
      } catch (err) {
        console.log(err);
      }
    }

  useEffect(() => {
      const timerID = setInterval(loadBtnState, 500);
      return function cleaner () {clearInterval(timerID)}
  })

  const onClick = async () => {
    try {
      const stateToSend = btnState === 'off' ? 'on' : 'off';
      const { state } = await api.setBtnState(stateToSend);
      setBtnState(state);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="app">
      <button onClick={onClick} className="button">{ btnState }</button>
    </section>
  );
}

export default App;
