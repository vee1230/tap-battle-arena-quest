import { Trophy } from 'lucide-react';
import { DifficultyButton, Difficulty } from '@/components/game/DifficultyButton';

interface HomeScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

export const HomeScreen = ({ onStartGame }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-xl mb-4">
            <Trophy className="w-10 h-10 text-slate-900" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            TAP BATTLE
          </h1>
          <div className="text-cyan-400 font-bold text-xl tracking-widest">
            ARENA
          </div>
          <p className="text-slate-400 mt-2">Fast. Furious. Fun.</p>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-4">
          <h2 className="text-center text-slate-400 font-medium">Select Difficulty</h2>
          
          <DifficultyButton difficulty="easy" onClick={() => onStartGame('easy')} />
          <DifficultyButton difficulty="normal" onClick={() => onStartGame('normal')} />
          <DifficultyButton difficulty="hard" onClick={() => onStartGame('hard')} />
        </div>

        {/* Instructions */}
        <div className="mt-10 text-center">
          <p className="text-slate-400">Tap as fast as you can!</p>
          <p className="text-slate-500 text-sm">60 seconds • Most taps wins</p>
        </div>
      </div>
    </div>
  );
};
