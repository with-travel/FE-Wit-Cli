import { authNavigations } from '@/constants/navigations';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthServerSignupEmailProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SERVER_SIGNUP_EMAIL
>;

function AuthServerSignupEmailScreen({
  navigation,
}: AuthServerSignupEmailProps) {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

export default AuthServerSignupEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
