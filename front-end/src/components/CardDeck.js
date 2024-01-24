import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

function CardDeck({ onDraw, resetDeckKey, deckType, disabled, autoDraw }) {
  const localStorageKey = `${deckType}-cards`; // 根据卡牌类型创建唯一的 localStorage 键

  // 初始化卡牌状态
  const initialCards = () => {
    const savedCards = localStorage.getItem(localStorageKey);
    return savedCards ? JSON.parse(savedCards) : Array.from({ length: 25 }, (_, i) => ({ id: i, content: `${deckType} Card ${i + 1}` }));
  };

  const [cards, setCards] = useState(initialCards);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const savedCards = localStorage.getItem(localStorageKey);
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []); // 添加空数组作为依赖，使 useEffect 仅在组件挂载时执行

  // 当卡牌状态变化时，更新 localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cards));
  }, [cards, localStorageKey]); // 仅在 cards 或 localStorageKey 变化时执行

  useEffect(() => {
    if (autoDraw) {
      handleDrawCard();
    }
  }, [autoDraw]);

  // useEffect 钩子监听重置
  useEffect(() => {
    // 检查是否需要重置卡牌堆
    if (resetDeckKey > 0) {
      setCards(Array.from({ length: 25 }, (_, i) => ({ id: i, content: `${deckType} Card ${i + 1}` })));
      setSelectedCard(null);
      setOpen(false);
      localStorage.removeItem(localStorageKey);
    }
  }, [resetDeckKey, localStorageKey, deckType]);

  const handleDrawCard = () => {
    // 确保在 autoDraw 为 true 时能够抽取卡牌
    if (autoDraw || (cards.length > 0 && !disabled)) {
      const newCards = [...cards];
      const drawnCard = newCards.pop();
      setCards(newCards);
      setSelectedCard(drawnCard); // 设置被抽出的卡牌
      setOpen(true); // 打开弹窗
      if (onDraw && drawnCard) {
        onDraw(drawnCard); // 传递被抽出的卡牌信息给父组件
      }
    }
  };

  // 对话框的动画变量
  const dialogVariants = {
    hidden: { scale: 0.9, opacity: 0, transition: { duration: 1 } }, // 持续时间为 1 秒
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 1 } },
  };

  // 卡牌的动画变量
  const cardVariants = {
    hidden: { y: 20, opacity: 0, transition: { duration: 1 } },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: -20, opacity: 0, transition: { duration: 1 } },
  };

  const dialogBackgroundColor = deckType === '命運卡' ? 'rgba(255, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'; // 命运卡为黄色背景

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h3>{deckType} Deck</h3>
      <Button 
        variant="contained" 
        onClick={handleDrawCard} 
        disabled={cards.length === 0}
      >
        {deckType} ({cards.length})
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
                style={{ backgroundColor: dialogBackgroundColor }} // 根据卡牌类型设置背景颜色
              >
                {children}
              </motion.div>
            )}
          >
            <DialogTitle>Drawn Card</DialogTitle>
            <DialogContent>
              <DialogContentText
                component={motion.p}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {selectedCard ? selectedCard.content : 'No card'}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CardDeck;
