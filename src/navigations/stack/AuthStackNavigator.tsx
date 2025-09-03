import { createStackNavigator } from '@react-navigation/stack';
import {
  authFlowNavigations,
  authNavigations,
  travelFormNavigations,
} from '../../constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import AuthServerSignupEmailScreen from '@/screens/auth/signup/AuthServerSignupEmailScreen';
import AuthServerSignupAdditionalInfoScreen from '@/screens/auth/signup/AuthServerSignupAdditionalInfoScreen';
import AuthServerSignupPhoneAuthorizationScreen from '@/screens/auth/signup/AuthServerSignupPhoneAuthorizationScreen';
import { colors } from '@/constants/colors';
import { SignupProgressProvider } from '@/components/providers/SignupProgressProvider';
import AuthTravelFormCheckScreen from '@/screens/auth/travelform/AuthTravelFormCheckScreen';
import AuthTravelFormIntroduceScreen from '@/screens/auth/travelform/AuthTravelFormIntroduceScreen';
import { useForm, FormProvider } from 'react-hook-form';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from '@react-native-vector-icons/feather';
import AuthServerLoginScreen from '@/screens/auth/signin/AuthServerLoginScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.AUTH_SERVER_LOGIN]: undefined;
  [authNavigations.AUTH_SIGNUP_FLOW_STACK]: undefined;
  [authNavigations.AUTH_TRAVEL_FORM_STACK]: undefined;
};

export type SignupFlowStackParamList = {
  [authFlowNavigations.AUTH_SERVER_SIGNUP_EMAIL]: undefined;
  [authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO]: undefined;
  [authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION]: undefined;
};

export type TravelFormStackParamList = {
  [travelFormNavigations.AUTH_TRAVEL_FORM_CHECK]: undefined;
  [travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const SignupStack = createStackNavigator<SignupFlowStackParamList>();

const TravelFormStack = createStackNavigator<TravelFormStackParamList>();

function SignupFlowNavigator() {
  return (
    <SignupProgressProvider totalSteps={3}>
      <SignupStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.UNCHANGED_WHITE,
          },
        }}
      >
        <SignupStack.Screen
          name={authFlowNavigations.AUTH_SERVER_SIGNUP_EMAIL}
          component={AuthServerSignupEmailScreen}
          options={{
            headerShown: true,
            headerTitle: '회원가입',
            animation: 'none',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <SignupStack.Screen
          name={authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO}
          component={AuthServerSignupAdditionalInfoScreen}
          options={{
            headerShown: true,
            headerTitle: '회원가입',
            animation: 'none',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <SignupStack.Screen
          name={authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION}
          component={AuthServerSignupPhoneAuthorizationScreen}
          options={{
            headerShown: true,
            headerTitle: '회원가입',
            animation: 'none',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
      </SignupStack.Navigator>
    </SignupProgressProvider>
  );
}

function TravelFormNavigator() {
  const navigation = useNavigation();
  return (
    <SignupProgressProvider totalSteps={2}>
      <TravelFormStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.UNCHANGED_WHITE,
          },
        }}
      >
        <TravelFormStack.Screen
          name={travelFormNavigations.AUTH_TRAVEL_FORM_CHECK}
          component={AuthTravelFormCheckScreen}
          options={{
            headerShown: true,
            headerTitle: '여행 설문',
            animation: 'none',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={24}
                  color={colors.UNCHANGED_BLACK}
                />
              </Pressable>
            ),
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <TravelFormStack.Screen
          name={travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE}
          component={AuthTravelFormIntroduceScreen}
          options={{
            headerShown: true,
            headerTitle: '여행 설문',
            animation: 'none',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
      </TravelFormStack.Navigator>
    </SignupProgressProvider>
  );
}

function AuthStackNavigator() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      name: '',
      birth: '',
      gender: '',
      phoneNumber: '',
      authCode: '',
      surveys: {
        answer: [],
      },
      introduce: '',
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
        <Stack.Screen
          name={authNavigations.AUTH_HOME}
          component={AuthHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={authNavigations.AUTH_SERVER_LOGIN}
          component={AuthServerLoginScreen}
          options={{
            headerShown: true,
            headerTitle: '로그인',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen
          name={authNavigations.AUTH_SIGNUP_FLOW_STACK}
          component={SignupFlowNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={authNavigations.AUTH_TRAVEL_FORM_STACK}
          component={TravelFormNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </FormProvider>
  );
}

export default AuthStackNavigator;
