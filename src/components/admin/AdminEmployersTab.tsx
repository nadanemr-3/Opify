import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Download, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Briefcase, 
  X,
  FileText
} from 'lucide-react';
import { Language, AdminCompany } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminEmployersTabProps {
  language: Language;
  companies: AdminCompany[];
  onToggleCompanyVerification?: (companyId: string) => void;
  onAddCompany?: (company: AdminCompany) => void;
  onLogAudit?: (action: string, target: string, type: 'moderation' | 'security' | 'user') => void;
}

export const AdminEmployersTab: React.FC<AdminEmployersTabProps> = ({
  language,
  companies,
  onToggleCompanyVerification,
  onAddCompany,
  onLogAudit,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [search, setSearch] = useState('');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  // Add Company Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Technology & Software');
  const [location, setLocation] = useState('Cairo, Egypt');
  const [contactEmail, setContactEmail] = useState('');
  const [commercialReg, setCommercialReg] = useState('');
  const [taxId, setTaxId] = useState('');
  const [website, setWebsite] = useState('');

  const filteredCompanies = companies.filter((comp) => {
    const matchesSearch = 
      comp.name.toLowerCase().includes(search.toLowerCase()) || 
      comp.industry.toLowerCase().includes(search.toLowerCase()) ||
      comp.location.toLowerCase().includes(search.toLowerCase()) ||
      (comp.contactEmail && comp.contactEmail.toLowerCase().includes(search.toLowerCase()));

    const matchesVerif = 
      verificationFilter === 'all' || 
      (verificationFilter === 'verified' ? comp.verified : !comp.verified);

    return matchesSearch && matchesVerif;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Industry', 'Location', 'Verified', 'ActiveJobs', 'TotalHires', 'ContactEmail', 'CommercialReg', 'TaxID'];
    const rows = filteredCompanies.map(c => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.industry.replace(/"/g, '""')}"`,
      `"${c.location.replace(/"/g, '""')}"`,
      c.verified ? 'Verified' : 'Unverified',
      c.activeJobsCount,
      c.totalHiresCount || 0,
      `"${c.contactEmail || 'N/A'}"`,
      `"${c.commercialReg || 'N/A'}"`,
      `"${c.taxId || 'N/A'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opify_employers_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onLogAudit?.('Exported Employers CSV', `${filteredCompanies.length} companies`, 'moderation');
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const created: AdminCompany = {
      id: `c-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      industry: industry.trim(),
      location: location.trim(),
      activeJobsCount: 0,
      verified: true,
      contactEmail: contactEmail.trim() || `hr@${name.toLowerCase().replace(/\s+/g, '')}.com`,
      commercialReg: commercialReg.trim() || 'EG-CR-98412',
      taxId: taxId.trim() || '874-902-114',
      website: website.trim() || `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      totalHires: 0,
      totalHiresCount: 0
    };

    onAddCompany?.(created);
    onLogAudit?.('Registered Employer', `${created.name} (Verified)`, 'moderation');

    setName('');
    setContactEmail('');
    setCommercialReg('');
    setTaxId('');
    setWebsite('');
    setIsAddOpen(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
      
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t.adminTabEmployers}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {filteredCompanies.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr 
              ? 'الشركات المسجلة، فحص السجل التجاري والبطاقة الضريبية، وشارة الشريك الموثوق' 
              : 'Registered companies, commercial license verification, and trust score verification'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Add Employer */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'إضافة شركة / جهة توظيف' : 'Add Employer'}</span>
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute top-3 ltr:left-3 rtl:right-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? 'البحث باسم الشركة، المجال، أو البريد...' : 'Search company name, industry, or email...'}
            className="w-full ltr:pl-9 rtl:pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
          />
        </div>

        {/* Verification Filter */}
        <select
          value={verificationFilter}
          onChange={(e) => setVerificationFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'جميع الشركات' : 'All Companies'}</option>
          <option value="verified">{isAr ? 'الشركات الموثقة فقط' : 'Verified Only'}</option>
          <option value="unverified">{isAr ? 'غير الموثقة / قيد التدقيق' : 'Unverified'}</option>
        </select>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-2 p-8 text-center text-slate-400 text-xs">
            {isAr ? 'لا توجد شركات مطابقة لمعايير البحث.' : 'No companies found matching filters.'}
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div 
              key={company.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex flex-col justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-slate-900 dark:text-white text-sm">
                          {company.name}
                        </span>
                        {company.verified && (
                          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        {company.industry} • {company.location}
                      </span>
                    </div>
                  </div>

                  {onToggleCompanyVerification && (
                    <button
                      onClick={() => {
                        onToggleCompanyVerification(company.id);
                        onLogAudit?.(
                          company.verified ? 'Revoked Partner Verification' : 'Verified Partner Account', 
                          company.name, 
                          'moderation'
                        );
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition ${
                        company.verified
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400 hover:bg-blue-50'
                      }`}
                    >
                      {company.verified ? (isAr ? 'شريك موثق ✓' : 'Verified ✓') : (isAr ? 'توثيق الحساب' : 'Verify')}
                    </button>
                  )}
                </div>

                {/* Legal & Contact Info */}
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'السجل التجاري' : 'Comm. Reg'}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {company.commercialReg || 'CR-Pending'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'البطاقة الضريبية' : 'Tax ID'}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {company.taxId || 'TAX-Pending'}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center gap-3 pt-1 text-slate-500 dark:text-slate-400">
                    {company.contactEmail && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {company.contactEmail}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500">
                <span>
                  {isAr ? 'الوظائف النشطة:' : 'Active Jobs:'} <strong className="text-slate-900 dark:text-white font-mono">{company.activeJobsCount}</strong>
                </span>
                <span>
                  {isAr ? 'التعيينات الناجحة:' : 'Total Hires:'} <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{company.totalHiresCount || 12}</strong>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD COMPANY MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'تسجيل وتوثيق شركة جديدة' : 'Register & Verify Employer'}
              </h4>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'اسم الشركة' : 'Company Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arab Financial Services"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'قطاع العمل' : 'Industry'}
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'المقر الرئيسي' : 'Headquarters'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Cairo, Egypt"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'البريد الرسمي للموارد البشرية' : 'HR Contact Email'}
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="hr@company.com"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'رقم السجل التجاري' : 'Commercial Register'}
                  </label>
                  <input
                    type="text"
                    value={commercialReg}
                    onChange={(e) => setCommercialReg(e.target.value)}
                    placeholder="EG-CR-12345"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'البطاقة الضريبية' : 'Tax Card ID'}
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="412-882-901"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  {isAr ? 'تسجيل واعتماد' : 'Register Employer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
