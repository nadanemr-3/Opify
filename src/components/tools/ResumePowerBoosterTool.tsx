import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Zap, 
  FileText, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Lightbulb 
} from 'lucide-react';
import { Language } from '../../types';

interface ResumePowerBoosterToolProps {
  language: Language;
}

export const ResumePowerBoosterTool: React.FC<ResumePowerBoosterToolProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [inputBullet, setInputBullet] = useState<string>(
    isAr 
      ? 'كنت مسؤولاً عن مساعدة الزبائن وبيع المنتجات في المحل ومتابعة الحسابات.'
      : 'Responsible for assisting store customers, selling products, and handling daily cash registers.'
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeVerbCategory, setActiveVerbCategory] = useState<'leadership' | 'revenue' | 'technical' | 'operations'>('revenue');

  // Action Verbs Library
  const ACTION_VERBS = {
    revenue: [
      { en: 'Accelerated', ar: 'سرّع / ضاعف' },
      { en: 'Maximized', ar: 'عظّم / رفع' },
      { en: 'Captured', ar: 'استقطب / حصد' },
      { en: 'Negotiated', ar: 'فاوض / أبرم' },
      { en: 'Generated', ar: 'ولّد / حقق' },
      { en: 'Outperformed', ar: 'تفوّق على' },
    ],
    leadership: [
      { en: 'Spearheaded', ar: 'قاد / أطلق' },
      { en: 'Orchestrated', ar: 'وجّه / نسّق' },
      { en: 'Mentored', ar: 'درّب / أرشد' },
      { en: 'Championed', ar: 'تبنّى / دعم' },
      { en: 'Mobilized', ar: 'حفّز / نظّم' },
      { en: 'Pioneered', ar: 'ابتكر / أسس' },
    ],
    technical: [
      { en: 'Architected', ar: 'صمم هندسياً' },
      { en: 'Engineered', ar: 'طوّر / شيّد' },
      { en: 'Automated', ar: 'أتمت / قلّص يدوياً' },
      { en: 'Refactored', ar: 'أعاد بناء / حسّن' },
      { en: 'Deployed', ar: 'نشر / أطلق' },
      { en: 'Diagnosed', ar: 'شخّص / حلّل' },
    ],
    operations: [
      { en: 'Streamlined', ar: 'بسّط / قلّص زمن' },
      { en: 'Eliminated', ar: 'قضى على / أزال' },
      { en: 'Standardized', ar: 'وحّد المعايير' },
      { en: 'Restructured', ar: 'أعاد هيكلة' },
      { en: 'Resolved', ar: 'حلّ / عالج' },
      { en: 'Audited', ar: 'دقّق / راجع' },
    ]
  };

  // Transformed XYZ formula bullets
  const boostedBullets = React.useMemo(() => {
    if (isAr) {
      return [
        {
          style: 'التركيز على الأرقام والإيرادات (Revenue & Metrics)',
          bullet: 'عظّم مبيعات الفرع بنسبة 22% عبر تقديم استشارات شرائية مخصصة لأكثر من 45 عميلاً يومياً، مع تجاوز الهدف الشهري المحدد بنجاح.',
          formula: 'النتيجة (22%) + المقياس (45 عميلاً) + الإجراء الفعلي'
        },
        {
          style: 'التركيز على القيادة والمبادرة (Leadership & Ownership)',
          bullet: 'قاد عمليات خدمة العملاء ونقطة البيع (POS)، وتولى تدريب 3 زملاء جدد على تقنيات الإقناع والبيع المتقاطع (Cross-selling).',
          formula: 'فعل قيادي قوي + توجيه الفريق + أثر نوعي'
        },
        {
          style: 'التركيز على الكفاءة التشغيلية (Speed & Operations)',
          bullet: 'بسّط زمن إتمام المعاملات النقدية عند الكاشير بمعدل 3.5 دقيقة لكل عميل، مما خفض طوابير الانتظار في أوقات الذروة بنسبة 30%.',
          formula: 'تقليص وقت + قياس رقمي دقيق + حل مشكلة ملموسة'
        }
      ];
    } else {
      return [
        {
          style: 'Metric & Revenue Focused (Google XYZ Formula)',
          bullet: 'Maximized branch sales revenue by 22% by delivering tailored consultative guidance to 45+ daily shoppers, consistently exceeding monthly targets.',
          formula: 'Accomplished [X: 22% boost] measured by [Y: 45+ shoppers] by doing [Z: consultative sales]'
        },
        {
          style: 'Leadership & High-Ownership Angle',
          bullet: 'Spearheaded front-of-house retail operations and POS workflows, directly mentoring 3 junior associates on consultative cross-selling techniques.',
          formula: 'Strong active verb + Team enablement + Skill domain'
        },
        {
          style: 'Operational Efficiency & Speed Angle',
          bullet: 'Streamlined checkout processing speed by 3.5 minutes per transaction, reducing peak-hour customer wait queues by 30%.',
          formula: 'Time saved + Concrete metric + Operational gain'
        }
      ];
    }
  }, [isAr, inputBullet]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleInsertVerb = (verb: string) => {
    setInputBullet(prev => `${verb} ${prev.replace(/^(responsible for|كنت مسؤولا عن|كنت أعمل على)\s*/i, '')}`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{isAr ? 'معادلة جوجل وهارفارد للسيرة الذاتية XYZ' : 'Harvard & Google XYZ Bullet Formula'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isAr ? 'حوّل جمل سيرتك الذاتية إلى إنجازات رقمية قوية' : 'Transform Weak Resume Bullets into Impact Gold'}
          </h2>
          <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
            {isAr 
              ? 'تخلص من العبارات السلبية مثل "كنت مسؤولاً عن"! أعد صياغة كل جملة لتوضح: ماذا أنجزت؟ وما هو المقياس الرقمي؟ وماذا فعلت بالتحديد؟'
              : 'Ban passive phrases like "Responsible for". Upgrade every bullet point into a quantifiable accomplishment that grabs Egyptian and global recruiters immediately.'}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input and Verb Bank (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Input Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="raw-bullet-input" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isAr ? 'الجملة الحالية في سيرتك الذاتية:' : 'Current Weak Resume Bullet:'}
              </label>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>{isAr ? 'إعادة صياغة فورية' : 'Live Enhancer'}</span>
              </span>
            </div>

            <textarea
              id="raw-bullet-input"
              rows={4}
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed focus:bg-white dark:focus:bg-slate-900 transition"
              placeholder={isAr ? 'اكتب أو الصق أي جملة من سيرتك الذاتية هنا...' : 'Paste any bullet point from your CV here...'}
            />

            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'نصيحة: تجنب كتابة مهامك اليومية، واكتب ما أحدثته في المكان من فارق وتطور.'
                : 'Tip: Recruiters care about outcomes and scale, not your routine job description.'}
            </div>
          </div>

          {/* Action Verbs Bank */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'بنك الأفعال القوية المحفزة' : 'Action Verb Power Bank'}</span>
              </span>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold">
              {[
                { id: 'revenue', label: isAr ? 'أرباح' : 'Revenue' },
                { id: 'leadership', label: isAr ? 'قيادة' : 'Lead' },
                { id: 'technical', label: isAr ? 'تقنية' : 'Tech' },
                { id: 'operations', label: isAr ? 'عمليات' : 'Ops' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveVerbCategory(cat.id as any)}
                  className={`py-1.5 px-2 rounded-lg border text-center transition cursor-pointer ${
                    activeVerbCategory === cat.id
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Verb Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ACTION_VERBS[activeVerbCategory].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleInsertVerb(isAr ? item.ar.split('/')[0].trim() : item.en)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-700 dark:hover:text-amber-300 text-xs text-slate-700 dark:text-slate-300 transition cursor-pointer flex items-center gap-1 font-medium border border-transparent hover:border-amber-300 dark:hover:border-amber-800"
                  title={isAr ? 'انقر لإدراج الفعل' : 'Click to use verb'}
                >
                  <span>{item.en}</span>
                  <span className="text-[10px] text-slate-400">({item.ar})</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: 3 Enhanced XYZ Bullet Options (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? '3 صيغ معززة تبرز احترافيتك بالأرقام:' : '3 High-Impact XYZ Transformations:'}</span>
            </h3>
          </div>

          <div className="space-y-4">
            {boostedBullets.map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-blue-400/50 dark:hover:border-blue-500/50 transition space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {item.style}
                  </span>
                  <button
                    onClick={() => handleCopy(item.bullet, index)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === index ? (isAr ? 'تم النسخ' : 'Copied!') : (isAr ? 'نسخ الجملة' : 'Copy')}</span>
                  </button>
                </div>

                <p 
                  dir={isAr ? 'rtl' : 'ltr'}
                  className="text-xs sm:text-sm text-slate-900 dark:text-white font-medium leading-relaxed"
                >
                  • {item.bullet}
                </p>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800/80">
                  <strong className="text-slate-700 dark:text-slate-300">{isAr ? 'المعادلة المستخدمة:' : 'Formula Breakdown:'}</strong> {item.formula}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
