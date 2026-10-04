export interface SampleData {
  id: string;
  name: { en: string; ar: string };
  jobTitle: string;
  company: string;
  jobText: string;
  resumeText: string;
}

export const sampleDatasets: SampleData[] = [
  {
    id: "frontend-dev",
    name: {
      en: "Frontend React Engineer — Noon / Bayt (Cairo & Remote)",
      ar: "مهندس واجهات أمامية React — نون / بيت.كوم (القاهرة وعن بُعد)"
    },
    jobTitle: "Senior Frontend Developer (React & TypeScript)",
    company: "Noon Digital Tech",
    jobText: `Job Title: Senior Frontend Developer (React, Next.js, TypeScript)
Company: Noon Digital Tech
Location: Cairo, Egypt (Hybrid / 2 days in Smart Village, 3 days remote)
Employment Type: Full-Time
Experience Level: 3-5 Years
Salary Range: 45,000 EGP - 65,000 EGP per month + health insurance + stock options

About the Role:
We are seeking a talented Senior Frontend Developer to lead our customer-facing web platforms across Egypt, UAE, and Saudi Arabia. You will build high-traffic, bilingual (Arabic RTL and English LTR) e-commerce experiences.

Key Responsibilities:
- Architect and develop performant, accessible web applications using React 18+, TypeScript, and Next.js.
- Optimize frontend web vitals (LCP, FID, CLS) for high-scale mobile and desktop browsers.
- Build reusable UI components following our design system with Tailwind CSS and Radix UI.
- Implement native Arabic RTL layout support with bi-directional CSS patterns.
- Write unit and integration tests using Jest and React Testing Library.
- Collaborate with backend engineers to integrate GraphQL and RESTful APIs.
- Mentor junior engineers and participate in code reviews.

Must-Have Requirements:
- 3+ years of commercial frontend engineering with React, Next.js, and TypeScript.
- Strong knowledge of state management (Redux Toolkit, Zustand, or React Query).
- Demonstrated experience in bilingual web development (Arabic RTL / English LTR layouts).
- Thorough understanding of modern CSS, Tailwind CSS, and responsive typography.
- Experience with testing tools (Jest, React Testing Library).
- Good proficiency in Git, CI/CD pipelines, and web performance optimization.

Nice-to-Have:
- Experience with GraphQL & Apollo Client.
- Knowledge of micro-frontends architecture.
- E-commerce or FinTech checkout domain experience in the MENA region.
- Familiarity with Docker and basic AWS cloud deployment.`,
    resumeText: `AHMED HASSAN
Senior Web Developer | Cairo, Egypt | ahmed.hassan.dev@example.com | github.com/ahmedhassan

PROFESSIONAL SUMMARY:
Frontend Developer with 4+ years of experience building modern web applications using React, TypeScript, and Next.js. Passionate about web performance, clean architecture, and building seamless Arabic (RTL) and English user interfaces for Middle Eastern audiences.

TECHNICAL SKILLS:
- Core: JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS.
- Frameworks: React, Next.js, Redux Toolkit, Zustand, React Query.
- Testing & Tools: Jest, Git, GitHub Actions, Vite, Webpack, REST APIs.
- Languages: Arabic (Native), English (Fluent).

WORK EXPERIENCE:
Frontend Software Engineer | Wuzzuf Media Solutions | Cairo, Egypt | 2022 - Present
- Engineered high-traffic candidate portal used by over 500,000 monthly job seekers.
- Built reusable component library in React and Tailwind CSS with full Arabic RTL and English LTR support, cutting UI feature rollout time by 35%.
- Implemented state management using Redux Toolkit and React Query for asynchronous data caching.
- Reduced initial page load time by 42% through image optimization, dynamic code-splitting, and Next.js SSR.
- Mentored 3 junior frontend developers and conducted weekly peer code reviews.

Web Developer | TechSoft MENA | Giza, Egypt | 2020 - 2022
- Developed responsive client dashboard applications using React, TypeScript, and REST APIs.
- Collaborated with UX team to ensure WCAG 2.1 AA accessibility standards across desktop and mobile.
- Wrote unit tests in Jest achieving 80% code coverage across critical user authentication flows.

EDUCATION:
B.Sc. in Computer Science | Cairo University (Faculty of Computers & Artificial Intelligence) | 2016 - 2020`
  },
  {
    id: "data-analyst",
    name: {
      en: "Data Analyst — FinTech Growth (Dubai / Riyadh / Remote)",
      ar: "محلل بيانات — شركة تقنية مالية (دبي / الرياض / عن بُعد)"
    },
    jobTitle: "Data & Business Intelligence Analyst",
    company: "PayPulse FinTech",
    jobText: `Job Title: Data & Business Intelligence Analyst
Company: PayPulse FinTech
Location: Dubai, UAE (Remote within MENA / GCC)
Seniority: Mid-level (2-4 years)
Salary: 16,000 - 22,000 AED / month (Tax-free) + Annual Performance Bonus

Overview:
PayPulse is a fast-growing digital payment gateway licensed across the UAE and Saudi Arabia. We are looking for an analytical Data Analyst to deliver actionable insights on user retention, transaction funnel drop-offs, and merchant performance.

Core Responsibilities:
- Build, automate, and maintain executive dashboards using Tableau and Power BI.
- Write complex SQL queries across Snowflake and PostgreSQL databases.
- Perform cohort analysis, A/B test evaluation, and customer churn prediction.
- Partner with product managers and growth marketing teams to define core KPIs.
- Clean and transform raw transactional data using Python (Pandas, NumPy).

Required Qualifications (Must-Have):
- 2+ years of professional experience as a Data Analyst, BI Analyst, or Analytics Engineer.
- Advanced SQL proficiency (window functions, CTEs, query optimization).
- Proven dashboard design experience with Tableau or Power BI.
- Hands-on data manipulation in Python (Pandas) or R.
- Strong business acumen and ability to translate data into executive recommendations.

Preferred (Nice-to-Have):
- Experience in payment systems, fintech, or digital wallets.
- Experience with Snowflake or dbt (data build tool).
- Understanding of machine learning classification models.`,
    resumeText: `MARIAM EL-SAYED
Data Analyst | Dubai, UAE | mariam.analytics@example.com

SUMMARY:
Data Analyst with 3 years of experience in product analytics, SQL query optimization, and interactive dashboard creation. Skilled in turning raw user behavior data into actionable retention and revenue growth strategies.

CORE COMPETENCIES:
- Analytics & Querying: Advanced SQL (PostgreSQL, MySQL), Python (Pandas, NumPy, Matplotlib).
- Business Intelligence: Power BI, Google Looker Studio, Excel (Advanced, Power Query).
- Statistics: Hypothesis Testing, A/B Testing, Cohort Analysis, Funnel Optimization.

EXPERIENCE:
Data Analyst | Regional Commerce Hub | Alexandria, Egypt (Remote) | 2022 - Present
- Designed 12 automated executive dashboards in Power BI tracking daily GMV, CAC, and LTV.
- Wrote optimized SQL queries processing 2M+ monthly transaction records, reducing query execution time by 50%.
- Conducted retention cohort analysis that identified high-churn drop-off points, resulting in a 14% improvement in 30-day user retention.
- Conducted A/B tests for mobile app redesign to validate statistically significant uplift.

Junior Data Specialist | Insight Consulting | Cairo | 2021 - 2022
- Maintained recurring weekly reports using Python scripts and Excel macros.
- Extracted and cleaned customer survey datasets across regional markets.`
  },
  {
    id: "scam-sample",
    name: {
      en: "⚠️ Suspicious Work-From-Home Job (Scam / Red-Flag Test)",
      ar: "⚠️ وظيفة مشبوهة براتب غير منطقي (اختبار كشف الاحتيال)"
    },
    jobTitle: "Data Entry Assistant / Online Agent (Urgent Hires)",
    company: "Global Global Holdings Ltd (Unverified)",
    jobText: `URGENT HIRING!! WORK FROM HOME - NO EXPERIENCE NEEDED!
Company: Global Wealth Ventures International
Location: 100% Anywhere in the World (Work from phone 1-2 hours a day)
Pay: $4,000 - $8,000 USD PER WEEK guaranteed in cash or crypto!
Slots: ONLY 3 SPOTS LEFT TODAY! ACT FAST!

Job Description:
We are looking for immediate data typists to review simple online forms and click verification buttons. Anyone can do this! Students, retirees, anyone who wants to become rich fast.

Requirements:
- Must have a smartphone or laptop with internet.
- No resume or interview needed! You are pre-approved immediately!
- Must have a Telegram account or WhatsApp.
- IMPORTANT: All applicants must pay a small refundable security clearance fee of $35 via Western Union or Bitcoin before receiving their company equipment and starter login credentials. This fee is 100% refunded on your first paycheck tomorrow!

Contact HR manager on Telegram immediately at @QuickCashEarnOnline99. DO NOT EMAIL. Send payment proof to receive your immediate start kit!`,
    resumeText: `SARA IBRAHIM
Recent Business Administration Graduate | sara.ibrahim@example.com
Fresh graduate seeking entry-level administrative or data entry opportunities.`
  }
];
