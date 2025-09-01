import { getUserInfo, postLogin, postSignup } from '@/api/auth';
import { queryClient } from '@/api/queryClient';
import { queryKeys } from '@/constants/keys';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';
import { ResponseGetUserInfo, ResponseLogin } from '@/types/response/auth';
import { setHeader } from '@/utils';
import { loadTokens, saveTokens } from '@/utils/keychain';
import { useMutation, useQuery } from '@tanstack/react-query';

function useGetUserInfo(
  queryOptions?: UseQueryCustomOptions<ResponseGetUserInfo>,
) {
  return useQuery({
    queryFn: getUserInfo,
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    enabled: Boolean(loadTokens()),
    ...queryOptions,
  });
}

function usePostLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }: ResponseLogin) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      saveTokens({ access: accessToken, refresh: refreshToken });
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
      });
    },
    ...mutationOptions,
  });
}

function usePostSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: ({ accessToken, refreshToken }: ResponseLogin) => {
      // 반환값: accessToken, refreshToken, infoChecked
      setHeader('Authorization', `Bearer ${accessToken}`);
      saveTokens({ access: accessToken, refresh: refreshToken });
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
      });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const { data } = useGetUserInfo();
  const loginMutation = usePostLogin();
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
    loginMutation,
    signupMutation,
  };
}

export default useAuth;
