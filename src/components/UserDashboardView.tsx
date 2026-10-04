import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  FileCheck, 
  Briefcase, 
  Kanban, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  FileEdit,
  UserCheck,
  Compass,
  Building2,
  Calendar,
  Layers,
  Award,
  Clock,
  DollarSign,
  Target,
  ChevronRight,
  Zap,
  ExternalLink,
  ShieldCheck,
  Edit3,
  X,
  Check,
  Search,
  Phone,
  Mail,
  User,
  AlertCircle,
  Share2,
  Video,
  Send
} from 'lucide-react';
import { Language, DiscoveredJob, UserProfile, ApplicationItem } from '../types';
import { translations } from '../i18n/translations';

interface UserDashboardViewProps {
  language: Language;
  user: UserProfile;
  applications?: ApplicationItem[];
  recommendedJobs: DiscoveredJob[];
  onSelectJob: (job: DiscoveredJob) => void;
  onApplyJob: (job: DiscoveredJob) => void;
  onNavigate: (tabId: string, params?: any) => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  language,
  user,
  applications = [],
  recommendedJobs,
  onSelectJob,
  onApplyJob,
  onNavigate,
  onUpdateUser
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  // Filters for Recommended Jobs
  const [jobFilter, setJobFilter] = useState<'all' | 'high_match' | 'cairo' | 'remote' | 'high_salary'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => new Set(['job-1', 'job-3']));

  // Edit Profile / Career Target Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user.name || 'Nada Nemr');
  const [editEmail, setEditEmail] = useState(user.email || 'nadaanemr@gmail.com');
  const [editTitle, setEditTitle] = useState(user.title || 'Product & Tech Specialist');
  const [editTargetRole, setEditTargetRole] = useState(user.targetRole || 'Senior Frontend & Product Specialist');
  const [editLocation, setEditLocation] = useState(user.location || 'Cairo, Egypt (New Cairo & Maadi)');
  const [editTargetSalary, setEditTargetSalary] = useState(user.targetSalary || '55,000 EGP/mo');
  const [editWorkMode, setEditWorkMode] = useState(user.preferredWorkMode || 'Hybrid / Flexible');
  const [editPhone, setEditPhone] = useState(user.phone || '+20 100 882 3419');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Time-of-day greeting
  const greetingTime = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return isAr ? 'صباح الخير' : 'Good morning';
    } else if (hour < 18) {
      return isAr ? 'مساء الخير' : 'Good afternoon';
    } else {
      return isAr ? 'مساء النور' : 'Good evening';
    }
  }, [isAr]);

  // Derived application pipeline statistics
  const pipelineStats = useMemo(() => {
    const saved = applications.filter(a => a.status === 'Saved').length;
    const applied = applications.filter(a => a.status === 'Applied').length;
    const interviewing = applications.filter(a => a.status === 'Interviewing').length;
    const offer = applications.filter(a => a.status === 'Offer').length;
    const total = applications.length || user.activeApplicationsCount || 5;

    return {
      saved: saved || 1,
      applied: applied || 2,
      interviewing: interviewing || 2,
      offer: offer || 1,
      total
    };
  }, [applications, user.activeApplicationsCount]);

  // Toggle bookmark
  const toggleBookmark = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return recommendedJobs.filter(job => {
      if (jobFilter === 'high_match') return job.matchScore >= 90;
      if (jobFilter === 'cairo') return job.location.toLowerCase().includes('cairo') || job.location.toLowerCase().includes('maadi') || job.location.toLowerCase().includes('giza');
      if (jobFilter === 'remote') return job.workMode === 'Remote' || job.workMode === 'Hybrid';
      if (jobFilter === 'high_salary') {
        const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ''), 10);
        return salaryNum >= 30000 || job.salary.includes('40,000') || job.salary.includes('45,000') || job.salary.includes('50,000');
      }
      return true;
    });
  }, [recommendedJobs, jobFilter]);

  // Handle Save Profile Target
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: editName.trim() || 'Nada Nemr',
      email: editEmail.trim() || 'nadaanemr@gmail.com',
      title: editTitle.trim(),
      targetRole: editTargetRole.trim(),
      location: editLocation.trim(),
      targetSalary: editTargetSalary.trim(),
      preferredWorkMode: editWorkMode.trim(),
      phone: editPhone.trim()
    };

    if (onUpdateUser) {
      onUpdateUser(updated);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditModalOpen(false);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Hero Welcome & Career Command Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden border border-blue-800/40">
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-3 relative z-10 max-w-2xl">
          
          {/* Top badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>{isAr ? 'لوحة تحكم المرشح المميز' : 'Candidate Career Hub'}</span>
            </span>
            {user.isPremium && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAr ? 'عضوية Pro نشطة' : 'Opify Pro Verified'}</span>
              </span>
            )}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'ملف موثق 100%' : '100% Verified Profile'}</span>
            </span>
          </div>

          {/* Greeting & Name */}
          <div className="flex items-center gap-4 pt-1">
            {/* User Photo Icon */}
            <button
              id="dashboard-avatar-profile-btn"
              onClick={() => onNavigate('profile')}
              className="relative group cursor-pointer shrink-0"
              title={isAr ? 'عرض وتعديل الملف الشخصي' : 'View and edit profile'}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-2 ring-blue-400/80 shadow-lg bg-slate-800">
                <img
                  src={user.avatar || '/profile-icon.jpg'}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-blue-600 rounded-lg text-white border border-slate-900 shadow-xs">
                <Edit3 className="w-3 h-3" />
              </div>
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2 flex-wrap">
                <span>{greetingTime}, {user.name} 👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-blue-200/90 font-medium mt-0.5 flex items-center gap-2 flex-wrap">
                <span>{user.title || (isAr ? 'أخصائية التكنولوجيا وتطوير المنتجات' : 'Product & Tech Specialist')}</span>
                <span className="text-blue-400">•</span>
                <span className="flex items-center gap-1 text-slate-300 text-xs">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{user.location || (isAr ? 'القاهرة (التجمع والمعادي)' : 'Cairo, Egypt')}</span>
                </span>
                <span className="text-blue-400">•</span>
                <span className="text-emerald-300 font-bold text-xs">
                  {user.targetSalary || '55,000 EGP/mo target'}
                </span>
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {isAr 
              ? 'إليك ملخص اليوم: تم رصد 16 فرصة متطابقة مع معاييرك وراتبك المستهدف، مع موعد مقابلة تقنية غداً في تمام 2:00 ظهراً.'
              : "Here is your career pulse: 16 high-match opportunities in Cairo matching your salary target, plus an upcoming technical interview tomorrow at 2:00 PM."}
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 relative z-10 shrink-0">
          <button
            id="dashboard-goto-profile-view-btn"
            onClick={() => onNavigate('profile')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>{isAr ? 'الملف الشخصي' : 'My Profile'}</span>
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-300" />
            <span>{isAr ? 'تعديل الأهداف والبيانات' : 'Quick Targets Edit'}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('assistant')}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{isAr ? 'المساعد الذكي' : 'AI Career Coach'}</span>
            </button>
            <button
              onClick={() => onNavigate('jobs', { viewMode: 'map' })}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-blue-400" />
              <span>{isAr ? 'رادار الوظائف' : 'Job Radar'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. Primary 4 Metric Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Profile Strength */}
        <div 
          onClick={() => onNavigate('cv-optimizer')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t.statProfileStrength}
              </span>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 group-hover:scale-105 transition-transform">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.profileStrength || 94}%
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {isAr ? 'جاهز للشركات' : 'High Visibility'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 mt-3 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${user.profileStrength || 94}%` }} 
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">
              {isAr ? 'الخبرات والمهارات مكتملة' : 'Work & skills 100% verified'}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        {/* ATS Resume Score */}
        <div 
          onClick={() => onNavigate('cv-optimizer')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t.statCvScore}
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 group-hover:scale-105 transition-transform">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.cvAtsScore || 89}/100
              </span>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                {isAr ? 'تنسيق قياسي' : 'Top 5% in Cairo'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 mt-3 overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                style={{ width: `${user.cvAtsScore || 89}%` }} 
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">
              {isAr ? 'فحص الكلمات المفتاحية النشطة' : 'Single-column ATS format'}
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div 
          onClick={() => onNavigate('jobs')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-cyan-400 dark:hover:border-cyan-500 transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t.statRecommendedJobs}
              </span>
              <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.recommendedJobsCount || 16}
              </span>
              <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                {isAr ? 'نطاق 5 كم' : '5 km radius'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 mt-3 overflow-hidden">
              <div 
                className="h-full bg-cyan-500 rounded-full transition-all duration-500" 
                style={{ width: '82%' }} 
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">
              {isAr ? 'رواتب تبدأ من 45,000 ج.م' : 'Salaries 45k - 70k EGP'}
            </span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

        {/* Active Pipeline */}
        <div 
          onClick={() => onNavigate('tracker')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-500 transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t.statActiveApplications}
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 group-hover:scale-105 transition-transform">
                <Kanban className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {pipelineStats.total}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {pipelineStats.interviewing} {isAr ? 'في المقابلات' : 'in interviews'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 mt-3 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: '70%' }} 
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">
              {pipelineStats.offer} {isAr ? 'عرض عمل مستلم' : 'Offer received'}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>

      </div>

      {/* 3. Pipeline Velocity & Next Interview Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Application Stages Funnel */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Kanban className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {isAr ? 'مراحل خطة التوظيف المباشرة' : 'Live Application Pipeline Funnel'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isAr ? 'تتبع فوري لجميع طلباتك النشطة' : 'Real-time progression of your submissions'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('tracker')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isAr ? 'فتح المتتبع بالكامل' : 'Full Kanban'}</span>
              <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
            </button>
          </div>

          {/* Mini pipeline stages */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{t.statusSaved}</span>
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{pipelineStats.saved}</p>
              <span className="text-[10px] text-slate-400 block">{isAr ? 'وظائف قيد الدراسة' : 'Ready to apply'}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 space-y-1">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">{t.statusApplied}</span>
              <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{pipelineStats.applied}</p>
              <span className="text-[10px] text-blue-500/80 block">{isAr ? 'بانتظار المراجعة' : 'Under recruiter review'}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-1">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{t.statusInterviewing}</span>
              <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300">{pipelineStats.interviewing}</p>
              <span className="text-[10px] text-indigo-500/80 block">{isAr ? 'مقابلات تقنية محددة' : 'Technical rounds'}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{t.statusOffer}</span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{pipelineStats.offer}</p>
              <span className="text-[10px] text-emerald-500/80 block">{isAr ? 'عقد قيد التفاوض' : 'Negotiation phase'}</span>
            </div>
          </div>

          {/* Quick Active Items preview */}
          <div className="pt-2 space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Senior Frontend & Product Engineer</span>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">FinPulse MENA • Maadi, Cairo</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px]">
                {isAr ? 'مقابلة غداً' : 'Interview Tomorrow'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Technical Product Lead</span>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Apex Digital Retail • New Cairo</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px]">
                {isAr ? 'عرض عمل مبدئي' : 'Initial Offer (60k)'}
              </span>
            </div>
          </div>
        </div>

        {/* Next Scheduled Interview Spotlight */}
        <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-900 via-blue-900 to-slate-900 text-white shadow-md flex flex-col justify-between space-y-4 border border-indigo-700/50">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-cyan-300" />
                <span>{isAr ? 'المقابلة القادمة' : 'Next Live Interview'}</span>
              </span>
              <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-800/40">
                {isAr ? 'غداً 2:00 م' : 'Tomorrow 2:00 PM'}
              </span>
            </div>

            <h4 className="text-lg font-black text-white tracking-tight">
              FinPulse Technologies
            </h4>
            <p className="text-xs text-indigo-200 font-medium mt-0.5">
              Role: Senior Frontend & Product Specialist
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1.5 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span>Tomorrow, Sept 14 • 2:00 PM - 2:45 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span>Interviewer: Tarek Mansour (VP Engineering)</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span>Format: Google Meet • System Architecture & React</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigate('assistant')}
              className="w-full py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isAr ? 'تجهيز نموذج الإجابات بالذكاء' : 'Generate AI Interview Prep'}</span>
            </button>
            <button
              onClick={() => onNavigate('tracker')}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer text-center"
            >
              {isAr ? 'عرض تفاصيل التقديم' : 'View Application Notes'}
            </button>
          </div>
        </div>

      </div>

      {/* 4. Cairo Salary & Market Intelligence Benchmark for Nada Nemr */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {isAr ? 'مؤشر القيمة السوقية والرواتب في القاهرة' : 'Cairo Market Value & Salary Intelligence'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isAr ? 'مقارنة راتبك المستهدف مع بيانات 890 وظيفة معتمدة في سوق التكنولوجيا المصري' : 'Calibrated against verified tech salaries across Cairo & Giza'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-center">
            {isAr ? 'الراتب المستهدف لندى: 55,000 ج.م' : 'Nada’s Target: 55,000 EGP/mo'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-750 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400">Junior to Mid</span>
              <span className="font-mono text-slate-500">25,000 - 35,000 EGP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full bg-slate-400 rounded-full w-[45%]" />
            </div>
            <p className="text-[10px] text-slate-400">{isAr ? 'الحد الأدنى للوظائف التقنية بالقاهرة' : 'Baseline Cairo tech rate'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-700 dark:text-blue-300">Senior Level (Your Tier)</span>
              <span className="font-mono font-bold text-blue-700 dark:text-blue-300">45,000 - 68,000 EGP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-200 dark:bg-blue-800 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[85%]" />
            </div>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
              {isAr ? 'راتبك المستهدف (55,000 ج.م) يقع في أفضل شريحة تنافسية' : 'Your target 55k EGP aligns with top 80th percentile'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-750 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400">Lead / Principal / Remote GCC</span>
              <span className="font-mono text-slate-500">70,000 - 110,000 EGP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-full" />
            </div>
            <p className="text-[10px] text-slate-400">{isAr ? 'للشركات الإقليمية والعمل عن بعد بالدولار' : 'Remote GCC & high-growth scaleups'}</p>
          </div>
        </div>

        {/* Top matching skills tags */}
        <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 text-[11px]">{isAr ? 'المهارات المطابقة الأعلى طلباً:' : 'Top Profile Skill Matches:'}</span>
          {['React 19 (98%)', 'TypeScript Architecture (95%)', 'Product Management (92%)', 'ATS CV Optimization (94%)', 'AI Assistant Integration (90%)'].map((skill, i) => (
            <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 5. AI Career Co-Pilot Daily Smart Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Rec 1: High Match Role */}
        <div className="p-5 rounded-3xl bg-linear-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-200/60 dark:bg-blue-900/80 text-blue-800 dark:text-blue-300">
              {isAr ? 'فرصة ذهبية جديدة' : 'High Match Alert'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'وظيفة جديدة مطابقة 96% بالتجمع الخامس' : 'New 96% Match in New Cairo'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'أعلنت Noon Digital عن فتح التقديم لوظيفة Senior Frontend براتب 45k-65k ج.م، مطابقة تماماً لمهاراتك.'
                : 'Noon Digital posted a Senior Frontend role matching your stack with 45k-65k EGP verified compensation.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('jobs')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer pt-2"
          >
            <span>{isAr ? 'عرض الوظيفة فوراً' : 'View Matching Job'}</span>
            <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
          </button>
        </div>

        {/* Rec 2: ATS Boost Tip */}
        <div className="p-5 rounded-3xl bg-linear-to-br from-indigo-50 to-purple-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-indigo-200 dark:border-indigo-900/60 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-300">
              {isAr ? 'نصيحة تحسين السيرة' : 'ATS Score Boost'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'رفع درجة السيرة من 89 إلى 95' : 'Raise ATS Score from 89 to 95+'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'إضافة مؤشرين رقميين (مثل خفض زمن التحميل أو تحسين التحويل) سيرفع معدل اختيارك للمقابلات بنسبة 24%.'
                : 'Adding 2 quantified metric bullets in your latest role will boost your interview conversion rate by 24%.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('cv-optimizer')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer pt-2"
          >
            <span>{isAr ? 'فحص السيرة الذاتية' : 'Open ATS Scanner'}</span>
            <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
          </button>
        </div>

        {/* Rec 3: Safe Job Guarantee */}
        <div className="p-5 rounded-3xl bg-linear-to-br from-emerald-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-emerald-200 dark:border-emerald-900/60 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/60 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300">
              {isAr ? 'حماية أوبيفاي المتقدمة' : 'Verified Scam Shield'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isAr ? 'جميع طلباتك محمية وموثقة' : 'Zero Scam Flags in Your Pipeline'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'تم فحص الشركات الـ 5 التي قدمتِ عليها والتأكد من سجلاتها التجارية وعدم وجود أي طلبات لرسوم مسبقة.'
                : 'All 5 companies you applied to have verified tax registrations with zero advance-fee requests.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('assistant')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer pt-2"
          >
            <span>{isAr ? 'استشارة الذكاء الاصطناعي' : 'Ask Career Advisor'}</span>
            <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
          </button>
        </div>

      </div>

      {/* 6. Quick Action Navigation Hub */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: isAr ? 'رادار الخريطة' : 'Map Radar', icon: MapPin, tab: 'jobs', params: { viewMode: 'map' } },
          { label: isAr ? 'فاحص الـ ATS' : 'ATS Resume', icon: FileEdit, tab: 'cv-optimizer' },
          { label: isAr ? 'خطاب التقديم الذكي' : 'AI Cover Letter', icon: Send, tab: 'cover-letter' },
          { label: isAr ? 'متتبع الطلبات' : 'Applications Kanban', icon: Kanban, tab: 'tracker' },
          { label: isAr ? 'مقارنة الوظائف' : 'Compare Jobs', icon: Layers, tab: 'comparison' },
          { label: isAr ? 'مستكشف الرواتب' : 'Salary Explorer', icon: DollarSign, tab: 'salary-estimator' },
          { label: isAr ? 'تجارب المقابلات' : 'Interview Insights', icon: UserCheck, tab: 'insights' },
          { label: isAr ? 'المساعد المهني' : 'AI Assistant', icon: Sparkles, tab: 'assistant' },
        ].map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigate(act.tab, act.params)}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-750 transition cursor-pointer flex items-center gap-3 text-left ltr:text-left rtl:text-right group"
            >
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 7. Curated Job Recommendations Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t.recommendedForYouTitle}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                {filteredJobs.length} {isAr ? 'فرصة' : 'Roles'}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.recommendedForYouSub}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { key: 'all', label: isAr ? 'الكل' : 'All' },
              { key: 'high_match', label: isAr ? 'أعلى مطابقة (90%+)' : '90%+ Match' },
              { key: 'cairo', label: isAr ? 'القاهرة والجيزة' : 'Cairo & Giza' },
              { key: 'remote', label: isAr ? 'عن بعد وهجين' : 'Remote/Hybrid' },
              { key: 'high_salary', label: isAr ? 'رواتب 40k+ ج.م' : 'High Salary' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setJobFilter(f.key as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer whitespace-nowrap ${
                  jobFilter === f.key
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid of Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.slice(0, 6).map((job) => {
            const isBookmarked = bookmarkedIds.has(job.id);
            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition cursor-pointer flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{job.distance || '1.2 km'}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleBookmark(job.id, e)}
                        className={`p-1.5 rounded-lg border transition ${
                          isBookmarked 
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 border-amber-300 dark:border-amber-700' 
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
                        }`}
                        title={isBookmarked ? 'Saved' : 'Bookmark job'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{job.matchScore}%</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.company} • {job.location}</span>
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{job.salary}</span>
                    <span className="text-slate-500 text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {job.workMode}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApplyJob(job);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                    >
                      {t.applyNow}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('cover-letter', { initialJobTitle: job.title, initialCompany: job.company });
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                      title="Generate targeted cover letter"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span>{isAr ? 'الخطاب' : 'Pitch'}</span>
                    </button>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                    <span>{isAr ? 'تفاصيل' : 'Details'}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. Edit Profile & Career Targets Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {isAr ? 'تعديل الأهداف والملف الشخصي' : 'Edit Career Targets & Profile'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'تحديث بيانات المستخدم ومطابقة الوظائف' : 'Update your personal preferences & radar filters'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nada Nemr"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="nadaanemr@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'المسمى المهني الحالي' : 'Current Professional Headline'}
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Product & Tech Specialist"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'الوظيفة المستهدفة' : 'Target Role'}
                  </label>
                  <input
                    type="text"
                    value={editTargetRole}
                    onChange={(e) => setEditTargetRole(e.target.value)}
                    placeholder="Senior Frontend & Product Specialist"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'الراتب المستهدف (شهرياً)' : 'Target Monthly Salary'}
                  </label>
                  <input
                    type="text"
                    value={editTargetSalary}
                    onChange={(e) => setEditTargetSalary(e.target.value)}
                    placeholder="55,000 EGP/mo"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'نظام العمل المفضل' : 'Preferred Work Model'}
                  </label>
                  <select
                    value={editWorkMode}
                    onChange={(e) => setEditWorkMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Hybrid / Flexible">Hybrid / Flexible</option>
                    <option value="Remote">100% Remote</option>
                    <option value="On-site">On-site (Cairo & Giza)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'المنطقة والموقع' : 'Location / Governorate'}
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Cairo, Egypt (New Cairo & Maadi)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {isAr ? 'رقم الهاتف للتواصل' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+20 100 882 3419"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'تم حفظ التحديثات بنجاح!' : 'Profile & targets saved successfully!'}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-750 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'حفظ التغييرات' : 'Save Changes'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
