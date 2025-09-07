const questions = [
  {
    id: 'energyLevel',
    emoji: '⚡️',
    title: '에너지 레벨',
    options: [
      { value: '아침형인간', label: '#아침형인간' },
      { value: '밤올빼미', label: '#밤올빼미' },
      { value: '에너자이저', label: '#에너자이저' },
      { value: '힐링모드', label: '#힐링모드' },
    ],
  },
  {
    id: 'travelPurpose',
    emoji: '🎯',
    title: '여행 목적',
    options: [
      { value: '핫플탐방러', label: '#핫플탐방러' },
      { value: '현지감성', label: '#현지감성' },
      { value: '맛집러버', label: '#맛집러버' },
      { value: '액티비티광', label: '#액티비티광' },
      { value: '힐링우선', label: '#힐링우선' },
    ],
  },
  {
    id: 'travelPace',
    emoji: '🚀',
    title: '여행 페이스',
    options: [
      { value: '타이트스케줄', label: '#타이트스케줄' },
      { value: '여유만만', label: '#여유만만' },
      { value: '즉흥여행', label: '#즉흥여행' },
      { value: '플랜B준비완료', label: '#플랜B준비완료' },
    ],
  },
  {
    id: 'communicationStyle',
    emoji: '💬',
    title: '소통 스타일',
    options: [
      { value: '수다쟁이', label: '#수다쟁이' },
      { value: '조용한 편', label: '#조용한 편' },
      { value: '리액션킹', label: '#리액션킹' },
      { value: '개인시간존중', label: '#개인시간존중' },
    ],
  },
  {
    id: 'recordingPreference',
    emoji: '📸',
    title: '기록 성향',
    options: [
      { value: '인생샷헌터', label: '#인생샷헌터' },
      { value: '셀카는못참지', label: '#셀카는못참지' },
      { value: '기록좋아', label: '#기록좋아' },
      { value: '눈으로만감상', label: '#눈으로만감상' },
    ],
  },
  {
    id: 'companionStyle',
    emoji: '🤝',
    title: '동행 스타일',
    options: [
      { value: '리더쉽발휘', label: '#리더쉽발휘' },
      { value: '따라가는편', label: '#따라가는편' },
      { value: '의견제시', label: '#의견제시' },
      { value: '분위기메이커', label: '#분위기메이커' },
    ],
  },
  {
    id: 'spendingPattern',
    emoji: '💰',
    title: '소비 패턴',
    options: [
      { value: '가성비추구', label: '#가성비추구' },
      { value: '가치투자', label: '#가치투자' },
      { value: '플렉스', label: '#플렉스' },
    ],
  },
];

export const TRAVEL_STYLE_QUESTIONS = questions;
