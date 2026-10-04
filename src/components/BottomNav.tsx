import React from 'react';
import { 
  Home,
  Briefcase, 
  Kanban, 
  Sparkles, 
  UserCircle 
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../i18n/translations';

interface BottomNavProps {
  language: Language;
  activeTab: string;
  onTabChange: (tabId: string, params?: any) => void;
  applicationCount: number;
  currentViewMode?: 'list' | 'map';
  currentUser?: UserProfile | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  language,
  activeTab,
  onTabChange,
  applicationCount,
  currentViewMode = 'list',
  currentUser,
}) => {
  const t = translations[language];

  const isToolsActive = [
    'tools',
    'salary-calc',
    'cover-letter',
    'mock-interview',
    'resume-booster',
    'decoder',
    'ats-editor',
    'comparison',
    'learning-plan',
    'community',
    'assistant',
    'cv-optimizer'
  ].includes(activeTab);

  interface BottomNavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    action: () => void;
    isActive: boolean;
    badge?: number | string;
    customAvatar?: string;
  }

  const navItems: BottomNavItem[] = [
    {
      id: 'home',
      label: t.navHome, // "Home" / "الرئيسية"
      icon: Home,
      action: () => onTabChange('home'),
      isActive: activeTab === 'home',
    },
    {
      id: 'jobs',
      label: t.navFindJobs, // "Jobs" / "الوظائف"
      icon: Briefcase,
      action: () => onTabChange('jobs', { viewMode: 'list' }),
      isActive: activeTab === 'jobs',
    },
    {
      id: 'tools',
      label: t.navMoreTools, // "Tools" / "الأدوات"
      icon: Sparkles,
      action: () => onTabChange('tools'),
      isActive: isToolsActive,
    },
    {
      id: 'tracker',
      label: t.navApplications, // "Tracker" / "المتابعة"
      icon: Kanban,
      action: () => onTabChange('tracker'),
      isActive: activeTab === 'tracker',
      badge: applicationCount > 0 ? applicationCount : undefined,
    },
    {
      id: 'profile',
      label: language === 'ar' ? 'الملف' : 'Profile',
      icon: UserCircle,
      action: () => onTabChange(currentUser ? 'profile' : 'dashboard'),
      isActive: activeTab === 'profile' || activeTab === 'dashboard',
      customAvatar: currentUser?.avatar || '/profile-icon.jpg',
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg safe-area-pb transition-colors"
    >
      <div className="grid grid-cols-5 items-center justify-around gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <button
              key={item.id}
              id={`mobile-bottom-nav-${item.id}`}
              onClick={item.action}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition cursor-pointer ${
                active
                  ? 'text-brand-blue dark:text-blue-400 font-bold bg-brand-blue-light/80 dark:bg-brand-blue/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="relative">
                {item.customAvatar ? (
                  <img
                    src={item.customAvatar}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                    }}
                    className={`w-5 h-5 rounded-full object-cover ring-1 ring-brand-blue transition-transform ${
                      active ? 'scale-110 ring-2 ring-brand-blue' : ''
                    }`}
                  />
                ) : (
                  <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
                )}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-brand-blue text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap truncate max-w-[58px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
