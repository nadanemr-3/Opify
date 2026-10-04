import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Building2, 
  User, 
  Gift, 
  X, 
  CheckCircle2, 
  Smartphone, 
  Receipt, 
  Percent, 
  Info, 
  Clock, 
  Award,
  Lock,
  Sliders,
  TrendingUp,
  MapPin,
  FileText,
  Bot,
  Kanban
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../i18n/translations';

interface PricingViewProps {
  language: Language;
  currentUser?: UserProfile | null;
  onSelectPlan: (plan: 'free' | 'premium' | 'booster' | 'employer_starter' | 'employer_growth' | 'employer_enterprise') => void;
  onNavigate?: (tab: string) => void;
}

type AudienceTab = 'seekers' | 'employers';
type Currency = 'EGP' | 'USD';
type PaymentMethod = 'card' | 'wallet' | 'fawry';

interface CheckoutState {
  planId: 'free' | 'premium' | 'booster' | 'employer_starter' | 'employer_growth' | 'employer_enterprise';
  planNameEn: string;
  planNameAr: string;
  priceEgp: number;
  priceUsd: number;
  billingPeriod: 'monthly' | 'annual' | 'once';
}

export const PricingView: React.FC<PricingViewProps> = ({ 
  language, 
  currentUser, 
  onSelectPlan, 
  onNavigate 
}) => {
  const t = translations[language];

  // Primary State
  const [audience, setAudience] = useState<AudienceTab>('seekers');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<Currency>('EGP');

  // ROI Calculator State
  const [roiSalary, setRoiSalary] = useState<number>(30000);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Checkout Modal State
  const [checkoutData, setCheckoutData] = useState<CheckoutState | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Form mock values
  const [cardNumber, setCardNumber] = useState('4123 •••• •••• 8821');
  const [walletPhone, setWalletPhone] = useState('01012345678');

  // Currency conversion rate: ~48 EGP per 1 USD
  const EGP_PER_USD = 48;

  const formatPrice = (egpAmount: number) => {
    if (egpAmount === 0) {
      return language === 'ar' ? '٠ ج.م' : '0 EGP';
    }
    if (currency === 'USD') {
      const usd = (egpAmount / EGP_PER_USD).toFixed(1);
      return `$${usd}`;
    }
    return language === 'ar' ? `${egpAmount.toLocaleString()} ج.م` : `${egpAmount.toLocaleString()} EGP`;
  };

  // Open Checkout
  const handleOpenCheckout = (planId: CheckoutState['planId'], nameEn: string, nameAr: string, monthlyEgp: number, annualEgp: number) => {
    if (planId === 'free') {
      onSelectPlan('free');
      return;
    }

    const price = billingCycle === 'annual' ? annualEgp : monthlyEgp;
    setCheckoutData({
      planId,
      planNameEn: nameEn,
      planNameAr: nameAr,
      priceEgp: price,
      priceUsd: +(price / EGP_PER_USD).toFixed(1),
      billingPeriod: billingCycle
    });
    setPromoCode('');
    setPromoDiscount(0);
    setPromoMessage(null);
    setPaymentSuccess(false);
  };

  // Apply Coupon
  const handleApplyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'OPIFY20') {
      setPromoDiscount(0.2); // 20% off
      setPromoMessage(language === 'ar' ? 'تم تطبيق كود الخصم! وفّرت ٢٠٪ إضافية.' : 'Promo code applied! 20% discount added.');
    } else if (clean === 'EGYPT2026') {
      setPromoDiscount(0.25); // 25% off
      setPromoMessage(language === 'ar' ? 'كود خصم الترحيب فعال! وفّرت ٢٥٪.' : 'Welcome Egypt code active! 25% discount applied.');
    } else if (clean === 'FREEMONTH') {
      setPromoDiscount(1.0); // 100% off
      setPromoMessage(language === 'ar' ? 'عرض الشهر المجاني مُفعل بنجاح!' : 'Free trial month activated!');
    } else {
      setPromoDiscount(0);
      setPromoMessage(language === 'ar' ? 'كود الخصم غير صالح أو منتهي الصلاحية.' : 'Invalid or expired promo code.');
    }
  };

  // Complete Payment
  const handleCompletePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      if (checkoutData) {
        onSelectPlan(checkoutData.planId);
      }
    }, 1200);
  };

  // ROI Math
  const estimatedNegotiationGain = Math.round(roiSalary * 0.12);
  const proMonthlyCost = 119;
  const roiMultiplier = Math.max(1, Math.round((estimatedNegotiationGain) / proMonthlyCost));

  // FAQ Items
  const faqItems = [
    {
      qEn: 'Can I cancel my subscription anytime?',
      qAr: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
      aEn: 'Yes, absolutely. There are zero long-term commitments or lock-ins. You can cancel with a single click in your settings at any moment, and your premium features will remain active until the end of your billing cycle.',
      aAr: 'نعم بكل تأكيد. لا توجد أي التزامات طويلة الأجل. يمكنك إلغاء التجديد التلقائي بضغطة زر واحدة من إعدادات حسابك في أي وقت، وستظل ميزات باقتك نشطة حتى نهاية الفترة المدفوعة.'
    },
    {
      qEn: 'How can I pay using Vodafone Cash, InstaPay, or Fawry in Egypt?',
      qAr: 'كيف يمكنني الدفع عبر فودافون كاش، إنستاباي، أو فوري داخل مصر؟',
      aEn: 'We support all major Egyptian payment rails. At checkout, select "InstaPay & Mobile Wallets" or "Fawry". You can transfer instantly via your wallet or generate an 8-digit Fawry code to pay at any retail kiosk nationwide.',
      aAr: 'ندعم جميع وسائل الدفع المحلية في مصر. عند إتمام الاشتراك، اختر "إنستاباي والمحافظ الإلكترونية" أو "فوري". يمكنك التحويل الفوري لمحفظتنا الرسمية أو استخراج كود فوري ساري للدفع من أي منفذ في كافة محافظات مصر.'
    },
    {
      qEn: 'What is the 14-Day 100% Money-Back Guarantee?',
      qAr: 'ما هو ضمان استرداد الأموال بنسبة ١٠٠٪ خلال ١٤ يوماً؟',
      aEn: 'We stand by the effectiveness of our AI career suite. If Opify Pro does not help you discover higher-quality opportunities, optimize your ATS resume, or secure interviews within 14 days, simply reach out to support for a complete, hassle-free refund.',
      aAr: 'نثق تماماً في القيمة الحقيقية لمنصة أوبيفاي. إذا لم تساعدك الباقة الاحترافية في العثور على فرص أفضل وتحسين سيرتك الذاتية خلال ١٤ يوماً، راسلنا وسنعيد لك كامل المبلغ دون أي تعقيدات.'
    },
    {
      qEn: 'What is the difference between Pro Candidate and Career Booster Plus?',
      qAr: 'ما الفرق بين باقة المرشح الاحترافي وباقة التعزيز المهني الشامل؟',
      aEn: 'Pro Candidate provides unlimited access to all AI tools (Gemini 3.8 Assistant, ATS optimization, Radar search, and Tracker). Career Booster Plus adds human expertise: a certified HR expert audits your CV personally, conducts a 45-minute live mock interview, and provides direct WhatsApp career coaching.',
      aAr: 'الباقة الاحترافية توفر وصولاً غير محدود لجميع أدوات الذكاء الاصطناعي (مساعد أوبيفاي الذكي، محرر ATS، ورادار الوظائف). بينما تضيف باقة التعزيز المهني تدخلاً بشرياً مخصصاً: مراجعة يدوية لسيرتك من خبير توظيف معتمد، وجلسة محاكاة مقابلة حية ٤٥ دقيقة، واستشارات مباشرة عبر واتساب.'
    },
    {
      qEn: 'Do you offer student, fresh graduate, or military service discounts?',
      qAr: 'هل تقدمون خصومات للطلاب والخريجين الجدد أو مؤدي الخدمة العسكرية؟',
      aEn: 'Yes! We offer a 35% educational discount for Egyptian university students, fresh grads (graduated within the last 18 months), and military service candidates. Use promo code EGYPT2026 or reach out to support with your university ID.',
      aAr: 'نعم! نقدم خصماً قدره ٣٥٪ لطلاب الجامعات المصرية والخريجين الجدد (خلال ١٨ شهراً من التخرج) وللشباب أثناء فترة الخدمة العسكرية. يمكنك استخدام كود EGYPT2026 أو مراسلة الدعم ببطاقتك الجامعية.'
    },
    {
      qEn: 'Can companies get formal electronic tax invoices (فاتورة إلكترونية)?',
      qAr: 'هل يمكن للشركات الحصول على فواتير إلكترونية ضريبية معتمدة؟',
      aEn: 'Yes, all employer plans include official Egyptian tax invoices compatible with the Egyptian Tax Authority e-invoicing portal (منظومة الفاتورة الإلكترونية). Enterprise accounts also receive dedicated vendor registration support.',
      aAr: 'نعم، تشمل جميع باقات الشركات فواتير ضريبية رسمية متوافقة مع منظومة الفاتورة الإلكترونية لمصلحة الضرائب المصرية، مع دعم كامل لملف تسجيل الموردين للشركات الكبرى.'
    }
  ];

  // Comparison Matrix Rows
  const comparisonMatrix = [
    {
      categoryEn: 'Discovery & Commute Radar',
      categoryAr: 'رادار استكشاف الوظائف والمواصلات',
      items: [
        { nameEn: 'Hyperlocal Radius Search', nameAr: 'بحث جغرافي دقيق بالمسافة', free: '5 km radius', pro: 'Unlimited (Cairo & MENA)', booster: 'Unlimited + Priority Alert' },
        { nameEn: 'Metro & Commute Route Matching', nameAr: 'مطابقة خطوط المترو والمواصلات', free: 'Basic', pro: 'Full Transit Times', booster: 'Full Transit Times' },
        { nameEn: 'Flexible & Evening Shift Filters (After 5 PM)', nameAr: 'فلترة المواعيد المسائية والدوام الجزئي', free: 'Standard', pro: 'Priority Shifts', booster: 'Priority Shifts' },
      ]
    },
    {
      categoryEn: 'ATS Resume & Career Assets',
      categoryAr: 'السيرة الذاتية وأدوات التقديم',
      items: [
        { nameEn: 'ATS Keyword Match & Score', nameAr: 'فحص الكلمات المفتاحية ودرجة ATS', free: '3 analyses / mo', pro: 'Unlimited', booster: 'Unlimited' },
        { nameEn: 'Truth-Preserving Bullet Rewrite', nameAr: 'إعادة صياغة الإنجازات بلغة الأرقام', free: 'Basic sample', pro: 'Full X-Y-Z Generator', booster: 'Full + Human HR Polish' },
        { nameEn: 'AI Tailored Cover Letters', nameAr: 'خطابات تقديم مخصصة لكل وظيفة', free: '1 / month', pro: 'Unlimited', booster: 'Unlimited' },
        { nameEn: 'Human HR Expert CV Audit', nameAr: 'تدقيق يدوي من خبير موارد بشرية', free: '—', pro: '—', booster: 'Included (1-on-1)' },
      ]
    },
    {
      categoryEn: 'AI Career Intelligence & Coaching',
      categoryAr: 'المساعد الذكي والتدريب على المقابلات',
      items: [
        { nameEn: 'Gemini 3.8 Flash Career Assistant', nameAr: 'مساعد أوبيفاي الذكي المتطور', free: '5 queries / day', pro: 'Unlimited', booster: 'Unlimited' },
        { nameEn: 'Mock Interview Simulator (STAR method)', nameAr: 'محاكي المقابلات الشخصية وتصحيح الإجابات', free: '3 questions', pro: 'Unlimited Practice', booster: 'Unlimited + Live 45m Session' },
        { nameEn: 'Salary Negotiation Script Generator', nameAr: 'صياغة إيميلات ونصوص تفاوض الرواتب', free: '—', pro: 'Full Access', booster: 'Full Access' },
        { nameEn: 'Scam & Telegram Job Fraud Shield', nameAr: 'فحص عروض العمل المشبوهة وكشف النصب', free: 'Basic checks', pro: 'Deep Fraud Audit', booster: 'Deep Fraud Audit' },
      ]
    },
    {
      categoryEn: 'Application Tracker & Recruiter Visibility',
      categoryAr: 'تتبع الطلبات وأولوية الظهور للشركات',
      items: [
        { nameEn: 'Active Tracked Jobs (Kanban)', nameAr: 'سعة لوحة تتبع طلبات التوظيف', free: 'Up to 5 jobs', pro: 'Unlimited', booster: 'Unlimited' },
        { nameEn: 'Recruiter Verified Candidate Badge', nameAr: 'شارة مرشح موثوق أمام مسؤولي التوظيف', free: '—', pro: 'Included (Blue Star)', booster: 'VIP Gold Spotlight' },
        { nameEn: 'Direct Partner Referrals in Cairo', nameAr: 'تزكية مباشرة لدى الشركات الشريكة', free: '—', pro: '—', booster: 'Included' },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      
      {/* 1. Header & Segment Controller */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
          <span>{language === 'ar' ? 'خطط مرنة تناسب طموحك المهني وميزانيتك' : 'Transparent, Fair Pricing for Egypt & MENA'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {language === 'ar' ? 'استثمر في مسارك المهني القادم' : 'Accelerate Your Next Career Milestone'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {language === 'ar'
            ? 'احصل على قدرات الذكاء الاصطناعي الفائقة، ورادار الوظائف بالمسافة الفعلية، ومحرر السيرة الذاتية التفاعلي، واضمن أفضل عرض مالي.'
            : 'Access real commute radar, truth-preserving ATS resume optimization, realistic salary negotiation tools, and priority visibility with top employers.'}
        </p>

        {/* Audience Toggle (Job Seekers vs Employers) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-flex shadow-inner">
            <button
              onClick={() => setAudience('seekers')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                audience === 'seekers'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{language === 'ar' ? 'للباحثين عن عمل' : 'For Job Seekers'}</span>
            </button>
            <button
              onClick={() => setAudience('employers')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                audience === 'employers'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{language === 'ar' ? 'للشركات وأصحاب الأعمال' : 'For Employers'}</span>
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-flex text-xs font-bold">
            <button
              onClick={() => setCurrency('EGP')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                currency === 'EGP'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EGP (ج.م)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Monthly / Annual Cycle Toggle */}
        <div className="pt-2 flex items-center justify-center gap-3 text-xs sm:text-sm">
          <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
            {language === 'ar' ? 'دفع شهري' : 'Monthly'}
          </span>

          <button
            onClick={() => setBillingCycle(prev => prev === 'annual' ? 'monthly' : 'annual')}
            className="relative inline-flex h-6 w-12 items-center rounded-full bg-slate-200 dark:bg-slate-700 p-0.5 transition-colors cursor-pointer"
            aria-label="Toggle billing cycle"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-blue-600 shadow-md transform transition-transform ${
                billingCycle === 'annual' ? 'ltr:translate-x-6 rtl:-translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <span className={`font-semibold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
            <span>{language === 'ar' ? 'اشتراك سنوي' : 'Annual'}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold uppercase">
              {language === 'ar' ? 'وفر ٢٠٪ + شهرين مجاناً' : 'Save 20% + 2 Months Free'}
            </span>
          </span>
        </div>
      </div>

      {/* 2. Job Seekers Pricing Grid */}
      {audience === 'seekers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Free */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-6 hover:border-slate-300 transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'الباقة المجانية' : 'Free Candidate'}
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                  {language === 'ar' ? 'دخول فوري' : 'Always Free'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'أدوات أساسية لاستكشاف الوظائف القريبة ومتابعة طلبات التقديم بدون أي تكلفة.'
                  : 'Essential tools to search nearby jobs, browse commute radar, and apply for opportunities.'}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {formatPrice(0)}
                </span>
                <span className="text-xs text-slate-500">{language === 'ar' ? '/ للأبد' : '/ forever'}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'رادار المسافة الجغرافي حتى ٥ كم' : 'Hyperlocal discovery up to 5 km'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'مطابقة ذكية يومية (حتى ٥ وظائف)' : 'Basic AI matching (5 jobs / day)'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تتبع حتى ٥ طلبات في لوحة المتابعة' : 'Track up to 5 active applications'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'فحص السيرة الذاتية ضد معايير السوق' : 'Standard resume parsing & ATS score'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-400 dark:text-slate-500">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'محاكي المقابلات الشخصية STAR' : 'No mock interview simulation'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-400 dark:text-slate-500">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'أولوية الظهور أمام مسؤولي التوظيف' : 'No recruiter spotlight priority'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout('free', 'Free Candidate', 'الباقة المجانية', 0, 0)}
              className={`w-full py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                !currentUser?.isPremium
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {!currentUser?.isPremium 
                ? (language === 'ar' ? 'باقتك النشطة حالياً ✓' : 'Your Current Plan ✓')
                : (language === 'ar' ? 'التحويل للمجانية' : 'Downgrade to Free')}
            </button>
          </div>

          {/* Plan 2: Pro Job Seeker (Featured) */}
          <div className="relative p-8 rounded-3xl bg-slate-900 text-white border-2 border-blue-500 shadow-2xl flex flex-col justify-between space-y-6 transform lg:-translate-y-2">
            
            {/* Spotlight Banner */}
            <div className="absolute -top-3.5 ltr:right-8 rtl:left-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الأكثر طلباً • وفر ٢٠٪' : 'Most Popular • Save 20%'}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'الباقة الاحترافية (Pro)' : 'Pro Candidate'}
                </h3>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              <p className="text-xs text-blue-200 leading-relaxed">
                {language === 'ar'
                  ? 'قدرات الذكاء الاصطناعي الكاملة، وإعادة صياغة السيرة الذاتية، ومحاكاة المقابلات لمضاعفة فرصك.'
                  : 'Full AI superpower suite: live commute radar, ATS optimizer, interview coach, and salary negotiator.'}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-black text-white">
                  {formatPrice(billingCycle === 'annual' ? 119 : 149)}
                </span>
                <span className="text-xs text-blue-300">
                  {language === 'ar' ? '/ شهرياً' : '/ month'}
                </span>
                {billingCycle === 'annual' && (
                  <span className="text-[11px] text-emerald-400 ltr:ml-2 rtl:mr-2">
                    {language === 'ar' ? '(تُدفع سنوياً)' : '(billed annually)'}
                  </span>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'رادار جغرافي غير محدود ومطابقة المواصلات' : 'Unlimited radar & metro commute matching'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تحسين السيرة الذاتية الكامل ومحرر ATS' : 'Full ATS CV optimizer & truth-preserving rewrite'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'توليد غير محدود لخطابات التقديم المخصصة' : 'Unlimited tailored cover letter generator'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'مساعد أوبيفاي الذكي (Gemini 3.8 Flash)' : 'Unlimited Gemini 3.8 Flash Career Assistant'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'محاكي المقابلات الشخصية وتقييم STAR' : 'Mock interview simulator & STAR grading'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تتبع غير محدود للوظائف ولوحة كانبان' : 'Unlimited Kanban tracking & reminders'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-blue-100 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'شارة المرشح الموثوق أمام الشركات' : 'Verified Recruiter Spotlight Badge'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout('premium', 'Pro Candidate', 'الباقة الاحترافية', 149, 119)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {currentUser?.isPremium ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'ar' ? 'باقتك النشطة حالياً (Pro)' : 'Your Active Plan (Pro)'}</span>
                </>
              ) : (
                <>
                  <span>{language === 'ar' ? 'اشترك الآن في Pro' : 'Upgrade to Pro'}</span>
                  <ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />
                </>
              )}
            </button>
          </div>

          {/* Plan 3: Career Booster Plus (VIP) */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-300 transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? 'التعزيز المهني الشامل' : 'Career Booster Plus'}
                  </h3>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[11px] font-extrabold uppercase">
                  VIP
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'ميزات Pro كاملة بالإضافة إلى مراجعة بشرية متخصصة لسيرتك ومقابلة محاكاة حية.'
                  : 'Pro AI tools + 1-on-1 human recruiter review, live mock interview, and direct partner referrals.'}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {formatPrice(billingCycle === 'annual' ? 279 : 349)}
                </span>
                <span className="text-xs text-slate-500">{language === 'ar' ? '/ شهرياً' : '/ month'}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-semibold">
                  <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'كل ما تتضمنه الباقة الاحترافية (Pro)' : 'Everything in Pro Candidate included'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200">
                  <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'مراجعة يدوية لسيرتك من خبير HR معتمد' : '1-on-1 Certified HR Recruiter CV Audit'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200">
                  <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'جلسة مقابلة محاكاة حية لمدة ٤٥ دقيقة' : '45-minute live 1-on-1 mock interview'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200">
                  <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'دعم واستشارات مباشرة عبر واتساب VIP' : 'Direct WhatsApp VIP career advisor'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200">
                  <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تزكية مباشرة لدى الشركات الشريكة' : 'Priority referral to verified Cairo employers'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout('booster', 'Career Booster Plus', 'التعزيز المهني الشامل', 349, 279)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>{language === 'ar' ? 'اختيار باقة Booster VIP' : 'Get Booster VIP'}</span>
              <ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />
            </button>
          </div>

        </div>
      )}

      {/* 3. Employers & Recruiters Pricing Grid */}
      {audience === 'employers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Employer 1: Pay-as-you-go */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'إعلان وظيفة فردي' : 'Pay-Per-Job Post'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'مثالي للشركات الناشئة أو التي توظف لوظيفة محددة لمرة واحدة.' : 'Ideal for small businesses hiring for an immediate specific role.'}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {formatPrice(499)}
                </span>
                <span className="text-xs text-slate-500">{language === 'ar' ? '/ للإعلان' : '/ per post'}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'إعلان نشط لمدة ٤٥ يوماً على الخريطة' : 'Active 45-day listing with radar'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'فلترة تلقائية بالمطابقة الذكية' : 'Instant AI candidate skill screening'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'استقبال حتى ٥٠ متقدماً مؤهلاً' : 'Up to 50 qualified applicants'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout('employer_starter', 'Pay-Per-Job Post', 'إعلان وظيفة فردي', 499, 499)}
              className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
            >
              {language === 'ar' ? 'نشر وظيفة الآن (٤٩٩ ج.م)' : 'Post Single Job (499 EGP)'}
            </button>
          </div>

          {/* Employer 2: Growth Hiring (Featured) */}
          <div className="relative p-8 rounded-3xl bg-slate-900 text-white border-2 border-blue-500 shadow-2xl flex flex-col justify-between space-y-6 transform lg:-translate-y-2">
            <div className="absolute -top-3.5 ltr:right-8 rtl:left-8 px-3.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-lg">
              {language === 'ar' ? 'الأفضل للشركات سريعة النمو' : 'Best for Growing Teams'}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                {language === 'ar' ? 'النمو السريع (Growth Hiring)' : 'Growth Hiring'}
              </h3>
              <p className="text-xs text-blue-200">
                {language === 'ar' ? 'وظائف غير محدودة، ورادار للبحث في الكفاءات القريبة وتعيين أسرع بـ ٣ أضعاف.' : 'Unlimited postings, direct candidate radius search, and instant applicant scorecards.'}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-black text-white">
                  {formatPrice(billingCycle === 'annual' ? 1199 : 1499)}
                </span>
                <span className="text-xs text-blue-300">{language === 'ar' ? '/ شهرياً' : '/ month'}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2.5 text-blue-100">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'نشر عدد غير محدود من إعلانات الوظائف' : 'Unlimited active job postings'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-blue-100">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'رادار البحث في المرشحين حسب نطاق المسافة' : 'Radius candidate discovery & invite'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-blue-100">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'ترتيب فوري للمتقدمين بالذكاء الاصطناعي' : 'Instant AI scorecard ranking'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-blue-100">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'ar' ? 'شارة شركة موثوقة (Verified Employer)' : 'Verified Employer Company Badge'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout('employer_growth', 'Growth Hiring', 'النمو السريع', 1499, 1199)}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{language === 'ar' ? 'ابدأ باقة النمو للشركات' : 'Start Growth Hiring'}</span>
              <ArrowRight className="w-4 h-4 ltr:inline rtl:rotate-180" />
            </button>
          </div>

          {/* Employer 3: Enterprise */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'المؤسسات والشركات الكبرى' : 'Enterprise & Scale'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'إدارة توظيف مخصصة، وربط بأنظمة ATS، وحملات توظيف جامعية واسعة.' : 'Custom ATS integrations, dedicated recruiter scout, and campus hiring drives.'}
              </p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {formatPrice(4990)}
                </span>
                <span className="text-xs text-slate-500">{language === 'ar' ? '/ شهرياً' : '/ month'}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'مسؤول توظيف مخصص (Talent Scout)' : 'Dedicated talent scout & concierge'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'ربط مباشر عبر API مع أنظمة الشركات' : 'Custom API & HRIS integrations'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'تقرير ربع سنوي شامل لرواتب السوق المصري' : 'Quarterly Egypt salary compensation report'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{language === 'ar' ? 'فواتير ضريبية إلكترونية معتمدة' : 'Official e-invoice compliance'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout('employer_enterprise', 'Enterprise & Scale', 'المؤسسات الكبرى', 4990, 4990)}
              className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
            >
              {language === 'ar' ? 'تواصل مع فريق الشركات' : 'Contact Enterprise Sales'}
            </button>
          </div>

        </div>
      )}

      {/* 4. Interactive ROI Value Calculator */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white border border-blue-800/60 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              {language === 'ar' ? 'حاسبة العائد على الاستثمار المهني (ROI)' : 'Career Value & ROI Calculator'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'ar' ? 'لماذا تُعوّض باقة أوبيفاي تكلفتها خلال أول أسبوع؟' : 'Why Opify Pro Pays for Itself on Day One'}
            </h2>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
            {language === 'ar' ? 'استناداً لبيانات سوق العمل المصري ٢٠٢٦' : 'Grounded in 2026 Egypt Market Benchmarks'}
          </div>
        </div>

        {/* Salary Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-blue-200 font-medium">
              {language === 'ar' ? 'الراتب الشهري الحالي أو المستهدف في مصر:' : 'Your Target Monthly Salary in Cairo/Egypt:'}
            </span>
            <span className="text-lg font-black text-white px-3 py-1 rounded-lg bg-blue-800/50 border border-blue-700">
              {formatPrice(roiSalary)} {language === 'ar' ? '/ شهر' : '/ mo'}
            </span>
          </div>

          <input
            type="range"
            min="5000"
            max="80000"
            step="1000"
            value={roiSalary}
            onChange={(e) => setRoiSalary(Number(e.target.value))}
            className="w-full h-2.5 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />

          <div className="flex justify-between text-[11px] text-blue-300">
            <span>5,000 EGP (Junior / Retail)</span>
            <span>30,000 EGP (Mid Specialist)</span>
            <span>80,000+ EGP (Senior / Lead)</span>
          </div>
        </div>

        {/* ROI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-blue-800/80">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-[11px] text-blue-300 font-medium">
              {language === 'ar' ? 'مكسب التفاوض المتوقع (+١٢٪):' : 'Negotiation Upside (+12%):'}
            </p>
            <p className="text-2xl font-black text-emerald-400">
              +{formatPrice(estimatedNegotiationGain)}
              <span className="text-xs text-emerald-300 font-normal"> {language === 'ar' ? '/ شهرياً' : '/ month'}</span>
            </p>
            <p className="text-[10px] text-blue-200">
              {language === 'ar' ? 'باستخدام نصوص التفاوض الذكية والمثبتة' : 'Using verified benchmark negotiation scripts'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-[11px] text-blue-300 font-medium">
              {language === 'ar' ? 'الوقت الموفر للحصول على عرض:' : 'Time Saved to Offer:'}
            </p>
            <p className="text-2xl font-black text-white">
              {language === 'ar' ? '٢٢ يوماً أسرع' : '22 Days Faster'}
            </p>
            <p className="text-[10px] text-blue-200">
              {language === 'ar' ? 'بفضل رادار المسافات وتجاوز فلاتر ATS' : 'Via commute radar & 85%+ ATS pass rate'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-[11px] text-blue-300 font-medium">
              {language === 'ar' ? 'العائد الصافي على استثمارك (ROI):' : 'Estimated Return on Investment:'}
            </p>
            <p className="text-2xl font-black text-amber-300">
              {roiMultiplier}x
              <span className="text-xs text-amber-200 font-normal"> {language === 'ar' ? 'ضعف التكلفة' : 'Return'}</span>
            </p>
            <p className="text-[10px] text-blue-200">
              {language === 'ar' ? 'مقابل ١١٩ ج.م/شهر فقط للباقة الاحترافية' : 'Against just 119 EGP/mo investment'}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Detailed Feature Comparison Table */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ar' ? 'مقارنة تفصيلية بين باقات المرشحين' : 'Detailed Candidate Plan Comparison'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'قارن بين الميزات خطوة بخطوة واختر ما يناسب أهدافك' : 'Review features side by side to choose the best companion for your journey'}
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs">
          <table className="w-full text-left rtl:text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
                <th className="p-4 font-bold text-slate-700 dark:text-slate-300 w-1/3">
                  {language === 'ar' ? 'الميزة / القدرة' : 'Feature / Capability'}
                </th>
                <th className="p-4 font-bold text-slate-700 dark:text-slate-300 text-center">
                  {language === 'ar' ? 'المجانية' : 'Free'}
                </th>
                <th className="p-4 font-bold text-blue-600 dark:text-blue-400 text-center bg-blue-50/50 dark:bg-blue-950/20">
                  {language === 'ar' ? 'الاحترافية (Pro)' : 'Pro Candidate'}
                </th>
                <th className="p-4 font-bold text-amber-700 dark:text-amber-400 text-center">
                  {language === 'ar' ? 'التعزيز الشامل (Booster)' : 'Booster Plus'}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr className="bg-slate-100/70 dark:bg-slate-750 font-bold text-slate-900 dark:text-white text-xs">
                    <td colSpan={4} className="p-3 px-4 font-black">
                      {language === 'ar' ? section.categoryAr : section.categoryEn}
                    </td>
                  </tr>
                  {section.items.map((item, iIdx) => (
                    <tr 
                      key={iIdx} 
                      className="border-b border-slate-100 dark:border-slate-700/60 hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition text-xs"
                    >
                      <td className="p-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                        {language === 'ar' ? item.nameAr : item.nameEn}
                      </td>
                      <td className="p-3.5 text-center text-slate-600 dark:text-slate-400">
                        {item.free}
                      </td>
                      <td className="p-3.5 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10">
                        {item.pro}
                      </td>
                      <td className="p-3.5 text-center font-bold text-amber-700 dark:text-amber-400">
                        {item.booster}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Local Trust & Payment Rails Strip */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{language === 'ar' ? 'ضمان استرداد ١٠٠٪ خلال ١٤ يوماً' : '14-Day 100% Money-Back Guarantee'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>{language === 'ar' ? 'تشفير بنكي آمن ٢٥٦-bit' : '256-Bit Bank-Grade SSL Encryption'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>{language === 'ar' ? 'إلغاء فوري بضغطة زر دون شروط' : 'Cancel Anytime with 1 Click'}</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="font-bold">{language === 'ar' ? 'طرق الدفع المدعومة في مصر:' : 'Supported Egyptian Payment Methods:'}</span>
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-slate-700 dark:text-slate-300">
            ميزة Meeza
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-purple-600">
            InstaPay إنستاباي
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-red-600">
            Vodafone Cash فودافون كاش
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-amber-600">
            Fawry فوري
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold text-blue-600">
            Visa / Mastercard
          </span>
        </div>
      </div>

      {/* 7. Frequently Asked Questions (Accordion) */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ar' ? 'الأسئلة الشائعة حول الاشتراكات' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'إجابات مباشرة على كل ما يهمك حول طرق الدفع والضمان والإلغاء' : 'Everything you need to know about payments, guarantees, and activation'}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqItems.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left rtl:text-right flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 cursor-pointer"
                >
                  <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4.5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 mt-1">
                    {language === 'ar' ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. Interactive Checkout / Subscription Modal */}
      {checkoutData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setCheckoutData(null)}
              className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!paymentSuccess ? (
              <>
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {language === 'ar' ? 'إتمام الاشتراك وتفعيل الباقة' : 'Complete Your Subscription'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    {language === 'ar' ? 'تفعيل فوري وآمن لجميع ميزات أوبيفاي المتقدمة.' : 'Instant activation for your Opify career superpowers.'}
                  </p>
                </div>

                {/* Plan Summary Card */}
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? checkoutData.planNameAr : checkoutData.planNameEn}
                    </p>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300">
                      {checkoutData.billingPeriod === 'annual' 
                        ? (language === 'ar' ? 'اشتراك سنوي (وفر ٢٠٪)' : 'Annual Billing (Save 20%)') 
                        : (language === 'ar' ? 'اشتراك شهري' : 'Monthly Billing')}
                    </p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className="text-lg font-black text-blue-600 dark:text-blue-400">
                      {formatPrice(checkoutData.priceEgp)}
                    </p>
                    <p className="text-[10px] text-slate-500">{language === 'ar' ? 'شامل الضرائب' : 'Incl. all taxes'}</p>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>{language === 'ar' ? 'كود الخصم (Promo Code):' : 'Promo or Referral Code:'}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {language === 'ar' ? 'جرب OPIFY20 أو EGYPT2026' : 'Try OPIFY20 or EGYPT2026'}
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. OPIFY20"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white uppercase focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      {language === 'ar' ? 'تطبيق' : 'Apply'}
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${promoDiscount > 0 ? 'text-emerald-600 font-semibold' : 'text-red-500'}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {language === 'ar' ? 'طريقة الدفع:' : 'Select Payment Method:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 shadow-2xs font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[11px]">{language === 'ar' ? 'بطاقة بنكية' : 'Card / Meeza'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'wallet'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 shadow-2xs font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-[11px]">{language === 'ar' ? 'فودافون / إنستاباي' : 'InstaPay / Wallet'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('fawry')}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'fawry'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 shadow-2xs font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Receipt className="w-4 h-4" />
                      <span className="text-[11px]">{language === 'ar' ? 'فوري Fawry' : 'Fawry Pay'}</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Fields based on method */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">{language === 'ar' ? 'رقم البطاقة' : 'Card Number'}</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-mono mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">{language === 'ar' ? 'تاريخ الصلاحية' : 'Expiry'}</label>
                        <input
                          type="text"
                          defaultValue="08/29"
                          className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-mono mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">CVV</label>
                        <input
                          type="text"
                          defaultValue="381"
                          className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-mono mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {language === 'ar' ? 'التحويل المباشر عبر إنستاباي أو محفظة الهاتف:' : 'Instant Wallet / InstaPay Transfer:'}
                    </p>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-200 space-y-1">
                      <p>• InstaPay IPA: <strong className="text-blue-600">opify@instapay</strong></p>
                      <p>• Vodafone Cash: <strong className="text-red-600">010 9988 7766</strong></p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">{language === 'ar' ? 'رقم محفظتك التي حولت منها:' : 'Your Wallet Number:'}</label>
                      <input
                        type="text"
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-mono mt-1"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'fawry' && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
                    <p className="font-bold text-amber-900 dark:text-amber-200">
                      {language === 'ar' ? 'كود فوري المباشر للدفع من أي منفذ:' : 'Your Instant Fawry Payment Code:'}
                    </p>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-center font-mono text-base font-black text-amber-700 dark:text-amber-300 tracking-widest border border-amber-200">
                      7829 4016
                    </div>
                    <p className="text-[10px] text-amber-800 dark:text-amber-300">
                      {language === 'ar' ? 'الكود ساري لمدة ٤٨ ساعة في كافة منافذ فوري في مصر برقم الخدمة ٧٨٨.' : 'Valid for 48 hours at any Fawry terminal in Egypt using service code 788.'}
                    </p>
                  </div>
                )}

                {/* Pricing Calculation Summary */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>{language === 'ar' ? 'السعر الأساسي:' : 'Subtotal:'}</span>
                    <span>{formatPrice(checkoutData.priceEgp)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>{language === 'ar' ? 'خصم الكود:' : 'Promo Discount:'}</span>
                      <span>-{formatPrice(Math.round(checkoutData.priceEgp * promoDiscount))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-1">
                    <span>{language === 'ar' ? 'الإجمالي المطلوب اليوم:' : 'Total Due Today:'}</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {formatPrice(Math.max(0, Math.round(checkoutData.priceEgp * (1 - promoDiscount))))}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleCompletePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>{language === 'ar' ? 'جاري التحقق وتفعيل الباقة...' : 'Verifying & Activating...'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تأكيد الدفع وتفعيل الباقة الآن' : 'Confirm & Activate Pro'}</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {language === 'ar' ? 'مبروك! تم تفعيل باقتك بنجاح 🎉' : 'Congratulations! Subscription Active 🎉'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {language === 'ar'
                      ? 'أنت الآن مشترك في باقة أوبيفاي الاحترافية. جميع أدوات الذكاء الاصطناعي ورادار الوظائف مفتوحة لك بالكامل.'
                      : 'Your Opify Pro account is now active. All career intelligence tools and radars are unlocked.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] font-mono text-slate-500 text-left rtl:text-right space-y-1">
                  <p>Transaction ID: <strong>OPF-2026-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
                  <p>Status: <strong className="text-emerald-600">CONFIRMED (PAID)</strong></p>
                  <p>Next Renewal: <strong>{checkoutData.billingPeriod === 'annual' ? 'September 2027' : 'October 2026'}</strong></p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() => {
                      setCheckoutData(null);
                      if (onNavigate) onNavigate('ats-editor');
                    }}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    {language === 'ar' ? 'فحص السيرة الذاتية (ATS)' : 'Launch ATS Optimizer'}
                  </button>

                  <button
                    onClick={() => {
                      setCheckoutData(null);
                      if (onNavigate) onNavigate('assistant');
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
                  >
                    {language === 'ar' ? 'تجربة المساعد الذكي' : 'Try AI Assistant'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
