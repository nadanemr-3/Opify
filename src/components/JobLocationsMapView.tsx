import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Navigation, 
  Compass, 
  FileEdit, 
  Bookmark, 
  ExternalLink, 
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  List,
  Building2,
  X,
  ChevronRight
} from 'lucide-react';
import { Language, DiscoveredJob } from '../types';
import { translations } from '../i18n/translations';

interface JobLocationsMapViewProps {
  language: Language;
  jobs: DiscoveredJob[];
  selectedJob: DiscoveredJob | null;
  onSelectJob: (job: DiscoveredJob) => void;
  onApplyJob: (job: DiscoveredJob) => void;
  onTailorCv: (job: DiscoveredJob) => void;
  onSaveToTracker: (job: DiscoveredJob) => void;
  onSwitchToList: () => void;
}

interface DistrictCoords {
  x: number;
  y: number;
  area: string;
}

export const JobLocationsMapView: React.FC<JobLocationsMapViewProps> = ({
  language,
  jobs,
  selectedJob,
  onSelectJob,
  onApplyJob,
  onTailorCv,
  onSaveToTracker,
  onSwitchToList,
}) => {
  const t = translations[language];

  // Map state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeRadius, setActiveRadius] = useState<'all' | '2' | '5' | '15'>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [mobileSheetOpen, setMobileSheetOpen] = useState<boolean>(true);

  // User home base location: Maadi, Cairo (Center reference)
  const userCenter = { x: 50, y: 64, name: 'Maadi, Cairo' };

  // Helper to place jobs on coordinates
  const getJobCoordinates = (job: DiscoveredJob): DistrictCoords => {
    const loc = (job.location + ' ' + job.title + ' ' + (job.tags || []).join(' ')).toLowerCase();
    
    if (loc.includes('maadi')) {
      return { x: 50, y: 64, area: 'Maadi' };
    }
    if (loc.includes('nasr city')) {
      return { x: 67, y: 38, area: 'Nasr City' };
    }
    if (loc.includes('dokki') || loc.includes('giza')) {
      return { x: 40, y: 48, area: 'Dokki / Giza' };
    }
    if (loc.includes('new cairo') || loc.includes('fifth settlement') || loc.includes('tagamoa')) {
      return { x: 80, y: 52, area: 'New Cairo' };
    }
    if (loc.includes('smart village') || loc.includes('october') || loc.includes('zayed')) {
      return { x: 20, y: 35, area: 'Smart Village' };
    }
    if (loc.includes('mohandessin') || loc.includes('zamalek')) {
      return { x: 38, y: 40, area: 'Mohandessin' };
    }
    if (loc.includes('heliopolis') || loc.includes('korba')) {
      return { x: 64, y: 26, area: 'Heliopolis' };
    }
    if (loc.includes('remote') || loc.includes('dubai')) {
      return { x: 82, y: 18, area: 'Remote / GCC' };
    }

    // Deterministic offset based on job ID hash
    const hash = job.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      x: 35 + (hash % 45),
      y: 30 + ((hash * 7) % 40),
      area: job.location
    };
  };

  // Filter jobs for the map
  const visibleJobs = jobs.filter((job) => {
    if (activeRadius === '2' && (job.distanceKm > 2 || job.distance === 'Remote')) return false;
    if (activeRadius === '5' && (job.distanceKm > 5 || job.distance === 'Remote')) return false;
    if (activeRadius === '15' && (job.distanceKm > 15 || job.distance === 'Remote')) return false;

    if (districtFilter !== 'all') {
      const coords = getJobCoordinates(job);
      if (coords.area !== districtFilter) return false;
    }

    return true;
  });

  const districtsList = [
    { id: 'all', label: language === 'ar' ? 'جميع المناطق' : 'All Districts' },
    { id: 'Maadi', label: 'Maadi (المعادي)' },
    { id: 'Dokki / Giza', label: 'Dokki & Giza (الدقي والجيزة)' },
    { id: 'Nasr City', label: 'Nasr City (مدينة نصر)' },
    { id: 'New Cairo', label: 'New Cairo (التجمع الخامس)' },
    { id: 'Smart Village', label: 'Smart Village (القرية الذكية)' },
    { id: 'Heliopolis', label: 'Heliopolis (مصر الجديدة)' },
    { id: 'Remote / GCC', label: 'Remote (عن بعد)' }
  ];

  return (
    <div className="space-y-4">
      {/* Top Map Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        
        {/* Left: District & Radius Filter */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shrink-0">
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{language === 'ar' ? 'نطاق الرادار:' : 'Radar Radius:'}</span>
          </span>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {(['all', '2', '5', '15'] as const).map((rad) => (
              <button
                key={rad}
                id={`map-radius-${rad}`}
                onClick={() => setActiveRadius(rad)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRadius === rad
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {rad === 'all' ? (language === 'ar' ? 'الكل' : 'All') : `${rad} km`}
              </button>
            ))}
          </div>

          {/* District selector dropdown */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden"
          >
            {districtsList.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Right: View switcher & Map zoom controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
              className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setActiveRadius('all');
                setDistrictFilter('all');
              }}
              className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Reset View"
              aria-label="Reset map view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onSwitchToList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
          >
            <List className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'عرض القائمة' : 'List View'}</span>
          </button>
        </div>
      </div>

      {/* Main Map Stage & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Map Interactive Canvas */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative min-h-[500px] sm:min-h-[580px] select-none transition-colors">
          
          {/* Background Grid & Metro Lines SVG */}
          <div 
            className="w-full h-full absolute inset-0 transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg 
              className="w-full h-full opacity-80 dark:opacity-60 pointer-events-none" 
              viewBox="0 0 1000 700" 
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="map-subtle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-slate-300/70 dark:stroke-white/5" strokeWidth="1" />
                </pattern>
                
                {/* Nile River Gradient (Light Mode) */}
                <linearGradient id="nileGradientLight" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                </linearGradient>

                {/* Nile River Gradient (Dark Mode) */}
                <linearGradient id="nileGradientDark" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
                </linearGradient>

                <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#map-subtle-grid)" />

              {/* River Nile (Light Mode) */}
              <path
                d="M 510 700 C 500 580, 430 460, 420 360 C 410 260, 450 160, 430 0"
                fill="none"
                stroke="url(#nileGradientLight)"
                strokeWidth="28"
                strokeLinecap="round"
                className="block dark:hidden"
              />
              {/* River Nile (Dark Mode) */}
              <path
                d="M 510 700 C 500 580, 430 460, 420 360 C 410 260, 450 160, 430 0"
                fill="none"
                stroke="url(#nileGradientDark)"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#radarGlow)"
                className="hidden dark:block"
              />

              {/* Cairo Ring Road (Highway loop) */}
              <ellipse
                cx="500"
                cy="380"
                rx="340"
                ry="240"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="opacity-70 block dark:hidden"
              />
              <ellipse
                cx="500"
                cy="380"
                rx="340"
                ry="240"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="hidden dark:block"
              />

              {/* Metro Line 1 & Line 2 */}
              <path
                d="M 480 700 L 440 380 L 620 180"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
              />
              <path
                d="M 220 340 L 420 370 L 780 480"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
              />

              {/* User Proximity Radius Circle */}
              <circle
                cx="500"
                cy="448"
                r={activeRadius === '2' ? '80' : activeRadius === '5' ? '160' : activeRadius === '15' ? '280' : '220'}
                fill="rgba(37, 99, 235, 0.08)"
                stroke="#2563eb"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="transition-all duration-500"
              />
            </svg>

            {/* District Geographical Labels */}
            <div className="absolute inset-0 pointer-events-none text-slate-500 dark:text-slate-400 text-[11px] font-bold tracking-wider uppercase">
              <span className="absolute top-[32%] left-[14%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                Smart Village
              </span>
              <span className="absolute top-[44%] left-[34%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                Dokki / Giza
              </span>
              <span className="absolute top-[38%] left-[45%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                Downtown
              </span>
              <span className="absolute top-[23%] left-[61%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                Heliopolis
              </span>
              <span className="absolute top-[35%] left-[65%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                Nasr City
              </span>
              <span className="absolute top-[48%] left-[78%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                New Cairo
              </span>
              <span className="absolute top-[68%] left-[47%] bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 px-2 py-0.5 rounded border dark:border-blue-800/80 shadow-xs">
                Maadi (You Are Here)
              </span>
              <span className="absolute top-[14%] left-[76%] bg-white/90 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60 shadow-xs">
                Remote & Gulf
              </span>
            </div>

            {/* User Center Pin (Maadi) */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              style={{ left: `${userCenter.x}%`, top: `${userCenter.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 animate-ping absolute" />
                <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-lg">
                  <Navigation className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Interactive Job Markers */}
            {visibleJobs.map((job) => {
              const coords = getJobCoordinates(job);
              const isSelected = selectedJob?.id === job.id;

              return (
                <div
                  key={job.id}
                  id={`map-pin-${job.id}`}
                  onClick={() => {
                    onSelectJob(job);
                    setMobileSheetOpen(true);
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer transition-all duration-200 group ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                  }`}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                >
                  {/* Pin Body */}
                  <div className="relative flex flex-col items-center">
                    
                    {/* Ripple on selected */}
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-full bg-blue-400/40 animate-pulse pointer-events-none" />
                    )}

                    {/* Match Score Badge on top of pin */}
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-md flex items-center gap-1 border whitespace-nowrap ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-white/60'
                        : job.matchScore >= 90
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-white text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'
                    }`}>
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{job.matchScore}%</span>
                    </div>

                    {/* Pin Pointer */}
                    <div className={`w-3.5 h-3.5 rotate-45 -mt-1.5 rounded-xs ${
                      isSelected
                        ? 'bg-blue-600 border-r border-b border-blue-400'
                        : job.matchScore >= 90
                        ? 'bg-emerald-600 border-r border-b border-emerald-400'
                        : 'bg-white border-r border-b border-slate-300 dark:bg-slate-800 dark:border-slate-600'
                    }`} />

                    {/* Tooltip on Hover (Desktop) */}
                    <div className="absolute top-full mt-1.5 hidden md:group-hover:flex flex-col items-center pointer-events-none z-50">
                      <div className="p-2 rounded-xl bg-white text-slate-900 dark:bg-slate-950 dark:text-white text-[11px] shadow-2xl border border-slate-200 dark:border-slate-800 whitespace-nowrap text-center space-y-0.5">
                        <p className="font-bold text-slate-900 dark:text-white">{job.title}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px]">{job.company} • {job.distance}</p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">{job.salary}</p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Floating Map Legend */}
          <div className="absolute bottom-3 ltr:left-3 rtl:right-3 z-30 p-2.5 rounded-xl bg-white/95 text-slate-700 dark:bg-slate-950/80 dark:text-slate-300 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[11px] space-y-1 shadow-lg transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>{language === 'ar' ? 'موقعك الحالي (المعادي)' : 'Your Registered Location'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{language === 'ar' ? 'تطابق عالي (+90%)' : 'High Fit Match (90%+)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" />
              <span>{visibleJobs.length} {language === 'ar' ? 'فرصة ظاهرة على الخريطة' : 'jobs on radar'}</span>
            </div>
          </div>

        </div>

        {/* Selected Job Card Inspector (Desktop Side Panel + Mobile Responsive) */}
        <div className="lg:col-span-4">
          {selectedJob ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-5 sticky top-20">
              
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    {selectedJob.matchScore}% Match
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {selectedJob.distance}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedJob.company} • {selectedJob.location}
                </p>
              </div>

              {/* Salary & Work mode pill */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Compensation:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedJob.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Work Mode:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedJob.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Job Type:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedJob.jobType}</span>
                </div>
              </div>

              {/* Why This Job Matches You Preview */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t.matchChecklistTitle}
                </p>
                <div className="space-y-1.5 text-xs">
                  {selectedJob.matchReasons.slice(0, 3).map((r) => (
                    <div key={r.key} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                        <strong>{r.label}:</strong> {r.details}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => onApplyJob(selectedJob)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  {t.applyNow}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onTailorCv(selectedJob)}
                    className="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <FileEdit className="w-3.5 h-3.5 text-blue-500" />
                    <span>Tailor CV</span>
                  </button>
                  <button
                    onClick={() => onSaveToTracker(selectedJob)}
                    className="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save Job</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-slate-400 space-y-2">
              <MapPin className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">
                {language === 'ar' ? 'انقر على أي نقطة على الخريطة لعرض تفاصيل الوظيفة' : 'Click on any location pin on the map to inspect job details'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
