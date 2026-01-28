import { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '@/components/game/DifficultyButton';
import { TapButton } from '@/components/game/TapButton';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { Timer } from '@/components/game/Timer';
import { DifficultyBadge } from '@/components/game/DifficultyBadge';
import { Countdown } from '@/components/game/Countdown';

interface GameScreenProps {
  difficulty: Difficulty;
  onGameEnd: (playerScore: number, aiScore: number) => void;
}

const GAME_DURATION = 60;

// AI tap intervals in milliseconds
const aiConfig = {
  easy: { min: 1000, max: 2000 },
  normal: { min: 500, max: 1000 },
  hard: { min: 300, max: 600 },
};

export const GameScreen = ({ difficulty, onGameEnd }: GameScreenProps) => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    setGameStarted(true);
  }, []);

  const handleTap = () => {
    if (gameStarted && timeLeft > 0) {
      setPlayerScore(prev => prev + 1);
    }
  };

  // Game timer
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  // AI tapping
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const config = aiConfig[difficulty];
    
    const scheduleNextTap = () => {
      const delay = Math.random() * (config.max - config.min) + config.min;
      return setTimeout(() => {
        if (timeLeft > 0) {
          setAiScore(prev => prev + 1);
        }
      }, delay);
    };

    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setAiScore(prev => prev + 1);
      }
    }, (config.min + config.max) / 2);

    return () => clearInterval(interval);
  }, [gameStarted, difficulty, timeLeft]);

  // Game end
  useEffect(() => {
    if (gameStarted && timeLeft === 0) {
      const timer = setTimeout(() => {
        onGameEnd(playerScore, aiScore);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameStarted, playerScore, aiScore, onGameEnd]);

  if (showCountdown) {
    return <Countdown onComplete={handleCountdownComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      <div className="max-w-md w-full flex flex-col items-center h-full">
        {/* Timer */}
        <div className="mt-4">
          <Timer timeLeft={timeLeft} />
        </div>

        {/* Score Display */}
        <div className="mt-6">
          <ScoreDisplay playerScore={playerScore} aiScore={aiScore} />
        </div>

        {/* Tap Button */}
        <div className="flex-1 flex items-center justify-center my-8">
          <TapButton onTap={handleTap} disabled={timeLeft === 0} />
        </div>

        {/* Difficulty Badge */}
        <div className="mb-8">
          <DifficultyBadge difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
};
