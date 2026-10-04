import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Kanban, 
  Send, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  Award,
  Zap,
  Banknote,
  Mic,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  Target,
  ArrowUpRight,
  Scale
} from 'lucide-react';
import { Language, DiscoveredJob } from '../types';
import { translations } from '../i18n/translations';
import { HeroInteractiveMap } from './HeroInteractiveMap';
import { 
  OFFICIAL_SLOGAN,
  SloganOption
} from '../data/slogans';
import { Button, Badge } from './ui';

interface HomepageViewProps {
  language: Language;
  onNavigate: (tabId: string, params?: any) => void;
  featuredJobs: DiscoveredJob[];
  onSelectJob: (job: DiscoveredJob) => void;
}

export const HomepageView: React.FC<HomepageViewProps> = ({
  language,
  onNavigate,
  featuredJobs,
  onSelectJob
}) => {
  const t = translations[language];
  const isAr = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'tech' | 'sales' | 'part-time'>('all');
  const activeSlogan: SloganOption = OFFICIAL_SLOGAN;

  const displaySlogan = isAr ? activeSlogan.ar : activeSlogan.en;
  const displaySubTagline = isAr ? activeSlogan.subAr : activeSlogan.subEn;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('jobs', { search: searchTerm, location: locationTerm });
  };

  // Cairo districts quick jump
  const cairoDistricts = [
    { name: isAr ? 'المعادي' : 'Maadi', query: 'Maadi', count: '14+' },
    { name: isAr ? 'التجمع الخامس' : 'New Cairo', query: 'New Cairo', count: '22+' },
    { name: isAr ? 'مدينة نصر' : 'Nasr City', query: 'Nasr City', count: '18+' },
    { name: isAr ? 'الدقي والمهندسين' : 'Dokki & Giza', query: 'Dokki', count: '11+' },
    { name: isAr ? 'الشيخ زايد' : 'Sheikh Zayed', query: 'Sheikh Zayed', count: '9+' },
    { name: isAr ? 'عمل عن بعد' : 'Remote / Hybrid', query: 'Remote', count: '16+' }
  ];

  // Egyptian job market live pulse indicators
  const liveMarketMetrics = [
    {
      label: isAr ? 'فرص عمل حقيقية وموثقة' : 'Verified Open Roles',
      value: '2,480+',
      trend: isAr ? '+140 وظيفة هذا الأسبوع' : '+140 added this week',
      icon: Briefcase
    },
    {
      label: isAr ? 'دقة تطابق الذكاء الاصطناعي' : 'AI Match Precision',
      value: '94.8%',
      trend: isAr ? 'بناءً على المهارات والمسافة' : 'Filtered by skills & distance',
      icon: Target
    },
    {
      label: isAr ? 'متوسط سرعة استجابة الشركات' : 'Avg. Recruiter Response',
      value: '< 48h',
      trend: isAr ? 'تواصل مباشر مع مسؤولي التوظيف' : 'Direct hiring connection',
      icon: Clock
    },
    {
      label: isAr ? 'كشف العروض المشبوهة والرسوم' : 'Scam & Trap Protection',
      value: '100%',
      trend: isAr ? 'فحص تلقائي قبل النشر' : 'Continuous integrity scan',
      icon: ShieldCheck
    }
  ];

  // The 5-Step Journey
  const steps = [
    {
      num: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Compass,
      color: 'from-blue-600 to-cyan-500',
      action: () => onNavigate('jobs')
    },
    {
      num: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      icon: FileCheck,
      color: 'from-blue-700 to-indigo-600',
      action: () => onNavigate('cv-optimizer')
    },
    {
      num: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Send,
      color: 'from-indigo-600 to-blue-500',
      action: () => onNavigate('cover-letter')
    },
    {
      num: '04',
      title: t.step4Title,
      desc: t.step4Desc,
      icon: Kanban,
      color: 'from-cyan-600 to-blue-600',
      action: () => onNavigate('tracker')
    },
    {
      num: '05',
      title: t.step5Title,
      desc: t.step5Desc,
      icon: Award,
      color: 'from-emerald-600 to-teal-600',
      action: () => onNavigate('community')
    }
  ];

  // Filtered jobs preview based on category tab
  const filteredFeaturedJobs = featuredJobs.filter((job) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'tech') {
      return job.title.toLowerCase().includes('engineer') || 
             job.title.toLowerCase().includes('developer') || 
             job.title.toLowerCase().includes('data') ||
             job.industry.toLowerCase().includes('tech');
    }
    if (activeCategoryFilter === 'sales') {
      return job.title.toLowerCase().includes('sales') || 
             job.title.toLowerCase().includes('account') ||
             job.industry.toLowerCase().includes('retail');
    }
    if (activeCategoryFilter === 'part-time') {
      return job.jobType === 'Part-time' || 
             job.title.toLowerCase().includes('evening') ||
             job.title.toLowerCase().includes('part-time');
    }
    return true;
  });

  return (
    <div className="space-y-16 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH MAP VISUAL & FLOATING CARDS (MAP UNTOUCHED) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 lg:pb-20 bg-radial-[at_top_right] from-blue-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
        
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines, CTAs, Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:ltr:text-left lg:rtl:text-right">
              
              {/* Intelligent Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{isAr ? 'منصة التوظيف الذكية الأولى للمنطقة' : 'AI-Native Career Platform for MENA'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                {displaySlogan}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {displaySubTagline}.
                </span>{' '}
                {t.heroSupporting}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Button
                  id="hero-find-jobs-btn"
                  onClick={() => onNavigate('jobs')}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30"
                  icon={<Search className="w-4 h-4" />}
                >
                  <span>{t.ctaFindJobs}</span>
                  <ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />
                </Button>

                <Button
                  id="hero-optimize-cv-btn"
                  onClick={() => onNavigate('cv-optimizer')}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<FileCheck className="w-4 h-4 text-brand-blue dark:text-blue-400" />}
                >
                  <span>{t.ctaOptimizeCv}</span>
                </Button>
              </div>

              {/* Hero Search Box */}
              <form 
                onSubmit={handleSearchSubmit}
                className="mt-6 p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto lg:mx-0"
              >
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r ltr:md:border-r rtl:md:border-l border-slate-100 dark:border-slate-700">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.heroSearchPlaceholder}
                    className="w-full text-xs sm:text-sm bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
                  />
                </div>

                <div className="flex-1 flex items-center gap-2.5 px-3 py-2">
                  <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                  <input
                    type="text"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    placeholder={t.heroLocationPlaceholder}
                    className="w-full text-xs sm:text-sm bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="px-5 py-2.5 whitespace-nowrap shadow-xs"
                >
                  {t.heroSearchBtn}
                </Button>
              </form>

              {/* Popular Tags */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap justify-center lg:justify-start">
                <span className="font-semibold">{t.popularSearches}</span>
                {['Sales', 'React', 'Data Analyst', 'Maadi', 'Part-time after 5 PM', 'Remote'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="neutral"
                    size="sm"
                    interactive
                    onClick={() => {
                      setSearchTerm(tag);
                      onNavigate('jobs', { search: tag });
                    }}
                    className="text-[11px] font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

            </div>

            {/* Right Column: Moving Interactive Cairo Map with Live Radar & Location Pins (STRICTLY PRESERVED) */}
            <div className="lg:col-span-5 relative">
              <HeroInteractiveMap
                language={language}
                onNavigate={onNavigate}
                featuredJobs={featuredJobs}
                onSelectJob={onSelectJob}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.5 LIVE MARKET METRICS STRIP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          {liveMarketMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="p-3 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                    {metric.label}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-blue-100/70 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                  {metric.trend}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.8 DISTRICT QUICK DISCOVERY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? 'خريطة مناطق القاهرة الكبرى' : 'Greater Cairo District Hubs'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {isAr ? 'ابحث عن الفرص في منطقتك الأقرب لتوفير وقت ومصاريف المواصلات' : 'Explore opportunities by district to minimize commute and transit stress'}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('jobs', { viewMode: 'map' })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition shrink-0"
            >
              <span>{isAr ? 'عرض كل الخريطة التفاعلية' : 'Open Full Interactive Map'}</span>
              <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {cairoDistricts.map((district) => (
              <button
                key={district.query}
                onClick={() => onNavigate('jobs', { location: district.query })}
                className="group p-3 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700/80 hover:border-blue-500/50 text-left rtl:text-right transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-white">
                  <span>{district.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 ltr:inline rtl:rotate-90 transition" />
                </div>
                <div className="text-[11px] text-blue-400 mt-1 font-medium">
                  {district.count} {isAr ? 'وظيفة' : 'roles'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 5-STEP JOURNEY: Discover → Prepare → Apply → Track → Get Hired */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {isAr ? 'رحلة الباحث عن عمل' : 'The Career Journey'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            {t.brandJourney}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {isAr ? 'صُمم أوبيفاي ليكون مساعدك المهني الذكي في كل خطوة، من اكتشاف الفرصة وحتى توقيع العقد.' : 'Designed to feel like your personal AI career agent, moving you smoothly from search to signed offer.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                onClick={step.action}
                className="group relative p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500">
                      {step.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{isAr ? 'ابدأ الآن' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED OPPORTUNITIES AROUND YOU WITH CATEGORY FILTER DOCK */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'مطابقة ذكية حسب بياناتك' : 'Personalized AI Matching'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'أفضل الوظائف القريبة منك' : 'Featured Opportunities Near You'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'مرتبة وفق أعلى نسب تطابق الذكاء الاصطناعي مع إمكانية التقديم وفحص الـ ATS فوراً.' : 'Ranked with transparent AI match scoring, commute distance, and verified salary estimates.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isAr ? 'الكل' : 'All Roles'}
            </button>
            <button
              onClick={() => setActiveCategoryFilter('tech')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === 'tech'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isAr ? 'البرمجة والتقنية' : 'Tech & Product'}
            </button>
            <button
              onClick={() => setActiveCategoryFilter('sales')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === 'sales'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isAr ? 'المبيعات والتجزئة' : 'Sales & Retail'}
            </button>
            <button
              onClick={() => setActiveCategoryFilter('part-time')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === 'part-time'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isAr ? 'دوام مسائي وجزئي' : 'Part-time / Evening'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFeaturedJobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    {job.matchScore}% {t.matchScoreBadge}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {job.distance}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {job.company} • {job.location}
                </p>

                <div className="mt-3 py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{job.salary}</span>
                  <span className="text-slate-500">{job.workMode}</span>
                </div>

                {/* Match Reason Checklist Preview */}
                <div className="mt-3 space-y-1">
                  {job.matchReasons.slice(0, 2).map((r) => (
                    <div key={r.key} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{r.label}: {r.details}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>{t.applyNow}</span>
                <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={() => onNavigate('jobs')}
            variant="outline"
            className="text-xs font-semibold px-6 py-2.5"
          >
            <span>{t.viewAllJobs}</span>
            <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
          </Button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3.5 FREE CAREER TOOLS INTELLIGENCE SUITE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {t.toolsHubBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.toolsHubTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.toolsHubSubtitle}
              </p>
            </div>
            <Button
              onClick={() => onNavigate('tools')}
              variant="primary"
              size="sm"
              className="self-start md:self-auto shadow-xs"
            >
              <span>{isAr ? 'استعرض كل الأدوات (10+)' : 'Explore All 10+ Tools'}</span>
              <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tool 1: Salary & Commute */}
            <div 
              onClick={() => onNavigate('salary-calc')}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {isAr ? 'قانون 2024' : '2024 Law'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                  {t.toolSalaryCalcTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.toolSalaryCalcDesc}
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{isAr ? 'احسب صافي مرتبك' : 'Calculate Net Wage'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
              </div>
            </div>

            {/* Tool 2: Cover Letter & WhatsApp */}
            <div 
              onClick={() => onNavigate('cover-letter')}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                    {isAr ? 'واتساب' : 'WhatsApp'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                  {t.toolCoverLetterTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.toolCoverLetterDesc}
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{isAr ? 'صياغة رسالة فورية' : 'Generate Outreach'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
              </div>
            </div>

            {/* Tool 3: Mock Interview Coach */}
            <div 
              onClick={() => onNavigate('mock-interview')}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                    STAR AI
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                  {t.toolMockInterviewTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.toolMockInterviewDesc}
                </p>
              </div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{isAr ? 'تدرّب على المقابلة' : 'Practice Answers'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
              </div>
            </div>

            {/* Tool 4: Resume XYZ Booster */}
            <div 
              onClick={() => onNavigate('resume-booster')}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    XYZ Formula
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition">
                  {t.toolResumeBoosterTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.toolResumeBoosterDesc}
                </p>
              </div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{isAr ? 'ضاعف قوة جمل الـ CV' : 'Power Up Bullets'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AI CAREER ASSISTANT TEASER BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.navAiAssistant}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isAr ? 'ابحث بلغة طبيعية. احصل على فرص دقيقة.' : 'Ask in plain language. Get matched instantly.'}
            </h2>

            <p className="text-sm text-blue-100 leading-relaxed">
              "{t.quickPrompt1}"
            </p>

            <button
              onClick={() => onNavigate('assistant')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 shadow-md transition cursor-pointer"
            >
              <span>{isAr ? 'تحدث مع المساعد الذكي الآن' : 'Chat with AI Career Assistant'}</span>
              <ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />
            </button>
          </div>

          <div className="hidden lg:block absolute -bottom-10 ltr:-right-10 rtl:-left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EMPLOYER VALUE STRIP (Bridging Job Seekers & Quality Egyptian Employers) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
              <Building2 className="w-4 h-4" />
              <span>{isAr ? 'لأصحاب الشركات ومسؤولي التوظيف' : 'For Employers & HR Leaders'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'وظّف الكفاءات الجاهزة في مصر بسرعة مضاعفة' : 'Hire job-ready candidates in Egypt with AI screening'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr ? 'انشر وظائفك مجاناً، وفلتر المرشحين حسب المسافة الجغرافية وساعات العمل، وتواصل معهم بنقرة واحدة.' : 'Post jobs directly, screen candidates by proximity & commute readiness, and reduce hiring time from weeks to 48 hours.'}
            </p>
          </div>

          <Button
            onClick={() => onNavigate('employers')}
            variant="primary"
            size="md"
            className="shrink-0 whitespace-nowrap shadow-xs"
          >
            <span>{isAr ? 'انشر وظيفة الآن' : 'Post a Job on Opify'}</span>
            <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
          </Button>
        </div>
      </section>

    </div>
  );
};
