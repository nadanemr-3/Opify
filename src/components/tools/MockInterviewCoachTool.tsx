import React, { useState } from 'react';
import { 
  Mic, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Award, 
  HelpCircle, 
  Play, 
  Square, 
  Send,
  ChevronRight,
  Lightbulb,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../../types';

interface MockInterviewCoachToolProps {
  language: Language;
}

interface InterviewQuestion {
  id: string;
  category: 'retail' | 'tech' | 'customer_ops' | 'behavioral';
  questionEn: string;
  questionAr: string;
  contextEn: string;
  contextAr: string;
  difficulty: 'Standard' | 'Challenging' | 'Executive';
  sampleAnswerEn: string;
  sampleAnswerAr: string;
  starTipEn: string;
  starTipAr: string;
}

const QUESTION_BANK: InterviewQuestion[] = [
  {
    id: 'q1',
    category: 'behavioral',
    questionEn: 'Tell me about a time you handled a difficult conflict with a coworker or manager under strict deadlines.',
    questionAr: 'احكِ لي عن موقف واجهت فيه خلافاً صعباً مع زميل أو مدير في العمل تحت ضغط تسليم عاجل، وكيف تعاملت معه؟',
    contextEn: 'Evaluates emotional intelligence, calm professionalism under Egyptian workplace pressures, and avoidance of drama.',
    contextAr: 'يقيس الذكاء العاطفي، والهدوء تحت ضغط بيئة العمل المصرية، والابتعاد عن الشكوى الشخصية وتفضيل مصلحة العمل.',
    difficulty: 'Standard',
    sampleAnswerEn: `Situation: During a Q4 product rollout at my previous firm, our design lead and I had a sharp disagreement on whether to delay the launch by a week for visual refinements.
Task: As the project coordinator, I had to ensure we met the client deadline without sacrificing brand credibility.
Action: Rather than arguing over chat, I invited him for a brief coffee break. I listened actively to his aesthetic concerns, then proposed a pragmatic compromise: launch the core functional modules on time, and push the second visual polish tier via an overnight patch 48 hours later.
Result: We hit the hard deadline with zero downtime, client satisfaction reached 95%, and our internal cross-functional trust was noticeably strengthened.`,
    sampleAnswerAr: `الموقف (Situation): خلال تسليم مشروع حيوي في الربع الرابع، اختلفنا أنا ومسؤول التصميم حول تأجيل التسليم أسبوعاً إضافياً لإجراء تعديلات شكلية.
المهمة (Task): بصفتي منسق المشروع، كان واجبي الالتزام بموعد العميل الصارم دون الإخلال بهوية الشركة وجودتها.
الإجراء (Action): بدلاً من الجدال عبر الرسائل، جلست معه لدقائق بهدوء. استمعت بتركيز لمخاوفه الفنية، واقترحت حلاً وسطاً عملياً: إطلاق النسخة الأساسية في موعدها دون تأخير، ثم إرسال التحديث البصري بعد 48 ساعة.
النتيجة (Result): التزمنا بالموعد بنسبة 100%، وحصلنا على إشادة من العميل، وكسبت زميلي كحليف دائم بدلاً من خلق صدام شخصي.`,
    starTipEn: 'Focus on listening, finding common ground, and concrete metrics. Never badmouth a former Egyptian colleague or boss.',
    starTipAr: 'ركز على مهارة الاستماع وحل النزاع بالأرقام والنتائج. إياك والحديث بسوء عن مدير أو زميل سابق أبداً.'
  },
  {
    id: 'q2',
    category: 'retail',
    questionEn: 'An angry customer enters your Cairo branch shouting that the smartphone they bought stopped charging after 3 days. How do you respond?',
    questionAr: 'دخل عميل غاضب فرعك في القاهرة يصرخ بأن الهاتف الذكي الذي اشتراه منذ 3 أيام توقف عن الشحن تماماً. كيف ستتصرف؟',
    contextEn: 'Tests consumer law knowledge in Egypt (Consumer Protection Agency standards), de-escalation, and branch service.',
    contextAr: 'يقيس مهارات امتصاص غضب العملاء، والالتزام بقانون حماية المستهلك المصري، وحماية سمعة الفرع.',
    difficulty: 'Standard',
    sampleAnswerEn: `Situation: In my previous retail role, an agitated customer demanded an instant cash refund in front of a crowded store.
Task: My priority was to de-escalate the public tension while following store warranty protocol.
Action: I immediately greeted him respectfully in polite Egyptian Arabic, invited him to a comfortable side desk with water to remove the audience, and inspected the charging port with him. Upon seeing a defective cable, I swapped it immediately from verified stock and tested charging on the spot.
Result: The issue was solved in 6 minutes, the customer apologized for shouting, and even purchased a protective screen protector before leaving satisfied.`,
    sampleAnswerAr: `الموقف: في عملي السابق بالتجزئة، حضر عميل منفعل جداً أمام باقي الزوار يطالب باسترداد فوري لثمن الهاتف.
المهمة: تهدئة العميل فوراً وحماية أجواء الفرع مع الالتزام بسياسة الضمان وحماية المستهلك.
الإجراء: استقبلته بابتسامة واحترام وبأسلوب مصري راقٍ: "حقك علينا يا فندم وطلبك على رأسنا، اتفضل استريح ونشرب مية ونتأكد فوراً". أخذته لمكتب جانبي هادئ، وفحصت الهاتف بحضوره واكتشفت أن كابل الشحن به عيب مصنعي، فاستبدلته له في الحال بكابل أصلي جديد وتأكدنا من الشحن.
النتيجة: حُلّت المشكلة خلال 6 دقائق، واعتذر العميل عن صوته العالي، بل واشترى إكسسوارات إضافية قبل مغادرته وهو راضٍ تماماً.`,
    starTipEn: 'Active de-escalation: Isolate the angry customer politely, show empathy, inspect immediately, and resolve on the spot.',
    starTipAr: 'الذكاء في امتصاص الغضب: عزل العميل بلباقة عن الزوار، تقديم مشروب، إظهار التعاطف، وتقديم حل فوري سريع.'
  },
  {
    id: 'q3',
    category: 'tech',
    questionEn: 'How do you handle a production incident when our main payment or ordering API starts failing during peak traffic hours?',
    questionAr: 'كيف تتصرف عندما يحدث عطل مفاجئ في بوابة الدفع أو الـ API الرئيسي للشركة أثناء ساعات الذروة والضغط الشديد؟',
    contextEn: 'Assesses systematic triage, monitoring (Sentry/Datadog), rollbacks, and stakeholder status communications.',
    contextAr: 'يقيس المنهجية الهندسية في تشخيص المشكلات، واستخدام السجلات، والرجوع للنسخة السابقة (Rollback) والتواصل مع الإدارة.',
    difficulty: 'Challenging',
    sampleAnswerEn: `Situation: During White Friday traffic surge, our checkout gateway latency spiked to 9 seconds with 504 errors on 18% of requests.
Task: As the on-call engineer, I needed to restore transaction flow immediately to protect revenue.
Action: I opened APM logs, identified that a recent deployment introduced an unindexed database query, alerted the Slack war room, and initiated a 1-click rollback within 4 minutes while switching non-critical queries to the read replica.
Result: Gateway response dropped back to 210ms, failure rate plummeted to 0.1%, and we salvaged an estimated 350,000 EGP in at-risk transactions that afternoon.`,
    sampleAnswerAr: `الموقف: خلال ذروة مبيعات الجمعة البيضاء، ارتفع زمن استجابة بوابة الدفع إلى 9 ثوانٍ مع ظهور أخطاء 504 بنسبة 18%.
المهمة: التدخل الفوري لإنقاذ عمليات الشراء ومنع تسرب العملاء والمال.
الإجراء: فتحت سجلات المراقبة (APM)، واكتشفت استعلام قاعدة بيانات غير مفهرس أُضيف في آخر تحديث. أبلغت غرفة الطوارئ فوراً، ونفذت استرجاعاً سريعاً للنسخة السابقة (Rollback) خلال 4 دقائق، مع تحويل القراءة إلى النسخة الاحتياطية (Read Replica).
النتيجة: عاد زمن الاستجابة إلى 210 مللي ثانية، وانخفضت نسبة الخطأ إلى 0.1%، وأنقذنا ما يقارب 350 ألف جنيه من المعاملات في ذلك اليوم.`,
    starTipEn: 'Highlight systematic diagnosis, swift rollback over live patching, and dollar/EGP business impact.',
    starTipAr: 'ركز على الهدوء وسرعة الـ Rollback بدلاً من التعديل الحي تحت الضغط، واذكر الأثر المالي الذي أنقذته.'
  },
  {
    id: 'q4',
    category: 'behavioral',
    questionEn: 'What are your salary expectations, considering current inflation and economic shifts in Egypt?',
    questionAr: 'ما هي توقعاتك للراتب في ضوء التضخم الحالي والظروف الاقتصادية في السوق المصري؟',
    contextEn: 'Tests commercial awareness, tactful negotiation, and anchoring without sounding greedy or desperate.',
    contextAr: 'يقيس الوعي التجاري، واللباقة في التفاوض، وتحديد نطاق عادل دون إفراط أو تفريط.',
    difficulty: 'Standard',
    sampleAnswerEn: `Based on my market research for this mid-level seniority in Cairo and considering my proven expertise in delivering measurable revenue gains, my expectation is in the range of 18,000 to 22,000 EGP net monthly. However, I value total compensation—including medical coverage, performance bonuses, and proximity to my residence—and I am very open to finding a mutually fair number for a company I want to grow with long term.`,
    sampleAnswerAr: `بناءً على أبحاثي لمعدلات الرواتب الحالية في السوق المصري لهذا المستوى من الخبرة، وبالنظر إلى الإنجازات والأرقام التي أستطيع تحقيقها للفريق، فإن النطاق المتوقع لصافي الراتب هو بين 18,000 إلى 22,000 جنيه شهرياً. وبالتأكيد، أنا أنظر إلى حزمة المزايا الشاملة مثل التأمين الطبي الممتاز، والمكافآت السنوية، وقرب مكان العمل، ومستعد للوصول لرقم عادل يحقق مصلحة الطرفين لمكان أطمح للاستمرار فيه لسنوات.`,
    starTipEn: 'State a well-researched range, mention total rewards (insurance, commute ease), and maintain flexibility.',
    starTipAr: 'حدد نطاقاً واقعياً بدلاً من رقم جامد، واذكر أهمية المزايا الشاملة وقرب العمل من السكن، وأظهر المرونة.'
  }
];

export const MockInterviewCoachTool: React.FC<MockInterviewCoachToolProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState<'all' | 'behavioral' | 'retail' | 'tech'>('all');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q1');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    situationScore: number;
    taskScore: number;
    actionScore: number;
    resultScore: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const currentQ = QUESTION_BANK.find((q) => q.id === selectedQuestionId) || QUESTION_BANK[0];

  const handleReadQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(isAr ? currentQ.questionAr : currentQ.questionEn);
      utterance.lang = isAr ? 'ar-EG' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);

    // Heuristic Evaluation Algorithm (instant, reliable, STAR compliant)
    setTimeout(() => {
      const words = userAnswer.trim().split(/\s+/).length;
      const lower = userAnswer.toLowerCase();

      // STAR keywords detection
      const hasNumbers = /\d+/.test(userAnswer);
      const hasAction = /organized|led|solved|contacted|reduced|increased|delivered|فحصت|اقترحت|قمت|طورت|حققت|استمعت/i.test(userAnswer);
      const hasResult = /result|percent|growth|satisfied|revenue|نجاح|نتيجة|أدى|وفرت|حققنا|راضي/i.test(userAnswer);

      let situation = Math.min(10, Math.max(5, Math.round(words > 20 ? 8 : 5)));
      let task = Math.min(10, Math.max(5, Math.round(words > 35 ? 9 : 6)));
      let action = hasAction ? 9 : 6;
      let result = hasNumbers || hasResult ? 9 : 5;

      const total = Math.min(100, Math.round(((situation + task + action + result) / 40) * 100));

      const strengths: string[] = [];
      const improvements: string[] = [];

      if (words >= 40) {
        strengths.push(isAr ? 'إجابة متكاملة ذات تفاصيل كافية دون إيجاز مخل' : 'Comprehensive context provided without being overly brief');
      } else {
        improvements.push(isAr ? 'الإجابة قصيرة بعض الشيء، أضف تفاصيل أكثر عن الموقف' : 'Answer is slightly short; elaborate on the context');
      }

      if (hasAction) {
        strengths.push(isAr ? 'استخدام أفعال مبادرة وإجراءات عملية واضحة' : 'Strong use of active ownership and action verbs');
      } else {
        improvements.push(isAr ? 'وضّح ماذا فعلت أنت تحديداً (أنا قمت بكذا) وليس ما فعله الفريق ككل' : 'Focus on your individual actions (I did X) rather than generic team actions');
      }

      if (hasNumbers || hasResult) {
        strengths.push(isAr ? 'ذكر نتائج كمية ملموسة تعزز المصداقية' : 'Mentioned tangible results or measurable metrics');
      } else {
        improvements.push(isAr ? 'اذكر أرقاماً تقريبية (مثل: خلال 10 دقائق، نسبة 15%، 20 عميل)' : 'Include estimated numbers or percentages to prove real impact');
      }

      setEvaluationResult({
        score: total,
        situationScore: situation,
        taskScore: task,
        actionScore: action,
        resultScore: result,
        feedback: total >= 80 
          ? (isAr ? 'إجابة ممتازة ومقنعة جداً تتبع أسلوب STAR وتظهر نضجاً مهنياً واحترافية عالية!' : 'Excellent, well-structured answer following the STAR methodology with strong maturity.')
          : (isAr ? 'إجابة مقبولة، لكنها تحتاج لتعزيز الأرقام والتركيز على أثرك الفردي لتفوز بالوظيفة.' : 'Promising start, but needs more concrete metrics and individual ownership.'),
        strengths,
        improvements
      });

      setIsEvaluating(false);
    }, 600);
  };

  const handleUseModelAnswer = () => {
    setUserAnswer(isAr ? currentQ.sampleAnswerAr : currentQ.sampleAnswerEn);
  };

  const filteredQuestions = QUESTION_BANK.filter((q) => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>{isAr ? 'مدرب المقابلات بأسلوب STAR الذكي' : 'STAR Method AI Interview Coach'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isAr ? 'تدرّب على أسئلة المقابلات الحقيقية في مصر' : 'Practice Egyptian Industry Interview Scenarios'}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {isAr 
              ? 'تغلب على رهبة المقابلات! تدرّب على أصعب الأسئلة السلوكية والتقنية ومواقف الزبائن، واحصل على تقييم فوري لإجابتك ونموذج ذهبي للإجابة.'
              : 'Overcome interview anxiety. Practice tough behavioral, customer, tech, and salary questions. Get instant scoring on Situation, Task, Action, Result.'}
          </p>
        </div>
      </div>

      {/* Track Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {isAr ? 'المجال:' : 'Category:'}
        </span>
        {[
          { id: 'all', label: isAr ? 'جميع الأسئلة' : 'All Tracks' },
          { id: 'behavioral', label: isAr ? 'أسئلة سلوكية وتفاوض' : 'Behavioral & Salary' },
          { id: 'retail', label: isAr ? 'مبيعات وتجزئة' : 'Retail & Store Ops' },
          { id: 'tech', label: isAr ? 'برمجيات وتقنية' : 'Software Tech' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id as any)}
            className={`text-xs px-3 py-1.5 rounded-xl border transition cursor-pointer font-semibold ${
              activeCategory === c.id
                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Question Selector Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredQuestions.map((q, idx) => {
          const isSelected = q.id === selectedQuestionId;
          return (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuestionId(q.id);
                setEvaluationResult(null);
                setUserAnswer('');
              }}
              className={`p-3 rounded-xl border text-left ltr:text-left rtl:text-right transition cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'border-emerald-500 bg-white dark:bg-slate-900 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{isAr ? `سؤال #${idx + 1}` : `Question #${idx + 1}`}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                    {q.difficulty}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2">
                  {isAr ? q.questionAr : q.questionEn}
                </p>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span>{isAr ? 'اختر السؤال' : 'Practice this'}</span>
                <ChevronRight className="w-3 h-3 rtl:rotate-180" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Practice Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Active Question & Input (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            
            {/* Active Question Prompt */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'سؤال المقابلة الموجه لك:' : 'Interview Prompt:'}</span>
                </span>
                <button
                  onClick={handleReadQuestion}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  title={isAr ? 'استمع للسؤال صوتياً' : 'Listen to question'}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                "{isAr ? currentQ.questionAr : currentQ.questionEn}"
              </h3>

              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700/60 pt-2">
                <strong>{isAr ? 'ما يختبره هذا السؤال:' : 'What Interviewers Look For:'}</strong>{' '}
                {isAr ? currentQ.contextAr : currentQ.contextEn}
              </div>
            </div>

            {/* Answer Input Area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="user-interview-answer" className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isAr ? 'اكتب أو درّب إجابتك هنا:' : 'Type or practice your response:'}</span>
                </label>
                <button
                  onClick={handleUseModelAnswer}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  {isAr ? 'استعن بنموذج الإجابة المثالية' : 'Load Model STAR Answer'}
                </button>
              </div>

              <textarea
                id="user-interview-answer"
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={isAr 
                  ? 'ابدأ بذكر الموقف، ثم المهمة المطلوبة منك، ثم الإجراء الذي قمت به أنت شخصياً، ثم النتيجة الإيجابية بالأرقام...'
                  : 'Structure your answer: Situation (context), Task (your goal), Action (what you did), Result (metrics & outcome)...'}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed focus:bg-white dark:focus:bg-slate-900 transition"
              />

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>{userAnswer.trim().split(/\s+/).filter(Boolean).length} {isAr ? 'كلمة' : 'words'}</span>
                <span className="text-[11px] text-slate-500">{isAr ? 'يُفضل بين 50 إلى 150 كلمة' : 'Target: 50-150 words'}</span>
              </div>
            </div>

            {/* Evaluate Button */}
            <button
              onClick={handleEvaluateAnswer}
              disabled={!userAnswer.trim() || isEvaluating}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isAr ? 'جاري تقييم الإجابة وفق أسلوب STAR...' : 'Analyzing STAR compliance...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'قيّم إجابتي الآن واحصل على الملاحظات' : 'Evaluate My Answer & Score'}</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right: Feedback & STAR Scorecard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {evaluationResult ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500/30 p-6 shadow-md space-y-5">
              
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isAr ? 'تقييم قوة الإجابة' : 'Overall Answer Score'}
                  </div>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {evaluationResult.score} <span className="text-base font-bold text-slate-400">/ 100</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                  <Award className="w-7 h-7" />
                </div>
              </div>

              {/* STAR Quadrants */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'تفصيل عناصر أسلوب STAR:' : 'STAR Breakdown:'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500">{isAr ? 'الموقف (Situation)' : 'Situation'}</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{evaluationResult.situationScore} / 10</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500">{isAr ? 'المهمة (Task)' : 'Task'}</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{evaluationResult.taskScore} / 10</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500">{isAr ? 'الإجراء (Action)' : 'Action'}</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{evaluationResult.actionScore} / 10</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500">{isAr ? 'النتيجة (Result)' : 'Result'}</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{evaluationResult.resultScore} / 10</div>
                  </div>
                </div>
              </div>

              {/* Feedback Summary */}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                {evaluationResult.feedback}
              </p>

              {/* Strengths & Improvements */}
              <div className="space-y-3 text-xs">
                {evaluationResult.strengths.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نقاط القوة في إجابتك:' : 'What Worked Well:'}</span>
                    </div>
                    {evaluationResult.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400 pl-2">
                        <span className="text-emerald-500">•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                )}

                {evaluationResult.improvements.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نصائح لرفع نتيجتك:' : 'Key Suggestions to Level Up:'}</span>
                    </div>
                    {evaluationResult.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400 pl-2">
                        <span className="text-amber-500">•</span>
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Model Answer Reference Card */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'النموذج الذهبي للإجابة (STAR):' : 'Gold Standard Model Answer:'}</span>
              </div>

              <div 
                dir={isAr ? 'rtl' : 'ltr'}
                className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap"
              >
                {isAr ? currentQ.sampleAnswerAr : currentQ.sampleAnswerEn}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                <strong>{isAr ? 'نصيحة ذهبية:' : 'Pro Coach Tip:'}</strong>{' '}
                {isAr ? currentQ.starTipAr : currentQ.starTipEn}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
