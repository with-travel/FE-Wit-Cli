type RequestLogin = {
  email: string;
  password: string;
};

type ExtraInfo = {
  nickname: string;
  birthdate: string;
  gender: 'MALE' | 'FEMALE';
  introduction: string;
  email: string;
  password: string;
  name: string;
  phone: string;
};

type Survey = {
  energyLevels: string;
  travelGoals: string;
  travelPaces: string;
  commStyles: string;
  recordTendencies: string;
  companionStyles: string;
  spendPatterns: string;
};

type RequestSignup = {
  extraInfo: ExtraInfo;
  survey: Survey;
};

export type { RequestLogin, RequestSignup, ExtraInfo, Survey };
