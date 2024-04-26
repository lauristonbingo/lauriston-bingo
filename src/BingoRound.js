import React, { useState } from 'react';

function BingoRound({ index, color, numbers, setRounds, rounds, removeRound }) {
  const [number, setNumber] = useState('');

  const addNumber = () => {
    if (number) {
      const newRounds = [...rounds];
      newRounds[index].numbers.push(number);
      setRounds(newRounds);
      setNumber('');
    }
  };

  const removeNumber = (numIndex) => {
    const newRounds = [...rounds];
    newRounds[index].numbers.splice(numIndex, 1);
    setRounds(newRounds);
  };

  return (
    <div className="round" style={{ backgroundColor: color }}>
      <button className="close-btn" onClick={removeRound}>×</button>
      <div className="numbers">
        {numbers.map((num, idx) => <div key={idx} onClick={() => removeNumber(idx)}>{num}</div>)}
      </div>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') addNumber();
        }}
      />
    </div>
  );
}

export default BingoRound;
