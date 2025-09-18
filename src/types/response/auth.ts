type ResponseLogin = {
  accessToken: string;
  refreshToken: string;
  infoChecked: boolean;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

type ResponseSignup = {};

type ResponseProfile = {
  id: number;
  email: string;
  nickname: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  infoChecked: boolean;
};

export type { ResponseLogin, ResponseSignup, ResponseProfile, ResponseToken };
