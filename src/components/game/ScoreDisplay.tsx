interface ScoreDisplayProps {
  playerScore: number;
  aiScore: number;
}

export const ScoreDisplay = ({ playerScore, aiScore }: ScoreDisplayProps) => {
  return (
    <div className="flex items-center gap-4 bg-slate-800/80 rounded-xl px-6 py-3">
      <div className="text-center">
        <div className="text-slate-400 text-xs uppercase tracking-wider">You</div>
        <div className="text-cyan-400 font-bold text-2xl">{playerScore}</div>
      </div>
      <div className="text-slate-500 font-bold">VS</div>
      <div className="text-center">
        <div className="text-slate-400 text-xs uppercase tracking-wider">AI</div>
        <div className="text-cyan-400 font-bold text-2xl">{aiScore}</div>
      </div>
    </div>
  );
};
