import { authNavigations } from '@/constants/navigations';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type AuthServerSignupPhoneAuthorizationScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION
>;

function AuthServerSignupPhoneAuthorizationScreen({
  navigation,
}: AuthServerSignupPhoneAuthorizationScreenProps) {
  return <View></View>;
}

const styles = StyleSheet.create({});

export default AuthServerSignupPhoneAuthorizationScreen;
