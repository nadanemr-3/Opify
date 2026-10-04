import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Search, 
  ThumbsUp, 
  Building2, 
  Star, 
  Clock, 
  Plus, 
  Sparkles, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { InterviewInsight, Language } from '../types';
import { translations } from '../i18n/translations';

interface CommunityInsightsViewProps {
  language: Language;
  insights: InterviewInsight[];
  onAddInsight: (insight: InterviewInsight) => void;
  onUpvote: (id: string) => void;
}

export const CommunityInsightsView: React.FC<CommunityInsightsViewProps> = ({
  language,
  insights,
  onAddInsight,
  onUpvote
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form state for new feedback submission
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('Cairo / Remote');
  const [difficulty, setDifficulty] = useState(3.5);
  const [timelineWeeks, setTimelineWeeks] = useState(3);
  const [stagesText, setStagesText] = useState('1. HR Screen\n2. Technical Task\n3. Engineering Lead Chat');
  const [questionText, setQuestionText] = useState('Explain React reconciliation and state batching.');
  const [insiderTips, setInsiderTips] = useState('');

  // Keyboard Escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSubmitModal) {
        setShowSubmitModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSubmitModal]);

  const filteredInsights = insights.filter((i) => 
    i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.insiderTips.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newInsight: InterviewInsight = {
      id: `insight-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      difficulty,
      outcome: 'Received Offer',
      timelineWeeks,
      stages: stagesText.split('\n').filter(Boolean),
      questionsAsked: [
        {
          category: 'Technical',
          question: questionText.trim() || 'Tell us about a technical challenge you resolved.'
        }
      ],
      insiderTips: insiderTips.trim() || 'Review core domain fundamentals and be honest about what you know and do not know.',
      submittedAt: 'Just now',
      helpfulCount: 1
    };

    onAddInsight(newInsight);
    setShowSubmitModal(false);
    setCompany('');
    setRole('');
    setInsiderTips('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.communityTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.communitySubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 rtl:left-auto rtl:right-3" />
            <input
              id="search-insights-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or role..."
              className="text-xs pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            id="share-experience-btn"
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t.shareExperienceBtn}</span>
          </button>
        </div>
      </div>

      {/* Insights List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights.map((insight) => (
          <div 
            key={insight.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-600 transition"
          >
            <div>
              {/* Card Header: Company, Role, Outcome */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-1.5 font-extrabold text-sm text-slate-900 dark:text-white">
                    <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>{insight.company}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 leading-snug">
                    {insight.role}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {insight.location} • {insight.submittedAt}
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  {insight.outcome}
                </span>
              </div>

              {/* Quick Metrics: Difficulty & Timeline */}
              <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold block">
                    {t.difficulty}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{insight.difficulty} / 5</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold block">
                    {t.timeline}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>~{insight.timelineWeeks} weeks</span>
                  </div>
                </div>
              </div>

              {/* Stages */}
              <div className="space-y-1.5 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.rounds} ({insight.stages.length}):
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  {insight.stages.map((stage, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400 shrink-0" />
                      <span>{stage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real Questions Asked */}
              {insight.questionsAsked.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t.commonQuestions}:
                  </span>
                  {insight.questionsAsked.map((q, qIdx) => (
                    <div key={qIdx} className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg text-xs border border-slate-100 dark:border-slate-700/60">
                      <span className="font-semibold text-teal-800 dark:text-teal-300 block text-[11px]">
                        [{q.category}]
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 mt-0.5 italic">
                        "{q.question}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Insider Tip */}
              <div className="mt-3 p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800/60 text-xs">
                <span className="font-bold text-teal-900 dark:text-teal-200 block mb-0.5">
                  💡 {t.insiderTipsHeading}:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insight.insiderTips}
                </p>
              </div>
            </div>

            {/* Bottom: Upvote */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <button
                onClick={() => onUpvote(insight.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-300 transition cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{t.helpful} ({insight.helpfulCount})</span>
              </button>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                Verified Community Member
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowSubmitModal(false)}
        >
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-submit-title"
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 dark:border-slate-700 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 id="community-submit-title" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                {t.shareExperienceBtn}
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Noon, Careem"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Difficulty (1 to 5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Timeline (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={timelineWeeks}
                    onChange={(e) => setTimelineWeeks(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interview Rounds / Stages (one per line)</label>
                <textarea
                  value={stagesText}
                  onChange={(e) => setStagesText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Real Question Asked</label>
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g. How do you handle caching in Next.js?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Tip for the Next Candidate</label>
                <textarea
                  value={insiderTips}
                  onChange={(e) => setInsiderTips(e.target.value)}
                  rows={2}
                  placeholder="What would have helped you prepare better?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold transition cursor-pointer"
                >
                  Submit Anonymously
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
