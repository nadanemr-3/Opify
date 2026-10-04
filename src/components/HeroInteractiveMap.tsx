import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Navigation, 
  Move, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus, 
  ExternalLink, 
  Zap, 
  Building2,
  ArrowRight,
  Compass,
  SlidersHorizontal
} from 'lucide-react';
import { Language, DiscoveredJob } from '../types';

interface HeroInteractiveMapProps {
  language: Language;
  onNavigate: (tabId: string, params?: any) => void;
  featuredJobs: DiscoveredJob[];
  onSelectJob: (job: DiscoveredJob) => void;
}

interface DistrictPoint {
  id: string;
  nameEn: string;
  nameAr: string;
  x: number;
  y: number;
  jobCount: number;
  featuredJobId?: string;
}

export const HeroInteractiveMap: React.FC<HeroInteractiveMapProps> = ({
  language,
  onNavigate,
  featuredJobs,
  onSelectJob,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map Pan and Zoom State
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.05);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [autoMove, setAutoMove] = useState<boolean>(true);
  const [selectedPinId, setSelectedPinId] = useState<string>('job-sales-1');
  const [lastUserInteraction, setLastUserInteraction] = useState<number>(0);

  // Cairo Opportunity Hubs
  const districts: DistrictPoint[] = [
    { id: 'maadi', nameEn: 'Maadi', nameAr: 'المعادي', x: 500, y: 460, jobCount: 14, featuredJobId: 'job-sales-1' },
    { id: 'new-cairo', nameEn: 'New Cairo', nameAr: 'التجمع الخامس', x: 740, y: 360, jobCount: 22, featuredJobId: 'job-fe-1' },
    { id: 'nasr-city', nameEn: 'Nasr City', nameAr: 'مدينة نصر', x: 630, y: 270, jobCount: 18, featuredJobId: 'job-part-time-sales-2' },
    { id: 'dokki', nameEn: 'Dokki / Giza', nameAr: 'الدقي والمهندسين', x: 380, y: 340, jobCount: 11, featuredJobId: 'job-sales-2' },
    { id: 'smart-village', nameEn: 'Smart Village', nameAr: 'القرية الذكية', x: 190, y: 220, jobCount: 9, featuredJobId: 'job-devops-1' },
    { id: 'heliopolis', nameEn: 'Heliopolis', nameAr: 'مصر الجديدة', x: 610, y: 170, jobCount: 15 }
  ];

  // User home base location
  const userLocation = { x: 500, y: 460, name: language === 'ar' ? 'أنت (المعادي)' : 'You (Maadi)' };

  // Current featured jobs mapped to map coordinates
  const mapJobs = [
    {
      id: 'job-sales-1',
      titleEn: 'Sales Assistant',
      titleAr: 'مساعد مبيعات',
      company: 'Apex Retail',
      location: 'Maadi',
      salary: '6,000 EGP/mo',
      distance: '1.2 km',
      matchScore: 94,
      x: 525,
      y: 440,
      highlight: true
    },
    {
      id: 'job-part-time-sales-2',
      titleEn: 'Part-Time Evening Rep',
      titleAr: 'ممثل مبيعات مسائي',
      company: 'Urban Connect',
      location: 'Nasr City',
      salary: '4,500 - 6,000 EGP',
      distance: '2.8 km',
      matchScore: 96,
      x: 645,
      y: 285,
      highlight: false
    },
    {
      id: 'job-fe-1',
      titleEn: 'Frontend Engineer',
      titleAr: 'مهندس واجهات أمامية',
      company: 'FinPulse MENA',
      location: 'New Cairo',
      salary: '45k - 55k EGP',
      distance: '4.5 km',
      matchScore: 91,
      x: 755,
      y: 380,
      highlight: false
    },
    {
      id: 'job-call-center-1',
      titleEn: 'Customer Advisor',
      titleAr: 'مستشار خدمة عملاء',
      company: 'Raya CX',
      location: 'Dokki',
      salary: '7,000 EGP/mo',
      distance: '5.1 km',
      matchScore: 92,
      x: 360,
      y: 350,
      highlight: false
    }
  ];

  // Auto-Move Animation: Smoothly pans between Cairo districts
  useEffect(() => {
    if (!autoMove) return;

    const waypoints = [
      { x: -10, y: -20, pin: 'job-sales-1' },       // Maadi focus
      { x: -120, y: 40, pin: 'job-part-time-sales-2' }, // Nasr City
      { x: -190, y: -10, pin: 'job-fe-1' },          // New Cairo
      { x: 40, y: 10, pin: 'job-call-center-1' },    // Dokki
      { x: -30, y: -15, pin: 'job-sales-1' }         // Back to Maadi
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      // If user interacted recently, wait before auto-moving
      if (Date.now() - lastUserInteraction < 8000) {
        return;
      }

      currentStep = (currentStep + 1) % waypoints.length;
      const target = waypoints[currentStep];
      
      setPan({ x: target.x, y: target.y });
      setSelectedPinId(target.pin);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoMove, lastUserInteraction]);

  // Mouse & Touch Drag Handlers for free movement
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoMove(false);
    setLastUserInteraction(Date.now());
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: Math.max(-280, Math.min(280, e.clientX - dragStart.x)),
      y: Math.max(-200, Math.min(200, e.clientY - dragStart.y))
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setAutoMove(false);
      setLastUserInteraction(Date.now());
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: Math.max(-280, Math.min(280, e.touches[0].clientX - dragStart.x)),
      y: Math.max(-200, Math.min(200, e.touches[0].clientY - dragStart.y))
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAutoMove(false);
    setLastUserInteraction(Date.now());
    setZoom((prev) => Math.min(prev + 0.2, 1.8));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAutoMove(false);
    setLastUserInteraction(Date.now());
    setZoom((prev) => Math.max(prev - 0.2, 0.75));
  };

  const handleRecenter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPan({ x: 0, y: 0 });
    setZoom(1.05);
    setSelectedPinId('job-sales-1');
    setAutoMove(true);
    setLastUserInteraction(0);
  };

  // Quick jump to a district
  const handleDistrictJump = (district: DistrictPoint) => {
    setAutoMove(false);
    setLastUserInteraction(Date.now());
    
    // Calculate offset to bring district towards center
    const targetX = -(district.x - 500) * 0.75;
    const targetY = -(district.y - 375) * 0.75;
    
    setPan({ x: targetX, y: targetY });
    if (district.featuredJobId) {
      setSelectedPinId(district.featuredJobId);
    }
  };

  // Selected job information
  const activeJob = mapJobs.find((j) => j.id === selectedPinId) || mapJobs[0];
  const activeFeaturedJob = featuredJobs.find((j) => j.id.includes(activeJob.id.replace('job-', ''))) || featuredJobs[0];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white select-none transition-colors">
      
      {/* Top Map Header & Live Movement Status Bar */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-white/90 via-white/60 to-transparent dark:from-slate-950/90 dark:via-slate-950/60 dark:to-transparent backdrop-blur-xs transition-colors">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${autoMove ? 'bg-emerald-400' : 'bg-blue-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${autoMove ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          </span>
          <span className="text-xs font-bold tracking-wide text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {autoMove 
              ? (language === 'ar' ? 'مسح راداري متحرك • القاهرة الكبرى' : 'Live Radar Scanning • Moving across Cairo')
              : (language === 'ar' ? 'تحكم يدوي بالخريطة (اسحب للتحريك)' : 'Interactive Pan Mode (Drag to move)')
            }
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setAutoMove(!autoMove);
              setLastUserInteraction(Date.now());
            }}
            className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition cursor-pointer border ${
              autoMove 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 dark:hover:bg-emerald-500/30' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
            }`}
            title={autoMove ? 'Pause auto movement' : 'Resume auto movement'}
          >
            {autoMove ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{autoMove ? (language === 'ar' ? 'إيقاف' : 'Pause') : (language === 'ar' ? 'تحريك تلقائي' : 'Auto Move')}</span>
          </button>

          <button
            onClick={() => onNavigate('jobs', { view: 'map' })}
            className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer shadow-xs"
            title="Open full screen map"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">{language === 'ar' ? 'الخريطة الكاملة' : 'Full Map'}</span>
          </button>
        </div>
      </div>

      {/* Main Draggable / Movable Canvas Area */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative h-[440px] sm:h-[480px] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        title={language === 'ar' ? 'انقر واسحب لتحريك الخريطة' : 'Click and drag to move map'}
      >
        
        {/* Transforming Map Viewport Container */}
        <div 
          className="absolute inset-0 w-full h-full origin-center transition-transform"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom})`,
            transitionDuration: isDragging ? '0ms' : '650ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          
          {/* Cairo SVG Background: Nile, Ring Road, Metro, Grid */}
          <svg 
            className="w-full h-full min-w-[800px] min-h-[600px] pointer-events-none" 
            viewBox="0 0 1000 750" 
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Subtle City Coordinate Grid */}
              <pattern id="hero-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-slate-300/70 dark:stroke-sky-500/10" strokeWidth="1" />
                <circle cx="0" cy="0" r="1.5" className="fill-slate-400/40 dark:fill-sky-400/20" />
              </pattern>

              {/* Glowing River Nile Gradient (Light Mode) */}
              <linearGradient id="heroNileGradientLight" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
              </linearGradient>

              {/* Glowing River Nile Gradient (Dark Mode) */}
              <linearGradient id="heroNileGradientDark" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#2563eb" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
              </linearGradient>

              {/* Radar Glow Filter */}
              <filter id="radarBloom" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Coordinate Grid */}
            <rect width="100%" height="100%" fill="url(#hero-map-grid)" />

            {/* River Nile (Light Mode) */}
            <path
              d="M 500 750 C 490 620, 440 500, 430 400 C 420 300, 450 180, 420 0"
              fill="none"
              stroke="url(#heroNileGradientLight)"
              strokeWidth="26"
              strokeLinecap="round"
              className="block dark:hidden"
            />
            {/* River Nile (Dark Mode) */}
            <path
              d="M 500 750 C 490 620, 440 500, 430 400 C 420 300, 450 180, 420 0"
              fill="none"
              stroke="url(#heroNileGradientDark)"
              strokeWidth="26"
              strokeLinecap="round"
              filter="url(#radarBloom)"
              className="hidden dark:block"
            />

            {/* Nile River Current Flow Dash Effect */}
            <path
              d="M 500 750 C 490 620, 440 500, 430 400 C 420 300, 450 180, 420 0"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-river-flow opacity-80 block dark:hidden"
            />
            <path
              d="M 500 750 C 490 620, 440 500, 430 400 C 420 300, 450 180, 420 0"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-river-flow opacity-70 hidden dark:block"
            />

            {/* Cairo Ring Road (Highway Loop Connecting All Districts) */}
            <ellipse
              cx="500"
              cy="380"
              rx="330"
              ry="230"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="opacity-70 block dark:hidden"
            />
            <ellipse
              cx="500"
              cy="380"
              rx="330"
              ry="230"
              fill="none"
              stroke="#334155"
              strokeWidth="4"
              strokeDasharray="8 6"
              className="opacity-60 hidden dark:block"
            />
            <ellipse
              cx="500"
              cy="380"
              rx="330"
              ry="230"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="20 180"
              className="animate-river-flow opacity-80 block dark:hidden"
            />
            <ellipse
              cx="500"
              cy="380"
              rx="330"
              ry="230"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="20 180"
              className="animate-river-flow opacity-90 hidden dark:block"
            />

            {/* Radial Distance Rings from User (Maadi) */}
            <circle cx="500" cy="460" r="80" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 3" className="opacity-40 dark:opacity-40" />
            <circle cx="500" cy="460" r="170" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" className="opacity-30 dark:opacity-30" />
            <circle cx="500" cy="460" r="260" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="5 5" className="opacity-25 dark:opacity-20" />

            {/* Distance Ring Markers */}
            <text x="500" y="375" className="fill-blue-600 dark:fill-blue-400" fontSize="10" opacity="0.8" textAnchor="middle">2 km</text>
            <text x="500" y="285" className="fill-blue-600 dark:fill-blue-400" fontSize="10" opacity="0.7" textAnchor="middle">5 km</text>
            <text x="500" y="195" className="fill-blue-600 dark:fill-blue-400" fontSize="10" opacity="0.6" textAnchor="middle">15 km</text>

            {/* District Area Watermarks */}
            <text x="500" y="525" className="fill-slate-400 dark:fill-slate-500" fontSize="13" fontWeight="700" textAnchor="middle">MAADI</text>
            <text x="750" y="330" className="fill-slate-400 dark:fill-slate-500" fontSize="13" fontWeight="700" textAnchor="middle">NEW CAIRO</text>
            <text x="640" y="240" className="fill-slate-400 dark:fill-slate-500" fontSize="13" fontWeight="700" textAnchor="middle">NASR CITY</text>
            <text x="350" y="315" className="fill-slate-400 dark:fill-slate-500" fontSize="13" fontWeight="700" textAnchor="middle">DOKKI</text>
            <text x="180" y="190" className="fill-slate-400 dark:fill-slate-500" fontSize="12" fontWeight="700" textAnchor="middle">SMART VILLAGE</text>
          </svg>

          {/* 360-Degree Continuous Rotating Radar Scanner */}
          <div 
            className="absolute left-[500px] top-[460px] -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[520px] h-[520px]"
          >
            {/* Expanding Sonar Ping Waves */}
            <div className="absolute inset-0 rounded-full border border-blue-500/40 dark:border-blue-400/40 animate-sonar-wave" />
            <div className="absolute inset-0 rounded-full border border-sky-500/30 dark:border-cyan-400/30 animate-sonar-wave" style={{ animationDelay: '1.75s' }} />

            {/* Rotating Radar Sweep Cone */}
            <div className="w-full h-full rounded-full animate-radar-sweep relative">
              <div 
                className="w-1/2 h-1/2 absolute right-1/2 bottom-1/2 origin-bottom-right"
                style={{
                  background: 'conic-gradient(from 180deg at 100% 100%, rgba(56, 189, 248, 0.25) 0deg, rgba(37, 99, 235, 0.12) 30deg, transparent 60deg)'
                }}
              />
              {/* Luminous Radar Leading Sweep Line */}
              <div className="absolute left-1/2 top-0 bottom-1/2 w-0.5 bg-gradient-to-t from-blue-600 via-sky-400 to-transparent dark:from-cyan-300 dark:via-blue-400 dark:to-transparent shadow-[0_0_10px_#38bdf8]" />
            </div>
          </div>

          {/* User Location Pin: Maadi (Center of radar) */}
          <div 
            className="absolute left-[500px] top-[460px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleRecenter(e);
            }}
          >
            <div className="relative">
              <span className="animate-ping absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-400 opacity-80" />
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 ring-4 ring-blue-400/30">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
            </div>
            <span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-blue-800 border border-blue-200 shadow-md dark:bg-slate-900/90 dark:text-cyan-300 text-[11px] font-bold dark:border-cyan-500/40 backdrop-blur-xs whitespace-nowrap">
              {userLocation.name}
            </span>
          </div>

          {/* Cairo Opportunity Job Pins */}
          {mapJobs.map((job) => {
            const isSelected = selectedPinId === job.id;
            return (
              <div
                key={job.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPinId(job.id);
                  setAutoMove(false);
                  setLastUserInteraction(Date.now());
                }}
                style={{
                  left: `${job.x}px`,
                  top: `${job.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-25 group cursor-pointer transition-all duration-300"
              >
                {/* Ping wave around beacon */}
                <div className="relative flex items-center justify-center">
                  <span className={`animate-ping absolute h-8 w-8 rounded-full ${isSelected ? 'bg-emerald-400/80' : 'bg-blue-400/40'}`} />
                  
                  {/* Pin Node */}
                  <div className={`relative px-2 py-1 rounded-xl flex items-center gap-1.5 font-bold text-xs shadow-xl transition-all duration-200 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white scale-110 ring-4 ring-emerald-400/40 shadow-emerald-500/50' 
                      : 'bg-white text-slate-800 border border-slate-300 hover:border-blue-500 dark:bg-slate-900/95 dark:text-slate-200 dark:border-slate-700 dark:hover:border-blue-400 hover:scale-105 shadow-md'
                  }`}>
                    <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                    <span className="text-[11px]">{job.matchScore}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">• {job.distance}</span>
                  </div>
                </div>

                {/* Subtitle tag below pin */}
                <div className={`mt-1 text-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/95 text-slate-700 border border-slate-200 dark:bg-slate-950/85 dark:text-slate-300 dark:border-slate-800 whitespace-nowrap shadow-xs">
                    {language === 'ar' ? job.titleAr : job.titleEn}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Floating Active Job Card Overlay (Bottom Center/Left) */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:ltr:left-3 sm:rtl:right-3 sm:max-w-xs z-30 animate-gentle-float"
        >
          <div className="p-3.5 rounded-2xl bg-white/95 text-slate-900 border border-slate-200 shadow-2xl dark:bg-slate-900/95 dark:text-white dark:border-slate-700/80 backdrop-blur-md transition-colors">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40">
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {activeJob.matchScore}% {language === 'ar' ? 'تطابق بالذكاء الاصطناعي' : 'Match'}
              </span>
              <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {activeJob.distance} {language === 'ar' ? 'عنك' : 'away'}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
              {language === 'ar' ? activeJob.titleAr : activeJob.titleEn}
            </h4>
            
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {activeJob.company} • {activeJob.location}
            </p>

            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{activeJob.salary}</span>
              <button
                onClick={() => {
                  if (activeFeaturedJob) {
                    onSelectJob(activeFeaturedJob);
                  } else {
                    onNavigate('jobs');
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
              >
                <span>{language === 'ar' ? 'تفاصيل الوظيفة' : 'View Opportunity'}</span>
                <ArrowRight className="w-3 h-3 ltr:inline rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Pan & Zoom Floating Widget (Top Right) */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-14 ltr:right-3 rtl:left-3 z-30 flex flex-col gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition cursor-pointer"
            title="Zoom in"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition cursor-pointer"
            title="Zoom out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRecenter}
            className="w-7 h-7 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-cyan-400 transition cursor-pointer"
            title="Recenter map to you"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle Drag Hand Hint */}
        <div className="absolute bottom-3 ltr:right-3 rtl:left-3 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-slate-600 border border-slate-200 dark:bg-slate-950/75 dark:text-slate-400 dark:border-slate-800 backdrop-blur-xs text-[10px]">
          <Move className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
          <span>{language === 'ar' ? 'اسحب لتحريك الخريطة' : 'Drag to explore Cairo'}</span>
        </div>

      </div>

      {/* Bottom District Quick-Navigation Bar */}
      <div className="px-3 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto transition-colors">
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-300">{language === 'ar' ? 'المناطق:' : 'Districts:'}</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {districts.map((d) => (
            <button
              key={d.id}
              onClick={() => handleDistrictJump(d)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600/30 dark:hover:text-cyan-300 dark:hover:border-blue-500/40 dark:text-slate-300 dark:border-slate-700 transition cursor-pointer whitespace-nowrap"
            >
              {language === 'ar' ? d.nameAr : d.nameEn}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate('jobs', { view: 'map' })}
          className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition cursor-pointer"
        >
          <span>{language === 'ar' ? 'استعراض الكل' : 'Full Map'}</span>
          <ArrowRight className="w-3 h-3 ltr:inline rtl:rotate-180" />
        </button>
      </div>

    </div>
  );
};
