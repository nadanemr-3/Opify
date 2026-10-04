import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Train
} from 'lucide-react';
import { Language, EmployerApplicant } from '../../types';

interface ScheduleInterviewModalProps {
  language: Language;
  applicant: EmployerApplicant | null;
  onClose: () => void;
  onConfirmSchedule: (applicantId: string, interviewDetails: {
    date: string;
    time: string;
    mode: 'In-person Office' | 'Google Meet / Video' | 'Phone Call';
    locationOrLink: string;
    notes: string;
  }) => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  language,
  applicant,
  onClose,
  onConfirmSchedule
}) => {
  const [date, setDate] = useState('2026-09-17');
  const [time, setTime] = useState('11:30 AM');
  const [mode, setMode] = useState<'In-person Office' | 'Google Meet / Video' | 'Phone Call'>('In-person Office');
  const [locationOrLink, setLocationOrLink] = useState('Apex Retail HQ - Degla, Maadi (Near Maadi Metro Line 1)');
  const [copied, setCopied] = useState(false);

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

  // Auto-generate bilingual invitation message
  const inviteMessage = language === 'ar'
    ? `مرحباً أستاذ/ة ${applicant?.candidateName || ''}، يسرنا في شركة Apex Retail دعوتكم لإجراء مقابلة عمل لوظيفة (${applicant?.jobTitle || ''}). 
الموعد: يوم ${date} الساعة ${time} (${mode}).
المكان/الرابط: ${locationOrLink}.
يرجى تأكيد الحضور بالرد على هذه الرسالة. شكراً لكم.`
    : `Dear ${applicant?.candidateName || 'Candidate'}, we are pleased to invite you for an interview for the (${applicant?.jobTitle || 'Role'}) position with Apex Retail Solutions.
Time: ${date} at ${time} (${mode}).
Location/Link: ${locationOrLink}.
Please reply to confirm your attendance. Looking forward to meeting you!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirm = () => {
    if (!applicant) return;
    onConfirmSchedule(applicant.id, {
      date,
      time,
      mode,
      locationOrLink,
      notes: `Scheduled ${mode} on ${date} at ${time}`
    });
    onClose();
  };

  if (!applicant) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden space-y-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 id="schedule-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'تحديد موعد المقابلة' : 'Schedule Candidate Interview'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {applicant.candidateName} • {applicant.jobTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form controls */}
        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'التاريخ:' : 'Date:'}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'الوقت:' : 'Time Slot:'}
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="11:30 AM"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          {/* Mode */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'ar' ? 'نمط المقابلة:' : 'Interview Format:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'In-person Office', labelEn: 'In-Person', labelAr: 'في المقر' },
                { id: 'Google Meet / Video', labelEn: 'Video Call', labelAr: 'مكالمة فيديو' },
                { id: 'Phone Call', labelEn: 'Phone Screen', labelAr: 'هاتفياً' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMode(item.id as any);
                    if (item.id === 'Google Meet / Video') {
                      setLocationOrLink('https://meet.google.com/opify-talent-interview');
                    } else if (item.id === 'Phone Call') {
                      setLocationOrLink(applicant.phone);
                    } else {
                      setLocationOrLink('Apex Retail HQ - Degla, Maadi (Near Maadi Metro Line 1)');
                    }
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                    mode === item.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {language === 'ar' ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Location or Link */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {mode === 'In-person Office' 
                ? (language === 'ar' ? 'عنوان المقر وإرشادات الوصول:' : 'Office Address & Metro Directions:') 
                : (language === 'ar' ? 'رابط المقابلة / رقم الهاتف:' : 'Meeting Link or Contact Number:')}
            </label>
            <input
              type="text"
              value={locationOrLink}
              onChange={(e) => setLocationOrLink(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Copyable Message Preview */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'ar' ? 'نص رسالة الدعوة المجهزة (واتساب / بريد):' : 'Pre-Formatted WhatsApp / Email Invitation:'}</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ النص' : 'Copy Text')}</span>
              </button>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono bg-white dark:bg-slate-850 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 select-all">
              {inviteMessage}
            </p>
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'ar' ? 'تأكيد وحفظ موعد المقابلة' : 'Confirm & Save Schedule'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
