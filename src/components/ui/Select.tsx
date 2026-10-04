import React, { forwardRef, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  options,
  children,
  id,
  disabled,
  required,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = id || `select-${generatedId}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const ariaDescribedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`w-full space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 select-none"
        >
          {label}
          {required && <span className="text-rose-500 ms-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={ariaDescribedBy}
          className={`
            w-full appearance-none rounded-xl text-sm transition-colors duration-150
            bg-slate-50 dark:bg-slate-900 
            text-slate-900 dark:text-white 
            border ${error 
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' 
              : 'border-slate-200 dark:border-slate-700 focus:border-brand-blue focus:ring-brand-blue/20'
            }
            focus:outline-hidden focus:ring-2
            ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}
            ltr:pl-3.5 ltr:pr-10 rtl:pr-3.5 rtl:pl-10 py-2.5
            cursor-pointer
            ${className}
          `.trim()}
          {...props}
        >
          {options ? options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          )) : children}
        </select>

        <div className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
          <ChevronDown className="w-4 h-4" />
        </div>
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

Select.displayName = 'Select';
export default Select;
