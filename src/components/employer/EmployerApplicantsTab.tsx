import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Train, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Phone, 
  Mail, 
  ChevronRight, 
  Filter, 
  Search, 
  ArrowUpDown,
  ShieldCheck,
  Compass,
  FileText,
  DollarSign
} from 'lucide-react';
import { Language, EmployerApplicant, ApplicantStage } from '../../types';
import { translations } from '../../i18n/translations';
import { EmployerManagedJob } from '../../data/employerData';

interface EmployerApplicantsTabProps {
  language: Language;
  applicants: EmployerApplicant[];
  jobs: EmployerManagedJob[];
  selectedJobId: string | null;
  onSelectJobId: (id: string | null) => void;
  onUpdateApplicantStage: (applicantId: string, stage: ApplicantStage) => void;
  onOpenScheduleInterview: (applicant: EmployerApplicant) => void;
  onOpenCandidateDetail: (applicant: EmployerApplicant) => void;
}

export const EmployerApplicantsTab: React.FC<EmployerApplicantsTabProps> = ({
  language,
  applicants,
  jobs,
  selectedJobId,
  onSelectJobId,
  onUpdateApplicantStage,
  onOpenScheduleInterview,
  onOpenCandidateDetail
}) => {
  const t = translations[language];
  const [stageFilter, setStageFilter] = useState<'all' | ApplicantStage>('all');
  const [commuteFilter, setCommuteFilter] = useState<'all' | 'under_2km' | 'under_5km'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplicants = applicants.filter(app => {
    const matchesJob = !selectedJobId || app.jobId === selectedJobId;
    const matchesStage = stageFilter === 'all' || app.stage === stageFilter;
    const matchesCommute = commuteFilter === 'all' ? true :
      commuteFilter === 'under_2km' ? app.distanceKm <= 2.0 :
      app.distanceKm <= 5.0;
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesStage && matchesCommute && matchesSearch;
  });

  const stages: { key: 'all' | ApplicantStage; labelEn: string; labelAr: string }[] = [
    { key: 'all', labelEn: 'All Applicants', labelAr: 'جميع المتقدمين' },
    { key: 'applied', labelEn: 'New Applied', labelAr: 'طلبات جديدة' },
    { key: 'shortlisted', labelEn: 'AI Shortlisted', labelAr: 'تصفية الذكاء الاصطناعي' },
    { key: 'interview', labelEn: 'Interview', labelAr: 'المقابلة' },
    { key: 'offer', labelEn: 'Offer Extended', labelAr: 'عرض عمل' },
    { key: 'rejected', labelEn: 'Archived / Rejected', labelAr: 'مستبعد' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{language === 'ar' ? 'رادار المتقدمين وإدارة التوظيف (ATS)' : 'Applicant Radar & Pipeline (ATS)'}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-black">
              {filteredApplicants.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar'
              ? 'فرز المتقدمين بناءً على زمن المواصلات الفعلي، مطابقة المهارات المؤكدة، والتحقق من السيرة الذاتية.'
              : 'Screen and advance candidates based on real door-to-door transit time, proven skills, and verified profiles.'}
          </p>
        </div>

        {/* Job selector dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            {language === 'ar' ? 'تصفية حسب الوظيفة:' : 'Filter by Job:'}
          </label>
          <select
            value={selectedJobId || 'all'}
            onChange={(e) => onSelectJobId(e.target.value === 'all' ? null : e.target.value)}
            className="text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">{language === 'ar' ? 'جميع الوظائف المعروضة' : 'All Posted Jobs'}</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title} ({j.applicantsCount})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Bar: Search, Stages, and Commute Radius */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'ar' ? 'بحث بالاسم، المهارات (React, POS, English)...' : 'Search candidate name, skills (React, POS, English)...'}
              className="w-full ps-9 pe-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Commute Radius quick buttons */}
          <div className="flex items-center gap-1.5 self-start md:self-auto">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 me-1">
              <Compass className="w-3.5 h-3.5 text-blue-500" />
              <span>{language === 'ar' ? 'المسافة:' : 'Radius:'}</span>
            </span>
            <button
              onClick={() => setCommuteFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                commuteFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'Any'}
            </button>
            <button
              onClick={() => setCommuteFilter('under_2km')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                commuteFilter === 'under_2km'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              &lt; 2 km (Walking/Quick)
            </button>
            <button
              onClick={() => setCommuteFilter('under_5km')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                commuteFilter === 'under_5km'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              &lt; 5 km (Metro line)
            </button>
          </div>
        </div>

        {/* Stage Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-100 dark:border-slate-800">
          {stages.map(st => {
            const count = applicants.filter(a => {
              const matchesJob = !selectedJobId || a.jobId === selectedJobId;
              return matchesJob && (st.key === 'all' ? true : a.stage === st.key);
            }).length;

            return (
              <button
                key={st.key}
                onClick={() => setStageFilter(st.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  stageFilter === st.key
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{language === 'ar' ? st.labelAr : st.labelEn}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  stageFilter === st.key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-3.5">
        {filteredApplicants.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {language === 'ar' ? 'لا يوجد متقدمين يطابقون هذه الفلاتر' : 'No applicants match the selected filters'}
            </p>
            <button
              onClick={() => {
                setStageFilter('all');
                setCommuteFilter('all');
                setSearchTerm('');
                onSelectJobId(null);
              }}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset all filters'}
            </button>
          </div>
        ) : (
          filteredApplicants.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Candidate Info & Commute */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={app.avatar}
                    alt={app.candidateName}
                    referrerPolicy="no-referrer"
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {app.candidateName}
                      </h3>
                      <span className="text-xs font-medium text-slate-400">
                        for <strong className="text-slate-700 dark:text-slate-300">{app.jobTitle}</strong>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{app.truthScore}% Verified</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {app.headline}
                    </p>

                    {/* Proximity & Transit highlight */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-semibold border border-blue-200 dark:border-blue-800">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        <span>{app.candidateLocation} ({app.distanceKm} km away)</span>
                      </div>

                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
                        <Train className="w-3 h-3 text-emerald-600" />
                        <span>{app.commuteTransitMode}</span>
                      </div>

                      <span className="text-[11px] text-slate-500 font-medium">
                        {language === 'ar' ? 'الراتب المتوقع:' : 'Expected:'} <strong className="text-slate-700 dark:text-slate-200">{app.expectedSalary}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Match Gauge & Quick Action Panel */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  {/* AI Match Score */}
                  <div className="flex items-center gap-2">
                    <div className="text-end hidden sm:block">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        AI Match Fit
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        {language === 'ar' ? 'توافق فائق' : 'High Proximity & Skills'}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center font-black text-emerald-600 dark:text-emerald-400">
                      <span className="text-sm leading-none">{app.aiMatchScore}%</span>
                      <span className="text-[8px] uppercase tracking-tighter">Match</span>
                    </div>
                  </div>

                  {/* Stage Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">
                      {language === 'ar' ? 'المرحلة:' : 'Stage:'}
                    </label>
                    <select
                      value={app.stage}
                      onChange={(e) => onUpdateApplicantStage(app.id, e.target.value as ApplicantStage)}
                      className="text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="applied">{language === 'ar' ? 'طلب جديد' : 'New Applied'}</option>
                      <option value="shortlisted">{language === 'ar' ? 'تصفية أولية' : 'Shortlisted'}</option>
                      <option value="interview">{language === 'ar' ? 'مقابلة مجدولة' : 'Interview'}</option>
                      <option value="offer">{language === 'ar' ? 'عرض عمل' : 'Offer Extended'}</option>
                      <option value="rejected">{language === 'ar' ? 'استبعاد' : 'Rejected'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* AI Match Highlights & Skills Chips */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'أسباب توصية الذكاء الاصطناعي:' : 'Opify Proximity & Qualification Rationale:'}</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  {app.matchHighlights.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {app.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{language === 'ar' ? 'تاريخ التقديم:' : 'Applied:'} {app.appliedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCandidateDetail(app)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{language === 'ar' ? 'التحليل التفصيلي والأسئلة' : 'AI Breakdown & Questions'}</span>
                  </button>

                  <button
                    onClick={() => onOpenScheduleInterview(app)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تحديد موعد المقابلة' : 'Schedule Interview'}</span>
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
