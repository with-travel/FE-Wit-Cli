import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { authFlowNavigations } from '../../constants/navigations';
import AuthServerSignupEmailScreen from '@/screens/auth/signup/AuthServerSignupEmailScreen';
import AuthServerSignupAdditionalInfoScreen from '@/screens/auth/signup/AuthServerSignupAdditionalInfoScreen';
import AuthServerSignupPhoneAuthorizationScreen from '@/screens/auth/signup/AuthServerSignupPhoneAuthorizationScreen';
import { colors } from '@/constants/colors';
import { SignupProgressProvider } from '@/components/providers/SignupProgressProvider';

export type SignupFlowStackParamList = {
  [authFlowNavigations.AUTH_SERVER_SIGNUP_EMAIL]: undefined;
  [authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO]: undefined;
  [authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION]: undefined;
};

const SignupStack = createStackNavigator<SignupFlowStackParamList>();

function SignupFlowStackNavigator1() {
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

export default SignupFlowStackNavigator1;
