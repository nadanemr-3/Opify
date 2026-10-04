import { EmployerApplicant, TalentCandidate } from '../types';

export interface EmployerManagedJob {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  district: string;
  nearestMetro?: string;
  distanceKm: number;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  jobType: 'Full-time' | 'Part-time' | 'Shift-based';
  status: 'active' | 'paused' | 'draft' | 'closed';
  postedDate: string;
  deadline: string;
  applicantsCount: number;
  interviewsCount: number;
  aiScreenedCount: number;
  hiredCount: number;
  description: string;
  requirements: string[];
  perks: string[];
  isBoosted?: boolean;
}

export const initialEmployerJobs: EmployerManagedJob[] = [
  {
    id: 'emp-job-1',
    title: 'Sales Assistant & Store Specialist',
    company: 'Apex Retail Solutions',
    department: 'Retail Operations',
    location: 'Maadi, Cairo',
    district: 'Maadi (Degla & Grand Mall)',
    nearestMetro: 'Maadi Metro Station (Line 1)',
    distanceKm: 1.2,
    salary: '6,000 - 7,500 EGP/month',
    salaryMin: 6000,
    salaryMax: 7500,
    workMode: 'On-site',
    jobType: 'Full-time',
    status: 'active',
    postedDate: '2 days ago',
    deadline: 'In 12 days',
    applicantsCount: 42,
    interviewsCount: 8,
    aiScreenedCount: 36,
    hiredCount: 1,
    description: 'Provide outstanding customer support, manage merchandise displays, process orders accurately, and exceed monthly store targets in a friendly environment.',
    requirements: ['Customer service mindset', 'Good communication in Arabic', 'Point of sale experience is a plus', 'Lives within 20 mins of Maadi'],
    perks: ['Social & Medical Insurance', 'Sales Commission', 'Metro Transportation Allowance'],
    isBoosted: true
  },
  {
    id: 'emp-job-2',
    title: 'Frontend Engineer (React & TypeScript)',
    company: 'Apex Retail Solutions',
    department: 'Digital & eCommerce',
    location: 'New Cairo, Cairo',
    district: '5th Settlement, Banking District',
    nearestMetro: 'Air Hospital Monorail Station',
    distanceKm: 2.5,
    salary: '38,000 - 48,000 EGP/month',
    salaryMin: 38000,
    salaryMax: 48000,
    workMode: 'Hybrid',
    jobType: 'Full-time',
    status: 'active',
    postedDate: '4 days ago',
    deadline: 'In 18 days',
    applicantsCount: 28,
    interviewsCount: 6,
    aiScreenedCount: 24,
    hiredCount: 0,
    description: 'Build responsive e-commerce storefronts and customer portals using React 18, TypeScript, Tailwind CSS, and REST/GraphQL APIs.',
    requirements: ['3+ years with React & TypeScript', 'State management (Zustand/Redux)', 'RTL layout mastery', 'API integration and clean architecture'],
    perks: ['2 Days WFH per week', 'Flexible working hours', 'Quarterly performance bonus', 'Private Medical Card'],
    isBoosted: false
  },
  {
    id: 'emp-job-3',
    title: 'Bilingual Customer Care Representative',
    company: 'Apex Retail Solutions',
    department: 'Customer Happiness',
    location: 'Dokki, Giza',
    district: 'Dokki / Mosaddak',
    nearestMetro: 'Dokki Metro Station (Line 2)',
    distanceKm: 1.8,
    salary: '8,000 - 10,500 EGP/month',
    salaryMin: 8000,
    salaryMax: 10500,
    workMode: 'On-site',
    jobType: 'Shift-based',
    status: 'active',
    postedDate: '1 week ago',
    deadline: 'In 7 days',
    applicantsCount: 35,
    interviewsCount: 5,
    aiScreenedCount: 30,
    hiredCount: 2,
    description: 'Handle VIP customer inquiries across omnichannel phone, WhatsApp, and live chat with high empathy and rapid resolution metrics.',
    requirements: ['Fluent English & native Arabic', 'Previous CRM experience (Zendesk / Freshdesk)', 'High emotional intelligence'],
    perks: ['Evening shift allowance', 'Dedicated rest lounge & snacks', 'Clear team lead career track'],
    isBoosted: false
  },
  {
    id: 'emp-job-4',
    title: 'Junior Inventory & Procurement Coordinator',
    company: 'Apex Retail Solutions',
    department: 'Supply Chain',
    location: 'Nasr City, Cairo',
    district: 'Nasr City, Abbas El-Akkad',
    nearestMetro: 'Stadium Metro Station (Line 3)',
    distanceKm: 3.4,
    salary: '7,000 - 8,500 EGP/month',
    salaryMin: 7000,
    salaryMax: 8500,
    workMode: 'On-site',
    jobType: 'Full-time',
    status: 'paused',
    postedDate: '2 weeks ago',
    deadline: 'Paused',
    applicantsCount: 19,
    interviewsCount: 4,
    aiScreenedCount: 17,
    hiredCount: 1,
    description: 'Coordinate stock intake across branch warehouses, monitor inventory discrepancies, and reconcile physical receipts with ERP software.',
    requirements: ['Bachelor in Commerce or relevant', 'Good Excel skills (VLOOKUP, Pivot Tables)', 'Attention to detail'],
    perks: ['Social Insurance from day one', 'Overtime compensation'],
    isBoosted: false
  }
];

export const initialEmployerApplicants: EmployerApplicant[] = [
  {
    id: 'app-101',
    jobId: 'emp-job-2',
    jobTitle: 'Frontend Engineer (React & TypeScript)',
    candidateName: 'Mostafa Ibrahim',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    headline: 'Senior Frontend Engineer • 4.5 yrs exp • React / Next.js',
    candidateLocation: 'Maadi, Cairo',
    metroStation: 'Sakanat El-Maadi (Line 1)',
    distanceKm: 1.4,
    commuteTimeMins: 14,
    commuteTransitMode: 'Metro Line 1 (14 mins door-to-door)',
    aiMatchScore: 96,
    matchHighlights: [
      'Lives only 1.4 km from workplace (Minimal commute friction)',
      'Verified TypeScript & React state management on GitHub',
      'Salary expectation (42,000 EGP) sits comfortably within budget range',
      'Available within 2 weeks notice'
    ],
    stage: 'interview',
    appliedDate: 'Yesterday at 3:15 PM',
    expectedSalary: '42,000 EGP',
    skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Arabic RTL Support'],
    experienceYears: 4.5,
    cvSummary: 'Ex-Swvl and regional e-commerce developer. Strong architectural discipline with micro-frontends, high performance core web vitals, and accessibility.',
    truthScore: 98,
    interviewQuestionsSuggested: [
      'How have you architected state hydration for SSR e-commerce catalog pages?',
      'Describe a scenario where you refactored an unoptimized React component that caused sluggish render times on mobile devices.',
      'Since you live in Sakanat El-Maadi, how would you structure hybrid in-office collaboration days with the backend squad?'
    ],
    email: 'mostafa.ibrahim.dev@gmail.com',
    phone: '+20 100 234 5678',
    notes: 'Exceptional portfolio. Impressed by his RTL CSS architecture. Scheduled technical screen for Thursday.'
  },
  {
    id: 'app-102',
    jobId: 'emp-job-1',
    jobTitle: 'Sales Assistant & Store Specialist',
    candidateName: 'Khaled Mansour',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    headline: 'Retail Sales Team Lead & Merchandiser • 3 yrs exp',
    candidateLocation: 'Nasr City / Maadi corridor',
    metroStation: 'Maadi Station (Line 1)',
    distanceKm: 1.8,
    commuteTimeMins: 18,
    commuteTransitMode: 'Direct Microbus / Line 1 (18 mins)',
    aiMatchScore: 94,
    matchHighlights: [
      '1.8 km distance ensures 0% late arrival risk for morning store opening',
      'Track record of +22% store sales quota achievement at previous employer',
      'Completed certified retail POS inventory course',
      'Immediate availability'
    ],
    stage: 'shortlisted',
    appliedDate: '2 days ago',
    expectedSalary: '7,000 EGP',
    skills: ['Point of Sale (POS)', 'Client Engagement', 'Visual Merchandising', 'Stock Rotation', 'Arabic Native'],
    experienceYears: 3.2,
    cvSummary: 'Dynamic retail associate with 3 years of frontline customer experience at flagship clothing and electronics boutiques. Excellent upsell and customer retention skills.',
    truthScore: 95,
    interviewQuestionsSuggested: [
      'How do you handle an upset shopper demanding an immediate refund for an unreceipted item?',
      'Walk us through how you organize store shelves for maximum visual traffic during promotional weekends.',
      'Are you comfortable working rotating morning and weekend peak shifts?'
    ],
    email: 'khaled.mansour.retail@yahoo.com',
    phone: '+20 111 889 9012',
    notes: 'Shortlisted by AI radar. Verified references from previous store manager.'
  },
  {
    id: 'app-103',
    jobId: 'emp-job-3',
    jobTitle: 'Bilingual Customer Care Representative',
    candidateName: 'Salma El-Gohary',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
    headline: 'Bilingual Support Specialist • C1 English • Zendesk Certified',
    candidateLocation: 'Dokki, Giza',
    metroStation: 'Dokki Metro Station (Line 2)',
    distanceKm: 0.9,
    commuteTimeMins: 10,
    commuteTransitMode: 'Walking (9 mins / 900m from Dokki Metro)',
    aiMatchScore: 95,
    matchHighlights: [
      'Walkable 900m distance from Dokki office (Zero commute stress)',
      'Verified C1 Advanced English score and British accent clarity',
      '3 years Zendesk and live chat queue management experience',
      'Available for rotating night/day shifts'
    ],
    stage: 'applied',
    appliedDate: 'Today at 10:20 AM',
    expectedSalary: '9,500 EGP',
    skills: ['Fluent English (C1)', 'Zendesk', 'Live Chat Resolution', 'Conflict De-escalation', 'Fast Typing (68 WPM)'],
    experienceYears: 3.0,
    cvSummary: 'Customer success professional with expertise in high-volume ticketing, SLA compliance, and cross-border MENA user satisfaction.',
    truthScore: 97,
    interviewQuestionsSuggested: [
      'How do you maintain a polite and cheerful tone during high-stress complaint calls?',
      'What metrics did you track in your previous helpdesk role (CSAT, First Response Time)?',
      'Since you live right next to the office, would you be open to occasional evening shift coverage with bonus pay?'
    ],
    email: 'salma.gohary.cx@gmail.com',
    phone: '+20 122 456 7890'
  },
  {
    id: 'app-104',
    jobId: 'emp-job-2',
    jobTitle: 'Frontend Engineer (React & TypeScript)',
    candidateName: 'Youssef Nabil',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    headline: 'Frontend Developer • 2.5 yrs exp • React & Next.js',
    candidateLocation: 'Nasr City, Cairo',
    metroStation: 'Abbas El-Akkad / Line 3',
    distanceKm: 8.5,
    commuteTimeMins: 35,
    commuteTransitMode: 'Line 3 + Monorail Connector (35 mins)',
    aiMatchScore: 89,
    matchHighlights: [
      'Solid React & Tailwind coding portfolio',
      'Reasonable commute via Line 3 connection',
      'Salary expectation is highly aligned (36,000 EGP)'
    ],
    stage: 'shortlisted',
    appliedDate: '3 days ago',
    expectedSalary: '36,000 EGP',
    skills: ['React', 'JavaScript', 'CSS3', 'REST APIs', 'Git'],
    experienceYears: 2.5,
    cvSummary: 'Web developer passionate about component libraries and clean responsive layouts. Built multiple landing pages and SaaS dashboards.',
    truthScore: 92,
    interviewQuestionsSuggested: [
      'Explain the difference between useMemo and useCallback in React performance profiling.',
      'How do you manage client-side state across deeply nested components?'
    ],
    email: 'youssef.nabil.web@gmail.com',
    phone: '+20 109 876 5432'
  },
  {
    id: 'app-105',
    jobId: 'emp-job-1',
    jobTitle: 'Sales Assistant & Store Specialist',
    candidateName: 'Nourhan Zaki',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    headline: 'Customer Service & Cashier Associate • 1.5 yrs exp',
    candidateLocation: 'Dar El-Salam / Maadi',
    metroStation: 'Dar El-Salam Station (Line 1)',
    distanceKm: 2.2,
    commuteTimeMins: 16,
    commuteTransitMode: 'Metro Line 1 (16 mins)',
    aiMatchScore: 91,
    matchHighlights: [
      'Short commute via 2 metro stops',
      'Friendly demeanor with excellent store cashier accuracy',
      'Available immediately'
    ],
    stage: 'offer',
    appliedDate: '5 days ago',
    expectedSalary: '6,200 EGP',
    skills: ['Cash Register', 'Customer Greeting', 'Inventory Auditing', 'Arabic Fluency'],
    experienceYears: 1.5,
    cvSummary: 'Punctual retail associate with flawless drawer closing records and energetic customer handling.',
    truthScore: 96,
    interviewQuestionsSuggested: [
      'What would you do if the cash register is short 50 EGP at the end of the shift?'
    ],
    email: 'nourhan.zaki@outlook.com',
    phone: '+20 114 332 1199',
    notes: 'Offer extended at 6,500 EGP + monthly store bonus. Candidate accepted verbally.'
  }
];

export const initialTalentPool: TalentCandidate[] = [
  {
    id: 'talent-1',
    name: 'Mariam Fahmy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces',
    role: 'Senior UI/UX & Product Designer',
    location: 'Maadi, Cairo',
    neighborhood: 'Degla Maadi',
    nearestMetro: 'Maadi Metro (Line 1)',
    distanceKm: 1.5,
    experienceYears: 5.0,
    topSkills: ['Figma', 'Design Systems', 'Arabic RTL UX', 'Mobile App Prototyping', 'User Research'],
    expectedSalary: '38,000 - 45,000 EGP',
    availability: '2 weeks notice',
    workPreference: 'Hybrid',
    badge: 'Top 5% Talent',
    bio: 'FinTech and SaaS product designer with a track record of elevating user conversion by 34%. Deep experience with bilingual interfaces.',
    aiMatchPotential: 97,
    verifiedSkills: true
  },
  {
    id: 'talent-2',
    name: 'Ziad Shenouda',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces',
    role: 'Full Stack Node.js & React Engineer',
    location: 'Dokki, Giza',
    neighborhood: 'Dokki / Mohandessin border',
    nearestMetro: 'Dokki Station (Line 2)',
    distanceKm: 2.2,
    experienceYears: 4.0,
    topSkills: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
    expectedSalary: '40,000 - 50,000 EGP',
    availability: 'Immediate',
    workPreference: 'Hybrid',
    badge: 'Immediate Joiner',
    bio: 'Backend-leaning full stack engineer specialized in robust payment webhooks, database indexing, and responsive React web portals.',
    aiMatchPotential: 95,
    verifiedSkills: true
  },
  {
    id: 'talent-3',
    name: 'Reem Al-Khatib',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces',
    role: 'Senior HR & Talent Acquisition Partner',
    location: 'New Cairo, Cairo',
    neighborhood: 'South Academy / 5th Settlement',
    nearestMetro: '90th Street Central',
    distanceKm: 3.1,
    experienceYears: 6.0,
    topSkills: ['Tech Recruitment', 'Egyptian Labor Law', 'Compensation & Benefits', 'ATS Workflows', 'Onboarding'],
    expectedSalary: '32,000 - 40,000 EGP',
    availability: '1 month notice',
    workPreference: 'On-site',
    badge: 'Certified HR Lead',
    bio: 'Scaled two tech startups from 15 to 140+ employees. Expert in local labor law compliance, e-invoicing payroll, and retention strategies.',
    aiMatchPotential: 92,
    verifiedSkills: true
  },
  {
    id: 'talent-4',
    name: 'Hany Boulos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces',
    role: 'Retail Store Operations & Inventory Manager',
    location: 'Heliopolis, Cairo',
    neighborhood: 'Korba / Merghany',
    nearestMetro: 'Al-Ahram Station (Line 3)',
    distanceKm: 3.8,
    experienceYears: 7.5,
    topSkills: ['Retail Store Management', 'Shrinkage Control', 'P&L Management', 'Team Leadership', 'Supply Chain'],
    expectedSalary: '18,000 - 24,000 EGP',
    availability: '2 weeks notice',
    workPreference: 'On-site',
    badge: 'Retail Veteran',
    bio: 'Supervised 6 branch locations across Greater Cairo. Reduced inventory shrinkage by 48% and trained over 60 frontline retail associates.',
    aiMatchPotential: 94,
    verifiedSkills: true
  },
  {
    id: 'talent-5',
    name: 'Dina Soliman',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&h=120&fit=crop&crop=faces',
    role: 'Performance Marketing & Growth Specialist',
    location: 'Zamalek, Cairo',
    neighborhood: '26th of July St.',
    nearestMetro: 'Zamalek Metro Station (Line 3)',
    distanceKm: 2.9,
    experienceYears: 3.5,
    topSkills: ['Meta Ads Manager', 'Google Search & Display', 'TikTok for Business', 'ROAS Optimization', 'Google Analytics 4'],
    expectedSalary: '25,000 - 32,000 EGP',
    availability: 'Immediate',
    workPreference: 'Hybrid',
    badge: 'Growth Specialist',
    bio: 'Managed over 4.5M EGP in paid ad spend with average 4.8x blended ROAS for local FMCG and fashion e-commerce brands.',
    aiMatchPotential: 90,
    verifiedSkills: true
  },
  {
    id: 'talent-6',
    name: 'Karim Tarek',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces',
    role: 'General Accountant & Tax Specialist',
    location: 'Heliopolis, Cairo',
    neighborhood: 'Heliopolis / Roxy',
    nearestMetro: 'Haroun Station (Line 3)',
    distanceKm: 4.1,
    experienceYears: 4.0,
    topSkills: ['Egyptian Tax Authority E-Invoicing', 'Odoo ERP', 'General Ledger', 'VAT Auditing', 'Payroll Processing'],
    expectedSalary: '14,000 - 18,000 EGP',
    availability: '2 weeks notice',
    workPreference: 'On-site',
    badge: 'Tax Portal Certified',
    bio: 'Accredited accountant proficient in منظومة الفاتورة والإيصال الإلكتروني, monthly payroll withholding, and financial closing reports.',
    aiMatchPotential: 93,
    verifiedSkills: true
  }
];

export const employerCommuteStats = {
  averageCommuteMinutes: 17,
  proximityTurnoverReductionPct: 44, // 44% lower turnover for hires living < 5km away
  metroAccessibleApplicantPct: 82,
  averageTimeToHireDays: 6.8, // vs 24 industry avg
  interviewAttendanceRatePct: 94, // Candidates living close actually show up to interviews!
  estimatedFuelAndStressHoursSavedWeekly: 14.5
};
