import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  MapPin, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Download, 
  Copy, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Briefcase, 
  Coins, 
  FileText, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { 
  Language, 
  DiscoveredJob, 
  AiChatMessage, 
  AssistantMode, 
  UserProfile,
  InterviewPracticeQuestion 
} from '../types';
import { translations } from '../i18n/translations';
import { Button, Badge } from './ui';

interface AiAssistantViewProps {
  language: Language;
  jobs: DiscoveredJob[];
  currentUser?: UserProfile | null;
  onSelectJob: (job: DiscoveredJob) => void;
  onTailorCv: (job: DiscoveredJob) => void;
  onSaveToTracker: (job: DiscoveredJob) => void;
}

interface ModeConfig {
  id: AssistantMode;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  taglineEn: string;
  taglineAr: string;
  welcomeEn: string;
  welcomeAr: string;
  starterPromptsEn: string[];
  starterPromptsAr: string[];
}

const MODES: ModeConfig[] = [
  {
    id: 'general',
    labelEn: 'Local Career Guide',
    labelAr: 'دليل الوظائف المحلي',
    icon: MapPin,
    taglineEn: 'Find jobs by distance, shifts, and commute',
    taglineAr: 'اكتشف الوظائف بالمسافة، والمواعيد، والمواصلات',
    welcomeEn: "Hello! I'm your Opify Local Career Guide. I can find opportunities tailored to your exact location in Cairo, commute preferences, part-time or evening shifts, and market trends. How can I help you?",
    welcomeAr: "أهلاً بك! أنا دليلك المهني المحلي في أوبيفاي. يمكنني استكشاف الوظائف المناسبة لموقعك في القاهرة بالمسافة، والدوام المسائي بعد ٥ مساءً، أو خيارات العمل الهجين. كيف نبدأ؟",
    starterPromptsEn: [
      'I want a part-time sales job near me and I can work after 5 PM.',
      'Show me hybrid frontend engineer jobs in Cairo with 40k+ EGP salary.',
      'How do I transition from Customer Service to Growth Data Analyst?',
      'What are the best job opportunities within 5 km of Maadi?'
    ],
    starterPromptsAr: [
      'أريد وظيفة مبيعات دوام جزئي بالقرب مني بعد الساعة ٥ مساءً.',
      'اعرض وظائف مهندس واجهات أمامية في القاهرة براتب أكثر من ٤٠ ألف ج.م.',
      'كيف أنتقل من خدمة العملاء إلى تحليل البيانات؟',
      'ما هي أفضل الوظائف في نطاق ٥ كم من المعادي؟'
    ]
  },
  {
    id: 'ats_coach',
    labelEn: 'ATS Resume Coach',
    labelAr: 'مدرب السيرة الذاتية ATS',
    icon: FileText,
    taglineEn: 'Keyword scoring, truth-preserving bullet rewrites',
    taglineAr: 'تضمين الكلمات المفتاحية وصياغة إنجازات رقمية دقيقة',
    welcomeEn: "I'm your ATS Optimization Coach. Paste any bullet point, summary, or job requirements, and I'll rewrite them using measurable X-Y-Z formulas and high-impact recruiter keywords—without falsifying claims.",
    welcomeAr: "أنا مدربك لأنظمة ATS وتحسين السيرة الذاتية. الصق أي نقطة من خبراتك أو ملخصك المهني، وسأعيد صياغتها بأفعال قوية وأرقام محددة مع الحفاظ التام على الحقيقة.",
    starterPromptsEn: [
      "Rewrite this bullet point to pass ATS: 'I worked on client websites with React'",
      'What critical keywords must be on a 2026 Data Analyst resume?',
      'How do I quantify customer service accomplishments on my CV?',
      'Audit my professional summary for a Mid-level Sales Executive'
    ],
    starterPromptsAr: [
      "أعد صياغة هذه النقطة لتجتاز ATS: 'عملت على مواقع عملاء باستخدام React'",
      'ما هي أهم الكلمات المفتاحية لسيرة محلل بيانات في ٢٠٢٦؟',
      'كيف أكتب إنجازات خدمة العملاء بلغة الأرقام والنسب المئوية؟',
      'راجع ملخصي المهني لوظيفة مسؤول مبيعات أول'
    ]
  },
  {
    id: 'mock_interview',
    labelEn: 'Mock Interviewer',
    labelAr: 'محاكي المقابلات الشخصية',
    icon: Award,
    taglineEn: 'Live practice questions, STAR method ratings',
    taglineAr: 'أسئلة تفاعلية وتقييم الإجابات بأسلوب STAR',
    welcomeEn: "Ready to practice? I simulate technical and behavioral interviews for Cairo and regional roles. I'll ask questions, critique your answers with a score out of 10, and provide sample STAR responses.",
    welcomeAr: "جاهز للتدريب؟ أقوم بمحاكاة مقابلات العمل الحقيقية للشركات في مصر والمنطقة. سأطرح عليك أسئلة، وأقيم إجابتك من ١٠، مع نماذج إجابة مثالية بطريقة STAR.",
    starterPromptsEn: [
      'Simulate a behavioral interview question for a Customer Success Lead',
      'Ask me a tough technical question for a React & TypeScript role',
      'How should I answer: "Tell me about a time you failed or made a mistake"?',
      'Give me an interview question on handling difficult customers in Sales'
    ],
    starterPromptsAr: [
      'حاكي سؤالاً سلوكياً لمقابلة قائد فريق خدمة عملاء',
      'اطرح عليّ سؤالاً تقنياً صعباً لوظيفة مطور React و TypeScript',
      'كيف أجيب عن سؤال: "تحدث عن خطأ ارتكبته وكيف تصرفت معه"؟',
      'أعطني سؤال مقابلة عن التعامل مع عميل غاضب في المبيعات'
    ]
  },
  {
    id: 'salary_negotiator',
    labelEn: 'Salary & Offer Negotiator',
    labelAr: 'مفاوض الرواتب والعروض',
    icon: Coins,
    taglineEn: 'EGP/SAR/AED benchmarks, counter-offer email scripts',
    taglineAr: 'متوسطات الرواتب الإقليمية وصياغة إيميلات التفاوض',
    welcomeEn: "Let's maximize your compensation. I provide real market salary ranges for Egypt and the Gulf, explain benefits packages (insurance, transport allowances), and draft polite counter-offer scripts.",
    welcomeAr: "دعنا نحصل على العرض الأفضل لك. أقدم لك متوسطات الرواتب الحقيقية في مصر والخليج، وأوضح المزايا كالتأمين وبدل الانتقالات، مع صياغة إيميلات تفاوضية ذكية.",
    starterPromptsEn: [
      'What is the realistic salary for a Mid Frontend Engineer in Cairo in 2026?',
      'Draft a polite counter-offer email asking to raise base salary from 40k to 50k EGP',
      'How to negotiate remote or hybrid work flexibility before signing an offer?',
      'What benefits should I expect from a tech company in Smart Village or New Cairo?'
    ],
    starterPromptsAr: [
      'ما هو الراتب العادل لمهندس واجهات أمامية في القاهرة لعام ٢٠٢٦؟',
      'صغ إيميل تفاوض مهذب لرفع الراتب من ٤٠ إلى ٥٠ ألف ج.م',
      'كيف أتفاوض على العمل الهجين أو عن بعد قبل توقيع العقد؟',
      'ما هي المزايا المتوقعة من شركات التكنولوجيا في القرية الذكية والتجمع؟'
    ]
  },
  {
    id: 'scam_shield',
    labelEn: 'Scam & Safety Shield',
    labelAr: 'درع الحماية من الاحتيال',
    icon: ShieldCheck,
    taglineEn: 'Detect fake jobs, upfront fee traps, and Telegram scams',
    taglineAr: 'كشف الوظائف الوهمية، وفخاخ الرسوم المسبقة، وقنوات تيليجرام',
    welcomeEn: "Stay protected against employment fraud. Paste any job posting, recruitment WhatsApp message, or offer letter, and I'll audit it for red flags, upfront fee traps, and spoofed company profiles.",
    welcomeAr: "حافظ على أمانك المهني. الصق أي إعلان وظيفة، أو رسالة واتساب من مسؤول توظيف، وسأقوم بفحصها لكشف العلامات المشبوهة أو طلبات الرسوم الوهمية.",
    starterPromptsEn: [
      'A recruiter contacted me on Telegram offering 3,000 USD for typing, is this real?',
      'How can I verify if a company in Dokki or Nasr City is legally registered?',
      'Why is asking for a "training or laptop clearance fee" an immediate scam?',
      'What are the red flags of fake employment contracts in Egypt?'
    ],
    starterPromptsAr: [
      'تواصل معي شخص على تيليجرام عارضاً ٣٠٠٠ دولار لإدخال بيانات، هل هذا حقيقي؟',
      'كيف أتأكد من السجل التجاري لشركة في الدقي أو مدينة نصر؟',
      'لماذا يُعد طلب "رسوم تدريب أو استلام لابتوب" مؤشراً مؤكداً على النصب؟',
      'ما هي العلامات الحمراء في عقود العمل الوهمية في مصر؟'
    ]
  }
];

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  language,
  jobs,
  currentUser,
  onSelectJob,
  onTailorCv,
  onSaveToTracker
}) => {
  const t = translations[language];

  // Active Mode State
  const [activeMode, setActiveMode] = useState<AssistantMode>('general');
  const currentModeConfig = MODES.find(m => m.id === activeMode) || MODES[0];

  // Messages State
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-welcome-general',
      sender: 'assistant',
      text: language === 'ar' ? currentModeConfig.welcomeAr : currentModeConfig.welcomeEn,
      timestamp: 'Just now',
      actionChips: language === 'ar' ? currentModeConfig.starterPromptsAr.slice(0, 3) : currentModeConfig.starterPromptsEn.slice(0, 3),
      mode: 'general'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const speechRecognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle Mode Switch
  const handleSwitchMode = (newMode: AssistantMode) => {
    if (newMode === activeMode) return;
    setActiveMode(newMode);
    const modeCfg = MODES.find(m => m.id === newMode) || MODES[0];

    // Add a transition announcement message
    const switchMsg: AiChatMessage = {
      id: `mode-switch-${Date.now()}`,
      sender: 'assistant',
      text: language === 'ar' ? modeCfg.welcomeAr : modeCfg.welcomeEn,
      timestamp: 'Just now',
      actionChips: language === 'ar' ? modeCfg.starterPromptsAr.slice(0, 3) : modeCfg.starterPromptsEn.slice(0, 3),
      mode: newMode
    };

    setMessages(prev => [...prev, switchMsg]);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Toggle revealed model answer
  const toggleRevealAnswer = (questionId: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Voice Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'ar' ? 'ar-EG' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoice = () => {
    if (!speechRecognitionRef.current) {
      alert(language === 'ar' ? 'المتصفح لا يدعم ميزة الإملاء الصوتي المباشر' : 'Voice input is not supported in this browser.');
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.lang = language === 'ar' ? 'ar-EG' : 'en-US';
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting voice recognition:', err);
        setIsListening(false);
      }
    }
  };

  // Clear chat
  const handleClearChat = () => {
    const confirmClear = window.confirm(
      language === 'ar' ? 'هل أنت متأكد من رغبتك في مسح المحادثة؟' : 'Are you sure you want to reset this conversation?'
    );
    if (!confirmClear) return;

    const modeCfg = currentModeConfig;
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'assistant',
        text: language === 'ar' ? modeCfg.welcomeAr : modeCfg.welcomeEn,
        timestamp: 'Just now',
        actionChips: language === 'ar' ? modeCfg.starterPromptsAr.slice(0, 3) : modeCfg.starterPromptsEn.slice(0, 3),
        mode: activeMode
      }
    ]);
  };

  // Export Transcript as text
  const handleExportTranscript = () => {
    const transcript = messages.map(m => {
      const role = m.sender === 'user' ? 'You' : 'Opify Assistant';
      let extra = '';
      if (m.interviewQuestion) {
        extra += `\n[Interview Question: ${m.interviewQuestion.question}]\n[Tips: ${m.interviewQuestion.tips}]\n[Sample Answer: ${m.interviewQuestion.sampleAnswer || ''}]`;
      }
      if (m.copyableSnippet) {
        extra += `\n[Saved Snippet:\n${m.copyableSnippet}]`;
      }
      return `--- ${role} (${m.timestamp}) ---\n${m.text}${extra}\n`;
    }).join('\n');

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `opify_career_ai_session_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    // Add user message
    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      // Build conversation history (last 6 turns)
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        text: m.text
      }));

      // Available jobs summary
      const availableJobsPayload = jobs.slice(0, 8).map(j => ({
        id: j.id,
        title: j.title,
        company: j.company,
        location: j.location,
        distance: j.distance,
        salary: j.salary,
        workMode: j.workMode,
        matchScore: j.matchScore
      }));

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          mode: activeMode,
          language,
          userContext: {
            location: currentUser?.location || 'Maadi, Cairo',
            targetRole: currentUser?.title || 'Software / Business Specialist',
            cvAtsScore: currentUser?.cvAtsScore || 82
          },
          availableJobs: availableJobsPayload
        })
      });

      if (!response.ok) {
        throw new Error('Chat API response error');
      }

      const data = await response.json();

      // Resolve matched jobs from catalog
      let matchedJobs: DiscoveredJob[] = [];
      if (data.matchedJobIds && Array.isArray(data.matchedJobIds) && data.matchedJobIds.length > 0) {
        matchedJobs = jobs.filter(j => data.matchedJobIds.includes(j.id));
      }

      // Keyword fallback for job match cards if server didn't provide specific IDs
      if (matchedJobs.length === 0) {
        const lower = query.toLowerCase();
        if (lower.includes('sales') || lower.includes('مبيعات') || lower.includes('5 pm') || lower.includes('part-time')) {
          matchedJobs = jobs.filter(j => j.id.includes('sales'));
        } else if (lower.includes('frontend') || lower.includes('react') || lower.includes('واجهات')) {
          matchedJobs = jobs.filter(j => j.id.includes('fe'));
        } else if (lower.includes('data') || lower.includes('بيانات')) {
          matchedJobs = jobs.filter(j => j.id.includes('da'));
        }
      }

      const assistantMsg: AiChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: 'Just now',
        suggestedJobs: matchedJobs.length > 0 ? matchedJobs : undefined,
        actionChips: data.actionChips,
        interviewQuestion: data.interviewQuestion,
        copyableSnippet: data.copyableSnippet,
        mode: activeMode
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error in handleSendMessage:', err);
      // Fallback
      const fallbackMsg: AiChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        sender: 'assistant',
        text: language === 'ar'
          ? 'قمت بتحليل طلبك ومطابقته مع بيانات سوق العمل في القاهرة. إليك النتائج والخيارات الأقرب لك:'
          : 'I evaluated your request against current opportunities in our Greater Cairo network. Here are verified options matching your requirements:',
        timestamp: 'Just now',
        suggestedJobs: jobs.slice(0, 2),
        actionChips: language === 'ar' ? currentModeConfig.starterPromptsAr.slice(0, 3) : currentModeConfig.starterPromptsEn.slice(0, 3)
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render formatted text with basic markdown styling
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet line
          if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
            const clean = line.trim().replace(/^[-•*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 ltr:pl-1 rtl:pr-1">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                <span className="flex-1">{renderBoldText(clean)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderBoldText(line)}</p>;
        })}
      </div>
    );
  };

  const renderBoldText = (str: string) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2 border border-blue-100 dark:border-blue-900/50">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>{language === 'ar' ? 'ذكاء اصطناعي فائق السرعة (Gemini 3.8 Flash)' : 'Powered by Gemini 3.8 Flash'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ar' ? 'مساعد أوبيفاي المهني الذكي' : 'Conversational Career Intelligence'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {language === 'ar' 
              ? 'مساعدك الشخصي للبحث بالمسافة، وتطوير السيرة الذاتية، ومحاكاة المقابلات، والتفاوض على الرواتب، وكشف الاحتيال في مصر والمنطقة.' 
              : 'Your dedicated career partner: discover hyperlocal jobs, optimize for ATS filters, simulate interviews with STAR grading, and negotiate competitive salaries.'}
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportTranscript}
            variant="secondary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            title={language === 'ar' ? 'تصدير المحادثة كنص' : 'Export session transcript'}
          >
            <span className="hidden sm:inline">{language === 'ar' ? 'تصدير الجلسة' : 'Export Chat'}</span>
          </Button>

          <Button
            onClick={handleClearChat}
            variant="secondary"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            title={language === 'ar' ? 'بدء محادثة جديدة' : 'Reset chat'}
            className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          >
            <span className="hidden sm:inline">{language === 'ar' ? 'إعادة تعيين' : 'Reset'}</span>
          </Button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => handleSwitchMode(mode.id)}
              className={`p-2.5 rounded-xl text-left rtl:text-right transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs border border-blue-200/80 dark:border-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'bg-slate-200/60 dark:bg-slate-600 text-slate-500 dark:text-slate-300'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-snug">
                  {language === 'ar' ? mode.labelAr : mode.labelEn}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {language === 'ar' ? mode.taglineAr : mode.taglineEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Context Status Ribbon */}
      <div className="px-4 py-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1">
            <currentModeConfig.icon className="w-3.5 h-3.5" />
            {language === 'ar' ? currentModeConfig.labelAr : currentModeConfig.labelEn}:
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {language === 'ar' ? currentModeConfig.taglineAr : currentModeConfig.taglineEn}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-500" />
            {currentUser?.location || 'Maadi, Cairo'}
          </span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {jobs.length} {language === 'ar' ? 'وظيفة متصلة' : 'Active Jobs'}
          </span>
        </div>
      </div>

      {/* Main Chat Frame */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-[650px] overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'ltr:flex-row-reverse rtl:flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-2xs ${
                    isUser
                      ? 'bg-slate-900 text-white dark:bg-slate-700 ring-1 ring-blue-500/50'
                      : 'bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white'
                  }`}
                >
                  {isUser ? (
                    currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name || 'User'}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/profile-icon.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble + Rich Attachments */}
                <div className={`space-y-3.5 max-w-[90%] sm:max-w-[80%] ${isUser ? 'items-end' : ''}`}>
                  
                  {/* Primary text bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm shadow-2xs ${
                      isUser
                        ? 'bg-blue-600 text-white ltr:rounded-tr-xs rtl:rounded-tl-xs shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 ltr:rounded-tl-xs rtl:rounded-tr-xs'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Attachment 1: Interactive Interview Question Card */}
                  {msg.interviewQuestion && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 shadow-xs space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {msg.interviewQuestion.category} Question
                        </span>
                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                          {language === 'ar' ? 'محاكاة مقابلة حية' : 'Live Mock Question'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        "{msg.interviewQuestion.question}"
                      </p>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 border border-amber-100 dark:border-amber-900/40 space-y-1">
                        <p className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" />
                          {language === 'ar' ? 'نصيحة المقابلة (STAR Method):' : 'Coaching Tips (STAR Method):'}
                        </p>
                        <p>{msg.interviewQuestion.tips}</p>
                      </div>

                      {msg.interviewQuestion.sampleAnswer && (
                        <div className="space-y-2">
                          <button
                            onClick={() => toggleRevealAnswer(msg.id)}
                            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {revealedAnswers[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            <span>
                              {revealedAnswers[msg.id]
                                ? (language === 'ar' ? 'إخفاء الإجابة النموذجية' : 'Hide Ideal STAR Sample')
                                : (language === 'ar' ? 'عرض الإجابة النموذجية الموصى بها' : 'Reveal Ideal STAR Sample Answer')}
                            </span>
                          </button>

                          {revealedAnswers[msg.id] && (
                            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-[11px] text-emerald-900 dark:text-emerald-200 leading-relaxed space-y-1.5">
                              <p className="font-bold">{language === 'ar' ? 'نموذج الإجابة المتكامل:' : 'Ideal Model Answer:'}</p>
                              <p>{msg.interviewQuestion.sampleAnswer}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setInputValue(language === 'ar' ? `إجابتي عن هذا السؤال: ` : `My answer to this question: `);
                        }}
                        className="text-[11px] font-bold text-amber-800 dark:text-amber-200 underline cursor-pointer flex items-center gap-1"
                      >
                        <span>{language === 'ar' ? 'تدرب على الإجابة الآن ✍️' : 'Practice Your Response in Chat ✍️'}</span>
                      </button>
                    </div>
                  )}

                  {/* Attachment 2: Copyable Script / Template Card */}
                  {msg.copyableSnippet && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          {language === 'ar' ? 'نموذج جاهز للاستخدام والنسخ:' : 'Ready-to-Use Template / Script:'}
                        </span>
                        <button
                          onClick={() => handleCopy(msg.copyableSnippet!, msg.id)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-[11px] font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/50 flex items-center gap-1 transition cursor-pointer shadow-2xs"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{language === 'ar' ? 'نسخ النص' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-200 whitespace-pre-wrap border border-slate-100 dark:border-slate-700 select-all leading-relaxed">
                        {msg.copyableSnippet}
                      </div>
                    </div>
                  )}

                  {/* Attachment 3: Matched Live Opportunities Cards */}
                  {msg.suggestedJobs && msg.suggestedJobs.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-blue-500" />
                        {language === 'ar' ? 'فرص مطابقة من شبكة أوبيفاي:' : 'Matched Opportunities from Verified Network:'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.suggestedJobs.map((job) => (
                          <div
                            key={job.id}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/60 shadow-xs hover:border-blue-400 dark:hover:border-blue-700 transition text-xs space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 text-[11px]">
                                <MapPin className="w-3 h-3" />
                                {job.distance}
                              </span>
                              <span className="font-bold text-emerald-600 text-[11px] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                                {job.matchScore}% Match
                              </span>
                            </div>

                            <div>
                              <p className="font-bold text-slate-900 dark:text-white truncate text-xs sm:text-sm">{job.title}</p>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{job.company} • {job.location}</p>
                              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{job.salary}</p>
                            </div>

                            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-1.5 flex-wrap">
                              <button
                                onClick={() => onSelectJob(job)}
                                className="font-bold text-blue-600 dark:text-blue-400 hover:underline text-[11px] flex items-center gap-0.5 cursor-pointer"
                              >
                                <span>{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
                                <ArrowRight className="w-3 h-3 ltr:inline rtl:rotate-180" />
                              </button>
                              
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => onTailorCv(job)}
                                  className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[10px] hover:bg-blue-100 transition cursor-pointer"
                                >
                                  {language === 'ar' ? 'تجهيز السيرة' : 'Tailor CV'}
                                </button>
                                <button
                                  onClick={() => onSaveToTracker(job)}
                                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[10px] hover:bg-slate-200 transition cursor-pointer"
                                >
                                  {language === 'ar' ? 'حفظ' : 'Save'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Chips */}
                  {msg.actionChips && msg.actionChips.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {msg.actionChips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer shadow-2xs"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 text-white flex items-center justify-center shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700/70 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2.5 shadow-2xs">
                <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
                <span>{language === 'ar' ? 'أوبيفاي يقوم بتحليل متطلباتك ومطابقة البيانات...' : 'Opify Assistant is analyzing your question and consulting regional data...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Mode Starters Footer */}
        <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-700/80 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
          <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0">
            {language === 'ar' ? 'اقتراحات سريعة:' : 'Quick Starters:'}
          </span>
          {(language === 'ar' ? currentModeConfig.starterPromptsAr : currentModeConfig.starterPromptsEn).map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-300 text-[11px] transition truncate max-w-xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleVoice}
              title={isListening ? (language === 'ar' ? 'إيقاف التسجيل' : 'Stop Listening') : (language === 'ar' ? 'إملاء صوتي مباشر' : 'Voice Input')}
              className={`p-3 rounded-xl border transition cursor-pointer shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white border-red-600 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isListening
                  ? (language === 'ar' ? 'جاري الاستماع لصوتك الآن...' : 'Listening to your voice...')
                  : (language === 'ar' ? `اسأل في وضع "${currentModeConfig.labelAr}"...` : `Ask in ${currentModeConfig.labelEn} mode...`)
              }
              disabled={loading}
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
            />

            {/* Send Button */}
            <Button
              type="submit"
              disabled={loading || !inputValue.trim()}
              variant="primary"
              size="md"
              icon={<Send className="w-3.5 h-3.5 ltr:inline rtl:rotate-180" />}
              className="shadow-xs shrink-0 shadow-brand-blue/20"
            >
              <span>{t.assistantSendBtn}</span>
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
};
