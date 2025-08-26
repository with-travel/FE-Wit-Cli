import { axiosInstance } from './axios';

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
  const response = await axiosInstance.get(
    `/auth/duplicate-check/email?email=${email}`,
  );
  return response.data;
};

export { duplicateCheckNickName, duplicateCheckEmail };
