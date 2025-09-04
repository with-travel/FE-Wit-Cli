import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { authFlowNavigations } from '@/constants/navigations';
import { SignupFlowStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { validateEmail } from '@/utils/validate';
import { duplicateCheckEmail } from '@/api/auth';
import { colors } from '@/constants/colors';
import { useState } from 'react';

type AuthServerSignupEmailProps = StackScreenProps<
  SignupFlowStackParamList,
  typeof authFlowNavigations.AUTH_SERVER_SIGNUP_EMAIL
>;

function AuthServerSignupEmailScreen({
  navigation,
}: AuthServerSignupEmailProps) {
  const insets = useSafeAreaInsets();
  useAttachStep(1, { immediateOnFirstFocus: true });
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    setError,
    clearErrors,
  } = useFormContext();

  const password = watch('password');
  const [emailCheckStatus, setEmailCheckStatus] = useState<
    'unchecked' | 'checking' | 'available' | 'duplicate'
  >('unchecked');

  const checkEmail = async (email: string) => {
    if (!email || !email.includes('@')) {
      return;
    }

    try {
      setEmailCheckStatus('checking');
      const isAvailable = await duplicateCheckEmail(email);

      if (isAvailable) {
        setEmailCheckStatus('available');
        // react-hook-form 에러 제거
        clearErrors('email');
      } else {
        setEmailCheckStatus('duplicate');
        // react-hook-form에 에러 설정
        setError('email', {
          type: 'manual',
          message: '중복된 이메일입니다.',
        });
      }
    } catch (error) {
      console.error('이메일 중복 체크 실패:', error);
      setEmailCheckStatus('duplicate');
      setError('email', {
        type: 'manual',
        message: '이메일 중복 체크에 실패했습니다.',
      });
    }
  };

  const onSubmit = () => {
    // 이메일 중복 체크가 완료되지 않았으면 진행 불가
    if (emailCheckStatus !== 'available') {
      return;
    }

    navigation.navigate(authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 8, marginBottom: 48 }}>
        <ProgressStepBar height={8} />
      </View>

      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: emailCheckStatus === 'available' ? '100%' : '75%',
                }}
              >
                <InputField
                  label="이메일 주소"
                  keyboardType="email-address"
                  placeholder="example@email.com"
                  onBlur={onBlur}
                  onChangeText={text => {
                    onChange(text);
                    // 이메일이 변경되면 중복 체크 상태 초기화
                    if (emailCheckStatus !== 'unchecked') {
                      setEmailCheckStatus('unchecked');
                      clearErrors('email');
                    }
                  }}
                  value={value}
                  error={
                    emailCheckStatus === 'duplicate'
                      ? '중복된 이메일입니다.'
                      : error?.message
                  }
                  note={
                    emailCheckStatus === 'available'
                      ? '사용 가능한 이메일입니다.'
                      : emailCheckStatus === 'unchecked'
                      ? '중복확인을 해주세요'
                      : ''
                  }
                />
              </View>
              {(emailCheckStatus === 'unchecked' ||
                emailCheckStatus === 'duplicate' ||
                emailCheckStatus === 'checking') && (
                <Pressable
                  onPress={() => checkEmail(value)}
                  style={styles.duplicateCheckButton}
                  disabled={emailCheckStatus === 'checking' || !value}
                >
                  <Text style={styles.duplicateCheckButtonText}>
                    {emailCheckStatus === 'checking' ? '확인중...' : '중복확인'}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
          name="email"
          rules={{
            required: '이메일을 입력해주세요',
            validate: validateEmail,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식이 아닙니다',
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="비밀번호"
              secureTextEntry
              placeholder="비밀번호를 입력하세요"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputField
              label="비밀번호 확인"
              secureTextEntry
              placeholder="비밀번호를 다시 입력하세요"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error?.message}
            />
          )}
          name="passwordConfirm"
          rules={{
            required: true,
            validate: value =>
              value === password || '비밀번호가 일치하지 않습니다.',
          }}
        />
      </View>
      <View style={[styles.buttonCTA, { bottom: insets.bottom + 32 }]}>
        <CustomButton
          label="다음"
          onPress={handleSubmit(onSubmit)}
          inValid={!isValid || emailCheckStatus !== 'available'}
        />
      </View>
    </View>
  );
}

export default AuthServerSignupEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoContainer: {
    position: 'relative',
    gap: 32,
  },
  buttonCTA: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
  },
  duplicateCheckButton: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    height: 50,
    top: 3,
  },
  duplicateCheckButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
