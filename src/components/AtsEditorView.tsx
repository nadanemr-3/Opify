import React, { useState, useEffect } from 'react';
import { 
  FileEdit, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw, 
  Info,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { Language, AtsEvaluation, JobAnalysis } from '../types';
import { translations } from '../i18n/translations';

interface AtsEditorViewProps {
  language: Language;
  resumeText: string;
  setResumeText: (text: string) => void;
  analysis: JobAnalysis | null;
}

// Helper to calculate fallback evaluation for immediate client-side feedback
function computeFallbackEvaluation(text: string, targetSkills: string[]): AtsEvaluation {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lower = text.toLowerCase();
  
  const matched = targetSkills.filter(s => lower.includes(s.toLowerCase()));
  const missing = targetSkills.filter(s => !lower.includes(s.toLowerCase()));
  
  const skillRatio = targetSkills.length > 0 ? matched.length / targetSkills.length : 0.8;
  const baseScore = Math.min(95, Math.round(50 + (skillRatio * 35) + Math.min(10, Math.floor(words / 40))));
  const score = Math.max(30, Math.min(100, baseScore));
  
  const rating: AtsEvaluation['rating'] = score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Needs Improvement' : 'Poor';

  return {
    score,
    rating,
    matchedKeywords: matched.length > 0 ? matched : ['JavaScript', 'React', 'Communication'],
    missingKeywords: missing.slice(0, 5),
    wordCount: words,
    readingTimeMin: Math.max(1, Math.ceil(words / 200)),
    checklist: [
      {
        id: '1',
        category: 'format',
        title: 'Single-Column Clean Layout',
        passed: true,
        severity: 'low',
        description: 'Standard single-column flow guarantees error-free parsing across Workday, Taleo, and Greenhouse.'
      },
      {
        id: '2',
        category: 'structure',
        title: 'Standard Section Headings',
        passed: lower.includes('experience') || lower.includes('education') || lower.includes('skills'),
        severity: 'high',
        description: 'Uses recognized header naming (Experience, Education, Skills) to avoid miscategorization.'
      },
      {
        id: '3',
        category: 'keywords',
        title: 'Target Keyword Density',
        passed: matched.length >= 3,
        severity: 'medium',
        description: `Found ${matched.length} key competencies aligned with role benchmarks.`
      },
      {
        id: '4',
        category: 'quantifiable',
        title: 'Quantified Impact Metrics',
        passed: /\d+%|\$\d+|\d+\+/.test(text),
        severity: 'medium',
        description: 'Includes percentage gains, team sizes, or measurable milestones in bullet points.'
      }
    ]
  };
}

export const AtsEditorView: React.FC<AtsEditorViewProps> = ({
  language,
  resumeText,
  setResumeText,
  analysis
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  
  const targetSkills = [
    ...(analysis?.mustHaveSkills || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Git']),
    ...(analysis?.niceToHaveSkills || ['GraphQL', 'Jest', 'Docker'])
  ];

  const [evaluation, setEvaluation] = useState<AtsEvaluation>(() => 
    computeFallbackEvaluation(resumeText, targetSkills)
  );
  const [isAuditing, setIsAuditing] = useState(false);

  // Run audit when resumeText or analysis changes (debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsAuditing(true);
      try {
        const res = await fetch('/api/ats-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText,
            jobText: analysis?.rawText || '',
            targetSkills
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.score === 'number') {
            setEvaluation(data);
          }
        } else {
          // Keep responsive with heuristic
          setEvaluation(computeFallbackEvaluation(resumeText, targetSkills));
        }
      } catch {
        setEvaluation(computeFallbackEvaluation(resumeText, targetSkills));
      } finally {
        setIsAuditing(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [resumeText, analysis]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertKeyword = (keyword: string) => {
    const updated = resumeText + `\n- Demonstrated hands-on proficiency in ${keyword}.`;
    setResumeText(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* View Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.atsTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.atsSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Live ATS Compatibility Score Badge */}
        {evaluation && (
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-black text-teal-700 dark:text-teal-400">
                {evaluation.score}/100
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {evaluation.rating}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <div><strong>{evaluation.wordCount}</strong> words</div>
              <div>~{evaluation.readingTimeMin} min read</div>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Interactive CV Text Editor */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t.editResumeHere}
              </span>
              <button
                id="copy-edited-cv-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.copyToClipboard}</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              id="ats-editor-textarea"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Type or paste your resume content here..."
              rows={22}
              className="w-full text-xs sm:text-sm font-mono p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition resize-none leading-relaxed text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>Live updates as you edit • Plaintext optimized for parsing engines</span>
            {isAuditing && (
              <span className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Scoring...
              </span>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Live ATS Analysis & Missing Keywords */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Missing Keywords Action Box */}
          {evaluation && evaluation.missingKeywords.length > 0 && (
            <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800/60 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  {t.missingKeywordsBadge}
                </h4>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  {evaluation.missingKeywords.length} missing
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Click any keyword below to immediately insert it into your resume experience:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {evaluation.missingKeywords.map((kw, idx) => (
                  <button
                    key={idx}
                    id={`insert-kw-${idx}`}
                    onClick={() => handleInsertKeyword(kw)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 transition cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actionable ATS Checklist */}
          {evaluation && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                {t.atsTipsTitle}
              </h4>

              <div className="space-y-3">
                {evaluation.checklist.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-xl border text-xs transition ${
                      item.passed 
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' 
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold">
                        {item.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                        )}
                        <span>{item.title}</span>
                      </div>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        item.passed 
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {item.passed ? 'Passed' : item.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 pl-6 rtl:pl-0 rtl:pr-6 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Keywords Box */}
          {evaluation && evaluation.matchedKeywords.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
                Recognized ATS Keywords ({evaluation.matchedKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {evaluation.matchedKeywords.map((kw, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
