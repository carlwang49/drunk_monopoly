import React, { useState, useEffect } from "react";
import "./App.css";
import HexagonalMap from "./components/HexagonalMap";
import Dice from "react-dice-roll";
import Scoreboard from "./components/Scoreboard";
import { HEX_PATH } from './constants';

function App() {
  const initialPlayers = [{ id: 1, name: "Team 1", position: { q: 0, r: 6 }, money: 1500 }];

  const [players, setPlayers] = useState(() => {
    const storedPlayers = localStorage.getItem("players");
    return storedPlayers ? JSON.parse(storedPlayers) : initialPlayers;
  });

  const [currentTurn, setCurrentTurn] = useState(() => {
    const storedTurn = localStorage.getItem("currentTurn");
    return storedTurn ? parseInt(storedTurn, 10) : 0;
  });
  const [landStatus, setLandStatus] = useState({}); // 新增用於保存土地狀態的 state

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentTurn", currentTurn.toString());
  }, [players, currentTurn]);

  const addPlayer = () => {
    const newId = players.length + 1;
    const newPlayer = { id: newId, name: `Team ${newId}`, position: { q: 0, r: 6 }, money: 1500 };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = () => {
    if (players.length > 1) {
      setPlayers(players.slice(0, -1));
    }
  };

  const handleLandPurchase = (hex) => {
    const landKey = `${hex.q},${hex.r}`;
    const currentLand = landStatus[landKey] || {};
  
    const drinkOptions = ["不喝", "喝一杯", "喝兩杯", "喝三杯"];
    const choice = window.prompt(`選擇購買選項：\n${drinkOptions.join("\n")}`);
    if (drinkOptions.includes(choice)) {
      const drinks = drinkOptions.indexOf(choice);
      if (drinks > 0) { // 确保至少喝了一杯才更新状态
        const newLandStatus = {
          ...landStatus,
          [landKey]: {
            owner: players[currentTurn].id,
            wine: (currentLand.wine || 0) + drinks,
          },
        };
        setLandStatus(newLandStatus);
      }
    }
  };
  

  const handleDiceRoll = (value) => {
    const playerToMove = players[currentTurn];
    const currentIndex = HEX_PATH.findIndex(hex => 
      hex.q === playerToMove.position.q && hex.r === playerToMove.position.r
    );

    let newIndex = currentIndex + value;
    if (newIndex >= HEX_PATH.length) {
      newIndex -= HEX_PATH.length;
    }

    const newPosition = HEX_PATH[newIndex];
    const updatedPlayers = players.map(player => 
      player.id === playerToMove.id ? { ...player, position: newPosition } : player
    );

    setPlayers(updatedPlayers);

    // 模擬玩家移動到新位置的延時
    setTimeout(() => {
      handleLandPurchase(newPosition); // 在移動完成後檢查土地購買
    }, 1000); // 假設移動需要 1 秒

    setCurrentTurn((currentTurn + 1) % players.length);
  };

  const resetGame = () => {
    setPlayers(initialPlayers);
    setCurrentTurn(0);
  };

  return (
    <div className="App">
      <aside className="scoreboard-container">
        <Scoreboard players={players} />
        <button onClick={addPlayer}>Add Player</button>
        <button onClick={removePlayer}>Remove Player</button>
        <button onClick={resetGame}>Reset Game</button>
      </aside>
      <main className="main-container">
        <div className="hexagonal-map-container">
          <HexagonalMap players={players} landStatus={landStatus} />
        </div>
        <div className="dice-roll-container">
          <Dice onRoll={handleDiceRoll} />
          <p style={{ fontSize: '2em', color: 'black' }}>
            Current Turn: {players[currentTurn].name}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
