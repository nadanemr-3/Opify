import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Train, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Mail, 
  Phone, 
  Save, 
  Check, 
  Users, 
  Sparkles,
  Award
} from 'lucide-react';
import { Language } from '../../types';

interface EmployerCompanyProfileTabProps {
  language: Language;
}

export const EmployerCompanyProfileTab: React.FC<EmployerCompanyProfileTabProps> = ({ language }) => {
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState('Apex Retail Solutions Egypt');
  const [industry, setIndustry] = useState('Retail & Omnichannel Commerce');
  const [headquarters, setHeadquarters] = useState('Degla, Maadi, Cairo');
  const [nearestMetro, setNearestMetro] = useState('Maadi Station (Line 1)');
  const [taxId, setTaxId] = useState('EG-TR-492-810-331');
  const [teamSize, setTeamSize] = useState('50-150 employees');
  const [contactEmail, setContactEmail] = useState('hiring@apexretail.eg');
  const [contactPhone, setContactPhone] = useState('+20 2 2519 4000');
  const [perks, setPerks] = useState<string[]>([
    'Social & Medical Insurance (Class A)',
    'Direct Metro Transportation Subsidy',
    'Quarterly Sales Achievement Bonuses',
    '2 Days WFH for Support & Tech Squads',
    'Clear internal promotion ladder'
  ]);
  const [newPerk, setNewPerk] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddPerk = () => {
    if (newPerk.trim()) {
      setPerks(prev => [...prev, newPerk.trim()]);
      setNewPerk('');
    }
  };

  const handleRemovePerk = (index: number) => {
    setPerks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{language === 'ar' ? 'ملف الشركة والتوثيق المعتمد' : 'Company Profile & Verified Status'}</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'ar' ? 'شركة معتمدة موثقة' : 'Verified Employer'}</span>
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar'
              ? 'إدارة بيانات مقر العمل ومحطة المترو الأقرب، لإظهار علامة التوثيق للمتقدمين وبناء الثقة.'
              : 'Configure your verified headquarters location, metro connection, and company benefits to attract top talent.'}
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{language === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Changes saved successfully'}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Verification Status Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shrink-0">
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
              {language === 'ar' ? 'اعتماد أوبيفاي للمصداقية والأمان' : 'Opify Commercial & Tax Verification'}
            </h4>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
              {language === 'ar'
                ? `تم التحقق من البطاقة الضريبية (${taxId}) والسجل التجاري. يظهر إعلان وظائفكم بعلامة التوثيق الذهبية التي تضاعف معدل إقبال المرشحين المؤهلين بمقدار 2.8 ضعف.`
                : `Your Tax Card (${taxId}) and Commercial Registry are verified. Your listings show a Verified Trust Badge, driving 2.8x higher qualified candidate submissions.`}
            </p>
          </div>
        </div>

        {/* Company Details Inputs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{language === 'ar' ? 'البيانات الأساسية للمؤسسة' : 'General Company Information'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'اسم الشركة الرسمي:' : 'Company Trade Name:'}
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'القطاع / الصناعة:' : 'Industry:'}
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'عنوان المقر الرئيسي (الحي / المنطقة):' : 'Headquarters Address & District:'}
              </label>
              <input
                type="text"
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'ar' ? 'أقرب محطة مترو للمقر:' : 'Nearest Metro Station:'}</span>
              </label>
              <input
                type="text"
                value={nearestMetro}
                onChange={(e) => setNearestMetro(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'البريد الإلكتروني للتوظيف:' : 'Recruitment Email:'}
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'رقم الهاتف المعتمد (واتساب):' : 'Official WhatsApp / Phone:'}
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Benefits and Culture */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{language === 'ar' ? 'المزايا والتأمينات المعلنة للمرشحين' : 'Employee Benefits & Perks'}</span>
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {perks.map((perk, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                <span>{perk}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePerk(idx)}
                  className="text-slate-400 hover:text-rose-500 text-sm font-bold cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newPerk}
              onChange={(e) => setNewPerk(e.target.value)}
              placeholder={language === 'ar' ? 'أضف ميزة جديدة (مثل: بدل مواصلات، تأمين صحي شامل)...' : 'Add perk (e.g. Metro allowance, private healthcare)...'}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddPerk}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition cursor-pointer"
            >
              {language === 'ar' ? 'إضافة' : 'Add Perk'}
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{language === 'ar' ? 'حفظ إعدادات ملف الشركة' : 'Save Company Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
