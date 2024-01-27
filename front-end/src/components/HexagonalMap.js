import React from 'react';
import PlayerToken from "./PlayerToken";
import "./components_css/HexagonalMap.css";
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import SpecialHexContent from '../land/SpecialHexContent';
import { getTooltipContent } from './util/tooltipFunctions.js';

function HexagonalMap({ players, landStatus }) {
  const hexagons = generateHexagonalGrid(6); // Radius of the large hexagon is 6
  // Calculate the total width and height based on the hexagon size
  const hexSize = Math.min(
    (window.innerWidth * 0.9) / 11 / Math.sqrt(3),
    (window.innerHeight * 0.9) / 9 / 2
  );
  const totalWidth = Math.sqrt(3) * hexSize * 11 * 1.2; // Approximate width for 5 hexes + gaps
  const totalHeight = 2 * hexSize * 9 * 1.2; // Approximate height for 5 hexes + gaps
  const colors = [
    'rgba(255, 0, 0, 0.5)',    // 半透明的红色
    'rgba(0, 255, 0, 0.5)',    // 半透明的绿色
    'rgba(0, 0, 255, 0.5)',    // 半透明的蓝色
    'rgba(255, 255, 0, 0.5)',  // 半透明的黄色
    'rgba(128, 0, 128, 0.5)',  // 半透明的紫色
    'rgba(255, 165, 0, 0.5)'   // 半透明的橙色
  ];

  return (
    <div className="hexagonal-map">
      <svg
        viewBox={`-${totalWidth / 2} -${totalHeight / 2} ${totalWidth} ${totalHeight}`}
      >
        {hexagons.map((hex, i) => {
          const x = hexSize * Math.sqrt(3) * (hex.q + hex.r / 2);
          const y = ((hexSize * 3) / 2) * hex.r;
          const landKey = `${hex.q},${hex.r}`;
          const land = landStatus[landKey];
          const fillColor = land?.owner 
            ? colors[(players.find(p => p.id === land.owner)?.id - 1) % colors.length]
            : "rgba(142, 145, 143, 0.8)";
          const wineCount = land?.wine || 0;
  
          return (
            <Tooltip key={i} title={getTooltipContent(landKey, landStatus)} arrow>
              <g>
                <Hexagon
                  q={hex.q}
                  r={hex.r}
                  size={hexSize}
                  fillColor={fillColor}
                />
                {/* 显示进度百分比和进度条 */}
                {!land?.hideWine && wineCount > 0 && (
                  <text x={x} y={y} textAnchor="middle" dy=".3em" style={{ fill: 'black', fontSize: '40px', fontWeight: 'bold' }}>
                    {wineCount}
                  </text>
                )}
                {land?.showProgress && (
                  <g transform={`translate(${x - 20}, ${y - 20})`}>
                    <CircularProgress size={30} />
                    <text x={20} y={25} textAnchor="middle" style={{ fill: 'black', fontSize: '50px', fontWeight: 'bold' }}>
                      {land.progress}%
                    </text>
                  </g>
                )}
                {hex.q === 0 && hex.r === 6 && (
                  <g transform={`translate(${x}, ${y})`}>
                    <text textAnchor="middle" dy=".4em" className="go-text">
                      GO
                    </text>
                    <LongArrow />
                  </g>
                )}
                <SpecialHexContent q={hex.q} r={hex.r} x={x} y={y} />
              </g>
            </Tooltip>
          );
        })}

        {players.map((player, index) => (
          <PlayerToken
            key={player.id}
            player={player}
            hexSize={hexSize}
            index={index}
            totalPlayers={players.length}
          />
        ))}
      </svg>
    </div>
  );
}

function LongArrow() {
  // 调整箭头大小和方向
  const points = "0,-20 10,0 0,20"; // 这将创建一个更长的箭头
  const transform = "rotate(-60) translate(23, 0)"; // 调整箭头的平移，使其不与"GO"重叠

  return (
    <polygon points={points} transform={transform} className="arrow" />
  );
}

export default HexagonalMap;

function Hexagon({ q, r, size, fillColor}) {
  // Convert axial to pixel coordinates
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = ((size * 3) / 2) * r;

  // Points for a flat-topped hexagon
  const hexPoints = [
    { x: x + (size * Math.sqrt(3)) / 2, y: y - size / 2 },
    { x: x + (size * Math.sqrt(3)) / 2, y: y + size / 2 },
    { x: x, y: y + size },
    { x: x - (size * Math.sqrt(3)) / 2, y: y + size / 2 },
    { x: x - (size * Math.sqrt(3)) / 2, y: y - size / 2 },
    { x: x, y: y - size },
  ];

  return (
    <polygon
      points={hexPoints.map((p) => `${p.x},${p.y}`).join(" ")}
      style={{ fill: fillColor }}
      className="hexagon"
    />
  );
}


/**
 * Function to generate a hexagonal grid
 * @param {number} radius - The maximum distance from the center to the edge hexagon
 * @returns {Array} An array containing coordinates of edge hexagons
 */
function generateHexagonalGrid(radius) {
  // Array to store the generated hexagon coordinates
  let hexagons = [];

  // Iterate over the q-axis of the hexagon coordinate system
  for (let q = -radius; q <= radius; q++) {
    // Calculate the range of the-axis in the hexagon coordinate system
    let r1 = Math.max(-radius, -q - radius);
    let r2 = Math.min(radius, -q + radius);

    // Iterate over the r-axis of the hexagon coordinate system
    for (let r = r1; r <= r2; r++) {
      // Add only the coordinates of hexagons that are on the edge
      if (
        Math.abs(q) === radius ||
        Math.abs(r) === radius ||
        Math.abs(-q - r) === radius
      ) {
        hexagons.push({ q, r });
      }
    }
  }

  // Return an array containing coordinates of all edge hexagons
  return hexagons;
}


