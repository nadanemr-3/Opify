import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Copy, 
  Check, 
  BookmarkPlus, 
  FileEdit, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  Building2, 
  Banknote,
  ArrowRight,
  RefreshCw,
  Scale
} from 'lucide-react';
import { JobAnalysis, ResumeMatch, Language } from '../types';
import { translations } from '../i18n/translations';

interface JdDecoderViewProps {
  language: Language;
  jobText: string;
  setJobText: (text: string) => void;
  resumeText: string;
  setResumeText: (text: string) => void;
  analysis: JobAnalysis | null;
  matchResult: ResumeMatch | null;
  isAnalyzing: boolean;
  isMatching: boolean;
  onAnalyze: () => void;
  onMatch: () => void;
  onSaveToTracker: (job: JobAnalysis, score?: number) => void;
  onAddToComparison: (job: JobAnalysis) => void;
  onOpenInAtsEditor: () => void;
  onGenerateCoverLetter: (tone: 'Professional' | 'Confident' | 'Early-Career') => void;
  isGeneratingLetter: boolean;
}

export const JdDecoderView: React.FC<JdDecoderViewProps> = ({
  language,
  jobText,
  setJobText,
  resumeText,
  setResumeText,
  analysis,
  matchResult,
  isAnalyzing,
  isMatching,
  onAnalyze,
  onMatch,
  onSaveToTracker,
  onAddToComparison,
  onOpenInAtsEditor,
  onGenerateCoverLetter,
  isGeneratingLetter
}) => {
  const t = translations[language];
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'Professional' | 'Confident' | 'Early-Career'>('Professional');
  const [trackerSaved, setTrackerSaved] = useState(false);

  const handleCopyLetter = () => {
    if (matchResult?.coverLetter) {
      navigator.clipboard.writeText(matchResult.coverLetter);
      setCopiedLetter(true);
      setTimeout(() => setCopiedLetter(false), 2200);
    }
  };

  const handleTrackerClick = () => {
    if (analysis) {
      onSaveToTracker(analysis, matchResult?.overallScore);
      setTrackerSaved(true);
      setTimeout(() => setTrackerSaved(false), 2500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setResumeText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Input Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Job Description Input */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="jd-textarea" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                {t.jdInputTitle}
              </label>
              {jobText && (
                <button
                  type="button"
                  onClick={() => setJobText('')}
                  className="text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  {t.clear}
                </button>
              )}
            </div>
            <textarea
              id="jd-textarea"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder={t.jdInputPlaceholder}
              rows={9}
              className="w-full text-sm p-3.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition resize-none leading-relaxed text-slate-800"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {jobText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              id="decode-jd-btn"
              type="button"
              disabled={isAnalyzing || !jobText.trim()}
              onClick={onAnalyze}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-teal-700 hover:bg-teal-800 text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-teal-700/20 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t.analyzeJob}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Resume Input */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="resume-textarea" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-emerald-600" />
                {t.resumeInputTitle}
              </label>
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-teal-700 hover:text-teal-800 transition cursor-pointer underline">
                  {t.orUploadFile}
                  <input
                    type="file"
                    accept=".txt,.md,.rtf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {resumeText && (
                  <button
                    type="button"
                    onClick={() => setResumeText('')}
                    className="text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  >
                    {t.clear}
                  </button>
                )}
              </div>
            </div>
            <textarea
              id="resume-textarea"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={t.resumeInputPlaceholder}
              rows={9}
              className="w-full text-sm p-3.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none leading-relaxed text-slate-800"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {resumeText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              id="score-resume-btn"
              type="button"
              disabled={isMatching || !jobText.trim() || !resumeText.trim()}
              onClick={onMatch}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-600/20 cursor-pointer"
            >
              {isMatching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  {t.matching}
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  {t.matchResume}
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Analysis Output Container */}
      {analysis && (
        <div className="space-y-6">
          
          {/* Job Overview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {analysis.title}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                    {analysis.seniority}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    analysis.workMode === 'Remote' ? 'bg-indigo-100 text-indigo-800' :
                    analysis.workMode === 'Hybrid' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {analysis.workMode}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {analysis.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {analysis.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    {analysis.salary.stated !== 'Disclosed upon interview' ? analysis.salary.stated : analysis.salary.estimated}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  id="save-to-tracker-btn"
                  onClick={handleTrackerClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-teal-600" />
                  <span>{trackerSaved ? t.savedToTracker : t.saveToTracker}</span>
                </button>
                <button
                  id="add-to-comparison-btn"
                  onClick={() => onAddToComparison(analysis)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.addJobToCompare}</span>
                </button>
              </div>
            </div>

            {/* Red Flag & Scam Detection Banner */}
            <div className={`mt-5 p-4 rounded-xl border ${
              analysis.redFlags.isSuspicious 
                ? 'bg-rose-50 border-rose-200 text-rose-900' 
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-start gap-3">
                {analysis.redFlags.isSuspicious ? (
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">
                      {analysis.redFlags.isSuspicious ? t.suspiciousPosting : t.safePosting}
                    </h4>
                    {analysis.redFlags.riskScore > 0 && (
                      <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-rose-200 text-rose-800">
                        {t.riskScore}: {analysis.redFlags.riskScore}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1 leading-relaxed">
                    {analysis.redFlags.explanation}
                  </p>
                  {analysis.redFlags.flags.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs font-medium">
                      {analysis.redFlags.flags.map((flag, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-rose-800">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Responsibilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              
              {/* Must-Have Skills */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  {t.mustHaveSkills} ({analysis.mustHaveSkills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.mustHaveSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Nice-to-Have Skills */}
                {analysis.niceToHaveSkills.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {t.niceToHaveSkills} ({analysis.niceToHaveSkills.length})
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.niceToHaveSkills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-200/70 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Responsibilities */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  {t.responsibilities}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {analysis.responsibilities.slice(0, 5).map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Resume Match Breakdown Section */}
          {matchResult && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-18 h-18 rounded-2xl bg-teal-50 border-2 border-teal-500 text-teal-900 font-extrabold text-2xl shadow-inner">
                    {matchResult.overallScore}%
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {t.matchScore}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {matchResult.honestGuidance.fitSummary}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="font-semibold text-teal-700">
                        {t.mustHaveMatch}: {matchResult.mustHaveScore}%
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="font-semibold text-slate-600">
                        {t.niceToHaveMatch}: {matchResult.niceToHaveScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Link to ATS CV Editor */}
                <button
                  id="open-in-ats-editor-btn"
                  onClick={onOpenInAtsEditor}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer self-start sm:self-auto"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>{t.navAtsEditor}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Matched vs Missing Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Matched Skills */}
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {t.matchedSkillsList} ({matchResult.matchedSkills.length})
                  </h4>
                  <div className="space-y-2">
                    {matchResult.matchedSkills.map((item, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-lg border border-emerald-100 text-xs">
                        <div className="font-bold text-emerald-900">{item.skill}</div>
                        {item.evidence && (
                          <div className="text-[11px] text-slate-600 mt-0.5">{item.evidence}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-amber-600" />
                    {t.missingMustHaveList} ({matchResult.missingMustHave.length})
                  </h4>
                  {matchResult.missingMustHave.length > 0 ? (
                    <div className="space-y-2">
                      {matchResult.missingMustHave.map((skill, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-lg border border-amber-100 text-xs flex items-center justify-between">
                          <span className="font-bold text-slate-800">{skill}</span>
                          <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            Missing
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-700 font-medium">
                      ✓ No critical required skills are missing from your resume!
                    </p>
                  )}

                  {matchResult.missingNiceToHave.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-amber-100">
                      <div className="text-[11px] font-semibold text-slate-600 mb-1">
                        {t.missingNiceToList}:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.missingNiceToHave.map((skill, idx) => (
                          <span key={idx} className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Truth-Preserving Resume Guidance */}
              <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h4 className="text-sm font-bold text-indigo-950">
                      {t.truthPreservingTitle}
                    </h4>
                    <p className="text-xs text-indigo-800/80 mt-0.5">
                      {t.truthPreservingSub}
                    </p>

                    {/* Suggestions list */}
                    {matchResult.honestGuidance.truthPreservingSuggestions.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {matchResult.honestGuidance.truthPreservingSuggestions.map((sugg, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-500 line-through">
                                {sugg.originalConcept}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                                {sugg.category}
                              </span>
                            </div>
                            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-teal-800">
                              <ArrowRight className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span>{sugg.suggestedWording}</span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              💡 {sugg.why}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* What NOT to claim */}
                    {matchResult.honestGuidance.whatNotToClaim.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-indigo-200/80">
                        <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          {t.whatNotToClaim}:
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs text-rose-900">
                          {matchResult.honestGuidance.whatNotToClaim.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tailored Honest Cover Letter Section */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {t.coverLetterTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Authentically highlights your proven credentials for this position.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Tone Selector */}
                    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
                      {(['Professional', 'Confident', 'Early-Career'] as const).map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => {
                            setSelectedTone(tone);
                            onGenerateCoverLetter(tone);
                          }}
                          className={`px-2.5 py-1 rounded-md transition font-medium cursor-pointer ${
                            selectedTone === tone
                              ? 'bg-teal-700 text-white font-semibold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {tone === 'Professional' ? t.toneProfessional :
                           tone === 'Confident' ? t.toneConfident : t.toneEarlyCareer}
                        </button>
                      ))}
                    </div>

                    <button
                      id="copy-cover-letter-btn"
                      onClick={handleCopyLetter}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer shadow-2xs"
                    >
                      {copiedLetter ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.copyToClipboard}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  {isGeneratingLetter && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center rounded-xl z-10">
                      <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                        <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
                        <span>{t.generatingLetter}</span>
                      </div>
                    </div>
                  )}
                  <textarea
                    id="cover-letter-display"
                    value={matchResult.coverLetter}
                    readOnly
                    rows={8}
                    className="w-full text-xs font-mono p-4 rounded-xl border border-slate-200 bg-white text-slate-800 leading-relaxed resize-none focus:outline-hidden"
                  />
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
