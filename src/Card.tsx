import React, { FunctionComponent } from 'react';
import logo from './logo.svg';

type CardProps = {
  color: string;
  isFlipped: boolean;
  onFlip: () => void;
};

export const Card: FunctionComponent<CardProps> = (props) => {
  return (
    <div
      className="card"
      onClick={props.onFlip}
    >
      {props.isFlipped ? (
        <div
          className="w-100 h-100"
          style={{ backgroundColor: props.color, padding: '2rem' }}
        />
      ) : (
        <img
          src={logo}
          alt="React logo"
        />
      )}
    </div>
  );
};
