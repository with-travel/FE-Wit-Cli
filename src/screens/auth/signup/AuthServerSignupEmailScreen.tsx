import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { authFlowNavigations } from '@/constants/navigations';
import { SignupFlowStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { validateEmail } from '@/utils/validate';

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
  } = useFormContext();

  const password = watch('password');

  const onSubmit = () => {
    navigation.navigate(authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>

      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputField
              label="이메일 주소"
              keyboardType="email-address"
              placeholder="example@email.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error?.message}
            />
          )}
          name="email"
          rules={{ required: true, validate: validateEmail }}
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
          inValid={!isValid}
        />
      </View>
    </View>
  );
}

export default AuthServerSignupEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    gap: 32,
  },
  buttonCTA: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
  },
});
