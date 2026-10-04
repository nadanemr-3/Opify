import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Download, 
  CheckCircle2, 
  XCircle, 
  User, 
  Briefcase, 
  Calendar, 
  FileText,
  Ban,
  Clock,
  ExternalLink,
  Sparkles,
  Plus,
  Eye,
  Filter,
  RefreshCw,
  Info,
  Check,
  Building2,
  DollarSign,
  MapPin,
  ChevronDown,
  X
} from 'lucide-react';
import { Language, AdminReport, AdminJob } from '../../types';
import { translations } from '../../i18n/translations';

interface AdminReportsTabProps {
  language: Language;
  reports: AdminReport[];
  jobs: AdminJob[];
  onResolveReport: (reportId: string) => void;
  onDismissReport?: (reportId: string) => void;
  onUpdateJobStatus: (jobId: string, status: 'approved' | 'rejected') => void;
  onAddReport?: (report: AdminReport) => void;
  onLogAudit?: (action: string, target: string, type: 'moderation' | 'security' | 'user') => void;
}

interface AiScanResult {
  riskScore: number;
  riskLevel: string;
  fraudCategory: string;
  flags: string[];
  explanation: string;
  safetyGuidance: string;
  latencyMs?: number;
}

export const AdminReportsTab: React.FC<AdminReportsTabProps> = ({
  language,
  reports,
  jobs,
  onResolveReport,
  onDismissReport,
  onUpdateJobStatus,
  onAddReport,
  onLogAudit,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected report for modal inspect
  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(null);

  // AI Scam Shield Forensic Scan state (keyed by report ID)
  const [scanningReportId, setScanningReportId] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<Record<string, AiScanResult>>({});

  // File New Report modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newReportTargetType, setNewReportTargetType] = useState<'job' | 'company' | 'other'>('job');
  const [newReportJobId, setNewReportJobId] = useState<string>(jobs[0]?.id || '');
  const [newReportCustomTitle, setNewReportCustomTitle] = useState('');
  const [newReportType, setNewReportType] = useState<AdminReport['type']>('job_scam');
  const [newReportSeverity, setNewReportSeverity] = useState<'high' | 'medium' | 'low'>('high');
  const [newReportReason, setNewReportReason] = useState('');
  const [newReportEvidence, setNewReportEvidence] = useState('');
  const [newReportBy, setNewReportBy] = useState('Opify Candidate Community');

  // Filtered reports with defensive property access
  const filteredReports = reports.filter((rep) => {
    const reasonText = (rep.reason || rep.details || '').toLowerCase();
    const titleText = (rep.targetTitle || rep.targetId || '').toLowerCase();
    const evidenceText = (rep.evidence || rep.details || '').toLowerCase();
    const reporterText = (rep.reportedBy || '').toLowerCase();
    const query = search.toLowerCase().trim();

    const matchesSearch = !query || 
      reasonText.includes(query) || 
      titleText.includes(query) ||
      evidenceText.includes(query) ||
      reporterText.includes(query) ||
      (rep.id || '').toLowerCase().includes(query) ||
      (rep.targetId || '').toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || rep.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || (rep.severity || 'medium') === severityFilter;
    const matchesType = typeFilter === 'all' || rep.type === typeFilter;

    return matchesSearch && matchesStatus && matchesSeverity && matchesType;
  });

  // Calculate statistics
  const totalCount = reports.length;
  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const highSeverityCount = reports.filter(r => (r.severity || 'medium') === 'high').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;

  // Run real-time AI Scam Shield forensic analysis on a report
  const handleRunAiForensicScan = async (report: AdminReport) => {
    setScanningReportId(report.id);
    const targetTitle = report.targetTitle || report.targetId || 'Reported Job';
    const evidence = report.evidence || report.details || report.reason || '';
    const textToScan = `${targetTitle}\nComplaint Reason: ${report.reason || report.details || ''}\nEvidence: ${evidence}`;

    try {
      const res = await fetch('/api/scam-shield/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToScan,
          jobTitle: targetTitle,
          company: 'Reported Employer',
          language
        })
      });

      if (res.ok) {
        const data: AiScanResult = await res.json();
        setScanResults(prev => ({ ...prev, [report.id]: data }));
        onLogAudit?.('Ran AI Scam Shield Forensic Audit', `${targetTitle} - Risk: ${data.riskScore}%`, 'moderation');
      }
    } catch (err) {
      console.error('Error running AI scam scan:', err);
    } finally {
      setScanningReportId(null);
    }
  };

  // Safe CSV export
  const handleExportCsv = () => {
    const headers = ['ReportID', 'Type', 'TargetID', 'TargetTitle', 'Severity', 'Status', 'ReportedBy', 'Date', 'Reason', 'Evidence'];
    const rows = filteredReports.map(r => {
      const id = (r.id || '').replace(/"/g, '""');
      const type = (r.type || 'job_scam').replace(/"/g, '""');
      const targetId = (r.targetId || '').replace(/"/g, '""');
      const targetTitle = (r.targetTitle || '').replace(/"/g, '""');
      const severity = (r.severity || 'medium').replace(/"/g, '""');
      const status = (r.status || 'pending').replace(/"/g, '""');
      const reportedBy = (r.reportedBy || 'Candidate').replace(/"/g, '""');
      const date = (r.createdAt || r.reportedAt || '').replace(/"/g, '""');
      const reason = (r.reason || r.details || '').replace(/"/g, '""');
      const evidence = (r.evidence || '').replace(/"/g, '""');

      return `"${id}","${type}","${targetId}","${targetTitle}","${severity}","${status}","${reportedBy}","${date}","${reason}","${evidence}"`;
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opify_scam_reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onLogAudit?.('Exported Scam Reports CSV', `${filteredReports.length} reports`, 'moderation');
  };

  // Ban job and resolve report
  const handleBanJobAndResolve = (report: AdminReport) => {
    onResolveReport(report.id);
    const targetId = report.targetId || '';
    if (targetId) {
      onUpdateJobStatus(targetId, 'rejected');
      onLogAudit?.('Banned Job & Resolved Scam Report', `${report.targetTitle || targetId} (Report ${report.id})`, 'moderation');
    } else {
      onLogAudit?.('Resolved Report', `${report.targetTitle || report.id}`, 'moderation');
    }
  };

  // Submit new scam report
  const handleCreateReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportReason.trim()) return;

    let targetTitle = newReportCustomTitle.trim();
    let targetId = `custom-${Date.now()}`;

    if (newReportTargetType === 'job') {
      const selectedJob = jobs.find(j => j.id === newReportJobId);
      if (selectedJob) {
        targetTitle = `${selectedJob.title} (${selectedJob.company})`;
        targetId = selectedJob.id;
      }
    }

    if (!targetTitle) {
      targetTitle = isAr ? 'إعلان عمل مشبوه' : 'Suspicious Opportunity';
    }

    const newRep: AdminReport = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      type: newReportType,
      targetTitle,
      targetId,
      reportedBy: newReportBy.trim() || 'Moderator',
      reportedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      severity: newReportSeverity,
      reason: newReportReason.trim(),
      details: newReportReason.trim(),
      evidence: newReportEvidence.trim() || undefined
    };

    onAddReport?.(newRep);
    onLogAudit?.('Filed Moderation Scam Report', `${targetTitle} (${newReportSeverity})`, 'moderation');

    // Reset and close
    setNewReportReason('');
    setNewReportEvidence('');
    setNewReportCustomTitle('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Moderation KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {isAr ? 'إجمالي البلاغات' : 'Total Reports'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalCount}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {isAr ? 'مرصودة في المنصة' : 'Logged across platform'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              {isAr ? 'قيد التحقيق النشط' : 'Pending Review'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {pendingCount}
          </div>
          <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-0.5 block">
            {isAr ? 'تتطلب تدقيق فوري' : 'Requires moderator action'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-700 dark:text-red-400">
              {isAr ? 'شبهات نصب عالية' : 'High Severity Scams'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-red-600 dark:text-red-400 font-mono">
            {highSeverityCount}
          </div>
          <span className="text-[11px] text-red-600/80 dark:text-red-400/80 mt-0.5 block">
            {isAr ? 'رسوم مسبقة أو تحويلات' : 'Advance fees / phishing'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {isAr ? 'تم الحل والإغلاق' : 'Resolved & Secured'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {resolvedCount}
          </div>
          <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5 block">
            {isAr ? 'تم حظر الإعلان أو إغلاقه' : 'Enforced and archived'}
          </span>
        </div>
      </div>

      {/* Main Reports Management Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
        
        {/* Header Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span>{t.adminTabReports}</span>
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                {pendingCount} {isAr ? 'قيد المراجعة' : 'Pending'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr 
                ? 'فحص شكاوى المرشحين، كشف طلبات الرسوم الوهمية وشركات التوظيف المزيفة عبر الذكاء الاصطناعي' 
                : 'Trust & Safety intelligence: candidate complaints, advance-fee red flags, and fraud enforcement'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Log New Scam Report Button */}
            <button
              id="btn-file-scam-report"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'تسجيل بلاغ احتيال جديد' : 'File Scam Report'}</span>
            </button>

            {/* Export CSV */}
            <button
              id="btn-export-reports-csv"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 font-bold text-xs transition cursor-pointer"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute top-3 ltr:left-3 rtl:right-3 text-slate-400" />
            <input
              id="input-reports-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? 'بحث بالهدف، السبب، المبلّغ أو الأدلة...' : 'Search target, reason, evidence...'}
              className="w-full ltr:pl-9 rtl:pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Status Filter */}
          <select
            id="select-reports-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
          >
            <option value="all">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="pending">{isAr ? 'قيد الانتظار (Pending)' : 'Pending Review'}</option>
            <option value="resolved">{isAr ? 'تم الحل (Resolved)' : 'Resolved'}</option>
            <option value="dismissed">{isAr ? 'تم التجاهل (Dismissed)' : 'Dismissed'}</option>
          </select>

          {/* Severity Filter */}
          <select
            id="select-reports-severity"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
          >
            <option value="all">{isAr ? 'جميع درجات الخطورة' : 'All Severities'}</option>
            <option value="high">{isAr ? 'عالي الخطورة (High)' : 'High Severity'}</option>
            <option value="medium">{isAr ? 'متوسط (Medium)' : 'Medium Severity'}</option>
            <option value="low">{isAr ? 'منخفض (Low)' : 'Low Severity'}</option>
          </select>

          {/* Category Type Filter */}
          <select
            id="select-reports-type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer focus:outline-hidden"
          >
            <option value="all">{isAr ? 'جميع التصنيفات' : 'All Categories'}</option>
            <option value="job_scam">{isAr ? 'احتيال وظيفي (Scam)' : 'Recruitment Scam'}</option>
            <option value="inaccurate_salary">{isAr ? 'راتب مضلل (Salary)' : 'Inaccurate Salary'}</option>
            <option value="user_abuse">{isAr ? 'إساءة استخدام (Abuse)' : 'User Abuse'}</option>
            <option value="spam">{isAr ? 'إعلانات مكررة (Spam)' : 'Spam / Phishing'}</option>
          </select>
        </div>

        {/* Reports List */}
        <div className="space-y-3.5">
          {filteredReports.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800">
              <ShieldAlert className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="font-semibold">{isAr ? 'لا توجد بلاغات تطابق البحث المحدد.' : 'No moderation reports match the current filters.'}</p>
              <button 
                onClick={() => { setSearch(''); setStatusFilter('all'); setSeverityFilter('all'); setTypeFilter('all'); }}
                className="mt-2 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                {isAr ? 'إعادة ضبط الفلاتر' : 'Reset all filters'}
              </button>
            </div>
          ) : (
            filteredReports.map((report) => {
              const reasonText = report.reason || report.details || (isAr ? 'بلاغ احتيال' : 'Reported issue');
              const evidenceText = report.evidence || report.details || '';
              const targetTitle = report.targetTitle || report.targetId || 'Listing';
              const reporter = report.reportedBy || 'Candidate';
              const dateStr = report.createdAt || report.reportedAt || 'Recent';
              const severity = report.severity || 'medium';
              const aiScan = scanResults[report.id];
              const isScanning = scanningReportId === report.id;

              return (
                <div 
                  key={report.id}
                  id={`report-card-${report.id}`}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    report.status === 'pending'
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 shadow-xs'
                      : report.status === 'resolved'
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200/70 dark:border-emerald-800/40'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-750 opacity-80'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 text-xs">
                    
                    {/* Left Column: Report Information */}
                    <div className="space-y-2 flex-1">
                      
                      {/* Top Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          severity === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : severity === 'medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {severity} severity
                        </span>

                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                          {report.type === 'job_scam' ? (isAr ? 'احتيال وظيفي' : 'Job Scam')
                            : report.type === 'inaccurate_salary' ? (isAr ? 'راتب مضلل' : 'Inaccurate Pay')
                            : report.type === 'user_abuse' ? (isAr ? 'إساءة استخدام' : 'User Abuse')
                            : (isAr ? 'رسائل مضللة' : 'Spam')}
                        </span>

                        <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                          {targetTitle}
                        </span>

                        <span className="text-[10px] text-slate-400 font-mono">
                          (ID: {report.targetId || report.id})
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          report.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : report.status === 'dismissed'
                            ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {report.status}
                        </span>
                      </div>

                      {/* Complaint Reason */}
                      <p className="text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm">
                        <strong className="text-red-600 dark:text-red-400 font-bold">{isAr ? 'الشكوى:' : 'Complaint:'}</strong> {reasonText}
                      </p>

                      {/* Candidate Evidence Box */}
                      {evidenceText && (
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
                          <strong className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                            {isAr ? 'أدلة وإفادة المرشح:' : 'Candidate Evidence & Details:'}
                          </strong>
                          <p className="whitespace-pre-wrap">{evidenceText}</p>
                        </div>
                      )}

                      {/* AI Scam Shield Result Card (if analyzed) */}
                      {aiScan && (
                        <div className={`p-3 rounded-xl border text-[11px] space-y-1.5 ${
                          aiScan.riskScore >= 60 
                            ? 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-800/60'
                            : 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60'
                        }`}>
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                              <span>{isAr ? 'التحليل الجنائي بالذكاء الاصطناعي (AI Scam Shield):' : 'AI Scam Shield Forensic Verdict:'}</span>
                            </span>
                            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-black ${
                              aiScan.riskScore >= 60 ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                            }`}>
                              {aiScan.fraudCategory} • Risk: {aiScan.riskScore}%
                            </span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{aiScan.explanation}</p>
                          {aiScan.flags && aiScan.flags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {aiScan.flags.map((flg, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded-md bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 text-[10px]">
                                  ⚠️ {flg}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Metadata row */}
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                        <span>{isAr ? 'المبلّغ:' : 'Reported by:'} <strong className="text-slate-600 dark:text-slate-300">{reporter}</strong></span>
                        <span>{isAr ? 'التاريخ:' : 'Date:'} <strong className="text-slate-600 dark:text-slate-300">{dateStr}</strong></span>
                      </div>
                    </div>

                    {/* Right Column: Interactive Action Controls */}
                    <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                      
                      {/* Run AI Scam Audit Button */}
                      <button
                        id={`btn-ai-scan-${report.id}`}
                        onClick={() => handleRunAiForensicScan(report)}
                        disabled={isScanning}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 font-bold text-[11px] transition cursor-pointer disabled:opacity-50"
                        title="Run AI Scam Shield forensic analysis"
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                        <span>{isScanning ? (isAr ? 'جاري الفحص...' : 'Scanning...') : (isAr ? 'فحص بالذكاء الاصطناعي' : 'AI Forensic Audit')}</span>
                      </button>

                      {/* Inspect Details Button */}
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 font-semibold text-[11px] transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تفاصيل البلاغ' : 'Inspect'}</span>
                      </button>

                      {/* Pending Action Buttons */}
                      {report.status === 'pending' ? (
                        <>
                          <button
                            id={`btn-ban-${report.id}`}
                            onClick={() => handleBanJobAndResolve(report)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-xs transition cursor-pointer"
                            title="Reject job listing and mark report resolved"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>{isAr ? 'حظر الوظيفة وحل البلاغ' : 'Ban Job & Resolve'}</span>
                          </button>

                          <button
                            id={`btn-resolve-${report.id}`}
                            onClick={() => {
                              onResolveReport(report.id);
                              onLogAudit?.('Resolved Scam Report', targetTitle, 'moderation');
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isAr ? 'حل البلاغ' : 'Resolve'}</span>
                          </button>

                          {onDismissReport && (
                            <button
                              id={`btn-dismiss-${report.id}`}
                              onClick={() => {
                                onDismissReport(report.id);
                                onLogAudit?.('Dismissed Report', targetTitle, 'moderation');
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold transition cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{isAr ? 'تجاهل' : 'Dismiss'}</span>
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 italic px-2 py-1">
                          {isAr ? '✓ تم اتخاذ القرار' : '✓ Enforced'}
                        </span>
                      )}

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* INSPECT REPORT DETAILS MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-850 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-750 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {isAr ? 'تفاصيل بلاغ الأمان والاحتيال' : 'Scam Report Investigation'}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750">
                <div>
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'معرف البلاغ' : 'Report ID'}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedReport.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'الحالة' : 'Current Status'}</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">{selectedReport.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'الهدف المبلّغ عنه' : 'Reported Target'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedReport.targetTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'درجة الخطورة' : 'Severity'}</span>
                  <span className="font-bold text-red-600 dark:text-red-400 uppercase">{selectedReport.severity || 'medium'}</span>
                </div>
              </div>

              {/* Reason */}
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'نص الشكوى وملاحظة المبلّغ:' : 'Complaint Reason:'}
                </span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  {selectedReport.reason || selectedReport.details}
                </p>
              </div>

              {/* Evidence */}
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {isAr ? 'الأدلة والمحادثات المرفقة:' : 'Candidate Evidence / Chat Logs:'}
                </span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {selectedReport.evidence || selectedReport.details || (isAr ? 'لا توجد أدلة نصية إضافية مرفقة.' : 'No additional evidence logged.')}
                </p>
              </div>

              {/* AI Forensic scan inside modal */}
              {scanResults[selectedReport.id] ? (
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>{isAr ? 'نتيجة التحليل الجنائي' : 'AI Forensic Analysis'}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-mono">
                      Risk: {scanResults[selectedReport.id].riskScore}% ({scanResults[selectedReport.id].fraudCategory})
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {scanResults[selectedReport.id].explanation}
                  </p>
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">
                    <strong>{isAr ? 'إرشادات السلامة:' : 'Safety Guidance:'}</strong> {scanResults[selectedReport.id].safetyGuidance}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleRunAiForensicScan(selectedReport)}
                  disabled={scanningReportId === selectedReport.id}
                  className="w-full py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{scanningReportId === selectedReport.id ? (isAr ? 'جاري الفحص بالذكاء الاصطناعي...' : 'Scanning with AI...') : (isAr ? 'تشغيل فحص الذكاء الاصطناعي الجنائي' : 'Run AI Scam Forensic Check')}</span>
                </button>
              )}

            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                {isAr ? 'إغلاق النافذة' : 'Close'}
              </button>

              <div className="flex items-center gap-2">
                {selectedReport.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleBanJobAndResolve(selectedReport);
                        setSelectedReport(null);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                    >
                      <Ban className="w-4 h-4" />
                      <span>{isAr ? 'حظر الوظيفة وحل البلاغ' : 'Ban Job & Resolve'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onResolveReport(selectedReport.id);
                        onLogAudit?.('Resolved Report', selectedReport.targetTitle, 'moderation');
                        setSelectedReport(null);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAr ? 'حل البلاغ' : 'Resolve'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FILE NEW SCAM REPORT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-850 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-750 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {isAr ? 'تسجيل بلاغ احتيال جديد' : 'Log New Scam Report'}
                </h3>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReportSubmit} className="p-6 space-y-4 text-xs">
              
              {/* Target Selection */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الجهة أو الإعلان المبلّغ عنه:' : 'Target Entity:'}
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setNewReportTargetType('job')}
                    className={`flex-1 py-1.5 rounded-xl font-bold border transition ${
                      newReportTargetType === 'job' 
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 text-blue-600' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    {isAr ? 'إعلان عمل نشط' : 'Existing Job'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewReportTargetType('other')}
                    className={`flex-1 py-1.5 rounded-xl font-bold border transition ${
                      newReportTargetType === 'other' 
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-600 text-blue-600' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    {isAr ? 'هدف مخصص / خارجي' : 'Custom / External'}
                  </button>
                </div>

                {newReportTargetType === 'job' ? (
                  <select
                    value={newReportJobId}
                    onChange={(e) => setNewReportJobId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title} — {job.company} ({job.location})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={newReportCustomTitle}
                    onChange={(e) => setNewReportCustomTitle(e.target.value)}
                    placeholder={isAr ? 'اسم الشركة أو الوظيفة المشبوهة...' : 'Company or job name...'}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                )}
              </div>

              {/* Category & Severity Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'تصنيف المخالفة:' : 'Scam Category:'}
                  </label>
                  <select
                    value={newReportType}
                    onChange={(e) => setNewReportType(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="job_scam">{isAr ? 'احتيال وظيفي (Scam)' : 'Job Scam'}</option>
                    <option value="inaccurate_salary">{isAr ? 'راتب مضلل (Salary Fraud)' : 'Salary Fraud'}</option>
                    <option value="spam">{isAr ? 'روابط تصيد / تيليجرام' : 'Phishing / Spam'}</option>
                    <option value="user_abuse">{isAr ? 'إساءة استخدام' : 'User Abuse'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'مستوى الخطورة:' : 'Severity:'}
                  </label>
                  <select
                    value={newReportSeverity}
                    onChange={(e) => setNewReportSeverity(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="high">{isAr ? 'عالي الخطورة (High)' : 'High'}</option>
                    <option value="medium">{isAr ? 'متوسط (Medium)' : 'Medium'}</option>
                    <option value="low">{isAr ? 'منخفض (Low)' : 'Low'}</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'ملخص الشكوى / سبب البلاغ:' : 'Complaint Summary / Reason:'}
                </label>
                <input
                  type="text"
                  required
                  value={newReportReason}
                  onChange={(e) => setNewReportReason(e.target.value)}
                  placeholder={isAr ? 'مثال: طلب رسوم كشف طبي 400 جنيه قبل المقابلة' : 'e.g., Demands 450 EGP registration fee before interview'}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {/* Evidence */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'تفاصيل الأدلة ورسائل الواتساب/المحادثة:' : 'Evidence & Chat Transcript:'}
                </label>
                <textarea
                  rows={3}
                  value={newReportEvidence}
                  onChange={(e) => setNewReportEvidence(e.target.value)}
                  placeholder={isAr ? 'الصق نص الرسائل أو أرقام الهواتف أو رابط الحساب...' : 'Paste message text, phone numbers, or wallet details...'}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-750 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  {isAr ? 'تسجيل وحفظ البلاغ' : 'Submit Report'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
