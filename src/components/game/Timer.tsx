import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-2 bg-slate-800/80 rounded-full px-5 py-2">
      <Clock className="w-5 h-5 text-slate-400" />
      <span className="text-white font-mono font-bold text-lg">{formattedTime}</span>
    </div>
  );
};
