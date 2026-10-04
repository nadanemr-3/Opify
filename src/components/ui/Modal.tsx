import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  className?: string;
  preventBackdropClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
  preventBackdropClick = false,
}) => {
  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;
  const descId = `modal-desc-${generatedId}`;
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management and ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md sm:max-w-lg',
    lg: 'max-w-xl sm:max-w-2xl',
    xl: 'max-w-3xl sm:max-w-4xl',
    full: 'max-w-5xl sm:max-w-6xl',
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          if (!preventBackdropClick) onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative w-full ${sizeClasses} rounded-3xl
          bg-white dark:bg-slate-900 
          border border-slate-200 dark:border-slate-800 
          shadow-2xl overflow-hidden
          transition-all animate-in zoom-in-95 duration-200
          outline-hidden
          ${className}
        `.trim()}
      >
        {/* Header with Title and Close Button */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-5 sm:p-6 pb-2 sm:pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="space-y-1 pe-6">
              {title && (
                <h2 id={titleId} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 -me-1.5 -mt-1 rounded-xl text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[calc(85vh-8rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
