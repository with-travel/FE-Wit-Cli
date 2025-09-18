import { RequestLogin, RequestSignup } from '@/types/request/auth';
import { axiosInstance } from './axios';
import {
  ResponseLogin,
  ResponseProfile,
  ResponseToken,
} from '@/types/response/auth';
import { storageKeys } from '@/constants';
import { loadToken } from '@/utils/keychain';

//닉네임 체크
const duplicateCheckNickName = async (nickname: string): Promise<boolean> => {
  const { data } = await axiosInstance.get(
    '/api/v1/signup/member/nickname/duplicate',
    {
      params: {
        nickname,
      },
    },
  );
  return data;
};

//이메일 체크
const duplicateCheckEmail = async (email: string): Promise<boolean> => {
  const { data } = await axiosInstance.get('/api/v1/signup/check-email', {
    params: {
      email,
    },
  });
  return data;
};

//로그인
const postLogin = async (body: RequestLogin): Promise<ResponseLogin> => {
  const { data } = await axiosInstance.post('/api/v1/login', body);
  return data;
};

//회원가입
const postSignup = async (body: RequestSignup) => {
  const { data } = await axiosInstance.post('/api/v1/signup', body);

  return data;
};

//유저 정보 조회
const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.get('/api/v1/user-info');

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await loadToken(storageKeys.REFRESH_TOKEN);

  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

export {
  duplicateCheckNickName,
  duplicateCheckEmail,
  postLogin,
  postSignup,
  getProfile,
  getAccessToken,
};
