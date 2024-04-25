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

  return (
    <div className="round" style={{ backgroundColor: color }}>
      <button className="close-btn" onClick={removeRound}>×</button>
      <strong>Round: {color}</strong>
      <div className="numbers">
        {numbers.map((num, idx) => <div key={idx}>{num}</div>)}
      </div>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') addNumber();
        }}
      />
      <button onClick={addNumber}>Add Number</button>
    </div>
  );
}

export default BingoRound;
