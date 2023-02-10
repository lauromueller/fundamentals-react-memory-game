import React, { useState } from 'react';
import { Card } from './Card';

type BoardCard = {
  color: string;
  isFlipped: boolean;
};

const Board = () => {
  const [cards, setCards] = useState<BoardCard[]>([
    {
      color: '#f00',
      isFlipped: true,
    },
    {
      color: '#0f0',
      isFlipped: false,
    },
    {
      color: '#00f',
      isFlipped: false,
    },
  ]);

  const flipCard = (cardIndex: number) => {
    setCards([
      ...cards.slice(0, cardIndex),
      {
        isFlipped: !cards[cardIndex].isFlipped,
        color: cards[cardIndex].color,
      },
      ...cards.slice(cardIndex + 1, cards.length),
    ]);
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
