import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card } from './Card';

type BoardCard = {
  color: string;
  isFlipped: boolean;
};

type BoardProps = {
  initialCards: string[];
};

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  let curIndex = copy.length;
  let randomIndex;

  while (curIndex !== 0) {
    randomIndex = Math.floor(Math.random() * curIndex);
    curIndex--;

    [copy[curIndex], copy[randomIndex]] = [copy[randomIndex], copy[curIndex]];
  }

  return copy;
}

const Board: FunctionComponent<BoardProps> = ({ initialCards }) => {
  const [cards, setCards] = useState<BoardCard[]>(
    shuffle([...initialCards, ...initialCards]).map((card) => ({
      color: card,
      isFlipped: false,
    }))
  );

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
