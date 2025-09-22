import { createStackNavigator } from '@react-navigation/stack';
import { authNavigations } from '../../constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import { colors } from '@/constants/colors';
import { useForm, FormProvider } from 'react-hook-form';
import AuthServerLoginScreen from '@/screens/auth/signin/AuthServerLoginScreen';
import SignupFlowStackNavigator1, {
  SignupFlowStackParamList,
} from './SignupFlowStackNavigator1';
import SignupFlowStackNavigator2, {
  TravelFormStackParamList,
} from './SignupFlowStackNavigator2';
import { AuthFormValues } from '@/types/form/auth';

// 타입 재export (다른 파일에서 사용할 수 있도록)
export type {
  SignupFlowStackParamList,
  TravelFormStackParamList,
  AuthFormValues,
};

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.AUTH_SERVER_LOGIN]: undefined;
  [authNavigations.AUTH_SIGNUP_FLOW_STACK]: undefined;
  [authNavigations.AUTH_TRAVEL_FORM_STACK]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  const methods = useForm<AuthFormValues>({
    mode: 'onChange',
    defaultValues: {
      // extraInfo 구조 (실제 API로 전송되는 데이터)
      extraInfo: {
        email: '', // Ex:) test@test.com
        password: '', // Ex:) asdf1234!
        nickname: '', // Ex:) 검둥이
        name: '', // Ex:) 홍길동
        birthdate: '', // Ex:) 2000-01-01 (YYYY-MM-DD 형식)
        gender: 'MALE', // 기본값을 영어로 설정
        phone: '', // Ex:) 010-1234-5678
        introduction: '', // Ex:) 안녕하세요! 2박 3일 일정으로 부산 가요.
      },

      // survey 구조 (실제 API로 전송되는 데이터)
      survey: {
        energyLevels: [],
        travelGoals: [],
        travelPaces: [],
        commStyles: [],
        recordTendencies: [],
        companionStyles: [],
        spendPatterns: [],
      },

      // 폼 검증용 필드 (API에 전송되지 않음)
      passwordConfirm: '',
      authCode: '',
    },
  });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.UNCHANGED_WHITE,
          },
        }}
      >
        {/* 로그인 홈 화면 */}
        <Stack.Screen
          name={authNavigations.AUTH_HOME}
          component={AuthHomeScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* 서버 로그인 화면 */}
        <Stack.Screen
          name={authNavigations.AUTH_SERVER_LOGIN}
          component={AuthServerLoginScreen}
          options={{
            headerShown: true,
            headerTitle: '로그인',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />

        {/* 회원가입 Flow 1 : 이메일 입력, 추가 정보 입력, 휴대폰 인증 */}
        <Stack.Screen
          name={authNavigations.AUTH_SIGNUP_FLOW_STACK}
          component={SignupFlowStackNavigator1}
          options={{
            headerShown: false,
          }}
        />

        {/* 회원가입 Flow 2 : 여행 설문 체크, 여행 설문 입력 */}
        <Stack.Screen
          name={authNavigations.AUTH_TRAVEL_FORM_STACK}
          component={SignupFlowStackNavigator2}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </FormProvider>
  );
}

export default AuthStackNavigator;
