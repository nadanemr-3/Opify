import React from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Zap,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { employerCommuteStats } from '../../data/employerData';

interface EmployerStatCardsProps {
  language: Language;
  activeJobsCount: number;
  totalApplicantsCount: number;
  interviewsCount: number;
}

export const EmployerStatCards: React.FC<EmployerStatCardsProps> = ({
  language,
  activeJobsCount,
  totalApplicantsCount,
  interviewsCount
}) => {
  const t = translations[language];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Active Jobs */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t.employerStatActiveJobs}
          </span>
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {activeJobsCount}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold">● Live</span>
        </div>
      </div>

      {/* 2. Total Applicants */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t.employerStatTotalApplicants}
          </span>
          <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalApplicantsCount}
          </span>
          <span className="text-[10px] text-purple-600 font-medium">+14 this wk</span>
        </div>
      </div>

      {/* 3. Interviews Scheduled */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t.employerStatInterviews}
          </span>
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {interviewsCount}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold">94% show-up</span>
        </div>
      </div>

      {/* 4. Avg Commute Time */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t.employerStatAvgCommute}
          </span>
          <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {employerCommuteStats.averageCommuteMinutes}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {language === 'ar' ? 'دقيقة' : 'mins'}
          </span>
        </div>
      </div>

      {/* 5. Turnover Reduction */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t.employerStatTurnoverCut}
          </span>
          <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
            -{employerCommuteStats.proximityTurnoverReductionPct}%
          </span>
          <span className="text-[10px] text-slate-400">vs Cairo avg</span>
        </div>
      </div>

      {/* 6. Avg Time to Hire */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {t.employerStatTimeToHire}
          </span>
          <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <Zap className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {employerCommuteStats.averageTimeToHireDays}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {language === 'ar' ? 'أيام' : 'days'}
          </span>
        </div>
      </div>
    </div>
  );
};
