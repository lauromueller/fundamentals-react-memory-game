import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import './App.css';

type CardProps = {
  color: string;
  isFlipped: boolean;
};

const Card: FunctionComponent<CardProps> = (props) => {
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

function App() {
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

export default App;
