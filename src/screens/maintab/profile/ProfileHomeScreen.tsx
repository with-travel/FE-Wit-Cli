import { profileNavigations } from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';
import { ProfileStackParamList } from '@/navigations/stack/ProfileStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileHomeScreenProps = StackScreenProps<
  ProfileStackParamList,
  typeof profileNavigations.PROFILE_HOME
>;

function ProfileHomeScreen({ navigation }: ProfileHomeScreenProps) {
  const { auth } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text>{auth.nickname}</Text>
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
