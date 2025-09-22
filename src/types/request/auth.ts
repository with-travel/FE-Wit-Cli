// 로그인 Request 타입
type RequestLogin = {
  email: string;
  password: string;
};

// 회원가입 정보 입력 Request 타입
type ExtraInfo = {
  nickname: string; // Ex:) 검둥이
  birthdate: string; // Ex:) 2000-01-01
  gender: 'MALE' | 'FEMALE'; // Ex:) MALE
  introduction: string; // Ex:) 안녕하세요! 2박 3일 일정으로 부산 가요.
  email: string; // Ex:) test@test.com
  password: string; // Ex:) asdf1234!
  name: string; // Ex:) 홍길동
  phone: string; // Ex:) 010-1234-5678
};

// 설문조사 Request 타입
type Survey = {
  energyLevels: string[];
  travelGoals: string[];
  travelPaces: string[];
  commStyles: string[];
  recordTendencies: string[];
  companionStyles: string[];
  spendPatterns: string[];
};

// 회원가입 api Request 타입
type RequestSignup = {
  extraInfo: ExtraInfo;
  survey: Survey;
};

export type { RequestLogin, RequestSignup, ExtraInfo, Survey };
