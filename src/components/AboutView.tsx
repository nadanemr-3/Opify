import React, { useState } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Sparkles, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake, 
  Target, 
  TrendingUp, 
  ChevronDown, 
  MessageSquare, 
  Building2, 
  Zap,
  Globe2,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../types';
import { Button } from './ui/Button';
import { OpifyLogo } from './OpifyLogo';

interface AboutViewProps {
  language: Language;
  onNavigate: (tabId: string, params?: any) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ language, onNavigate }) => {
  const isAr = language === 'ar';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = [
    {
      num: '18,500+',
      label: isAr ? 'كادر ومهني تم توظيفهم' : 'Professionals Matched',
      sub: isAr ? 'عبر القاهرة والمدن الجديدة' : 'Across Greater Cairo & Tech Hubs'
    },
    {
      num: '480+',
      label: isAr ? 'شركة مصرية موثقة بسجل تجاري' : 'Verified Registered Employers',
      sub: isAr ? 'فحص ميداني وتدقيق للمقر الحقيقي' : '100% Audited Commercial Registry'
    },
    {
      num: '35 دقيقة',
      numEn: '35 Mins',
      label: isAr ? 'متوسط الوقت المُوفر يومياً' : 'Avg. Daily Commute Saved',
      sub: isAr ? 'بفضل رادار الوظائف القريبة والمواصلات' : 'Via Hyperlocal & Transit Radar'
    },
    {
      num: '94%',
      label: isAr ? 'نسبة اجتياز فحص أنظمة ATS' : 'ATS Resume Screening Pass Rate',
      sub: isAr ? 'بأدوات التحسين وصياغة الإنجازات' : 'With AI-guided Keyword Alignment'
    }
  ];

  const corePillars = [
    {
      icon: MapPin,
      title: isAr ? 'رادار الوظائف القريبة والمواصلات' : 'Hyperlocal Geospatial Radar',
      desc: isAr 
        ? 'نوفر خريطة ذكية تحسب المسافة بالكيلومترات وخطوط المترو والمواصلات الحقيقية في القاهرة والجيزة لتجنب استنزاف ساعات يومية في الزحام.' 
        : 'Smart radius filtering matching you to opportunities within 2km, 5km, or your daily metro commute corridor, saving 15+ hours of Cairo traffic weekly.'
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'درع الأمان ومكافحة الإعلانات الوهمية' : 'Zero-Scam Verification Matrix',
      desc: isAr 
        ? 'كل شركة على أوبيفاي تمر بفحص مقر وسجل تجاري دقيق. نمنع أي جهة تطلب رسوم مقابلة أو تدريب ونحظرها فوراً.' 
        : 'Zero tolerance for fake jobs or advance fees. Every employer undergoes tax ID, physical workplace, and domain verification.'
    },
    {
      icon: Sparkles,
      title: isAr ? 'مساعد الذكاء الاصطناعي الصادق' : 'Truth-Preserving AI Copilot',
      desc: isAr 
        ? 'أدوات ذكية تحلل الوصف الوظيفي، وتكشف الشروط غير المنطقية، وتساعدك على صياغة إنجازاتك الحقيقية بدقة دون تزييف مهارات غير موجودة.' 
        : 'Honest, reality-grounded AI tools that decode confusing requirements, estimate fair market pay, and power ATS-friendly resume formatting.'
    },
    {
      icon: TrendingUp,
      title: isAr ? 'شفافية الرواتب والقيمة الصافية' : 'Net Salary & Commute Clarity',
      desc: isAr 
        ? 'حساب صافي الدخل بعد التأمينات وضرائب 2024 وخصم تكلفة المواصلات، لمعرفة القيمة الحقيقية لكل ساعة عمل قبل اتخاذ القرار.' 
        : 'Transparent compensation insights calculating real take-home pay after 2024 Egyptian taxes and monthly transit deductions.'
    }
  ];

  const values = [
    {
      icon: HeartHandshake,
      title: isAr ? 'احترام وقت الإنسان' : 'Human Time as Priority',
      desc: isAr 
        ? 'لا يجب أن يقضي الموظف ٣ ساعات يومياً في المواصلات ليحصل على لقمة عيشه؛ القرب الجغرافي حق مهني يعزز جودة الحياة.' 
        : 'No professional should forfeit 3 hours daily to transit. Commute proximity directly impacts physical health and career longevity.'
    },
    {
      icon: FileCheck,
      title: isAr ? 'النزاهة والصدق المهني' : 'Radical Transparency',
      desc: isAr 
        ? 'نعرض الرواتب المتوقعة، ونسب التوافق الحقيقية، والمهارات الناقصة دون وعود واهية أو مبالغات تسويقية.' 
        : 'We display realistic compensation brackets, verified workplace conditions, and actionable skill gaps with zero marketing fluff.'
    },
    {
      icon: ShieldAlert,
      title: isAr ? 'الحماية المطلقة للمتقدمين' : 'Candidate Dignity First',
      desc: isAr 
        ? 'المنصة مجانية بالكامل للباحثين عن عمل، ولا يتم بيع أو مشاركة بياناتك أو سيرتك الذاتية مع أي طرف دون موافقتك الصريحة.' 
        : 'Completely free for job seekers. Resumes and phone numbers are never bartered or exposed without your explicit consent.'
    },
    {
      icon: Target,
      title: isAr ? 'حلول واقعية لسوق العمل المصري' : 'Built for Egypt & MENA',
      desc: isAr 
        ? 'نظامنا مصمم خصيصاً ليراعي طبيعة المواصلات، والضرائب، وثقافة المقابلات في القاهرة والإسكندرية والمدن الجديدة.' 
        : 'Custom engineered for Egyptian tax brackets, regional metro lines, local currency values, and MENA interview practices.'
    }
  ];

  const faqs = [
    {
      q: isAr ? 'ما الذي يجعل أوبيفاي مختلفة عن منصات التوظيف الأخرى مثل وظف أو لينكد إن؟' : 'How does Opify differ from traditional job boards like Wuzzuf or LinkedIn?',
      a: isAr 
        ? 'المنصات التقليدية تركز فقط على عنوان الوظيفة وتتجاهل موقع العمل وساعات المواصلات المرهقة في القاهرة. أوبيفاي تركز على عامل "القرب المكاني والمواصلات"، وتقدم حساباً لصافي الراتب الحقيقي بعد خصم تكلفة التنقل، مع فحص صارم يمنع الشركات الوهمية التي تطلب أي مبالغ مالية مسبقة، بالإضافة لمجموعة أدوات ذكاء اصطناعي شاملة للمقابلات وصياغة السيرة الذاتية.' 
        : 'Traditional job portals treat location as an afterthought. Opify is built around hyperlocal proximity, calculating your real commute time and transit expenses to find jobs that won\'t exhaust your daily life. Additionally, we enforce rigorous anti-scam audits and provide complete AI-driven ATS resume optimization tailored for Egypt.'
    },
    {
      q: isAr ? 'كيف يتم التحقق من مصداقية الشركات المعروضة ومنع الوظائف الوهمية؟' : 'How does Opify verify employers and protect candidates from fake job postings?',
      a: isAr 
        ? 'كل وظيفة منشورة تخضع لتدقيق آلي وبشري: نتحقق من السجل التجاري للشركة، والمقر الفعلي في مصر، والهاتف الأرضي المعتمد، والبريد الرسمي. نطبق سياسة "صفر تسامح" مع أي شركة تطلب رسوم مقابلة أو استمارة، ويتم حظرها وإدراجها في القائمة السوداء فوراً.' 
        : 'We require valid commercial registrations, verified physical corporate addresses, domain emails, and landline contacts. Any employer requesting interview fees or deposits is immediately banned and reported.'
    },
    {
      q: isAr ? 'هل خدمات أوبيفاي مجانية للمتقدمين والباحثين عن عمل؟' : 'Is Opify completely free for job seekers?',
      a: isAr 
        ? 'نعم، التقديم على الوظائف، ورادار الخرائط، وتتبع الطلبات، واستخدام الأدوات الأساسية مجاني تماماً بنسبة 100% للباحثين عن عمل داخل مصر. لا توجد أي رسوم خفية أو اقتطاع من الراتب.' 
        : 'Yes, searching for jobs, exploring commute radars, tracking applications, and core AI career tools are 100% free for candidates.'
    },
    {
      q: isAr ? 'أين يقع مقر أوبيفاي وكيف يمكنني التواصل مع الفريق؟' : 'Where is Opify located and how can I reach out?',
      a: isAr 
        ? 'مقرنا الرئيسي في القاهرة (الجريك كامبس - وسط البلد ومجمع التكنولوجيا بالقاهرة الجديدة). يمكنك التواصل مع فريق الدعم الفني وشراكات التوظيف عبر صفحة "اتصل بنا" أو البريد الإلكتروني support@opify.careers.' 
        : 'Our headquarters are located at The Greek Campus, Downtown Cairo, with a secondary tech hub in New Cairo. You can contact us via our Contact Us page or at support@opify.careers.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-blue-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
            <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{isAr ? 'عن منصة أوبيفاي التوظيفية' : 'About Opify Career Platform'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            {isAr ? (
              <>
                مسارك المهني، <span className="text-blue-600 dark:text-blue-400">أقرب إليك</span> مما تتخيل وأكثر أماناً
              </>
            ) : (
              <>
                Making Career Opportunities <span className="text-blue-600 dark:text-blue-400">Closer, Safer</span>, and Smarter
              </>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isAr 
              ? 'انطلقت أوبيفاي من القاهرة بهدف محدد: وضع حد لمعاناة المواصلات اليومية المرهقة والاحتيال الوظيفي، وتزويد الكفاءات المصرية بمنظومة ذكاء اصطناعي تجمع بين الموقع الجغرافي الدقيق وتوافق أنظمة ATS لحياة مهنية متوازنة.'
              : 'Born in Cairo to solve two urgent challenges: crushing 3-hour daily commutes and fraudulent recruitment traps. Opify unites geospatial commute mapping with AI-driven ATS resume intelligence for modern professionals.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              id="about-hero-find-jobs-btn"
              variant="primary"
              size="md"
              onClick={() => onNavigate('jobs')}
              className="px-6 py-2.5 font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>{isAr ? 'استكشف الوظائف القريبة' : 'Explore Nearby Jobs'}</span>
              <ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />
            </Button>
            <Button
              id="about-hero-contact-btn"
              variant="secondary"
              size="md"
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isAr ? 'تواصل مع فريقنا' : 'Contact Our Team'}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight">
                  {isAr ? s.num : (s.numEn || s.num)}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {s.label}
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Story: Why We Built Opify */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>{isAr ? 'قصة البداية والواقع المصري' : 'The Origin & The Cairo Reality'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {isAr 
                ? 'لماذا يدفع الموظف نصف يومه وثلث راتبه في الطريق؟' 
                : 'Why Should Anyone Sacrifice 3 Hours Daily Just to Reach Work?'}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'في القاهرة الكبرى، يستيقظ مئات الآلاف كل صباح ليقضوا ساعات طويلة في التنقل بين المعادي ومدينة نصر، أو التجمع السادس من أكتوبر. هذا الإرهاق اليومي لا يستنزف الطاقة الجسدية فقط، بل يلتهم نسبة كبيرة من الدخل الشهري في المواصلات والبنزين.'
                : 'Across Greater Cairo, countless skilled professionals face gruelling commutes between October, New Cairo, Nasr City, and Maadi. This daily transit drain erodes mental wellbeing, family time, and eats up a huge percentage of monthly salaries.'}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'في نفس الوقت، يواجه الشباب سيلاً من الإعلانات الوهمية التي تطلب "رسوم مقابلات" أو "تأمينات عمل"، بينما تقف أنظمة ATS التقليدية سداً منيعاً أمام الكفاءات الحقيقية. لهذا السبب قمنا ببناء أوبيفاي: لتكون منصة ذكية تضع الكرامة والوقت والشفافية في المقام الأول.'
                : 'Simultaneously, job seekers face a barrage of predatory fake postings demanding "interview fees", while rigid screening bots silently drop qualified CVs. Opify was architected to restore sanity, transparency, and dignity to the Egyptian hiring ecosystem.'}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{isAr ? 'فريق هندسي محلي مقرّه القاهرة ويعايش التحديات يومياً' : 'Engineered locally in Cairo by teams who lived this journey'}</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-xl border border-slate-700/60 relative overflow-hidden">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <OpifyLogo size="md" theme="dark" />
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold text-sm">
                      {isAr ? 'مطابقة المسافة أولاً' : 'Commute-First Matching'}
                    </strong>
                    <span className="text-slate-400 text-xs">
                      {isAr ? 'خوارزميات تحسب المسافة بالكيلومتر وخطوط المترو ومواصلات النقل العام.' : 'Calculates exact transit corridors, metro lines, and true travel costs.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold text-sm">
                      {isAr ? 'فحص شامل للشركات والسجل التجاري' : 'Rigorous Employer Auditing'}
                    </strong>
                    <span className="text-slate-400 text-xs">
                      {isAr ? 'لا نقبل أي إعلان بدون تحقق من المقر الحقيقي والسجل التجاري ورقم الهاتف.' : 'Zero anonymous companies. Verified physical addresses and verified contacts.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold text-sm">
                      {isAr ? 'حساب الراتب الصافي بعد الضرائب والمواصلات' : 'True Net Pay Transparency'}
                    </strong>
                    <span className="text-slate-400 text-xs">
                      {isAr ? 'حاسبة مدمجة توضح ما سيتبقى في جيبك فعلياً بعد الضرائب والمواصلات.' : 'Reveals what actually stays in your wallet after taxes and transportation.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isAr ? 'ركائز منظومة أوبيفاي' : 'The Four Pillars of Opify'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {isAr ? 'تصميم متكامل يخدم الباحثين عن عمل وأصحاب الشركات بنزاهة واحترافية' : 'Engineered to empower job seekers and verified employers with precision'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Values & Commitments */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{isAr ? 'مبادئنا الثابتة' : 'Our Guiding Principles'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {isAr ? 'المعايير التي نلتزم بها أمام مجتمعنا' : 'The Values We Stand By'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isAr ? 'الأسئلة الشائعة حول أوبيفاي' : 'Frequently Asked Questions'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isAr ? 'كل ما تحتاج لمعرفته عن أمان المنصة وطريقة عملها' : 'Everything you need to know about our verification, features, and platform'}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left ltr:text-left rtl:text-right p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isAr ? 'هل أنت مستعد لبدء خطوتك المهنية القادمة بالقرب منك؟' : 'Ready to Discover Opportunities Closer to Home?'}
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              {isAr 
                ? 'انضم إلى آلاف الكفاءات التي تستخدم أوبيفاي يومياً لاستكشاف الوظائف القريبة وتجهيز سير ذاتية لا يمكن لأنظمة الفرز رفضها.' 
                : 'Join thousands of ambitious professionals discovering high-paying, verified opportunities matched to their commute radius.'}
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => onNavigate('jobs')}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold border-0 shadow-md"
              >
                <span>{isAr ? 'تصفح الوظائف الآن' : 'Browse Jobs Now'}</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('contact')}
                className="border-white text-white hover:bg-white/10 font-semibold"
              >
                <span>{isAr ? 'اتصل بفريق الدعم' : 'Contact Support'}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
