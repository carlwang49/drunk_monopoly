import React, { useState } from 'react';
import './App.css';
import HexagonalMap from './components/HexagonalMap';
import Dice from './components/Dice';
import PlayerToken from './components/PlayerToken';
import CardDeck from './components/CardDeck';
import PropertyCard from './components/PropertyCard';
import Scoreboard from './components/Scoreboard';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Team 1', position: { q: 3, r: -6 }, money: 1500 },
    { id: 2, name: 'Team 3', position: { q: 3, r: -6 }, money: 1500 },
    { id: 2, name: 'Team 4', position: { q: 3, r: -6 }, money: 1500 },
    { id: 2, name: 'Team 5', position: { q: 6, r: -4 }, money: 1500 },
    { id: 2, name: 'Team 6', position: { q: 6, r: -4 }, money: 1500 },
    // Add more players as needed
  ]);

  return (
    <div className="App">
      <aside className="scoreboard-container">
        <Scoreboard players={players} /> {/* 显示分数的组件 */}
      </aside>
      <main>
        <div className="hexagonal-map-container">
          <HexagonalMap players={players} />
        </div>
      </main>
    </div>
  );
}

export default App;
