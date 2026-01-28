import { useState, useCallback } from 'react';
import { HomeScreen } from '@/screens/HomeScreen';
import { GameScreen } from '@/screens/GameScreen';
import { ResultScreen } from '@/screens/ResultScreen';
import { Difficulty } from '@/components/game/DifficultyButton';
import { useGameStats } from '@/hooks/useGameStats';

type GameState = 'home' | 'playing' | 'result';

interface GameResult {
  playerScore: number;
  aiScore: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [result, setResult] = useState<GameResult>({ playerScore: 0, aiScore: 0 });
  const { stats, updateStats } = useGameStats();

  const handleStartGame = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  }, []);

  const handleGameEnd = useCallback((playerScore: number, aiScore: number) => {
    setResult({ playerScore, aiScore });
    updateStats(playerScore, aiScore);
    setGameState('result');
  }, [updateStats]);

  const handlePlayAgain = useCallback(() => {
    setGameState('playing');
  }, []);

  const handleHome = useCallback(() => {
    setGameState('home');
  }, []);

  switch (gameState) {
    case 'home':
      return <HomeScreen onStartGame={handleStartGame} />;
    case 'playing':
      return <GameScreen difficulty={difficulty} onGameEnd={handleGameEnd} />;
    case 'result':
      return (
        <ResultScreen
          playerScore={result.playerScore}
          aiScore={result.aiScore}
          difficulty={difficulty}
          stats={stats}
          onPlayAgain={handlePlayAgain}
          onHome={handleHome}
        />
      );
  }
};

export default Index;
