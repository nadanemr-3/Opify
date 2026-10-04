import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Sparkles,
  RefreshCw,
  CheckCircle,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { Language, LearningPlanItem } from '../types';
import { translations } from '../i18n/translations';

interface LearningPlanViewProps {
  language: Language;
  missingSkills: string[];
  targetRole: string;
}

// Built-in resilient curriculum catalog (regional & global certified tracks)
function generateClientCurriculum(
  skills: string[],
  targetRole: string,
  isArabic: boolean
): LearningPlanItem[] {
  const defaultSkills = ['GraphQL', 'Docker', 'AWS Deployment', 'Web Performance'];
  const activeSkills = skills.length > 0 ? skills : defaultSkills;

  const catalog: Record<string, {
    hours: number;
    type: 'Course' | 'Project' | 'Documentation' | 'Tutorial';
    provider: string;
    resourceName: string;
    resourceNameAr: string;
    desc: string;
    descAr: string;
    step: string;
    stepAr: string;
  }> = {
    docker: {
      hours: 12,
      type: 'Course',
      provider: isArabic ? 'معهد تكنولوجيا المعلومات ITI / منصة مهارة-تك' : 'Docker Docs & FreeCodeCamp',
      resourceName: 'Docker & Containerization for Modern Production Workloads',
      resourceNameAr: 'إتقان Docker وتقنيات الحاويات لبيئات العمل الحديثة',
      desc: 'Master container lifecycles, multi-stage Dockerfiles, networking, and docker-compose orchestration.',
      descAr: 'تعلم بناء حاويات التطبيقات، إدارة المجلدات والشبكات، وتنسيق الخدمات باستخدام docker-compose.',
      step: 'Dockerize a full-stack client-server app with multi-stage Dockerfile and commit docker-compose.yml to GitHub.',
      stepAr: 'قم بتهيئة حاوية لتطبيق متكامل بواسطة Dockerfile متعدد المراحل ورفع ملف docker-compose.yml على GitHub.'
    },
    graphql: {
      hours: 14,
      type: 'Course',
      provider: isArabic ? 'أكاديمية Apollo Odyssey والتوثيق الرسمي' : 'Apollo Odyssey & Official GraphQL Docs',
      resourceName: 'Production-Ready GraphQL with TypeScript & Apollo',
      resourceNameAr: 'تطوير واجهات برمجة التطبيقات GraphQL باستخدام TypeScript و Apollo',
      desc: 'Master schema-first design, resolvers, DataLoader batching to prevent N+1 queries, and caching.',
      descAr: 'إتقان تصميم المخططات، ومعالجة البيانات Resolvers، ومنع مشكلة N+1 بواسطة DataLoader، والتخزين المؤقت.',
      step: 'Construct a GraphQL sub-graph API with schema-first typing and verify queries in Apollo Studio.',
      stepAr: 'أنشئ واجهة برمجة تطبيقات GraphQL مع مخطط كامل واختبرها عبر Apollo Studio أو Postman.'
    },
    aws: {
      hours: 16,
      type: 'Course',
      provider: isArabic ? 'منهاج AWS المعتمد / معهد ITI' : 'AWS Skill Builder & FreeCodeCamp',
      resourceName: 'AWS Cloud Deployment & Serverless Architecture Fundamentals',
      resourceNameAr: 'أساسيات الحوسبة السحابية والنشر عبر AWS والهندسة عديمة الخوادم',
      desc: 'Deploy scalable applications on S3, ECS Fargate, and Lambda with IAM security and CloudWatch monitoring.',
      descAr: 'نشر التطبيقات السحابية على S3 وECS Fargate وLambda مع ضبط أمان IAM ومراقبة الأداء عبر CloudWatch.',
      step: 'Deploy a live demo API on AWS with automated GitHub Actions CI/CD deployment pipeline.',
      stepAr: 'انشر تطبيقاً تجريبياً حياً على AWS مع ربطه بسير عمل GitHub Actions للنشر الآلي المستمر.'
    },
    performance: {
      hours: 10,
      type: 'Documentation',
      provider: isArabic ? 'أكاديمية Google web.dev' : 'Google web.dev & Chrome DevTools',
      resourceName: 'Web Performance, Core Web Vitals & Bundle Optimization',
      resourceNameAr: 'تحسين أداء الويب ومؤشرات Core Web Vitals وحزم الكود',
      desc: 'Deep dive into LCP, INP, and CLS diagnostics, lazy loading, Brotli compression, and tree shaking.',
      descAr: 'تشخيص وتحسين مؤشرات تجربة المستخدم LCP و INP و CLS وتقليل أحجام الحزم البرمجية.',
      step: 'Benchmark and boost an existing web app to a 95+ score on Google PageSpeed Insights.',
      stepAr: 'قم بتحسين أداء موقع إلكتروني ورفع نتيجته في Google PageSpeed إلى أكثر من 95 نقطة.'
    },
    typescript: {
      hours: 12,
      type: 'Course',
      provider: 'TypeScript Handbook / Total TypeScript',
      resourceName: 'Production TypeScript — Advanced Generics & Utility Types',
      resourceNameAr: 'إتقان TypeScript للمشاريع الكبيرة والأنماط المتقدمة',
      desc: 'Build robust domain models with discriminated unions, mapped types, and strict type safety.',
      descAr: 'بناء نماذج بيانات متقدمة مع الفئات المشروطة والأنماط المعقدة وضمان أمان الأنواع البرمجية.',
      step: 'Convert a vanilla JavaScript repository to strict TypeScript with zero any declarations.',
      stepAr: 'حوّل مشروع JavaScript بالكامل إلى TypeScript بالوضع الصارم دون استخدام any.'
    },
    react: {
      hours: 18,
      type: 'Course',
      provider: isArabic ? 'منصة مهارة-تك / React.dev' : 'React.dev & ITI MaharaTech',
      resourceName: 'Modern React 19 Architecture & State Synchronization',
      resourceNameAr: 'هندسة React 19 الحديثة وإدارة الحالات المتقدمة',
      desc: 'Master React Server Components, custom hook design patterns, optimistic UI, and transitions.',
      descAr: 'إتقان مكونات الخادم، تصميم الخطافات المخصصة، وتحديثات الواجهة الفورية والمتزامنة.',
      step: 'Build a production-grade dashboard featuring memoized data visualizers and responsive layout.',
      stepAr: 'قم ببناء لوحة تحكم تفاعلية مع رسوم بيانية ومكونات متجاوبة عالية الأداء.'
    }
  };

  return activeSkills.map((rawSkill, idx) => {
    const skill = rawSkill.trim();
    const key = skill.toLowerCase();
    const matchedKey = Object.keys(catalog).find(k => key.includes(k));

    if (matchedKey) {
      const entry = catalog[matchedKey];
      return {
        id: `plan-${idx}-${matchedKey}`,
        skill,
        priority: idx === 0 ? 'High' : idx <= 2 ? 'Medium' : 'Low',
        estimatedHours: entry.hours,
        resourceName: isArabic ? entry.resourceNameAr : entry.resourceName,
        resourceType: entry.type,
        provider: entry.provider,
        description: isArabic ? entry.descAr : entry.desc,
        actionableStep: isArabic ? entry.stepAr : entry.step
      };
    }

    return {
      id: `plan-${idx}-custom`,
      skill,
      priority: idx === 0 ? 'High' : 'Medium',
      estimatedHours: 10 + (idx * 2),
      resourceName: isArabic
        ? `المسار الاحترافي المتقدم لإتقان ${skill} — تطبيقات عملية`
        : `${skill} Professional Mastery & Real-World Practical Architecture`,
      resourceType: 'Course' as const,
      provider: isArabic ? 'معهد تكنولوجيا المعلومات ITI / مهارة-تك / التوثيق الرسمي' : 'Coursera / ITI MaharaTech / Official Docs',
      description: isArabic
        ? `منهاج تدريبي موجه لتعلم وتطبيق مهارة ${skill} بما يتناسب مع متطلبات وظيفة ${targetRole || 'المسار المستهدف'}.`
        : `Targeted curriculum focused on mastering core principles and real-world implementation of ${skill} for ${targetRole || 'target'} roles.`,
      actionableStep: isArabic
        ? `قم ببناء نموذج عملي أو مشروع مصغر يُبرز استخدامك لـ ${skill} وارفعه على GitHub مع توثيق شامل.`
        : `Build a targeted mini-project or functional feature demonstrating your mastery of ${skill} and link it on GitHub with a comprehensive README.`
    };
  });
}

export const LearningPlanView: React.FC<LearningPlanViewProps> = ({
  language,
  missingSkills,
  targetRole
}) => {
  const t = translations[language];
  const isArabic = language === 'ar';
  
  const [items, setItems] = useState<LearningPlanItem[]>(() => 
    generateClientCurriculum(missingSkills, targetRole, isArabic)
  );
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'in_progress' | 'completed'>('all');
  const [sourceType, setSourceType] = useState<'ai' | 'curated'>('curated');

  const skillsToUse = missingSkills.length > 0 ? missingSkills : ['GraphQL', 'Docker', 'AWS Deployment', 'Web Performance'];

  const fetchPlan = async (skills: string[]) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/learning-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missingSkills: skills,
          targetRole: targetRole || 'Target Career Role',
          language
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
          setSourceType('ai');
          return;
        }
      }
      // Graceful fallback to client curriculum
      setItems(generateClientCurriculum(skills, targetRole, isArabic));
      setSourceType('curated');
    } catch (e) {
      // Offline, network drop, or server busy — seamlessly use curated client curriculum
      setItems(generateClientCurriculum(skills, targetRole, isArabic));
      setSourceType('curated');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan(skillsToUse);
  }, [missingSkills, language, targetRole]);

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim()) {
      const newSkills = [...items.map((i) => i.skill), customSkill.trim()];
      setCustomSkill('');
      fetchPlan(newSkills);
    }
  };

  const completedCount = items.filter((item, idx) => 
    completedIds.includes(item.id || `plan-${idx}`)
  ).length;

  const totalHours = items.reduce((acc, curr) => acc + (curr.estimatedHours || 10), 0);
  const remainingHours = items.filter((item, idx) => 
    !completedIds.includes(item.id || `plan-${idx}`)
  ).reduce((acc, curr) => acc + (curr.estimatedHours || 10), 0);

  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  // Filter items
  const filteredItems = items.filter((item, idx) => {
    const id = item.id || `plan-${idx}`;
    const isDone = completedIds.includes(id);
    if (activeFilter === 'high') return item.priority === 'High';
    if (activeFilter === 'in_progress') return !isDone;
    if (activeFilter === 'completed') return isDone;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.learningTitle || 'Skill Gap Learning Roadmap'}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800">
                <Sparkles className="w-3 h-3" />
                {sourceType === 'ai' ? (t.aiRoadmapCurated || 'AI Curated Roadmap') : (isArabic ? 'منهج معتمد لمصر والمنطقة' : 'Certified Egyptian & Global Track')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {t.learningSubtitle || 'Targeted milestone learning paths bridging your missing competencies with free & certified regional resources (ITI, MaharaTech) and global courses.'}
            </p>
          </div>
        </div>

        {/* Actions: Refresh & Add Skill */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <form onSubmit={handleAddCustomSkill} className="flex items-center gap-2">
            <input
              id="add-custom-skill-input"
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder={t.customSkillPlaceholder || 'Add specific skill to study...'}
              className="text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 w-48 sm:w-56"
            />
            <button
              id="add-custom-skill-btn"
              type="submit"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white transition cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addSkillBtn || 'Add'}</span>
            </button>
          </form>

          <button
            id="refresh-learning-plan-btn"
            onClick={() => fetchPlan(skillsToUse)}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition cursor-pointer disabled:opacity-50"
            title={t.refreshPlan || 'Refresh with AI'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-600 dark:text-teal-400' : ''}`} />
            <span>{t.refreshPlan || 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Milestone Overview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-slate-200 dark:sm:divide-slate-700 rtl:sm:divide-x-reverse">
        
        {/* Progress Bar */}
        <div className="sm:pr-4 rtl:sm:pr-0 rtl:sm:pl-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{t.learningProgress || 'Curriculum Progress'}</span>
            <span className="font-bold text-teal-700 dark:text-teal-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-teal-600 dark:bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {completedCount} of {items.length} {t.learningCompleted || 'skills completed'}
          </p>
        </div>

        {/* Hours Overview */}
        <div className="pt-3 sm:pt-0 sm:px-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{isArabic ? 'ساعات التعلم المتبقية' : 'Estimated Time to Mastery'}</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            ~{remainingHours} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{isArabic ? 'ساعة متبقية' : 'hours remaining'}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {totalHours} {isArabic ? 'ساعة إجمالية لكامل المنهج' : 'total curriculum investment'}
          </p>
        </div>

        {/* Target Position Context */}
        <div className="pt-3 sm:pt-0 sm:pl-4 rtl:sm:pl-0 rtl:sm:pr-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{isArabic ? 'المنصب المستهدف' : 'Target Career Benchmark'}</span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {targetRole || 'Target Career Role'}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isArabic ? 'مبني على متطلبات شركات القاهرة والشرق الأوسط' : 'Calibrated for Egyptian & regional hiring bars'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            activeFilter === 'all' 
              ? 'bg-teal-700 text-white shadow-xs' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
          }`}
        >
          {t.allSkillsTab || 'All Modules'} ({items.length})
        </button>
        <button
          onClick={() => setActiveFilter('high')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            activeFilter === 'high' 
              ? 'bg-rose-700 text-white shadow-xs' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
          }`}
        >
          {t.highPriorityTab || 'High Priority'} ({items.filter(i => i.priority === 'High').length})
        </button>
        <button
          onClick={() => setActiveFilter('in_progress')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            activeFilter === 'in_progress' 
              ? 'bg-amber-700 text-white shadow-xs' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
          }`}
        >
          {t.inProgressTab || 'In Progress'} ({items.length - completedCount})
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            activeFilter === 'completed' 
              ? 'bg-emerald-700 text-white shadow-xs' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
          }`}
        >
          {t.completedTab || 'Mastered'} ({completedCount})
        </button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-xs">
          <RefreshCw className="w-6 h-6 animate-spin text-teal-600 dark:text-teal-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {isArabic 
              ? `جارٍ تخصيص خارطة الطريق التدريبية لوظيفة ${targetRole || 'المسار المستهدف'}...`
              : `Curating personalized learning roadmap for ${targetRole || 'your target position'}...`}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isArabic ? 'مطابقة المنصات المعتمدة وشهادات معهد ITI ومهارة-تك' : 'Matching accredited ITI, MaharaTech and global course syllabi'}
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 text-center shadow-xs">
          <GraduationCap className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {isArabic ? 'لا توجد عناصر في هذا التصنيف' : 'No skills found in this filter'}
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-3 inline-flex items-center text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800"
          >
            {isArabic ? 'عرض جميع الوحدات' : 'View all modules'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item, idx) => {
            const id = item.id || `plan-${idx}`;
            const isDone = completedIds.includes(id);
            return (
              <div 
                key={id}
                className={`bg-white dark:bg-slate-800 rounded-2xl border p-5 shadow-xs transition flex flex-col justify-between ${
                  isDone 
                    ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/20 dark:bg-emerald-950/20' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => toggleCompleted(id)}
                        className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer shrink-0"
                        title={isDone ? (isArabic ? 'إلغاء التحديد' : 'Mark as incomplete') : (isArabic ? 'تحديد كمنجز' : 'Mark as completed')}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>
                      <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {item.skill}
                      </h3>
                    </div>
                    
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      item.priority === 'High' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
                      item.priority === 'Medium' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                      'bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {item.priority} {isArabic ? 'أولوية' : 'Priority'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 text-xs bg-slate-50 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        {item.resourceType}: {item.provider}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" />
                        ~{item.estimatedHours} {isArabic ? 'ساعة' : 'hours'}
                      </span>
                    </div>
                    <div className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                      {item.resourceName}
                    </div>
                  </div>
                </div>

                {/* Concrete Next Step */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-start gap-2 text-xs">
                  <div className="font-bold text-teal-800 dark:text-teal-300 shrink-0">
                    {t.actionStep || 'Action Step'}:
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {item.actionableStep}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
