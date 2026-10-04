import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  MessageSquare, 
  RefreshCw, 
  Building2, 
  Briefcase, 
  User, 
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Language } from '../../types';

interface CoverLetterPitchToolProps {
  language: Language;
  initialJobTitle?: string;
  initialCompany?: string;
}

type PitchFormat = 'corporate_letter' | 'tech_startup' | 'recruiter_dm' | 'interview_thanks' | 'salary_counter';
type ToneType = 'professional' | 'confident' | 'fresh_grad';

export const CoverLetterPitchTool: React.FC<CoverLetterPitchToolProps> = ({
  language,
  initialJobTitle = 'Customer Experience Specialist',
  initialCompany = 'Apex Retail Solutions'
}) => {
  const isAr = language === 'ar';

  // Form State
  const [format, setFormat] = useState<PitchFormat>('recruiter_dm');
  const [tone, setTone] = useState<ToneType>('professional');
  const [outputLanguage, setOutputLanguage] = useState<'en' | 'ar'>(language);
  const [candidateName, setCandidateName] = useState<string>('Nada Nemr');
  const [jobTitle, setJobTitle] = useState<string>(initialJobTitle);
  const [companyName, setCompanyName] = useState<string>(initialCompany);
  const [keySkills, setKeySkills] = useState<string>('Customer Retention, Bilingual Communication, Retail POS, Conflict Resolution');
  const [keyAchievement, setKeyAchievement] = useState<string>('Increased customer satisfaction score by 22% and reduced wait time by 4 minutes at previous branch');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Quick Preset Samples
  const applyPreset = (preset: 'tech' | 'retail' | 'finance') => {
    if (preset === 'tech') {
      setJobTitle('Frontend React Developer');
      setCompanyName('Fawry Banking & Payment');
      setKeySkills('React.js, TypeScript, Tailwind CSS, REST APIs, Performance Optimization');
      setKeyAchievement('Engineered a fast checkout flow that decreased bounce rate by 14% and boosted mobile checkout speed by 35%');
      setFormat('tech_startup');
      setTone('confident');
    } else if (preset === 'retail') {
      setJobTitle('Retail Store Supervisor');
      setCompanyName('B.Tech Electronics');
      setKeySkills('Team Leadership, Inventory Management, Store KPIs, High-Ticket Sales');
      setKeyAchievement('Managed a team of 9 sales reps delivering 118% of quarterly sales target in Nasr City branch');
      setFormat('recruiter_dm');
      setTone('professional');
    } else if (preset === 'finance') {
      setJobTitle('Junior Financial Analyst');
      setCompanyName('Banque Misr');
      setKeySkills('Financial Modeling, Excel (VBA/Power Query), Cash Flow Forecasting, Egyptian Tax Law');
      setKeyAchievement('Prepared monthly variance reports across 4 departmental budgets with zero discrepancies');
      setFormat('corporate_letter');
      setTone('fresh_grad');
    }
  };

  // Generator Logic
  const generatedText = React.useMemo(() => {
    const isEgyptianAr = outputLanguage === 'ar';

    if (format === 'recruiter_dm') {
      if (isEgyptianAr) {
        return `صباح الخير أستاذ/ة، أتمنى لحضرتك يوماً طيباً وموفقاً.

مع حضرتك ${candidateName}. تواصلت مع حضرتك بخصوص فرصة ${jobTitle} المعلنة لدى ${companyName}.

لدي خبرة عملية تركزت في ${keySkills}، ومؤخراً نجحت في ${keyAchievement}. 
أتابع مسيرة ${companyName} باهتمام كبير وأثق بقدرتي على تقديم إضافة ملموسة لفريق العمل من اليوم الأول.

مرفق مع الرسالة رابط سيرتي الذاتية المحدثة، ويسعدني ويشرفني تخصيص 10 دقائق للحديث هاتفياً أو عبر المقابلة في أي وقت يناسب جدول حضرتك.

مع خالص التحية والتقدير،
${candidateName}
الهاتف / واتساب: +20 1X XXXX XXXX`;
      } else {
        return `Hello [Hiring Manager / Recruiter Name],

I hope your week is off to a great start.

My name is ${candidateName}, and I am reaching out regarding the ${jobTitle} opening at ${companyName}. 

Over the past few years, my work has focused on ${keySkills}. Most recently, I ${keyAchievement}.

I have been following ${companyName}'s growth with great admiration and am confident I can bring immediate, measurable value to your team.

My updated CV is attached. I would welcome the chance to connect for a quick 10-minute introductory conversation at your convenience.

Best regards,
${candidateName}
Mobile: +20 1X XXXX XXXX`;
      }
    }

    if (format === 'corporate_letter') {
      if (isEgyptianAr) {
        return `إلى عناية لجنة التوظيف الموقرة لدى ${companyName}،
تحية طيبة وبعد،

يسعدني أن أتقدم رسمياً بطلب الترشح لشغل منصب "${jobTitle}"، لما تمتلكه مؤسستكم العريقة من سمعة رائدة في السوق المصري، وتوافق تام مع مساري وتطلعاتي المهنية.

خلال مسيرتي، اكتسبت مهارات راسخة في مجالات ${keySkills}، حيث حرصت دائماً على تطبيق أعلى معايير الجودة والالتزام المؤسسي. وكان من أبرز إنجازاتي: ${keyAchievement}.

إن انضمامي إلى ${companyName} يمثل خطوة استراتيجية أسعى من خلالها إلى توظيف هذه الخبرات لخدمة أهداف الشركة وتحقيق معدلات أداء استثنائية. 

أشكر لكم كريم وقتكم واهتمامكم بالاطلاع على ملفي، وأتطلع قدماً لفرصة اللقاء في مقابلة شخصية لمناقشة كيفية مساهمتي الفعالة في نجاح هذا المنصب.

وتفضلوا بقبول فائق الاحترام والتقدير،

${candidateName}
القاهرة، مصر`;
      } else {
        return `Dear Hiring Committee at ${companyName},

I am writing to express my strong interest in the ${jobTitle} position currently open at ${companyName}. With a dedicated background centered around ${keySkills}, I have consistently delivered reliable outcomes in competitive operating environments.

In my recent experience, I have demonstrated measurable results, notably: ${keyAchievement}. My approach combines structured problem-solving with a collaborative execution mindset that aligns well with the standards upheld by ${companyName}.

I am drawn to ${companyName} because of your operational excellence and reputation across the Egyptian market. I am confident that my technical grounding and work ethic will enable me to make immediate, dependable contributions to your objectives.

Thank you for your time and consideration. I welcome the opportunity to discuss my qualifications further in an interview.

Sincerely,

${candidateName}
Cairo, Egypt`;
      }
    }

    if (format === 'tech_startup') {
      if (isEgyptianAr) {
        return `مرحباً فريق ${companyName}،

أكتب لكم لاهتمامي الكبير بدور ${jobTitle}. كشخص يتابع التطور السريع الذي تقودونه في السوق، أود أن أشارككم كيف يمكنني المساعدة في تسريع وتيرة الإنجاز لديكم.

نقاط القوة الأساسية التي أركز عليها:
• ${keySkills}
• نتيجة ملموسة: ${keyAchievement}
• أسلوب عمل رشيق (Agile)، تركيز عالي على السرعة والجودة، وحل المشكلات بعقلية المالك (Ownership).

أحب التحديات التي تتطلب ابتكاراً سريعاً بدون تعقيد، وأود التحدث معكم عن خططكم القادمة وكيف أستطيع المشاركة فيها.

رابط البورتفوليو / لينكد إن: linkedin.com/in/ahmed-hassan
أطيب التحيات،
${candidateName}`;
      } else {
        return `Hi ${companyName} Team,

I'm reaching out because I've been closely following what you're building, and I'd love to contribute as your next ${jobTitle}.

Here's what I bring to the table:
• Deep practical experience with: ${keySkills}
• Concrete impact: ${keyAchievement}
• Fast-paced execution, proactive problem-solving, and a product-first mindset built for scale.

I thrive in high-ownership environments and would love to hear more about your roadmap for the coming quarters.

Portfolio / LinkedIn: linkedin.com/in/ahmed-hassan
Best,
${candidateName}`;
      }
    }

    if (format === 'interview_thanks') {
      if (isEgyptianAr) {
        return `عزيزي/عزيزتي [اسم المحاور]،
تحية طيبة وبعد،

أود أن أعرب عن خالص شكري وتقديري لوقتكم الثمين خلال مقابلتنا اليوم لمناقشة دور "${jobTitle}" في ${companyName}.

سعدت جداً بحديثنا حول التحديات المقبلة وكيف يسعى الفريق إلى تحقيق أهدافه. زاد هذا اللقاء من حماسي للانضمام إليكم، حيث شعرت بأن خبراتي في ${keySkills} وقدرتي على ${keyAchievement} تتكاملان تماماً مع طموحات المؤسسة.

إذا كنتم بحاجة إلى أي تفاصيل إضافية أو نماذج من أعمالي السابقة، فأنا تحت أمركم في أي وقت.

أتمنى لحضراتكم أسبوعاً مثمراً، وأتطلع لسماع الخطوات القادمة قريباً.

مع خالص الود والتقدير،
${candidateName}`;
      } else {
        return `Dear [Interviewer Name],

Thank you very much for taking the time to speak with me today about the ${jobTitle} role at ${companyName}.

I truly enjoyed learning more about your team's current priorities. Our conversation reinforced my enthusiasm for this opportunity, especially knowing how my background in ${keySkills} and experience having ${keyAchievement} align with what you are looking to accomplish next.

Please let me know if you need any additional information or work samples from my side.

I look forward to hearing about the next steps.

Best regards,
${candidateName}`;
      }
    }

    // Salary Counter Script
    if (isEgyptianAr) {
      return `أشكركم جزيلاً على تقديم عرض العمل لمنصب ${jobTitle} لدى ${companyName}. أنا ممتن جداً لثقتكم ومتحمس بشدة للعمل مع الفريق.

بناءً على التقييم الدقيق لمتطلبات المنصب ومسؤولياته، بالإضافة إلى خبرتي العملية في ${keySkills} ومعدلات السوق الحالية في مصر مع التضخم الحالي، أود الاستفسار عما إذا كان هناك مجال لمرونة رفع الراتب الأساسي بنسبة تقارب 12-15% (أو مناقشة بدل مواصلات شهري / تأمين عائلي).

أنا واثق بأن القيمة والنتائج التي سأحققها سريعاً—مثل ${keyAchievement}—ستعوض هذا الاستثمار بالكامل. 

يسعدني مناقشة هذا الأمر هاتفياً للوصول إلى صيغة عادلة ومناسبة للطرفين.

مع فائق الاحترام،
${candidateName}`;
    } else {
      return `Thank you very much for extending the offer for the ${jobTitle} role at ${companyName}. I am excited about the prospect of joining the team and contributing immediately.

After reviewing the responsibilities and factoring in current market compensation rates in Egypt for ${keySkills}, I was hoping to discuss whether there is flexibility regarding the base monthly salary—specifically in the range of a 12–15% adjustment, or exploring an enhanced commuter allowance.

Given my track record of delivering measurable outcomes—such as ${keyAchievement}—I am confident I will deliver a strong return on this investment.

I look forward to finding a mutually beneficial arrangement and am happy to jump on a brief call.

Warm regards,
${candidateName}`;
    }
  }, [format, tone, outputLanguage, candidateName, jobTitle, companyName, keySkills, keyAchievement]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${jobTitle.replace(/\s+/g, '_')}_${format}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(generatedText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-700 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>{isAr ? 'منشئ الخطابات والرسائل المباشرة' : 'AI Cover Letter & Outreach Pitch Studio'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isAr ? 'خطابات تقديم ورسائل واتساب تخطف أنظار مسؤولي التوظيف' : 'Winning Letters & Recruiter InMails That Get Replies'}
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            {isAr 
              ? 'لا ترسل رسائل عشوائية أو سيرة ذاتية صامتة! ولّد خطابات تقديم مخصصة، ورسائل واتساب مهنية تناسب ثقافة المقابلات في مصر والشركات الناشئة والمؤسسات الكبرى.'
              : 'Never send a generic, cold application. Craft tailored corporate letters, startup pitches, WhatsApp recruiter DMs, and post-interview follow-ups in seconds.'}
          </p>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {isAr ? 'نماذج جاهزة للتجربة السريعة:' : 'Quick Pre-filled Samples:'}
        </span>
        <button
          onClick={() => applyPreset('retail')}
          className="text-xs px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer font-medium"
        >
          {isAr ? 'مبيعات وتجزئة (B.Tech)' : 'Retail Sales (B.Tech)'}
        </button>
        <button
          onClick={() => applyPreset('tech')}
          className="text-xs px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer font-medium"
        >
          {isAr ? 'مطور برمجيات (Fawry)' : 'Software Tech (Fawry)'}
        </button>
        <button
          onClick={() => applyPreset('finance')}
          className="text-xs px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer font-medium"
        >
          {isAr ? 'محاسبة وماليات (Banque Misr)' : 'Finance (Banque Misr)'}
        </button>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          
          {/* Format Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isAr ? 'نوع الرسالة أو الخطاب' : 'Output Message Format'}
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'recruiter_dm', label: isAr ? 'رسالة واتساب ولينكد إن لمسؤول التوظيف' : 'Recruiter WhatsApp / InMail DM', desc: isAr ? 'رسالة قصيرة ومؤثرة تطلب محادثة هاتفية' : 'Short, polite direct outreach' },
                { id: 'corporate_letter', label: isAr ? 'خطاب تقديم رسمي (بنوك ومؤسسات كبرى)' : 'Corporate Cover Letter', desc: isAr ? 'تنسيق تقليدي رسمي متوازن' : 'Traditional formal style' },
                { id: 'tech_startup', label: isAr ? 'عرض قيمة للشركات الناشئة والتقنية' : 'Startup Tech Pitch', desc: isAr ? 'مباشر ويركز على الأرقام والإنجازات' : 'Direct, metric-driven' },
                { id: 'interview_thanks', label: isAr ? 'شكر ومتابعة بعد المقابلة الشخصية' : 'Post-Interview Thank You', desc: isAr ? 'يُرسل خلال 24 ساعة من المقابلة' : 'Sent within 24h of interview' },
                { id: 'salary_counter', label: isAr ? 'صيغة تفاوض راقية على عرض الراتب' : 'Salary Counter Negotiation', desc: isAr ? 'نقاش مهني محترم لطلب تعديل الراتب' : 'Respectful counter-offer' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id as PitchFormat)}
                  className={`p-2.5 rounded-xl border text-left ltr:text-left rtl:text-right transition cursor-pointer ${
                    format === f.id
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold">{f.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language & Tone Pickers */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {isAr ? 'لغة النص الناتج' : 'Output Language'}
              </label>
              <select
                value={outputLanguage}
                onChange={(e) => setOutputLanguage(e.target.value as 'en' | 'ar')}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
              >
                <option value="ar">{isAr ? 'العربية (مهنية مصرية)' : 'Arabic (Egyptian Professional)'}</option>
                <option value="en">English (Professional)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {isAr ? 'نبرة الأسلوب' : 'Tone of Voice'}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
              >
                <option value="professional">{isAr ? 'متزن واحترافي' : 'Professional & Balanced'}</option>
                <option value="confident">{isAr ? 'واثق وصاحب خبرة' : 'Confident & Experienced'}</option>
                <option value="fresh_grad">{isAr ? 'حديث تخرج / متحمس' : 'Fresh Grad / Enthusiastic'}</option>
              </select>
            </div>
          </div>

          {/* Core Info Inputs */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isAr ? 'اسمك الكريم' : 'Your Full Name'}
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isAr ? 'المسمى الوظيفي' : 'Target Role'}
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isAr ? 'اسم الشركة' : 'Company Name'}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isAr ? 'المهارات الرئيسية التي تبرزها' : 'Key Skills to Highlight'}
              </label>
              <input
                type="text"
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
                placeholder="e.g. Sales, React, Communication..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isAr ? 'إنجاز أو رقم حقيقي حققته سابقاً' : 'A Measurable Real Accomplishment'}
              </label>
              <textarea
                rows={2}
                value={keyAchievement}
                onChange={(e) => setKeyAchievement(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-4">
            
            {/* Output Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {isAr ? 'الرسالة المصاغة جاهزة للإرسال' : 'Tailored Output Ready to Send'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                  title={isAr ? 'إرسال مباشر عبر واتساب' : 'Share to WhatsApp'}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isAr ? 'تم النسخ' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  title={isAr ? 'تحميل كملف نصي' : 'Download TXT'}
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rendered Text Box */}
            <div 
              dir={outputLanguage === 'ar' ? 'rtl' : 'ltr'}
              className="p-5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 font-mono sm:font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-blue-500 selection:text-white max-h-[520px] overflow-y-auto"
            >
              {generatedText}
            </div>

            {/* Smart Recruiter Etiquette Tip */}
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>{isAr ? 'نصيحة مسؤولي التوظيف في مصر:' : 'Egyptian Recruiter Tip:'}</strong>{' '}
                {isAr
                  ? 'عند إرسال الرسالة عبر لينكد إن أو واتساب، تجنب إرسال رسالة فارغة تحتوي على ملف الـ PDF فقط دون تمهيد. الرسالة المكتوبة أعلاه توضح احترامك لوقت الشخص وتلخص إنجازاتك في 30 ثانية قراءة.'
                  : 'Never drop a silent PDF into a recruiter\'s WhatsApp or LinkedIn inbox. The above tailored message opens with respect for their time and delivers your ROI in under 30 seconds of reading.'}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
