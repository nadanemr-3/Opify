import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'emerald' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  icon,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const leadingIcon = startIcon || icon;
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 select-none';

  const variantClasses = {
    primary: 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-sm shadow-brand-blue/20 active:scale-[0.98] focus-visible:ring-brand-blue dark:focus-visible:ring-offset-slate-900',
    emerald: 'bg-brand-emerald hover:bg-brand-emerald-hover text-white shadow-sm shadow-brand-emerald/20 active:scale-[0.98] focus-visible:ring-brand-emerald dark:focus-visible:ring-offset-slate-900',
    secondary: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 active:scale-[0.98] focus-visible:ring-slate-400',
    outline: 'bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-2xs focus-visible:ring-brand-blue',
    ghost: 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400',
    destructive: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 active:scale-[0.98] focus-visible:ring-rose-500',
  }[variant];

  const sizeClasses = {
    xs: 'px-2.5 py-1 text-xs rounded-lg gap-1.5',
    sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-5 py-3 text-base font-bold rounded-xl gap-2.5',
    icon: 'p-2.5 rounded-xl aspect-square',
  }[size];

  const stateClasses = (disabled || loading)
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${widthClass} ${className}`.trim()}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0 rtl:-scale-x-100" />
      ) : (
        leadingIcon && <span className="shrink-0">{leadingIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
