import { 
  AdminUser, 
  AdminJob, 
  AdminCompany, 
  AdminReport, 
  AdminMetrics,
  AdminAuditLog,
  AdminFeatureFlag 
} from '../types';

export const initialAdminMetrics: AdminMetrics = {
  totalUsers: 14280,
  activeUsers: 8420,
  totalJobs: 1840,
  totalApplications: 24910,
  interviewsCount: 3120,
  hiresCount: 890,
  premiumUsers: 1640,
  aiUsageCalls: 92400,
  monthlyRevenue: 184500 // in EGP
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'u-1',
    name: 'Nada Nemr',
    email: 'nadaanemr@gmail.com',
    role: 'job_seeker',
    status: 'active',
    joinedAt: '2026-07-12',
    applicationsCount: 7,
    isPremium: true,
    governorate: 'Cairo (New Cairo)',
    phone: '+20 100 882 3419',
    lastLogin: 'Just now'
  },
  {
    id: 'u-2',
    name: 'Sara El-Masry',
    email: 'sara.masry@example.com',
    role: 'job_seeker',
    status: 'active',
    joinedAt: '2026-08-01',
    applicationsCount: 14,
    isPremium: false,
    governorate: 'Giza (Dokki)',
    phone: '+20 111 987 6543',
    lastLogin: '2 hours ago'
  },
  {
    id: 'u-3',
    name: 'Omar Farouk',
    email: 'omar.f@technova.eg',
    role: 'employer',
    status: 'active',
    joinedAt: '2026-05-19',
    applicationsCount: 0,
    isPremium: true,
    governorate: 'Cairo (New Cairo)',
    phone: '+20 122 456 7890',
    lastLogin: 'Just now'
  },
  {
    id: 'u-4',
    name: 'Nouran Khalil',
    email: 'nouran.khalil@opify.io',
    role: 'moderator',
    status: 'active',
    joinedAt: '2026-03-10',
    applicationsCount: 0,
    isPremium: true,
    governorate: 'Alexandria',
    phone: '+20 102 334 5566',
    lastLogin: '5 mins ago'
  },
  {
    id: 'u-5',
    name: 'Mahmoud Reda',
    email: 'm.reda.spammer@spammail.org',
    role: 'job_seeker',
    status: 'deactivated',
    joinedAt: '2026-09-01',
    applicationsCount: 1,
    isPremium: false,
    governorate: 'Mansoura',
    phone: '+20 155 000 1122',
    lastLogin: '5 days ago'
  },
  {
    id: 'u-6',
    name: 'Yasmine Sherif',
    email: 'yasmine.s@deliveryrocket.com',
    role: 'employer',
    status: 'active',
    joinedAt: '2026-06-15',
    applicationsCount: 0,
    isPremium: true,
    governorate: 'Giza (Smart Village)',
    phone: '+20 109 888 7766',
    lastLogin: 'Yesterday'
  },
  {
    id: 'u-7',
    name: 'Tarek Al-Banna',
    email: 'tarek.banna@finpulse.eg',
    role: 'employer',
    status: 'active',
    joinedAt: '2026-04-02',
    applicationsCount: 0,
    isPremium: true,
    governorate: 'Cairo (Sheraton)',
    phone: '+20 114 555 4433',
    lastLogin: '3 hours ago'
  },
  {
    id: 'u-8',
    name: 'Salma Zaher',
    email: 'salma.zaher@gmail.com',
    role: 'job_seeker',
    status: 'active',
    joinedAt: '2026-08-20',
    applicationsCount: 22,
    isPremium: true,
    governorate: 'Assiut',
    phone: '+20 120 777 8899',
    lastLogin: '1 hour ago'
  }
];

export const initialAdminJobs: AdminJob[] = [
  {
    id: 'aj-1',
    title: 'Sales Assistant',
    company: 'Apex Retail Solutions',
    location: 'Maadi, Cairo',
    salary: '6,000 EGP/month',
    status: 'approved',
    postedAt: '2026-09-07',
    applicationsCount: 42,
    reportsCount: 0,
    category: 'Sales & Retail',
    featured: true,
    scamRisk: 4,
    experienceLevel: 'Entry-Level',
    description: 'Assist in daily retail store operations, customer assistance, inventory replenishment, and point-of-sale management in Maadi branch.'
  },
  {
    id: 'aj-2',
    title: 'Frontend Engineer (React & TypeScript)',
    company: 'FinPulse MENA',
    location: 'New Cairo, Egypt (Hybrid)',
    salary: '45,000 - 55,000 EGP/month',
    status: 'approved',
    postedAt: '2026-09-06',
    applicationsCount: 89,
    reportsCount: 0,
    category: 'Engineering & Tech',
    featured: true,
    scamRisk: 2,
    experienceLevel: 'Mid-Senior',
    description: 'Build responsive financial dashboards, banking micro-frontends, and real-time payment interfaces using React 19, TypeScript, and Tailwind CSS.'
  },
  {
    id: 'aj-3',
    title: '⚠️ Urgent Data Entry - $3,000 Weekly (Pay fee)',
    company: 'Global Quick Hire Ltd',
    location: 'Remote (Anywhere)',
    salary: '$3,000/week (Unrealistic)',
    status: 'rejected',
    postedAt: '2026-09-08',
    applicationsCount: 3,
    reportsCount: 12,
    category: 'Data Entry & Admin',
    featured: false,
    scamRisk: 98,
    experienceLevel: 'No Experience',
    description: 'Immediate hiring for data entry typing. Must transfer 450 EGP registration fee via digital wallet before receiving access keys.'
  },
  {
    id: 'aj-4',
    title: 'Growth Data Analyst',
    company: 'DeliveryRocket Egypt',
    location: 'Dokki, Giza (On-site)',
    salary: '32,000 - 42,000 EGP/month',
    status: 'approved',
    postedAt: '2026-09-05',
    applicationsCount: 36,
    reportsCount: 0,
    category: 'Data & Analytics',
    featured: false,
    scamRisk: 5,
    experienceLevel: 'Mid-Level',
    description: 'Analyze driver dispatch times, route efficiency, customer churn, and A/B test marketing acquisition funnels using SQL, Python, and Metabase.'
  },
  {
    id: 'aj-5',
    title: 'Executive Assistant to VP',
    company: 'Capital Horizon Real Estate',
    location: 'Heliopolis, Cairo',
    salary: '22,000 EGP/month',
    status: 'pending',
    postedAt: '2026-09-08',
    applicationsCount: 8,
    reportsCount: 0,
    category: 'Administration',
    featured: false,
    scamRisk: 12,
    experienceLevel: 'Mid-Level',
    description: 'Manage executive calendar, corporate correspondence, investor briefing documents, and high-level stakeholder meetings.'
  },
  {
    id: 'aj-6',
    title: 'Tele-sales Agent (Inaccurate Base Disclosure)',
    company: 'Direct Reach Call Center',
    location: 'Nasr City, Cairo',
    salary: '15,000 EGP/month (Reported 4K Base)',
    status: 'pending',
    postedAt: '2026-09-07',
    applicationsCount: 29,
    reportsCount: 4,
    category: 'Customer Service & Tele-sales',
    featured: false,
    scamRisk: 68,
    experienceLevel: 'Entry-Level',
    description: 'Outbound sales calls to Gulf region clients. High commission promise. Reported discrepancy between posted salary and actual initial offer.'
  },
  {
    id: 'aj-7',
    title: 'Lead DevOps Engineer (AWS & Kubernetes)',
    company: 'TechnoNova Solutions',
    location: 'Smart Village, Giza (Remote-Friendly)',
    salary: '60,000 - 80,000 EGP/month',
    status: 'approved',
    postedAt: '2026-09-09',
    applicationsCount: 19,
    reportsCount: 0,
    category: 'Engineering & Tech',
    featured: true,
    scamRisk: 1,
    experienceLevel: 'Senior',
    description: 'Maintain high availability multi-region Kubernetes clusters on AWS, CI/CD pipelines in GitHub Actions, and SOC2 compliance automation.'
  },
  {
    id: 'aj-8',
    title: 'Graphic Designer & Video Editor',
    company: 'Creative Hive Studio',
    location: 'Alexandria (Sidi Gaber)',
    salary: '14,000 - 18,000 EGP/month',
    status: 'approved',
    postedAt: '2026-09-08',
    applicationsCount: 54,
    reportsCount: 0,
    category: 'Design & Media',
    featured: false,
    scamRisk: 3,
    experienceLevel: 'Mid-Level',
    description: 'Produce social media motion graphics, promotional TikTok/Reels edits, and brand identity toolkits for regional e-commerce brands.'
  }
];

export const initialAdminCompanies: AdminCompany[] = [
  {
    id: 'c-1',
    name: 'FinPulse MENA',
    industry: 'FinTech & Banking',
    location: 'New Cairo, Egypt',
    verified: true,
    activeJobsCount: 4,
    totalHires: 19,
    contactEmail: 'talent@finpulse.eg',
    commercialReg: 'CR-948201-CAI',
    taxId: '542-891-304',
    website: 'https://finpulse.eg'
  },
  {
    id: 'c-2',
    name: 'Apex Retail Solutions',
    industry: 'Retail & Consumer Goods',
    location: 'Maadi, Cairo',
    verified: true,
    activeJobsCount: 2,
    totalHires: 11,
    contactEmail: 'hr@apexretail.eg',
    commercialReg: 'CR-331049-GIZ',
    taxId: '210-449-781',
    website: 'https://apexretail.eg'
  },
  {
    id: 'c-3',
    name: 'DeliveryRocket Egypt',
    industry: 'Logistics & Quick-Commerce',
    location: 'Dokki, Giza',
    verified: true,
    activeJobsCount: 6,
    totalHires: 28,
    contactEmail: 'recruitment@deliveryrocket.com',
    commercialReg: 'CR-882190-GIZ',
    taxId: '774-320-119',
    website: 'https://deliveryrocket.com'
  },
  {
    id: 'c-4',
    name: 'TechnoNova Solutions',
    industry: 'Software & Cloud Services',
    location: 'Smart Village, Giza',
    verified: true,
    activeJobsCount: 3,
    totalHires: 15,
    contactEmail: 'careers@technonova.eg',
    commercialReg: 'CR-104928-GIZ',
    taxId: '390-112-984',
    website: 'https://technonova.eg'
  },
  {
    id: 'c-5',
    name: 'Global Quick Hire Ltd',
    industry: 'Unverified Staffing Agency',
    location: 'Offshore / Unknown',
    verified: false,
    activeJobsCount: 0,
    totalHires: 0,
    contactEmail: 'quickhire992@gmail.com',
    commercialReg: 'Missing / Unprovided',
    taxId: 'Missing / Fake',
    website: 'n/a'
  },
  {
    id: 'c-6',
    name: 'Direct Reach Call Center',
    industry: 'Outsourcing & Telemarketing',
    location: 'Nasr City, Cairo',
    verified: false,
    activeJobsCount: 1,
    totalHires: 4,
    contactEmail: 'hr@directreach-eg.com',
    commercialReg: 'Under Review',
    taxId: '661-893-220',
    website: 'https://directreach-eg.com'
  }
];

export const initialAdminReports: AdminReport[] = [
  {
    id: 'rep-1',
    type: 'job_scam',
    targetTitle: '⚠️ Urgent Data Entry - $3,000 Weekly (Pay fee)',
    targetId: 'aj-3',
    reportedBy: 'Nada Nemr (Candidate)',
    reportedAt: '2026-09-08 09:14',
    status: 'resolved',
    details: 'Recruiter asked for 450 EGP registration fee via digital wallet before sending the work contract. Blatant advance-fee scam pattern.',
    severity: 'high'
  },
  {
    id: 'rep-2',
    type: 'inaccurate_salary',
    targetTitle: 'Tele-sales Agent (Inaccurate Base Disclosure)',
    targetId: 'aj-6',
    reportedBy: 'Sara El-Masry',
    reportedAt: '2026-09-07 16:40',
    status: 'pending',
    details: 'Job posting states 15,000 EGP base, but during first interview the recruiter stated 4,000 base + commission only after hitting 20 sales.',
    severity: 'medium'
  },
  {
    id: 'rep-3',
    type: 'job_scam',
    targetTitle: 'Hotel Receptionist - Dubai Relocation Package',
    targetId: 'aj-ext-1',
    reportedBy: 'Tamer Galal',
    reportedAt: '2026-09-09 11:20',
    status: 'pending',
    details: 'Received email claiming instant visa issuance if candidate pays 1,200 EGP medical clearance document processing fee via InstaPay.',
    severity: 'high'
  },
  {
    id: 'rep-4',
    type: 'spam',
    targetTitle: 'Work from Mobile $50/hour Crypto Bot',
    targetId: 'aj-ext-2',
    reportedBy: 'Nouran Khalil (Moderator)',
    reportedAt: '2026-09-09 14:05',
    status: 'resolved',
    details: 'Telegram bot link spam discovered in applicant outreach channel. IP range was blacklisted and listing rejected.',
    severity: 'high'
  },
  {
    id: 'rep-5',
    type: 'user_abuse',
    targetTitle: 'Candidate Misconduct during Video Screen',
    targetId: 'u-5',
    reportedBy: 'Yasmine Sherif (Employer)',
    reportedAt: '2026-09-01 10:15',
    status: 'resolved',
    details: 'Candidate used fraudulent identity and aggressive inappropriate language when asked to verify portfolio GitHub repository.',
    severity: 'medium'
  }
];

export const initialAdminAuditLogs: AdminAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-09 14:10',
    adminName: 'Super Admin',
    action: 'Approved Job Listing',
    target: 'Lead DevOps Engineer (TechnoNova Solutions)',
    type: 'moderation'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-09 11:45',
    adminName: 'Nouran Khalil (Moderator)',
    action: 'Flagged High Scam Risk',
    target: 'Hotel Receptionist - Dubai Relocation Package',
    type: 'security'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-08 17:30',
    adminName: 'Super Admin',
    action: 'Rejected Scam Listing & Banned Poster',
    target: 'Urgent Data Entry - $3,000 Weekly (Global Quick Hire)',
    type: 'security'
  },
  {
    id: 'log-4',
    timestamp: '2026-09-08 14:00',
    adminName: 'Super Admin',
    action: 'Verified Employer Commercial Registration',
    target: 'FinPulse MENA (CR-948201-CAI)',
    type: 'user'
  },
  {
    id: 'log-5',
    timestamp: '2026-09-07 19:22',
    adminName: 'Super Admin',
    action: 'Granted Candidate Premium Access',
    target: 'Nada Nemr (u-1)',
    type: 'billing'
  },
  {
    id: 'log-6',
    timestamp: '2026-09-05 10:15',
    adminName: 'System Engine',
    action: 'Automated Gemini Scam Scan Triggered',
    target: '18 new listings analyzed • 1 flag quarantined',
    type: 'system'
  }
];

export const initialAdminFeatureFlags: AdminFeatureFlag[] = [
  {
    id: 'ff-scam-shield',
    name: 'AI Real-time Scam Shield',
    description: 'Automatically scans all new job postings for advance-fee requests, WhatsApp redirects, and salary exaggeration.',
    enabled: true,
    category: 'security'
  },
  {
    id: 'ff-ats-engine',
    name: 'Gemini 2.5 Flash ATS Analyzer',
    description: 'Enables candidates to score resumes and receive instant keyword optimization feedback.',
    enabled: true,
    category: 'ai'
  },
  {
    id: 'ff-mock-interview',
    name: 'Interactive Voice/Text Interview Coach',
    description: 'AI simulation of real Egyptian and Gulf tech/sales interview question rounds.',
    enabled: true,
    category: 'ai'
  },
  {
    id: 'ff-salary-transparency',
    name: 'Strict Salary Transparency Index',
    description: 'Hides or flags job listings that refuse to state base pay or use deceptive "Confidential / Competitive" labels.',
    enabled: true,
    category: 'platform'
  },
  {
    id: 'ff-candidate-telemetry',
    name: 'Live Recruiter Read Receipts',
    description: 'Allows job seekers to see when their resume was opened or shortlisted by hiring managers.',
    enabled: true,
    category: 'platform'
  }
];
