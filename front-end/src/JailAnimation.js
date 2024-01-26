import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JailSvg from './imgs/prison-svgrepo-com.svg';

const jailAnimationVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 5 } }, // Extend the animation duration to 5 seconds
    exit: { scale: 0, opacity: 0, transition: { duration: 5 } } // Extend the exit duration to 5 seconds
  };

const JailAnimation = ({ playerId, onAnimationEnd }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={jailAnimationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onAnimationComplete={onAnimationEnd}
        style={{
          position: 'fixed',
          top: '10%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100 // 确保动画位于最顶层
        }}
      >
        <img src={JailSvg} alt={`Player ${playerId} in jail`} />
      </motion.div>
    </AnimatePresence>
  );
};

export default JailAnimation;
