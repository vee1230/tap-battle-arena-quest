import { Trophy, Home, RotateCcw } from 'lucide-react';
import { Difficulty } from '@/components/game/DifficultyButton';
import { GameStats } from '@/hooks/useGameStats';
import { cn } from '@/lib/utils';

interface ResultScreenProps {
  playerScore: number;
  aiScore: number;
  difficulty: Difficulty;
  stats: GameStats;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const ResultScreen = ({
  playerScore,
  aiScore,
  difficulty,
  stats,
  onPlayAgain,
  onHome,
}: ResultScreenProps) => {
  const isVictory = playerScore > aiScore;
  const isDraw = playerScore === aiScore;

  const resultText = isDraw ? 'DRAW!' : isVictory ? 'VICTORY!' : 'DEFEAT!';
  const resultColor = isDraw ? 'text-yellow-400' : isVictory ? 'text-yellow-400' : 'text-red-400';

  const difficultyColors = {
    easy: 'bg-emerald-500',
    normal: 'bg-orange-500',
    hard: 'bg-red-500',
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Result Icon */}
        <div className="text-center mb-6">
          {(isVictory || isDraw) && (
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          )}
          <h1 className={cn('text-4xl font-black', resultColor)}>{resultText}</h1>
        </div>

        {/* Scores */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-slate-800 rounded-xl px-6 py-4 text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Your Score</div>
            <div className="text-cyan-400 font-bold text-3xl">{playerScore}</div>
          </div>
          <div className="text-slate-500 font-bold">VS</div>
          <div className="bg-slate-800 rounded-xl px-6 py-4 text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">AI Score</div>
            <div className="text-cyan-400 font-bold text-3xl">{aiScore}</div>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex justify-center mb-6">
          <span className={cn('px-4 py-1 rounded-full text-white font-bold text-sm uppercase', difficultyColors[difficulty])}>
            {difficulty} MODE
          </span>
        </div>

        {/* Stats */}
        <div className="bg-slate-800 rounded-xl p-4 mb-8">
          <h2 className="text-center text-slate-400 font-medium mb-4 uppercase text-sm tracking-wider">Your Stats</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-white font-bold text-xl">{stats.wins}</div>
              <div className="text-slate-500 text-xs">Wins</div>
            </div>
            <div>
              <div className="text-white font-bold text-xl">{stats.losses}</div>
              <div className="text-slate-500 text-xs">Losses</div>
            </div>
            <div>
              <div className="text-white font-bold text-xl">{stats.draws}</div>
              <div className="text-slate-500 text-xs">Draws</div>
            </div>
            <div>
              <div className="text-cyan-400 font-bold text-xl">{stats.bestScore}</div>
              <div className="text-slate-500 text-xs">Best</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            PLAY AGAIN
          </button>
          <button
            onClick={onHome}
            className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            HOME
          </button>
        </div>
      </div>
    </div>
  );
};
