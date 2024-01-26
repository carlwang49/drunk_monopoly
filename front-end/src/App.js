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
import MySvgComponent from "./MySvgComponent"; 
import JailAnimation from './JailAnimation';

function App() {
  const initialPlayers = [
    { id: 1, name: "Team 1", position: { q: 0, r: 6 }},
    { id: 2, name: "Team 2", position: { q: 0, r: 6 }},
    { id: 3, name: "Team 3", position: { q: 0, r: 6 }},
    { id: 4, name: "Team 4", position: { q: 0, r: 6 }},
    { id: 5, name: "Team 5", position: { q: 0, r: 6 }},
    { id: 6, name: "Team 6", position: { q: 0, r: 6 }},
  ];

  const [purchasingPlayerId, setPurchasingPlayerId] = useState(null);

  // start screen
  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    localStorage.setItem("gameStarted", "true");
    setGameStarted(true);
  };

  // 罰酒狀態
  const [landPurchaseAnimation, setLandPurchaseAnimation] = useState(false);
  const [landPurchaseMessage, setLandPurchaseMessage] = useState('');

  // 重置遊戲
  const [openResetDialog, setOpenResetDialog] = useState(false);

  // 坐牢
  const [jailedPlayers, setJailedPlayers] = useState({});
  const [showJailAnimation, setShowJailAnimation] = useState(false);
  const triggerJailAnimation = (playerId) => {
    // Set the state to show the jail animation for a specific player
    setShowJailAnimation(playerId);
    // You might need to add more code here to handle the animation specifics
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

  // 買地狀態
  const handleLandPurchase = (hex) => {
    const landKey = `${hex.q},${hex.r}`;
    const currentLand = landStatus[landKey];
    const currentPlayerId = players[currentTurn].id;
    if (currentLand && currentLand.owner !== currentPlayerId) {
      const message = `${players[currentTurn].name} 踩到 ${players.find((p) => p.id === currentLand.owner).name} 的地，請罰 ${currentLand.wine} 杯!`;
      setLandPurchaseMessage(message);
      setLandPurchaseAnimation(true);
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


  // 設定區
  const addPlayer = () => {
    if (players.length < 6) { // 检查玩家数量是否小于6
      const newId = players.length + 1;
      const newPlayer = {
        id: newId,
        name: `Team ${newId}`,
        position: { q: 0, r: 6 },
      };
      setPlayers([...players, newPlayer]);
    }
  };

  const removePlayer = () => {
    if (players.length > 2) { // 检查玩家数量是否大于2
      setPlayers(players.slice(0, -1));
    }
  };
  

  // 骰子區
  const handleDiceRoll = (value) => {
    const playerToMove = players[currentTurn];

    // Check if the player is in jail and skip their turn if so
    if (jailedPlayers[playerToMove.id]) {
      // Use the renamed function 'triggerJailAnimation' here
      triggerJailAnimation(playerToMove.id);
  
      // Extend the timeout to the duration of the jail animation
      setTimeout(() => {
        setJailedPlayers(prevState => ({ ...prevState, [playerToMove.id]: false }));
        setShowJailAnimation(false); // Make sure to hide the jail animation
        setCurrentTurn((currentTurn + 1) % players.length); // Move to the next player after animation
      }, 5000); // Extend the duration to 5 seconds or as needed
  
      return; // Skip the rest of the function
    }

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
    } else if (newPosition.q === 0 && newPosition.r === -6) {
      setJailedPlayers(prevState => ({ ...prevState, [playerToMove.id]: true }));
      setCurrentTurn((currentTurn + 1) % players.length);
      return
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

  const confirmResetGame = () => {
    localStorage.setItem("gameStarted", "false");
    setGameStarted(false);
    setPlayers(initialPlayers);
    setCurrentTurn(0);
    setLandStatus({});
    localStorage.removeItem("問答卡-cards");
    localStorage.removeItem("命運卡-cards");
    setOpenResetDialog(false); // 关闭对话框
  };
  
  const resetGame = () => {
    setOpenResetDialog(true); // 打开确认对话框
  };
  
  return (
    <div className="App">
      <Dialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
      >
        <DialogTitle>{"Game Reset"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the game? This action will clear all game data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmResetGame} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setOpenResetDialog(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {!gameStarted ? (
        <StartScreen onStart={startGame} />
      ) : (
        <>
          <aside className="scoreboard-container">
            <Scoreboard players={players} landStatus={landStatus} currentTurn={currentTurn} />
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
          {showJailAnimation && (
            <JailAnimation
              playerId={showJailAnimation}
              onAnimationEnd={() => setShowJailAnimation(false)}
            />
          )}
          {landPurchaseAnimation && (
            <motion.div
              className="land-purchase-animation-container"
              initial={{ opacity: 0.7 }} // 初始透明度為 0
              animate={{ opacity: 2, transition: { duration: 5 } }} // 緩慢淡入
              exit={{ opacity: 0, transition: { delay: 3, duration: 3 } }} // 延遲 20 秒後，用 10 秒的時間緩慢淡出
              onAnimationComplete={() => setLandPurchaseAnimation(false)}
              style={{
                position: "fixed",
                top: "50%", // 居中顯示
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                fontSize: "2rem",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.8)",
                padding: "10px",
                borderRadius: "10px",
                width: "50%",
                textAlign: "center"
              }}
            >
              {landPurchaseMessage}
            </motion.div>
          )}
            <div className="hexagonal-map-container">
              <HexagonalMap players={players} landStatus={landStatus} />
              {playAnimation && (
                <motion.div
                  className="animation-container"
                  initial={{ y: "100vh", scale: 0.5, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1, transition: { duration: 3, type: "spring" } }}
                  exit={{ y: "100vh", scale: 0.5, opacity: 0, transition: { duration: 3 } }}
                  onAnimationComplete={() => setPlayAnimation(false)}
                  style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}
                >
                  <MySvgComponent />
                </motion.div>
              )}
              {/* 將 CardDeck 放置於地圖的中間 */}
              <div className="card-deck-wrapper">
                <CardDeck
                  onDraw={handleDrawCard}
                  deckType="問答卡"
                  autoDraw={autoDrawTriviaCard}
                />
                <CardDeck
                  onDraw={handleDrawCard}
                  deckType="命運卡"
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
              <p style={{ fontSize: "3em", fontWeight: "bold", color: "#808080" }}>
              </p>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
