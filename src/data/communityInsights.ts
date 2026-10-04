import { InterviewInsight } from '../types';

export const initialInterviewInsights: InterviewInsight[] = [
  {
    id: "insight-1",
    company: "Noon",
    role: "Senior Frontend Developer",
    location: "Cairo / Dubai (Hybrid)",
    difficulty: 3.8,
    outcome: "Accepted Offer",
    timelineWeeks: 3,
    stages: [
      "1. HR Screener (30 mins)",
      "2. Live Coding: React State & Custom Hook (60 mins)",
      "3. System Architecture & RTL bi-directional UI (60 mins)",
      "4. Engineering Manager Cultural Fit (45 mins)"
    ],
    questionsAsked: [
      {
        category: "Technical",
        question: "How do you handle RTL (Arabic) CSS without duplicating styles or causing layout bugs with absolute positioning?"
      },
      {
        category: "Technical",
        question: "Explain how React 18 concurrent features (startTransition, useDeferredValue) help with sluggish e-commerce search inputs."
      },
      {
        category: "Behavioral",
        question: "Describe a time when a critical production bug happened during a flash sale (White Friday). How did you triage it?"
      }
    ],
    insiderTips: "They care deeply about mobile browser performance in emerging markets where 3G/4G connections can fluctuate. Prepare to discuss Web Vitals and bundle size reduction.",
    submittedAt: "2 weeks ago",
    helpfulCount: 42
  },
  {
    id: "insight-2",
    company: "Wuzzuf / Forasna (BasharSoft)",
    role: "Full Stack / Frontend Developer",
    location: "Giza, Egypt",
    difficulty: 3.2,
    outcome: "Received Offer",
    timelineWeeks: 2,
    stages: [
      "1. Quick Phone Call with Talent Acquisition",
      "2. Take-Home Project (Candidate Filtering UI in 48h)",
      "3. Technical Project Review with 2 Senior Engineers",
      "4. Final Chat with VP of Engineering"
    ],
    questionsAsked: [
      {
        category: "Technical",
        question: "Walk us through how you structured pagination and client-side caching in your take-home project."
      },
      {
        category: "Behavioral",
        question: "Why do you want to build HR and recruitment technology specifically for Egypt and the Arab world?"
      }
    ],
    insiderTips: "Clean Git commits and well-documented README in your take-home assignment matter almost as much as the working code.",
    submittedAt: "1 month ago",
    helpfulCount: 29
  },
  {
    id: "insight-3",
    company: "Careem / PayPulse",
    role: "Data & BI Analyst",
    location: "Dubai / Riyadh / Remote",
    difficulty: 4.1,
    outcome: "Accepted Offer",
    timelineWeeks: 4,
    stages: [
      "1. Recruiter Screen",
      "2. Live SQL Assessment on CoderPad (Window functions, funnel retention)",
      "3. Case Study Presentation: Improving Driver/Customer Marketplace Liquidity",
      "4. Director of Analytics Interview"
    ],
    questionsAsked: [
      {
        category: "Technical",
        question: "Write a SQL query using window functions (ROW_NUMBER, LAG) to calculate day-over-day drop-off rates across payment methods."
      },
      {
        category: "Case Study",
        question: "If transaction conversion drops by 8% on Friday evening in Riyadh, how would you systematically diagnose whether it's a technical bug, gateway outage, or user behavior shift?"
      }
    ],
    insiderTips: "Practice writing clean SQL on a live shared screen without autofill. Be very structured in how you break down ambiguity during the case study.",
    submittedAt: "3 weeks ago",
    helpfulCount: 38
  }
];
