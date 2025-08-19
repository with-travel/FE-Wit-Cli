import { createStackNavigator } from '@react-navigation/stack';
import {
  authFlowNavigations,
  authNavigations,
} from '../../constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import AuthServerSignupEmailScreen from '@/screens/auth/signup/AuthServerSignupEmailScreen';
import AuthServerSignupAdditionalInfoScreen from '@/screens/auth/signup/AuthServerSignupAdditionalInfoScreen';
import AuthServerSignupPhoneAuthorizationScreen from '@/screens/auth/signup/AuthServerSignupPhoneAuthorizationScreen';
import { colors } from '@/constants/colors';
import { SignupProgressProvider } from '@/components/providers/SignupProgressProvider';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.AUTH_SIGNUP_FLOW_STACK]: undefined;
  // [authNavigations.AUTH_SERVER_SIGNUP_EMAIL]: undefined;
  // [authNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO]: undefined;
  // [authNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION]: undefined;
};

export type SignupFlowStackParamList = {
  [authFlowNavigations.AUTH_SERVER_SIGNUP_EMAIL]: undefined;
  [authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO]: undefined;
  [authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const SignupStack = createStackNavigator<SignupFlowStackParamList>();

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

function AuthStackNavigator() {
  return (
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
        name={authNavigations.AUTH_SIGNUP_FLOW_STACK}
        component={SignupFlowNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
          name={authNavigations.AUTH_SERVER_SIGNUP_EMAIL}
          component={AuthServerSignupEmailScreen}
          options={{
            headerShown: true,
            headerTitle: '회원가입',
            // animation: 'none',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen
          name={authNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO}
          component={AuthServerSignupAdditionalInfoScreen}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={authNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION}
          component={AuthServerSignupPhoneAuthorizationScreen}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        /> */}
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
