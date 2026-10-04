import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Briefcase, 
  Building2, 
  AlertTriangle, 
  BarChart3, 
  Sparkles, 
  Lock, 
  Unlock, 
  Sliders, 
  ShieldCheck, 
  LogOut,
  Clock
} from 'lucide-react';
import { 
  Language, 
  AdminUser, 
  AdminJob, 
  AdminCompany, 
  AdminReport, 
  AdminMetrics, 
  UserRole,
  AdminAuditLog,
  AdminFeatureFlag
} from '../types';
import { translations } from '../i18n/translations';
import { initialAdminAuditLogs, initialAdminFeatureFlags } from '../data/adminData';

import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminJobsTab } from './admin/AdminJobsTab';
import { AdminUsersTab } from './admin/AdminUsersTab';
import { AdminEmployersTab } from './admin/AdminEmployersTab';
import { AdminReportsTab } from './admin/AdminReportsTab';
import { AdminAiTelemetryTab } from './admin/AdminAiTelemetryTab';
import { AdminAuditLogsTab } from './admin/AdminAuditLogsTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';

export interface AdminDashboardViewProps {
  language: Language;
  isAdminAuthenticated: boolean;
  onAuthenticateAdmin: (role: UserRole) => void;
  onExitAdmin: () => void;
  metrics: AdminMetrics;
  users: AdminUser[];
  jobs: AdminJob[];
  companies: AdminCompany[];
  reports: AdminReport[];
  onToggleUserStatus: (userId: string) => void;
  onUpdateJobStatus: (jobId: string, status: 'approved' | 'rejected') => void;
  onResolveReport: (reportId: string) => void;
  onAddJob?: (job: AdminJob) => void;
  onDeleteJob?: (jobId: string) => void;
  onToggleFeaturedJob?: (jobId: string) => void;
  onToggleUserPremium?: (userId: string) => void;
  onAddUser?: (user: AdminUser) => void;
  onDeleteUser?: (userId: string) => void;
  onAddCompany?: (company: AdminCompany) => void;
  onToggleCompanyVerification?: (companyId: string) => void;
  onDismissReport?: (reportId: string) => void;
  onAddReport?: (report: AdminReport) => void;
  onResetDemoData?: () => void;
}

type TabKey = 'overview' | 'jobs' | 'users' | 'employers' | 'reports' | 'ai' | 'audit' | 'settings';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  language,
  isAdminAuthenticated,
  onAuthenticateAdmin,
  onExitAdmin,
  metrics,
  users,
  jobs,
  companies,
  reports,
  onToggleUserStatus,
  onUpdateJobStatus,
  onResolveReport,
  onAddJob,
  onDeleteJob,
  onToggleFeaturedJob,
  onToggleUserPremium,
  onAddUser,
  onDeleteUser,
  onAddCompany,
  onToggleCompanyVerification,
  onDismissReport,
  onAddReport,
  onResetDemoData,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Dynamic Audit logs and Feature Flags
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(initialAdminAuditLogs);
  const [featureFlags, setFeatureFlags] = useState<AdminFeatureFlag[]>(initialAdminFeatureFlags);

  const handleLogAudit = (action: string, target: string, category: 'moderation' | 'security' | 'user' | 'billing' | 'system' = 'moderation') => {
    const newLog: AdminAuditLog = {
      id: `log-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      adminName: 'Super Admin (Nada Nemr)',
      action,
      target,
      category,
      ipAddress: '197.38.112.45'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleToggleFeatureFlag = (flagId: string) => {
    setFeatureFlags(prev => prev.map(f => f.id === flagId ? { ...f, enabled: !f.enabled } : f));
  };

  // Authentication Gate Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t.adminGateTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {t.adminGateDesc}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4 text-xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passcode.trim().toLowerCase() === 'admin' || passcode.trim() === 'opify2026') {
                onAuthenticateAdmin('super_admin');
                setAuthError(false);
              } else {
                setAuthError(true);
              }
            }}
            className="space-y-3"
          >
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                placeholder={t.adminPasscodePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-center font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              {authError && (
                <p className="text-red-500 text-[11px] font-bold mt-1.5">
                  {isAr ? 'الرمز السري غير صحيح. يمكنك استخدام الدخول التجريبي أدناه.' : 'Invalid passcode. You can click Quick Super Admin Demo below.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold transition hover:opacity-90 cursor-pointer"
            >
              {t.adminUnlockBtn}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={() => onAuthenticateAdmin('super_admin')}
              className="w-full py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>{t.adminQuickDemoBtn}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { key: 'overview', label: t.adminTabOverview, icon: BarChart3 },
    { key: 'jobs', label: t.adminTabJobs, icon: Briefcase, count: jobs.length },
    { key: 'users', label: t.adminTabUsers, icon: Users, count: users.length },
    { key: 'employers', label: t.adminTabEmployers, icon: Building2, count: companies.length },
    { key: 'reports', label: t.adminTabReports, icon: AlertTriangle, count: reports.filter(r => r.status === 'pending').length },
    { key: 'ai', label: t.adminTabAiUsage, icon: Sparkles },
    { key: 'audit', label: isAr ? 'سجل الأمان والرقابة' : 'Security & Audit', icon: ShieldCheck, count: auditLogs.length },
    { key: 'settings', label: isAr ? 'مفاتيح المنصة' : 'Platform Flags', icon: Sliders },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Banner & Identification */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider">
              {isAr ? 'صلاحية: مدير عام النظام (Super Admin)' : 'Role: Super Admin'}
            </span>
            <span className="text-xs text-blue-200 font-bold">
              • Nada Nemr (nadaanemr@gmail.com)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t.adminTitle}
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            {t.adminSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition backdrop-blur-xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.adminLogoutBtn}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800 text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === 'overview' && (
          <AdminOverviewTab
            language={language}
            metrics={metrics}
            jobsCount={jobs.length}
            usersCount={users.length}
            pendingReportsCount={reports.filter(r => r.status === 'pending').length}
          />
        )}

        {activeTab === 'jobs' && (
          <AdminJobsTab
            language={language}
            jobs={jobs}
            onUpdateJobStatus={onUpdateJobStatus}
            onDeleteJob={onDeleteJob}
            onToggleFeaturedJob={onToggleFeaturedJob}
            onAddJob={onAddJob}
            onLogAudit={handleLogAudit}
          />
        )}

        {activeTab === 'users' && (
          <AdminUsersTab
            language={language}
            users={users}
            onToggleUserStatus={onToggleUserStatus}
            onToggleUserPremium={onToggleUserPremium}
            onDeleteUser={onDeleteUser}
            onAddUser={onAddUser}
            onLogAudit={handleLogAudit}
          />
        )}

        {activeTab === 'employers' && (
          <AdminEmployersTab
            language={language}
            companies={companies}
            onToggleCompanyVerification={onToggleCompanyVerification}
            onAddCompany={onAddCompany}
            onLogAudit={handleLogAudit}
          />
        )}

        {activeTab === 'reports' && (
          <AdminReportsTab
            language={language}
            reports={reports}
            jobs={jobs}
            onResolveReport={onResolveReport}
            onDismissReport={onDismissReport}
            onUpdateJobStatus={onUpdateJobStatus}
            onAddReport={onAddReport}
            onLogAudit={handleLogAudit}
          />
        )}

        {activeTab === 'ai' && (
          <AdminAiTelemetryTab
            language={language}
            metrics={metrics}
            onAddReport={onAddReport}
            onLogAudit={handleLogAudit}
            onNavigateToReports={() => setActiveTab('reports')}
          />
        )}

        {activeTab === 'audit' && (
          <AdminAuditLogsTab
            language={language}
            logs={auditLogs}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettingsTab
            language={language}
            featureFlags={featureFlags}
            onToggleFeatureFlag={handleToggleFeatureFlag}
            onResetDemoData={onResetDemoData}
            onLogAudit={handleLogAudit}
          />
        )}
      </div>

    </div>
  );
};
