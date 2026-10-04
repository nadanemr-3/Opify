import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  Sparkles, 
  DollarSign, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language, AdminMetrics } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminOverviewTabProps {
  language: Language;
  metrics: AdminMetrics;
  jobsCount: number;
  usersCount: number;
  pendingReportsCount: number;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  language,
  metrics,
  jobsCount,
  usersCount,
  pendingReportsCount
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const regions = [
    { name: isAr ? 'القاهرة الكبرى (المعادي، التجمع، نصر)' : 'Greater Cairo (Maadi, New Cairo, Nasr City)', percentage: 48, count: '9,240' },
    { name: isAr ? 'الجيزة (الدقي، المهندسين، القرية الذكية)' : 'Giza (Dokki, Mohandessin, Smart Village)', percentage: 24, count: '4,620' },
    { name: isAr ? 'الإسكندرية (سموحة، سيدي جابر)' : 'Alexandria (Smouha, Sidi Gaber)', percentage: 14, count: '2,690' },
    { name: isAr ? 'الدلتا والقناة (المنصورة، طنطا، الإسماعيلية)' : 'Delta & Canal (Mansoura, Tanta, Ismailia)', percentage: 8, count: '1,540' },
    { name: isAr ? 'صعيد مصر والعمل عن بعد بالخليج' : 'Upper Egypt & Remote GCC', percentage: 6, count: '1,150' },
  ];

  const categories = [
    { name: isAr ? 'الهندسة والبرمجيات (Tech)' : 'Tech & Software Engineering', percentage: 38, count: '698 jobs' },
    { name: isAr ? 'المبيعات وتطوير الأعمال (Sales)' : 'Sales & Business Development', percentage: 26, count: '478 jobs' },
    { name: isAr ? 'خدمة العملاء والدعم (Customer Support)' : 'Customer Experience & Tele-sales', percentage: 18, count: '331 jobs' },
    { name: isAr ? 'التسويق وصناعة المحتوى (Marketing)' : 'Digital Marketing & Content', percentage: 11, count: '202 jobs' },
    { name: isAr ? 'اللوجستيات والعمليات (Operations)' : 'Logistics & Operations', percentage: 7, count: '131 jobs' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Live System Health & Admin Pulse Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/60 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-white">
                {isAr ? 'نظام الحماية والمراقبة الفورية (AI Sentinel) يعمل بكفاءة 100%' : 'AI Sentinel Scam Shield & Telemetry: 100% Operational'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {isAr 
                ? 'الجلسة النشطة: ندى نمر (nadaanemr@gmail.com) • 16 وظيفة معتمدة بالقاهرة • 0 بلاغات احتيال نشطة'
                : 'Session: Nada Nemr (nadaanemr@gmail.com) • 16 verified Cairo opportunities • 0 critical threats'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/10 text-cyan-300 border border-white/10">
            Node / Express v5 • Live
          </span>
        </div>
      </div>

      {/* 4 Primary KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{t.statTotalUsers}</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.totalUsers.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{isAr ? '+14% نمو شهري' : '+14% this month'}</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{t.statActiveUsers}</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.activeUsers.toLocaleString()}
          </p>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold pt-1">
            {isAr ? '59% نسبة التفاعل الدوري' : '59% monthly retention'}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{t.statTotalJobs}</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.totalJobs.toLocaleString()}
          </p>
          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold pt-1">
            {isAr ? '100% شفافية بالرواتب' : 'Across 8 MENA Hubs'}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{t.statTotalApplications}</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.totalApplications.toLocaleString()}
          </p>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            {metrics.hiresCount} {isAr ? 'تعيين مؤكد' : 'confirmed hires'}
          </div>
        </div>
      </div>

      {/* Conversion Funnel & Revenue Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Candidate Conversion Funnel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isAr ? 'مسار تحويل المتقدمين والتوظيف' : 'Candidate Placement Funnel'}</span>
            </h3>
            <span className="text-[11px] font-bold text-slate-400">{isAr ? 'بيانات حية' : 'Live Platform'}</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">{isAr ? '1. استكشاف الوظائف والتقديم' : '1. Discovered & Applied'}</span>
                <span className="text-slate-900 dark:text-white font-mono">24,910</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">{isAr ? '2. القائمة المختصرة وفحص الـ ATS' : '2. Shortlisted & ATS Screened'}</span>
                <span className="text-slate-900 dark:text-white font-mono">6,450 (25.8%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">{isAr ? '3. المقابلات الشخصية والتقنية' : '3. Technical & HR Interviews'}</span>
                <span className="text-slate-900 dark:text-white font-mono">3,120 (12.5%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">{isAr ? '4. عروض العمل والتعيين النهائي' : '4. Final Offers & Successful Hires'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black">890 (3.6%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[14%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Monetization Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'مصادر الدخل والاشتراكات الشهرية' : 'Revenue Streams & MRR'}</span>
            </h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {metrics.monthlyRevenue.toLocaleString()} EGP / mo
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isAr ? 'اشتراكات الباحثين (Candidate Pro)' : 'Candidate Pro Subscriptions'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {metrics.premiumUsers} {isAr ? 'مشترك نشط • خطة سنوية وشهرية' : 'subscribers • 99 EGP/mo avg'}
                </p>
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white">114,800 EGP (62%)</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isAr ? 'إعلانات الشركات المميزة (Featured Listings)' : 'Employer Featured Listings'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {isAr ? 'باقات ترويج الوظائف ذات الأولوية' : 'Top placement on job feed'}
                </p>
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white">49,700 EGP (27%)</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isAr ? 'اعتماد الشركات وتوثيق السجل التجاري' : 'Verified Employer Badges & API'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {isAr ? 'التوثيق الأمني وفحص المتقدمين بالذكاء' : 'Commercial registry verification'}
                </p>
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white">20,000 EGP (11%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Regional & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Regional Distribution */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>{isAr ? 'التوزيع الجغرافي للمرشحين والوظائف' : 'Geographic Distribution (MENA)'}</span>
          </h3>

          <div className="space-y-3 text-xs">
            {regions.map((reg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold">
                  <span className="truncate">{reg.name}</span>
                  <span className="font-mono text-slate-900 dark:text-white shrink-0 font-bold">
                    {reg.count} ({reg.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${reg.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Category Distribution */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span>{isAr ? 'توزيع الوظائف حسب التخصص المهني' : 'Job Category Breakdown'}</span>
          </h3>

          <div className="space-y-3 text-xs">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold">
                  <span className="truncate">{cat.name}</span>
                  <span className="font-mono text-slate-900 dark:text-white shrink-0 font-bold">
                    {cat.count} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
