import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Language, UserProfile, UserRole } from '../types';
import { translations } from '../i18n/translations';
import { OpifyLogo } from './OpifyLogo';
import { Modal, Input, Button } from './ui';

interface AuthModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const t = translations[language];
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>('job_seeker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || (role === 'job_seeker' ? 'Nada Nemr' : role === 'employer' ? 'Apex HR Manager' : 'Admin User'),
      email: email || (role === 'job_seeker' ? 'nadaanemr@gmail.com' : 'hr@apexretail.eg'),
      role,
      avatar: role === 'job_seeker' ? '/profile-icon.jpg' : undefined,
      title: role === 'job_seeker' ? 'Product & Tech Specialist' : role === 'employer' ? 'Recruiting Lead' : 'System Admin',
      location: 'Cairo, Egypt',
      profileStrength: 94,
      cvAtsScore: 89,
      recommendedJobsCount: 16,
      activeApplicationsCount: 5,
      isPremium: true
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickDemoUser = (demoRole: UserRole) => {
    let demoUser: UserProfile;
    if (demoRole === 'job_seeker') {
      demoUser = {
        id: 'u-1',
        name: 'Nada Nemr',
        email: 'nadaanemr@gmail.com',
        role: 'job_seeker',
        avatar: '/profile-icon.jpg',
        title: 'Product & Tech Specialist',
        location: 'New Cairo, Egypt',
        profileStrength: 94,
        cvAtsScore: 89,
        recommendedJobsCount: 16,
        activeApplicationsCount: 5,
        isPremium: true
      };
    } else if (demoRole === 'employer') {
      demoUser = {
        id: 'u-emp',
        name: 'Apex Retail HR',
        email: 'recruiting@apexretail.eg',
        role: 'employer',
        title: 'Head of Talent Acquisition',
        location: 'Cairo, Egypt',
        profileStrength: 95,
        cvAtsScore: 90,
        recommendedJobsCount: 0,
        activeApplicationsCount: 0,
        isPremium: true
      };
    } else {
      demoUser = {
        id: 'u-admin',
        name: 'System Admin',
        email: 'admin@opify.internal',
        role: 'super_admin',
        title: 'Super Administrator',
        location: 'Cairo, Egypt',
        profileStrength: 100,
        cvAtsScore: 100,
        recommendedJobsCount: 0,
        activeApplicationsCount: 0,
        isPremium: true
      };
    }
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-5 -mt-2">
        {/* Brand Header */}
        <div className="flex items-center justify-center pt-1">
          <OpifyLogo size="sm" />
        </div>

        {/* Title & Mode Switch */}
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {authMode === 'login' ? t.logIn : t.getStarted}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'سجل دخولك للوصول إلى أدوات الذكاء الاصطناعي وحفظ ملفك' : 'Sign in to personalize your job radar and ATS CV scoring'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authMode === 'signup' && (
            <Input
              label="Full Name"
              id="auth-signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nada Nemr"
              startIcon={<User className="w-4 h-4" />}
            />
          )}

          <Input
            label="Email Address"
            id="auth-email-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nadaanemr@gmail.com"
            startIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            id="auth-password-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            startIcon={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="md"
            className="mt-2 text-xs sm:text-sm font-bold"
            id="auth-submit-btn"
          >
            {authMode === 'login' ? t.logIn : t.getStarted}
          </Button>
        </form>

        {/* Switch mode */}
        <div className="text-center text-xs text-slate-500">
          {authMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                id="auth-toggle-signup-btn"
                onClick={() => setAuthMode('signup')}
                className="font-bold text-brand-blue dark:text-blue-400 hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                id="auth-toggle-login-btn"
                onClick={() => setAuthMode('login')}
                className="font-bold text-brand-blue dark:text-blue-400 hover:underline cursor-pointer"
              >
                Log in
              </button>
            </span>
          )}
        </div>

        {/* 1-Click Quick Demo Switcher */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Or test with 1-Click Demo Profile:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="demo-user-jobseeker-btn"
              onClick={() => handleQuickDemoUser('job_seeker')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-brand-blue-light/50 dark:hover:bg-brand-blue/15 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 transition cursor-pointer flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5 text-brand-blue" />
              <span>Nada (Job Seeker)</span>
            </button>
            <button
              type="button"
              id="demo-user-employer-btn"
              onClick={() => handleQuickDemoUser('employer')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-brand-emerald-light/50 dark:hover:bg-brand-emerald/15 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 transition cursor-pointer flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Apex HR (Employer)</span>
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};

