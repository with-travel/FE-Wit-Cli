import React, { useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ProgressStepBar from '@/components/auth/ProgressStepBar';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { useFormContext, Controller } from 'react-hook-form';
import { colors } from '@/constants/colors';
import CustomButton from '@/components/common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';
import { transformSignupData, validateSignupData } from '@/utils/signupUtils';
import { useNavigation } from '@react-navigation/native';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  name: string;
  birth: string;
  gender: string;
  phoneNumber: string;
  authCode: string;
  surveys: { answer: Array<{ section: string; optionId: string }> };
  introduce: string;
};

export default function AuthTravelFormIntroduceScreen() {
  useAttachStep(2);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { control, watch, getValues } = useFormContext<FormValues>();
  const { signupMutation } = useAuth();

  const introduce = watch('introduce') ?? '';

  const lineCount = useMemo(
    () => introduce.split(/\r?\n/).filter(l => l.trim().length > 0).length,
    [introduce],
  );
  const canSubmit = lineCount >= 3;

  const buildSignupBody = (v: FormValues) => {
    return {
      account: {
        email: v.email,
        password: v.password,
      },
      profile: {
        nickname: v.nickname,
        name: v.name,
        birth: v.birth,
        gender: v.gender,
        phoneNumber: v.phoneNumber,
      },
      verification: {
        authCode: v.authCode,
      },
      travelSurvey: {
        answers: v.surveys?.answer ?? [],
        introduce: v.introduce?.trim() || null,
      },
    };
  };

  const handleSignup = async (formData: FormValues) => {
    try {
      // 폼 데이터 검증
      const validationErrors = validateSignupData(formData);
      if (validationErrors.length > 0) {
        Alert.alert('입력 오류', validationErrors.join('\n'));
        return;
      }

      // API 요청 형식으로 변환
      const signupData = transformSignupData(formData);

      console.log('회원가입 데이터:', signupData);

      // 회원가입 API 호출
      await signupMutation.mutateAsync(signupData);

      Alert.alert('회원가입 완료', '회원가입이 완료되었습니다!', [
        {
          text: '확인',
          onPress: () => {
            // 메인 화면으로 이동 (자동 로그인 완료)
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTab' as never }],
            });
          },
        },
      ]);
    } catch (error) {
      console.error('회원가입 실패:', error);
      Alert.alert(
        '회원가입 실패',
        '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  const onSkip = () => {
    //자기소개서 스킵 && api 송신 후 정보 갱신
    const all = getValues();
    const formDataWithEmptyIntroduce = { ...all, introduce: '' };
    handleSignup(formDataWithEmptyIntroduce);
  };

  const onComplete = () => {
    //자기소개서 작성 완료 && api 송신 후 정보 갱신
    const all = getValues();
    handleSignup(all);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressWrap}>
        <ProgressStepBar height={8} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1, marginTop: 24 }}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>
            마지막으로,{'\n'}
            <Text style={{ color: colors.PRIMARY_COLOR ?? '#2BA84A' }}>
              자기소개서를 작성해주세요!
            </Text>
          </Text>
          <Text style={styles.sub}>
            자세히 작성할 수록 좋은 동행을 찾을 확률이 높아져요.
          </Text>

          <View style={styles.inputCard}>
            <Controller
              control={control}
              name="introduce"
              defaultValue=""
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={styles.textarea}
                  placeholder={`예) 안녕하세요! 2박 3일 일정으로 부산 가요.\n밥 같이 먹고 카페 투어 좋아해요:) \n사진 찍는 거 좋아해요!`}
                  placeholderTextColor="#A1A1A1"
                  multiline
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  textAlignVertical="top"
                  maxLength={1000}
                  autoCorrect={false}
                />
              )}
            />
          </View>
        </View>

        <View style={[styles.buttonCTA, { bottom: insets.bottom + 32 }]}>
          <CustomButton
            label={
              signupMutation.isPending
                ? '회원가입 중...'
                : canSubmit
                ? '완료'
                : '나중에 작성하기'
            }
            onPress={canSubmit ? onComplete : onSkip}
            disabled={signupMutation.isPending}
            style={!canSubmit && { backgroundColor: colors.GRAY_500 }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  progressWrap: {
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 24,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.PRIMARY_COLOR,
    lineHeight: 22,
    marginBottom: 6,
  },
  sub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 48,
  },
  inputCard: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 12,
    minHeight: 220,
  },
  textarea: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 20,
  },
  buttonCTA: {
    padding: 20,
  },
  cta: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
