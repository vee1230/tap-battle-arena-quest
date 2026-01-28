import { cn } from '@/lib/utils';

export type Difficulty = 'easy' | 'normal' | 'hard';

interface DifficultyButtonProps {
  difficulty: Difficulty;
  onClick: () => void;
}

const difficultyConfig = {
  easy: {
    label: 'EASY',
    description: 'Relaxed AI • Good for practice',
    bgColor: 'bg-emerald-500 hover:bg-emerald-600',
    icon: '😊',
  },
  normal: {
    label: 'NORMAL',
    description: 'Balanced AI • Fair challenge',
    bgColor: 'bg-orange-500 hover:bg-orange-600',
    icon: '😤',
  },
  hard: {
    label: 'HARD',
    description: 'Fast AI • Ultimate test',
    bgColor: 'bg-red-500 hover:bg-red-600',
    icon: '😈',
  },
};

export const DifficultyButton = ({ difficulty, onClick }: DifficultyButtonProps) => {
  const config = difficultyConfig[difficulty];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full py-4 px-5 rounded-xl text-left transition-all duration-200 transform active:scale-95',
        config.bgColor
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <div className="font-bold text-white text-lg">{config.label}</div>
          <div className="text-white/80 text-sm">{config.description}</div>
        </div>
      </div>
    </button>
  );
};
