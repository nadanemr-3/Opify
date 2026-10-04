import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Send, 
  FileEdit, 
  ArrowUpDown, 
  Building2, 
  Clock, 
  DollarSign, 
  Check, 
  Columns3,
  ExternalLink,
  ChevronRight,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { Language, DiscoveredJob, WorkMode, JobType } from '../types';
import { translations } from '../i18n/translations';

import { JobLocationsMapView } from './JobLocationsMapView';
import { Button, Badge, Card } from './ui';

interface JobDiscoveryViewProps {
  language: Language;
  jobs: DiscoveredJob[];
  onSaveToTracker: (job: DiscoveredJob) => void;
  onAddToComparison: (job: DiscoveredJob) => void;
  onTailorCv: (job: DiscoveredJob) => void;
  onApplyJob: (job: DiscoveredJob) => void;
  initialSearch?: string;
  initialLocation?: string;
  initialViewMode?: 'list' | 'map';
}

export const JobDiscoveryView: React.FC<JobDiscoveryViewProps> = ({
  language,
  jobs,
  onSaveToTracker,
  onAddToComparison,
  onTailorCv,
  onApplyJob,
  initialSearch = '',
  initialLocation = '',
  initialViewMode = 'list',
}) => {
  const t = translations[language];

  // Filters & View Mode State
  const [viewMode, setViewMode] = useState<'list' | 'map'>(initialViewMode);

  useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [locationTerm, setLocationTerm] = useState(initialLocation);

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  useEffect(() => {
    if (initialLocation !== undefined) {
      setLocationTerm(initialLocation);
    }
  }, [initialLocation]);
  const [distanceFilter, setDistanceFilter] = useState<'any' | '2' | '5' | '15' | 'remote'>('any');
  const [salaryFilter, setSalaryFilter] = useState<'any' | '5000' | '15000' | '30000' | '50000'>('any');
  const [typeFilter, setTypeFilter] = useState<'all' | JobType>('all');
  const [modeFilter, setModeFilter] = useState<'all' | WorkMode>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | 'egypt' | 'intl'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'salary' | 'newest'>('match');

  // Selected job for detailed inspection
  const [selectedJob, setSelectedJob] = useState<DiscoveredJob | null>(jobs[0] || null);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesTags = job.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesTags) return false;
      }

      // Location term
      if (locationTerm) {
        const loc = locationTerm.toLowerCase();
        if (!job.location.toLowerCase().includes(loc) && !job.distance.toLowerCase().includes(loc)) {
          return false;
        }
      }

      // Distance filter
      if (distanceFilter === '2' && (job.distanceKm > 2 || job.distance === 'Remote')) return false;
      if (distanceFilter === '5' && (job.distanceKm > 5 || job.distance === 'Remote')) return false;
      if (distanceFilter === '15' && (job.distanceKm > 15 || job.distance === 'Remote')) return false;
      if (distanceFilter === 'remote' && job.workMode !== 'Remote') return false;

      // Job Type
      if (typeFilter !== 'all' && job.jobType !== typeFilter) return false;

      // Work Mode
      if (modeFilter !== 'all' && job.workMode !== modeFilter) return false;

      // Region
      if (regionFilter === 'egypt' && !job.isEgypt) return false;
      if (regionFilter === 'intl' && job.isEgypt) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0;
    });
  }, [jobs, searchTerm, locationTerm, distanceFilter, salaryFilter, typeFilter, modeFilter, regionFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.discoveryTitle}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.discoverySubtitle}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        {/* Main Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute top-3.5 ltr:left-3.5 rtl:right-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchByTitle}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-4 relative">
            <MapPin className="w-4 h-4 absolute top-3.5 ltr:left-3.5 rtl:right-3.5 text-blue-500" />
            <input
              type="text"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              placeholder={t.filterLocation}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden"
            >
              <option value="match">✨ {t.sortBestMatch}</option>
              <option value="distance">📍 {t.sortClosestDistance}</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          
          {/* Distance Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-500 px-2">{t.filterDistance}:</span>
            {(['any', '2', '5', '15', 'remote'] as const).map((dist) => (
              <button
                key={dist}
                onClick={() => setDistanceFilter(dist)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  distanceFilter === dist
                    ? 'bg-brand-blue text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {dist === 'any' ? t.filterDistanceAny : dist === 'remote' ? t.filterDistanceRemote : `${dist} km`}
              </button>
            ))}
          </div>

          {/* Job Type Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-500 px-2">{t.filterJobType}:</span>
            {(['all', 'Full-time', 'Part-time'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  typeFilter === type
                    ? 'bg-brand-blue text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {type === 'all' ? t.filterAllTypes : type}
              </button>
            ))}
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {(['all', 'egypt', 'intl'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  regionFilter === reg
                    ? 'bg-brand-blue text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {reg === 'all' ? t.filterAllRegions : reg === 'egypt' ? t.filterEgyptOnly : t.filterInternational}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Results Count & View Mode Toggle */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          <strong className="text-slate-900 dark:text-white font-bold">{filteredJobs.length}</strong> {t.jobsFound}
        </span>

        {/* View Mode Toggle: List vs Map */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            id="view-mode-list-btn"
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-brand-blue dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'قائمة' : 'List'}</span>
          </button>
          <button
            id="view-mode-map-btn"
            onClick={() => setViewMode('map')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              viewMode === 'map'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'الخريطة 📍' : 'Map 📍'}</span>
          </button>
        </div>
      </div>

      {/* View Switcher Output: Map View or List Grid */}
      {viewMode === 'map' ? (
        <JobLocationsMapView
          language={language}
          jobs={filteredJobs}
          selectedJob={selectedJob}
          onSelectJob={setSelectedJob}
          onApplyJob={onApplyJob}
          onTailorCv={onTailorCv}
          onSaveToTracker={onSaveToTracker}
          onSwitchToList={() => setViewMode('list')}
        />
      ) : (
        /* Main Grid: Job Cards List + Detail Inspector */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Job Cards Column */}
        <div className="lg:col-span-7 space-y-4">
          {filteredJobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            return (
              <div
                key={job.id}
                id={`job-card-${job.id}`}
                onClick={() => setSelectedJob(job)}
                className={`p-5 rounded-2xl bg-white dark:bg-slate-800 border transition cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20 dark:border-blue-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Card Top Row: Match Score & Distance */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      {job.matchScore}% {t.matchScoreBadge}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {job.distance}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400">{job.postedDate}</span>
                </div>

                {/* Job Title & Company */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {job.company} • {job.location}
                </p>

                {/* Salary & Meta Badges */}
                <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold">
                    {job.salary}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {job.jobType}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {job.workMode}
                  </span>
                </div>

                {/* Transparent Match Reasons Preview */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t.matchChecklistTitle}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                    {job.matchReasons.slice(0, 4).map((r) => (
                      <div key={r.key} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApplyJob(job);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      {t.applyNow}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveToTracker(job);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.saveJob}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTailorCv(job);
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      <span>{t.tailorWithOpify}</span>
                    </button>
                    <span>•</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToComparison(job);
                      }}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Columns3 className="w-3.5 h-3.5" />
                      <span>Compare</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Job Detail Panel (Desktop Sticky Inspector) */}
        <div className="lg:col-span-5">
          {selectedJob ? (
            <div className="sticky top-20 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="brand" size="sm" icon={<MapPin className="w-3.5 h-3.5" />}>
                    {selectedJob.distance}
                  </Badge>
                  <Badge variant="success" size="sm">
                    {selectedJob.matchScore}% Match
                  </Badge>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedJob.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedJob.company} • {selectedJob.location}
                </p>
              </div>

              {/* Salary & Meta Highlights */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Stated Compensation:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedJob.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Experience Needed:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedJob.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Industry:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedJob.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Work Mode:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedJob.workMode}</span>
                </div>
              </div>

              {/* Transparent AI Match Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t.matchChecklistTitle}
                </h4>
                <div className="space-y-2">
                  {selectedJob.matchReasons.map((reason) => (
                    <div 
                      key={reason.key} 
                      className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{reason.label}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400">{reason.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  About the Role
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Large Apply & Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={() => onApplyJob(selectedJob)}
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md shadow-brand-blue/20"
                >
                  {t.applyNow}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => onTailorCv(selectedJob)}
                    variant="outline"
                    size="sm"
                    icon={<FileEdit className="w-3.5 h-3.5 text-brand-blue dark:text-blue-400" />}
                  >
                    <span>Tailor CV</span>
                  </Button>
                  <Button
                    onClick={() => onSaveToTracker(selectedJob)}
                    variant="outline"
                    size="sm"
                    icon={<Bookmark className="w-3.5 h-3.5 text-slate-500" />}
                  >
                    <span>Save to Tracker</span>
                  </Button>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-slate-400">
              Select an opportunity to inspect full details
            </div>
          )}
        </div>

      </div>
      )}

    </div>
  );
};
