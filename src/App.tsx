import React, { useEffect, useState } from 'react';
import './App.css';
import { Board } from './Board';
import { Header } from './Header';
import { Statistics, StatisticsProvider, useStatistics } from './Statistics';

const generateRandomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const generateRandomColorsArray = (len: number): string[] => {
  return Array.from({ length: len }, () => generateRandomHexColor());
};

function App() {
  const [cards, setCards] = useState(generateRandomColorsArray(4));
  const [screen, setScreen] = useState<'board' | 'statistics'>('board');
  const { statistics, startNewGame, endGame } = useStatistics();

  useEffect(() => console.log(statistics), [statistics]);

  return (
    <>
      <Header
        onRestartGame={() => {
          if (window.confirm('Restart game?')) {
            startNewGame();
            setCards(generateRandomColorsArray(4));
          }
        }}
        onSelectScreen={(screen) => {
          if (screen === 'statistics') {
            if (window.confirm('This will reset the game!')) {
              endGame();
              setScreen(screen);
            }
          } else {
            setScreen(screen);
          }
        }}
      />
      {screen === 'board' && <Board initialCards={cards} />}
      {screen === 'statistics' && <Statistics />}
    </>
  );
}

export default App;
