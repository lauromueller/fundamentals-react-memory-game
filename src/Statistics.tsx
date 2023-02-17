import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';

type StatisticsContextValue = {
  games: Games;
  startNewGame: () => void;
  endGame: () => void;
  incrementCardFlips: () => void;
};

type GameStatistics = {
  startTime: Date;
  endTime?: Date;
  numberOfCardFlips: number;
};

type Games = Record<string, GameStatistics>;

type StatisticsProviderProps = {
  children: ReactNode;
};

const statisticsContext = createContext<StatisticsContextValue>({
  games: {},
  startNewGame: () => undefined,
  endGame: () => undefined,
  incrementCardFlips: () => undefined,
});

export const useStatistics = () => {
  const { games, startNewGame, endGame, incrementCardFlips } =
    useContext(statisticsContext);

  return {
    statistics: games,
    startNewGame,
    endGame,
    incrementCardFlips,
  };
};

export const StatisticsProvider: FunctionComponent<StatisticsProviderProps> = ({
  children,
}) => {
  const [games, setGames] = useState<Games>({});

  const startNewGame = () => {
    const time = new Date();

    const openGame = Object.entries(games)
      .filter(([k, v]) => !v.endTime)
      .map(([k]) => k)[0];

    const gamesCopy = { ...games };

    if (Boolean(openGame)) {
      gamesCopy[openGame] = {
        ...gamesCopy[openGame],
        endTime: time,
      };
    }

    setGames({
      ...gamesCopy,
      [uuidV4()]: {
        startTime: time,
        numberOfCardFlips: 0,
      },
    });
  };

  const endGame = () => {
    const openGame = Object.entries(games)
      .filter(([k, v]) => !v.endTime)
      .map(([k]) => k)[0];

    const gamesCopy = { ...games };

    if (Boolean(openGame)) {
      gamesCopy[openGame] = {
        ...gamesCopy[openGame],
        endTime: new Date(),
      };
    }

    setGames({
      ...gamesCopy,
    });
  };

  const incrementCardFlips = () => {
    const openGame = Object.entries(games)
      .filter(([k, v]) => !v.endTime)
      .map(([k]) => k)[0];

    const gamesCopy = { ...games };

    if (Boolean(openGame)) {
      gamesCopy[openGame] = {
        ...gamesCopy[openGame],
        numberOfCardFlips: gamesCopy[openGame].numberOfCardFlips + 1,
      };
    }

    setGames({
      ...gamesCopy,
    });
  };

  return (
    <statisticsContext.Provider
      value={{
        games,
        startNewGame,
        endGame,
        incrementCardFlips,
      }}
    >
      {children}
    </statisticsContext.Provider>
  );
};

export const Statistics = () => {
  return <div>Statistics</div>;
};
