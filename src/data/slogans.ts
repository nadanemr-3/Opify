export interface SloganOption {
  id: string;
  key: string;
  nameEn: string;
  nameAr: string;
  en: string;
  ar: string;
  subEn: string;
  subAr: string;
  vibeEn: string;
  vibeAr: string;
  rationaleEn: string;
  rationaleAr: string;
  badgeEn: string;
  badgeAr: string;
}

// Single official and approved brand slogan
export const OFFICIAL_SLOGAN: SloganOption = {
  id: 'closer',
  key: 'closer',
  nameEn: 'Inspiring & Double Meaning (Approved)',
  nameAr: 'شعار أوبيفاي المعتمد',
  en: 'Your Career, Closer Than You Think.',
  ar: 'مسارك المهني، أقرب إليك مما تتخيل',
  subEn: 'Closer Jobs • Smarter Moves • Faster Offers',
  subAr: 'وظائف أقرب • قرارات أذكى • عروض أسرع',
  vibeEn: 'Memorable, clever, and confidence-inspiring',
  vibeAr: 'ذكي، جذاب، ومحفز للثقة والطموح',
  rationaleEn: 'Plays on dual proximity: physically closer to your home/metro route, and temporally closer to your dream offer with AI guidance.',
  rationaleAr: 'تعبير ذكي يحمل معنيين: أقرب مكانياً لمنزلك ومحطات المترو، وأقرب زمنياً لتحقيق حلمك الوظيفي بفضل الذكاء الاصطناعي.',
  badgeEn: 'Approved',
  badgeAr: 'معتمد'
};

export const SLOGAN_OPTIONS: SloganOption[] = [OFFICIAL_SLOGAN];

export const DEFAULT_SLOGAN_ID = 'closer';

export const getSavedCustomSlogan = (): { en: string; ar: string; subEn?: string; subAr?: string } | null => {
  return null;
};

export const saveCustomSlogan = (_custom: { en: string; ar: string; subEn?: string; subAr?: string }): void => {
  // Single fixed slogan locked
};

export const getSavedSloganId = (): string => {
  return DEFAULT_SLOGAN_ID;
};

export const getActiveSloganOption = (): SloganOption => {
  return OFFICIAL_SLOGAN;
};

export const saveSloganOption = (_option: SloganOption): void => {
  // Single fixed slogan locked
};

export const saveSloganId = (_id: string): void => {
  // Single fixed slogan locked
};

