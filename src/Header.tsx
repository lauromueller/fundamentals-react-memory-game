import { FunctionComponent } from 'react';
import { useStatistics } from './Statistics';

type HeaderProps = {
  onRestartGame: () => void;
  onSelectScreen: (screen: 'board' | 'statistics') => void;
};

export const Header: FunctionComponent<HeaderProps> = ({
  onRestartGame,
  onSelectScreen,
}) => {
  return (
    <div className="header-container">
      <button
        className="reset-button"
        onClick={onRestartGame}
      >
        Restart
      </button>
      <div>
        <button onClick={() => onSelectScreen('board')}>Board</button>
        <button onClick={() => onSelectScreen('statistics')}>Statistics</button>
      </div>
    </div>
  );
};
