import { storageKeys } from '@/constants';
import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_SERVICE = 'wit_access_token';
const REFRESH_TOKEN_SERVICE = 'wit_refresh_token';

type Keyword =
  | typeof storageKeys.ACCESS_TOKEN
  | typeof storageKeys.REFRESH_TOKEN;

export async function saveToken(
  keyword: Keyword,
  token: string,
): Promise<boolean> {
  const TOKEN_SERVICE =
    keyword === storageKeys.ACCESS_TOKEN
      ? ACCESS_TOKEN_SERVICE
      : REFRESH_TOKEN_SERVICE;
  try {
    await Keychain.setGenericPassword(keyword, token, {
      service: TOKEN_SERVICE,
    });
    return true;
  } catch (error) {
    console.error(`Failed to save ${keyword} token:`, error);
    return false;
  }
}

export async function loadToken(keyword: Keyword): Promise<string | null> {
  const TOKEN_SERVICE =
    keyword === storageKeys.ACCESS_TOKEN
      ? ACCESS_TOKEN_SERVICE
      : REFRESH_TOKEN_SERVICE;
  try {
    const credentials = await Keychain.getGenericPassword({
      service: TOKEN_SERVICE,
    });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error(`Failed to load ${keyword} token:`, error);
    return null;
  }
}

export async function clearToken(keyword: Keyword): Promise<boolean> {
  const TOKEN_SERVICE =
    keyword === storageKeys.ACCESS_TOKEN
      ? ACCESS_TOKEN_SERVICE
      : REFRESH_TOKEN_SERVICE;
  try {
    await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
    return true;
  } catch (error) {
    console.error(`Failed to clear ${keyword} token:`, error);
    return false;
  }
}
