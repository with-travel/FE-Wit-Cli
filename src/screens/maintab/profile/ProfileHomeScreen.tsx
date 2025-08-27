import { profileNavigations } from '@/constants/navigations';
import { ProfileStackParamList } from '@/navigations/stack/ProfileStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileHomeScreenProps = StackScreenProps<
  ProfileStackParamList,
  typeof profileNavigations.PROFILE_HOME
>;

function ProfileHomeScreen({ navigation }: ProfileHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>111</Text>
      <View></View>
    </SafeAreaView>
  );
}

export default ProfileHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
