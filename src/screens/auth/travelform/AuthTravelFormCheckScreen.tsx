import ProgressStepBar from '@/components/auth/ProgressStepBar';
import CustomButton from '@/components/common/CustomButton';
import { travelFormNavigations } from '@/constants/navigations';
import { TravelFormStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AuthTravelFormCheckScreenProps = StackScreenProps<
  TravelFormStackParamList,
  typeof travelFormNavigations.AUTH_TRAVEL_FORM_CHECK
>;

function AuthTravelFormCheckScreen({
  navigation,
}: AuthTravelFormCheckScreenProps) {
  const insets = useSafeAreaInsets();

  const onSubmit = () => {
    navigation.navigate(travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>
      <View>
        <Text>회원가입 정보 확인</Text>
      </View>
      <View style={[styles.buttonCTA, { bottom: insets.bottom + 32 }]}>
        <CustomButton label="다음" onPress={onSubmit} inValid={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCTA: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
  },
});

export default AuthTravelFormCheckScreen;
