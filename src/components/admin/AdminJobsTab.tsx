import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Trash2, 
  Eye, 
  Star, 
  MapPin, 
  DollarSign, 
  Building2,
  X,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { Language, AdminJob } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminJobsTabProps {
  language: Language;
  jobs: AdminJob[];
  onUpdateJobStatus: (jobId: string, status: 'approved' | 'rejected') => void;
  onDeleteJob?: (jobId: string) => void;
  onToggleFeaturedJob?: (jobId: string) => void;
  onAddJob?: (job: AdminJob) => void;
  onLogAudit?: (action: string, target: string, type: 'moderation' | 'security' | 'user') => void;
}

export const AdminJobsTab: React.FC<AdminJobsTabProps> = ({
  language,
  jobs,
  onUpdateJobStatus,
  onDeleteJob,
  onToggleFeaturedJob,
  onAddJob,
  onLogAudit,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  
  // Modals
  const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('Cairo, Egypt');
  const [newSalary, setNewSalary] = useState('');
  const [newCategory, setNewCategory] = useState('Engineering & Tech');
  const [newLevel, setNewLevel] = useState('Mid-Level');
  const [newDescription, setNewDescription] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

    let matchesRisk = true;
    const risk = job.scamRisk || 0;
    if (riskFilter === 'low') matchesRisk = risk < 20;
    if (riskFilter === 'medium') matchesRisk = risk >= 20 && risk <= 50;
    if (riskFilter === 'high') matchesRisk = risk > 50;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Title', 'Company', 'Location', 'Salary', 'Status', 'Reports', 'ScamRisk', 'Featured'];
    const rows = filteredJobs.map(j => [
      `"${j.id}"`,
      `"${j.title.replace(/"/g, '""')}"`,
      `"${j.company.replace(/"/g, '""')}"`,
      `"${j.location.replace(/"/g, '""')}"`,
      `"${j.salary.replace(/"/g, '""')}"`,
      `"${j.status}"`,
      j.reportsCount,
      j.scamRisk || 0,
      j.featured ? 'Yes' : 'No'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opify_jobs_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onLogAudit?.('Exported Jobs CSV', `${filteredJobs.length} listings exported`, 'moderation');
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const createdJob: AdminJob = {
      id: `aj-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim(),
      salary: newSalary.trim() || (isAr ? 'حسب الخبرة' : 'Competitive'),
      status: 'approved',
      postedAt: new Date().toISOString().slice(0, 10),
      applicationsCount: 0,
      reportsCount: 0,
      category: newCategory,
      experienceLevel: newLevel,
      description: newDescription.trim() || 'Directly approved by Administrator.',
      featured: false,
      scamRisk: 0,
    };

    onAddJob?.(createdJob);
    onLogAudit?.('Created & Approved Job', `${createdJob.title} (${createdJob.company})`, 'moderation');

    // Reset
    setNewTitle('');
    setNewCompany('');
    setNewSalary('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
      
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t.adminTabJobs}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {filteredJobs.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr 
              ? 'مراجعة الفرص المنشورة، فحص مؤشر الاحتيال، اعتماد الوظائف وتحديث الرواتب' 
              : 'Review job listings, verify salary disclosures, inspect scam risk, and moderate'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Add Job Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'نشر وظيفة جديدة' : 'Post Listing'}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 font-bold text-xs transition cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute top-3 ltr:left-3 rtl:right-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? 'البحث بالوظيفة، الشركة، أو الموقع...' : 'Search title, company, location...'}
            className="w-full ltr:pl-9 rtl:pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
          <option value="approved">{isAr ? 'المعتمدة (Approved)' : 'Approved'}</option>
          <option value="pending">{isAr ? 'قيد المراجعة (Pending)' : 'Pending'}</option>
          <option value="rejected">{isAr ? 'المرفوضة (Rejected)' : 'Rejected'}</option>
        </select>

        {/* Scam Risk Filter */}
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'مؤشر الاحتيال (الكل)' : 'Scam Risk: All'}</option>
          <option value="low">{isAr ? 'آمن وموثوق (<20%)' : 'Low Risk (<20%)'}</option>
          <option value="medium">{isAr ? 'متوسط الشبهة (20-50%)' : 'Medium (20-50%)'}</option>
          <option value="high">{isAr ? 'عالي الخطورة (>50%)' : 'High Risk (>50%)'}</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-xs text-left ltr:text-left rtl:text-right min-w-[720px]">
          <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3.5">{t.adminJobColTitle}</th>
              <th className="p-3.5">{t.adminJobColCompany}</th>
              <th className="p-3.5">{t.adminJobColSalary}</th>
              <th className="p-3.5">{t.adminJobColStatus}</th>
              <th className="p-3.5">{isAr ? 'مؤشر الاحتيال' : 'Scam Risk'}</th>
              <th className="p-3.5 text-center">{t.adminJobColActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  {isAr ? 'لا توجد وظائف مطابقة لمعايير البحث' : 'No jobs matching current filters.'}
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => {
                const risk = job.scamRisk || 0;
                return (
                  <tr key={job.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        {onToggleFeaturedJob && (
                          <button
                            onClick={() => {
                              onToggleFeaturedJob(job.id);
                              onLogAudit?.(job.featured ? 'Removed Featured Badge' : 'Added Featured Badge', job.title, 'moderation');
                            }}
                            className="cursor-pointer"
                            title={job.featured ? 'Featured listing' : 'Mark as featured'}
                          >
                            <Star className={`w-3.5 h-3.5 ${job.featured ? 'text-amber-400 fill-amber-400' : 'text-slate-300 hover:text-amber-400'}`} />
                          </button>
                        )}
                        <div>
                          <div className="hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                            {job.title}
                          </div>
                          <span className="block text-[11px] text-slate-400 font-normal">
                            {job.location} {job.category && `• ${job.category}`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">
                      {job.company}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      {job.salary}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        job.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : job.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          risk > 50 
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' 
                            : risk > 20 
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' 
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {risk}%
                        </span>
                        {job.reportsCount > 0 && (
                          <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">
                            <AlertTriangle className="w-3 h-3" />
                            {job.reportsCount}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                          title="Inspect details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {job.status !== 'approved' && (
                          <button
                            onClick={() => {
                              onUpdateJobStatus(job.id, 'approved');
                              onLogAudit?.('Approved Job', job.title, 'moderation');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            {t.btnApprove}
                          </button>
                        )}
                        {job.status !== 'rejected' && (
                          <button
                            onClick={() => {
                              onUpdateJobStatus(job.id, 'rejected');
                              onLogAudit?.('Rejected Job', job.title, 'moderation');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            {t.btnReject}
                          </button>
                        )}
                        {onDeleteJob && (
                          <button
                            onClick={() => {
                              if (confirm(isAr ? 'هل أنت متأكد من حذف هذه الوظيفة نهائياً؟' : 'Delete this job permanently?')) {
                                onDeleteJob(job.id);
                                onLogAudit?.('Deleted Job Listing', job.title, 'moderation');
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* JOB INSPECTOR MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  {selectedJob.category || 'General Listing'}
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedJob.title}
                </h4>
                <p className="text-xs text-slate-500">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold">{isAr ? 'الراتب المعلن' : 'Disclosed Salary'}</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">{selectedJob.salary}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold">{isAr ? 'مستوى الخبرة' : 'Experience Level'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedJob.experienceLevel || 'Mid-Level'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold">{isAr ? 'الحالة الحالية' : 'Moderation Status'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">{selectedJob.status}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold">{isAr ? 'مؤشر شبهة النصب' : 'Scam Risk Index'}</span>
                <span className={`font-black ${(selectedJob.scamRisk || 0) > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {selectedJob.scamRisk || 0}%
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">{isAr ? 'الوصف الوظيفي' : 'Job Description'}:</span>
              <p className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
                {selectedJob.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    onUpdateJobStatus(selectedJob.id, 'approved');
                    setSelectedJob({ ...selectedJob, status: 'approved' });
                    onLogAudit?.('Approved Job', selectedJob.title, 'moderation');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                >
                  {t.btnApprove}
                </button>
                <button
                  onClick={() => {
                    onUpdateJobStatus(selectedJob.id, 'rejected');
                    setSelectedJob({ ...selectedJob, status: 'rejected' });
                    onLogAudit?.('Rejected Job', selectedJob.title, 'moderation');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
                >
                  {t.btnReject}
                </button>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD JOB MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'نشر واعتماد وظيفة جديدة' : 'Post & Approve Job Listing'}
              </h4>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'المسمى الوظيفي' : 'Job Title'} *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الشركة' : 'Company Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. FinPulse MENA"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الموقع الجغرافي' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. New Cairo, Egypt"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الراتب المتوقع' : 'Salary (EGP/mo)'}
                  </label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. 40,000 - 50,000 EGP"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'التخصص' : 'Category'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Engineering & Tech">Engineering & Tech</option>
                    <option value="Sales & Retail">Sales & Retail</option>
                    <option value="Customer Service & Tele-sales">Customer Service</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                    <option value="Administration">Administration</option>
                    <option value="Design & Media">Design & Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الوصف الوظيفي' : 'Description & Key Requirements'}
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline responsibilities and qualifications..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  {isAr ? 'حفظ ونشر فوراً' : 'Publish & Approve'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
