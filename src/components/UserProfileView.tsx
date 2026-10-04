import React, { useState, useRef, useId } from 'react';
import { 
  User, 
  Camera, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Globe, 
  Github, 
  Linkedin, 
  Clock, 
  ArrowRight, 
  Sliders, 
  Layers, 
  Check, 
  RotateCcw,
  Eye,
  Building2,
  FileText
} from 'lucide-react';
import { Language, UserProfile, WorkExperienceItem } from '../types';
import { translations } from '../i18n/translations';
import { Button, Badge, Card, Modal } from './ui';

interface UserProfileViewProps {
  language: Language;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onNavigate: (tabId: string, params?: any) => void;
}

const PRESET_AVATARS = [
  {
    id: 'default-photo',
    labelEn: 'Official Photo Icon',
    labelAr: 'صورة الأيقونة الرسمية',
    url: '/profile-icon.jpg',
    tag: 'Recommended'
  },
  {
    id: 'tech-photo-1',
    labelEn: 'Tech Specialist (Studio)',
    labelAr: 'أخصائية تقنية (استوديو)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces',
    tag: 'Classic'
  },
  {
    id: 'tech-photo-2',
    labelEn: 'Product Leader',
    labelAr: 'قائدة منتجات رقمية',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces',
    tag: 'Executive'
  },
  {
    id: 'tech-photo-3',
    labelEn: 'Modern Creative',
    labelAr: 'إبداعي حديث',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces',
    tag: 'Modern'
  }
];

const SUGGESTED_SKILLS = [
  'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX Design', 
  'Product Strategy', 'REST APIs', 'Git', 'Agile/Scrum', 'GraphQL', 
  'Node.js', 'Figma', 'System Design', 'Performance Optimization'
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  language,
  user,
  onUpdateUser,
  onNavigate
}) => {
  const isAr = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarUploadInputId = useId();

  // Photo modal & avatar state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar || '/profile-icon.jpg');
  const [isDragOver, setIsDragOver] = useState(false);

  // Form edit states
  const [name, setName] = useState(user.name || 'Nada Nemr');
  const [email, setEmail] = useState(user.email || 'nadaanemr@gmail.com');
  const [phone, setPhone] = useState(user.phone || '+20 100 882 3419');
  const [title, setTitle] = useState(user.title || 'Product & Tech Specialist');
  const [location, setLocation] = useState(user.location || 'Cairo, Egypt (New Cairo & Maadi)');
  const [targetRole, setTargetRole] = useState(user.targetRole || 'Senior Frontend & Product Engineer');
  const [targetSalary, setTargetSalary] = useState(user.targetSalary || '55,000 EGP/mo');
  const [preferredWorkMode, setPreferredWorkMode] = useState(user.preferredWorkMode || 'Hybrid / Flexible');
  const [noticePeriod, setNoticePeriod] = useState(user.noticePeriod || 'Immediately / 2 Weeks');
  const [openToWork, setOpenToWork] = useState(user.openToWork ?? true);
  
  const [bio, setBio] = useState(
    user.bio || 
    'Product-minded Frontend Engineer & Tech Specialist with 5+ years of experience building high-scale web platforms in Cairo and the MENA region. Passionate about user-centric interfaces, performance, and hyperlocal career technology.'
  );

  const [linkedin, setLinkedin] = useState(user.linkedin || 'https://linkedin.com/in/nada-nemr');
  const [github, setGithub] = useState(user.github || 'https://github.com/nadanemr');
  const [portfolio, setPortfolio] = useState(user.portfolio || 'https://nadanemr.dev');
  const [education, setEducation] = useState(user.education || 'B.Sc. in Computer Science & Information Systems, Cairo University');

  // Skills
  const [skills, setSkills] = useState<string[]>(() => {
    return user.skills && user.skills.length > 0 
      ? user.skills 
      : ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Product Strategy', 'UI/UX Design', 'REST APIs', 'Git', 'Agile/Scrum', 'Performance Optimization'];
  });
  const [newSkillInput, setNewSkillInput] = useState('');

  // Work history
  const [workHistory, setWorkHistory] = useState<WorkExperienceItem[]>(() => {
    return user.workHistory && user.workHistory.length > 0
      ? user.workHistory
      : [
          {
            id: 'wh-1',
            role: 'Senior Frontend Specialist',
            company: 'Noon Digital',
            period: '2023 - Present',
            description: 'Leading client architecture and design systems for MENA e-commerce web applications with focus on speed and accessible UX.'
          },
          {
            id: 'wh-2',
            role: 'Frontend Engineer',
            company: 'Swvl',
            period: '2021 - 2023',
            description: 'Engineered high-concurrency booking flows, real-time vehicle dispatch maps, and driver communication portals.'
          },
          {
            id: 'wh-3',
            role: 'Software Developer',
            company: '_VOIS (Vodafone Intelligent Solutions)',
            period: '2019 - 2021',
            description: 'Developed responsive enterprise dashboards, internal microfrontends, and automated testing suites.'
          }
        ];
  });

  // New experience form toggle
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');

  // Notification feedback
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Profile strength calculation
  const profileCompletionPercent = 96;

  // Handle Photo File Upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(isAr ? 'يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)' : 'Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCurrentAvatar(dataUrl);
        // Persist immediately in active profile
        const updated: UserProfile = {
          ...user,
          avatar: dataUrl
        };
        onUpdateUser(updated);
        setSaveStatus(isAr ? 'تم تحديث أيقونة الصورة بنجاح!' : 'Photo icon updated successfully!');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetAvatar = (url: string) => {
    setCurrentAvatar(url);
    const updated: UserProfile = {
      ...user,
      avatar: url
    };
    onUpdateUser(updated);
    setSaveStatus(isAr ? 'تم اعتماد الصورة المحددة!' : 'Selected photo applied!');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // Skill management
  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Add work experience item
  const handleSaveExperience = () => {
    if (!newExpRole || !newExpCompany) return;
    const newItem: WorkExperienceItem = {
      id: `wh-${Date.now()}`,
      role: newExpRole.trim(),
      company: newExpCompany.trim(),
      period: newExpPeriod.trim() || '2023 - Present',
      description: newExpDesc.trim() || 'Contributed to high-impact technical initiatives and cross-functional teams.'
    };
    setWorkHistory([newItem, ...workHistory]);
    setNewExpRole('');
    setNewExpCompany('');
    setNewExpPeriod('');
    setNewExpDesc('');
    setIsAddingExperience(false);
  };

  const handleDeleteExperience = (id: string) => {
    setWorkHistory(workHistory.filter(w => w.id !== id));
  };

  // Save All Changes
  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updatedProfile: UserProfile = {
      ...user,
      name: name.trim() || 'Nada Nemr',
      email: email.trim() || 'nadaanemr@gmail.com',
      phone: phone.trim(),
      title: title.trim(),
      location: location.trim(),
      targetRole: targetRole.trim(),
      targetSalary: targetSalary.trim(),
      preferredWorkMode: preferredWorkMode.trim(),
      avatar: currentAvatar,
      noticePeriod: noticePeriod.trim(),
      openToWork,
      bio: bio.trim(),
      linkedin: linkedin.trim(),
      github: github.trim(),
      portfolio: portfolio.trim(),
      education: education.trim(),
      skills,
      workHistory,
      profileStrength: profileCompletionPercent
    };

    onUpdateUser(updatedProfile);
    setSaveStatus(isAr ? 'تم حفظ كافة بيانات الملف الشخصي بنجاح!' : 'Profile updated and saved successfully!');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Toast Notification Banner */}
      {saveStatus && (
        <div 
          id="profile-save-status-banner"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-400/40"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-100 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* 1. Header Hero Card with Photo Icon Showcase */}
      <div className="relative rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 border border-blue-800/40 shadow-xl overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Avatar and Basic Identifiers */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left rtl:sm:text-right">
            
            {/* Main Interactive Photo Icon */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-blue-500/80 shadow-2xl bg-slate-800 relative">
                <img
                  id="profile-hero-avatar-image"
                  src={currentAvatar}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to official icon
                    (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                  }}
                />
                
                {/* Overlay hover prompt to change photo */}
                <button
                  id="profile-avatar-overlay-btn"
                  onClick={() => setPhotoModalOpen(true)}
                  className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 cursor-pointer"
                  title={isAr ? 'تغيير صورة الحساب' : 'Change profile photo'}
                >
                  <Camera className="w-6 h-6 text-blue-300 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {isAr ? 'تغيير الصورة' : 'Change Photo'}
                  </span>
                </button>
              </div>

              {/* Quick Camera Action Badge */}
              <button
                id="profile-avatar-camera-badge"
                onClick={() => setPhotoModalOpen(true)}
                className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg border-2 border-slate-900 transition-transform active:scale-95 cursor-pointer"
                title={isAr ? 'تعديل أو رفع صورة' : 'Edit or upload photo'}
              >
                <Camera className="w-4 h-4" />
              </button>

              {/* Online verified indicator */}
              <div 
                className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-slate-900 flex items-center justify-center"
                title={isAr ? 'مرشح موثق ونشط' : 'Active verified candidate'}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Name, Headline, Location */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <h1 id="profile-hero-name" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {name}
                </h1>
                {openToWork && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{isAr ? 'متاحة للتوظيف الفوري' : 'Open to Opportunities'}</span>
                  </span>
                )}
                {user.isPremium && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>PRO</span>
                  </span>
                )}
              </div>

              <p id="profile-hero-title" className="text-sm sm:text-base text-blue-200 font-semibold">
                {title}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-300 flex-wrap pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-300 font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{targetSalary}</span>
                </span>
                <span>•</span>
                <span className="text-blue-300">{preferredWorkMode}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <Button
              id="profile-save-top-btn"
              onClick={() => handleSaveAll()}
              variant="primary"
              size="sm"
              icon={<Save className="w-4 h-4" />}
              className="shadow-md shadow-brand-blue/30"
            >
              <span>{isAr ? 'حفظ التعديلات' : 'Save Changes'}</span>
            </Button>

            <Button
              id="profile-manage-photo-btn"
              onClick={() => setPhotoModalOpen(true)}
              variant="outline"
              size="sm"
              icon={<Camera className="w-3.5 h-3.5 text-cyan-300" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <span>{isAr ? 'إدارة صورة الحساب' : 'Manage Photo Icon'}</span>
            </Button>

            <Button
              id="profile-goto-dashboard-btn"
              onClick={() => onNavigate('dashboard')}
              variant="secondary"
              size="sm"
              icon={<Eye className="w-3.5 h-3.5 text-slate-400" />}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
            >
              <span>{isAr ? 'لوحة التحكم والمطابقة' : 'View Dashboard'}</span>
            </Button>
          </div>
        </div>

        {/* Profile Strength Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-black text-sm">
              {profileCompletionPercent}%
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {isAr ? 'اكتمال الملف الشخصي الاحترافي' : 'Profile Strength & Recruiter Visibility'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'الصورة الشخصية معتمدة ومطابقة لمتطلبات التوظيف' : 'Photo icon verified & matched with Cairo top tech employers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('cv-optimizer')}
              className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'فحص السيرة الذاتية (ATS: 89%)' : 'Check ATS Score (89%)'}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs font-semibold text-blue-300 hover:text-blue-200 flex items-center gap-1 transition cursor-pointer"
            >
              <span>{isAr ? 'استكشاف الوظائف المناسبة' : 'Matching Jobs'}</span>
              <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Profile Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Contact, Targets, Bio, Experience */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* A. Personal Information & Contact */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isAr ? 'البيانات الأساسية ومعلومات التواصل' : 'Personal & Contact Information'}</span>
              </h2>
              <span className="text-xs text-slate-400">
                {isAr ? 'مرئية لمسؤولي التوظيف المعتمدين' : 'Visible to verified recruiters'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  id="profile-input-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Nada Nemr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'المسمى الوظيفي الحالي' : 'Current Professional Title'}
                </label>
                <input
                  id="profile-input-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Product & Tech Specialist"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isAr ? 'البريد الإلكتروني' : 'Email Address'}</span>
                </label>
                <input
                  id="profile-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. nadaanemr@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}</span>
                </label>
                <input
                  id="profile-input-phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+20 100 882 3419"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isAr ? 'المنطقة والموقع الجغرافي' : 'Location & Commute Target'}</span>
                </label>
                <input
                  id="profile-input-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cairo, Egypt (New Cairo & Maadi)"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'نبذة مهنية موجزة' : 'Professional Summary / Bio'}
                </label>
                <textarea
                  id="profile-input-bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  placeholder="Describe your background, technical depth, and key career strengths..."
                />
              </div>
            </div>
          </div>

          {/* B. Career Targets & Compensation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isAr ? 'الأهداف الوظيفية والراتب المستهدف' : 'Career Target & Preferences'}</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                {isAr ? 'يحدد جودة المطابقة' : 'Powers Job Radar'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'المسمى المستهدف للوظيفة التالية' : 'Target Next Role'}
                </label>
                <input
                  id="profile-input-target-role"
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Senior Frontend & Product Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'الراتب المستهدف (شهرياً)' : 'Expected Target Salary'}
                </label>
                <input
                  id="profile-input-target-salary"
                  type="text"
                  value={targetSalary}
                  onChange={(e) => setTargetSalary(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 55,000 EGP/mo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'نمط العمل المفضل' : 'Preferred Work Mode'}
                </label>
                <select
                  id="profile-select-work-mode"
                  value={preferredWorkMode}
                  onChange={(e) => setPreferredWorkMode(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Hybrid / Flexible">Hybrid / Flexible</option>
                  <option value="Remote / Work From Home">Remote / Work From Home</option>
                  <option value="On-site / Office">On-site / Office</option>
                  <option value="Open to Any">Open to Any</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isAr ? 'فترة الإخطار والجاهزية' : 'Notice Period / Availability'}
                </label>
                <select
                  id="profile-select-notice-period"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Immediately / 2 Weeks">Immediately / 2 Weeks</option>
                  <option value="1 Month Notice">1 Month Notice</option>
                  <option value="2 Months Notice">2 Months Notice</option>
                  <option value="Exploring Options Only">Exploring Options Only</option>
                </select>
              </div>
            </div>

            {/* Open to work toggle */}
            <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {isAr ? 'إتاحة الملف لمسؤولي التوظيف في مصر' : 'Active Candidate Status in Cairo'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isAr ? 'يسمح للشركات المعتمدة بالوصول المباشر لملفك ورقم التواصل' : 'Allows verified companies on Opify to reach out directly with interviews'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={openToWork}
                  onChange={(e) => setOpenToWork(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* C. Work Experience Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{isAr ? 'الخبرات المهنية السابقة' : 'Work Experience'}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'تجارب العمل والإنجازات التقنية' : 'Career timeline and key achievements'}
                </p>
              </div>

              {!isAddingExperience && (
                <button
                  id="profile-add-experience-btn"
                  onClick={() => setIsAddingExperience(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة خبرة' : 'Add Experience'}</span>
                </button>
              )}
            </div>

            {/* Add Experience Form */}
            {isAddingExperience && (
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300">
                    {isAr ? 'إضافة دور وظيفي جديد' : 'New Role Details'}
                  </h3>
                  <button
                    onClick={() => setIsAddingExperience(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newExpRole}
                    onChange={(e) => setNewExpRole(e.target.value)}
                    placeholder={isAr ? 'المسمى الوظيفي (مثال: Senior Frontend Engineer)' : 'Job Role'}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <input
                    type="text"
                    value={newExpCompany}
                    onChange={(e) => setNewExpCompany(e.target.value)}
                    placeholder={isAr ? 'اسم الشركة (مثال: Noon / Swvl)' : 'Company Name'}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <input
                    type="text"
                    value={newExpPeriod}
                    onChange={(e) => setNewExpPeriod(e.target.value)}
                    placeholder={isAr ? 'الفترة (مثال: 2021 - 2023)' : 'Period (e.g. 2021 - 2023)'}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 sm:col-span-2"
                  />
                  <textarea
                    value={newExpDesc}
                    onChange={(e) => setNewExpDesc(e.target.value)}
                    placeholder={isAr ? 'ملخص الإنجازات والتقنيات المستخدمة...' : 'Key contributions and tech stack used...'}
                    rows={2}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 sm:col-span-2"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsAddingExperience(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSaveExperience}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs cursor-pointer"
                  >
                    {isAr ? 'حفظ التجربة' : 'Save Position'}
                  </button>
                </div>
              </div>
            )}

            {/* Experience List */}
            <div className="space-y-4">
              {workHistory.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h4>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        @{item.company}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.period}</span>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteExperience(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 transition cursor-pointer"
                    title={isAr ? 'حذف هذه الخبرة' : 'Delete experience'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Photo Icon Preview, Skills, Links, Education */}
        <div className="space-y-6">
          
          {/* A. Photo Icon Spotlight Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-center">
            <div className="flex items-center justify-between text-left rtl:text-right">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isAr ? 'أيقونة الصورة الشخصية' : 'Photo Icon Preview'}</span>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                {isAr ? 'نشطة' : 'Active'}
              </span>
            </div>

            {/* Big avatar preview with ring */}
            <div className="flex justify-center py-2">
              <div className="relative">
                <img
                  src={currentAvatar}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-500/80 shadow-lg mx-auto"
                />
                <button
                  id="profile-open-photo-modal-spotlight"
                  onClick={() => setPhotoModalOpen(true)}
                  className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md border-2 border-white dark:border-slate-900 transition cursor-pointer"
                  title={isAr ? 'تغيير الصورة' : 'Change photo'}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {isAr ? 'تظهر هذه الصورة في الشريط العلوي وقوائم المتقدمين للوظائف' : 'This photo icon appears across the navigation bar, applications, and recruiter dashboards.'}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                id="profile-upload-spotlight-btn"
                onClick={() => setPhotoModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isAr ? 'تغيير / رفع صورة جديدة' : 'Change / Upload Photo'}</span>
              </button>
              
              <button
                id="profile-reset-default-photo-btn"
                onClick={() => handleSelectPresetAvatar('/profile-icon.jpg')}
                className="w-full py-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isAr ? 'إعادة ضبط للصورة الرسمية' : 'Reset to Official Photo Icon'}</span>
              </button>
            </div>
          </div>

          {/* B. Skills Matrix */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isAr ? 'المهارات والتقنيات' : 'Skills & Tech Stack'}</span>
              </h3>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                {skills.length} {isAr ? 'مهارات' : 'Skills'}
              </span>
            </div>

            {/* Add skill input */}
            <div className="flex gap-2">
              <input
                id="profile-new-skill-input"
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newSkillInput);
                  }
                }}
                placeholder={isAr ? 'أضف مهارة واضغط Enter' : 'Add skill & press Enter'}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                id="profile-add-skill-btn"
                type="button"
                onClick={() => handleAddSkill(newSkillInput)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Active skill tags */}
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 group border border-slate-200/60 dark:border-slate-700/60"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    title={isAr ? 'إزالة' : 'Remove'}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Suggestions quick add */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] text-slate-400 font-semibold mb-2">
                {isAr ? 'مقترحات شائعة للوظيفة المستهدفة:' : 'Recommended for your role:'}
              </p>
              <div className="flex flex-wrap gap-1">
                {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).slice(0, 6).map((suggested) => (
                  <button
                    key={suggested}
                    onClick={() => handleAddSkill(suggested)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-medium transition cursor-pointer flex items-center gap-0.5"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>{suggested}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* C. Social & Professional Profiles */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isAr ? 'الروابط المهنية وحسابات التواصل' : 'Professional Links'}</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-blue-500" />
                  <span>LinkedIn Profile</span>
                </label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/nada-nemr"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                  <span>GitHub Profile</span>
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/nadanemr"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-500" />
                  <span>Personal Portfolio</span>
                </label>
                <input
                  type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://nadanemr.dev"
                />
              </div>
            </div>
          </div>

          {/* D. Education */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isAr ? 'التعليم والمؤهلات' : 'Education & Credentials'}</span>
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                {isAr ? 'الدرجة العلمية والجامعة' : 'Degree & University'}
              </label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile for Quick Save */}
      <div className="sm:hidden fixed bottom-14 inset-x-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 flex gap-2">
        <button
          onClick={() => handleSaveAll()}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isAr ? 'حفظ الملف الشخصي' : 'Save Profile Changes'}</span>
        </button>
        <button
          onClick={() => setPhotoModalOpen(true)}
          className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Photo Management & Upload Modal */}
      <Modal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        title={isAr ? 'إدارة صورة الأيقونة والحساب' : 'Profile Photo & Icon Manager'}
        description={isAr ? 'اختر صورتك المعتمدة أو ارفع صورة شخصية جديدة' : 'Choose your photo icon or upload a custom photo file'}
        size="lg"
      >
        <div className="space-y-6">
          {/* Current Selected Photo Preview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <img
              src={currentAvatar}
              alt="Current Preview"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-blue shadow-md shrink-0"
            />
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'الصورة المعروضة حالياً' : 'Current Active Photo Icon'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isAr ? 'تظهر بدقة عالية في كل أجزاء المنصة' : 'Displayed in high resolution across all Opify modules.'}
              </p>
            </div>
          </div>

          {/* Drag and Drop File Upload Area */}
          <div>
            <label 
              htmlFor={avatarUploadInputId}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition ${
                isDragOver
                  ? 'border-brand-blue bg-blue-50/50 dark:bg-blue-950/40'
                  : 'border-slate-300 dark:border-slate-700 hover:border-brand-blue hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Upload className="w-8 h-8 text-brand-blue dark:text-blue-400 mb-2" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
                {isAr ? 'اضغط لرفع صورة من جهازك أو اسحب الملف هنا' : 'Click to upload your photo or drag & drop'}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                PNG, JPG, WebP (Square 1:1 recommended)
              </p>
              <input
                id={avatarUploadInputId}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          {/* Curated Presets Selection */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isAr ? 'أو اختر من المعرض الاحترافي المعتمد:' : 'Or choose from verified photo options:'}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_AVATARS.map((preset) => {
                const isSelected = currentAvatar === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPresetAvatar(preset.url)}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer relative ${
                      isSelected
                        ? 'border-brand-blue bg-blue-50/60 dark:bg-blue-950/60 ring-2 ring-brand-blue'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.labelEn}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {isAr ? preset.labelAr : preset.labelEn}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-brand-blue text-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSelectPresetAvatar('/profile-icon.jpg')}
              className="text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isAr ? 'استرجاع صورة الأيقونة الأصلية' : 'Use Official Photo Icon'}</span>
            </button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                setPhotoModalOpen(false);
                handleSaveAll();
              }}
              className="shadow-md shadow-brand-blue/20"
            >
              {isAr ? 'تم واعتماد الصورة' : 'Done & Apply'}
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
