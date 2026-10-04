import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  DollarSign, 
  Zap,
  Train,
  Sparkles,
  Calculator
} from 'lucide-react';
import { Language } from '../../types';
import { employerCommuteStats } from '../../data/employerData';

interface EmployerAnalyticsTabProps {
  language: Language;
}

export const EmployerAnalyticsTab: React.FC<EmployerAnalyticsTabProps> = ({ language }) => {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [officeDistrict, setOfficeDistrict] = useState<string>('Maadi');
  const [avgSalaryEgp, setAvgSalaryEgp] = useState<number>(12000);

  // Proximity ROI calculations
  const estimatedHiresPerYear = Math.round(teamSize * 0.28);
  const turnoverSaved = Math.round(estimatedHiresPerYear * 0.44);
  const onboardingCostPerEmployee = Math.round(avgSalaryEgp * 1.5);
  const annualSavingsEgp = turnoverSaved * onboardingCostPerEmployee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>{language === 'ar' ? 'تحليلات القرب الجغرافي والعائد على الاستثمار' : 'Proximity & Commute Retention ROI'}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-black">
            Opify Intelligence
          </span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {language === 'ar'
            ? 'دراسات حية تثبت أثر تقليل مسافة المواصلات على خفض معدل الاستقالة، رفع التزام الحضور، وتوفير تكاليف إعادة التوظيف.'
            : 'Data proving how hyperlocal hiring in Cairo slashes employee turnover, eliminates interview ghosting, and saves recruitment costs.'}
        </p>
      </div>

      {/* Hero Benchmark Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: 44% Lower Turnover */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent border border-teal-200 dark:border-teal-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {language === 'ar' ? 'انخفاض الدوران الوظيفي' : 'Turnover Reduction'}
            </span>
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-700 dark:text-teal-300">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-teal-700 dark:text-teal-300">
              -{employerCommuteStats.proximityTurnoverReductionPct}%
            </span>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
              {language === 'ar'
                ? 'الموظفون الذين يسكنون على بعد أقل من 5 كم يظلون في وظائفهم لفترة أطول بمعدل الضعف مقارنة بالقاطنين عبر أطراف القاهرة.'
                : 'Employees living within 5 km stay 2.1x longer compared to those commuting 20+ km across Cairo.'}
            </p>
          </div>
        </div>

        {/* Card 2: 94% Interview Show-Up Rate */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200 dark:border-blue-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              {language === 'ar' ? 'نسبة حضور المقابلات' : 'Interview Attendance'}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-blue-700 dark:text-blue-300">
              {employerCommuteStats.interviewAttendanceRatePct}%
            </span>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
              {language === 'ar'
                ? 'القرب من محطات المترو يلغي ظاهرة تخلف المرشحين عن الحضور (No-Show) ويوفر وقت لجان التوظيف.'
                : 'Zero interview ghosting. Candidates with simple commutes show up on time with 94% reliability.'}
            </p>
          </div>
        </div>

        {/* Card 3: 6.8 Days to Hire */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-200 dark:border-purple-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              {language === 'ar' ? 'سرعة إغلاق الشواغر' : 'Speed to Hire'}
            </span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-purple-700 dark:text-purple-300">
                {employerCommuteStats.averageTimeToHireDays}
              </span>
              <span className="text-xs text-slate-400 line-through">24 days</span>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
              {language === 'ar'
                ? 'إغلاق الشواغر خلال أقل من أسبوع بفضل المطابقة التلقائية مع الكفاءات الجاهزة في نفس الحي.'
                : 'Filled in under 7 days versus the 24-day Egyptian market average for retail and engineering.'}
            </p>
          </div>
        </div>
      </div>

      {/* Commute Time Distribution Bars */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{language === 'ar' ? 'توزيع زمن وصول المتقدمين لمقر العمل' : 'Applicant Door-to-Door Transit Time Distribution'}</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">
            Greater Cairo Network
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {/* Bar 1: < 15 mins */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>{language === 'ar' ? 'أقل من 15 دقيقة (سير أو محطة واحدة)' : '< 15 mins (Walkable or 1 Metro Stop)'}</span>
              </span>
              <span className="font-bold text-emerald-600">34% of applicants</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '34%' }}></div>
            </div>
          </div>

          {/* Bar 2: 15-30 mins */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>{language === 'ar' ? '15 إلى 30 دقيقة (2-4 محطات مترو)' : '15 to 30 mins (2-4 Metro Stations)'}</span>
              </span>
              <span className="font-bold text-blue-600">48% of applicants (Sweet spot)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>

          {/* Bar 3: 30-45 mins */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>{language === 'ar' ? '30 إلى 45 دقيقة (تبديل خطوط)' : '30 to 45 mins (Line Transfer)'}</span>
              </span>
              <span className="font-bold text-amber-600">14% of applicants</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '14%' }}></div>
            </div>
          </div>

          {/* Bar 4: > 45 mins */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>{language === 'ar' ? 'أكثر من 45 دقيقة (أطراف المحافظة)' : '> 45 mins (Far Suburbs)'}</span>
              </span>
              <span className="font-bold text-rose-600">4% of applicants</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '4%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Egyptian Company Commute & Savings Calculator */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white space-y-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 text-white backdrop-blur-xs">
            <Calculator className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'حاسبة العائد والوفر المالي لمقر شركتك' : 'Company Retention & Annual Savings Calculator'}
            </h3>
            <p className="text-xs text-blue-200">
              {language === 'ar'
                ? 'احسب كم ستوفر شركتك سنوياً عند استبدال التوظيف العشوائي بالتوظيف القائم على رادار القرب الجغرافي.'
                : 'Calculate how much your company saves each year by hiring locally through Opify.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Team size slider */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between text-xs font-bold text-blue-200">
              <span>{language === 'ar' ? 'حجم فريق العمل:' : 'Current Team Size:'}</span>
              <span className="text-white font-extrabold">{teamSize} {language === 'ar' ? 'موظف' : 'members'}</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-blue-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
          </div>

          {/* Average Salary */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between text-xs font-bold text-blue-200">
              <span>{language === 'ar' ? 'متوسط الراتب الشهري:' : 'Avg Monthly Salary:'}</span>
              <span className="text-white font-extrabold">{avgSalaryEgp.toLocaleString()} EGP</span>
            </div>
            <input
              type="range"
              min="5000"
              max="60000"
              step="1000"
              value={avgSalaryEgp}
              onChange={(e) => setAvgSalaryEgp(Number(e.target.value))}
              className="w-full accent-blue-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
          </div>

          {/* District select */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <label className="text-xs font-bold text-blue-200 block">
              {language === 'ar' ? 'حي المقر الرئيسي:' : 'Headquarters District:'}
            </label>
            <select
              value={officeDistrict}
              onChange={(e) => setOfficeDistrict(e.target.value)}
              className="w-full py-1 px-2.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white focus:outline-hidden font-medium"
            >
              <option value="Maadi" className="text-slate-900">Maadi (Line 1)</option>
              <option value="New Cairo" className="text-slate-900">New Cairo (Monorail)</option>
              <option value="Dokki" className="text-slate-900">Dokki (Line 2)</option>
              <option value="Nasr City" className="text-slate-900">Nasr City (Line 3)</option>
              <option value="Heliopolis" className="text-slate-900">Heliopolis (Line 3)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Computed Savings */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-[11px] text-blue-200 block font-semibold">
              {language === 'ar' ? 'استقالات تم تفاديها سنوياً:' : 'Turnovers Prevented:'}
            </span>
            <span className="text-2xl font-black text-emerald-400">
              ~{turnoverSaved} {language === 'ar' ? 'موظفين' : 'employees'}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-blue-200 block font-semibold">
              {language === 'ar' ? 'ساعات إجهاد مروري تم توفيرها أسبوعياً:' : 'Weekly Traffic Stress Hours Saved:'}
            </span>
            <span className="text-2xl font-black text-amber-300">
              {Math.round(teamSize * 5.5)} {language === 'ar' ? 'ساعة' : 'hours'}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-blue-200 block font-semibold">
              {language === 'ar' ? 'الوفر المالي المباشر في التوظيف:' : 'Annual Recruitment Savings:'}
            </span>
            <span className="text-2xl font-black text-white">
              {annualSavingsEgp.toLocaleString()} EGP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
