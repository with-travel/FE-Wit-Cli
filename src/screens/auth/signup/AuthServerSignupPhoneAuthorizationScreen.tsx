import ProgressStepBar from '@/components/auth/ProgressStepBar';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { authFlowNavigations } from '@/constants/navigations';
import {
  AuthStackParamList,
  SignupFlowStackParamList,
} from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthServerSignupPhoneAuthorizationScreenProps = StackScreenProps<
  SignupFlowStackParamList,
  typeof authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION
>;

function AuthServerSignupPhoneAuthorizationScreen({
  navigation,
}: AuthServerSignupPhoneAuthorizationScreenProps) {
  useAttachStep(3); // ✅
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>

      <Pressable onPress={() => navigation.goBack()}>
        <Text>이전</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push}>
        <Text>다음3</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthServerSignupPhoneAuthorizationScreen;
