import React from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline' | 'boxed';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  variant = 'pill',
  size = 'md',
  fullWidth = false,
  className = '',
  'aria-label': ariaLabel = 'Navigation Tabs',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    }

    if (nextIndex !== index && !items[nextIndex].disabled) {
      onChange(items[nextIndex].id);
    }
  };

  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 ${className}`}
      >
        {items.map((tab, idx) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`
                relative flex items-center gap-2 font-semibold transition-colors duration-150 cursor-pointer
                ${size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'}
                ${isActive 
                  ? 'text-brand-blue dark:text-blue-400 font-bold border-b-2 border-brand-blue dark:border-blue-400 -mb-px' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span className="ms-1">{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  // Pill / Boxed segmented control
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`
        inline-flex items-center gap-1 p-1 rounded-2xl
        ${variant === 'boxed' 
          ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800' 
          : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50'
        }
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {items.map((tab, idx) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`
              flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer
              ${fullWidth ? 'flex-1' : ''}
              ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'}
              ${isActive 
                ? 'bg-white dark:bg-slate-900 text-brand-blue dark:text-blue-400 font-bold shadow-2xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {tab.icon && <span className="shrink-0 me-1.5">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && <span className="ms-1.5">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
