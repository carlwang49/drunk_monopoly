import React from 'react';

function CardDeck({ type, onDraw }) {
  const handleDrawCard = () => {
    // Logic to draw a card
    if (onDraw) {
      onDraw(type); // Pass the card type to the parent component
    }
  };

  return (
    <div>
      <h3>{type} Card Deck</h3>
      <button onClick={handleDrawCard}>Draw Card</button>
    </div>
  );
}

export default CardDeck;
