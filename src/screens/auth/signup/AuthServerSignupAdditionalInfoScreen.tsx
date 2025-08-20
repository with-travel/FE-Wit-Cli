import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { authFlowNavigations } from '@/constants/navigations';
import { SignupFlowStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormContext, Controller } from 'react-hook-form';

type AuthServerSignupAdditionalInfoScreenProps = StackScreenProps<
  SignupFlowStackParamList,
  typeof authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO
>;

function AuthServerSignupAdditionalInfoScreen({
  navigation,
}: AuthServerSignupAdditionalInfoScreenProps) {
  useAttachStep(2);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormContext();

  const onSubmit = (data: any) => {
    navigation.navigate(
      authFlowNavigations.AUTH_SERVER_SIGNUP_PHONE_AUTHORIZATION,
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>
      <View style={styles.infoContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="닉네임"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="nickname"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="이름"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
        />
      </View>
      <View style={[styles.buttonCTA, { bottom: insets.bottom + 32 }]}>
        <CustomButton
          label="다음"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
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

export default AuthServerSignupAdditionalInfoScreen;
