import { cn } from '@/lib/utils';
import { Difficulty } from './DifficultyButton';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const badgeStyles = {
  easy: 'bg-emerald-500',
  normal: 'bg-orange-500',
  hard: 'bg-red-500',
};

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  return (
    <span
      className={cn(
        'px-4 py-1 rounded-full text-white font-bold text-sm uppercase',
        badgeStyles[difficulty]
      )}
    >
      {difficulty}
    </span>
  );
};
