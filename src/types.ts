export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site' | 'Unspecified';

export type SeniorityLevel = 
  | 'Entry-level / Fresh Grad'
  | 'Mid-level'
  | 'Senior'
  | 'Lead / Principal'
  | 'Manager / Executive';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface SalaryInfo {
  stated: string;
  estimated: string;
  currency: string;
  min: number;
  max: number;
  period: 'monthly' | 'yearly' | 'hourly';
  confidence: 'High' | 'Medium' | 'Estimated based on regional market';
}

export interface RedFlagAssessment {
  isSuspicious: boolean;
  riskScore: number; // 0 (safe) to 100 (high risk scam)
  flags: string[];
  explanation: string;
}

export interface JobAnalysis {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: WorkMode;
  seniority: SeniorityLevel;
  salary: SalaryInfo;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  responsibilities: string[];
  benefits: string[];
  redFlags: RedFlagAssessment;
  summary: string;
  rawText: string;
  analyzedAt: string;
  language: Language;
}

export interface SkillMatchDetail {
  skill: string;
  foundInResume: boolean;
  evidence?: string;
  importance: 'critical' | 'preferred';
}

export interface TruthPreservingSuggestion {
  originalConcept: string;
  suggestedWording: string;
  why: string;
  category: 'Impact' | 'Terminology' | 'Organization';
}

export interface ResumeMatch {
  overallScore: number; // 0 to 100
  mustHaveScore: number;
  niceToHaveScore: number;
  matchedSkills: SkillMatchDetail[];
  missingMustHave: string[];
  missingNiceToHave: string[];
  honestGuidance: {
    fitSummary: string;
    shouldApplyAdvice: string;
    truthPreservingSuggestions: TruthPreservingSuggestion[];
    whatNotToClaim: string[];
  };
  coverLetter: string;
  coverLetterTone: 'Professional' | 'Confident' | 'Early-Career';
}

export interface AtsCheckItem {
  id: string;
  category: 'format' | 'keywords' | 'structure' | 'quantifiable';
  title: string;
  description: string;
  passed: boolean;
  severity: 'high' | 'medium' | 'low';
}

export interface AtsEvaluation {
  score: number;
  rating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  checklist: AtsCheckItem[];
  matchedKeywords: string[];
  missingKeywords: string[];
  wordCount: number;
  readingTimeMin: number;
}

export interface LearningPlanItem {
  id: string;
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedHours: number;
  resourceName: string;
  resourceType: 'Course' | 'Project' | 'Documentation' | 'Tutorial';
  provider: string;
  description: string;
  actionableStep: string;
}

export interface ApplicationItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  workMode: WorkMode;
  salary: string;
  status: 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  matchScore: number;
  appliedDate: string;
  followUpDate: string;
  notes: string;
  jobId?: string;
}

export interface InterviewInsight {
  id: string;
  company: string;
  role: string;
  location: string;
  difficulty: number; // 1 to 5
  outcome: 'Accepted Offer' | 'Received Offer' | 'Rejected' | 'Withdrew' | 'Waiting';
  timelineWeeks: number;
  stages: string[];
  questionsAsked: {
    category: 'Technical' | 'Behavioral' | 'Case Study' | 'HR';
    question: string;
  }[];
  insiderTips: string;
  submittedAt: string;
  helpfulCount: number;
}

// ----------------------------------------------------------------------
// NEW DISCOVERY, AI ASSISTANT, USER PROFILE & ADMIN TYPES
// ----------------------------------------------------------------------

export interface MatchReasonItem {
  key: string;
  label: string;
  matched: boolean;
  passed?: boolean;
  details?: string;
}

export interface DiscoveredJob {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  distance: string; // e.g. "1.2 km away", "3.5 km away", "Remote"
  distanceKm: number; // for numeric sorting
  salary: string;
  salaryNum?: number;
  jobType: JobType;
  experience: string; // e.g. "1-3 years", "Fresh Grad", "4+ years"
  workMode: WorkMode;
  industry: string;
  isEgypt: boolean;
  matchScore: number; // e.g. 94
  matchReasons: MatchReasonItem[];
  tags: string[];
  description: string;
  requirements?: string[];
  postedDate: string;
  deadline?: string;
  applied?: boolean;
  saved?: boolean;
}

export type AssistantMode = 
  | 'general' 
  | 'ats_coach' 
  | 'mock_interview' 
  | 'salary_negotiator' 
  | 'scam_shield';

export interface InterviewPracticeQuestion {
  question: string;
  category: 'Technical' | 'Behavioral' | 'Situational' | 'Salary/HR';
  tips: string;
  sampleAnswer?: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedJobs?: DiscoveredJob[];
  actionChips?: string[];
  interviewQuestion?: InterviewPracticeQuestion;
  copyableSnippet?: string;
  mode?: AssistantMode;
}

export type UserRole = 'user' | 'job_seeker' | 'employer' | 'moderator' | 'admin' | 'super_admin';

export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  headline?: string;
  location?: string;
  phone?: string;
  targetRole?: string;
  targetSalary?: string;
  preferredWorkMode?: string;
  profileStrength: number; // e.g. 85
  cvAtsScore: number; // e.g. 82
  recommendedJobsCount: number; // e.g. 12
  activeApplicationsCount: number; // e.g. 7
  isPremium: boolean;
  bio?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills?: string[];
  experienceYears?: number;
  education?: string;
  noticePeriod?: string;
  openToWork?: boolean;
  workHistory?: WorkExperienceItem[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'deactivated';
  joinedAt: string;
  createdAt?: string;
  applicationsCount: number;
  isPremium: boolean;
  governorate?: string;
  phone?: string;
  lastLogin?: string;
}

export interface AdminJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: 'approved' | 'pending' | 'rejected';
  postedAt: string;
  applicationsCount: number;
  reportsCount: number;
  category?: string;
  featured?: boolean;
  scamRisk?: number;
  description?: string;
  experienceLevel?: string;
}

export interface AdminCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  verified: boolean;
  activeJobsCount: number;
  totalHires?: number;
  totalHiresCount?: number;
  contactEmail: string;
  commercialReg?: string;
  taxId?: string;
  website?: string;
}

export interface AdminReport {
  id: string;
  type: 'job_scam' | 'user_abuse' | 'inaccurate_salary' | 'spam';
  targetTitle: string;
  targetId: string;
  reportedBy: string;
  reportedAt: string;
  createdAt?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  details: string;
  reason?: string;
  evidence?: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  target: string;
  type?: 'security' | 'moderation' | 'user' | 'system' | 'billing';
  category?: 'security' | 'moderation' | 'user' | 'system' | 'billing';
  ipAddress?: string;
}

export interface AdminFeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'ai' | 'security' | 'platform';
  key?: string;
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  totalJobs: number;
  totalApplications: number;
  interviewsCount: number;
  hiresCount: number;
  premiumUsers: number;
  aiUsageCalls: number;
  monthlyRevenue: number;
}

export type ApplicantStage = 'applied' | 'shortlisted' | 'interview' | 'offer' | 'rejected';

export interface EmployerApplicant {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  avatar: string;
  headline: string;
  candidateLocation: string;
  metroStation?: string;
  distanceKm: number;
  commuteTimeMins: number;
  commuteTransitMode: string;
  aiMatchScore: number;
  matchHighlights: string[];
  stage: ApplicantStage;
  appliedDate: string;
  expectedSalary: string;
  skills: string[];
  experienceYears: number;
  cvSummary: string;
  truthScore: number;
  interviewQuestionsSuggested: string[];
  notes?: string;
  email: string;
  phone: string;
}

export interface TalentCandidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  neighborhood: string;
  nearestMetro: string;
  distanceKm: number;
  experienceYears: number;
  topSkills: string[];
  expectedSalary: string;
  availability: 'Immediate' | '2 weeks notice' | '1 month notice';
  workPreference: 'On-site' | 'Hybrid' | 'Remote';
  badge: string;
  bio: string;
  aiMatchPotential: number;
  verifiedSkills: boolean;
}
