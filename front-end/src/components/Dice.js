import React from 'react';

function Dice({ onRoll }) {
  const handleRollDice = () => {
    // Logic to roll the dice
    const result = Math.floor(Math.random() * 6) + 1; // Replace with your dice logic
    if (onRoll) {
      onRoll(result); // Pass the dice result to the parent component
    }
  };

  return (
    <div>
      <h3>Dice</h3>
      <button onClick={handleRollDice}>Roll Dice</button>
    </div>
  );
}

export default Dice;
