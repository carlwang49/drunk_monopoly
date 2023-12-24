import React from 'react';

function PlayerToken({ player, hexSize, index }) {
  // Convert axial to pixel coordinates
  const x = hexSize * Math.sqrt(3) * (player.position.q + player.position.r / 2);
  const y = hexSize * (3 / 2) * player.position.r;

  // Add some offset based on the player's index
  const offset = index * 5; // Adjust the value as needed
  const adjustedX = x + offset;
  const adjustedY = y + offset;

  return (
    <circle cx={adjustedX} cy={adjustedY} r={hexSize / 8} fill="red" />
  );
}

export default PlayerToken;
