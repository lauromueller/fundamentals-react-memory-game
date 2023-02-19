import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
  useCallback,
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

const getOpenGameKey = (games: Games) =>
  Object.entries(games)
    .filter(([k, v]) => !v.endTime)
    .map(([k]) => k)[0];

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

  const startNewGame = useCallback(() => {
    setGames((games) => {
      const time = new Date();
      const openGame = getOpenGameKey(games);

      if (Boolean(openGame)) {
        return games;
      }

      return {
        ...games,
        [uuidV4()]: {
          startTime: time,
          numberOfCardFlips: 0,
        },
      };
    });
  }, []);

  const endGame = useCallback(() => {
    setGames((games) => {
      const openGame = getOpenGameKey(games);

      if (Boolean(openGame)) {
        games[openGame] = {
          ...games[openGame],
          endTime: new Date(),
        };
      }
      return { ...games };
    });
  }, []);

  const incrementCardFlips = useCallback(() => {
    setGames((games) => {
      const openGame = getOpenGameKey(games);

      if (Boolean(openGame)) {
        games[openGame] = {
          ...games[openGame],
          numberOfCardFlips: games[openGame].numberOfCardFlips + 1,
        };
      }
      return { ...games };
    });
  }, []);

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
  const { statistics } = useStatistics();

  return (
    <div style={{ padding: '1rem' }}>
      Completed games:
      <pre>{JSON.stringify(statistics, null, 2)}</pre>
    </div>
  );
};
