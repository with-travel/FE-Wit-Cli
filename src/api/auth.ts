import { RequestLogin, RequestSignup } from '@/types/request/auth';
import { axiosInstance } from './axios';
import {
  ResponseGetUserInfo,
  ResponseLogin,
  ResponseSignup,
} from '@/types/response/auth';

const duplicateCheckNickName = async (nickname: string): Promise<boolean> => {
  const response = await axiosInstance.get(
    '/api/v1/signup/member/nickname/duplicate',
    {
      params: {
        nickname,
      },
    },
  );
  return response.data;
};

const duplicateCheckEmail = async (email: string) => {
  const response = await axiosInstance.get(`/api/v1/auth/email-available`, {
    params: {
      email,
    },
  });
  return response.data;
};

const postLogin = async (body: RequestLogin): Promise<ResponseLogin> => {
  const response = await axiosInstance.post('/api/v1/auth/login', body);
  return response.data;
};

const postSignup = async (body: RequestSignup): Promise<ResponseSignup> => {
  const response = await axiosInstance.post('/api/v1/auth/signup', body);

  return response.data;
};

const getUserInfo = async (): Promise<ResponseGetUserInfo> => {
  const response = await axiosInstance.get('/auth/user-info');
  return response.data;
};

export {
  duplicateCheckNickName,
  duplicateCheckEmail,
  postLogin,
  postSignup,
  getUserInfo,
};
