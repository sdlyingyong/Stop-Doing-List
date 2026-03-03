import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  label, 
  showPercentage = true 
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-stone-400">{label}</span>
        {showPercentage && (
          <span className="text-sm text-stone-400">
            {current}/{total} ({percentage}%)
          </span>
        )}
      </div>
      <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
        <div 
          className={cn(
            "h-full bg-amber-500 transition-all duration-300 ease-out",
            percentage === 100 && "bg-green-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;