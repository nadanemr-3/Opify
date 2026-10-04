import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Users, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  Briefcase,
  Search,
  Compass,
  TrendingUp,
  ShieldCheck,
  Award,
  Train
} from 'lucide-react';
import { Language, UserProfile, DiscoveredJob, EmployerApplicant, ApplicantStage } from '../types';
import { translations } from '../i18n/translations';
import { 
  initialEmployerJobs, 
  initialEmployerApplicants, 
  EmployerManagedJob 
} from '../data/employerData';
import { EmployerStatCards } from './employer/EmployerStatCards';
import { EmployerJobsTab } from './employer/EmployerJobsTab';
import { EmployerApplicantsTab } from './employer/EmployerApplicantsTab';
import { EmployerTalentSourcingTab } from './employer/EmployerTalentSourcingTab';
import { EmployerAnalyticsTab } from './employer/EmployerAnalyticsTab';
import { EmployerCompanyProfileTab } from './employer/EmployerCompanyProfileTab';
import { PostJobModal } from './employer/PostJobModal';
import { ScheduleInterviewModal } from './employer/ScheduleInterviewModal';
import { CandidateModal } from './employer/CandidateModal';

export interface EmployerSectionViewProps {
  language: Language;
  currentUser?: UserProfile | null;
  onNavigate?: (tab: string, params?: any) => void;
  onAddJob?: (job: DiscoveredJob) => void;
  onPostJobSuccess?: (jobTitle: string) => void;
}

export const EmployerSectionView: React.FC<EmployerSectionViewProps> = ({
  language,
  currentUser,
  onNavigate,
  onAddJob,
  onPostJobSuccess
}) => {
  const t = translations[language];

  // Active sub-tab inside Employer Portal
  const [activeSubTab, setActiveSubTab] = useState<'jobs' | 'applicants' | 'sourcing' | 'analytics' | 'company'>('jobs');

  // Datasets
  const [managedJobs, setManagedJobs] = useState<EmployerManagedJob[]>(() => {
    const saved = localStorage.getItem('opify_employer_jobs');
    return saved ? JSON.parse(saved) : initialEmployerJobs;
  });

  const [applicants, setApplicants] = useState<EmployerApplicant[]>(() => {
    const saved = localStorage.getItem('opify_employer_applicants');
    return saved ? JSON.parse(saved) : initialEmployerApplicants;
  });

  // Selected filter for applicants tab
  const [selectedJobIdFilter, setSelectedJobIdFilter] = useState<string | null>(null);

  // Modals state
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [scheduleModalApplicant, setScheduleModalApplicant] = useState<EmployerApplicant | null>(null);
  const [detailModalApplicant, setDetailModalApplicant] = useState<EmployerApplicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Job Actions
  const handleToggleJobStatus = (jobId: string) => {
    setManagedJobs(prev => {
      const updated = prev.map(job => {
        if (job.id === jobId) {
          const nextStatus = job.status === 'active' ? 'paused' : 'active';
          return { ...job, status: nextStatus as any };
        }
        return job;
      });
      localStorage.setItem('opify_employer_jobs', JSON.stringify(updated));
      return updated;
    });
    showToast(language === 'ar' ? 'تم تحديث حالة الوظيفة' : 'Job status updated');
  };

  const handleToggleBoost = (jobId: string) => {
    setManagedJobs(prev => {
      const updated = prev.map(job => {
        if (job.id === jobId) {
          const nextBoost = !job.isBoosted;
          return { ...job, isBoosted: nextBoost };
        }
        return job;
      });
      localStorage.setItem('opify_employer_jobs', JSON.stringify(updated));
      return updated;
    });
    showToast(language === 'ar' ? 'تم تحديث أولوية الرادار' : 'Radar boost toggled');
  };

  const handleViewApplicants = (jobId: string) => {
    setSelectedJobIdFilter(jobId);
    setActiveSubTab('applicants');
  };

  // Save new job
  const handleSaveNewJob = (managedJob: EmployerManagedJob, discoveredJob: DiscoveredJob) => {
    setManagedJobs(prev => {
      const updated = [managedJob, ...prev];
      localStorage.setItem('opify_employer_jobs', JSON.stringify(updated));
      return updated;
    });

    if (onAddJob) {
      onAddJob(discoveredJob);
    }
    if (onPostJobSuccess) {
      onPostJobSuccess(managedJob.title);
    }

    showToast(
      language === 'ar'
        ? `تم نشر (${managedJob.title}) وتفعيل رادار المرشحين بنجاح!`
        : `Published (${managedJob.title}) and activated proximity radar!`
    );
  };

  // Applicant Actions
  const handleUpdateApplicantStage = (applicantId: string, stage: ApplicantStage) => {
    setApplicants(prev => {
      const updated = prev.map(app => {
        if (app.id === applicantId) {
          return { ...app, stage };
        }
        return app;
      });
      localStorage.setItem('opify_employer_applicants', JSON.stringify(updated));
      return updated;
    });

    const stageNames: Record<ApplicantStage, { en: string; ar: string }> = {
      applied: { en: 'New Applied', ar: 'طلب جديد' },
      shortlisted: { en: 'Shortlisted', ar: 'تصفية أولية' },
      interview: { en: 'Interview Scheduled', ar: 'مقابلة مجدولة' },
      offer: { en: 'Offer Extended', ar: 'عرض عمل' },
      rejected: { en: 'Archived / Rejected', ar: 'مستبعد' }
    };

    showToast(
      language === 'ar'
        ? `تم نقل المرشح إلى مرحلة: ${stageNames[stage].ar}`
        : `Candidate moved to stage: ${stageNames[stage].en}`
    );
  };

  const handleConfirmScheduleInterview = (
    applicantId: string, 
    details: { date: string; time: string; mode: string; locationOrLink: string; notes: string }
  ) => {
    handleUpdateApplicantStage(applicantId, 'interview');
    setApplicants(prev => {
      const updated = prev.map(app => {
        if (app.id === applicantId) {
          return { 
            ...app, 
            notes: (app.notes ? `${app.notes}\n` : '') + `[Interview]: ${details.mode} on ${details.date} at ${details.time}`
          };
        }
        return app;
      });
      localStorage.setItem('opify_employer_applicants', JSON.stringify(updated));
      return updated;
    });

    showToast(
      language === 'ar'
        ? `تم تحديد موعد المقابلة بنجاح ليوم ${details.date}`
        : `Interview successfully scheduled for ${details.date}`
    );
  };

  const handleSaveApplicantNotes = (applicantId: string, notes: string) => {
    setApplicants(prev => {
      const updated = prev.map(app => {
        if (app.id === applicantId) {
          return { ...app, notes };
        }
        return app;
      });
      localStorage.setItem('opify_employer_applicants', JSON.stringify(updated));
      return updated;
    });
  };

  // Computed metrics
  const activeJobsCount = managedJobs.filter(j => j.status === 'active').length;
  const totalApplicantsCount = applicants.length + 38; // total across company history
  const interviewsCount = applicants.filter(a => a.stage === 'interview' || a.stage === 'offer').length + 8;

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-900 pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Global Floating Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 end-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 border border-slate-700 dark:border-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Company Identity Header Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 end-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-white">
                      Apex Retail Solutions Egypt
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === 'ar' ? 'شركة موثقة' : 'Verified'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-blue-200">
                    {language === 'ar' 
                      ? 'بوابة التوظيف ورادار استقطاب الكفاءات القريبة من مقرات الشركة'
                      : 'Talent Acquisition Operating System & Hyperlocal Commute Radar'}
                  </p>
                </div>
              </div>

              {/* Location and Metro info tag */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-blue-200/90 pt-1">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Degla, Maadi, Cairo</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <Train className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Maadi Station (Metro Line 1)</span>
                </span>
                <span>•</span>
                <span className="text-slate-300 font-mono text-[11px]">Tax ID: EG-TR-492-810-331</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={() => setPostJobModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.employerCtaPostJob}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedJobIdFilter(null);
                  setActiveSubTab('sourcing');
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-blue-300" />
                <span>{t.employerCtaBrowseCandidates}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live KPI Metric Cards */}
        <EmployerStatCards
          language={language}
          activeJobsCount={activeJobsCount}
          totalApplicantsCount={totalApplicantsCount}
          interviewsCount={interviewsCount}
        />

        {/* Primary Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs">
          {[
            { id: 'jobs', label: t.employerTabJobs, icon: Briefcase },
            { id: 'applicants', label: t.employerTabApplicants, icon: Users, badge: applicants.length },
            { id: 'sourcing', label: t.employerTabTalentSearch, icon: Compass },
            { id: 'analytics', label: t.employerTabAnalytics, icon: TrendingUp },
            { id: 'company', label: t.employerTabCompanyProfile, icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white text-blue-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Manage Jobs */}
        {activeSubTab === 'jobs' && (
          <EmployerJobsTab
            language={language}
            jobs={managedJobs}
            onOpenPostJob={() => setPostJobModalOpen(true)}
            onToggleStatus={handleToggleJobStatus}
            onToggleBoost={handleToggleBoost}
            onViewApplicants={handleViewApplicants}
          />
        )}

        {/* Tab 2: Applicants ATS & Radar */}
        {activeSubTab === 'applicants' && (
          <EmployerApplicantsTab
            language={language}
            applicants={applicants}
            jobs={managedJobs}
            selectedJobId={selectedJobIdFilter}
            onSelectJobId={setSelectedJobIdFilter}
            onUpdateApplicantStage={handleUpdateApplicantStage}
            onOpenScheduleInterview={(app) => setScheduleModalApplicant(app)}
            onOpenCandidateDetail={(app) => setDetailModalApplicant(app)}
          />
        )}

        {/* Tab 3: Hyperlocal Talent Sourcing */}
        {activeSubTab === 'sourcing' && (
          <EmployerTalentSourcingTab
            language={language}
            jobs={managedJobs}
          />
        )}

        {/* Tab 4: Analytics & Retention ROI */}
        {activeSubTab === 'analytics' && (
          <EmployerAnalyticsTab
            language={language}
          />
        )}

        {/* Tab 5: Company Profile & Verification */}
        {activeSubTab === 'company' && (
          <EmployerCompanyProfileTab
            language={language}
          />
        )}

        {/* 3 Unique Modals */}
        <PostJobModal
          language={language}
          isOpen={postJobModalOpen}
          onClose={() => setPostJobModalOpen(false)}
          onSaveJob={handleSaveNewJob}
        />

        <ScheduleInterviewModal
          language={language}
          applicant={scheduleModalApplicant}
          onClose={() => setScheduleModalApplicant(null)}
          onConfirmSchedule={handleConfirmScheduleInterview}
        />

        <CandidateModal
          language={language}
          applicant={detailModalApplicant}
          onClose={() => setDetailModalApplicant(null)}
          onOpenSchedule={(app) => {
            setDetailModalApplicant(null);
            setScheduleModalApplicant(app);
          }}
          onSaveNotes={handleSaveApplicantNotes}
        />
      </div>
    </div>
  );
};
