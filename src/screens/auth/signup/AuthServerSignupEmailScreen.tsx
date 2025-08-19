import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { authFlowNavigations, authNavigations } from '@/constants/navigations';
import {
  AuthStackParamList,
  SignupFlowStackParamList,
} from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AuthServerSignupEmailProps = StackScreenProps<
  SignupFlowStackParamList,
  typeof authFlowNavigations.AUTH_SERVER_SIGNUP_EMAIL
>;

function AuthServerSignupEmailScreen({
  navigation,
}: AuthServerSignupEmailProps) {
  const insets = useSafeAreaInsets();
  useAttachStep(1, { immediateOnFirstFocus: true }); // ✅
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>

      <View style={styles.infoContainer}>
        <InputField
          label="이메일 주소"
          keyboardType="email-address"
          placeholder="example@email.com"
        />
        <InputField
          label="비밀번호"
          secureTextEntry
          placeholder="비밀번호를 입력하세요"
        />
        <InputField
          label="비밀번호 확인"
          secureTextEntry
          placeholder="비밀번호를 다시 입력하세요"
        />
        <View style={[styles.buttonCTA]}>
          <CustomButton label="다음" onPress={() => {}} />
        </View>
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
