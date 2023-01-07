import React from 'react';
import { Card } from './Card';

type BoardProps = unknown;
type BoardState = unknown;

class Board extends React.Component<BoardProps, BoardState> {
  render() {
    return (
      <div className="row">
        <Card
          color="#f00"
          isFlipped={true}
        />
        <Card
          color="#0f0"
          isFlipped={false}
        />
      </div>
    );
  }
}

export { Board };
