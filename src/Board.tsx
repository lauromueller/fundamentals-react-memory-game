import React, { useEffect, useState } from 'react';
import { Card } from './Card';

type BoardCard = {
  color: string;
  isFlipped: boolean;
};

const Board = () => {
  const [cards, setCards] = useState<BoardCard[]>([
    {
      color: '#f00',
      isFlipped: false,
    },
    {
      color: '#0f0',
      isFlipped: false,
    },
    {
      color: '#f00',
      isFlipped: false,
    },
  ]);

  useEffect(() => {
    const flippedCards = cards.filter((card) => card.isFlipped);

    if (flippedCards.length === 2) {
      if (flippedCards[0].color === flippedCards[1].color) {
        setTimeout(() => window.alert('You won!'), 50);
      } else {
        setTimeout(
          () =>
            setCards(
              cards.map((card) => ({
                ...card,
                isFlipped: false,
              }))
            ),
          2000
        );
      }
      // If cards[cardIndex].color === flippedCards[0].color -> Game won!
      // Otherwise, we flip the second card and we set a timer of, say,
      // 2 seconds to unflip the cards.
    }
  }, [cards]);

  const flipCard = (cardIndex: number) => {
    const flippedCards = cards.filter((card) => card.isFlipped);

    if (flippedCards.length < 2) {
      setCards([
        ...cards.slice(0, cardIndex),
        {
          isFlipped: !cards[cardIndex].isFlipped,
          color: cards[cardIndex].color,
        },
        ...cards.slice(cardIndex + 1, cards.length),
      ]);
    }
  };

  return (
    <div className="row">
      {cards.map((card, idx) => {
        return (
          <Card
            key={idx}
            color={card.color}
            isFlipped={card.isFlipped}
            onFlip={() => flipCard(idx)}
          />
        );
      })}
    </div>
  );
};

export { Board };
