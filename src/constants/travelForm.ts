const questions = [
  {
    id: 'energyLevel',
    emoji: '⚡️',
    title: '에너지 레벨',
    options: [
      { id: 'morning', label: '#아침형인간' },
      { id: 'night', label: '#밤올빼미' },
      { id: 'energizer', label: '#에너자이저' },
      { id: 'healing', label: '#힐링모드' },
    ],
  },
  {
    id: 'travelPurpose',
    emoji: '🎯',
    title: '여행 목적',
    options: [
      { id: 'hotspot', label: '#핫플탐방러' },
      { id: 'local', label: '#현지감성' },
      { id: 'foodie', label: '#맛집러버' },
      { id: 'activity', label: '#액티비티광' },
      { id: 'healing_first', label: '#힐링우선' },
    ],
  },
  {
    id: 'travelPace',
    emoji: '🚀',
    title: '여행 페이스',
    options: [
      { id: 'tight', label: '#타이트스케줄' },
      { id: 'relaxed', label: '#여유만만' },
      { id: 'spontaneous', label: '#즉흥여행' },
      { id: 'plan_b', label: '#플랜B준비완료' },
    ],
  },
  {
    id: 'communicationStyle',
    emoji: '💬',
    title: '소통 스타일',
    options: [
      { id: 'chatty', label: '#수다쟁이' },
      { id: 'quiet', label: '#조용한 편' },
      { id: 'reaction', label: '#리액션킹' },
      { id: 'respect', label: '#개인시간존중' },
    ],
  },
  {
    id: 'recordingPreference',
    emoji: '📸',
    title: '기록 성향',
    options: [
      { id: 'pro_photographer', label: '#인생샷헌터' },
      { id: 'selfie', label: '#셀카는못참지' },
      { id: 'recorder', label: '#기록좋아' },
      { id: 'in_my_eyes', label: '#눈으로만감상' },
    ],
  },
  {
    id: 'companionStyle',
    emoji: '🤝',
    title: '동행 스타일',
    options: [
      { id: 'leader', label: '#리더쉽발휘' },
      { id: 'follower', label: '#따라가는편' },
      { id: 'opinionated', label: '#의견제시' },
      { id: 'mood_maker', label: '#분위기메이커' },
    ],
  },
  {
    id: 'spendingPattern',
    emoji: '💰',
    title: '소비 패턴',
    options: [
      { id: 'cost_effective', label: '#가성비추구' },
      { id: 'value_investor', label: '#가치투자' },
      { id: 'flex', label: '#플렉스' },
    ],
  },
];

export const TRAVEL_STYLE_QUESTIONS = questions.map(question => ({
  ...question,
  options: question.options.map(option => ({
    ...option,
    id: option.label,
  })),
}));
