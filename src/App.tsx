/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomepageView } from './components/HomepageView';
import { JobDiscoveryView } from './components/JobDiscoveryView';
import { AiAssistantView } from './components/AiAssistantView';
import { CvOptimizerView } from './components/CvOptimizerView';
import { UserDashboardView } from './components/UserDashboardView';
import { PricingView } from './components/PricingView';
import { EmployerSectionView } from './components/EmployerSectionView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';

// Existing Career Suite Components (Preserved without removal)
import { JdDecoderView } from './components/JdDecoderView';
import { AtsEditorView } from './components/AtsEditorView';
import { LearningPlanView } from './components/LearningPlanView';
import { JobComparisonView } from './components/JobComparisonView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { CommunityInsightsView } from './components/CommunityInsightsView';
import { CareerToolsHubView } from './components/tools/CareerToolsHubView';
import { UserProfileView } from './components/UserProfileView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';

import { 
  Language, 
  ThemeMode, 
  UserProfile, 
  DiscoveredJob, 
  AdminUser, 
  AdminJob, 
  AdminCompany, 
  AdminReport, 
  AdminMetrics, 
  JobAnalysis, 
  ResumeMatch, 
  ApplicationItem, 
  InterviewInsight,
  UserRole
} from './types';
import { mockJobs } from './data/mockJobs';
import { 
  initialAdminUsers, 
  initialAdminJobs, 
  initialAdminCompanies, 
  initialAdminReports, 
  initialAdminMetrics 
} from './data/adminData';
import { sampleDatasets } from './data/samples';
import { initialInterviewInsights } from './data/communityInsights';
import { getActiveSloganOption } from './data/slogans';

export default function App() {
  // Global Settings: Language & Theme
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('opify_language') as Language) || 'en';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('opify_theme') as ThemeMode) || 'light';
  });

  // Current active view/tab
  const [activeTab, setActiveTab] = useState<string>('home');
  const [navParams, setNavParams] = useState<any>(null);

  // Authentication & Current User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const defaultProfile: UserProfile = {
      id: 'u-nada',
      name: 'Nada Nemr',
      email: 'nadaanemr@gmail.com',
      role: 'job_seeker',
      avatar: '/profile-icon.jpg',
      title: 'Product & Tech Specialist',
      headline: 'Senior Product & Frontend Specialist | Building High-Impact Web Solutions in Cairo',
      location: 'Cairo, Egypt (New Cairo & Maadi)',
      targetRole: 'Senior Frontend & Product Engineer',
      targetSalary: '55,000 EGP/mo',
      preferredWorkMode: 'Hybrid / Flexible',
      phone: '+20 100 882 3419',
      bio: 'Versatile Product & Tech Specialist with 5+ years of experience designing and shipping scalable digital experiences, leading cross-functional teams, and architecting modern web platforms. Passionate about product strategy, agile velocity, and high-conversion UX.',
      linkedin: 'https://linkedin.com/in/nadanemr',
      github: 'https://github.com/nadanemr',
      portfolio: 'https://nadanemr.dev',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Product Strategy', 'UI/UX Architecture', 'Agile Scrum', 'System Design'],
      workHistory: [
        {
          id: 'w-1',
          role: 'Senior Product & Frontend Specialist',
          company: 'FinTech Horizons Egypt',
          period: '2022 - Present',
          description: 'Spearheaded the redesign of consumer-facing payment onboarding, reducing drop-off rates by 34% and scaling customer transaction throughput.'
        },
        {
          id: 'w-2',
          role: 'Product Engineer',
          company: 'Digital Wave MENA',
          period: '2020 - 2022',
          description: 'Built responsive web applications and collaborated with product managers to deliver design systems adopted across 4 major client platforms.'
        }
      ],
      education: 'B.Sc. in Computer Science / Engineering, Cairo University',
      noticePeriod: '1 Month',
      openToWork: true,
      profileStrength: 96,
      cvAtsScore: 92,
      recommendedJobsCount: 16,
      activeApplicationsCount: 5,
      isPremium: true
    };

    const saved = localStorage.getItem('opify_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate previous session if it used an old avatar, Ahmed Hassan, or needs new profile schema / updated email
        if (
          !parsed.avatar || 
          parsed.avatar.includes('unsplash') || 
          !parsed.skills || 
          parsed.name === 'Ahmed Hassan' || 
          parsed.email === 'ahmed.hassan@example.com' ||
          parsed.email === 'nadanemr33@gmail.com' ||
          parsed.email === 'nadanemr@gmail.com'
        ) {
          const migrated: UserProfile = {
            ...defaultProfile,
            ...parsed,
            avatar: '/profile-icon.jpg',
            email: 'nadaanemr@gmail.com',
            skills: parsed.skills || defaultProfile.skills,
            workHistory: parsed.workHistory || defaultProfile.workHistory,
            bio: parsed.bio || defaultProfile.bio,
            linkedin: parsed.linkedin || defaultProfile.linkedin,
            github: parsed.github || defaultProfile.github,
            portfolio: parsed.portfolio || defaultProfile.portfolio
          };
          localStorage.setItem('opify_current_user', JSON.stringify(migrated));
          return migrated;
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    // Default logged in user: Nada Nemr with custom photo icon
    return defaultProfile;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Jobs Dataset (Discovered opportunities)
  const [jobs, setJobs] = useState<DiscoveredJob[]>(() => {
    const saved = localStorage.getItem('opify_jobs');
    return saved ? JSON.parse(saved) : mockJobs;
  });

  // Admin Dataset States
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>(initialAdminMetrics);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [adminJobs, setAdminJobs] = useState<AdminJob[]>(initialAdminJobs);
  const [adminCompanies, setAdminCompanies] = useState<AdminCompany[]>(initialAdminCompanies);
  const [adminReports, setAdminReports] = useState<AdminReport[]>(initialAdminReports);

  // Input states for JD Decoder & ATS Tools
  const [jobText, setJobText] = useState<string>(sampleDatasets[0].jobText);
  const [resumeText, setResumeText] = useState<string>(sampleDatasets[0].resumeText);

  // Analysis & match results
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [matchResult, setMatchResult] = useState<ResumeMatch | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);

  // Compared jobs
  const [comparedJobs, setComparedJobs] = useState<{ job: JobAnalysis; score?: number }[]>(() => {
    const saved = localStorage.getItem('opify_compared_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  // Tracked applications
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    const saved = localStorage.getItem('opify_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'app-init-1',
        jobTitle: 'Sales Assistant (Retail)',
        company: 'Apex Retail Group',
        location: 'Maadi, Cairo',
        workMode: 'On-site',
        salary: '6,000 EGP/month',
        status: 'Interviewing',
        matchScore: 94,
        appliedDate: '2026-09-02',
        followUpDate: '2026-09-10',
        notes: 'Interview scheduled at Maadi Branch. Verified distance: 1.2 km.'
      },
      {
        id: 'app-init-2',
        jobTitle: 'Senior Frontend Developer',
        company: 'Noon Digital',
        location: 'Cairo, Egypt',
        workMode: 'Hybrid',
        salary: '45,000 - 65,000 EGP',
        status: 'Interviewing',
        matchScore: 88,
        appliedDate: '2026-08-28',
        followUpDate: '2026-09-12',
        notes: 'Round 2 Technical Interview scheduled for next Thursday.'
      },
      {
        id: 'app-init-3',
        jobTitle: 'Part-Time Sales Representative',
        company: 'City Store Co.',
        location: 'Nasr City, Cairo',
        workMode: 'On-site',
        salary: '4,500 - 6,000 EGP/mo',
        status: 'Applied',
        matchScore: 96,
        appliedDate: '2026-09-04',
        followUpDate: '2026-09-11',
        notes: 'Requested shift after 5 PM confirmed with hiring manager.'
      }
    ];
  });

  // Community insights
  const [insights, setInsights] = useState<InterviewInsight[]>(() => {
    const saved = localStorage.getItem('opify_interview_insights');
    return saved ? JSON.parse(saved) : initialInterviewInsights;
  });

  // Persistence to local storage
  useEffect(() => {
    localStorage.setItem('opify_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('opify_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('opify_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('opify_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('opify_compared_jobs', JSON.stringify(comparedJobs));
  }, [comparedJobs]);

  useEffect(() => {
    localStorage.setItem('opify_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('opify_interview_insights', JSON.stringify(insights));
  }, [insights]);

  // Synchronize document.title with the approved slogan and language
  useEffect(() => {
    const slogan = getActiveSloganOption();
    const text = language === 'ar' ? slogan.ar : slogan.en;
    document.title = `Opify — ${text} | AI Career Copilot`;
  }, [language]);

  // Handle JD analysis API
  const handleAnalyze = async () => {
    if (!jobText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobText, language })
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (e) {
      console.error('Analysis error:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle resume matching API
  const handleMatch = async () => {
    if (!jobText.trim() || !resumeText.trim()) return;
    setIsMatching(true);
    try {
      const res = await fetch('/api/match-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobText,
          resumeText,
          jobAnalysis: analysis,
          language
        })
      });
      if (res.ok) {
        const data = await res.json();
        setMatchResult(data);
      }
    } catch (e) {
      console.error('Match error:', e);
    } finally {
      setIsMatching(false);
    }
  };

  // Cover Letter generation API
  const handleGenerateCoverLetter = async (tone: 'Professional' | 'Confident' | 'Early-Career') => {
    setIsGeneratingLetter(true);
    try {
      const res = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobText,
          resumeText,
          tone,
          language
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (matchResult) {
          setMatchResult({
            ...matchResult,
            coverLetter: data.coverLetter,
            coverLetterTone: tone
          });
        }
      }
    } catch (e) {
      console.error('Cover letter error:', e);
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  // Save discovered job to tracker
  const handleSaveDiscoveredJobToTracker = (job: DiscoveredJob) => {
    const existing = applications.find(a => a.jobTitle === job.title && a.company === job.company);
    if (!existing) {
      const newApp: ApplicationItem = {
        id: `app-disc-${Date.now()}`,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        workMode: job.workMode,
        salary: job.salary,
        status: 'Saved',
        matchScore: job.matchScore,
        appliedDate: new Date().toISOString().split('T')[0],
        followUpDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        notes: `Discovered on Opify Radar (${job.distance}). Stated pay: ${job.salary}.`
      };
      setApplications(prev => [newApp, ...prev]);
    }
  };

  // Apply to job
  const handleApplyDiscoveredJob = (job: DiscoveredJob) => {
    handleSaveDiscoveredJobToTracker(job);
    setApplications(prev => 
      prev.map(a => a.jobTitle === job.title && a.company === job.company ? { ...a, status: 'Applied' } : a)
    );
    setActiveTab('tracker');
  };

  // Tailor CV for this job
  const handleTailorCvForJob = (job: DiscoveredJob) => {
    const reqsList = job.requirements || job.tags || [];
    setJobText(`${job.title} at ${job.company}\nLocation: ${job.location} (${job.distance})\nSalary: ${job.salary}\nJob Type: ${job.jobType}\n\nDescription:\n${job.description}\n\nRequirements:\n${reqsList.map(r => `• ${r}`).join('\n')}`);
    setActiveTab('ats-editor');
  };

  // Add discovered job to comparison matrix
  const handleAddDiscoveredJobToComparison = (job: DiscoveredJob) => {
    const reqsList = job.requirements || job.tags || [];
    const mappedAnalysis: JobAnalysis = {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      workMode: job.workMode,
      seniority: 'Mid-level',
      salary: {
        stated: job.salary,
        estimated: job.salary,
        currency: 'EGP',
        min: job.salaryNum || 6000,
        max: Math.round((job.salaryNum || 6000) * 1.25),
        period: 'monthly',
        confidence: 'High'
      },
      mustHaveSkills: reqsList.slice(0, 4),
      niceToHaveSkills: job.tags,
      responsibilities: [job.description],
      benefits: ['Market competitive pay', 'Verified company culture'],
      redFlags: {
        isSuspicious: false,
        riskScore: 0,
        flags: [],
        explanation: 'Verified authentic local opportunity on Opify.'
      },
      summary: job.description,
      rawText: job.description,
      analyzedAt: new Date().toISOString(),
      language
    };
    if (!comparedJobs.some(c => c.job.id === job.id)) {
      setComparedJobs(prev => [...prev, { job: mappedAnalysis, score: job.matchScore }]);
    }
    setActiveTab('comparison');
  };

  // Existing tracker helpers
  const handleUpdateStatus = (id: string, status: ApplicationItem['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleAddApplication = (app: ApplicationItem) => {
    setApplications(prev => [app, ...prev]);
  };

  // Community Insights
  const handleAddInsight = (insight: InterviewInsight) => {
    setInsights(prev => [insight, ...prev]);
  };

  const handleUpvoteInsight = (id: string) => {
    setInsights(prev => prev.map(ins => ins.id === id ? { ...ins, helpfulCount: ins.helpfulCount + 1 } : ins));
  };

  // Admin Actions
  const handleToggleUserStatus = (userId: string) => {
    setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'deactivated' : 'active' } : u));
  };

  const handleUpdateJobStatus = (jobId: string, status: 'approved' | 'rejected') => {
    setAdminJobs(prev => prev.map(j => j.id === jobId ? { ...j, status } : j));
  };

  const handleResolveReport = (reportId: string) => {
    setAdminReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
  };

  const handleAddAdminJob = (newJob: AdminJob) => {
    setAdminJobs(prev => [newJob, ...prev]);
  };

  const handleDeleteAdminJob = (jobId: string) => {
    setAdminJobs(prev => prev.filter(j => j.id !== jobId));
  };

  const handleToggleFeaturedJob = (jobId: string) => {
    setAdminJobs(prev => prev.map(j => j.id === jobId ? { ...j, featured: !j.featured } : j));
  };

  const handleToggleUserPremium = (userId: string) => {
    setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, isPremium: !u.isPremium } : u));
  };

  const handleAddAdminUser = (newUser: AdminUser) => {
    setAdminUsers(prev => [newUser, ...prev]);
  };

  const handleDeleteAdminUser = (userId: string) => {
    setAdminUsers(prev => prev.filter(u => u.id !== userId));
  };

  const handleAddAdminCompany = (newComp: AdminCompany) => {
    setAdminCompanies(prev => [newComp, ...prev]);
  };

  const handleToggleCompanyVerification = (companyId: string) => {
    setAdminCompanies(prev => prev.map(c => c.id === companyId ? { ...c, verified: !c.verified } : c));
  };

  const handleDismissReport = (reportId: string) => {
    setAdminReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' } : r));
  };

  const handleAddAdminReport = (newReport: AdminReport) => {
    setAdminReports(prev => [newReport, ...prev]);
  };

  const handleResetAdminData = () => {
    setAdminUsers(initialAdminUsers);
    setAdminJobs(initialAdminJobs);
    setAdminCompanies(initialAdminCompanies);
    setAdminReports(initialAdminReports);
    setAdminMetrics(initialAdminMetrics);
  };

  const handleNavigation = (tabId: string, params?: any) => {
    setActiveTab(tabId);
    if (params) setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white transition-colors duration-150"
    >
      {/* Global Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        activeTab={activeTab}
        onTabChange={handleNavigation}
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        applicationCount={applications.length}
      />

      {/* Main Dynamic View Outlet */}
      <main className="flex-1 pb-20 md:pb-0">
        
        {/* 1. Homepage View */}
        {activeTab === 'home' && (
          <HomepageView
            language={language}
            onNavigate={handleNavigation}
            featuredJobs={jobs}
            onSelectJob={(job) => {
              setActiveTab('jobs');
            }}
          />
        )}

        {/* 2. Job Discovery View */}
        {activeTab === 'jobs' && (
          <JobDiscoveryView
            language={language}
            jobs={jobs}
            onSaveToTracker={handleSaveDiscoveredJobToTracker}
            onAddToComparison={handleAddDiscoveredJobToComparison}
            onTailorCv={handleTailorCvForJob}
            onApplyJob={handleApplyDiscoveredJob}
            initialSearch={navParams?.search}
            initialLocation={navParams?.location}
            initialViewMode={navParams?.viewMode || (navParams?.view === 'map' ? 'map' : 'list')}
          />
        )}

        {/* 3. AI Career Assistant View */}
        {activeTab === 'assistant' && (
          <AiAssistantView
            language={language}
            jobs={jobs}
            currentUser={currentUser}
            onSelectJob={(job) => setActiveTab('jobs')}
            onTailorCv={handleTailorCvForJob}
            onSaveToTracker={handleSaveDiscoveredJobToTracker}
          />
        )}

        {/* 3.5 Career Tools Intelligence Suite */}
        {activeTab === 'tools' && (
          <CareerToolsHubView
            language={language}
            currentUser={currentUser}
            initialSubTab="all"
            onNavigate={handleNavigation}
          />
        )}

        {activeTab === 'salary-calc' && (
          <CareerToolsHubView
            language={language}
            currentUser={currentUser}
            initialSubTab="salary-calc"
            onNavigate={handleNavigation}
          />
        )}

        {activeTab === 'cover-letter' && (
          <CareerToolsHubView
            language={language}
            currentUser={currentUser}
            initialSubTab="cover-letter"
            onNavigate={handleNavigation}
          />
        )}

        {(activeTab === 'mock-interview' || activeTab === 'interview-prep') && (
          <CareerToolsHubView
            language={language}
            currentUser={currentUser}
            initialSubTab="mock-interview"
            onNavigate={handleNavigation}
          />
        )}

        {(activeTab === 'resume-booster' || activeTab === 'power-booster') && (
          <CareerToolsHubView
            language={language}
            currentUser={currentUser}
            initialSubTab="resume-booster"
            onNavigate={handleNavigation}
          />
        )}

        {/* 4. CV Optimizer View */}
        {activeTab === 'cv-optimizer' && (
          <CvOptimizerView
            language={language}
            resumeText={resumeText}
            onResumeChange={setResumeText}
            onOpenLiveEditor={() => setActiveTab('ats-editor')}
          />
        )}

        {/* 5. User Personalized Dashboard View */}
        {activeTab === 'dashboard' && currentUser && (
          <UserDashboardView
            language={language}
            user={currentUser}
            applications={applications}
            recommendedJobs={jobs}
            onSelectJob={(job) => {
              setActiveTab('jobs');
            }}
            onApplyJob={handleApplyDiscoveredJob}
            onNavigate={handleNavigation}
            onUpdateUser={(updated) => {
              setCurrentUser(updated);
              localStorage.setItem('opify_current_user', JSON.stringify(updated));
            }}
          />
        )}

        {/* 5.5 User Profile View */}
        {activeTab === 'profile' && currentUser && (
          <UserProfileView
            language={language}
            user={currentUser}
            onUpdateUser={(updated) => {
              setCurrentUser(updated);
              localStorage.setItem('opify_current_user', JSON.stringify(updated));
            }}
            onNavigate={handleNavigation}
          />
        )}

        {/* 6. Pricing View */}
        {activeTab === 'pricing' && (
          <PricingView
            language={language}
            currentUser={currentUser}
            onSelectPlan={(plan) => {
              const isPro = plan === 'premium' || plan === 'booster';
              if (currentUser) {
                const updated = { ...currentUser, isPremium: isPro };
                setCurrentUser(updated);
                localStorage.setItem('opify_current_user', JSON.stringify(updated));
              }
            }}
            onNavigate={handleNavigation}
          />
        )}

        {/* 7. Employer Section View */}
        {activeTab === 'employers' && (
          <EmployerSectionView
            language={language}
            currentUser={currentUser}
            onNavigate={handleNavigation}
            onAddJob={(newJob) => {
              setJobs(prev => [newJob, ...prev]);
            }}
            onPostJobSuccess={(title) => {
              const newJob: DiscoveredJob = {
                id: `posted-${Date.now()}`,
                title,
                company: 'Apex Retail Solutions',
                location: 'Maadi, Cairo',
                distance: '1.5 km away',
                distanceKm: 1.5,
                salary: '6,000 - 8,000 EGP',
                salaryNum: 7000,
                jobType: 'Full-time',
                experience: 'Entry',
                workMode: 'On-site',
                industry: 'Retail & Commerce',
                matchScore: 92,
                matchReasons: [
                  { key: 'loc', label: 'Near Your Location', details: '1.5 km away', matched: true },
                  { key: 'avail', label: 'Availability', details: 'Immediate start', matched: true }
                ],
                tags: ['Retail', 'Verified'],
                postedDate: 'Just now',
                description: 'Newly published opportunity on Opify.',
                requirements: ['Strong communication skills', 'Good customer service mindset'],
                isEgypt: true
              };
              setJobs(prev => [newJob, ...prev]);
            }}
          />
        )}

        {/* 8. Admin Dashboard View */}
        {activeTab === 'admin' && (
          <AdminDashboardView
            language={language}
            isAdminAuthenticated={isAdminAuthenticated}
            onAuthenticateAdmin={(role) => setIsAdminAuthenticated(true)}
            onExitAdmin={() => {
              setIsAdminAuthenticated(false);
              setActiveTab('home');
            }}
            metrics={adminMetrics}
            users={adminUsers}
            jobs={adminJobs}
            companies={adminCompanies}
            reports={adminReports}
            onToggleUserStatus={handleToggleUserStatus}
            onUpdateJobStatus={handleUpdateJobStatus}
            onResolveReport={handleResolveReport}
            onAddJob={handleAddAdminJob}
            onDeleteJob={handleDeleteAdminJob}
            onToggleFeaturedJob={handleToggleFeaturedJob}
            onToggleUserPremium={handleToggleUserPremium}
            onAddUser={handleAddAdminUser}
            onDeleteUser={handleDeleteAdminUser}
            onAddCompany={handleAddAdminCompany}
            onToggleCompanyVerification={handleToggleCompanyVerification}
            onDismissReport={handleDismissReport}
            onAddReport={handleAddAdminReport}
            onResetDemoData={handleResetAdminData}
          />
        )}

        {/* 9. Application Tracker (Kanban View) */}
        {activeTab === 'tracker' && (
          <ApplicationTrackerView
            language={language}
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
            onDeleteApplication={handleDeleteApplication}
            onAddApplication={handleAddApplication}
          />
        )}

        {/* 10. JD Decoder View */}
        {activeTab === 'decoder' && (
          <JdDecoderView
            language={language}
            jobText={jobText}
            setJobText={setJobText}
            resumeText={resumeText}
            setResumeText={setResumeText}
            analysis={analysis}
            matchResult={matchResult}
            isAnalyzing={isAnalyzing}
            isMatching={isMatching}
            onAnalyze={handleAnalyze}
            onMatch={handleMatch}
            onSaveToTracker={(job, score) => {
              const newApp: ApplicationItem = {
                id: `app-${Date.now()}`,
                jobTitle: job.title,
                company: job.company,
                location: job.location,
                workMode: job.workMode,
                salary: job.salary.stated !== 'Disclosed upon interview' ? job.salary.stated : job.salary.estimated,
                status: 'Saved',
                matchScore: score || 85,
                appliedDate: new Date().toISOString().split('T')[0],
                followUpDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
                notes: `Decoded with Opify. Focus on ${job.mustHaveSkills.slice(0, 3).join(', ')}.`
              };
              setApplications(prev => [newApp, ...prev]);
            }}
            onAddToComparison={(job) => {
              if (!comparedJobs.some(c => c.job.id === job.id)) {
                setComparedJobs(prev => [...prev, { job, score: matchResult?.overallScore }]);
              }
            }}
            onOpenInAtsEditor={() => setActiveTab('ats-editor')}
            onGenerateCoverLetter={handleGenerateCoverLetter}
            isGeneratingLetter={isGeneratingLetter}
          />
        )}

        {/* 11. ATS Live Resume & Cover Letter Editor */}
        {activeTab === 'ats-editor' && (
          <AtsEditorView
            language={language}
            resumeText={resumeText}
            setResumeText={setResumeText}
            analysis={analysis}
          />
        )}

        {/* 12. Skill Gap Learning Plan */}
        {activeTab === 'learning-plan' && (
          <LearningPlanView
            language={language}
            missingSkills={matchResult?.missingMustHave || []}
            targetRole={analysis?.title || 'Senior Frontend Developer'}
          />
        )}

        {/* 13. Job Comparison Matrix */}
        {activeTab === 'comparison' && (
          <JobComparisonView
            language={language}
            comparedJobs={comparedJobs}
            onRemoveJob={(id) => setComparedJobs(prev => prev.filter(c => c.job.id !== id))}
            onClearComparison={() => setComparedJobs([])}
            onLoadSamples={async () => {
              const sample1 = sampleDatasets[0];
              const sample2 = sampleDatasets[1];
              try {
                const [res1, res2] = await Promise.all([
                  fetch('/api/analyze-jd', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jobText: sample1.jobText, language })
                  }).then(r => r.json()),
                  fetch('/api/analyze-jd', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jobText: sample2.jobText, language })
                  }).then(r => r.json()),
                ]);
                setComparedJobs([
                  { job: res1, score: 88 },
                  { job: res2, score: 79 }
                ]);
              } catch (e) {
                console.error(e);
              }
            }}
          />
        )}

        {/* 14. Community Interview Insights */}
        {activeTab === 'community' && (
          <CommunityInsightsView
            language={language}
            insights={insights}
            onAddInsight={handleAddInsight}
            onUpvote={handleUpvoteInsight}
          />
        )}

        {/* 15. About Us View */}
        {activeTab === 'about' && (
          <AboutView
            language={language}
            onNavigate={handleNavigation}
          />
        )}

        {/* 16. Contact Us View */}
        {activeTab === 'contact' && (
          <ContactView
            language={language}
            onNavigate={handleNavigation}
            initialCategory={navParams?.category}
          />
        )}

      </main>

      {/* Auth Modal for Login, Signup, and 1-Click Persona switching */}
      <AuthModal
        language={language}
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'super_admin') {
            setIsAdminAuthenticated(true);
            setActiveTab('admin');
          } else if (user.role === 'employer') {
            setActiveTab('employers');
          } else {
            setActiveTab('dashboard');
          }
        }}
      />

      {/* Global Brand Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigation}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav
        language={language}
        activeTab={activeTab}
        onTabChange={handleNavigation}
        applicationCount={applications.length}
        currentViewMode={navParams?.viewMode}
        currentUser={currentUser}
      />
    </div>
  );
}
