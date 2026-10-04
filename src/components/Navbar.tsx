import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Sun, 
  Moon, 
  Languages, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Layers,
  CheckCircle2,
  LogOut,
  LayoutDashboard,
  Banknote,
  Send,
  Users,
  User,
  Compass,
  ArrowRight,
  Bot,
  FileText,
  Kanban
} from 'lucide-react';
import { Language, ThemeMode, UserProfile } from '../types';
import { translations } from '../i18n/translations';
import { OpifyLogo } from './OpifyLogo';
import { getActiveSloganOption } from '../data/slogans';
import { Button } from './ui';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  applicationCount: number;
}

interface ToolDropdownItem {
  id: string;
  targetId?: string;
  label: string;
  desc: string;
  icon: React.ElementType;
}

interface ToolGroup {
  key: 'analyze' | 'apply' | 'track';
  title: string;
  items: ToolDropdownItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuthModal,
  onLogout,
  applicationCount,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const activeSlogan = getActiveSloganOption();
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(target)) {
        setToolsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: ESC closes any open overlay/dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setToolsDropdownOpen(false);
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sloganTitle = isAr ? activeSlogan.ar : activeSlogan.en;

  // AI Tools Information Architecture: ANALYZE | APPLY | TRACK
  const toolGroups: ToolGroup[] = [
    {
      key: 'analyze',
      title: isAr ? 'التحليل' : 'ANALYZE',
      items: [
        {
          id: 'decoder',
          label: isAr ? 'محلل الوصف الوظيفي' : 'Job Description Analyzer',
          desc: isAr ? 'استخراج المتطلبات ونسب المطابقة وفحص العقود' : 'Decode requirements, skills & red flags',
          icon: Sparkles,
        },
        {
          id: 'salary-calc',
          label: isAr ? 'حاسبة الرواتب والبدلات' : 'Salary Estimator',
          desc: isAr ? 'احتساب صافي الدخل ومصاريف الانتقال' : 'Calculate net pay & commute deductions',
          icon: Banknote,
        },
        {
          id: 'scam-detector',
          targetId: 'decoder',
          label: isAr ? 'كاشف الوظائف الوهمية' : 'Scam Detector',
          desc: isAr ? 'رصد العروض الاحتيالية ورسوم المقابلات' : 'Spot fake postings & upfront fee traps',
          icon: ShieldAlert,
        },
        {
          id: 'comparison',
          label: isAr ? 'مقارنة عروض العمل' : 'Job Comparison',
          desc: isAr ? 'مقارنة دقيقة بين العروض جنباً إلى جنب' : 'Compare multiple offers side by side',
          icon: Layers,
        },
      ],
    },
    {
      key: 'apply',
      title: isAr ? 'التقديم' : 'APPLY',
      items: [
        {
          id: 'assistant',
          label: isAr ? 'المساعد المهني الذكي' : 'AI Career Assistant',
          desc: isAr ? 'مدربك الذكي للمقابلات وكتابة الرسائل' : '24/7 AI career coach & interview guide',
          icon: Bot,
        },
        {
          id: 'cv-optimizer',
          label: isAr ? 'مطابقة السيرة الذاتية' : 'Resume Matcher',
          desc: isAr ? 'قياس نسبة التوافق مع متطلبات الوظيفة' : 'Score resume fit against target jobs',
          icon: CheckCircle2,
        },
        {
          id: 'ats-editor',
          label: isAr ? 'محرر السيرة المتوافق مع ATS' : 'ATS Resume Editor',
          desc: isAr ? 'تنسيق وصياغة لاجتياز فحص أنظمة التوظيف' : 'Format and phrase for recruiter screening',
          icon: FileText,
        },
        {
          id: 'cover-letter',
          label: isAr ? 'صانع الخطابات والرسائل' : 'Cover Letter Generator',
          desc: isAr ? 'خطابات تقديم مخصصة وصادقة بدون مبالغة' : 'Generate honest, targeted intro letters',
          icon: Send,
        },
        {
          id: 'learning-plan',
          label: isAr ? 'خطة التعلم وسد المهارات' : 'Skill Gap & Learning Plan',
          desc: isAr ? 'خارطة طريق تعليمية لسد الفجوات' : 'Actionable roadmaps to fill skill gaps',
          icon: Compass,
        },
      ],
    },
    {
      key: 'track',
      title: isAr ? 'المتابعة' : 'TRACK',
      items: [
        {
          id: 'tracker',
          label: isAr ? 'متابعة طلبات التوظيف' : 'Application Tracker',
          desc: isAr ? 'لوحة كانبان تفاعلية لجميع مراحل التقديم' : 'Kanban board for every active job search',
          icon: Kanban,
        },
        {
          id: 'community',
          label: isAr ? 'تجارب وأسئلة المقابلات' : 'Interview Insights',
          desc: isAr ? 'أسئلة واقعية وتقييمات من سوق العمل' : 'Real interview questions from Egyptian firms',
          icon: Users,
        },
      ],
    },
  ];

  const allToolTabIds = [
    'tools',
    'decoder',
    'salary-calc',
    'scam-detector',
    'comparison',
    'assistant',
    'cv-optimizer',
    'ats-editor',
    'cover-letter',
    'learning-plan',
    'tracker',
    'community',
    'mock-interview',
    'resume-booster'
  ];

  const isToolsActive = allToolTabIds.includes(activeTab);

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setProfileDropdownOpen(false);
  };

  // Nav item list for clean, precise mapping
  const primaryNavItems = [
    { id: 'home', label: isAr ? 'الرئيسية' : 'Home' },
    { id: 'jobs', label: isAr ? 'الوظائف' : 'Jobs' },
    { id: 'tools', label: isAr ? 'أدوات الذكاء الاصطناعي' : 'AI Tools', isDropdown: true },
    { id: 'pricing', label: isAr ? 'الباقات' : 'Pricing' },
    { id: 'employers', label: isAr ? 'للشركات' : 'Employers' },
  ];

  return (
    <header 
      id="opify-main-navbar"
      className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-4">
          
          {/* ========================================================= */}
          {/* BRAND AREA (Logo + Opify Identity Anchor)                */}
          {/* ========================================================= */}
          <div className="flex items-center gap-6 xl:gap-8 shrink-0">
            <button 
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg inline-flex items-center transition-transform active:scale-[0.98]"
              title={`Opify - ${sloganTitle}`}
              aria-label="Opify Home"
            >
              <OpifyLogo size="md" />
            </button>

            {/* Vertical Sub-divider separating brand anchor from primary navigation */}
            <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

            {/* ======================================================= */}
            {/* PRIMARY NAVIGATION DOCK (Desktop)                       */}
            {/* High architectural clarity: Architectural underline,   */}
            {/* high-contrast typographic weight, no childish pills.    */}
            {/* ======================================================= */}
            <nav 
              id="desktop-main-navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-2" 
              aria-label="Primary Navigation"
            >
              {primaryNavItems.map((item) => {
                if (item.isDropdown) {
                  return (
                    <div key={item.id} className="relative" ref={toolsDropdownRef}>
                      <button
                        id="nav-link-tools"
                        type="button"
                        onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setToolsDropdownOpen(true);
                          }
                        }}
                        className={`group relative h-10 px-3.5 inline-flex items-center gap-1.5 rounded-md text-[13px] tracking-tight font-medium transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          isToolsActive || toolsDropdownOpen
                            ? 'text-slate-950 dark:text-white font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                        }`}
                        aria-expanded={toolsDropdownOpen}
                        aria-haspopup="true"
                        aria-controls="nav-tools-mega-menu"
                      >
                        <span>{item.label}</span>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 ${
                            toolsDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                          }`} 
                          aria-hidden="true"
                        />

                        {/* Architectural bottom indicator */}
                        {(isToolsActive || toolsDropdownOpen) && (
                          <span 
                            className="absolute bottom-0 inset-x-2.5 h-[2.5px] bg-blue-600 dark:bg-blue-500 rounded-full"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      {/* Dropdown Menu (3-Column Architecture Preserved) */}
                      {toolsDropdownOpen && (
                        <div 
                          id="nav-tools-mega-menu"
                          role="region"
                          aria-label={isAr ? 'قائمة أدوات الذكاء الاصطناعي' : 'AI Career Tools Menu'}
                          className="absolute top-full mt-2.5 ltr:left-0 rtl:right-0 w-[800px] max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/12 dark:shadow-black/60 border border-slate-200 dark:border-slate-800 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        >
                          <div className="grid grid-cols-3 gap-5 divide-x ltr:divide-x rtl:divide-x-reverse divide-slate-100 dark:divide-slate-800/80">
                            {toolGroups.map((group, groupIdx) => (
                              <div key={group.key} className={groupIdx > 0 ? 'ltr:pl-5 rtl:pr-5' : ''}>
                                {/* Category Header with Intelligent Accent */}
                                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-2 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500" />
                                  <span>{group.title}</span>
                                </div>

                                {/* Tools List */}
                                <div className="space-y-1">
                                  {group.items.map((subItem) => {
                                    const SubIcon = subItem.icon;
                                    const targetTab = subItem.targetId || subItem.id;
                                    const isItemActive = activeTab === targetTab;

                                    return (
                                      <button
                                        key={subItem.id}
                                        id={`nav-tool-${subItem.id}`}
                                        type="button"
                                        onClick={() => handleNavClick(targetTab)}
                                        className={`w-full text-left ltr:text-left rtl:text-right p-2.5 rounded-xl transition-all duration-150 flex items-start gap-3 cursor-pointer group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                                          isItemActive
                                            ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                                        }`}
                                      >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                          isItemActive
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                        }`}>
                                          <SubIcon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                          <div className="text-xs font-semibold leading-tight truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {subItem.label}
                                          </div>
                                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5 line-clamp-1">
                                            {subItem.desc}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer Action Hub */}
                          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {isAr ? 'حزمة الأدوات الذكية المخصصة للوظائف في مصر والشرق الأوسط' : 'AI-assisted career acceleration suite tailored for MENA talent'}
                            </span>
                            <button
                              id="nav-tool-all-hub-btn"
                              type="button"
                              onClick={() => handleNavClick('tools')}
                              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1.5 cursor-pointer transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                            >
                              <span>{isAr ? 'استكشف جميع الأدوات' : 'Explore All Tools'}</span>
                              <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`relative h-10 px-3.5 inline-flex items-center rounded-md text-[13px] tracking-tight font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isActive
                        ? 'text-slate-950 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Architectural bottom indicator */}
                    {isActive && (
                      <span 
                        className="absolute bottom-0 inset-x-2.5 h-[2.5px] bg-blue-600 dark:bg-blue-500 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ========================================================= */}
          {/* UTILITY & ACCOUNT CONTROL ZONE (Right Side)               */}
          {/* Explicitly unified into a distinct, premium control group */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Grouped Utilities Capsule (Admin + Language + Theme) */}
            <div 
              id="navbar-utilities-group"
              className="flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs"
            >
              {/* 1. Admin Shield Button (Privileged control) */}
              <button
                id="navbar-admin-shortcut-btn"
                type="button"
                onClick={() => handleNavClick('admin')}
                className={`relative p-1.5 rounded-lg transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  activeTab === 'admin'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-700'
                }`}
                title={isAr ? 'لوحة تحكم المشرف' : 'Admin Control Center'}
                aria-label={isAr ? 'لوحة تحكم المشرف' : 'Admin Control Center'}
              >
                <ShieldAlert className="w-4 h-4" />
                {/* Visual Privilege Dot */}
                <span className="absolute top-1 ltr:right-1 rtl:left-1 w-1.5 h-1.5 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-800" />
              </button>

              <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" aria-hidden="true" />

              {/* 2. Language Switcher (AR/EN Segment) */}
              <button
                id="language-switch-btn"
                type="button"
                onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
                title={isAr ? 'Switch to English' : 'التحويل للعربية'}
                aria-label={isAr ? 'Switch to English' : 'التحويل للعربية'}
              >
                <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="tracking-tight uppercase font-bold">{isAr ? 'EN' : 'AR'}</span>
              </button>

              <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" aria-hidden="true" />

              {/* 3. Theme Mode Switcher */}
              <button
                id="theme-toggle-btn"
                type="button"
                onClick={onToggleTheme}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
                title={theme === 'dark' ? t.lightMode : t.darkMode}
                aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>
            </div>

            {/* User Profile Card / Authentication Action */}
            {currentUser ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  id="user-profile-menu-btn"
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="menu"
                  aria-controls="nav-user-profile-menu"
                  className={`group flex items-center gap-2.5 p-1.5 sm:pe-3 rounded-xl border transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    profileDropdownOpen 
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 shadow-2xs' 
                      : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                  }`}
                  title={isAr ? 'الملف الشخصي والحساب' : 'User Profile & Account'}
                >
                  <div className="relative shrink-0">
                    <img
                      src={currentUser.avatar || '/profile-icon.jpg'}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                      }}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-600/30 dark:ring-blue-400/30"
                    />
                    {/* Active User Online Indicator */}
                    <span className="absolute -bottom-0.5 ltr:-right-0.5 rtl:-left-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                  </div>

                  <div className="hidden sm:flex flex-col text-left ltr:text-left rtl:text-right">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight truncate max-w-[100px] xl:max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-none mt-0.5">
                      {isAr ? 'الحساب المهني' : 'Career Account'}
                    </span>
                  </div>

                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:text-slate-600 dark:group-hover:text-slate-300 ${
                      profileDropdownOpen ? 'rotate-180 text-blue-600' : ''
                    }`} 
                    aria-hidden="true"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div 
                    id="nav-user-profile-menu"
                    role="menu"
                    aria-label="User profile options"
                    className="absolute top-full mt-2 ltr:right-0 rtl:left-0 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/12 dark:shadow-black/60 border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    {/* Header in Profile Dropdown */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <img
                        src={currentUser.avatar || '/profile-icon.jpg'}
                        alt={currentUser.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-600/30 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <button
                        id="profile-menu-profile-btn"
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          handleNavClick('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left ltr:text-left rtl:text-right px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition cursor-pointer"
                      >
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{isAr ? 'الملف الشخصي' : 'My Profile'}</span>
                      </button>

                      <button
                        id="profile-menu-dashboard-btn"
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          handleNavClick('dashboard');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left ltr:text-left rtl:text-right px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>{isAr ? 'لوحة التحكم' : 'Dashboard'}</span>
                      </button>

                      <button
                        id="profile-menu-logout-btn"
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left ltr:text-left rtl:text-right px-3 py-2 rounded-lg text-xs text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2.5 transition cursor-pointer border-t border-slate-100 dark:border-slate-800/80 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.logOut}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="navbar-login-btn"
                  type="button"
                  onClick={onOpenAuthModal}
                  className="text-xs font-semibold px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                >
                  {t.logIn}
                </button>
                <Button
                  id="navbar-get-started-btn"
                  onClick={onOpenAuthModal}
                  variant="primary"
                  size="sm"
                  className="text-xs font-semibold shadow-xs"
                >
                  {t.getStarted}
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE NAVIGATION DRAWER                                  */}
        {/* Distinctive mobile card layout with categorized tools     */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            {/* Mobile Profile Card */}
            {currentUser && (
              <div className="mb-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={currentUser.avatar || '/profile-icon.jpg'}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                      }}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-500"
                    />
                    <span className="absolute -bottom-0.5 ltr:-right-0.5 rtl:-left-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleNavClick('profile')}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    {isAr ? 'الملف' : 'Profile'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('dashboard')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-600 cursor-pointer"
                    title={isAr ? 'لوحة التحكم' : 'Dashboard'}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Primary Nav List in Mobile */}
            <div className="space-y-1 mb-4">
              {[
                { id: 'home', label: isAr ? 'الرئيسية' : 'Home' },
                { id: 'jobs', label: isAr ? 'الوظائف' : 'Jobs' },
                { id: 'pricing', label: isAr ? 'الباقات' : 'Pricing' },
                { id: 'employers', label: isAr ? 'للشركات' : 'Employers' },
              ].map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ltr:text-left rtl:text-right ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile AI Tools Categorized Section */}
            <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between px-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {isAr ? 'أدوات الذكاء الاصطناعي' : 'AI Career Suite'}
                </span>
                <button
                  type="button"
                  onClick={() => handleNavClick('tools')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'استكشف الكل' : 'Explore All'}</span>
                  <ArrowRight className="w-3 h-3 ltr:inline rtl:rotate-180" />
                </button>
              </div>

              {toolGroups.map((group) => (
                <div key={`m-${group.key}`} className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 pt-1">
                    {group.title}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const targetTab = item.targetId || item.id;
                      const isItemActive = activeTab === targetTab;

                      return (
                        <button
                          key={`m-${item.id}`}
                          type="button"
                          onClick={() => handleNavClick(targetTab)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ltr:text-left rtl:text-right ${
                            isItemActive
                              ? 'bg-blue-600 text-white font-bold'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                          }`}
                        >
                          <ItemIcon className={`w-4 h-4 shrink-0 ${isItemActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-semibold">{item.label}</div>
                            <div className={`text-[10px] truncate ${isItemActive ? 'text-blue-100' : 'text-slate-400'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
