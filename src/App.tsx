import React, { useState } from 'react';
import './App.css';
import { Board } from './Board';
import { Header } from './Header';

const generateRandomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const generateRandomColorsArray = (len: number): string[] => {
  return Array.from({ length: len }, () => generateRandomHexColor());
};

function App() {
  const [cards, setCards] = useState(generateRandomColorsArray(4));
  return (
    <>
      <Header onRestartGame={() => console.log('Restart button clicked')} />
      <Board initialCards={cards} />
    </>
  );
}

export default App;
