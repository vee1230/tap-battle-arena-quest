import { useEffect, useState } from 'react';

interface CountdownProps {
  onComplete: () => void;
}

export const Countdown = ({ onComplete }: CountdownProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50">
      <div className="text-center">
        <div 
          key={count}
          className="text-8xl font-bold text-cyan-400 animate-pulse"
        >
          {count === 0 ? 'GO!' : count}
        </div>
      </div>
    </div>
  );
};
