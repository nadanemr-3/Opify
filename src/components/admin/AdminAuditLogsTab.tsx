import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Clock, 
  User, 
  FileText, 
  Lock, 
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { Language, AdminAuditLog } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminAuditLogsTabProps {
  language: Language;
  logs: AdminAuditLog[];
}

export const AdminAuditLogsTab: React.FC<AdminAuditLogsTabProps> = ({
  language,
  logs,
}) => {
  const isAr = language === 'ar';

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'moderation' | 'security' | 'user' | 'billing' | 'system'>('all');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(search.toLowerCase()) || 
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.adminName.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Timestamp', 'Admin', 'Action', 'Target', 'Category', 'IP'];
    const rows = filteredLogs.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.adminName.replace(/"/g, '""')}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      `"${l.target.replace(/"/g, '""')}"`,
      `"${l.category}"`,
      `"${l.ipAddress || '127.0.0.1'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opify_audit_logs_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
      
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {isAr ? 'سجل الرقابة والأمان (Audit Trail)' : 'Security & Governance Audit Trail'}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {filteredLogs.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAr 
              ? 'توثيق زمني غير قابل للتعديل لجميع العمليات الإدارية، قرارات الحظر، وتغييرات الصلاحيات' 
              : 'Tamper-evident chronological timeline of all admin actions, approvals, and security updates'}
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            placeholder={isAr ? 'البحث بالإجراء، الهدف، أو المشرف...' : 'Search action, target, or admin...'}
            className="w-full ltr:pl-9 rtl:pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
        >
          <option value="all">{isAr ? 'جميع الفئات' : 'All Categories'}</option>
          <option value="moderation">{isAr ? 'الرقابة والمحتوى (Moderation)' : 'Moderation'}</option>
          <option value="security">{isAr ? 'الأمان والصلاحيات (Security)' : 'Security'}</option>
          <option value="user">{isAr ? 'إدارة الحسابات (User Mgmt)' : 'User Mgmt'}</option>
          <option value="billing">{isAr ? 'الاشتراكات والدفع (Billing)' : 'Billing'}</option>
          <option value="system">{isAr ? 'إعدادات النظام (System)' : 'System'}</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-xs text-left ltr:text-left rtl:text-right min-w-[650px]">
          <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3.5">{isAr ? 'التوقيت' : 'Timestamp'}</th>
              <th className="p-3.5">{isAr ? 'المسؤول' : 'Admin'}</th>
              <th className="p-3.5">{isAr ? 'نوع الإجراء' : 'Action'}</th>
              <th className="p-3.5">{isAr ? 'الهدف / التفاصيل' : 'Target'}</th>
              <th className="p-3.5">{isAr ? 'الفئة' : 'Category'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  {isAr ? 'لا توجد سجلات مطابقة للبحث' : 'No audit records matching filters.'}
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors">
                  <td className="p-3.5 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {log.adminName}
                  </td>
                  <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">
                    {log.action}
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                    {log.target}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      log.category === 'security'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : log.category === 'moderation'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : log.category === 'billing'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {log.category}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
