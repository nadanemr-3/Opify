import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const fillVariantClasses = {
    default: 'bg-gradient-to-r from-brand-blue to-brand-emerald',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
  }[variant];

  return (
    <div className={`w-full space-y-1.5 ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
          {label && <span>{label}</span>}
          {showValue && <span className="font-bold">{percentage}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        className={`w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ${sizeClasses}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillVariantClasses}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
