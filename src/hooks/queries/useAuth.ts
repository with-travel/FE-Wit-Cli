import { getAccessToken, getProfile, postLogin, postSignup } from '@/api/auth';
import { queryClient } from '@/api/queryClient';
import { numbers } from '@/constants';
import { queryKeys, storageKeys } from '@/constants/keys';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';
import { ResponseProfile, ResponseToken } from '@/types/response/auth';
import { removeHeader, setHeader } from '@/utils';
import { clearToken, saveToken } from '@/utils/keychain';
import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

//정보 조회 hook
function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

// //로그인 hook
function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    throwOnError: error => Number(error.response?.status) >= 500,
    onSuccess: ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      saveToken(storageKeys.REFRESH_TOKEN, refreshToken);
      saveToken(storageKeys.ACCESS_TOKEN, accessToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useGetRefreshToken() {
  const { data, error, isSuccess, isError, isPending } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      saveToken(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      clearToken(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return { isSuccess, isError, isPending };
}

//회원가입 hook
function usePostSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useAuth() {
  const { data } = useGetProfile();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const emailLoginMutation = useEmailLogin();
  const signupMutation = usePostSignup();

  return {
    auth: {
      id: data?.id ?? 0,
      nickname: data?.nickname ?? '',
      email: data?.email ?? '',
      infoChecked: data?.infoChecked ?? false,
      birthDate: data?.birthDate ?? '',
      gender: data?.gender ?? '',
    },
    emailLoginMutation,
    signupMutation,
  };
}

export default useAuth;
