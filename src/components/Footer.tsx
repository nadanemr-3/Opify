import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Sun, 
  Moon, 
  ArrowUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { OpifyLogo } from './OpifyLogo';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface FooterProps {
  language: Language;
  onNavigate: (tabId: string, params?: any) => void;
  activeSloganText?: string;
  onLanguageChange?: (lang: Language) => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  language, 
  onNavigate, 
  activeSloganText,
  onLanguageChange,
  theme,
  onToggleTheme
}) => {
  const isAr = language === 'ar';

  // Legal & Safety Modals
  type ActiveModalType = 'privacy' | 'terms' | 'anti-scam' | null;
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="opify-global-footer" 
      className="bg-slate-950 text-slate-400 border-t border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Main Grid: Brand + 3 Link Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* 1. Brand Area */}
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-block">
              <OpifyLogo size="sm" theme="dark" />
            </div>
            
            <p className="text-sm font-semibold text-slate-200 tracking-tight">
              {activeSloganText || (isAr ? 'مسارك المهني، أقرب مما تتخيل.' : 'Your Career, Closer Than You Think.')}
            </p>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isAr 
                ? 'أدوات مدعومة بالذكاء الاصطناعي لمساعدتك في العثور على فرص أفضل وفهمها والتقديم عليها.' 
                : 'AI-powered tools to help you find, understand and apply to better opportunities.'}
            </p>
          </div>

          {/* 2. Link Groups (7 columns on large screens: 3 groups) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Group 1: For Job Seekers */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                {isAr ? 'للباحثين عن عمل' : 'For Job Seekers'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('jobs')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'الوظائف' : 'Jobs'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('tracker')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'متابع الطلبات' : 'Job Tracker'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('assistant')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'المساعد المهني' : 'Career Assistant'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Group 2: AI Tools */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                {isAr ? 'أدوات الذكاء الاصطناعي' : 'AI Tools'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('cv-optimizer')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'السيرة الذاتية' : 'Resume'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('decoder')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'محلل الوظائف' : 'Job Analyzer'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('tools', { initialToolId: 'salary-calc' })} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'حاسبة الراتب' : 'Salary Calculator'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('tools', { initialToolId: 'cover-letter' })} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'خطاب التقديم' : 'Cover Letter'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => setActiveModal('anti-scam')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'كشف الوظائف الوهمية' : 'Scam Detection'}
                  </button>
                </li>
                <li className="pt-0.5">
                  <button 
                    type="button"
                    onClick={() => onNavigate('tools')} 
                    className="text-blue-500 hover:text-blue-400 font-medium inline-flex items-center gap-1 transition-colors duration-150 cursor-pointer"
                  >
                    <span>{isAr ? 'تصفح جميع الأدوات' : 'Browse All Tools'}</span>
                    <span className="ltr:inline rtl:hidden">→</span>
                    <span className="ltr:hidden rtl:inline">←</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Group 3: Company */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                {isAr ? 'الشركة' : 'Company'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('about')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'عن أوبيفاي' : 'About Opify'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('contact')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'اتصل بالدعم' : 'Contact Support'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => onNavigate('employers')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'أوبيفاي للشركات' : 'Opify for Employers'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => setActiveModal('privacy')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => setActiveModal('terms')} 
                    className="text-slate-400 hover:text-white transition-colors duration-150 text-left rtl:text-right block cursor-pointer"
                  >
                    {isAr ? 'شروط الخدمة' : 'Terms of Service'}
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Left: Copyright */}
          <div>
            <span>© 2026 Opify Inc. • {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          </div>

          {/* Right: Controls & Back to top */}
          <div className="flex items-center gap-3">
            {/* Arabic / English language control */}
            {onLanguageChange && (
              <button
                type="button"
                id="footer-lang-switcher"
                onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-white border border-slate-800/80 transition cursor-pointer"
                title={isAr ? 'Switch to English' : 'التحويل للعربية'}
              >
                {isAr ? 'English' : 'العربية'}
              </button>
            )}

            {/* Optional theme control */}
            {onToggleTheme && (
              <button
                type="button"
                id="footer-theme-toggle"
                onClick={onToggleTheme}
                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/80 transition cursor-pointer"
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                )}
              </button>
            )}

            {/* Back to top icon control */}
            <button
              type="button"
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/80 transition-colors duration-150 cursor-pointer flex items-center justify-center"
              aria-label={isAr ? 'العودة للأعلى' : 'Back to top'}
              title={isAr ? 'العودة للأعلى' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>{isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy & Data Protection'}</span>
          </div>
        }
        description={
          isAr 
            ? 'التزام أوبيفاي بحماية بيانات الباحثين عن عمل والشركات وفقاً للقانون المصري رقم ١٥١ لسنة ٢٠٢٠.' 
            : 'Opify’s commitment to candidate confidentiality and Egyptian Data Protection standards.'
        }
        size="lg"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl text-blue-800 dark:text-blue-300">
            <strong>{isAr ? 'مبدأ الأمان الأساسي:' : 'Core Security Guarantee:'}</strong> {isAr 
              ? 'سيرتك الذاتية وبيانات تواصلك لا تباع أبداً لأي جهات تسويقية خارجية، ولا يتم كشفها للشركات إلا بموافقتك عند التقديم.' 
              : 'Your resume, phone number, and location preferences are NEVER sold to advertisers or third parties. Employers only receive contact information when you explicitly submit an application.'}
          </div>

          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {isAr ? '١. جمع البيانات واستخدامها' : '1. Information We Collect'}
          </h5>
          <p>
            {isAr 
              ? 'نقوم بتخزين تفضيلات النطاق الجغرافي والمهارات المذكورة في سيرتك الذاتية لغرض المطابقة الحسابية فقط.' 
              : 'We collect your job preferences, commute radii, and resume text exclusively to run local ATS matching calculations.'}
          </p>

          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {isAr ? '٢. معالجة الذكاء الاصطناعي الآمنة' : '2. Secure AI Processing'}
          </h5>
          <p>
            {isAr 
              ? 'يتم فحص الوصف الوظيفي والسيرة الذاتية عبر خوادم آمنة مشفرة بدون استخدام نصوصك لتدريب نماذج عامة وبدون تسريب أي بيانات تعريفية.' 
              : 'Resume analysis and job description decodings use enterprise-grade encrypted server routes. Your private data is not retained for model training.'}
          </p>

          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {isAr ? '٣. حق حذف البيانات' : '3. Data Retention & Right to be Forgotten'}
          </h5>
          <p>
            {isAr 
              ? 'يحق لك في أي وقت حذف حسابك وسيرتك الذاتية بالكامل من لوحة التحكم، وسيتم محوها فوراً من جميع سجلات المنصة.' 
              : 'You have full autonomy to export or delete your profile, resume uploads, and application records instantly from your profile settings.'}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" size="sm" onClick={() => setActiveModal(null)}>
            {isAr ? 'فهمت ذلك' : 'Understood'}
          </Button>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>{isAr ? 'شروط الخدمة والاستخدام' : 'Terms of Service'}</span>
          </div>
        }
        description={
          isAr 
            ? 'المبادئ والقواعد المنظمة لاستخدام منصة أوبيفاي من قبل المتقدمين وأصحاب العمل.' 
            : 'Rules, candidate protection guarantees, and employer responsibilities on Opify.'
        }
        size="lg"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {isAr ? '١. التقديم العادل والنزيه' : '1. Truthful Candidate Submissions'}
          </h5>
          <p>
            {isAr 
              ? 'تلتزم أوبيفاي بتقديم تحسينات للسيرة الذاتية تعكس الحقائق الواقعية فقط، ويتحمل المتقدم مسؤولية صحة المؤهلات والشهادات المقدمة.' 
              : 'Opify provides truth-preserving CV optimization. Candidates remain responsible for the factual accuracy of their verified work experience.'}
          </p>

          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {isAr ? '٢. التزامات أصحاب العمل والشركات' : '2. Employer Obligations'}
          </h5>
          <p>
            {isAr 
              ? 'يُحظر تماماً على أي شركة طلب مبالغ مالية تحت أي مسمى (رسوم مقابلة، رسوم تدريب، رسوم استمارة)، ويؤدي ذلك للحظر الفوري والإبلاغ القانوني.' 
              : 'Employers are strictly prohibited from demanding any upfront fees or recruitment charges from candidates. Violators face permanent bans.'}
          </p>

          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
            {isAr ? '٣. شفافية الرواتب وأوقات التنقل' : '3. Salary & Commute Transparency'}
          </h5>
          <p>
            {isAr 
              ? 'تلتزم المنصة بتوضيح نطاق الرواتب الصافية وتكاليف الانتقال اليومية لتوفير بيئة عمل واضحة وعادلة للطرفين.' 
              : 'Listings must accurately reflect realistic compensation and workplace arrangements (On-site, Hybrid, or Remote).'}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" size="sm" onClick={() => setActiveModal(null)}>
            {isAr ? 'موافق' : 'Accept Terms'}
          </Button>
        </div>
      </Modal>

      {/* Anti-Scam & Zero Fee Modal */}
      <Modal
        isOpen={activeModal === 'anti-scam'}
        onClose={() => setActiveModal(null)}
        title={
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{isAr ? 'درع الأمان ومكافحة الوظائف الوهمية' : 'Anti-Scam & Zero Fee Guarantee'}</span>
          </div>
        }
        description={
          isAr 
            ? 'معايير أوبيفاي لحماية الشباب المصري من شركات التوظيف الوهمية ومكاتب السمسرة.' 
            : 'Our verification matrix protecting Egyptian job seekers from fraudulent postings and recruitment fees.'
        }
        size="lg"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isAr ? '١. ممنوع أي رسوم تقديم إطلاقاً' : '1. Zero Upfront Fees — Zero Tolerance'}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {isAr 
                  ? 'إذا طلبت منك أي جهة "رسوم تأمين" أو "رسوم مقابلة"، بلغنا فوراً لاتخاذ الإجراءات القانونية وحظر الشركة.' 
                  : 'If any employer asks for application fees or interview fees, report them immediately. It is strictly prohibited.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>{isAr ? '٢. التحقق من المقر الحقيقي والسجل التجاري' : '2. Real Office & Commercial Registration Audit'}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {isAr 
                  ? 'يتم التحقق من وجود مقر حقيقي للشركة داخل مصر، والتأكد من توافر هاتف أرضي وموقع إلكتروني معتمد.' 
                  : 'We cross-reference company registries, corporate domains, and verified physical addresses.'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setActiveModal(null);
              onNavigate('contact', { category: 'report_scam' });
            }}
            className="text-xs text-red-500 hover:text-red-400 underline font-semibold cursor-pointer"
          >
            {isAr ? 'الإبلاغ عن وظيفة مشبوهة' : 'Report a Suspicious Posting'}
          </button>
          <Button variant="primary" size="sm" onClick={() => setActiveModal(null)}>
            {isAr ? 'إغلاق' : 'Got it'}
          </Button>
        </div>
      </Modal>

    </footer>
  );
};
