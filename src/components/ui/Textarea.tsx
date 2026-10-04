import React, { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  showCount = false,
  maxLength,
  value,
  defaultValue,
  id,
  disabled,
  required,
  rows = 4,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || `textarea-${generatedId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const ariaDescribedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ].filter(Boolean).join(' ') || undefined;

  const currentLength = typeof value === 'string' 
    ? value.length 
    : typeof defaultValue === 'string' 
      ? defaultValue.length 
      : 0;

  return (
    <div className={`w-full space-y-1.5 ${containerClassName}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 select-none"
          >
            {label}
            {required && <span className="text-rose-500 ms-1" aria-hidden="true">*</span>}
          </label>
        )}

        {showCount && maxLength && (
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
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
            p-3.5
            ${className}
          `.trim()}
          {...props}
        />
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
