import { getUserInfo, postLogin } from '@/api/auth';
import { queryClient } from '@/api/queryClient';
import { queryKeys } from '@/constants/keys';
import { mainTabNavigations } from '@/constants/navigations';
import { ResponseLogin } from '@/types/response/auth';
import { setHeader } from '@/utils';
import { loadTokens, saveTokens } from '@/utils/keychain';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';

function useGetUserInfo() {
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
  });
}

function usePostLogin() {
  const navigation = useNavigation();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken, infoChecked }: ResponseLogin) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      saveTokens({ access: accessToken, refresh: refreshToken });
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
      });
    },
  });
}

function useAuth() {
  const { data } = useGetUserInfo();
  const loginMutation = usePostLogin();

  return {
    auth: {
      id: data?.id ?? 0,
      nickname: data?.nickname ?? '',
    },
  };
}

export default useAuth;
