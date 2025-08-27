type LoginRequest = {
  email: string;
  password: string;
};

type SignupRequest = {
  email: string;
  password: string;
};

type UserInfoSignupRequest = {
  extraInfo: {
    nickname: string;
    name: string;
    gender: 'MALE' | 'FEMALE';
    birthDate: string;
    introduction: string;
  };
  survey: {};
};

export type { LoginRequest, SignupRequest, UserInfoSignupRequest };
