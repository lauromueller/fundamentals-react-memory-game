import React from 'react';
import { Card } from './Card';

type BoardCard = {
  color: string;
  isFlipped: boolean;
};

type BoardProps = unknown;
type BoardState = {
  cards: BoardCard[];
};

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      cards: [
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
      ],
    };
  }

  flipCard = (cardIndex: number) => {
    this.setState((prev) => {
      return {
        cards: [
          ...prev.cards.slice(0, cardIndex),
          {
            isFlipped: !prev.cards[cardIndex].isFlipped,
            color: prev.cards[cardIndex].color,
          },
          ...prev.cards.slice(cardIndex + 1, prev.cards.length),
        ],
      };
    });
  };

  render() {
    return (
        <div className="row">
          {this.state.cards.map((card, idx) => {
            return (
              <Card
                key={idx}
                color={card.color}
                isFlipped={card.isFlipped}
                onFlip={() => this.flipCard(idx)}
              />
            );
          })}
        </div>
    );
  }
}

export { Board };
