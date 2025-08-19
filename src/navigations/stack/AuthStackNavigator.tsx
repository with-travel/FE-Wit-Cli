import { createStackNavigator } from '@react-navigation/stack';
import { authNavigations } from '../../constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import AuthServerSignupEmailScreen from '@/screens/auth/signup/AuthServerSignupEmailScreen';
import AuthServerSignupAdditionalInfoScreen from '@/screens/auth/signup/AuthServerSignupAdditionalInfoScreen';
import AuthServerSignupPhoneAuthorizationScreen from '@/screens/auth/signup/AuthServerSignupPhoneAuthorizationScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.AUTH_SERVER_SIGNUP_EMAIL]: undefined;
  [authNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO]: undefined;
  [authNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
        name={authNavigations.AUTH_SERVER_SIGNUP_EMAIL}
        component={AuthServerSignupEmailScreen}
        options={{
          headerShown: false,
          animation: 'none',
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
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
