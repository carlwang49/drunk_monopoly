import React from 'react';
import RedWheelchair from '../imgs/wheelchair-red.svg';
import GreenWheelchair from '../imgs/wheelchair-green.svg';
import BlueWheelchair from '../imgs/wheelchair-blue.svg';
import YellowWheelchair from '../imgs/wheelchair-yellow.svg';
import PurpleWheelchair from '../imgs/wheelchair-purple.svg';
import OrangeWheelchair from '../imgs/wheelchair-orange.svg';

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

  // Determine the SVG file based on the player's index
  const svgFiles = [
    RedWheelchair,
    GreenWheelchair,
    BlueWheelchair,
    YellowWheelchair,
    PurpleWheelchair,
    OrangeWheelchair,
  ];
  const svgFile = svgFiles[index % svgFiles.length]; // Cycle through the SVG files based on index

  return (
    <image
      x={adjustedX - hexSize / 1.5} // Adjust positioning based on the size of your SVG
      y={adjustedY - hexSize / 1.5}
      width={hexSize / 0.75} // Adjust the size based on your preference
      height={hexSize / 0.75}
      xlinkHref={svgFile}
    />
  );
}

export default PlayerToken;
