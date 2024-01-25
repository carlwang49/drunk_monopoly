import React, { useState, useEffect } from "react";
import "./App.css";
import HexagonalMap from "./components/HexagonalMap";
import Dice from "react-dice-roll";
import Scoreboard from "./components/Scoreboard";
import CardDeck from "./components/CardDeck";
import { HEX_PATH } from "./constants";
import StartScreen from "./components/StartScreen";
import { motion } from "framer-motion";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import MySvgComponent from "./MySvgComponent"; // 确保路径正确

function App() {
  const initialPlayers = [
    { id: 1, name: "Team 1", position: { q: 0, r: 6 }, money: 1500 },
    { id: 2, name: "Team 2", position: { q: 0, r: 6 }, money: 1500 },
    { id: 3, name: "Team 3", position: { q: 0, r: 6 }, money: 1500 },
    { id: 4, name: "Team 4", position: { q: 0, r: 6 }, money: 1500 },
    { id: 5, name: "Team 5", position: { q: 0, r: 6 }, money: 1500 },
    { id: 6, name: "Team 6", position: { q: 0, r: 6 }, money: 1500 },
  ];

  const [purchasingPlayerId, setPurchasingPlayerId] = useState(null);

  // start screen
  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    localStorage.setItem("gameStarted", "true");
    setGameStarted(true);
  };


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

  const [resetDeckKey, setResetDeckKey] = useState(0); // 新增状态
  const [resetFateDeckKey, setResetFateDeckKey] = useState(0); // 为命运卡堆添加新的状态
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleTriviaCardDraw = () => {
    console.log("Trivia card drawn");
    setAutoDrawTriviaCard(true); // 触发自动抽取问答卡
  };

  const handleFateCardDraw = () => {
    console.log("Fate card drawn");
    setAutoDrawFateCard(true); // 触发自动抽取命运卡
  };

  const [autoDrawTriviaCard, setAutoDrawTriviaCard] = useState(false);
  const [autoDrawFateCard, setAutoDrawFateCard] = useState(false); // 为命运卡堆添加新的状态

  // 在命运卡被抽取后，需要重置 autoDrawTriviaCard 状态
  useEffect(() => {
    if (autoDrawFateCard) {
      setAutoDrawFateCard(false);
    }
  }, [autoDrawFateCard]);

  useEffect(() => {
    if (autoDrawTriviaCard) {
      setAutoDrawTriviaCard(false);
    }
  }, [autoDrawTriviaCard]);

  const handleLandPurchase = (hex) => {
    const landKey = `${hex.q},${hex.r}`;
    const currentLand = landStatus[landKey];
    const currentPlayerId = players[currentTurn].id; // Get current player ID based on turn
    console.log("currentPlayerId", currentPlayerId);
    if (currentLand && currentLand.owner !== currentPlayerId) {
      alert(
        `你踩到了 ${
          players.find((p) => p.id === currentLand.owner).name
        } 的土地，罚 ${currentLand.wine} 杯酒！`
      );
    } else {
      setSelectedHex(hex);
      setOpenDialog(true);
    }
  };

  const handleDrawCard = (drawnCard) => {
    console.log("Card drawn:", drawnCard);
    // Here you can add the logic of what happens when a card is drawn
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

  useEffect(() => {
    const storedGameStarted = localStorage.getItem("gameStarted");
    if (storedGameStarted === "true") {
      setGameStarted(true);
    } else {
      setGameStarted(false);
    }
  }, []); // 确保只在组件首次渲染时执行

  const addPlayer = () => {
    const newId = players.length + 1;
    const newPlayer = {
      id: newId,
      name: `Team ${newId}`,
      position: { q: 0, r: 6 },
      money: 1500,
    };
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

    const currentIndex = HEX_PATH.findIndex(
      (hex) =>
        hex.q === playerToMove.position.q && hex.r === playerToMove.position.r
    );

    let newIndex = currentIndex + value;
    if (newIndex >= HEX_PATH.length) {
      newIndex -= HEX_PATH.length;
    }

    const newPosition = HEX_PATH[newIndex];
    const updatedPlayers = players.map((player) =>
      player.id === playerToMove.id
        ? { ...player, position: newPosition }
        : player
    );

    setPlayers(updatedPlayers);

    // 判斷玩家是否移動到特定座標 (0, 6)
    if (newPosition.q === 0 && newPosition.r === 6) {
      console.log("No action at (0, 6)");
      setCurrentTurn((currentTurn + 1) % players.length);
      return; // 提前返回以避免觸發其他邏輯
    }

    // 判断是否触发问答卡
    const triggerTriviaCard =
      (newPosition.q === 6 && newPosition.r === -6) ||
      (newPosition.q === 3 && newPosition.r === -6) ||
      (newPosition.q === -6 && newPosition.r === 1) ||
      (newPosition.q === -6 && newPosition.r === 6) ||
      (newPosition.q === -3 && newPosition.r === 6) ||
      (newPosition.q === 6 && newPosition.r === 0);

    const triggerFateCard =
      (newPosition.q === 4 && newPosition.r === -6) ||
      (newPosition.q === -3 && newPosition.r === 3) ||
      (newPosition.q === -6 && newPosition.r === 3) ||
      (newPosition.q === -4 && newPosition.r === 6) ||
      (newPosition.q === 3 && newPosition.r === 3) ||
      (newPosition.q === 6 && newPosition.r === -3) ||
      (newPosition.q === -3 && newPosition.r === -3);

    const triggerAnimation =
      (newPosition.q === 1 && newPosition.r === -6) ||
      (newPosition.q === -5 && newPosition.r === -1) ||
      (newPosition.q === -6 && newPosition.r === 5) ||
      (newPosition.q === -1 && newPosition.r === 6) ||
      (newPosition.q === 5 && newPosition.r === 1) ||
      (newPosition.q === 6 && newPosition.r === -5);

    setTimeout(() => {
      if (triggerTriviaCard) {
        handleTriviaCardDraw();
      } else if (triggerFateCard) {
        handleFateCardDraw(); // 触发命运卡
      } else if (triggerAnimation) {
        setPlayAnimation(true); // 触发动画
      } else {
        handleLandPurchase(newPosition); // 土地购买逻辑
      }
    }, 1000);

    setCurrentTurn((currentTurn + 1) % players.length);
  };

  const resetGame = () => {
    localStorage.setItem("gameStarted", "false"); // 在本地存储中将 gameStarted 设置为 false
    setGameStarted(false); // 将 gameStarted 设置为 false
    setPlayers(initialPlayers);
    setCurrentTurn(0);
    setLandStatus({});
    localStorage.removeItem("cards");
    setResetDeckKey((prev) => prev + 1);
    setResetFateDeckKey((prev) => prev + 1);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <StartScreen onStart={startGame} />
      ) : (
        <>
          <aside className="scoreboard-container">
            <Scoreboard players={players} />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>購買土地</DialogTitle>
              <DialogContent>
                <DialogContentText>您的選擇是：</DialogContentText>
                {["不喝", "喝一杯", "喝兩杯", "喝三杯"].map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePurchaseOption(option)}
                  >
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
              {playAnimation && (
                <motion.div
                  className="animation-container"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { duration: 4 } }}
                  exit={{ scale: 0 }}
                  onAnimationComplete={() => setPlayAnimation(false)}
                >
                  <MySvgComponent />
                </motion.div>
              )}
              {/* 將 CardDeck 放置於地圖的中間 */}
              <div className="card-deck-wrapper">
                <CardDeck
                  onDraw={handleDrawCard}
                  resetDeckKey={resetDeckKey}
                  deckType="問答卡"
                  disabled
                  autoDraw={autoDrawTriviaCard}
                />
                <CardDeck
                  onDraw={handleDrawCard}
                  resetDeckKey={resetFateDeckKey}
                  deckType="命運卡"
                  disabled
                  autoDraw={autoDrawFateCard}
                />
              </div>
              {/* 右邊的設定區 */}
              <Paper className="settings-panel" elevation={3}>
                <Button variant="contained" onClick={addPlayer}>
                  Add Player
                </Button>
                <Button variant="contained" onClick={removePlayer}>
                  Remove Player
                </Button>
                <Button variant="contained" onClick={resetGame}>
                  Reset Game
                </Button>
              </Paper>
            </div>
            <div className="dice-roll-container">
              <Dice onRoll={handleDiceRoll} />
              <p style={{ fontSize: "2em", color: "black" }}>
                Current Turn: {players[currentTurn].name}
              </p>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
