import React, { useState, useEffect } from 'react';
import BingoRound from './BingoRound';
import './App.css';

function App() {
  const [rounds, setRounds] = useState(() => JSON.parse(sessionStorage.getItem('bingoRounds')) || []);
  const [isGameActive, setIsGameActive] = useState(false);
  const [color, setColor] = useState('#ff0000');

  useEffect(() => {
    // Load rounds from session storage on initial load
    const savedRounds = JSON.parse(sessionStorage.getItem('bingoRounds')) || [];
    setRounds(savedRounds);
  }, []);

  useEffect(() => {
    // Save rounds to session storage when they change
    sessionStorage.setItem('bingoRounds', JSON.stringify(rounds));
  }, [rounds]);

  
  const startRound = () => {
    if (color) {
      setRounds([{ color, numbers: [] }, ...rounds]);
      setColor('');
      setIsGameActive(true);
    } else {
      alert("Please enter a color to start the round.");
    }
  };

  const stopGame = () => {
    setIsGameActive(false);
  };

  const removeRound = (index) => {
    const updatedRounds = [...rounds];
    updatedRounds.splice(index, 1);
    setRounds(updatedRounds);
  };

  return (
    <div className="app-container">
      <div className="controls-container">
        <label htmlFor="colorPicker" className="color-label">Select Color:</label>
        <input 
          id="colorPicker"
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          disabled={isGameActive}
        />
        <button onClick={startRound} disabled={isGameActive}>Start Round</button>
        <button onClick={stopGame} disabled={!isGameActive}>Stop Game</button>
      </div>
      {rounds.map((round, index) => (
        <BingoRound
          key={index}
          index={index}
          color={round.color}
          numbers={round.numbers}
          setRounds={setRounds}
          rounds={rounds}
          removeRound={() => removeRound(index)}
        />
      ))}
    </div>
  );
}

export default App;
