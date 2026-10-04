import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toast: (options: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(({ duration = 4000, ...options }: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, duration, ...options };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
  }, [dismiss]);

  const typeConfig: Record<ToastType, { icon: React.ReactNode; border: string; bg: string }> = {
    info: {
      icon: <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />,
      border: 'border-sky-500/30',
      bg: 'bg-white dark:bg-slate-900',
    },
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      border: 'border-emerald-500/30',
      bg: 'bg-white dark:bg-slate-900',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
      border: 'border-amber-500/30',
      bg: 'bg-white dark:bg-slate-900',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
      border: 'border-rose-500/30',
      bg: 'bg-white dark:bg-slate-900',
    },
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}

      {/* Floating toast notification viewport */}
      <div
        className="fixed bottom-20 md:bottom-6 ltr:right-4 rtl:left-4 z-50 flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] pointer-events-none"
        aria-live="polite"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => {
          const cfg = typeConfig[t.type];
          return (
            <div
              key={t.id}
              role="status"
              className={`
                pointer-events-auto flex items-start gap-3 p-4 rounded-2xl
                ${cfg.bg} border ${cfg.border}
                shadow-xl shadow-slate-900/10 dark:shadow-black/40
                animate-in slide-in-from-bottom-5 fade-in duration-200
                transition-all
              `}
            >
              <div className="mt-0.5">{cfg.icon}</div>
              <div className="flex-1 space-y-0.5 text-xs sm:text-sm">
                {t.title && (
                  <p className="font-bold text-slate-900 dark:text-white leading-tight">
                    {t.title}
                  </p>
                )}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.message}
                </p>
                {t.action && (
                  <button
                    type="button"
                    onClick={() => {
                      t.action?.onClick();
                      dismiss(t.id);
                    }}
                    className="mt-1 text-xs font-bold text-brand-blue dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="p-1 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
