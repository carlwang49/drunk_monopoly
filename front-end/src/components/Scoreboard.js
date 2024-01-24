import React from 'react';

function Scoreboard({ players }) {
  // Render the scoreboard showing each player's information

  return (
    <div>
      <h2>Scoreboard</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}: ${player.money}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
