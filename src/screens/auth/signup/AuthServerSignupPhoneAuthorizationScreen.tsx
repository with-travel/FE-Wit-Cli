import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { colors } from '@/constants/colors';
import { authFlowNavigations, authNavigations } from '@/constants/navigations';
import { SignupFlowStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { validatePhoneNumber } from '@/utils/validate';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AuthServerSignupPhoneAuthorizationScreenProps = StackScreenProps<
  SignupFlowStackParamList,
  typeof authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION
>;

function AuthServerSignupPhoneAuthorizationScreen({
  navigation,
}: AuthServerSignupPhoneAuthorizationScreenProps) {
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const insets = useSafeAreaInsets();
  useAttachStep(3);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useFormContext();

  const phoneNumber = watch('phoneNumber');
  const authCode = watch('authCode');

  const onSubmit = () => {
    navigation.getParent()?.navigate(authNavigations.AUTH_TRAVEL_FORM_STACK);
  };

  // 사용자가 구현할 API 요청 함수 (인증번호 요청)
  const handleRequestAuthCode = async () => {
    // TODO: 인증번호 요청 API 호출
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSent(true);
  };

  // 사용자가 구현할 API 요청 함수 (인증번호 확인)
  const onVerifyCode = async () => {
    // TODO: 인증번호 확인 API 호출
    // 아래는 성공 시의 로직 예시입니다.
    // const success = await verifyAuthCodeAPI(phoneNumber, authCode);
    // if (success) {
    setIsVerified(true);
    // TODO: "인증되었습니다" 모달 띄우기
    // }
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(010|011|016|017|018|019)(\d{3,4})(\d{4})$/);
    if (match) {
      return [match[1], match[2], match[3]].join('-');
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>

      <View style={styles.infoContainer}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View>
              <InputField
                label="휴대폰 인증"
                placeholder="핸드폰 번호를 입력해주세요."
                onBlur={onBlur}
                onChangeText={text => onChange(formatPhoneNumber(text))}
                value={value}
                keyboardType="phone-pad"
                maxLength={13}
                error={error?.message}
              />
              {isSent && (
                <Text style={styles.sentMessage}>
                  인증 번호가 전송되었습니다.
                </Text>
              )}
            </View>
          )}
          rules={{ required: true, validate: validatePhoneNumber }}
        />
        {isSent && (
          <Controller
            control={control}
            name="authCode"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputField
                label="인증번호"
                placeholder="인증번호 6자리를 입력해주세요."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                maxLength={6}
                error={error?.message}
              />
            )}
            rules={{ required: true, minLength: 6 }}
          />
        )}
        {isVerified && (
          <Text style={styles.verifiedMessage}>인증되었습니다</Text>
        )}
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <CustomButton
          label={isSent ? '인증번호 확인' : '인증 요청'}
          onPress={isSent ? onVerifyCode : handleRequestAuthCode}
          style={styles.authButton}
          inValid={
            isSent
              ? authCode?.length !== 6 || isVerified
              : !validatePhoneNumber(phoneNumber)
          }
        />
      </View>
      <View style={[styles.buttonCTA, { bottom: insets.bottom + 32 }]}>
        <CustomButton
          label="다음"
          onPress={handleSubmit(onSubmit)}
          inValid={!isVerified}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    gap: 8,
  },
  authButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttonCTA: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
  },
  sentMessage: {
    paddingHorizontal: 20,
    marginTop: 4,
    color: colors.PRIMARY_COLOR,
  },
  verifiedMessage: {
    paddingHorizontal: 20,
    marginTop: 4,
    color: colors.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});

export default AuthServerSignupPhoneAuthorizationScreen;
