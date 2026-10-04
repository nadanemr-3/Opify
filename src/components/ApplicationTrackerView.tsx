import React, { useState } from 'react';
import { 
  Kanban, 
  Table as TableIcon,
  Plus, 
  Building2, 
  MapPin, 
  Calendar, 
  Trash2, 
  Clock, 
  Sparkles,
  FileText,
  CheckCircle2,
  ChevronDown,
  X,
  Briefcase,
  Layers,
  Filter
} from 'lucide-react';
import { ApplicationItem, Language, WorkMode } from '../types';
import { translations } from '../i18n/translations';
import { Button, Badge, Card, Modal, Input, Select } from './ui';

interface ApplicationTrackerViewProps {
  language: Language;
  applications: ApplicationItem[];
  onUpdateStatus: (id: string, status: ApplicationItem['status']) => void;
  onDeleteApplication: (id: string) => void;
  onAddApplication: (app: ApplicationItem) => void;
}

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  language,
  applications,
  onUpdateStatus,
  onDeleteApplication,
  onAddApplication
}) => {
  const t = translations[language];

  // View mode: 'table' or 'board'
  const [viewMode, setViewMode] = useState<'table' | 'board'>('table');
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationItem['status']>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('Cairo, Egypt');
  const [newSalary, setNewSalary] = useState('40,000 - 55,000 EGP');
  const [newWorkMode, setNewWorkMode] = useState<WorkMode>('Hybrid');
  const [newStatus, setNewStatus] = useState<ApplicationItem['status']>('Applied');
  const [newNotes, setNewNotes] = useState('');

  const statusColumns: ApplicationItem['status'][] = [
    'Saved',
    'Applied',
    'Interviewing',
    'Offer',
    'Rejected'
  ];

  const activeApplicationsCount = applications.filter(a => a.status === 'Applied' || a.status === 'Interviewing').length;
  const interviewingCount = applications.filter(a => a.status === 'Interviewing').length;
  const offerCount = applications.filter(a => a.status === 'Offer').length;
  const savedCount = applications.filter(a => a.status === 'Saved').length;

  const getStatusBadgeStyle = (status: ApplicationItem['status']) => {
    switch (status) {
      case 'Saved':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
      case 'Applied':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Interviewing':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Offer':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Rejected':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredApplications = applications.filter(app => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      jobTitle: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim(),
      workMode: newWorkMode,
      salary: newSalary.trim(),
      status: newStatus,
      matchScore: 85,
      appliedDate: new Date().toISOString().split('T')[0],
      followUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes: newNotes.trim()
    };

    onAddApplication(newApp);
    setNewTitle('');
    setNewCompany('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Tracker Header & Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Title & Count */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            <Kanban className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.trackerTitle}
              </h2>
              <Badge variant="brand" size="sm">
                {applications.length} {language === 'ar' ? 'طلب' : 'Total'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.trackerSubtitle}
            </p>
          </div>
        </div>

        {/* View Switcher & Add Button */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs font-semibold py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-hidden"
          >
            <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            {statusColumns.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          {/* Toggle Table vs Board */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              id="tracker-view-table-btn"
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'جدول' : 'Table'}</span>
            </button>
            <button
              id="tracker-view-board-btn"
              onClick={() => setViewMode('board')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-white dark:bg-slate-800 text-brand-blue dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'لوحة كانبان' : 'Board'}</span>
            </button>
          </div>

          <Button
            id="add-application-btn"
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
          >
            <span>{t.addApplication}</span>
          </Button>
        </div>

      </div>

      {/* Tracker Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Kanban className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {activeApplicationsCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ar' ? 'طلبات نشطة قيد المتابعة' : 'Active Applications'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {interviewingCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ar' ? 'مرحلة المقابلات' : 'Interview Stage'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {offerCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ar' ? 'عروض عمل مستلمة' : 'Offers Received'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-800/50 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {savedCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ar' ? 'فرص محفوظة للتجهيز' : 'Saved for Later'}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: TABLE VIEW (Clean desktop table with responsive mobile cards) */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left ltr:text-left rtl:text-right">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-4">{language === 'ar' ? 'المسمى والشركة' : 'Job Title & Company'}</th>
                    <th className="p-4">{language === 'ar' ? 'الموقع ونمط العمل' : 'Location & Mode'}</th>
                    <th className="p-4">{language === 'ar' ? 'الراتب المتوقع' : 'Compensation'}</th>
                    <th className="p-4">{language === 'ar' ? 'تاريخ التقديم' : 'Applied Date'}</th>
                    <th className="p-4">{language === 'ar' ? 'المطابقة' : 'Fit Match'}</th>
                    <th className="p-4">{language === 'ar' ? 'حالة الطلب' : 'Status Stage'}</th>
                    <th className="p-4 text-center">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredApplications.map((app) => (
                    <tr 
                      key={app.id} 
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors"
                    >
                      {/* Job Title & Company */}
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {app.jobTitle}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>{app.company}</span>
                        </div>
                      </td>

                      {/* Location & WorkMode */}
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.location}</span>
                        </div>
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {app.workMode}
                        </span>
                      </td>

                      {/* Compensation */}
                      <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                        {app.salary || 'Competitive'}
                      </td>

                      {/* Applied Date */}
                      <td className="p-4 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{app.appliedDate}</span>
                        </div>
                        {app.followUpDate && (
                          <span className="block text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
                            Follow-up: {app.followUpDate}
                          </span>
                        )}
                      </td>

                      {/* Fit Match */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 text-[11px]">
                          <Sparkles className="w-3 h-3" />
                          {app.matchScore}%
                        </span>
                      </td>

                      {/* Interactive Status Selector Dropdown */}
                      <td className="p-4">
                        <div className="relative inline-block">
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationItem['status'])}
                            className={`text-xs font-bold py-1.5 px-3 rounded-xl border cursor-pointer focus:outline-hidden transition shadow-2xs ${getStatusBadgeStyle(app.status)}`}
                          >
                            {statusColumns.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => onDeleteApplication(app.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                          title="Delete application"
                          aria-label="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                {language === 'ar' ? 'لا توجد طلبات توظيف تطابق هذا الفلتر.' : 'No applications found matching the selected filter.'}
              </div>
            )}
          </div>

          {/* Mobile Card-Based Layout (Replaces cramped table on mobile screens) */}
          <div className="md:hidden space-y-3">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {app.jobTitle}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>{app.company}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteApplication(app.id)}
                    className="text-slate-400 hover:text-red-600 transition p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {app.location}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {app.salary}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {app.appliedDate}
                  </span>

                  {/* Status Dropdown Mobile */}
                  <select
                    value={app.status}
                    onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationItem['status'])}
                    className={`text-xs font-bold py-1.5 px-3 rounded-xl border cursor-pointer focus:outline-hidden ${getStatusBadgeStyle(app.status)}`}
                  >
                    {statusColumns.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            {filteredApplications.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                {language === 'ar' ? 'لا توجد طلبات تطابق الفلتر' : 'No applications found'}
              </div>
            )}
          </div>

        </div>
      )}

      {/* VIEW 2: KANBAN BOARD VIEW (Smooth responsive layout) */}
      {viewMode === 'board' && (
        <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-5 md:overflow-visible">
          {statusColumns.map((colStatus) => {
            const colApps = applications.filter((app) => app.status === colStatus);

            return (
              <div 
                key={colStatus}
                className="bg-slate-100/70 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col min-w-[260px] md:min-w-0 min-h-[480px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {colStatus === 'Saved' ? t.statusSaved :
                       colStatus === 'Applied' ? t.statusApplied :
                       colStatus === 'Interviewing' ? t.statusInterviewing :
                       colStatus === 'Offer' ? t.statusOffer : t.statusRejected}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {colApps.length}
                    </span>
                  </div>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.map((app) => (
                    <div 
                      key={app.id}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-2xs hover:shadow-xs transition space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                            {app.jobTitle}
                          </h4>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span>{app.company}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onDeleteApplication(app.id)}
                          className="text-slate-300 hover:text-rose-600 transition cursor-pointer p-0.5"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-50 dark:border-slate-700/60">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {app.location}
                        </span>
                        {app.matchScore > 0 && (
                          <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.2 rounded border border-blue-200 dark:border-blue-800 text-[10px]">
                            {app.matchScore}% Match
                          </span>
                        )}
                      </div>

                      {app.salary && (
                        <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {app.salary}
                        </div>
                      )}

                      {app.followUpDate && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>Follow-up: {app.followUpDate}</span>
                        </div>
                      )}

                      {/* Move status select */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Stage:</span>
                        <select
                          value={app.status}
                          onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationItem['status'])}
                          className={`text-[11px] font-bold border rounded-lg px-2 py-1 cursor-pointer focus:outline-hidden ${getStatusBadgeStyle(app.status)}`}
                        >
                          {statusColumns.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="h-28 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-[11px]">
                      {language === 'ar' ? 'فارغ' : 'Empty stage'}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Add Application Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={language === 'ar' ? 'إضافة طلب توظيف للمتابعة' : 'Log New Job Application'}
        size="md"
      >
        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'ar' ? 'اسم الشركة' : 'Company Name'} *
            </label>
            <input
              type="text"
              required
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="e.g. Fawry Banking & Payment"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'الموقع' : 'Location'}
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="e.g. Smart Village, Giza"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'نمط العمل' : 'Work Mode'}
              </label>
              <select
                value={newWorkMode}
                onChange={(e) => setNewWorkMode(e.target.value as WorkMode)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'الراتب المتوقع' : 'Salary Package'}
              </label>
              <input
                type="text"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                placeholder="e.g. 45,000 EGP/mo"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'المرحلة' : 'Stage'}
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ApplicationItem['status'])}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
              >
                {statusColumns.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAddModal(false)}
            >
              {t.btnCancel}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="shadow-md shadow-brand-blue/20"
            >
              {language === 'ar' ? 'حفظ ومتابعة' : 'Save Application'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
