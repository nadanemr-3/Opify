import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Train, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  SlidersHorizontal, 
  Compass, 
  Check, 
  DollarSign, 
  Briefcase, 
  Clock, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Language, TalentCandidate } from '../../types';
import { initialTalentPool, EmployerManagedJob } from '../../data/employerData';

interface EmployerTalentSourcingTabProps {
  language: Language;
  jobs: EmployerManagedJob[];
}

export const EmployerTalentSourcingTab: React.FC<EmployerTalentSourcingTabProps> = ({
  language,
  jobs
}) => {
  const [talentList] = useState<TalentCandidate[]>(initialTalentPool);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(15);
  const [selectedPreference, setSelectedPreference] = useState<string>('all');
  const [invitedIds, setInvitedIds] = useState<Set<string>>(new Set());
  const [inviteModalCandidate, setInviteModalCandidate] = useState<TalentCandidate | null>(null);
  const [selectedJobToInvite, setSelectedJobToInvite] = useState<string>(jobs[0]?.id || '');

  const districts = [
    { value: 'all', labelEn: 'All Districts (Greater Cairo)', labelAr: 'كل المناطق (القاهرة الكبرى)' },
    { value: 'Maadi', labelEn: 'Maadi / Degla', labelAr: 'المعادي / دجلة' },
    { value: 'New Cairo', labelEn: 'New Cairo / 5th Settlement', labelAr: 'القاهرة الجديدة / التجمع الخامس' },
    { value: 'Dokki', labelEn: 'Dokki / Mohandessin', labelAr: 'الدقي / المهندسين' },
    { value: 'Nasr City', labelEn: 'Nasr City', labelAr: 'مدينة نصر' },
    { value: 'Heliopolis', labelEn: 'Heliopolis / Korba', labelAr: 'مصر الجديدة / الكوربة' },
    { value: 'Zamalek', labelEn: 'Zamalek', labelAr: 'الزمالك' },
  ];

  const filteredTalent = talentList.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.topSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDistrict = selectedDistrict === 'all' || cand.location.includes(selectedDistrict);
    const matchesRadius = cand.distanceKm <= maxRadiusKm;
    const matchesPref = selectedPreference === 'all' || cand.workPreference === selectedPreference;
    return matchesSearch && matchesDistrict && matchesRadius && matchesPref;
  });

  const handleSendInvite = (candidateId: string) => {
    setInvitedIds(prev => new Set(prev).add(candidateId));
    setInviteModalCandidate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{language === 'ar' ? 'البحث واستقطاب الكفاءات المحلية' : 'Hyperlocal Candidate Sourcing'}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-black">
              {filteredTalent.length} {language === 'ar' ? 'مرشح متاح' : 'Available'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar'
              ? 'تصفح الكفاءات القريبة من مقرك في القاهرة والجيزة حسب نطاق الكيلومترات ومحطات المترو وأرسل دعوات فورية.'
              : 'Discover pre-verified talent within your target commute radius or metro line and invite them directly to apply.'}
          </p>
        </div>
      </div>

      {/* Interactive Sourcing Radar Filter Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500">
              {language === 'ar' ? 'المسمى الوظيفي أو المهارة' : 'Role or Skill Keyword'}
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'ar' ? 'UI/UX, Node, المحاسبة...' : 'e.g. UI/UX, Node, Accounting...'}
                className="w-full ps-8 pe-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* District Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500">
              {language === 'ar' ? 'المنطقة الجغرافية' : 'Target District'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-1.5 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500 text-slate-900 dark:text-white font-medium"
            >
              {districts.map(d => (
                <option key={d.value} value={d.value}>
                  {language === 'ar' ? d.labelAr : d.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Commute Radius Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-500">{language === 'ar' ? 'أقصى مسافة مواصلات:' : 'Max Commute Radius:'}</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">{maxRadiusKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={maxRadiusKm}
              onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
              <span>1 km</span>
              <span>5 km (Metro)</span>
              <span>15 km</span>
              <span>25 km</span>
            </div>
          </div>

          {/* Work Mode */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500">
              {language === 'ar' ? 'نمط العمل المفضل' : 'Work Preference'}
            </label>
            <select
              value={selectedPreference}
              onChange={(e) => setSelectedPreference(e.target.value)}
              className="w-full py-1.5 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">{language === 'ar' ? 'الكل (حضوري، هجين، عن بُعد)' : 'All Work Modes'}</option>
              <option value="On-site">{language === 'ar' ? 'حضوري من المقر' : 'On-site'}</option>
              <option value="Hybrid">{language === 'ar' ? 'هجين (يومين عن بعد)' : 'Hybrid'}</option>
              <option value="Remote">{language === 'ar' ? 'عن بُعد بالكامل' : 'Remote'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTalent.length === 0 ? (
          <div className="col-span-2 p-10 text-center rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <Compass className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {language === 'ar' ? 'لا توجد كفاءات تطابق معايير البحث الحالية' : 'No candidates match your radius and keyword criteria'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDistrict('all');
                setMaxRadiusKm(25);
                setSelectedPreference('all');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {language === 'ar' ? 'توسيع نطاق البحث الجغرافي' : 'Expand commute radius'}
            </button>
          </div>
        ) : (
          filteredTalent.map((cand) => {
            const isInvited = invitedIds.has(cand.id);

            return (
              <div
                key={cand.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition flex flex-col justify-between space-y-3.5"
              >
                {/* Header */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    referrerPolicy="no-referrer"
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cand.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold">
                        {cand.badge}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {cand.role}
                    </p>

                    {/* Proximity & Metro */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        <span>{cand.neighborhood} ({cand.distanceKm} km)</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                        <Train className="w-3 h-3 text-emerald-600" />
                        <span>{cand.nearestMetro}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {cand.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1">
                  {cand.topSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Footer specs & Invite action */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الراتب المتوقع:' : 'Expected Salary:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">{cand.expectedSalary}</span>
                  </div>

                  <div className="text-end">
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'التوفر:' : 'Availability:'}</span>
                    <span className="font-semibold text-emerald-600 text-[11px]">{cand.availability}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (!isInvited) {
                        setInviteModalCandidate(cand);
                      }
                    }}
                    disabled={isInvited}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isInvited
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {isInvited ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تمت الدعوة ✓' : 'Invited ✓'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'دعوة للتقديم' : 'Invite to Apply'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Invite Modal */}
      {inviteModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'دعوة المرشح للتقديم' : 'Invite Candidate to Apply'}</span>
              </h3>
              <button
                onClick={() => setInviteModalCandidate(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <img
                src={inviteModalCandidate.avatar}
                alt=""
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{inviteModalCandidate.name}</p>
                <p className="text-[11px] text-slate-500">{inviteModalCandidate.role} • {inviteModalCandidate.location}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'اختر الوظيفة المراد دعوته إليها:' : 'Select Target Job Opening:'}
              </label>
              <select
                value={selectedJobToInvite}
                onChange={(e) => setSelectedJobToInvite(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              >
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.title} ({j.district})</option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'ar' ? 'رسالة الدعوة المباشرة:' : 'Direct Invitation Message:'}</span>
              </p>
              <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
                {language === 'ar'
                  ? `مرحباً ${inviteModalCandidate.name}، لاحظنا توافق مهاراتك وقرب سكنك في (${inviteModalCandidate.neighborhood}) مع فرصة عمل لدينا. يسرنا دعوتك للتقديم مباشرة مع أولوية المقابلة.`
                  : `Hello ${inviteModalCandidate.name}, we reviewed your background and proximity (${inviteModalCandidate.neighborhood}) and would love to invite you to interview for our open position.`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setInviteModalCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => handleSendInvite(inviteModalCandidate.id)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إرسال الدعوة الآن' : 'Send Invitation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
