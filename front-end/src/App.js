import React, { useState, useEffect } from "react";
import "./App.css";
import HexagonalMap from "./components/HexagonalMap";
import Dice from "react-dice-roll";
import Scoreboard from "./components/Scoreboard";
import { HEX_PATH } from './constants';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


function App() {
  
  const initialPlayers = [{ id: 1, name: "Team 1", position: { q: 0, r: 6 }, money: 1500 }];
  const [purchasingPlayerId, setPurchasingPlayerId] = useState(null);

  const [players, setPlayers] = useState(() => {
    const storedPlayers = localStorage.getItem("players");
    return storedPlayers ? JSON.parse(storedPlayers) : initialPlayers;
  });

  const [currentTurn, setCurrentTurn] = useState(() => {
    const storedTurn = localStorage.getItem("currentTurn");
    return storedTurn ? parseInt(storedTurn, 10) : 0;
  });

  const [landStatus, setLandStatus] = useState(() => {
    const storedLandStatus = localStorage.getItem("landStatus");
    return storedLandStatus ? JSON.parse(storedLandStatus) : {};
  });
  
  const [openDialog, setOpenDialog] = useState(false);  
  const [selectedHex, setSelectedHex] = useState(null);

  const handleLandPurchase = (hex) => {
    const landKey = `${hex.q},${hex.r}`;
    const currentLand = landStatus[landKey];
    const currentPlayerId = players[currentTurn].id; // Get current player ID based on turn
    console.log("currentPlayerId", currentPlayerId)
    if (currentLand && currentLand.owner !== currentPlayerId) {
      alert(`你踩到了 ${players.find(p => p.id === currentLand.owner).name} 的土地，罚 ${currentLand.wine} 杯酒！`);
    } else {
      setSelectedHex(hex);
      setOpenDialog(true);
    }
  };
  
  const handlePurchaseOption = (option) => {
    const drinks = ["不喝", "喝一杯", "喝兩杯", "喝三杯"].indexOf(option);
    if (drinks > 0 && selectedHex) {
      const landKey = `${selectedHex.q},${selectedHex.r}`;
      const currentLand = landStatus[landKey] || {};
      const newLandStatus = {
        ...landStatus,
        [landKey]: {
          owner: purchasingPlayerId, // 使用保存的玩家 ID
          wine: (currentLand.wine || 0) + drinks,
        },
      };
      setLandStatus(newLandStatus);
    }
    setOpenDialog(false);
  };
  

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentTurn", currentTurn.toString());
    localStorage.setItem("landStatus", JSON.stringify(landStatus));
  }, [players, currentTurn, landStatus]);
  

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


  const handleDiceRoll = (value) => {
    const playerToMove = players[currentTurn];
    setPurchasingPlayerId((prevId) => {
      return playerToMove.id;
    });

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
    setLandStatus({})
  };

  return (
    <div className="App">
      <aside className="scoreboard-container">
        <Scoreboard players={players} />
        <Button variant="contained" onClick={addPlayer}>Add Player</Button>
        <Button variant="contained" onClick={removePlayer}>Remove Player</Button>
        <Button variant="contained" onClick={resetGame}>Reset Game</Button>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>購買土地</DialogTitle>
          <DialogContent>
            <DialogContentText>
              您的選擇是：
            </DialogContentText>
            {["不喝", "喝一杯", "喝兩杯", "喝三杯"].map((option, index) => (
              <Button key={index} onClick={() => handlePurchaseOption(option)}>
                {option}
              </Button>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>取消</Button>
          </DialogActions>
        </Dialog>
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
