import React from 'react';

export interface OpifyLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'full' | 'icon' | 'text';
  theme?: 'light' | 'dark' | 'auto';
  inverted?: boolean;
  title?: string;
}

const sizeClasses: Record<string, string> = {
  xs: 'h-6',
  sm: 'h-8',
  md: 'h-9 sm:h-10',
  lg: 'h-11 sm:h-12',
  xl: 'h-14 sm:h-16',
};

/**
 * Opify Official Brand Logo Component
 * 
 * Simple wrapper around the static external SVG asset: /assets/opify-logo.svg
 * The SVG file itself is the single source of truth.
 */
export const OpifyLogo: React.FC<OpifyLogoProps> = ({
  className = '',
  size = 'md',
  title = 'Opify',
}) => {
  const heightStyle = typeof size === 'number' ? { height: `${size}px` } : undefined;
  const sizeClass = typeof size === 'string' ? sizeClasses[size] || 'h-9 sm:h-10' : '';

  return (
    <img
      src="/assets/opify-logo.svg"
      alt={title}
      style={heightStyle}
      className={`w-auto shrink-0 select-none object-contain ${sizeClass} ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

export const OpifyIcon = OpifyLogo;

export default OpifyLogo;
