import React from 'react';
import { motion } from 'framer-motion';
import "./StartScreen.css";

const StartScreen = ({ onStart }) => {
  return (
    <motion.div
      className="start-screen"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Welcome to Intoxicated Monopoly</h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
      >
        Start
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;
