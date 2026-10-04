import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Copy, 
  ShieldAlert, 
  Building2, 
  Sparkles, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { Button } from './ui/Button';

interface ContactViewProps {
  language: Language;
  onNavigate: (tabId: string, params?: any) => void;
  initialCategory?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ 
  language, 
  onNavigate,
  initialCategory = 'seeker_support'
}) => {
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: initialCategory,
    priority: 'normal',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    category: string;
    createdAt: string;
    expectedResponse: string;
  } | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const categories = [
    {
      id: 'seeker_support',
      label: isAr ? 'مساعدة باحث عن عمل (حساب، سيرة، طلبات)' : 'Job Seeker Help (Account, CV, Applications)',
      icon: MessageSquare
    },
    {
      id: 'employer_partnerships',
      label: isAr ? 'شراكات الشركات والتوظيف المؤسسي' : 'Employer & Corporate Hiring Partnerships',
      icon: Building2
    },
    {
      id: 'report_scam',
      label: isAr ? '🚨 إبلاغ عاجل عن وظيفة مشبوهة أو طلب رسوم' : '🚨 Urgent: Report Fake Job or Advance Fee',
      icon: ShieldAlert
    },
    {
      id: 'feature_feedback',
      label: isAr ? 'اقتراح ميزة جديدة أو ملاحظات تقنية' : 'Feature Idea or Product Feedback',
      icon: Sparkles
    },
    {
      id: 'press_media',
      label: isAr ? 'استفسارات الصحافة والإعلام' : 'Press, Media & Event Inquiries',
      icon: Mail
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketNum = 'OPF-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket({
        id: ticketNum,
        category: formData.category,
        createdAt: new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        expectedResponse: formData.category === 'report_scam' 
          ? (isAr ? 'خلال ساعتين (أولوية قصوى)' : 'Within 2 hours (Highest Priority)') 
          : (isAr ? 'خلال ساعات العمل الرسمية' : 'Within standard business hours')
      });
      setIsSubmitting(false);
    }, 650);
  };

  const handleCopyTicket = () => {
    if (submittedTicket) {
      navigator.clipboard.writeText(submittedTicket.id);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactFaqs = [
    {
      q: isAr ? 'ما هو وقت الاستجابة المعتاد لرسائل الدعم؟' : 'What is the typical response turnaround time?',
      a: isAr 
        ? 'يقوم فريق دعم العملاء بالقاهرة بمراجعة الرسائل والرد خلال ساعتين كحد أقصى خلال ساعات العمل الرسمية (الأحد إلى الخميس من 9 ص حتى 6 م بتوقيت القاهرة). الإبلاغات عن الوظائف المشبوهة تخضع لفحص فوري طوال أيام الأسبوع.' 
        : 'Our Cairo support team responds within 2 business hours during official working hours (Sun – Thu, 9 AM – 6 PM Cairo time). Scam reports receive immediate priority triage 7 days a week.'
    },
    {
      q: isAr ? 'كيف أبلغ عن شركة طلبت رسوم مقابلة أو استمارة؟' : 'How can I report an employer requesting upfront fees?',
      a: isAr 
        ? 'اختر خيار "إبلاغ عاجل عن وظيفة مشبوهة" من نموذج التواصل واذكر اسم الشركة ورابط الإعلان أو رقم الهاتف. سيقوم فريق النزاهة بالتحقق خلال ساعتين وتجميد حساب الشركة فوراً إذا ثبتت المخالفة.' 
        : 'Select "Report Fake Job or Advance Fee" in the form and attach or describe the company name, phone, or job title. Our safety council audits the posting within 2 hours and issues an immediate ban if verified.'
    },
    {
      q: isAr ? 'هل تقدمون مراجعة شخصية للسيرة الذاتية عبر الهاتف أو المقر؟' : 'Can employers or candidates visit your offices?',
      a: isAr 
        ? 'نعم، نرحب بزيارات أصحاب العمل والمؤسسات بمقرنا في الجريك كامبس (وسط البلد) بعد حجز موعد مسبق عبر البريد partners@opify.careers.' 
        : 'Yes, corporate employers and hiring partners are welcome to visit our offices at The Greek Campus, Downtown Cairo, by prior appointment via partners@opify.careers.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* 1. Header Section */}
      <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isAr ? 'الدعم والتواصل المباشر' : 'Direct Support & Inquiries'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isAr ? 'تواصل مع فريق أوبيفاي في القاهرة' : 'Get in Touch with the Opify Team'}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'سواء كنت باحثاً عن عمل تحتاج لمساعدة، أو شركة ترغب في استقطاب الكفاءات، أو تود الإبلاغ عن وظيفة مشبوهة — نحن هنا لمساعدتك.'
              : 'Whether you need candidate support, employer hiring partnerships, or want to report a suspicious job listing, our Cairo team is ready.'}
          </p>

          {/* Live Status Indicator */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isAr ? 'مكتب الدعم بالقاهرة متاح حالياً • متوسط الرد ١٨ دقيقة' : 'Cairo Support Desk Active • Avg. response time: 18 minutes'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Direct Channels Bar */}
      <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Email Support */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'البريد الإلكتروني' : 'Email Support'}
              </h4>
              <a 
                href="mailto:support@opify.careers" 
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline block truncate mt-0.5"
              >
                support@opify.careers
              </a>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {isAr ? 'متاح طوال أيام الأسبوع' : 'Monitored 7 days a week'}
              </span>
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'الهاتف والواتساب' : 'Phone & WhatsApp'}
              </h4>
              <a 
                href="tel:+201008823419" 
                className="text-xs text-slate-700 dark:text-slate-200 hover:text-blue-600 block truncate mt-0.5 font-mono"
              >
                +20 100 882 3419
              </a>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {isAr ? 'الأحد - الخميس (٩ص - ٦م)' : 'Sun - Thu (9AM - 6PM)'}
              </span>
            </div>
          </div>

          {/* Headquarters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'المقر الرئيسي' : 'Cairo Headquarters'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">
                {isAr ? 'الجريك كامبس، وسط البلد' : 'The Greek Campus, Downtown'}
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {isAr ? 'القاهرة، جمهورية مصر العربية' : 'Cairo, Egypt'}
              </span>
            </div>
          </div>

          {/* Anti-Scam Hotline */}
          <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-red-900 dark:text-red-300">
                {isAr ? 'خط مكافحة الاحتيال' : 'Anti-Scam Hotline'}
              </h4>
              <a 
                href="mailto:safety@opify.careers" 
                className="text-xs text-red-700 dark:text-red-400 hover:underline block truncate mt-0.5 font-medium"
              >
                safety@opify.careers
              </a>
              <span className="text-[10px] text-red-600/80 dark:text-red-400/80 block mt-0.5">
                {isAr ? 'أولوية قصوى على مدار الساعة' : '24/7 Priority Emergency Triage'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Form & Info Grid */}
      <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            {submittedTicket ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {isAr ? 'تم إرسال رسالتك وإنشاء تذكرة المتابعة!' : 'Message Sent & Ticket Created!'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {isAr 
                    ? 'شكراً لتواصلك مع أوبيفاي. تم توجيه طلبك للقسم المختص وسيتواصل معك أحد مسؤولينا عبر البريد الإلكتروني.'
                    : 'Thank you for contacting Opify. Your request has been dispatched to our support team and you will receive an update shortly.'}
                </p>

                {/* Ticket Details Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-left ltr:text-left rtl:text-right space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {isAr ? 'رقم التذكرة:' : 'Ticket Reference:'}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyTicket}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <span>{submittedTicket.id}</span>
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedTicket && (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold text-center">
                      {isAr ? 'تم نسخ رقم التذكرة!' : 'Ticket ID copied to clipboard!'}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-[11px] text-slate-400">{isAr ? 'وقت التسجيل:' : 'Logged at:'}</span>
                    <span>{submittedTicket.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-[11px] text-slate-400">{isAr ? 'الرد المتوقع:' : 'Expected Response:'}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{submittedTicket.expectedResponse}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'seeker_support',
                        priority: 'normal',
                        subject: '',
                        message: ''
                      });
                    }}
                  >
                    {isAr ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onNavigate('home')}
                  >
                    {isAr ? 'العودة للرئيسية' : 'Return to Home'}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isAr ? 'أرسل لنا استفسارك أو طلبك' : 'Send an Inquiry or Feedback'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isAr ? 'يرجى اختيار القسم وتعبئة الحقول لنتمكن من مساعدتك بأسرع شكل ممكن' : 'Please fill in the details below so we can route your ticket to the right specialist'}
                  </p>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {isAr ? 'نوع الاستفسار أو الطلب' : 'Topic / Inquiry Category'} *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {categories.map((c) => {
                      const isSelected = formData.category === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: c.id })}
                          className={`p-2.5 rounded-xl border text-left ltr:text-left rtl:text-right text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`} />
                          <span className="truncate">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'الاسم بالكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? 'مثال: ندى نمر' : 'e.g. Nada Nemr'}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Phone & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'رقم الهاتف / واتساب (اختياري)' : 'Phone / WhatsApp (Optional)'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+20 100 000 0000"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 transition font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isAr ? 'مستوى الأولوية' : 'Urgency Level'}
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 transition"
                    >
                      <option value="normal">{isAr ? 'عادي (خلال ٢٤ ساعة)' : 'Normal (Within 24h)'}</option>
                      <option value="high">{isAr ? 'هام (خلال ٤ ساعات عمل)' : 'High (Within 4 business hours)'}</option>
                      <option value="urgent">{isAr ? 'عاجل جداً (وظيفة احتيالية أو مشكلة دفع)' : 'Urgent (Fraud / Payment Issue)'}</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'عنوان الرسالة' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={isAr ? 'اكتب ملخصاً سريعاً للاستفسار...' : 'Brief summary of your query...'}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'تفاصيل الرسالة' : 'Message Details'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isAr ? 'يرجى كتابة التفاصيل بوضوح...' : 'Please describe your request in detail...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 transition resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isAr ? '🔒 بياناتك محمية ومشفرة وفقاً لسياسة الخصوصية' : '🔒 Secure & confidential data handling'}
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="px-6 font-bold shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>{isAr ? 'جارٍ الإرسال...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <span>{isAr ? 'إرسال الرسالة' : 'Send Message'}</span>
                        <Send className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Location & Hours Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cairo Office Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4 text-slate-900 dark:text-white">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base">
                  {isAr ? 'مكاتب وفروع أوبيفاي في مصر' : 'Opify Egypt Locations'}
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{isAr ? 'المقر الرئيسي (وسط البلد)' : 'Downtown Cairo HQ (The Greek Campus)'}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {isAr ? 'مبنى ٤ب، حرم الجامعة الأمريكية القديم، شارع الفلكي، التحرير، القاهرة.' : 'Building 4B, 28 Falaki Street, Bab El Louk, Downtown Cairo.'}
                  </p>
                  <span className="inline-block mt-1.5 text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                    {isAr ? '🚇 محطة مترو السادات ومحمد نجيب (٥ دقائق مشياً)' : '🚇 Sadat & Mohamed Naguib Metro Stations (5 min walk)'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>{isAr ? 'مجمع التكنولوجيا (القاهرة الجديدة)' : 'New Cairo Innovation Hub'}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {isAr ? 'القطاع الأول، مركز التجمع الخامس التقني، بجوار شارع التسعين الشمالي.' : 'Sector 1, North 90th Street Tech Park, New Cairo.'}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-3">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {isAr ? 'ساعات العمل الرسمية:' : 'Official Business Hours:'}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {isAr ? 'الأحد – الخميس: ٩:٠٠ صباحاً – ٦:٠٠ مساءً بتوقيت القاهرة' : 'Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+2 / Cairo)'}
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">
                    {isAr ? 'الجمعة والسبت: طوارئ الإعلانات المشبوهة فقط' : 'Friday & Saturday: Emergency Anti-Scam triage only'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="p-6 rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-xs">
              <h4 className="font-bold text-sm mb-2">
                {isAr ? 'هل أنت صاحب عمل أو مسؤول توظيف؟' : 'Are You an Employer or Recruiter?'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {isAr 
                  ? 'اكتشف حزم توظيف الشركات، وافحص مرشحين متطابقين جغرافياً، وانشر وظائفك الموثقة.'
                  : 'Explore employer packages, source verified candidates within proximity, and post jobs.'}
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('employers')}
                className="w-full justify-center font-bold"
              >
                <span>{isAr ? 'الانتقال إلى قسم الشركات' : 'Go to Employers Portal'}</span>
                <ArrowRight className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Quick FAQ */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {isAr ? 'أسئلة متكررة حول التواصل والدعم' : 'Contact & Support FAQ'}
          </h3>
        </div>

        <div className="space-y-3">
          {contactFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left ltr:text-left rtl:text-right p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
