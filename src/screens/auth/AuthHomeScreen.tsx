import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authFlowNavigations, authNavigations } from '@/constants/navigations';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@/constants/colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const { width, height } = Dimensions.get('window');

function AuthHomeScreen({ navigation }: AuthScreenProps) {
  const insets = useSafeAreaInsets();
  // const handleKakaoLogin = async () => {
  //   //카카오 로그인 화면으로 이동
  //   // router.push("/auth/kakaologin");
  // };

  const handleServerLogin = () => {
    navigation.navigate(authNavigations.AUTH_SERVER_LOGIN);
  };

  const handleServerSignup = () => {
    //이메일 회원가입 화면으로 이동
    navigation.navigate(authNavigations.AUTH_SIGNUP_FLOW_STACK);
  };
  return (
    <LinearGradient
      colors={colors.LINEAR_BACKGROUND}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Image
          source={require('@/assets/images/WitLogoWhite.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          위트와 함께{'\n'}
          여행할 준비가 되셨나요?
        </Text>

        <View style={{ gap: 16, paddingHorizontal: 20, alignItems: 'center' }}>
          {/* <Pressable style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <Ionicons name="chatbubble-sharp" color={'#181500'} size={20} />
          <Text style={styles.kakaoText}>카카오톡으로 시작하기</Text>
        </Pressable> */}
          <View style={styles.serverLoginButton}>
            <CustomButton label="서버 로그인" onPress={handleServerLogin} />
          </View>
          <Pressable
            style={styles.serverSignupContainer}
            onPress={handleServerSignup}
          >
            <Text style={styles.serverSignupText}>이메일로 회원가입</Text>
          </Pressable>
        </View>

        <View
          style={[styles.notificationContainer, { bottom: insets.bottom + 24 }]}
        >
          <Text style={styles.infoNotification}>
            가입을 진행할 경우 <Text style={styles.underlined}>서비스약관</Text>{' '}
            및 <Text style={styles.underlined}>개인정보처리방침</Text>에 동의한
            것으로 간주합니다.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.1,
    gap: 12,
  },
  logo: {
    width: width,
    marginBottom: 48,
  },
  title: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: 36,
    marginBottom: 28,
  },
  kakaoButton: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    width: width - 52,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
  },
  kakaoText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },
  serverLoginButton: {
    paddingHorizontal: 20,
  },
  serverSignupContainer: {},
  serverSignupText: {
    fontSize: 16,
    color: colors.UNCHANGED_WHITE,
    textDecorationLine: 'underline',
  },
  notificationContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  infoNotification: {
    fontSize: 10,
    color: colors.UNCHANGED_WHITE,
  },
  underlined: {
    textDecorationLine: 'underline',
    color: colors.UNCHANGED_WHITE,
  },
});
