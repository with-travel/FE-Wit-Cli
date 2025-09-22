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
      console.log('🔐 토큰 저장 중...', {
        accessToken: accessToken ? '존재함' : '없음',
        refreshToken: refreshToken ? '존재함' : '없음',
      });

      try {
        setHeader('Authorization', `Bearer ${accessToken}`);
        saveToken(storageKeys.REFRESH_TOKEN, refreshToken);
        saveToken(storageKeys.ACCESS_TOKEN, accessToken);
        console.log('✅ 토큰 저장 완료');
      } catch (saveError) {
        console.error('❌ 토큰 저장 실패:', saveError);
      }
    },
    onSettled: () => {
      console.log('🔄 쿼리 캐시 무효화 중...');
      try {
        queryClient.refetchQueries({
          queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        });
        console.log('✅ 쿼리 캐시 무효화 완료');
      } catch (cacheError) {
        console.error('❌ 쿼리 캐시 무효화 실패:', cacheError);
      }
    },
    onError: error => {
      console.error('❌ 로그인 mutation 실패:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    },
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useGetRefreshToken() {
  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log('🔄 토큰 갱신 성공, 헤더 및 토큰 업데이트 중...');
      try {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        saveToken(storageKeys.REFRESH_TOKEN, data.refreshToken);
        console.log('✅ 토큰 갱신 완료');
      } catch (tokenError) {
        console.error('❌ 토큰 갱신 실패:', tokenError);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('❌ 토큰 갱신 실패, 인증 정보 정리 중...');
      try {
        removeHeader('Authorization');
        clearToken(storageKeys.REFRESH_TOKEN);
        clearToken(storageKeys.ACCESS_TOKEN);
        console.log('✅ 인증 정보 정리 완료');
      } catch (clearError) {
        console.error('❌ 인증 정보 정리 실패:', clearError);
      }
    }
  }, [isError]);

  return { isSuccess, isError, isPending };
}

//회원가입 hook
function usePostSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    onSuccess: data => {
      console.log('✅ 회원가입 API 성공:', data);
    },
    onError: error => {
      console.error('❌ 회원가입 API 실패:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const emailLoginMutation = useEmailLogin();
  const signupMutation = usePostSignup();

  return {
    auth: {
      id: getProfileQuery.data?.id ?? 0,
      nickname: getProfileQuery.data?.nickname ?? '',
      email: getProfileQuery.data?.email ?? '',
      infoChecked: getProfileQuery.data?.infoChecked ?? false,
      birthdate: getProfileQuery.data?.birthDate ?? '', // ResponseProfile의 birthDate를 AuthFormValues의 birthdate로 매핑
      gender: getProfileQuery.data?.gender ?? '',
    },
    isLogin,
    emailLoginMutation,
    signupMutation,
  };
}

export default useAuth;
