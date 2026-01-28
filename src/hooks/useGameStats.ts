import { useState, useEffect } from 'react';

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
  bestScore: number;
}

const STORAGE_KEY = 'tap-battle-stats';

const getInitialStats = (): GameStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
  return { wins: 0, losses: 0, draws: 0, bestScore: 0 };
};

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>(getInitialStats);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const updateStats = (playerScore: number, aiScore: number) => {
    setStats(prev => {
      const newStats = { ...prev };
      if (playerScore > aiScore) {
        newStats.wins += 1;
      } else if (playerScore < aiScore) {
        newStats.losses += 1;
      } else {
        newStats.draws += 1;
      }
      if (playerScore > newStats.bestScore) {
        newStats.bestScore = playerScore;
      }
      return newStats;
    });
  };

  const resetStats = () => {
    setStats({ wins: 0, losses: 0, draws: 0, bestScore: 0 });
  };

  return { stats, updateStats, resetStats };
};
