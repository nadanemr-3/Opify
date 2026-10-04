import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'flat' | 'interactive' | 'selected';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'rounded-2xl transition-all duration-150';

  const variantClasses = {
    default: 'bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-2xs',
    bordered: 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700',
    flat: 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800',
    interactive: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs cursor-pointer',
    selected: 'bg-white dark:bg-slate-800 border-2 border-brand-blue ring-2 ring-brand-blue/20 shadow-xs',
  }[variant];

  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-8',
  }[padding];

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${paddingClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className = '',
  children,
  ...props
}, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 pb-4 ${className}`} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  className = '',
  children,
  ...props
}, ref) => (
  <h3 ref={ref} className={`text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug ${className}`} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  className = '',
  children,
  ...props
}, ref) => (
  <p ref={ref} className={`text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className = '',
  children,
  ...props
}, ref) => (
  <div ref={ref} className={`text-sm text-slate-700 dark:text-slate-300 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className = '',
  children,
  ...props
}, ref) => (
  <div ref={ref} className={`flex items-center pt-4 border-t border-slate-100 dark:border-slate-700/60 ${className}`} {...props}>
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

export default Card;
