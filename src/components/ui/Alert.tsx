import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onClose,
  icon,
  className = '',
  ...props
}) => {
  const variantConfig = {
    info: {
      classes: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800 text-slate-800 dark:text-sky-200',
      iconColor: 'text-sky-600 dark:text-sky-400',
      defaultIcon: <Info className="w-5 h-5 shrink-0" />,
    },
    success: {
      classes: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-emerald-200',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      defaultIcon: <CheckCircle2 className="w-5 h-5 shrink-0" />,
    },
    warning: {
      classes: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-slate-800 dark:text-amber-200',
      iconColor: 'text-amber-600 dark:text-amber-400',
      defaultIcon: <AlertTriangle className="w-5 h-5 shrink-0" />,
    },
    destructive: {
      classes: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-rose-200',
      iconColor: 'text-rose-600 dark:text-rose-400',
      defaultIcon: <AlertCircle className="w-5 h-5 shrink-0" />,
    },
  }[variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        relative flex items-start gap-3 p-4 rounded-2xl border
        ${variantConfig.classes}
        ${className}
      `.trim()}
      {...props}
    >
      <div className={`mt-0.5 shrink-0 ${variantConfig.iconColor}`}>
        {icon || variantConfig.defaultIcon}
      </div>

      <div className="flex-1 space-y-1 text-sm">
        {title && (
          <h5 className="font-bold leading-none tracking-tight">
            {title}
          </h5>
        )}
        <div className="text-xs sm:text-sm leading-relaxed opacity-90">
          {children}
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
