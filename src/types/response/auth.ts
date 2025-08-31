type ResponseLogin = {
  accessToken: string;
  refreshToken: string;
  infoChecked: boolean;
};

type ResponseSignup = {
  accessToken: string;
  refreshToken: string;
  infoChecked: boolean;
};

type ResponseGetUserInfo = {
  id: number;
  email: string;
  nickname: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  infoChecked: boolean;
};

export type { ResponseLogin, ResponseSignup, ResponseGetUserInfo };
