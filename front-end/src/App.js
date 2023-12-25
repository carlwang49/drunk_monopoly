import React, { useState } from "react";
import "./App.css";
import HexagonalMap from "./components/HexagonalMap";
import Dice from "react-dice-roll";
import PlayerToken from "./components/PlayerToken";
import CardDeck from "./components/CardDeck";
import PropertyCard from "./components/PropertyCard";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Team 1", position: { q: 3, r: -6 }, money: 1500 },
    { id: 2, name: "Team 3", position: { q: 3, r: -6 }, money: 1500 },
    { id: 2, name: "Team 4", position: { q: 3, r: -6 }, money: 1500 },
    { id: 2, name: "Team 5", position: { q: 6, r: -4 }, money: 1500 },
    { id: 2, name: "Team 6", position: { q: 6, r: -4 }, money: 1500 },
  ]); 

  // Define handleDiceRoll function and rolledNumber state
  const [rolledNumber, setRolledNumber] = useState(null);

  const handleDiceRoll = (value) => {
    // Update the state with the rolled number
    setRolledNumber(value);
    // Log the rolled number to the console
    console.log('Rolled Number:', value);
  };

  return (
    <div className="App">
      <aside className="scoreboard-container">
        <Scoreboard players={players} />
      </aside>
      <main className="main-container">
        <div className="hexagonal-map-container">
          <HexagonalMap players={players} />
        </div>
        <div className="dice-roll-container">
          {/* Pass the handleDiceRoll function to capture the rolled number */}
          <Dice onRoll={(value) => console.log(value)} />
        </div>
      </main>
    </div>
  );
}

export default App;
