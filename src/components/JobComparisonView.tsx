import React from 'react';
import { 
  Columns3, 
  Trash2, 
  Building2, 
  MapPin, 
  Banknote, 
  TrendingUp, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck,
  Plus,
  Sparkles
} from 'lucide-react';
import { JobAnalysis, Language } from '../types';
import { translations } from '../i18n/translations';
import { sampleDatasets } from '../data/samples';

interface JobComparisonViewProps {
  language: Language;
  comparedJobs: { job: JobAnalysis; score?: number }[];
  onRemoveJob: (id: string) => void;
  onClearComparison: () => void;
  onLoadSamples: () => void;
}

export const JobComparisonView: React.FC<JobComparisonViewProps> = ({
  language,
  comparedJobs,
  onRemoveJob,
  onClearComparison,
  onLoadSamples
}) => {
  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
            <Columns3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.comparisonTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.comparisonSubtitle}
            </p>
          </div>
        </div>

        {comparedJobs.length > 0 && (
          <button
            id="clear-comparison-btn"
            onClick={onClearComparison}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800 transition cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearComparison}</span>
          </button>
        )}
      </div>

      {/* Comparison Grid or Empty State */}
      {comparedJobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-xs space-y-4">
          <Columns3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {t.noJobsToCompare}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Analyze job postings in the JD Decoder and click "Add to Comparison" to contrast them side-by-side.
            </p>
          </div>
          <button
            id="load-sample-comparison-btn"
            onClick={onLoadSamples}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white transition cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load 2 Sample Jobs to Compare</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparedJobs.map(({ job, score }, idx) => (
            <div 
              key={job.id || idx}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Card Top: Title & Delete */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {job.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveJob(job.id)}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded-lg transition cursor-pointer"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Score & Fit Badge */}
                <div className="mt-3 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Match Score
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-extrabold text-teal-800 dark:text-teal-400">
                    <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>{score ? `${score}%` : 'Not scored'}</span>
                  </div>
                </div>

                {/* Key Metrics List */}
                <div className="mt-4 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-700/50">
                    <span className="text-slate-500 dark:text-slate-400">Location:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-700/50">
                    <span className="text-slate-500 dark:text-slate-400">Work Mode:</span>
                    <span className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                      job.workMode === 'Remote' ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300' :
                      job.workMode === 'Hybrid' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {job.workMode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-700/50">
                    <span className="text-slate-500 dark:text-slate-400">Seniority:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{job.seniority}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-700/50">
                    <span className="text-slate-500 dark:text-slate-400">Salary Range:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{job.salary.stated !== 'Disclosed upon interview' ? job.salary.stated : job.salary.estimated}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-700/50">
                    <span className="text-slate-500 dark:text-slate-400">Safety Check:</span>
                    <span className="font-semibold flex items-center gap-1">
                      {job.redFlags.isSuspicious ? (
                        <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          Suspicious
                        </span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          Verified
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Core Skills Required */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Must-Have Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.mustHaveSkills.slice(0, 5).map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Priority Recommendation Tag */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Priority Index:</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                  {score && score >= 80 ? '🔥 High Fit & Value' : '⚡ Moderate Alignment'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
