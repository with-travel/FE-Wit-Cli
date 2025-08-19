import * as Keychain from 'react-native-keychain';

const SERVICE = 'auth'; // 서비스 구분 키

export async function saveTokens(tokens: { access: string; refresh: string }) {
  // 객체는 문자열로! (Keychain은 문자열만 저장)
  return Keychain.setGenericPassword(
    'tokens',
    JSON.stringify(tokens),
    { service: SERVICE }, // 필요시 iOS: accessible, Android: securityLevel/storage 지정
  );
}

export async function loadTokens() {
  const res = await Keychain.getGenericPassword({ service: SERVICE });
  return res
    ? (JSON.parse(res.password) as { access: string; refresh: string })
    : null;
}

export async function clearTokens() {
  await Keychain.resetGenericPassword({ service: SERVICE });
}
