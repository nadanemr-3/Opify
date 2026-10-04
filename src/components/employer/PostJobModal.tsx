import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Train, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  Plus, 
  Send,
  Building2,
  Clock,
  Layers
} from 'lucide-react';
import { Language, DiscoveredJob } from '../../types';
import { EmployerManagedJob } from '../../data/employerData';

interface PostJobModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSaveJob: (managedJob: EmployerManagedJob, discoveredJob: DiscoveredJob) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  language,
  isOpen,
  onClose,
  onSaveJob
}) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Operations');
  const [district, setDistrict] = useState('Maadi, Cairo');
  const [nearestMetro, setNearestMetro] = useState('Maadi Metro Station (Line 1)');
  const [salaryMin, setSalaryMin] = useState<number>(7000);
  const [salaryMax, setSalaryMax] = useState<number>(9500);
  const [workMode, setWorkMode] = useState<'On-site' | 'Hybrid' | 'Remote'>('On-site');
  const [jobType, setJobType] = useState<'Full-time' | 'Part-time' | 'Shift-based'>('Full-time');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState<string[]>([
    'Customer-first mindset and high empathy',
    'Living within 25 minutes of target location'
  ]);
  const [perks, setPerks] = useState<string[]>([
    'Social & Medical Insurance',
    'Metro transportation allowance'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  // Quick preset templates
  const presets = [
    { title: 'Sales Assistant & Store Specialist', dept: 'Retail', min: 6500, max: 8000, metro: 'Maadi Station (Line 1)' },
    { title: 'Frontend Engineer (React / TS)', dept: 'Engineering', min: 38000, max: 48000, metro: 'Air Hospital Monorail' },
    { title: 'Bilingual Customer Care Lead', dept: 'Customer Support', min: 8500, max: 11000, metro: 'Dokki Station (Line 2)' },
    { title: 'General Accountant (Odoo & Tax)', dept: 'Finance', min: 12000, max: 16000, metro: 'Haroun Station (Line 3)' },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setTitle(p.title);
    setDepartment(p.dept);
    setSalaryMin(p.min);
    setSalaryMax(p.max);
    setNearestMetro(p.metro);
    handleGenerateAiContent(p.title, p.dept);
  };

  const handleGenerateAiContent = (roleTitle = title, dept = department) => {
    setIsGenerating(true);
    setTimeout(() => {
      if (roleTitle.toLowerCase().includes('react') || roleTitle.toLowerCase().includes('engineer')) {
        setDescription('Join our product engineering squad building high-traffic consumer portals. You will architect responsive React interfaces, collaborate closely with design systems, and ensure fast load times across Egyptian mobile networks.');
        setRequirements([
          '2-4 years experience with modern React & TypeScript',
          'Solid understanding of state management and API integration',
          'Living in Cairo/Giza with convenient hybrid office commute',
          'Proven portfolio or GitHub repositories'
        ]);
        setPerks(['2 Days WFH weekly', 'Private Medical Card', 'Quarterly KPI bonuses']);
        setWorkMode('Hybrid');
      } else if (roleTitle.toLowerCase().includes('sales') || roleTitle.toLowerCase().includes('retail')) {
        setDescription('Responsible for welcoming store visitors, presenting top merchandise, processing POS cash/card transactions accurately, and achieving monthly boutique sales targets in a friendly, high-energy environment.');
        setRequirements([
          'High school or Bachelor degree with positive attitude',
          'Arabic native fluency and polite communication skills',
          'Living within 15-20 minutes of branch to ensure punctual shifts',
          'Basic retail or cashier background is a plus'
        ]);
        setPerks(['Social Insurance from Day 1', 'Monthly sales commissions', 'Metro transportation subsidy']);
        setWorkMode('On-site');
      } else {
        setDescription(`We are seeking a dedicated professional for our ${dept} team in ${district}. You will collaborate with team members to streamline daily workflows and deliver exceptional quality standards.`);
        setRequirements([
          'Relevant degree or practical experience',
          'Strong organizational and communication abilities',
          'Proximity to office location for reliable attendance'
        ]);
        setPerks(['Social & Medical Insurance', 'Annual incentive plan', 'Metro allowance']);
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const id = `emp-job-${Date.now()}`;
    const formattedSalary = `${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()} EGP/month`;

    const managedJob: EmployerManagedJob = {
      id,
      title,
      company: 'Apex Retail Solutions',
      department,
      location: district,
      district,
      nearestMetro,
      distanceKm: 1.5,
      salary: formattedSalary,
      salaryMin,
      salaryMax,
      workMode,
      jobType,
      status: 'active',
      postedDate: 'Just now',
      deadline: 'In 30 days',
      applicantsCount: 0,
      interviewsCount: 0,
      aiScreenedCount: 0,
      hiredCount: 0,
      description: description || 'New job posting on Opify platform.',
      requirements,
      perks,
      isBoosted: true
    };

    const discoveredJob: DiscoveredJob = {
      id,
      title,
      company: 'Apex Retail Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=100&h=100&fit=crop&crop=faces',
      location: district,
      distance: '1.5 km away',
      distanceKm: 1.5,
      salary: formattedSalary,
      salaryNum: salaryMin,
      jobType,
      experience: 'Mid / Entry',
      workMode,
      industry: department,
      isEgypt: true,
      matchScore: 95,
      matchReasons: [
        { key: 'location', label: 'Proximity Match', details: `Near ${district} & ${nearestMetro}`, matched: true },
        { key: 'salary', label: 'Salary Target', details: `Within target compensation: ${formattedSalary}`, matched: true },
        { key: 'availability', label: 'Fast Onboarding', details: 'Immediate start candidate pool', matched: true }
      ],
      tags: [department, workMode, 'Verified Employer', nearestMetro.split(' ')[0]],
      description: description || 'Opportunity verified on Opify.',
      requirements,
      postedDate: 'Just now',
      deadline: 'In 30 days'
    };

    onSaveJob(managedJob, discoveredJob);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-job-modal-title"
    >
      <div 
        className="w-full max-w-3xl my-6 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="post-job-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'نشر إعلان وظيفة جديد مع الذكاء الاصطناعي' : 'Post Job with AI Hyperlocal Assistant'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {language === 'ar' ? 'توليد تلقائي للمتطلبات والرواتب ومحطة المترو الأقرب لمقرك' : 'Auto-fill role description, EGP salary benchmarks, and nearest metro line'}
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'ar' ? 'نماذج سريعة جاهزة:' : 'Quick Cairo Job Templates:'}
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'المسمى الوظيفي:' : 'Job Title:'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sales Assistant, React Engineer..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'القسم / الإدارة:' : 'Department:'}
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Retail, Engineering, Finance..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'الحي / منطقة العمل:' : 'District & Area:'}
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Maadi, New Cairo, Dokki..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Train className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'ar' ? 'محطة المترو الأقرب:' : 'Nearest Metro Station:'}</span>
              </label>
              <input
                type="text"
                value={nearestMetro}
                onChange={(e) => setNearestMetro(e.target.value)}
                placeholder="Maadi Metro (Line 1)..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Salary & Work Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'الحد الأدنى للراتب (جنيه):' : 'Min Salary (EGP):'}
              </label>
              <input
                type="number"
                step="500"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'الحد الأقصى للراتب (جنيه):' : 'Max Salary (EGP):'}
              </label>
              <input
                type="number"
                step="500"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'نمط العمل:' : 'Work Mode:'}
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="On-site">On-site (في المقر)</option>
                <option value="Hybrid">Hybrid (هجين)</option>
                <option value="Remote">Remote (عن بعد)</option>
              </select>
            </div>
          </div>

          {/* AI Generator Trigger */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                {language === 'ar' ? 'توليد الوصف والشروط بذكاء أوبيفاي' : 'Generate Role Description & Requirements'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleGenerateAiContent()}
              disabled={isGenerating || !title.trim()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            >
              {isGenerating ? (language === 'ar' ? 'جاري التوليد...' : 'Generating...') : (language === 'ar' ? 'توليد بالذكاء الاصطناعي ⚡' : 'Auto-Generate with AI ⚡')}
            </button>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'ar' ? 'الوصف الوظيفي:' : 'Job Description:'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe main responsibilities..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          {/* Requirements list */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'ar' ? 'الشروط والمؤهلات المطلوبة:' : 'Core Requirements:'}
            </label>
            <div className="space-y-1.5">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => {
                      const updated = [...requirements];
                      updated[idx] = e.target.value;
                      setRequirements(updated);
                    }}
                    className="flex-1 px-2.5 py-1 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setRequirements(requirements.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-500 text-sm font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setRequirements([...requirements, ''])}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إضافة شرط آخر' : 'Add Requirement'}</span>
              </button>
            </div>
          </div>

          {/* Modal Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'ar' ? 'نشر الوظيفة وتفعيل الرادار الآن' : 'Publish & Launch Radar Now'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
