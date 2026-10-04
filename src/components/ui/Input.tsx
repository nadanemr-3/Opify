import React, { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  id,
  disabled,
  required,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const ariaDescribedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`w-full space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 select-none"
        >
          {label}
          {required && <span className="text-rose-500 ms-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {startIcon && (
          <div className="absolute ltr:left-3 rtl:right-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={ariaDescribedBy}
          className={`
            w-full rounded-xl text-sm transition-colors duration-150
            bg-slate-50 dark:bg-slate-900 
            text-slate-900 dark:text-white 
            placeholder-slate-400 dark:placeholder-slate-500
            border ${error 
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' 
              : 'border-slate-200 dark:border-slate-700 focus:border-brand-blue focus:ring-brand-blue/20'
            }
            focus:outline-hidden focus:ring-2
            ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}
            ${startIcon ? 'ltr:pl-9 rtl:pr-9' : 'ltr:pl-3.5 rtl:pr-3.5'}
            ${endIcon || error ? 'ltr:pr-9 rtl:pl-9' : 'ltr:pr-3.5 rtl:pl-3.5'}
            py-2.5
            ${className}
          `.trim()}
          {...props}
        />

        {error ? (
          <div className="absolute ltr:right-3 rtl:left-3 flex items-center pointer-events-none text-rose-500">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
          </div>
        ) : endIcon ? (
          <div className="absolute ltr:right-3 rtl:left-3 flex items-center text-slate-400 dark:text-slate-500">
            {endIcon}
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
