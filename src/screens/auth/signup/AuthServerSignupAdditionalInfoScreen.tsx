import { authNavigations } from '@/constants/navigations';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type AuthServerSignupAdditionalInfoScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO
>;

function AuthServerSignupAdditionalInfoScreen({
  navigation,
}: AuthServerSignupAdditionalInfoScreenProps) {
  return <View></View>;
}

const styles = StyleSheet.create({});

export default AuthServerSignupAdditionalInfoScreen;
