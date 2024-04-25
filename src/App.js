import React, { useState, useEffect } from 'react';
import BingoRound from './BingoRound';
import './App.css';

function App() {
  const [rounds, setRounds] = useState(() => JSON.parse(sessionStorage.getItem('bingoRounds')) || []);
  const [color, setColor] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);

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
      setRounds([...rounds, { color, numbers: [] }]);
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
    <div className="game-container">
      <input 
        type="text"
        value={color}
        onChange={e => setColor(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter' && !isGameActive) startRound();
        }}
        placeholder="Enter color for the round"
        disabled={isGameActive}
      />
      <button onClick={startRound} disabled={isGameActive}>Start Round</button>
      <button onClick={stopGame} disabled={!isGameActive}>Stop Game</button>
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
