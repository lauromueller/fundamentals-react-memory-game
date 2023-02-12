import { FunctionComponent } from 'react';

type HeaderProps = {
  onRestartGame: () => void;
};

export const Header: FunctionComponent<HeaderProps> = ({ onRestartGame }) => {
  return (
    <div className="header-container">
      <button className='reset-button' onClick={onRestartGame}>Restart</button>
    </div>
  );
};
