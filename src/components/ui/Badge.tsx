import React from 'react';
import { X } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  icon?: React.ReactNode;
  interactive?: boolean;
  onDismiss?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  dot = false,
  icon,
  interactive = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const isClickable = interactive || Boolean(props.onClick);
  const baseClasses = `inline-flex items-center font-bold tracking-tight rounded-full border transition-colors select-none ${
    isClickable ? 'cursor-pointer hover:opacity-85 active:scale-95 transition-transform' : ''
  }`;

  const variantClasses = {
    brand: 'bg-brand-blue-light dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 border-brand-blue-border dark:border-brand-blue/30',
    accent: 'bg-brand-emerald-light dark:bg-brand-emerald/20 text-brand-emerald dark:text-emerald-300 border-brand-emerald-border dark:border-brand-emerald/30',
    success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    error: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    info: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  }[variant];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  }[size];

  const dotColorClasses = {
    brand: 'bg-brand-blue dark:bg-blue-400',
    accent: 'bg-brand-emerald dark:bg-emerald-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400',
    outline: 'bg-slate-500',
  }[variant];

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColorClasses}`} aria-hidden="true" />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="ltr:ml-0.5 rtl:mr-0.5 hover:opacity-75 focus:outline-hidden cursor-pointer"
          aria-label="Remove badge"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default Badge;
