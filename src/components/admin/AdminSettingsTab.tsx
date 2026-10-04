import React from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Server
} from 'lucide-react';
import { Language, AdminFeatureFlag } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminSettingsTabProps {
  language: Language;
  featureFlags: AdminFeatureFlag[];
  onToggleFeatureFlag: (flagId: string) => void;
  onResetDemoData?: () => void;
  onLogAudit?: (action: string, target: string, type: 'moderation' | 'security' | 'user') => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  language,
  featureFlags,
  onToggleFeatureFlag,
  onResetDemoData,
  onLogAudit,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-6">
      
      {/* Feature Flags Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {isAr ? 'مفاتيح الميزات وإعدادات المنصة (Feature Flags)' : 'Platform Flags & Runtime Controls'}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {featureFlags.filter(f => f.enabled).length} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr 
              ? 'التحكم الفوري في ميزات المنصة وخوارزميات الذكاء الاصطناعي دون الحاجة لإعادة نشر الكود' 
              : 'Toggle platform capabilities, AI engines, and transparency guards live in real-time'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureFlags.map((flag) => (
            <div 
              key={flag.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {flag.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ({flag.key})
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {flag.description}
                </p>
              </div>

              <button
                onClick={() => {
                  onToggleFeatureFlag(flag.id);
                  onLogAudit?.(
                    flag.enabled ? 'Disabled Feature Flag' : 'Enabled Feature Flag', 
                    flag.name, 
                    'security'
                  );
                }}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-1 cursor-pointer ${
                  flag.enabled 
                    ? 'bg-blue-600' 
                    : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    flag.enabled 
                      ? 'ltr:translate-x-6 rtl:-translate-x-6' 
                      : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dangerous Actions & Demo State Management */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span>{isAr ? 'إعادة ضبط البيانات التجريبية' : 'Demo State Management'}</span>
        </h3>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-amber-900 dark:text-amber-200 block text-sm">
              {isAr ? 'استعادة الحالة الأولية للمنصة' : 'Reset All Admin Data to Initial Sample State'}
            </span>
            <span className="text-amber-700 dark:text-amber-300 text-[11px]">
              {isAr 
                ? 'يعيد تعيين جميع الوظائف، المستخدمين، الشركات، والبلاغات إلى البيانات الأصلية المعتمدة' 
                : 'Restores initial verified employers, Cairo tech jobs, audit trails, and scam reports'}
            </span>
          </div>

          {onResetDemoData && (
            <button
              onClick={() => {
                if (confirm(isAr ? 'هل تود استعادة البيانات الأولية للمنصة بالكامل؟' : 'Reset all admin data to defaults?')) {
                  onResetDemoData();
                  onLogAudit?.('Reset Demo State', 'All entities restored to seed data', 'security');
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 shadow-xs cursor-pointer"
            >
              {isAr ? 'إعادة ضبط البيانات الآن' : 'Reset Data Now'}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
