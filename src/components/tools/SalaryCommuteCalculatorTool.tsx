import React, { useState, useMemo } from 'react';
import { 
  Banknote, 
  Car, 
  Train, 
  Bus, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Compass,
  Briefcase
} from 'lucide-react';
import { Language } from '../../types';

interface SalaryCommuteCalculatorToolProps {
  language: Language;
  onNavigateToJobs?: (filters?: any) => void;
}

export const SalaryCommuteCalculatorTool: React.FC<SalaryCommuteCalculatorToolProps> = ({
  language,
  onNavigateToJobs
}) => {
  const isAr = language === 'ar';

  // Primary Inputs
  const [grossSalary, setGrossSalary] = useState<number>(14000);
  const [workDaysPerMonth, setWorkDaysPerMonth] = useState<number>(22);
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(8);
  const [commuteMode, setCommuteMode] = useState<'metro' | 'bus' | 'uber' | 'car' | 'walk'>('metro');
  const [customCommuteCostPerDay, setCustomCommuteCostPerDay] = useState<number>(24);
  const [commuteMinutesOneWay, setCommuteMinutesOneWay] = useState<number>(45);
  const [hasSocialInsurance, setHasSocialInsurance] = useState<boolean>(true);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Comparison Job Offer State
  const [showComparison, setShowComparison] = useState<boolean>(true);
  const [compGrossSalary, setCompGrossSalary] = useState<number>(11500);
  const [compCommuteMinutes, setCompCommuteMinutes] = useState<number>(15);
  const [compCommuteCostPerDay, setCompCommuteCostPerDay] = useState<number>(8);

  // Preset Mode Cost defaults
  const handleModeChange = (mode: 'metro' | 'bus' | 'uber' | 'car' | 'walk') => {
    setCommuteMode(mode);
    if (mode === 'metro') {
      setCustomCommuteCostPerDay(20); // 2 tickets @ 10 EGP
      setCommuteMinutesOneWay(40);
    } else if (mode === 'bus') {
      setCustomCommuteCostPerDay(24); // 2 microbus trips @ 12 EGP
      setCommuteMinutesOneWay(55);
    } else if (mode === 'uber') {
      setCustomCommuteCostPerDay(180); // 2 trips @ 90 EGP
      setCommuteMinutesOneWay(35);
    } else if (mode === 'car') {
      setCustomCommuteCostPerDay(95); // ~6 Liters Octane 92 + parking
      setCommuteMinutesOneWay(45);
    } else if (mode === 'walk') {
      setCustomCommuteCostPerDay(0);
      setCommuteMinutesOneWay(10);
    }
  };

  // Egyptian Payroll Tax & Social Insurance Calculation (Law 91 amended 2024)
  const calculateEgyptianNet = (gross: number, insured: boolean) => {
    // 1. Social Insurance (Employee 11% up to statutory cap of 12,600 EGP)
    const insuranceCap = 12600;
    const insurableWage = Math.min(gross, insuranceCap);
    const socialInsurance = insured ? Math.round(insurableWage * 0.11) : 0;

    // 2. Personal Exemption (20,000 EGP annually = ~1,666.67 monthly)
    const monthlyExemption = 20000 / 12;

    // 3. Annualized Taxable Base
    const taxableMonthly = Math.max(0, gross - socialInsurance - monthlyExemption);
    const taxableAnnual = taxableMonthly * 12;

    // Progressive Brackets (Annual):
    // 0 to 40k: 0%
    // 40k to 55k: 10%
    // 55k to 70k: 15%
    // 70k to 200k: 20%
    // 200k to 400k: 22.5%
    // 400k to 1.2M: 25%
    // > 1.2M: 27.5%
    let annualTax = 0;
    let rem = taxableAnnual;

    if (rem > 40000) {
      const b1 = Math.min(rem - 40000, 15000); // 40,000 to 55,000
      annualTax += b1 * 0.10;
    }
    if (rem > 55000) {
      const b2 = Math.min(rem - 55000, 15000); // 55,000 to 70,000
      annualTax += b2 * 0.15;
    }
    if (rem > 70000) {
      const b3 = Math.min(rem - 70000, 130000); // 70,000 to 200,000
      annualTax += b3 * 0.20;
    }
    if (rem > 200000) {
      const b4 = Math.min(rem - 200000, 200000); // 200,000 to 400,000
      annualTax += b4 * 0.225;
    }
    if (rem > 400000) {
      const b5 = Math.min(rem - 400000, 800000); // 400,000 to 1.2M
      annualTax += b5 * 0.25;
    }
    if (rem > 1200000) {
      annualTax += (rem - 1200000) * 0.275;
    }

    const monthlyIncomeTax = Math.round(annualTax / 12);
    // Martyrs / Handicapped Fund (0.05% on gross)
    const martyrsFund = Math.round(gross * 0.0005);

    const totalDeductions = socialInsurance + monthlyIncomeTax + martyrsFund;
    const netSalary = Math.max(0, gross - totalDeductions);

    return {
      gross,
      socialInsurance,
      monthlyIncomeTax,
      martyrsFund,
      totalDeductions,
      netSalary
    };
  };

  // Calculations for Primary Job
  const primaryPayroll = useMemo(() => {
    return calculateEgyptianNet(grossSalary, hasSocialInsurance);
  }, [grossSalary, hasSocialInsurance]);

  const monthlyCommuteCost = useMemo(() => {
    return customCommuteCostPerDay * workDaysPerMonth;
  }, [customCommuteCostPerDay, workDaysPerMonth]);

  const netInPocketCash = useMemo(() => {
    return Math.max(0, primaryPayroll.netSalary - monthlyCommuteCost);
  }, [primaryPayroll.netSalary, monthlyCommuteCost]);

  const monthlyCommuteHours = useMemo(() => {
    return ((commuteMinutesOneWay * 2) / 60) * workDaysPerMonth;
  }, [commuteMinutesOneWay, workDaysPerMonth]);

  const monthlyWorkHours = useMemo(() => {
    return workHoursPerDay * workDaysPerMonth;
  }, [workHoursPerDay, workDaysPerMonth]);

  const realHourlyWage = useMemo(() => {
    const totalCommittedHours = monthlyWorkHours + monthlyCommuteHours;
    if (totalCommittedHours <= 0) return 0;
    return Math.round((netInPocketCash / totalCommittedHours) * 10) / 10;
  }, [netInPocketCash, monthlyWorkHours, monthlyCommuteHours]);

  // Calculations for Comparison Job
  const compPayroll = useMemo(() => {
    return calculateEgyptianNet(compGrossSalary, hasSocialInsurance);
  }, [compGrossSalary, hasSocialInsurance]);

  const compMonthlyCommuteCost = useMemo(() => {
    return compCommuteCostPerDay * workDaysPerMonth;
  }, [compCommuteCostPerDay, workDaysPerMonth]);

  const compNetInPocketCash = useMemo(() => {
    return Math.max(0, compPayroll.netSalary - compMonthlyCommuteCost);
  }, [compPayroll.netSalary, compMonthlyCommuteCost]);

  const compMonthlyCommuteHours = useMemo(() => {
    return ((compCommuteMinutes * 2) / 60) * workDaysPerMonth;
  }, [compCommuteMinutes, workDaysPerMonth]);

  const compRealHourlyWage = useMemo(() => {
    const totalHours = monthlyWorkHours + compMonthlyCommuteHours;
    if (totalHours <= 0) return 0;
    return Math.round((compNetInPocketCash / totalHours) * 10) / 10;
  }, [compNetInPocketCash, monthlyWorkHours, compMonthlyCommuteHours]);

  const handleCopySummary = () => {
    const text = isAr
      ? `ملخص حساب الراتب والمواصلات (أوبيفاي):
الراتب الإجمالي: ${grossSalary.toLocaleString()} ج.م
التأمينات الاجتماعية (11%): ${primaryPayroll.socialInsurance.toLocaleString()} ج.م
ضريبة الدخل التقريبية (قانون 91): ${primaryPayroll.monthlyIncomeTax.toLocaleString()} ج.م
صافي الراتب المحول للبنك: ${primaryPayroll.netSalary.toLocaleString()} ج.م
مصاريف المواصلات الشهرية: ${monthlyCommuteCost.toLocaleString()} ج.م (${customCommuteCostPerDay} ج.م/يوم)
الوقت الضائع في الطريق: ${Math.round(monthlyCommuteHours)} ساعة شهرياً
الراتب الصافي الفعلي في الجيب: ${netInPocketCash.toLocaleString()} ج.م
القيمة الحقيقية لكل ساعة من حياتك: ${realHourlyWage} ج.م/ساعة`
      : `Opify Egyptian Salary & Commute Breakdown:
Gross Salary: ${grossSalary.toLocaleString()} EGP
Social Insurance (11%): ${primaryPayroll.socialInsurance.toLocaleString()} EGP
Est. Income Tax (Law 91): ${primaryPayroll.monthlyIncomeTax.toLocaleString()} EGP
Net Salary to Bank: ${primaryPayroll.netSalary.toLocaleString()} EGP
Monthly Commute Cost: ${monthlyCommuteCost.toLocaleString()} EGP (${customCommuteCostPerDay} EGP/day)
Monthly Hours Lost in Transit: ${Math.round(monthlyCommuteHours)} hrs
Real In-Pocket Cash: ${netInPocketCash.toLocaleString()} EGP
Real Value Per Hour of Life: ${realHourlyWage} EGP/hr`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>{isAr ? 'حاسبة الراتب وسوق العمل المصري 2024' : 'Egyptian 2024 Market & Commute Radar'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isAr ? 'حاسبة صافي الراتب والقيمة الحقيقية لكل ساعة' : 'Real Net Salary & Commute Value Calculator'}
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            {isAr 
              ? 'لا تنخدع بالراتب الإجمالي الكبير البعيد! اكتشف صافي الراتب بعد الضرائب والتأمينات، وما يتبقى في جيبك فعلياً بعد حرق البنزين وساعات زحام القاهرة.'
              : 'Never judge a job by gross pay alone. Calculate true net take-home after Egyptian taxes & social insurance, minus commute cash and lost traffic hours.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Real Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Gross Pay & Taxes */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Banknote className="w-5 h-5 text-blue-600" />
                <span>{isAr ? '1. الراتب الإجمالي والتأمينات' : '1. Gross Salary & Taxes'}</span>
              </h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {isAr ? 'قانون الضرائب 91 لسنة 2024' : 'Egypt Law 91 (2024)'}
              </span>
            </div>

            {/* Gross Salary Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label htmlFor="gross-salary-input" className="text-slate-700 dark:text-slate-200">
                  {isAr ? 'الراتب الإجمالي الشهري (EGP)' : 'Monthly Gross Salary (EGP)'}
                </label>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {grossSalary.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <input
                id="gross-salary-input"
                type="range"
                min={3500}
                max={60000}
                step={500}
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>3,500</span>
                <span>15,000</span>
                <span>30,000</span>
                <span>60,000+</span>
              </div>
            </div>

            {/* Social Insurance Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {isAr ? 'تأمين اجتماعي مسجل (11%)' : 'Registered Social Insurance (11%)'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'حصة الموظف الرسمية حتى الحد الأقصى 12,600 ج.م' : 'Employee statutory share (max cap 12,600 EGP)'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasSocialInsurance(!hasSocialInsurance)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  hasSocialInsurance ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    hasSocialInsurance 
                      ? (isAr ? '-translate-x-5' : 'translate-x-5') 
                      : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Card 2: Commute Parameters */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Car className="w-5 h-5 text-indigo-600" />
                <span>{isAr ? '2. وسيلة وتكلفة المواصلات' : '2. Commute & Transit Details'}</span>
              </h3>
              <span className="text-xs text-slate-500">
                {workDaysPerMonth} {isAr ? 'يوم عمل/شهر' : 'workdays/mo'}
              </span>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'metro', label: isAr ? 'مترو الأنفاق' : 'Metro', icon: Train },
                { id: 'bus', label: isAr ? 'ميكروباص/نقل' : 'Microbus', icon: Bus },
                { id: 'uber', label: isAr ? 'أوبر/إن درايف' : 'Uber / App', icon: Car },
                { id: 'car', label: isAr ? 'سيارة خاصة' : 'Own Car', icon: Car },
                { id: 'walk', label: isAr ? 'مشي/عجلة' : 'Walk / Bike', icon: Compass },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id as any)}
                  className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                    commuteMode === m.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  <span className="text-[11px] truncate w-full">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Commute Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{isAr ? 'التكلفة اليومية (ذهاب وعودة)' : 'Daily Cost (Round Trip)'}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{customCommuteCostPerDay} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={350}
                  step={5}
                  value={customCommuteCostPerDay}
                  onChange={(e) => setCustomCommuteCostPerDay(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{isAr ? 'وقت الطريق (ذهاب فقط)' : 'One-way Travel Time'}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{commuteMinutesOneWay} {isAr ? 'دقيقة' : 'min'}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={120}
                  step={5}
                  value={commuteMinutesOneWay}
                  onChange={(e) => setCommuteMinutesOneWay(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Head-to-Head Comparison with a Closer Job */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {isAr ? 'قارن مع عرض عمل أقرب لمنزلك' : 'Compare with a Closer Job Offer'}
                </span>
              </div>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {showComparison ? (isAr ? 'إخفاء المقارنة' : 'Hide') : (isAr ? 'إظهار المقارنة' : 'Compare')}
              </button>
            </div>

            {showComparison && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'الراتب الإجمالي للعرض الثاني' : 'Offer B Gross Pay'}
                  </label>
                  <input
                    type="number"
                    value={compGrossSalary}
                    onChange={(e) => setCompGrossSalary(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'وقت المشوار (دقيقة)' : 'Commute (minutes)'}
                  </label>
                  <input
                    type="number"
                    value={compCommuteMinutes}
                    onChange={(e) => setCompCommuteMinutes(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'المواصلات اليومية (ج.م)' : 'Daily Transit (EGP)'}
                  </label>
                  <input
                    type="number"
                    value={compCommuteCostPerDay}
                    onChange={(e) => setCompCommuteCostPerDay(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Verdict Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-500/30 p-6 shadow-md space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {isAr ? 'الصافي الحقيقي في جيبك شهرياً' : 'Real In-Pocket Net Cash'}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                  {netInPocketCash.toLocaleString()} <span className="text-lg font-bold text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                </div>
              </div>
              <button
                onClick={handleCopySummary}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                title={isAr ? 'نسخ التقرير' : 'Copy Breakdown'}
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Metrics Triad */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                  {isAr ? 'قيمة كل ساعة من حياتك' : 'Real Value Per Hour'}
                </div>
                <div className="text-xl font-black text-blue-900 dark:text-blue-100 mt-0.5">
                  {realHourlyWage} <span className="text-xs font-medium">{isAr ? 'ج.م/ساعة' : 'EGP/h'}</span>
                </div>
                <div className="text-[10px] text-blue-600/80 dark:text-blue-300/70 mt-1">
                  {isAr ? 'شاملة ساعات الزحام' : 'Includes commute time'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
                <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                  {isAr ? 'الوقت الضائع شهرياً' : 'Lost in Transit'}
                </div>
                <div className="text-xl font-black text-amber-900 dark:text-amber-100 mt-0.5">
                  {Math.round(monthlyCommuteHours)} <span className="text-xs font-medium">{isAr ? 'ساعة' : 'hrs'}</span>
                </div>
                <div className="text-[10px] text-amber-600/80 dark:text-amber-300/70 mt-1">
                  {Math.round(monthlyCommuteHours * 12 / 24)} {isAr ? 'يوم كامل سنوياً في الطريق' : 'full days/yr in traffic'}
                </div>
              </div>
            </div>

            {/* Detailed Deductions Breakdown */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{isAr ? 'الراتب الإجمالي المعلن:' : 'Gross Stated Salary:'}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">{grossSalary.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
              <div className="flex justify-between text-rose-600 dark:text-rose-400">
                <span>{isAr ? 'تأمينات اجتماعية (11% حصة الموظف):' : 'Social Insurance (11%):'}</span>
                <span className="font-semibold">-{primaryPayroll.socialInsurance.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
              <div className="flex justify-between text-rose-600 dark:text-rose-400">
                <span>{isAr ? 'ضريبة الدخل التقديرية (قانون 91):' : 'Income Tax (Law 91):'}</span>
                <span className="font-semibold">-{primaryPayroll.monthlyIncomeTax.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold border-t border-dashed border-slate-200 dark:border-slate-800 pt-1.5">
                <span>{isAr ? 'صافي الراتب المحول للبنك:' : 'Net Bank Transfer:'}</span>
                <span>{primaryPayroll.netSalary.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>{isAr ? 'تكلفة المواصلات الشهرية:' : 'Monthly Commute Cash:'}</span>
                <span className="font-semibold">-{monthlyCommuteCost.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
            </div>

            {/* Smart Comparison Verdict Banner */}
            {showComparison && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                compRealHourlyWage > realHourlyWage
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'نتيجة المقارنة الذكية:' : 'Smart Comparison Verdict:'}</span>
                </div>
                {compRealHourlyWage > realHourlyWage ? (
                  <p>
                    {isAr ? (
                      <>
                        العرض الأقرب بمرتب <strong>{compGrossSalary.toLocaleString()} ج.م</strong> يعطيك 
                        <strong className="text-emerald-700 dark:text-emerald-300"> {compRealHourlyWage} ج.م/ساعة </strong> 
                        وهو أعلى فعلياً من العرض البعيد (<strong>{realHourlyWage} ج.م/ساعة</strong>)، 
                        مع توفير <strong>{Math.round(monthlyCommuteHours - compMonthlyCommuteHours)} ساعة شهرياً</strong> لصحتك وأسرتك!
                      </>
                    ) : (
                      <>
                        The closer job at <strong>{compGrossSalary.toLocaleString()} EGP</strong> delivers 
                        <strong className="text-emerald-700 dark:text-emerald-300"> {compRealHourlyWage} EGP/hr </strong>
                        which actually beats the further job (<strong>{realHourlyWage} EGP/hr</strong>) while saving 
                        <strong> {Math.round(monthlyCommuteHours - compMonthlyCommuteHours)} hours per month</strong> in traffic!
                      </>
                    )}
                  </p>
                ) : (
                  <p>
                    {isAr ? (
                      <>
                        العرض الأول يحتفظ بقيمة صافية أعلى لكل ساعة ({realHourlyWage} ج.م/ساعة مقابل {compRealHourlyWage} ج.م/ساعة). تأكد فقط أن مسافة الطريق مقبولة لطاقتك اليومية.
                      </>
                    ) : (
                      <>
                        The primary offer holds a higher net value per hour ({realHourlyWage} vs {compRealHourlyWage} EGP/hr). Just ensure the commute is sustainable.
                      </>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action to find nearby jobs */}
          {onNavigateToJobs && (
            <button
              onClick={() => onNavigateToJobs({ location: 'near' })}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition cursor-pointer"
            >
              <span>{isAr ? 'ابحث عن وظائف في محيط 5 كم من بيتك' : 'Explore Jobs Within 5km of Home'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
};
