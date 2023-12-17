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
    { id: 1, name: 'Player 1', position: 0, money: 1500 },
    { id: 2, name: 'Player 2', position: 0, money: 1500 },
    // Add more players as needed
  ]);

  // Here you will need to implement the logic to handle dice rolling, 
  // moving players on the HexagonalMap, and game events.

  // This function is just a placeholder and should be implemented
  const rollDice = () => {
    // Logic for dice roll, update player position etc.
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>酒醉大富翁</h1>
      </header>
      <main>
        {/* 将HexagonalMap的容器设置为适应屏幕高度 */}
        <div className="hexagonal-map-container">
          <HexagonalMap players={players} />
        </div>
        <Dice rollDice={rollDice} />
        {/* <div className="players">
          {players.map((player) => (
            <PlayerToken key={player.id} player={player} />
          ))}
        </div> */}
        <div className="card-decks">
          {/* <CardDeck type="chance" />
          <CardDeck type="communityChest" /> */}
        </div>
        <div className="properties">
          {/* You should map over some array of property data and render PropertyCards */}
        </div>
      </main>
      {/* <Scoreboard players={players} /> */}
    </div>
  );
}

export default App;
