import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TapButtonProps {
  onTap: () => void;
  disabled?: boolean;
}

export const TapButton = ({ onTap, disabled }: TapButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTap = () => {
    if (disabled) return;
    setIsPressed(true);
    onTap();
    
    // Haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <button
      onClick={handleTap}
      disabled={disabled}
      className={cn(
        'w-48 h-48 rounded-full border-4 border-cyan-400 flex flex-col items-center justify-center',
        'transition-all duration-100 select-none',
        'bg-slate-800/50 backdrop-blur',
        isPressed && 'scale-95 bg-cyan-400/20 border-cyan-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <svg
        className="w-16 h-16 text-cyan-400 mb-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" />
        <path d="M12 11.5V14.5M12 14.5C12 15.5 11.5 16.5 10.5 17L9 18M12 14.5C12 15.5 12.5 16.5 13.5 17L15 18" />
        <rect x="4" y="2" width="16" height="20" rx="4" />
      </svg>
      <span className="text-cyan-400 font-bold text-xl">TAP!</span>
    </button>
  );
};
