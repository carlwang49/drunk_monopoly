import React from 'react';

function PlayerToken({ player, hexSize, index, totalPlayers }) {
  // Convert axial to pixel coordinates
  const x = hexSize * Math.sqrt(3) * (player.position.q + player.position.r / 2);
  const y = hexSize * (3 / 2) * player.position.r;

  // Divide the hexagon into equal segments based on the total number of players
  // Each player will be placed on the edge of an imaginary circle at the center of the hex
  const segmentAngle = (Math.PI * 2) / totalPlayers; // Angle in radians for each segment
  const angle = segmentAngle * index; // Angle for this player's segment

  // Set a fixed radius for player tokens inside the hexagon
  const radius = hexSize * 0.3; // 30% of the hex size

  // Calculate the offset based on the angle and radius
  const offsetX = Math.cos(angle) * radius;
  const offsetY = Math.sin(angle) * radius;

  // Adjust x and y with the offsets
  const adjustedX = x + offsetX;
  const adjustedY = y + offsetY;

  // Determine the fill color based on the player's index
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  const fill = colors[index % colors.length]; // Cycle through the colors array based on index

  return (
    <circle cx={adjustedX} cy={adjustedY} r={hexSize / 10} fill={fill} />
  );
}

export default PlayerToken;
