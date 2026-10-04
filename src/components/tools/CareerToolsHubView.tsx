import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Banknote, 
  Send, 
  Mic, 
  Zap, 
  FileText, 
  Layers, 
  Search, 
  Users, 
  ArrowRight, 
  ExternalLink, 
  Compass, 
  ShieldAlert, 
  HelpCircle,
  LayoutGrid,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Language, UserProfile } from '../../types';
import { translations } from '../../i18n/translations';
import { Button, Badge } from '../ui';
import { SalaryCommuteCalculatorTool } from './SalaryCommuteCalculatorTool';
import { CoverLetterPitchTool } from './CoverLetterPitchTool';
import { MockInterviewCoachTool } from './MockInterviewCoachTool';
import { ResumePowerBoosterTool } from './ResumePowerBoosterTool';

interface CareerToolsHubViewProps {
  language: Language;
  currentUser?: UserProfile | null;
  initialSubTab?: string;
  onNavigate: (tabId: string, params?: any) => void;
}

export const CareerToolsHubView: React.FC<CareerToolsHubViewProps> = ({
  language,
  currentUser,
  initialSubTab = 'all',
  onNavigate
}) => {
  const isAr = language === 'ar';
  const t = translations[language];

  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Tools Directory Registry
  const TOOLS_LIST = [
    {
      id: 'salary-calc',
      title: t.toolSalaryCalcTitle,
      desc: t.toolSalaryCalcDesc,
      category: 'salary',
      icon: Banknote,
      badge: isAr ? 'محدث لقانون 2024' : 'Egypt 2024 Law 91',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
      isInteractiveInHub: true,
      popular: true,
    },
    {
      id: 'cover-letter',
      title: t.toolCoverLetterTitle,
      desc: t.toolCoverLetterDesc,
      category: 'applications',
      icon: Send,
      badge: isAr ? 'واتساب ولينكد إن' : 'WhatsApp & InMail',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300',
      isInteractiveInHub: true,
      popular: true,
    },
    {
      id: 'mock-interview',
      title: t.toolMockInterviewTitle,
      desc: t.toolMockInterviewDesc,
      category: 'interviews',
      icon: Mic,
      badge: isAr ? 'تقييم STAR فوري' : 'STAR Method AI',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300',
      isInteractiveInHub: true,
      popular: true,
    },
    {
      id: 'resume-booster',
      title: t.toolResumeBoosterTitle,
      desc: t.toolResumeBoosterDesc,
      category: 'applications',
      icon: Zap,
      badge: isAr ? 'صيغة جوجل وهارفارد' : 'XYZ Formula',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300',
      isInteractiveInHub: true,
      popular: false,
    },
    {
      id: 'decoder',
      title: t.toolJdDecoderTitle,
      desc: t.toolJdDecoderDesc,
      category: 'career',
      icon: Sparkles,
      badge: isAr ? 'كاشف الحيل والرواتب' : 'Scam & Red Flag Radar',
      badgeColor: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300',
      isInteractiveInHub: false,
      targetRoute: 'decoder',
      popular: true,
    },
    {
      id: 'cv-optimizer',
      title: t.toolAtsScanTitle,
      desc: t.toolAtsScanDesc,
      category: 'applications',
      icon: FileText,
      badge: isAr ? 'فحص آلي للكلمات' : 'ATS 100-Point Audit',
      badgeColor: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300',
      isInteractiveInHub: false,
      targetRoute: 'cv-optimizer',
      popular: false,
    },
    {
      id: 'comparison',
      title: t.toolComparisonTitle,
      desc: t.toolComparisonDesc,
      category: 'salary',
      icon: Layers,
      badge: isAr ? 'مقارنة 4 عروض' : 'Compare 4 Offers',
      badgeColor: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300',
      isInteractiveInHub: false,
      targetRoute: 'comparison',
      popular: false,
    },
    {
      id: 'learning-plan',
      title: t.toolLearningPlanTitle,
      desc: t.toolLearningPlanDesc,
      category: 'career',
      icon: Compass,
      badge: isAr ? 'منصات ITI ومهارة-تك' : 'ITI & MaharaTech',
      badgeColor: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300',
      isInteractiveInHub: false,
      targetRoute: 'learning-plan',
      popular: false,
    },
    {
      id: 'community',
      title: t.toolCommunityTitle,
      desc: t.toolCommunityDesc,
      category: 'interviews',
      icon: Users,
      badge: isAr ? 'تسريبات وتجارب كبرى' : 'Cairo Community',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
      isInteractiveInHub: false,
      targetRoute: 'community',
      popular: false,
    }
  ];

  const categories = [
    { id: 'all', label: t.toolsHubCategoryAll },
    { id: 'salary', label: t.toolsHubCategorySalary },
    { id: 'applications', label: t.toolsHubCategoryApplications },
    { id: 'interviews', label: t.toolsHubCategoryInterviews },
    { id: 'career', label: t.toolsHubCategoryCareer },
  ];

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      tool.title.toLowerCase().includes(query) || 
      tool.desc.toLowerCase().includes(query) || 
      tool.badge.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const handleToolClick = (tool: typeof TOOLS_LIST[0]) => {
    if (tool.isInteractiveInHub) {
      setActiveSubTab(tool.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tool.targetRoute) {
      onNavigate(tool.targetRoute);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="brand" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {t.toolsHubBadge}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.toolsHubTitle}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
            {t.toolsHubSubtitle}
          </p>
        </div>

        {/* Global Hub Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في الأدوات (راتب، مقابلة، سيرة...)' : 'Search tools (salary, STAR, ATS)...'}
            className="w-full ltr:pl-9 rtl:pr-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-brand-blue transition"
          />
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/60 dark:border-slate-800">
        <button
          onClick={() => setActiveSubTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'all'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{isAr ? 'جميع الأدوات (دليل شامل)' : 'All Tools Hub'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('salary-calc')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'salary-calc'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Banknote className="w-3.5 h-3.5" />
          <span>{isAr ? 'حاسبة الراتب والمواصلات' : 'Salary & Commute Calc'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cover-letter')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'cover-letter'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isAr ? 'صانع الخطابات ورسائل واتساب' : 'Cover Letter & Pitch'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mock-interview')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'mock-interview'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>{isAr ? 'محاكي المقابلات (STAR)' : 'Mock Interview Coach'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('resume-booster')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'resume-booster'
              ? 'bg-brand-blue text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isAr ? 'معزز نقاط السيرة الذاتية' : 'Resume Power Booster'}</span>
        </button>
      </div>

      {/* VIEW SWITCHER */}
      
      {/* 1. All Tools Bento Grid Overview */}
      {activeSubTab === 'all' && (
        <div className="space-y-6">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const IconComp = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition duration-200 flex flex-col justify-between gap-5 cursor-pointer relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>
                      {tool.isInteractiveInHub 
                        ? (isAr ? 'فتح الأداة التفاعلية' : 'Open Interactive Tool') 
                        : (isAr ? 'الانتقال إلى الأداة' : 'Launch Workspace')}
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {isAr ? 'لا توجد أدوات مطابقة للبحث' : 'No tools matched your search query'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs text-blue-600 hover:underline font-bold"
              >
                {isAr ? 'إعادة ضبط التصفية' : 'Reset filters'}
              </button>
            </div>
          )}

        </div>
      )}

      {/* 2. Interactive Tool: Salary & Commute Calculator */}
      {activeSubTab === 'salary-calc' && (
        <SalaryCommuteCalculatorTool 
          language={language}
          onNavigateToJobs={(filters) => onNavigate('jobs', filters)}
        />
      )}

      {/* 3. Interactive Tool: Cover Letter & Recruiter Pitch Studio */}
      {activeSubTab === 'cover-letter' && (
        <CoverLetterPitchTool 
          language={language}
        />
      )}

      {/* 4. Interactive Tool: Mock Interview Coach */}
      {activeSubTab === 'mock-interview' && (
        <MockInterviewCoachTool 
          language={language}
        />
      )}

      {/* 5. Interactive Tool: Resume Power Booster */}
      {activeSubTab === 'resume-booster' && (
        <ResumePowerBoosterTool 
          language={language}
        />
      )}

    </div>
  );
};
