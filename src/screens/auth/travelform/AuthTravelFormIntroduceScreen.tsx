import ProgressStepBar from '@/components/auth/ProgressStepBar';
import { travelFormNavigations } from '@/constants/navigations';
import { TravelFormStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthTravelFormIntroduceScreenProps = StackScreenProps<
  TravelFormStackParamList,
  typeof travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE
>;

function AuthTravelFormIntroduceScreen({}: AuthTravelFormIntroduceScreenProps) {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, marginBottom: 32 }}>
        <ProgressStepBar height={8} />
      </View>
      <View>
        <Text>회원가입 정보 확인2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthTravelFormIntroduceScreen;
