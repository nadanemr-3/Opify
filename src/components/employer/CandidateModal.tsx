import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Train, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  Save, 
  Check, 
  CheckCircle2, 
  HelpCircle,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { Language, EmployerApplicant } from '../../types';

interface CandidateModalProps {
  language: Language;
  applicant: EmployerApplicant | null;
  onClose: () => void;
  onOpenSchedule: (applicant: EmployerApplicant) => void;
  onSaveNotes: (applicantId: string, notes: string) => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  language,
  applicant,
  onClose,
  onOpenSchedule,
  onSaveNotes
}) => {
  const [notes, setNotes] = useState(applicant?.notes || '');
  const [savedNotes, setSavedNotes] = useState(false);

  useEffect(() => {
    if (applicant?.notes !== undefined) {
      setNotes(applicant.notes);
    }
  }, [applicant?.id, applicant?.notes]);

  useEffect(() => {
    if (!applicant) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [applicant, onClose]);

  if (!applicant) return null;

  const handleSaveNotes = () => {
    onSaveNotes(applicant.id, notes);
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="candidate-modal-name"
    >
      <div 
        className="w-full max-w-2xl my-6 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <img
              src={applicant.avatar}
              alt={applicant.candidateName}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 id="candidate-modal-name" className="text-base font-bold text-slate-900 dark:text-white">
                  {applicant.candidateName}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{applicant.truthScore}% Truth Check</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Applied for <strong className="text-slate-700 dark:text-slate-300">{applicant.jobTitle}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Commute and Proximity Radar Box */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 text-xs">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'مسار المواصلات وزمن الوصول الفعلي:' : 'Hyperlocal Transit & Commute Calculation:'}</span>
              </span>
              <span className="font-black text-blue-700 dark:text-blue-300 text-xs">
                {applicant.distanceKm} km away
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/60">
                <Train className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'وسيلة النقل / المترو:' : 'Transit Mode:'}</span>
                  <span className="font-bold">{applicant.commuteTransitMode}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/60">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'زمن الوصول المتوقع:' : 'Door-to-door time:'}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">~{applicant.commuteTimeMins} minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Match Reasons */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'ar' ? 'عوامل التوافق والمطابقة بالذكاء الاصطناعي' : 'AI Match Evidence & Rationale'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {applicant.matchHighlights.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CV & Background Summary */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              {language === 'ar' ? 'ملخص السيرة الذاتية والخبرات:' : 'Professional Background Summary:'}
            </h4>
            <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              {applicant.cvSummary}
            </p>
          </div>

          {/* AI Suggested Interview Questions */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              <span>{language === 'ar' ? 'أسئلة المقابلة المقترحة خصيصاً لهذا المرشح:' : 'Tailored AI Interview Questions:'}</span>
            </h4>
            <div className="space-y-2">
              {applicant.interviewQuestionsSuggested.map((q, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900 text-[11px] text-purple-950 dark:text-purple-200 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Recruiter Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1 text-xs">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'ar' ? 'ملاحظات مسؤول التوظيف الداخلية:' : 'Internal Recruiter Notes:'}</span>
              </h4>
              {savedNotes && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{language === 'ar' ? 'تم الحفظ' : 'Saved'}</span>
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'ar' ? 'أضف ملاحظات خاصة بفريق الموارد البشرية...' : 'Add internal assessment notes...'}
                className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs leading-relaxed"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-xs transition cursor-pointer self-end"
              >
                <Save className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Contact info row */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <strong className="font-mono">{applicant.phone}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{applicant.email}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${applicant.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition flex items-center gap-1"
              >
                <span>WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSchedule(applicant);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition flex items-center gap-1 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تحديد مقابلة' : 'Schedule Interview'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
