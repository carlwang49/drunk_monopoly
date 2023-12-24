import React from 'react';
import './components_css/HexagonalMap.css';

function HexagonalMap() {
  const hexagons = generateHexagonalGrid(6); // Radius of the large hexagon is 5
  

  // Calculate the total width and height based on the hexagon size
  const hexSize = Math.min((window.innerWidth * 0.9) / 11 / Math.sqrt(3), (window.innerHeight * 0.9) / 9 / 2);
  const totalWidth = Math.sqrt(3) * hexSize * 11 * 1.2; // Approximate width for 5 hexes + gaps
  const totalHeight = 2 * hexSize * 9 * 1.2; // Approximate height for 5 hexes + gaps

  return (
    <div className="hexagonal-map">
      <svg viewBox={`-${totalWidth / 2} -${totalHeight / 2} ${totalWidth} ${totalHeight}`}>
        {hexagons.map((hex, i) => (
          <Hexagon key={i} q={hex.q} r={hex.r} size={hexSize} />
        ))}
      </svg>
    </div>
  );
}

export default HexagonalMap;

function Hexagon({ q, r, size }) {
  // Convert axial to pixel coordinates
  const x = size * Math.sqrt(3) * (q + r/2);
  const y = size * 3/2 * r;

  // Points for a flat-topped hexagon
  const hexPoints = [
    { x: x + size * Math.sqrt(3) / 2, y: y - size / 2 },
    { x: x + size * Math.sqrt(3) / 2, y: y + size / 2 },
    { x: x, y: y + size },
    { x: x - size * Math.sqrt(3) / 2, y: y + size / 2 },
    { x: x - size * Math.sqrt(3) / 2, y: y - size / 2 },
    { x: x, y: y - size },
  ];

  return (
    <polygon
      points={hexPoints.map(p => `${p.x},${p.y}`).join(' ')}
      className="hexagon"
    />
  );
}

function generateHexagonalGrid(radius) {
    let hexagons = [];
  
    for (let q = -radius; q <= radius; q++) {
      let r1 = Math.max(-radius, -q - radius);
      let r2 = Math.min(radius, -q + radius);
      for (let r = r1; r <= r2; r++) {
        // Add only the hexagons that are on the edge
        if (Math.abs(q) === radius || Math.abs(r) === radius || Math.abs(-q-r) === radius) {
          hexagons.push({ q, r });
        }
      }
    }
  
    return hexagons;
  }
  
