import React, { FunctionComponent } from 'react';
import logo from './logo.svg';

type CardProps = {
  color: string;
  isFlipped: boolean;
};

export const Card: FunctionComponent<CardProps> = (props) => {
  return (
    <div className="card">
      {props.isFlipped ? (
        <div
          className="w-100 h-100"
          style={{ backgroundColor: props.color }}
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
