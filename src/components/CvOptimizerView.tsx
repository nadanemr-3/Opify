import React, { useState } from 'react';
import { 
  FileCheck, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  TrendingUp, 
  Hash, 
  Scissors, 
  Layout, 
  Edit3
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Button, Badge } from './ui';

interface CvOptimizerViewProps {
  language: Language;
  resumeText: string;
  onResumeChange: (text: string) => void;
  onOpenLiveEditor: () => void;
}

export const CvOptimizerView: React.FC<CvOptimizerViewProps> = ({
  language,
  resumeText,
  onResumeChange,
  onOpenLiveEditor
}) => {
  const t = translations[language];
  const [atsScore, setAtsScore] = useState(82);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onResumeChange(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const recommendations = [
    {
      id: 'summary',
      title: t.recSummary,
      desc: t.recSummaryDesc,
      icon: Edit3,
      status: 'action_needed',
      impact: '+5 pts'
    },
    {
      id: 'achievements',
      title: t.recAchievements,
      desc: t.recAchievementsDesc,
      icon: TrendingUp,
      status: 'action_needed',
      impact: '+8 pts'
    },
    {
      id: 'keywords',
      title: t.recKeywords,
      desc: t.recKeywordsDesc,
      icon: Hash,
      status: 'action_needed',
      impact: '+6 pts'
    },
    {
      id: 'formatting',
      title: t.recFormatting,
      desc: t.recFormattingDesc,
      icon: Layout,
      status: 'passed',
      impact: 'Passed'
    },
    {
      id: 'unnecessary',
      title: t.recUnnecessary,
      desc: t.recUnnecessaryDesc,
      icon: Scissors,
      status: 'action_needed',
      impact: '+3 pts'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="brand" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
          ATS Compatibility Engine
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.cvOptimizerHeadline}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t.cvOptimizerSub}
        </p>
      </div>

      {/* Main Grid: Upload & ATS Score Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Upload / Paste Resume */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-blue" />
              <span>{language === 'ar' ? 'سيرتك الذاتية الحالية' : 'Your Resume Content'}</span>
            </h3>

            {/* Drag & Drop Box */}
            <label className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-blue transition group">
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-brand-blue transition mb-2" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {t.uploadCvBtn}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.dragDropText}
              </p>
              <input
                type="file"
                accept=".txt,.md,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Or Paste Raw Text */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {language === 'ar' ? 'أو عدّل نص السيرة مباشرة:' : 'Or inspect/edit resume text:'}
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => onResumeChange(e.target.value)}
                rows={8}
                placeholder="Paste your CV text here..."
                className="w-full text-xs p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue font-mono leading-relaxed"
              />
            </div>

            <Button
              onClick={onOpenLiveEditor}
              variant="primary"
              size="lg"
              className="w-full shadow-md shadow-brand-blue/20"
              icon={<ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />}
            >
              <span>{t.ctaOptimizeCvNow}</span>
            </Button>
          </div>
        </div>

        {/* Right Column: ATS Score & 5 Specific Recommendations */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* ATS Score Card: 82/100 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white shadow-xl border border-blue-800/40 relative overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  {t.atsScoreLabel}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black tracking-tight text-white">
                    {atsScore}
                  </span>
                  <span className="text-xl font-bold text-blue-300">/ 100</span>
                </div>
                <p className="text-xs text-blue-200/80 mt-1">
                  {language === 'ar' ? 'أعلى من ٧٤٪ من المتقدمين لنفس المسميات' : 'Beats 74% of candidate profiles in the regional pool'}
                </p>
              </div>

              {/* Circular Gauge / Badge */}
              <div className="w-20 h-20 rounded-full border-4 border-blue-400/30 border-t-blue-400 flex items-center justify-center font-extrabold text-sm text-blue-300">
                Top 26%
              </div>
            </div>
          </div>

          {/* 5 Concrete Recommendations */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {t.recommendationsTitle}
            </h3>

            <div className="space-y-2.5">
              {recommendations.map((rec) => {
                const Icon = rec.icon;
                const isPassed = rec.status === 'passed';
                return (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isPassed 
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {rec.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {rec.desc}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={isPassed ? 'success' : 'warning'}
                      size="sm"
                      className="shrink-0"
                    >
                      {rec.impact}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
