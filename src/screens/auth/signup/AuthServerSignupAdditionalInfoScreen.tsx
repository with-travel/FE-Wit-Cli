import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useAttachStep } from '@/components/providers/SignupProgressProvider';
import { authFlowNavigations } from '@/constants/navigations';
import { SignupFlowStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormContext, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { colors } from '@/constants/colors';

type AuthServerSignupAdditionalInfoScreenProps = StackScreenProps<
  SignupFlowStackParamList,
  typeof authFlowNavigations.AUTH_SERVER_SIGNUP_ADDITIONAL_INFO
>;

function AuthServerSignupAdditionalInfoScreen({
  navigation,
}: AuthServerSignupAdditionalInfoScreenProps) {
  useAttachStep(2);
  const insets = useSafeAreaInsets();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 20,
  );
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  // 월 배열 생성 (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 연도와 월에 따라 일 배열 업데이트
  useEffect(() => {
    const daysCount = new Date(selectedYear, selectedMonth, 0).getDate();
    setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
  }, [selectedYear, selectedMonth]);

  const handleDateConfirm = (onChange: (date: Date) => void) => {
    const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    onChange(selectedDate);
    setShowDatePicker(false);
  };
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
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.sectionTitle}>생년월일</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {value
                    ? value.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : '생년월일 선택'}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                    <View style={styles.pickerHeader}>
                      <Text style={styles.pickerTitle}>생년월일 선택</Text>
                    </View>

                    <View style={styles.pickerContent}>
                      {/* 연도 선택 */}
                      <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>연도</Text>
                        <Picker
                          selectedValue={selectedYear}
                          onValueChange={itemValue =>
                            setSelectedYear(itemValue)
                          }
                          style={styles.picker}
                          itemStyle={styles.pickerItem}
                        >
                          {years.map(year => (
                            <Picker.Item
                              key={year}
                              label={`${year}년`}
                              value={year}
                            />
                          ))}
                        </Picker>
                      </View>

                      {/* 월 선택 */}
                      <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>월</Text>
                        <Picker
                          selectedValue={selectedMonth}
                          onValueChange={itemValue =>
                            setSelectedMonth(itemValue)
                          }
                          style={styles.picker}
                          itemStyle={styles.pickerItem}
                        >
                          {months.map(month => (
                            <Picker.Item
                              key={month}
                              label={`${month}월`}
                              value={month}
                            />
                          ))}
                        </Picker>
                      </View>

                      {/* 일 선택 */}
                      <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>일</Text>
                        <Picker
                          selectedValue={selectedDay}
                          onValueChange={itemValue => setSelectedDay(itemValue)}
                          style={styles.picker}
                          itemStyle={styles.pickerItem}
                        >
                          {daysInMonth.map(day => (
                            <Picker.Item
                              key={day}
                              label={`${day}일`}
                              value={day}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>

                    <View style={styles.pickerActions}>
                      <CustomButton
                        label="취소"
                        onPress={() => setShowDatePicker(false)}
                        variant="outlined"
                        style={styles.pickerButton}
                      />
                      <CustomButton
                        label="확인"
                        onPress={() => handleDateConfirm(onChange)}
                        style={styles.pickerButton}
                      />
                    </View>
                  </View>
                </View>
              </Modal>

              {/* {error.birthDate && (
                <Text style={styles.error}>
                  {error.birthDate.message as string}
                </Text>
              )} */}
            </View>
          )}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.sectionTitle}>성별</Text>
              <View style={styles.genderButtons}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    value === '남자' && styles.genderButtonSelected,
                  ]}
                  onPress={() => onChange('남자')}
                >
                  <Text
                    style={
                      value === '남자' ? styles.selectedText : styles.normalText
                    }
                  >
                    남자
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    value === '여자' && styles.genderButtonSelected,
                  ]}
                  onPress={() => onChange('여자')}
                >
                  <Text
                    style={
                      value === '여자' ? styles.selectedText : styles.normalText
                    }
                  >
                    여자
                  </Text>
                </TouchableOpacity>
              </View>
              {/* {errors.gender && (
                <Text style={styles.error}>
                  {errors.gender.message as string}
                </Text>
              )} */}
            </View>
          )}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 20,
  },
  datePickerButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
  },
  datePickerText: {
    color: colors.UNCHANGED_BLACK,
  },
  error: {
    marginTop: 5,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  pickerHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  pickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    marginVertical: 8,
    color: colors.UNCHANGED_BLACK,
  },
  picker: {
    width: '100%',
    height: 180,
  },
  pickerItem: {
    fontSize: 16,
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  pickerButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  selectedText: {
    color: 'white',
    fontWeight: '500',
  },
  normalText: {
    color: 'black',
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
