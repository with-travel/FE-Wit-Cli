import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useAuth from '@/hooks/queries/useAuth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function AuthServerLoginScreen() {
  const { loginMutation } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    loginMutation.mutate({
      email: email,
      password: password,
    });
  };

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          label="이메일"
          placeholder="이메일"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={[styles.buttonContainer, { bottom: insets.bottom + 32 }]}>
        <CustomButton label="로그인" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

export default AuthServerLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingTop: 8,
    gap: 12,
    marginBottom: 32,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
});
