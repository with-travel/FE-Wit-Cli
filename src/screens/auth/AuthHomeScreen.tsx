import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authFlowNavigations, authNavigations } from '@/constants/navigations';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@/constants/colors';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const { width, height } = Dimensions.get('window');

function AuthHomeScreen({ navigation }: AuthScreenProps) {
  const handleKakaoLogin = async () => {
    //카카오 로그인 화면으로 이동
    // router.push("/auth/kakaologin");
  };

  const handleServerLogin = () => {
    //서버 로그인 화면으로 이동
  };

  const handleServerSignup = () => {
    //이메일 회원가입 화면으로 이동
    navigation.navigate(authNavigations.AUTH_SIGNUP_FLOW_STACK);
  };
  return (
    <LinearGradient
      colors={[
        '#1F80B8',
        '#2A8F8F',
        '#359D66',
        '#919A3F',
        '#BF992C',
        '#ED9718',
        '#E27623',
        '#DD6528',
        '#D7542D',
      ]}
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
        <Pressable style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <Ionicons name="chatbubble-sharp" color={'#181500'} size={20} />
          <Text style={styles.kakaoText}>카카오톡으로 시작하기</Text>
        </Pressable>
        <View style={styles.serverLoginButton}>
          <CustomButton label="서버 로그인" onPress={handleServerLogin} />
        </View>
        <Pressable
          style={styles.serverSignupContainer}
          onPress={handleServerSignup}
        >
          <Text style={styles.serverSignupText}>이메일로 회원가입</Text>
        </Pressable>
        <View style={styles.serverLoginButton}>
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
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.1,
  },
  logo: {
    width: width,
    height: height * 0.6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
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
  infoNotification: {
    fontSize: 10,
    color: colors.UNCHANGED_WHITE,
  },
  underlined: {
    textDecorationLine: 'underline',
    color: colors.UNCHANGED_WHITE,
  },
});
