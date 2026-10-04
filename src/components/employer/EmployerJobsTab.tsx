import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Users, 
  Calendar, 
  Zap, 
  PlusCircle, 
  Search, 
  Filter, 
  Pause, 
  Play, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Train,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { EmployerManagedJob } from '../../data/employerData';

interface EmployerJobsTabProps {
  language: Language;
  jobs: EmployerManagedJob[];
  onOpenPostJob: () => void;
  onToggleStatus: (jobId: string) => void;
  onToggleBoost: (jobId: string) => void;
  onViewApplicants: (jobId: string) => void;
}

export const EmployerJobsTab: React.FC<EmployerJobsTabProps> = ({
  language,
  jobs,
  onOpenPostJob,
  onToggleStatus,
  onToggleBoost,
  onViewApplicants
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'إدارة إعلانات الوظائف' : 'Active Job Postings & Pipeline'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar' 
              ? 'متابعة الوظائف المنشورة، فحص طلبات المتقدمين، وتفعيل رادار الأولوية الجغرافي.' 
              : 'Manage open listings, track candidate response velocity, and boost hyperlocal proximity radar.'}
          </p>
        </div>

        <button
          onClick={onOpenPostJob}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.employerCtaPostJob}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'ar' ? 'البحث في المسمى، القسم، أو المنطقة...' : 'Search role, department, or district...'}
            className="w-full ps-9 pe-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'active', 'paused'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {st === 'all' ? (language === 'ar' ? 'الكل' : 'All') : 
               st === 'active' ? (language === 'ar' ? 'نشطة' : 'Active') :
               (language === 'ar' ? 'متوقفة مؤقتاً' : 'Paused')}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-3.5">
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {language === 'ar' ? 'لم يتم العثور على وظائف مطابقة' : 'No matching jobs found'}
            </p>
            <button
              onClick={onOpenPostJob}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {language === 'ar' ? 'انشر وظيفة جديدة الآن' : 'Post a new job now'}
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {job.title}
                    </h3>

                    {/* Status Badge */}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      job.status === 'active'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {job.status === 'active' 
                        ? (language === 'ar' ? 'نشطة ومتوفرة' : 'Active') 
                        : (language === 'ar' ? 'متوقفة مؤقتاً' : 'Paused')}
                    </span>

                    {/* Boost Badge */}
                    {job.isBoosted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] font-extrabold">
                        <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />
                        <span>{language === 'ar' ? 'رادار أولوية' : 'Radar Boosted'}</span>
                      </span>
                    )}

                    <span className="text-[11px] font-medium text-slate-400">
                      {job.department}
                    </span>
                  </div>

                  {/* Location & Metro proximity */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{job.district}</span>
                    </span>

                    {job.nearestMetro && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        <Train className="w-3 h-3 text-emerald-600" />
                        <span>{job.nearestMetro}</span>
                      </span>
                    )}

                    <span className="text-slate-600 dark:text-slate-300 font-bold">
                      {job.salary}
                    </span>

                    <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                      {job.workMode}
                    </span>
                  </div>
                </div>

                {/* Candidate Funnel Stats */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => onViewApplicants(job.id)}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? `المتقدمين (${job.applicantsCount})` : `Applicants (${job.applicantsCount})`}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>

              {/* Pipeline summary line */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="text-[11px]">{language === 'ar' ? 'فحص الذكاء الاصطناعي:' : 'AI Screened:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{job.aiScreenedCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="text-[11px]">{language === 'ar' ? 'المقابلات:' : 'Interviews:'}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{job.interviewsCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="text-[11px]">{language === 'ar' ? 'تم التعيين:' : 'Hired:'}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.hiredCount}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onToggleBoost(job.id)}
                    className={`text-[11px] font-bold transition cursor-pointer ${
                      job.isBoosted 
                        ? 'text-purple-600 dark:text-purple-400 hover:underline'
                        : 'text-slate-500 hover:text-purple-600'
                    }`}
                  >
                    {job.isBoosted 
                      ? (language === 'ar' ? 'إلغاء التمييز' : 'Boosted ✓') 
                      : (language === 'ar' ? '⚡ تمييز بالرادار' : '⚡ Boost Radar')}
                  </button>

                  <span className="text-slate-300">|</span>

                  <button
                    onClick={() => onToggleStatus(job.id)}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                  >
                    {job.status === 'active' 
                      ? (language === 'ar' ? 'إيقاف مؤقت' : 'Pause') 
                      : (language === 'ar' ? 'إعادة تفعيل' : 'Resume')}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
