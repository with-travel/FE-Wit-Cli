import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { travelFormNavigations } from '@/constants/navigations';
import { TravelFormStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useFormContext } from 'react-hook-form';
import { TRAVEL_STYLE_QUESTIONS } from '@/constants/travelForm';
import OptionList from '@/components/auth/OptionList';

type AuthTravelFormCheckScreenProps = StackScreenProps<
  TravelFormStackParamList,
  typeof travelFormNavigations.AUTH_TRAVEL_FORM_CHECK
>;

function AuthTravelFormCheckScreen({
  navigation,
}: AuthTravelFormCheckScreenProps) {
  useAttachStep(1, { immediateOnFirstFocus: true });
  const insets = useSafeAreaInsets();
  const {
    control,
    formState: { isValid },
  } = useFormContext();

  const onSubmit = () => {
    navigation.navigate(travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>당신과 딱 맞는 동행을 위해</Text>
          <Text style={styles.title}>여행 스타일을 알려주세요</Text>
        </View>

        {TRAVEL_STYLE_QUESTIONS.map(question => (
          <Controller
            key={question.id}
            name={`surveys.${question.id}` as any}
            control={control}
            defaultValue=""
            rules={{
              validate: value =>
                (value && value.length > 0) || '모든 항목을 선택해주세요.',
            }}
            render={({ field: { onChange, value: selectedValue } }) => {
              const selectedOption = question.options.find(
                opt => opt.value === selectedValue,
              );

              const handleSelectionChange = (
                newlySelectedValue: string | null,
              ) => {
                onChange(newlySelectedValue || '');
              };

              return (
                <OptionList
                  emoji={question.emoji}
                  title={question.title}
                  options={question.options}
                  selectedId={selectedOption?.value}
                  onChange={handleSelectionChange}
                />
              );
            }}
          />
        ))}
      </ScrollView>
      <View style={[styles.buttonCTA, { bottom: insets.bottom + 32 }]}>
        <CustomButton label="다음" onPress={onSubmit} inValid={!isValid} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 160,
  },
  infoContainer: {
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  buttonCTA: {
    paddingTop: 16,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
  },
});

export default AuthTravelFormCheckScreen;
