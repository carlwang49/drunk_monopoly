import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCards from "./util/QuestionCards";
import FateCards from "./util/FateCards";

function CardDeck({ onDraw, deckType, autoDraw, getLandOwners, onLandGrab, players, currentTurn }) {
  const localStorageKey = `${deckType}-cards`;

  // Shuffle cards
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
    }
    return cards;
  };

  // Initialize card array with shuffled cards
  const initializeCards = () => {
    const savedCards = localStorage.getItem(localStorageKey);
    if (savedCards) {
      return shuffleCards(JSON.parse(savedCards));
    } else {
      const initialCards = deckType === "問答卡" ? QuestionCards : FateCards;
      return shuffleCards([...initialCards]); // Shuffle cards before setting them
    }
  };

  const [cards, setCards] = useState(initializeCards);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  // Update localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cards));
  }, [cards, localStorageKey]);

  // 渲染有土地的玩家列表的函数
  const renderLandOwners = (selectedCard) => {
    const landOwners = getLandOwners().filter(player => player.id !== players[currentTurn].id); // 排除当前玩家
    return (
      <div>
        <div>
          <p style={{ fontSize: "50px" }}>{selectedCard.content}</p>
          <p style={{ fontSize: "30px" }}>{selectedCard.description}</p>
        </div>
        <div>
          {landOwners.map((player) => (
            <Button
              key={player.id}
              onClick={() => {
                onLandGrab(player.id); // 抢夺土地
                setOpen(false); // 关闭对话框
              }}
              style={{ fontSize: '20px', padding: '15px 30px', margin: '10px' }} // 調整大小和間距
            >
              {player.name}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  

  // Card drawing logic
  // const handleDrawCard = () => {
  //   if (cards.length > 0 && autoDraw) { // Adjusted condition
  //     const newCards = [...cards];
  //     const drawnCard = newCards.shift();
  //     setCards(newCards);
  //     setSelectedCard(drawnCard);
  //     setOpen(true);
  //     if (onDraw) {
  //       onDraw(drawnCard);
  //     }
  //   }
  // };
  

  // debug
  const handleDrawCard = () => {
    if (cards.length > 0) {
      const newCards = [...cards];
      const drawnCard = newCards.shift();
      setCards(newCards);
      setSelectedCard(drawnCard);
      setOpen(true);
      if (onDraw) {
        onDraw(drawnCard);
      }
    }
  };

  useEffect(() => {
    if (autoDraw) {
      // Simplified condition
      handleDrawCard();
    }
  }, [autoDraw]);

  // Animation variants for shaking effect
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { repeat: 3, duration: 0.2 },
    },
  };

  const onOptionClick = (index) => {
    if (selectedCard.answer === index) {
      // Correct answer
      setOpen(false); // Close dialog
      setSelectedCard(null); // Clear selected card
      // Trigger success logic, if any
    } else {
      // Incorrect answer
      setIsShaking(true); // Start shaking
      setTimeout(() => setIsShaking(false), 600); // Stop shaking after 600ms
    }
  };

  const renderCardContent = () => {
    if (!selectedCard) {
      return <p>No card</p>;
    }

    if (deckType === "命運卡" && selectedCard.type === "landGrab") {
      return renderLandOwners(selectedCard);
    }

    if (deckType === "問答卡") {
      if (selectedCard.type === "open") {
        // 特殊卡片逻辑
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "30px" }}>{selectedCard.content}</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selectedCard.options.map((option, index) => (
                <Button
                  key={index}
                  style={{
                    margin: "5px",
                    fontSize: "20px",
                    backgroundColor:
                      hoveredOption === index ? "lightblue" : "transparent",
                  }}
                  onClick={() => onOptionClick(index)}
                  onMouseEnter={() => setHoveredOption(index)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  {hoveredOption === index ? option : option[0]}
                </Button>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <motion.div
            variants={shakeVariants}
            animate={isShaking ? "shake" : "static"}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "30px" }}>{selectedCard.content}</p>
              {selectedCard.image && selectedCard.image.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {selectedCard.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index}`}
                      style={{
                        width: "auto",
                        height: "300px",
                        marginRight: "5px",
                      }}
                    />
                  ))}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedCard.options.map((option, index) => (
                  <Button
                    key={index}
                    style={{
                      margin: "5px",
                      fontSize: "20px",
                      backgroundColor:
                        hoveredOption === index ? "lightblue" : "transparent",
                    }}
                    onClick={() => onOptionClick(index)}
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      }
    } else if (deckType === "命運卡") {
      return (
        <div>
          <p style={{ fontSize: "50px" }}>{selectedCard.content}</p>
          <p style={{ fontSize: "30px" }}>{selectedCard.description}</p>
        </div>
      );
    }
  };

  // 動畫設計
  const dialogVariants = {
    hidden: { scale: 0.9, opacity: 1, transition: { duration: 3 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 1 } },
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleDrawCard}
        style={{ marginBottom: "10px" }}
      >
        {deckType} ({cards.length} left)
      </Button>
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={({ children }) => (
              <motion.div
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                {children}
              </motion.div>
            )}
          >
            <DialogTitle>
              {selectedCard && selectedCard.type === "binary"
                ? "二選一"
                : selectedCard && selectedCard.type === "choice"
                ? "選選看"
                : selectedCard && selectedCard.type === "open"
                ? "卡門想什麼～"
                : deckType}
            </DialogTitle>
            <DialogContent>{selectedCard && renderCardContent()}</DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CardDeck;
